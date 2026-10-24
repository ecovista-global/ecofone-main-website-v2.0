import { NextResponse } from 'next/server';
import { readFallbackJson, writeFallbackJson } from '@/lib/json-fallback';
import { verifyAdminAuth } from '@/lib/auth-guard';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const { id } = await params;
    const articles = await readFallbackJson<any[]>('research_articles.json', []);
    const filtered = articles.filter((a: any) => a.id !== id);
    await writeFallbackJson('research_articles.json', filtered);
    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
