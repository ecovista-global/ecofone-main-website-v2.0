import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaymentStatus, OrderStatus, InventoryStatus, Grade } from '@prisma/client';
import * as crypto from 'crypto';
import axios from 'axios';

export interface CheckoutInput {
  customerId: string;
  skuId: string;
  storeId?: string;
}

@Injectable()
export class EcommerceService {
  constructor(private prisma: PrismaService) {}

  async getCatalog(filters: {
    brand?: string;
    ram?: string;
    storage?: string;
    grade?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    page?: number;
    limit?: number;
    take?: number;
    skip?: number;
  }) {
    const where: any = {};

    if (filters.grade) {
      where.grade = filters.grade.toUpperCase() as Grade;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.basePrice = {};
      if (filters.minPrice !== undefined) {
        where.basePrice.gte = Number(filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        where.basePrice.lte = Number(filters.maxPrice);
      }
    }

    const variantWhere: any = {};
    if (filters.ram) {
      variantWhere.ram = { equals: filters.ram, mode: 'insensitive' };
    }
    if (filters.storage) {
      variantWhere.storage = { equals: filters.storage, mode: 'insensitive' };
    }

    const modelWhere: any = {};
    if (filters.brand) {
      modelWhere.brand = {
        slug: { equals: filters.brand.toLowerCase(), mode: 'insensitive' }
      };
    }

    if (filters.search) {
      const search = filters.search.trim();
      modelWhere.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { name: { contains: search, mode: 'insensitive' } } },
        { slug: { contains: search.toLowerCase(), mode: 'insensitive' } },
      ];
    }

    if (Object.keys(modelWhere).length > 0) {
      variantWhere.model = modelWhere;
    }

    if (Object.keys(variantWhere).length > 0) {
      where.variant = variantWhere;
    }

    const hasPagination = filters.page !== undefined || filters.limit !== undefined || filters.take !== undefined || filters.skip !== undefined;
    const take = filters.take !== undefined ? Number(filters.take) : (filters.limit !== undefined ? Number(filters.limit) : 50);
    const skip = filters.skip !== undefined ? Number(filters.skip) : (filters.page !== undefined ? (Math.max(Number(filters.page), 1) - 1) * take : 0);

    const [skus, totalCount] = await Promise.all([
      this.prisma.sKU.findMany({
        where,
        take,
        skip,
        include: {
          variant: {
            include: {
              model: {
                include: {
                  brand: true
                }
              }
            }
          },
          inventory: {
            where: {
              status: InventoryStatus.AVAILABLE
            }
          }
        },
        orderBy: { basePrice: 'asc' }
      }),
      this.prisma.sKU.count({ where })
    ]);

    const items = skus.map((sku: any) => {
      const variant = sku.variant;
      const model = variant?.model;
      const brand = model?.brand;

      const stockCount = sku.inventory ? sku.inventory.length : 0;

      return {
        skuId: sku.id,
        variantId: sku.variantId,
        brandName: brand?.name || 'Unknown',
        brandSlug: brand?.slug || 'unknown',
        modelName: model?.name || 'Unknown Model',
        modelSlug: model?.slug || 'unknown-model',
        specifications: model?.specifications || {},
        ram: variant?.ram || '',
        storage: variant?.storage || '',
        color: variant?.color || '',
        grade: sku.grade,
        price: sku.basePrice,
        dealerPrice: sku.dealerPrice,
        stock: stockCount,
      };
    });

    if (hasPagination) {
      return {
        items,
        total: totalCount,
        page: filters.page !== undefined ? Number(filters.page) : Math.floor(skip / take) + 1,
        limit: take,
        totalPages: Math.ceil(totalCount / take),
      };
    }

    return items;
  }

  async getSkuDetails(skuId: string) {
    const sku = await this.prisma.sKU.findUnique({
      where: { id: skuId },
      include: {
        variant: {
          include: {
            model: {
              include: {
                brand: true
              }
            }
          }
        }
      }
    });
    if (!sku) {
      throw new NotFoundException(`SKU with ID ${skuId} not found`);
    }
    const variant = sku.variant;
    const model = variant.model;
    const brand = model.brand;

    return {
      skuId: sku.id,
      brandName: brand.name,
      modelName: model.name,
      ram: variant.ram,
      storage: variant.storage,
      color: variant.color,
      grade: sku.grade,
      price: sku.basePrice,
      dealerPrice: sku.dealerPrice,
    };
  }

  async initiateCheckout(input: CheckoutInput): Promise<{ orderId: string; amount: number; razorpayOrderId: string; keyId: string }> {
    const { customerId, skuId, storeId } = input;

    // Use a transaction to safely find and reserve an item
    const result = await this.prisma.$transaction(async (tx) => {
      // Find available item
      const availableItem = await tx.inventoryItem.findFirst({
        where: {
          skuId,
          status: 'AVAILABLE',
          ...(storeId && { storeId })
        }
      });

      if (!availableItem) {
        throw new BadRequestException('Requested device SKU is currently out of stock');
      }

      // Reserve it
      await tx.inventoryItem.update({
        where: { id: availableItem.id },
        data: { status: 'RESERVED' }
      });

      // Get price
      const sku = await tx.sKU.findUnique({
        where: { id: skuId }
      });
      if (!sku) {
        throw new NotFoundException(`SKU ID ${skuId} not found`);
      }

      const orderAmount = sku.basePrice;

      // Create local order
      const localOrder = await tx.order.create({
        data: {
          customerId,
          storeId: storeId || availableItem.storeId,
          totalAmount: orderAmount,
          paymentStatus: 'PENDING',
          paymentId: '',
          status: 'PROCESSING',
          orderItems: {
            create: {
              skuId,
              inventoryItemId: availableItem.id,
              price: orderAmount
            }
          }
        },
        include: {
          orderItems: true
        }
      });

      return { localOrder, orderAmount, availableItemId: availableItem.id };
    });

    const { localOrder, orderAmount } = result;

    // Create Razorpay Order
    let razorpayOrderId = `rzp_mock_${Math.random().toString(36).substr(2, 9)}`;
    const rzpKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkeyid12345';
    const rzpSecret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mocksecret12345';

    try {
      const response = await axios.post(
        'https://api.razorpay.com/v1/orders',
        {
          amount: Math.round(orderAmount * 100),
          currency: 'INR',
          receipt: localOrder.id,
        },
        {
          headers: {
            'Authorization': 'Basic ' + Buffer.from(`${rzpKeyId}:${rzpSecret}`).toString('base64'),
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data && response.data.id) {
        razorpayOrderId = response.data.id;
      }
    } catch (err) {
      console.warn('Razorpay API request failed, creating system mock order ID:', err.message);
    }

    // Update order with payment ID (Razorpay Order ID)
    await this.prisma.order.update({
      where: { id: localOrder.id },
      data: { paymentId: razorpayOrderId }
    });

    return {
      orderId: localOrder.id,
      amount: orderAmount,
      razorpayOrderId,
      keyId: rzpKeyId,
    };
  }

  async verifyPayment(orderId: string, razorpayPaymentId: string, razorpaySignature: string): Promise<{ success: boolean }> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true }
    });
    if (!order) {
      throw new NotFoundException(`Order record ${orderId} not found`);
    }

    const rzpOrderId = order.paymentId;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error('RAZORPAY_KEY_SECRET environment variable is missing');
    }

    if (!razorpayPaymentId || !razorpaySignature) {
      throw new BadRequestException('Payment ID and signature are required');
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${rzpOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const sigBuf = Buffer.from(razorpaySignature, 'utf-8');
    const expBuf = Buffer.from(generatedSignature, 'utf-8');
    const signatureMatch = sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);

    if (signatureMatch) {
      await this.prisma.$transaction(async (tx) => {
        // Update order status to paid
        await tx.order.update({
          where: { id: orderId },
          data: { paymentStatus: 'PAID' }
        });

        // Update items status to sold
        for (const item of order.orderItems) {
          if (item.inventoryItemId) {
            await tx.inventoryItem.update({
              where: { id: item.inventoryItemId },
              data: { status: 'SOLD' }
            });
          }
        }
      });
      
      return { success: true };
    } else {
      await this.prisma.$transaction(async (tx) => {
        // Cancel order
        await tx.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: 'FAILED',
            status: 'CANCELLED'
          }
        });

        // Release inventory back to available
        for (const item of order.orderItems) {
          if (item.inventoryItemId) {
            await tx.inventoryItem.update({
              where: { id: item.inventoryItemId },
              data: { status: 'AVAILABLE' }
            });
          }
        }
      });

      throw new BadRequestException('Payment verification check failed. Signature does not match.');
    }
  }

  async handleWebhook(payload: any, signature: string): Promise<void> {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error('RAZORPAY_WEBHOOK_SECRET environment variable is missing');
    }
    
    if (!signature) {
      throw new BadRequestException('Webhook signature missing');
    }

    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    const sigBuf = Buffer.from(signature, 'utf-8');
    const expBuf = Buffer.from(expectedSig, 'utf-8');
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      throw new BadRequestException('Invalid webhook signature origin');
    }

    const event = payload.event;
    if (event === 'payment.captured') {
      const paymentEntity = payload.payload.payment.entity;
      const rzpOrderId = paymentEntity.order_id;
      
      const order = await this.prisma.order.findFirst({
        where: { paymentId: rzpOrderId },
        include: { orderItems: true }
      });
      if (order && order.paymentStatus !== 'PAID') {
        await this.prisma.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: order.id },
            data: { paymentStatus: 'PAID' }
          });
          for (const item of order.orderItems) {
            if (item.inventoryItemId) {
              await tx.inventoryItem.update({
                where: { id: item.inventoryItemId },
                data: { status: 'SOLD' }
              });
            }
          }
        });
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = payload.payload.payment.entity;
      const rzpOrderId = paymentEntity.order_id;
      
      const order = await this.prisma.order.findFirst({
        where: { paymentId: rzpOrderId },
        include: { orderItems: true }
      });
      if (order && order.paymentStatus !== 'PAID') {
        await this.prisma.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: order.id },
            data: {
              paymentStatus: 'FAILED',
              status: 'CANCELLED'
            }
          });
          for (const item of order.orderItems) {
            if (item.inventoryItemId) {
              await tx.inventoryItem.update({
                where: { id: item.inventoryItemId },
                data: { status: 'AVAILABLE' }
              });
            }
          }
        });
      }
    }
  }
}
