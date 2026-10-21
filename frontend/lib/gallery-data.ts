import fs from 'fs';
import path from 'path';
import { GalleryItemData, DEFAULT_GALLERY_ITEMS } from '@/types/gallery';

export type { GalleryItemData };
export { DEFAULT_GALLERY_ITEMS };

const DATA_FILE = path.join(process.cwd(), 'data', 'gallery_items.json');

export function getGalleryItems(): GalleryItemData[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.sort((a, b) => (Number(a.display_order) ?? 0) - (Number(b.display_order) ?? 0));
      }
    }
  } catch (err) {
    console.error('Failed to read gallery_items.json:', err);
  }

  // If file doesn't exist, seed with default items
  saveGalleryItems(DEFAULT_GALLERY_ITEMS);
  return DEFAULT_GALLERY_ITEMS;
}

export function saveGalleryItems(items: GalleryItemData[]): boolean {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write gallery_items.json:', err);
    return false;
  }
}
