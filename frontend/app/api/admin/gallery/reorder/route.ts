import { NextResponse } from 'next/server';
import { getGalleryItems, saveGalleryItems } from '@/lib/gallery-data';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { items: reorderedItems } = body;

    if (!Array.isArray(reorderedItems)) {
      return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    }

    const currentItems = getGalleryItems();

    // Map each updated order
    const updatesMap = new Map<string, number>();
    for (const item of reorderedItems) {
      if (item && item.id !== undefined && item.display_order !== undefined) {
        updatesMap.set(String(item.id), parseInt(item.display_order, 10));
      }
    }

    for (const item of currentItems) {
      if (updatesMap.has(item.id)) {
        item.display_order = updatesMap.get(item.id)!;
      }
    }

    currentItems.sort((a, b) => a.display_order - b.display_order);
    saveGalleryItems(currentItems);

    return NextResponse.json({ success: true, count: reorderedItems.length });
  } catch (err: any) {
    console.error('Error in PUT /api/admin/gallery/reorder:', err);
    return NextResponse.json({ error: err.message || 'Failed to reorder items' }, { status: 500 });
  }
}
