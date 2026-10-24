import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminAuth, extractBearerToken } from '@/lib/auth-guard';

import { readFallbackJson, writeFallbackJson } from '@/lib/json-fallback';

const BACKEND_URL = process.env.INTERNAL_BACKEND_URL || process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4012';

const DEFAULT_ARTICLES = [
  {
    id: "1",
    publisher: 'Counterpoint Research',
    date: 'Jul 2026',
    title: 'India Refurbished Smartphone Volumes Grew 13% YoY in H1 2026',
    description: 'India refurbished smartphone volumes grew 13% YoY in H1 2026 as rising component costs and inflation drive strong consumer demand.',
    url: '/blog/india-refurbished-smartphone-market-grows-13-percent-counterpoint',
    imageUrl: '/article_counterpoint_chart.webp'
  },
  {
    id: "2",
    publisher: 'Business Standard',
    date: 'Sep 02 2026',
    title: 'Costlier new phones drive demand for refurbished devices in India: Report',
    description: "India's refurbished smartphone market is growing rapidly as new devices get costlier, with secondary market demand hitting record highs.",
    url: '/blog/costlier-new-phones-drive-demand-refurbished-india',
    imageUrl: '/article_bs_costlier.jpg'
  },
  {
    id: "3",
    publisher: 'Business Standard',
    date: 'Apr 21 2025',
    title: '1 in 5 smartphones sold in India is refurbished: Counterpoint Research',
    description: 'Experts point out that many consumers looking to upgrade prefer feature-packed certified refurbished smartphones over entry-level new ones.',
    url: '/blog/one-in-five-smartphones-sold-in-india-is-refurbished',
    imageUrl: '/article_bs_1in5.jpg'
  },
  {
    id: "4",
    publisher: 'Times of India',
    date: 'July 16, 2026',
    title: 'Rising cost fuels rush for refurbished devices',
    description: "Soaring memory and chip costs push up new smartphone prices, accelerating consumer shift towards certified pre-owned alternatives.",
    url: '/blog/rising-costs-fuel-rush-for-refurbished-devices-india',
    imageUrl: '/article_toi_rising.jpg'
  }
];

async function getLocalArticles(): Promise<any[]> {
  const articles = await readFallbackJson<any[]>('research_articles.json', []);
  if (Array.isArray(articles) && articles.length > 0) {
    return articles;
  }
  return DEFAULT_ARTICLES;
}

async function saveLocalArticles(articles: any[]): Promise<void> {
  await writeFallbackJson('research_articles.json', articles);
}

export async function GET() {
  try {
    // Attempt backend query first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`${BACKEND_URL}/api/v1/research`, {
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
      // Fallback
    }

    const articles = await getLocalArticles();
    return NextResponse.json(articles);
  } catch (err: any) {
    return NextResponse.json(DEFAULT_ARTICLES);
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

    let savedArticle: any = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${BACKEND_URL}/api/v1/research`, {
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
        savedArticle = await res.json();
      }
    } catch (_) {}

    const articles = await getLocalArticles();
    const newArticle = savedArticle || {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    articles.unshift(newArticle);
    await saveLocalArticles(articles);
    return NextResponse.json(newArticle, { status: 201 });
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
      } catch (_) {}
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Article ID required' }, { status: 400 });
    }

    const token = extractBearerToken(req);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      await fetch(`${BACKEND_URL}/api/v1/research/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
    } catch (_) {}

    const articles = await getLocalArticles();
    const filtered = articles.filter(a => a.id !== id);
    await saveLocalArticles(filtered);

    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
