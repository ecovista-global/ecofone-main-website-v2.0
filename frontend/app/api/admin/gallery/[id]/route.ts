import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getGalleryItems, saveGalleryItems } from '@/lib/gallery-data';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const items = getGalleryItems();
  const item = items.find((i) => i.id === id);
  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contentType = req.headers.get('content-type') || '';
    const items = getGalleryItems();
    const itemIndex = items.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    const currentItem = items[itemIndex];

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('media') as File | null;
      const caption = formData.get('caption') as string | null;
      const type = formData.get('type') as string | null;
      const mediaUrl = formData.get('media_url') as string | null;

      if (caption !== null) currentItem.caption = caption;
      if (type) currentItem.type = type as 'image' | 'video';

      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${Date.now()}-${safeName}`;
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        currentItem.media_url = `/uploads/gallery/${filename}`;
      } else if (mediaUrl) {
        currentItem.media_url = mediaUrl;
      }
    } else {
      const body = await req.json();
      if (body.caption !== undefined) currentItem.caption = body.caption;
      if (body.type) currentItem.type = body.type;
      if (body.media_url) currentItem.media_url = body.media_url;
      if (body.is_active !== undefined) currentItem.is_active = Boolean(body.is_active);
      if (body.display_order !== undefined) currentItem.display_order = parseInt(body.display_order, 10);
    }

    items[itemIndex] = currentItem;
    items.sort((a, b) => a.display_order - b.display_order);
    saveGalleryItems(items);

    return NextResponse.json(currentItem);
  } catch (err: any) {
    console.error('Error in PUT /api/admin/gallery/[id]:', err);
    return NextResponse.json({ error: err.message || 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const items = getGalleryItems();
    const filtered = items.filter((i) => i.id !== id);

    if (filtered.length === items.length) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    saveGalleryItems(filtered);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    console.error('Error in DELETE /api/admin/gallery/[id]:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete item' }, { status: 500 });
  }
}
