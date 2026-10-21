import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'research_articles.json');

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

function getArticles(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading research_articles.json:', err);
  }

  saveArticles(DEFAULT_ARTICLES);
  return DEFAULT_ARTICLES;
}

function saveArticles(articles: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving research_articles.json:', err);
  }
}

export async function GET() {
  try {
    const articles = getArticles();
    return NextResponse.json(articles);
  } catch (err: any) {
    return NextResponse.json(DEFAULT_ARTICLES);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const articles = getArticles();
    const newArticle = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    articles.unshift(newArticle);
    saveArticles(articles);
    return NextResponse.json(newArticle, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
