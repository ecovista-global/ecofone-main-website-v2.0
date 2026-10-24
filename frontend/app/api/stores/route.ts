import { NextResponse } from 'next/server';
import { verifyAdminAuth, extractBearerToken } from '@/lib/auth-guard';
import { readFallbackJson, writeFallbackJson } from '@/lib/json-fallback';

const BACKEND_URL = process.env.INTERNAL_BACKEND_URL || process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4012';

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

async function getLocalStores(): Promise<any[]> {
  const stores = await readFallbackJson<any[]>('stores.json', []);
  if (Array.isArray(stores) && stores.length > 0) {
    return stores;
  }
  return INITIAL_STORES;
}

async function saveLocalStores(stores: any[]): Promise<void> {
  await writeFallbackJson('stores.json', stores);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const query = lat && lng ? `?lat=${lat}&lng=${lng}` : '';

    // Attempt to fetch from backend PostgreSQL API first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`${BACKEND_URL}/api/v1/cms/stores${query}`, {
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return NextResponse.json(data);
        }
      }
    } catch (_) {
      // Backend unavailable; seamlessly fall back to local JSON store
    }

    const stores = await getLocalStores();
    return NextResponse.json(stores);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = verifyAdminAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
  }

  try {
    const body = await req.json();
    const token = extractBearerToken(req);

    // Forward to backend CMS
    let backendSuccess = false;
    let savedStore: any = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${BACKEND_URL}/api/v1/cms/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        savedStore = await res.json();
        backendSuccess = true;
      }
    } catch (_) {}

    // Fallback/mirror to local file
    const stores = await getLocalStores();
    const newStore = savedStore || {
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
    await saveLocalStores(stores);

    return NextResponse.json({ success: true, store: newStore });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = verifyAdminAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Store ID required' }, { status: 400 });
    }

    const token = extractBearerToken(req);

    // Forward to backend CMS
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      await fetch(`${BACKEND_URL}/api/v1/cms/stores/${encodeURIComponent(body.id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
    } catch (_) {}

    const stores = await getLocalStores();
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

    await saveLocalStores(stores);
    return NextResponse.json({ success: true, store: stores[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = verifyAdminAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
  }

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

    const token = extractBearerToken(req);

    // Forward to backend CMS
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      await fetch(`${BACKEND_URL}/api/v1/cms/stores/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
    } catch (_) {}

    const stores = await getLocalStores();
    const filtered = stores.filter(s => s.id !== id);
    await saveLocalStores(filtered);

    return NextResponse.json({ success: true, message: 'Store deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
