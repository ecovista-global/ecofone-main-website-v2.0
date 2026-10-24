import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate mime type
    const validMimes = ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif', 'image/jpg'];
    if (file.type && !validMimes.includes(file.type.toLowerCase())) {
      return NextResponse.json({ success: false, error: 'Unsupported file format. Please upload PNG, JPG, WebP, or AVIF.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const sanitizedBase = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}_${sanitizedBase}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/blogs/${filename}`;

    return NextResponse.json({ success: true, url: publicUrl, filename });
  } catch (err: any) {
    console.error('Blog image upload error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Image upload failed' }, { status: 500 });
  }
}
