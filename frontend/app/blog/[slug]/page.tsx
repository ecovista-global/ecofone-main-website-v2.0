import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs, getRelatedPosts } from '../../../data/blogs';
import BlogDetailClient from './blog-detail-client';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | EcoFone',
      description: 'The requested research article could not be found.',
    };
  }

  const siteUrl = 'https://www.ecofone.co.in';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.imageUrl.startsWith('http') ? post.imageUrl : `${siteUrl}${post.imageUrl}`;

  return {
    title: `${post.seoTitle} | EcoFone Research`,
    description: post.seoDesc,
    keywords: post.keywords,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.seoDesc,
      url: postUrl,
      siteName: 'EcoFone India',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seoDesc,
      images: [imageUrl],
      creator: '@ecofonel82115',
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.relatedSlugs
    ? post.relatedSlugs
        .map((rSlug) => getBlogPostBySlug(rSlug))
        .filter((p): p is typeof post => Boolean(p))
    : getRelatedPosts(post.slug, 3);

  const siteUrl = 'https://www.ecofone.co.in';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.imageUrl.startsWith('http') ? post.imageUrl : `${siteUrl}${post.imageUrl}`;

  // Structured Data: BlogPosting / Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.seoDesc,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    author: {
      '@type': 'Organization',
      name: post.author.name,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'EcoFone India',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
  };

  // Structured Data: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles & Research',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  // Structured Data: FAQPage (if FAQs exist)
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogDetailClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
