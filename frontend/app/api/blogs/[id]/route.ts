import { NextResponse } from 'next/server';
import { getStoredBlogs, saveStoredBlogs } from '../../../../lib/blogs-server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const blogs = getStoredBlogs();
    const blog = blogs.find(b => b.id === id || b.slug === id);
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const blogs = getStoredBlogs();
    const index = blogs.findIndex(b => b.id === id || b.slug === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    const updated = {
      ...blogs[index],
      ...body,
      id: blogs[index].id,
      modifiedAt: new Date().toISOString(),
    };

    blogs[index] = updated;
    saveStoredBlogs(blogs);

    return NextResponse.json({ success: true, blog: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let blogs = getStoredBlogs();
    const target = blogs.find(b => b.id === id || b.slug === id);
    if (!target) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    blogs = blogs.filter(b => b.id !== id && b.slug !== id);
    saveStoredBlogs(blogs);

    return NextResponse.json({ success: true, message: `Article deleted successfully` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
