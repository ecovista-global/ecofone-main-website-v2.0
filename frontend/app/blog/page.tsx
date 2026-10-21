import type { Metadata } from 'next';
import React from 'react';
import { BLOG_POSTS } from '../../data/blogs';
import BlogListingClient from './blog-listing-client';

export const metadata: Metadata = {
  title: 'TechByte | EcoFone Smartphone News, Reviews & Refurbished Tech Guides',
  description: 'Welcome to EcoFone TechByte: Latest mobile news, flagship comparisons, camera reviews, eSIM guides, and certified refurbished tech buying advice in India.',
  keywords: [
    'EcoFone TechByte',
    'smartphone news India',
    'OnePlus 16 vs OnePlus 15',
    'iPhone festival sale deals',
    'refurbished smartphone market India',
    'how to transfer airtel esim',
    'certified refurbished phones Lucknow'
  ],
  alternates: {
    canonical: 'https://www.ecofone.co.in/blog',
  },
  openGraph: {
    title: 'TechByte | EcoFone Smartphone News, Reviews & Refurbished Tech Guides',
    description: 'Latest mobile news, flagship smartphone comparisons, camera reviews, and circular economy research by EcoFone.',
    url: 'https://www.ecofone.co.in/blog',
    siteName: 'EcoFone India',
    images: [
      {
        url: 'https://www.ecofone.co.in/article_counterpoint_chart.webp',
        width: 1200,
        height: 630,
        alt: 'EcoFone Refurbished Smartphone Market Intelligence',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoFone Research & Articles | Refurbished Smartphone Trends',
    description: 'Read the latest data on India\'s secondary mobile phone industry from Counterpoint, Business Standard, and EcoFone.',
    images: ['https://www.ecofone.co.in/article_counterpoint_chart.webp'],
  },
};

export default function BlogListingPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://www.ecofone.co.in/blog#blog',
    name: 'EcoFone Market Intelligence & Research Hub',
    description: 'In-depth market research, industry analysis, and consumer buying guides for certified refurbished electronics in India.',
    url: 'https://www.ecofone.co.in/blog',
    publisher: {
      '@type': 'Organization',
      name: 'EcoFone India',
      url: 'https://www.ecofone.co.in',
      logo: 'https://www.ecofone.co.in/logo.jpg',
    },
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.seoDesc,
      url: `https://www.ecofone.co.in/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.modifiedAt,
      image: `https://www.ecofone.co.in${post.imageUrl}`,
      author: {
        '@type': 'Organization',
        name: post.author.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogListingClient posts={BLOG_POSTS} />
    </>
  );
}
