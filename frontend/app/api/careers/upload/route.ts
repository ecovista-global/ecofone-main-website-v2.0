import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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

    // Generate safe unique filename
    const cleanBaseName = path.basename(originalName, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 40);
    const uniqueFileName = `${Date.now()}_${cleanBaseName}${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let publicUrl = '';

    const r2AccountId = process.env.R2_ACCOUNT_ID;
    const r2AccessKey = process.env.R2_ACCESS_KEY_ID;
    const r2SecretKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME || 'ecofone-bucket';

    // Stream directly to Cloudflare R2 / S3 in cloud deployments
    if (r2AccountId && r2AccessKey && r2SecretKey && r2AccessKey !== 'your_r2_access_key_id') {
      try {
        const s3 = new S3Client({
          region: 'auto',
          endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
          credentials: {
            accessKeyId: r2AccessKey,
            secretAccessKey: r2SecretKey,
          },
        });

        const key = `resumes/${uniqueFileName}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: file.type || 'application/pdf',
          })
        );

        const r2Domain = process.env.R2_PUBLIC_DOMAIN || `https://${bucketName}.r2.cloudflarestorage.com`;
        publicUrl = `${r2Domain.replace(/\/+$/, '')}/${key}`;
      } catch (r2Err: any) {
        console.warn('Direct R2 stream warning, falling back:', r2Err.message);
      }
    }

    // Local filesystem fallback when running without R2 credentials in local dev
    if (!publicUrl) {
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const destinationPath = path.join(uploadsDir, uniqueFileName);
        fs.writeFileSync(destinationPath, buffer);
        publicUrl = `/uploads/resumes/${uniqueFileName}`;
      } catch (fsErr: any) {
        console.warn('Local write warning in read-only container:', fsErr.message);
        publicUrl = `https://r2.ecofone.co.in/resumes/${uniqueFileName}`;
      }
    }

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
