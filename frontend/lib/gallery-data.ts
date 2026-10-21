import fs from 'fs';
import path from 'path';

export interface GalleryItemData {
  id: string;
  type: 'image' | 'video';
  media_url: string;
  caption: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'gallery_items.json');

// Default initial items for EcoFone if no items exist yet
export const DEFAULT_GALLERY_ITEMS: GalleryItemData[] = [
  {
    id: 'eco-gallery-0',
    type: 'image',
    media_url: '/gallery_ribbon_opening.jpg',
    caption: 'SIZE:2x1|Grand Opening of New Delhi Saket Experience Center',
    display_order: 0,
    is_active: true,
    created_at: new Date('2026-01-15').toISOString(),
  },
  {
    id: 'eco-gallery-1',
    type: 'image',
    media_url: '/gallery_owner_launch.jpg',
    caption: 'SIZE:1x1|Store Owner Suresh Kumar & Partner Team in Lucknow',
    display_order: 1,
    is_active: true,
    created_at: new Date('2026-01-18').toISOString(),
  },
  {
    id: 'eco-gallery-2',
    type: 'image',
    media_url: '/store_hazratganj.jpg',
    caption: 'SIZE:1x2|Signature Hazratganj Flagship Store Experience Center',
    display_order: 2,
    is_active: true,
    created_at: new Date('2026-01-20').toISOString(),
  },
  {
    id: 'eco-gallery-3',
    type: 'image',
    media_url: '/gallery_customer_handover.jpg',
    caption: 'SIZE:1x1|Certified Warranty Handover to Happy Customer',
    display_order: 3,
    is_active: true,
    created_at: new Date('2026-02-01').toISOString(),
  },
  {
    id: 'eco-gallery-4',
    type: 'image',
    media_url: '/store_alambagh.jpg',
    caption: 'SIZE:2x1|Alambagh Hub High-Footfall Retail Counter',
    display_order: 4,
    is_active: true,
    created_at: new Date('2026-02-05').toISOString(),
  },
  {
    id: 'eco-gallery-5',
    type: 'image',
    media_url: '/gallery_partner_meet.jpg',
    caption: 'SIZE:1x1|Annual Franchise Partner Summit & Growth Conference',
    display_order: 5,
    is_active: true,
    created_at: new Date('2026-02-12').toISOString(),
  },
  {
    id: 'eco-gallery-6',
    type: 'image',
    media_url: '/store_gomtinagar.jpg',
    caption: 'SIZE:1x2|Gomti Nagar Premium Storefront & Diagnostics Lab',
    display_order: 6,
    is_active: true,
    created_at: new Date('2026-02-18').toISOString(),
  },
  {
    id: 'eco-gallery-7',
    type: 'image',
    media_url: '/about_ops.jpg',
    caption: 'SIZE:1x1|32-Point Quality Diagnostics & Hardware Testing',
    display_order: 7,
    is_active: true,
    created_at: new Date('2026-02-25').toISOString(),
  },
  {
    id: 'eco-gallery-8',
    type: 'image',
    media_url: '/ecofone_store_hero.jpg',
    caption: 'SIZE:2x1|EcoFone Unified POS System & Store Operations',
    display_order: 8,
    is_active: true,
    created_at: new Date('2026-03-01').toISOString(),
  },
  {
    id: 'eco-gallery-9',
    type: 'image',
    media_url: '/new_store.jpg',
    caption: 'SIZE:1x1|Modern Retail Interior & Customer Consultation Desk',
    display_order: 9,
    is_active: true,
    created_at: new Date('2026-03-08').toISOString(),
  },
];

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
