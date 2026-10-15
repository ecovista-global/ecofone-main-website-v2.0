import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'stores.json');

const INITIAL_STORES = [
  {
    id: "store-hazratganj",
    name: "EcoFone Store - Hazratganj",
    area: "Hazratganj",
    city: "Lucknow",
    address: "Shop No. 12, Ground Floor, Hazratganj Market, Lucknow, Uttar Pradesh – 226001",
    timings: "10:00 AM - 10:00 PM",
    phone: "+91 99199 65499",
    isOpen: true,
    type: "LIVE",
    imageUrl: "/store_hazratganj.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shop+No.+12+Ground+Floor+Hazratganj+Market+Lucknow+Uttar+Pradesh+226001",
    latitude: 26.8467,
    longitude: 80.9462,
    createdAt: new Date().toISOString()
  },
  {
    id: "store-alambagh",
    name: "EcoFone Store - Alambagh",
    area: "Alambagh",
    city: "Lucknow",
    address: "Shop No. G-4, Alambagh Market, Alambagh, Lucknow, Uttar Pradesh – 226005",
    timings: "10:00 AM - 09:00 PM",
    phone: "+91 99199 65499",
    isOpen: true,
    type: "LIVE",
    imageUrl: "/store_alambagh.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shop+No.+G-4+Alambagh+Market+Alambagh+Lucknow+Uttar+Pradesh+226005",
    latitude: 26.8142,
    longitude: 80.9022,
    createdAt: new Date().toISOString()
  },
  {
    id: "store-gomtinagar",
    name: "EcoFone Store - Gomti Nagar",
    area: "Gomti Nagar",
    city: "Lucknow",
    address: "D-202, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh – 226010",
    timings: "10:00 AM - 09:00 PM",
    phone: "+91 99199 65499",
    isOpen: true,
    type: "LIVE",
    imageUrl: "/store_gomtinagar.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=D-202+Vibhuti+Khand+Gomti+Nagar+Lucknow+Uttar+Pradesh+226010",
    latitude: 26.8627,
    longitude: 81.0012,
    createdAt: new Date().toISOString()
  }
];

function getStores(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading stores file:', err);
  }
  // Initialize with default stores if file does not exist
  saveStores(INITIAL_STORES);
  return INITIAL_STORES;
}

function saveStores(stores: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(stores, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing stores file:', err);
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const stores = getStores();
    return NextResponse.json(stores);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const stores = getStores();

    const newStore = {
      id: body.id || `store-${Date.now()}`,
      name: body.name || 'EcoFone Store',
      area: body.area || '',
      city: body.city || 'Lucknow',
      address: body.address || '',
      timings: body.timings || '10:00 AM - 09:00 PM',
      phone: body.phone || '+91 99199 65499',
      isOpen: body.isOpen !== undefined ? Boolean(body.isOpen) : true,
      type: body.type || 'LIVE',
      imageUrl: body.imageUrl || '/store_hazratganj.jpg',
      mapsUrl: body.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(body.address || body.name)}`,
      latitude: body.latitude ? Number(body.latitude) : 26.8467,
      longitude: body.longitude ? Number(body.longitude) : 80.9462,
      createdAt: new Date().toISOString()
    };

    stores.unshift(newStore);
    saveStores(stores);

    return NextResponse.json({ success: true, store: newStore });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Store ID required' }, { status: 400 });
    }

    const stores = getStores();
    const index = stores.findIndex(s => s.id === body.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Store not found' }, { status: 404 });
    }

    stores[index] = {
      ...stores[index],
      ...body,
      isOpen: body.isOpen !== undefined ? Boolean(body.isOpen) : stores[index].isOpen,
      updatedAt: new Date().toISOString()
    };

    saveStores(stores);
    return NextResponse.json({ success: true, store: stores[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch (e) {}
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Store ID required' }, { status: 400 });
    }

    const stores = getStores();
    const filtered = stores.filter(s => s.id !== id);
    saveStores(filtered);

    return NextResponse.json({ success: true, message: 'Store deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
