import type { Metadata } from 'next';
import React from 'react';
import { BLOG_POSTS } from '../../data/blogs';
import BlogListingClient from './blog-listing-client';

export const metadata: Metadata = {
  title: 'EcoFone Research & Articles | Refurbished Smartphone Market Trends',
  description: 'Read complete research reports from Counterpoint, Business Standard, and Times of India rephrased and analyzed by EcoFone. Discover market data, buying guides, and circular economy trends.',
  keywords: [
    'refurbished smartphone market India',
    'Counterpoint research refurbished phones',
    'why are new smartphones expensive India',
    '1 in 5 smartphones refurbished',
    'buy refurbished phones Lucknow',
    'sell used phone online India',
    'refurbished mobile franchise business',
    'EcoFone research articles'
  ],
  alternates: {
    canonical: 'https://www.ecofone.co.in/blog',
  },
  openGraph: {
    title: 'EcoFone Research & Articles | Refurbished Smartphone Market Trends',
    description: 'Explore in-depth analysis on why 1 in 5 smartphones in India is refurbished and how rising costs are driving demand for certified pre-owned tech.',
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
