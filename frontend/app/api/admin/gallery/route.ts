import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getGalleryItems, saveGalleryItems, GalleryItemData } from '@/lib/gallery-data';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let mediaUrl = '';
    let caption = '';
    let type = 'image';
    let displayOrder: number | undefined = undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('media') as File | null;
      caption = (formData.get('caption') as string) || '';
      type = (formData.get('type') as string) || 'image';
      const orderStr = formData.get('display_order') as string | null;
      if (orderStr !== null && orderStr !== '') {
        displayOrder = parseInt(orderStr, 10);
      }

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
        mediaUrl = `/uploads/gallery/${filename}`;
      } else {
        mediaUrl = (formData.get('media_url') as string) || '';
      }
    } else {
      const body = await req.json();
      mediaUrl = body.media_url || '';
      caption = body.caption || '';
      type = body.type || 'image';
      if (body.display_order !== undefined && body.display_order !== '') {
        displayOrder = parseInt(body.display_order, 10);
      }
    }

    if (!mediaUrl) {
      return NextResponse.json({ error: 'Media URL or image file is required' }, { status: 400 });
    }

    const items = getGalleryItems();

    if (displayOrder === undefined || isNaN(displayOrder)) {
      const maxOrder = items.reduce((max, it) => Math.max(max, it.display_order ?? 0), -1);
      displayOrder = maxOrder + 1;
    }

    const newItem: GalleryItemData = {
      id: `gallery-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: (type as 'image' | 'video') || 'image',
      media_url: mediaUrl,
      caption: caption || '',
      display_order: displayOrder,
      is_active: true,
      created_at: new Date().toISOString(),
    };

    // If an item already occupied this display_order, replace or insert
    const existingIndex = items.findIndex((it) => it.display_order === displayOrder);
    if (existingIndex !== -1) {
      items[existingIndex] = newItem;
    } else {
      items.push(newItem);
    }

    items.sort((a, b) => a.display_order - b.display_order);
    saveGalleryItems(items);

    return NextResponse.json(newItem, { status: 201 });
  } catch (err: any) {
    console.error('Error in POST /api/admin/gallery:', err);
    return NextResponse.json({ error: err.message || 'Failed to create gallery item' }, { status: 500 });
  }
}
