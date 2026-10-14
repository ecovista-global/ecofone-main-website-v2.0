import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Max file size: 10 MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.rtf', '.txt'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No resume file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum limit of 10MB' },
        { status: 400 }
      );
    }

    const originalName = file.name || 'resume.pdf';
    const ext = path.extname(originalName).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload PDF, DOC, or DOCX files.' },
        { status: 400 }
      );
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate safe unique filename
    const cleanBaseName = path.basename(originalName, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 40);
    const uniqueFileName = `${Date.now()}_${cleanBaseName}${ext}`;
    const destinationPath = path.join(uploadsDir, uniqueFileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/resumes/${uniqueFileName}`;
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: originalName,
      fileSize: `${sizeInMb} MB`,
      uploadedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Upload Resume Error]:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload resume file' },
      { status: 500 }
    );
  }
}
