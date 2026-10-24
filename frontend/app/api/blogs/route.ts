import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BLOG_POSTS, BlogPost } from '../../../data/blogs';

const DATA_FILE = path.join(process.cwd(), 'data', 'blogs.json');

function formatDateToReadable(date: Date): string {
  const day = date.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';

  return `${day}${suffix} ${month} ${year}`;
}

function calculateReadingTime(text: string): string {
  const wordCount = (text || '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return `${minutes} min read`;
}

function generateSlug(title: string): string {
  return (title || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `article-${Date.now()}`;
}

import { getStoredBlogs, saveStoredBlogs } from '../../../lib/blogs-server';

// GET /api/blogs
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const query = searchParams.get('query');
    const slug = searchParams.get('slug');

    let blogs = getStoredBlogs();

    if (slug) {
      const found = blogs.find(b => b.slug === slug || b.id === slug);
      if (!found) {
        return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, blog: found });
    }

    if (status && status !== 'ALL') {
      blogs = blogs.filter(b => (b.status || 'PUBLISHED').toUpperCase() === status.toUpperCase());
    }

    if (category && category !== 'ALL') {
      blogs = blogs.filter(b => 
        (b.category && b.category.toLowerCase() === category.toLowerCase()) ||
        (b.placement && b.placement.toLowerCase() === category.toLowerCase())
      );
    }

    if (query) {
      const q = query.toLowerCase();
      blogs = blogs.filter(b => 
        b.title.toLowerCase().includes(q) ||
        (b.author?.name && b.author.name.toLowerCase().includes(q)) ||
        (b.excerpt && b.excerpt.toLowerCase().includes(q)) ||
        (b.slug && b.slug.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ success: true, count: blogs.length, blogs });
  } catch (err: any) {
    console.error('Error in GET /api/blogs:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/blogs
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ success: false, error: 'Headline / title is required.' }, { status: 400 });
    }

    const blogs = getStoredBlogs();
    const now = new Date();
    const rawSlug = body.slug ? generateSlug(body.slug) : generateSlug(body.title);

    // Ensure unique slug
    let finalSlug = rawSlug;
    let suffix = 1;
    while (blogs.some(b => b.slug === finalSlug)) {
      finalSlug = `${rawSlug}-${suffix}`;
      suffix++;
    }

    const newBlog: BlogPost = {
      id: body.id || `blog-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      slug: finalSlug,
      title: body.title.trim(),
      seoTitle: body.seoTitle?.trim() || `${body.title.trim()} | EcoFone TechByte`,
      seoDesc: body.seoDesc?.trim() || (body.excerpt ? body.excerpt.trim() : body.title.trim()),
      keywords: Array.isArray(body.keywords) 
        ? body.keywords 
        : (body.keywords ? String(body.keywords).split(',').map((k: string) => k.trim()).filter(Boolean) : ['ecofone', 'techbyte']),
      publisher: body.publisher || 'EcoFone TechByte',
      date: body.date || formatDateToReadable(now),
      publishedAt: body.publishedAt || now.toISOString(),
      modifiedAt: now.toISOString(),
      author: {
        name: body.author?.name?.trim() || 'EcoFone Editorial Team',
        role: body.author?.role?.trim() || 'Technology Editor',
        avatar: body.author?.avatar?.trim() || '/logo.png',
      },
      readingTime: body.readingTime || calculateReadingTime(body.content || body.excerpt || ''),
      category: body.category || 'Tech News',
      status: (body.status || 'PUBLISHED').toUpperCase() as 'PUBLISHED' | 'DRAFT',
      placement: body.placement || 'Main Feed / Trending',
      imageUrl: body.imageUrl?.trim() || '/techbyte_oneplus16_hero.jpg',
      imageAlt: body.imageAlt?.trim() || body.title.trim(),
      excerpt: body.excerpt?.trim() || (body.content ? body.content.slice(0, 160).trim() + '...' : ''),
      content: body.content?.trim() || '',
      keyStats: Array.isArray(body.keyStats) ? body.keyStats : [],
      faqs: Array.isArray(body.faqs) ? body.faqs : [],
      relatedSlugs: Array.isArray(body.relatedSlugs) ? body.relatedSlugs : [],
    };

    // Prepend to top
    blogs.unshift(newBlog);
    saveStoredBlogs(blogs);

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (err: any) {
    console.error('Error in POST /api/blogs:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PUT /api/blogs
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id || body.slug;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Article ID or slug is required for update.' }, { status: 400 });
    }

    const blogs = getStoredBlogs();
    const index = blogs.findIndex(b => b.id === id || b.slug === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Article not found.' }, { status: 404 });
    }

    const existing = blogs[index];
    const now = new Date();

    const updatedBlog: BlogPost = {
      ...existing,
      ...body,
      id: existing.id, // Preserve original ID
      slug: body.slug ? generateSlug(body.slug) : existing.slug,
      title: body.title !== undefined ? body.title.trim() : existing.title,
      seoTitle: body.seoTitle !== undefined ? body.seoTitle.trim() : existing.seoTitle,
      seoDesc: body.seoDesc !== undefined ? body.seoDesc.trim() : existing.seoDesc,
      keywords: body.keywords !== undefined 
        ? (Array.isArray(body.keywords) ? body.keywords : String(body.keywords).split(',').map((k: string) => k.trim()).filter(Boolean))
        : existing.keywords,
      author: {
        ...existing.author,
        ...(body.author || {}),
      },
      category: body.category || existing.category,
      status: body.status !== undefined ? (body.status.toUpperCase() as 'PUBLISHED' | 'DRAFT') : existing.status,
      placement: body.placement || existing.placement,
      imageUrl: body.imageUrl !== undefined ? body.imageUrl : existing.imageUrl,
      imageAlt: body.imageAlt !== undefined ? body.imageAlt : existing.imageAlt,
      excerpt: body.excerpt !== undefined ? body.excerpt.trim() : existing.excerpt,
      content: body.content !== undefined ? body.content.trim() : existing.content,
      readingTime: body.content ? calculateReadingTime(body.content) : existing.readingTime,
      modifiedAt: now.toISOString(),
    };

    blogs[index] = updatedBlog;
    saveStoredBlogs(blogs);

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (err: any) {
    console.error('Error in PUT /api/blogs:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE /api/blogs
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Article ID is required for deletion.' }, { status: 400 });
    }

    let blogs = getStoredBlogs();
    const target = blogs.find(b => b.id === id || b.slug === id);

    if (!target) {
      return NextResponse.json({ success: false, error: 'Article not found.' }, { status: 404 });
    }

    blogs = blogs.filter(b => b.id !== id && b.slug !== id);
    saveStoredBlogs(blogs);

    return NextResponse.json({ success: true, message: `Article "${target.title}" permanently removed.`, deletedId: target.id });
  } catch (err: any) {
    console.error('Error in DELETE /api/blogs:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
