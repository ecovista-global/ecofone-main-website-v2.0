import fs from 'fs';
import path from 'path';
import { BLOG_POSTS, BlogPost } from '../data/blogs';

const DATA_FILE = path.join(process.cwd(), 'data', 'blogs.json');
const TMP_DATA_FILE = '/tmp/ecofone-fallback-data/blogs.json';

export function getStoredBlogs(): BlogPost[] {
  for (const candidate of [TMP_DATA_FILE, DATA_FILE]) {
    try {
      if (fs.existsSync(candidate)) {
        const data = fs.readFileSync(candidate, 'utf-8');
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      // Continue to next candidate
    }
  }

  // Fallback to initial seed posts from blogs.ts and persist them
  const initial = BLOG_POSTS.map((p, idx) => ({
    ...p,
    status: p.status || 'PUBLISHED',
    placement: p.placement || (idx === 0 ? 'Hero Main Featured' : idx < 5 ? 'Hero Right Trending' : p.category),
  }));

  saveStoredBlogs(initial);
  return initial;
}

export function saveStoredBlogs(blogs: BlogPost[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
  } catch (err) {
    // Readonly root filesystem fallback (AWS ECS)
    try {
      const tmpDir = path.dirname(TMP_DATA_FILE);
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
    } catch (tmpErr) {
      console.error('Error saving blogs.json to /tmp:', tmpErr);
    }
  }
}

export function getBlogPosts(): BlogPost[] {
  return getStoredBlogs();
}

export function getAllBlogSlugs(): string[] {
  return getBlogPosts().map((p) => p.slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug || p.id === slug);
}

export function getFeaturedPost(): BlogPost {
  const posts = getBlogPosts();
  return posts.find((p) => (p.placement === 'Hero Main Featured' || p.category === 'Hero Main Featured') && p.status !== 'DRAFT') || posts[0];
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const posts = getBlogPosts().filter((p) => p.status !== 'DRAFT');
  const currentPost = posts.find((post) => post.slug === currentSlug);
  if (!currentPost) return posts.slice(0, limit);

  return posts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => (a.category === currentPost.category ? -1 : 1))
    .slice(0, limit);
}
