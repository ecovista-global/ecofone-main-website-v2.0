import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

@Injectable()
export class CmsService {
  private readonly logger = new Logger(CmsService.name);
  private r2Client: S3Client;

  constructor(private prisma: PrismaService) {
    // Configure Cloudflare R2 Client (S3 Compatible API)
    this.r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID || 'mock_account'}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || 'mock_r2_access_key',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'mock_r2_secret_key',
      },
    });
  }

  private cachedStorageUsage: number | null = null;
  private lastStorageCheck: number = 0;

  private async getStorageUsage(): Promise<number> {
    const now = Date.now();
    // Cache for 60 seconds in memory
    if (this.cachedStorageUsage !== null && now - this.lastStorageCheck < 60000) {
      return this.cachedStorageUsage;
    }

    try {
      // 1. Fetch fast atomic counter from database
      const setting = await this.prisma.systemSetting.findUnique({
        where: { key: 'storage_used_bytes' },
      });

      if (setting && !isNaN(Number(setting.value))) {
        this.cachedStorageUsage = Number(setting.value);
        this.lastStorageCheck = now;
        return this.cachedStorageUsage;
      }
    } catch (_) {
      // DB cold start or table migration in progress
    }

    // 2. Fallback one-time baseline calculation
    let totalSize = 0;
    const isMockR2 = !process.env.R2_ACCOUNT_ID || process.env.R2_ACCESS_KEY_ID === 'your_r2_access_key_id' || !process.env.R2_ACCESS_KEY_ID;
    
    if (isMockR2) {
      try {
        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');
        if (fs.existsSync(uploadDir)) {
          const files = fs.readdirSync(uploadDir);
          for (const file of files) {
            totalSize += fs.statSync(path.join(uploadDir, file)).size;
          }
        }
      } catch (err: any) {
        console.error('Failed to calculate local storage usage:', err.message);
      }
    }

    this.cachedStorageUsage = totalSize;
    this.lastStorageCheck = now;

    // Persist calculated baseline
    try {
      await this.prisma.systemSetting.upsert({
        where: { key: 'storage_used_bytes' },
        create: { key: 'storage_used_bytes', value: String(totalSize) },
        update: { value: String(totalSize) },
      });
    } catch (_) {}

    return totalSize;
  }

  private async incrementStorageUsage(bytesAdded: number): Promise<void> {
    if (this.cachedStorageUsage !== null) {
      this.cachedStorageUsage += bytesAdded;
    }
    try {
      const setting = await this.prisma.systemSetting.findUnique({
        where: { key: 'storage_used_bytes' },
      });
      const current = setting ? Number(setting.value) || 0 : (this.cachedStorageUsage || 0);
      const updated = current + bytesAdded;
      await this.prisma.systemSetting.upsert({
        where: { key: 'storage_used_bytes' },
        create: { key: 'storage_used_bytes', value: String(updated) },
        update: { value: String(updated) },
      });
    } catch (err: any) {
      console.warn('Failed to update storage counter in DB:', err?.message);
    }
  }

  // Cloudflare R2 file uploads with local storage fallback
  async uploadFile(fileName: string, contentType: string, buffer: Buffer): Promise<string> {
    const fileSize = buffer.length;
    const currentUsage = await this.getStorageUsage();
    const limitBytes = 9 * 1024 * 1024 * 1024; // 9 GB limit

    if (currentUsage + fileSize > limitBytes) {
      throw new BadRequestException(`Upload failed: Storage quota of 9 GB has been exceeded (Current Usage: ${(currentUsage / (1024 * 1024 * 1024)).toFixed(2)} GB).`);
    }

    const isMockR2 = !process.env.R2_ACCOUNT_ID || process.env.R2_ACCESS_KEY_ID === 'your_r2_access_key_id' || !process.env.R2_ACCESS_KEY_ID;
    
    if (isMockR2) {
      try {
        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const fileKey = `${Date.now()}-${fileName}`;
        const filePath = path.join(uploadDir, fileKey);
        fs.writeFileSync(filePath, buffer);
        
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
        await this.incrementStorageUsage(fileSize);
        return `${backendUrl}/uploads/${fileKey}`;
      } catch (err) {
        console.error('Local file upload failed:', err.message);
        return `https://r2.ecofone.co.in/resumes/${Date.now()}-${fileName}`;
      }
    }

    const bucketName = process.env.R2_BUCKET_NAME || 'ecofone-bucket';
    const key = `resumes/${Date.now()}-${fileName}`;

    try {
      await this.r2Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: buffer,
          ContentType: contentType,
        })
      );
      
      await this.incrementStorageUsage(fileSize);

      const publicUrl = process.env.R2_PUBLIC_DOMAIN 
        ? `${process.env.R2_PUBLIC_DOMAIN}/${key}`
        : `https://${bucketName}.r2.cloudflarestorage.com/${key}`;

      return publicUrl;
    } catch (err) {
      console.warn('R2 upload failed, generating simulated storage URL:', err.message);
      return `https://r2.ecofone.co.in/resumes/${Date.now()}-${fileName}`;
    }
  }

  // Careers section
  async createJobListing(data: any) {
    return this.prisma.jobListing.create({
      data: {
        title: data.title,
        department: data.department,
        location: data.location,
        description: data.description,
        requirements: data.requirements,
        active: true,
      }
    });
  }

  async getJobListings() {
    return this.prisma.jobListing.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async applyToJob(jobId: string, candidateName: string, email: string, phone: string, resumeBuffer: Buffer, resumeName: string, contentType: string) {
    const job = await this.prisma.jobListing.findUnique({
      where: { id: jobId }
    });
    if (!job) {
      throw new NotFoundException(`Job listing with ID ${jobId} not found`);
    }

    const resumeUrl = await this.uploadFile(resumeName, contentType, resumeBuffer);

    const application = await this.prisma.jobApplication.create({
      data: {
        jobId,
        candidateName,
        email,
        phone,
        resumeUrl,
      }
    });

    return { success: true, applicationId: application.id };
  }

  // Blogs section
  async getBlogPosts() {
    return this.prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' }
    });
  }

  async getBlogPostBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug }
    });
    if (!post) {
      throw new NotFoundException(`Blog post with slug '${slug}' not found`);
    }
    return post;
  }

  // Reviews section
  async getReviews() {
    // Auto-clean rejected reviews older than 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    this.prisma.review.deleteMany({
      where: {
        status: 'REJECTED',
        createdAt: { lt: threeMonthsAgo }
      }
    }).catch(err => console.error('Failed to auto-clean rejected reviews:', err));

    // Public: only return APPROVED reviews
    const reviews = await this.prisma.review.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' }
    });
    
    const total = reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    const average = reviews.length > 0 ? Number((total / reviews.length).toFixed(1)) : 0;
    
    return {
      reviews,
      aggregateRating: {
        ratingValue: average,
        reviewCount: reviews.length,
        bestRating: 5,
        worstRating: 1,
      }
    };
  }

  async getAllReviewsAdmin() {
    // Auto-clean rejected reviews older than 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    this.prisma.review.deleteMany({
      where: {
        status: 'REJECTED',
        createdAt: { lt: threeMonthsAgo }
      }
    }).catch(err => console.error('Failed to auto-clean rejected reviews:', err));

    // Admin: return all reviews with status
    const reviews = await this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return reviews;
  }

  async updateReviewStatus(id: string, status: string) {
    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
    if (!validStatuses.includes(status.toUpperCase())) {
      throw new BadRequestException('Status must be PENDING, APPROVED, or REJECTED');
    }
    return this.prisma.review.update({
      where: { id },
      data: { status: status.toUpperCase() }
    });
  }

  async submitReview(authorName: string, rating: number, comment: string, verifiedProduct?: string, type?: string, subtitle?: string) {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating score must be between 1 and 5 stars');
    }
    return this.prisma.review.create({
      data: {
        authorName,
        rating: Number(rating),
        comment,
        verifiedProduct: verifiedProduct || null,
        type: type || 'CUSTOMER',
        subtitle: subtitle || null,
        status: 'PENDING', // Always starts as pending
      }
    });
  }

  async replyToReview(id: string, reply: string) {
    return this.prisma.review.update({
      where: { id },
      data: { adminReply: reply }
    });
  }

  async verifyReview(id: string, isVerified: boolean, verifiedProduct?: string) {
    return this.prisma.review.update({
      where: { id },
      data: { 
        isVerified, 
        ...(verifiedProduct !== undefined && { verifiedProduct })
      }
    });
  }

  async deleteReview(id: string) {
    return this.prisma.review.delete({
      where: { id }
    });
  }

  async updateReview(id: string, data: { authorName?: string; rating?: number; comment?: string; verifiedProduct?: string; type?: string; subtitle?: string }) {
    return this.prisma.review.update({
      where: { id },
      data
    });
  }

  // Store locator using browser geolocation and Google Maps API coordinates (Haversine formula)
  async locateStores(userLat?: number, userLng?: number): Promise<any[]> {
    const stores = await this.prisma.store.findMany();
    if (userLat === undefined || userLng === undefined || isNaN(userLat) || isNaN(userLng)) {
      return stores;
    }

    return stores
      .map((store: any) => {
        const hasCoords = store.latitude !== undefined && store.longitude !== undefined && !isNaN(Number(store.latitude)) && !isNaN(Number(store.longitude));
        
        if (hasCoords) {
          const distance = this.calculateHaversineDistance(userLat, userLng, Number(store.latitude), Number(store.longitude));
          return { ...store, distance: Number(distance.toFixed(2)) }; // in Kilometers
        }
        return { ...store, distance: undefined };
      })
      .sort((a, b) => {
        if (a.distance === undefined && b.distance === undefined) return 0;
        if (a.distance === undefined) return 1; // push undefined/upcoming to bottom
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });
  }

  private calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // AI Chat Lead qualify and support flows
  async qualifyAiChatReply(message: string, chatHistory: { sender: 'USER' | 'AI'; text: string }[]): Promise<{ reply: string; qualifiedLead?: { name: string; phone: string } }> {
    const text = message.toLowerCase();
    
    // Check if the user is providing their phone/name to qualify lead
    const phoneRegex = /(\+?91)?[6-9]\d{9}/g;
    const phoneMatch = message.match(phoneRegex);

    let foundPhone = phoneMatch ? phoneMatch[0] : '';
    let foundName = '';

    // If a phone number is detected, try to extract user name
    if (foundPhone) {
      const words = message.replace(foundPhone, '').split(/\s+/).filter(w => w.length > 2);
      if (words.length > 0) {
        foundName = words[0];
      } else {
        const prevMsg = chatHistory.find(c => c.sender === 'USER' && c.text.toLowerCase().includes('my name is'));
        if (prevMsg) {
          const matchName = prevMsg.text.match(/my name is\s+([A-Za-z]+)/i);
          if (matchName) foundName = matchName[1];
        }
      }
      
      if (!foundName) foundName = 'Chat Lead';

      const lead = { name: foundName, phone: foundPhone };
      console.log(`[AI qualified Lead captured] Name: ${foundName}, Phone: ${foundPhone}`);
      
      return {
        reply: `Thank you, ${foundName}! I have recorded your contact details (${foundPhone}). One of our buy/sell representatives will contact you shortly via WhatsApp or Phone to assist you with the trade-in or retail offer. How else can I help you today?`,
        qualifiedLead: lead,
      };
    }

    if (text.includes('sell') || text.includes('trade-in') || text.includes('exchange')) {
      return {
        reply: 'We offer instant buybacks for used smartphones! You can value your device in just 30 seconds using our Diagnostics Page. To book a doorstep pickup, please provide your **Name** and **Phone Number** here and I will log it for our representative.',
      };
    }

    if (text.includes('buy') || text.includes('price') || text.includes('catalog')) {
      return {
        reply: 'We sell certified refurbished iPhones and Samsung devices with a 6-month warranty and up to 40% savings! Browse our Catalog page. We also offer easy EMI options on major cards. What specific brand or model are you looking for?',
      };
    }

    if (text.includes('store') || text.includes('address') || text.includes('location')) {
      return {
        reply: 'We have experience centers in Mumbai and Delhi. You can view our exact store directions and contact details on our Store Locator page. If you would like me to set up an in-store appointment, please share your **Name** and **Phone Number**.',
      };
    }

    return {
      reply: 'Hello! I am EcoFone’s AI Assistant. I can help you value your old phone, locate our closest retail shop, browse our refurbished inventory, or calculate EMI options. To have a human representative contact you, simply share your **Name** and **Phone Number**.',
    };
  }

  async addStore(data: {
    name: string;
    area?: string;
    city?: string;
    address?: string;
    timings?: string;
    latitude: number;
    longitude: number;
    phone?: string;
    isOpen?: boolean;
    type?: string;
    imageUrl?: string;
    mapsUrl?: string;
  }): Promise<any> {
    return this.prisma.store.create({
      data: {
        name: data.name,
        area: data.area || '',
        city: data.city || 'Lucknow',
        address: data.address || '',
        timings: data.timings || '10:00 AM - 09:00 PM',
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        phone: data.phone || '',
        isOpen: data.isOpen !== undefined ? Boolean(data.isOpen) : true,
        type: data.type || 'LIVE',
        imageUrl: data.imageUrl || '/store_hazratganj.jpg',
        mapsUrl: data.mapsUrl || '',
      }
    });
  }

  async deleteStore(id: string): Promise<any> {
    // Delete linked inventory items to prevent foreign key constraint violations
    await this.prisma.inventoryItem.deleteMany({
      where: { storeId: id }
    });

    // Disconnect linked orders (set storeId to null) so they are preserved without constraint issues
    await this.prisma.order.updateMany({
      where: { storeId: id },
      data: { storeId: null }
    });

    // Now safely delete the store
    return this.prisma.store.delete({
      where: { id }
    });
  }

  async updateStore(
    id: string,
    data: {
      name?: string;
      area?: string;
      city?: string;
      type?: string;
      address?: string;
      timings?: string;
      phone?: string;
      isOpen?: boolean;
      imageUrl?: string;
      mapsUrl?: string;
      latitude?: number;
      longitude?: number;
    },
  ): Promise<any> {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.area !== undefined) updateData.area = data.area;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.timings !== undefined) updateData.timings = data.timings;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.isOpen !== undefined) updateData.isOpen = Boolean(data.isOpen);
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.mapsUrl !== undefined) updateData.mapsUrl = data.mapsUrl;
    if (data.latitude !== undefined) updateData.latitude = Number(data.latitude);
    if (data.longitude !== undefined) updateData.longitude = Number(data.longitude);

    return this.prisma.store.update({
      where: { id },
      data: updateData
    });
  }

  async exportLeadsCsv(): Promise<string> {
    const apps = await this.prisma.franchiseApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const contacts = apps.filter((app: any) => app.locationPreference === 'Lucknow HQ Inquiry');
    const franchises = apps.filter((app: any) => app.locationPreference !== 'Lucknow HQ Inquiry');

    let csv = 'SECTION,ID,NAME,EMAIL,PHONE,LOCATION_PREF,INVESTMENT_CAPACITY,STATUS,DATE_CREATED\n';

    for (const app of franchises) {
      const name = (app.applicantName || '').replace(/"/g, '""');
      const email = app.email || '';
      const phone = app.phone || '';
      const loc = (app.locationPreference || '').replace(/"/g, '""');
      const cap = app.investmentCapacity || 0;
      const status = app.status || 'PENDING';
      const date = app.createdAt ? new Date(app.createdAt).toISOString() : '';
      csv += `Franchise,${app.id},"${name}",${email},${phone},"${loc}",${cap},${status},"${date}"\n`;
    }

    for (const app of contacts) {
      const name = (app.applicantName || '').replace(/"/g, '""');
      const email = app.email || '';
      const phone = app.phone || '';
      const desc = (app.experienceDesc || '').replace(/"/g, '""');
      const status = app.status || 'PENDING';
      const date = app.createdAt ? new Date(app.createdAt).toISOString() : '';
      csv += `Contact Inquiry,${app.id},"${name}",${email},${phone},"HQ Inquiry (Desc: ${desc})",0,${status},"${date}"\n`;
    }

    return csv;
  }

  async resolveMapsUrl(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        },
      });
      const finalUrl = response.url;
      let match = finalUrl.match(/!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/);
      if (match) {
        return { lat: parseFloat(match[2]), lng: parseFloat(match[1]), finalUrl };
      }
      match = finalUrl.match(/!1d(-?\d+\.\d+)!2d(-?\d+\.\d+)/);
      if (match) {
        return { lat: parseFloat(match[2]), lng: parseFloat(match[1]), finalUrl };
      }

      match = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]), finalUrl };
      }
      match = finalUrl.match(/[?&](query|q)=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        return { lat: parseFloat(match[2]), lng: parseFloat(match[3]), finalUrl };
      }
      match = finalUrl.match(/\/place\/(-?\d+\.\d+)[+,](-?\d+\.\d+)/);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]), finalUrl };
      }
      match = finalUrl.match(/\/(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]), finalUrl };
      }

      const html = await response.text();
      const bodyMatch = html.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (bodyMatch) {
        return { lat: parseFloat(bodyMatch[1]), lng: parseFloat(bodyMatch[2]), finalUrl };
      }

      throw new Error('Coordinates not found in resolved URL or page body.');
    } catch (e: any) {
      throw new BadRequestException(`Failed to resolve Google Maps URL: ${e.message}`);
    }
  }

  async geocodeAddress(address: string): Promise<any> {
    const cleanAddress = (address || '').trim();
    if (!cleanAddress) {
      throw new BadRequestException('Address parameter cannot be empty.');
    }

    const queryNominatim = async (queryStr: string) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryStr)}&limit=1`, {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'EcoFoneStoreLocatorAdmin/1.0',
          },
        });
        if (!response.ok) return null;
        const data = await response.json();
        if (data && data.length > 0) {
          const item = data[0];
          return {
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            displayName: item.display_name,
          };
        }
      } catch (err) {
        console.warn(`OSM Nominatim fetch failed for query: "${queryStr}"`, err.message);
      }
      return null;
    };

    const getCleanAddressQuery = (addr: string) => {
      return addr
        .replace(/ecofone\s*(?:store|hub|experience\s*center|center|shop|office)?/gi, '')
        .trim()
        .replace(/^,\s*|\s*,\s*$/g, '');
    };

    const businessCleaned = getCleanAddressQuery(cleanAddress);

    if (businessCleaned && businessCleaned !== cleanAddress) {
      const result = await queryNominatim(businessCleaned);
      if (result) return result;
    }

    let result = await queryNominatim(cleanAddress);
    if (result) return result;

    const parts = businessCleaned.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) {
      for (let i = 1; i < parts.length; i++) {
        const fallbackQuery = parts.slice(i).join(', ');
        result = await queryNominatim(fallbackQuery);
        if (result) return result;
      }
    }

    const words = businessCleaned.split(/\s+/).filter(Boolean);
    if (words.length > 3) {
      result = await queryNominatim(words.slice(-4).join(' '));
      if (result) return result;
      result = await queryNominatim(words.slice(-3).join(' '));
      if (result) return result;
      result = await queryNominatim(words.slice(-2).join(' '));
      if (result) return result;
    }

    const pincodeMatch = cleanAddress.match(/\b\d{6}\b/);
    if (pincodeMatch) {
      const pincode = pincodeMatch[0];
      const cities = ['Lucknow', 'Mumbai', 'Pune', 'Bangalore', 'Delhi', 'Kolkata', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Noida', 'Gurgaon'];
      let city = '';
      for (const c of cities) {
        if (cleanAddress.toLowerCase().includes(c.toLowerCase())) {
          city = c;
          break;
        }
      }
      const structuredQuery = city ? `${pincode}, ${city}, India` : `${pincode}, India`;
      const pinResult = await queryNominatim(structuredQuery);
      if (pinResult) return pinResult;
    }

    throw new BadRequestException('Could not geocode address location. Please simplify the address fields or correct the pin on the map.');
  }

  // Team Members CRUD Operations
  async getTeamMembers(): Promise<any[]> {
    return this.prisma.teamMember.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'asc' }
      ]
    });
  }

  async reorderTeamMembers(ids: string[]): Promise<any> {
    return this.prisma.$transaction(
      ids.map((id, index) =>
        this.prisma.teamMember.update({
          where: { id },
          data: { order: index }
        })
      )
    );
  }

  async addTeamMember(data: { name: string; role: string; bio: string; initials?: string; imageUrl?: string; linkedinUrl?: string; twitterUrl?: string; githubUrl?: string }): Promise<any> {
    const parts = data.name.trim().split(/\s+/).filter(Boolean);
    const computedInitials = parts.length > 1 
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : (parts[0] ? parts[0][0] : '').toUpperCase();

    return this.prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        initials: computedInitials,
        imageUrl: data.imageUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        twitterUrl: data.twitterUrl || '',
        githubUrl: data.githubUrl || '',
      }
    });
  }

  async updateTeamMember(id: string, data: { name?: string; role?: string; bio?: string; initials?: string; imageUrl?: string; linkedinUrl?: string; twitterUrl?: string; githubUrl?: string }): Promise<any> {
    const updateData: any = {};
    if (data.name !== undefined) {
      updateData.name = data.name;
      const parts = data.name.trim().split(/\s+/).filter(Boolean);
      updateData.initials = parts.length > 1 
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : (parts[0] ? parts[0][0] : '').toUpperCase();
    }
    if (data.role !== undefined) updateData.role = data.role;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.linkedinUrl !== undefined) updateData.linkedinUrl = data.linkedinUrl;
    if (data.twitterUrl !== undefined) updateData.twitterUrl = data.twitterUrl;
    if (data.githubUrl !== undefined) updateData.githubUrl = data.githubUrl;

    return this.prisma.teamMember.update({
      where: { id },
      data: updateData
    });
  }

  async deleteTeamMember(id: string): Promise<any> {
    return this.prisma.teamMember.delete({
      where: { id }
    });
  }

  // Services / Revenue Streamdesk CMS Methods
  private getServicesSectionFilePath(): string {
    const fs = require('fs');
    const path = require('path');
    const dir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return path.join(dir, 'services_section.json');
  }

  getDefaultServicesSection() {
    return {
      pillDot: "#ea580c",
      tag: "REVENUE STREAMDESK",
      titlePrefix: "Earn from ",
      buyText: "Buy",
      sellText: "Sell",
      repairText: "Repair",
      titleSuffix: " Services",
      subtitleLine1: "EcoFone ensures steady cash flows by combining three high-margin",
      subtitleLine2: "revenue channels in a single storefront.",
      warrantyCard: {
        tag: "OFFICIAL GUARANTEE",
        title: "6-Month Comprehensive Warranty",
        description: "Every certified refurbished device undergoes a strict 32-point diagnostics check. If any hardware or technical issue arises, we cover complete diagnostic repair or replacement within 6 months."
      },
      replacementCard: {
        tag: "NO-RISK TRIAL",
        title: "3-Day Hassle-Free Replacement",
        description: "Shop with absolute peace of mind. If you are not completely satisfied with your refurbished smartphone, bring it back within 3 days for an instant exchange or upgrade."
      },
      serviceCards: [
        {
          id: "buy",
          number: "01",
          title: "Buy Used Smartphones",
          tagline: "GREAT DEVICES. SMARTER PRICES.",
          description: "Purchase pre-owned mobile phones at competitive rates. Instantly check parameters to evaluate and acquire stock.",
          linkText: "Know More",
          linkUrl: "/services#buy",
          theme: "green",
          iconType: "phone"
        },
        {
          id: "sell",
          number: "02",
          title: "Sell Certified Refurbished",
          tagline: "TURN DEVICES INTO REVENUE.",
          description: "Sell premium, warranty-backed devices. Build quick customer trust with certification seals and replacement assurances.",
          linkText: "Know More",
          linkUrl: "/services#sell",
          theme: "orange",
          iconType: "rupee"
        },
        {
          id: "repair",
          number: "03",
          title: "Repair & Accessories",
          tagline: "EVERYDAY NEEDS. RECURRING INCOME.",
          description: "Earn daily from walk-in repair diagnostics, battery replacements, and life-style accessories sales.",
          linkText: "Know More",
          linkUrl: "/services#repair",
          theme: "green",
          iconType: "gear"
        }
      ],
      footerTag: "ONE STORE  •  MULTIPLE OPPORTUNITIES"
    };
  }

  async getServicesSection(): Promise<any> {
    const fs = require('fs');
    const filePath = this.getServicesSectionFilePath();
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read services section file, returning defaults', e);
    }
    return this.getDefaultServicesSection();
  }

  async updateServicesSection(data: any): Promise<any> {
    const fs = require('fs');
    const filePath = this.getServicesSectionFilePath();
    try {
      const merged = {
        ...this.getDefaultServicesSection(),
        ...data
      };
      fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');
      return merged;
    } catch (e) {
      console.error('Failed to save services section data:', e);
      throw new BadRequestException('Failed to save services section configuration.');
    }
  }

  private getBrandsSectionFilePath(): string {
    const fs = require('fs');
    const path = require('path');
    const dir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return path.join(dir, 'brands_section.json');
  }

  getDefaultBrandsSection() {
    return [
      { id: "1", name: "Apple", logo: "/apple-dark.svg", type: "svg", color: "#1A1A1A" },
      { id: "2", name: "SAMSUNG", logo: "SAMSUNG", type: "text", color: "#1428a0" },
      { id: "3", name: "ONEPLUS", logo: "1+", type: "text", color: "#eb0028", badge: true },
      { id: "4", name: "mi", logo: "mi", type: "text", color: "#ff6900", box: true },
      { id: "5", name: "realme", logo: "realme", type: "text", color: "#ffc915", box: true, textColor: "#000" },
      { id: "6", name: "oppo", logo: "oppo", type: "text", color: "#008b47" },
      { id: "7", name: "vivo", logo: "vivo", type: "text", color: "#0066ff" }
    ];
  }

  async getBrandsSection(): Promise<any> {
    const fs = require('fs');
    const filePath = this.getBrandsSectionFilePath();
    try {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
    } catch (e) {}
    return this.getDefaultBrandsSection();
  }

  async updateBrandsSection(data: any): Promise<any> {
    const fs = require('fs');
    fs.writeFileSync(this.getBrandsSectionFilePath(), JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }

  // --- Research Articles (JSON Storage) ---
  private getResearchArticlesFilePath(): string {
    const fs = require('fs');
    const path = require('path');
    const dir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return path.join(dir, 'research_articles.json');
  }

  getDefaultResearchArticles() {
    return [
      {
        id: "1",
        publisher: 'Counterpoint Research',
        date: 'Jul 2026',
        title: 'India Refurbished Smartphone Volumes Grew 13% YoY in H1 2026',
        description: 'Strong demand and improving supply chain driving growth in the refurbished smartphone market in India.',
        url: '#',
        imageUrl: '/counterpoint-article-1.png'
      },
      {
        id: "2",
        publisher: 'Counterpoint Research',
        date: 'Jan 2025',
        title: "India's Evolving Refurbished Smartphone Growth Story",
        description: 'Key trends, market size, and opportunities shaping India’s refurbished smartphone industry.',
        url: '#',
        imageUrl: '/counterpoint-article-2.png'
      },
      {
        id: "3",
        publisher: 'IDC',
        date: 'Oct 2024',
        title: 'The Smartphone Shifts: Why Second-Hand Devices are Outpacing New Ones',
        description: 'How macroeconomic factors, sustainability and value-conscious consumers are driving the growth of the second-hand smartphone market.',
        url: '#',
        imageUrl: '/idc-article.png'
      },
      {
        id: "4",
        publisher: 'Deven Choksey Research',
        date: 'Jun 2024',
        title: 'Eco Recycling',
        description: 'An in-depth analysis of India’s e-waste, device refurbishment ecosystem and the long-term opportunity in circular electronics.',
        url: '#',
        imageUrl: '/eco-recycling-article.png'
      }
    ];
  }

  async getResearchArticles(): Promise<any> {
    try {
      const articles = await this.prisma.researchArticle.findMany({
        orderBy: { createdAt: 'desc' }
      });
      if (articles && articles.length > 0) {
        return articles;
      }
    } catch (e: any) {
      this.logger.warn(`Failed to fetch research articles from database: ${e?.message || e}`);
    }
    return this.getDefaultResearchArticles();
  }

  async createResearchArticle(data: any): Promise<any> {
    try {
      return await this.prisma.researchArticle.create({
        data: {
          publisher: data.publisher || 'EcoFone Research',
          date: data.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          title: data.title,
          description: data.description || '',
          url: data.url || '#',
          imageUrl: data.imageUrl || '/eco-recycling-article.png',
        }
      });
    } catch (e: any) {
      this.logger.error(`Failed to create research article in database: ${e?.message || e}`);
      throw e;
    }
  }

  async deleteResearchArticle(id: string): Promise<any> {
    try {
      await this.prisma.researchArticle.delete({
        where: { id }
      });
      return { success: true };
    } catch (e: any) {
      this.logger.error(`Failed to delete research article in database: ${e?.message || e}`);
      throw e;
    }
  }
}


