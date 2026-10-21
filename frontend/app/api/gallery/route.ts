import { NextResponse } from 'next/server';
import { getGalleryItems } from '@/lib/gallery-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = getGalleryItems();
    const activeItems = items.filter((item) => item.is_active !== false);
    return NextResponse.json(activeItems);
  } catch (err: any) {
    console.error('Error in GET /api/gallery:', err);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}
