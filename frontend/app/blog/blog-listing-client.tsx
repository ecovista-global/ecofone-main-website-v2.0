'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  BlogPost, 
  YOU_MAY_ALSO_READ, 
  FIRST_IMPRESSIONS 
} from '../../data/blogs';

interface BlogListingClientProps {
  posts: BlogPost[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  // Read More toggle state for editorial description
  const [isExpanded, setIsExpanded] = useState(false);

  // References for horizontal scrolling carousels
  const popularNewsRef = useRef<HTMLDivElement>(null);
  const tipsTricksRef = useRef<HTMLDivElement>(null);
  const techNewsRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, distance: number = 320) => {
    if (ref.current) {
      ref.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  // 1. Featured Bento Article (Flagship)
  const featuredPost = posts.find(p => p.id === 'oneplus-16-vs-oneplus-15-biggest-upgraded-flagship') || posts[0];

  // 2. Bento Side 4 Articles (135px x 80px thumbnails, strictly rectangular with rounded-md 6px)
  const bentoSidePosts = [
    posts.find(p => p.id === 'iphone-17-pro-price-drops-festival-sale') || posts[1],
    posts.find(p => p.id === 'iqoo-neo-12-launch-date-specs-expected-price') || posts[2],
    posts.find(p => p.id === 'oppo-find-x10-series-launch-date-specs-india') || posts[3],
    posts.find(p => p.id === 'prime-lens-vs-zoom-lens-better-for-photography') || posts[4],
  ].filter(Boolean) as BlogPost[];

  // 3. Trending Horizontal Articles
  const trendingPosts = posts.filter(p => p.category === 'Trending');

  // 4. Categorized Row Posts (ensure at least 3+ cards for each)
  const popularNewsPosts = posts.filter(p => p.category === 'Popular News');
  const tipsTricksPosts = posts.filter(p => p.category === 'Tips & Tricks');
  const techNewsPosts = posts.filter(p => p.category === 'Tech News' && p.id !== featuredPost?.id);

  return (
    <div className="w-full bg-[#f8faf9] min-h-screen font-sans text-slate-900 pb-20">

      {/* Main Container - Extended to 1440px max width */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        
        {/* 2. Editorial Header & Breadcrumbs */}
        <div className="space-y-2">
          {/* Breadcrumb Trail */}
          <nav className="text-[13px] text-[#6b7280] font-medium flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#ea580c] transition-colors">
              Home
            </Link>
            <span className="text-slate-400 font-normal">&gt;</span>
            <span className="text-[#071f12] font-semibold">TechByte</span>
          </nav>

          {/* Section Title */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#071f12] tracking-tight">
              Tech<span className="text-[#ea580c]">Byte</span>
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#071f12] text-[#22c55e] border border-emerald-800/40 tracking-wider uppercase">
              EcoFone Editorial
            </span>
          </div>

          {/* Intro Description with Inline Read More */}
          <p className="text-[13.5px] sm:text-[14px] text-[#4b5563] leading-relaxed max-w-5xl">
            Welcome to EcoFone&apos;s articles section, where we continuously curate the best and most helpful content for you to navigate the smartphone and gadgets world easily. Primarily you will find the latest mobile news here updated as soon as possible, so you are always on track with what is going on in the smartphone world
            {!isExpanded ? (
              <>
                ....{' '}
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="text-[#ea580c] font-semibold hover:text-[#c2410c] hover:underline inline-block focus:outline-none"
                >
                  ...Read More
                </button>
              </>
            ) : (
              <>
                , whether you are tracking upcoming flagship launch dates, periscope camera evaluations, eSIM carrier transfers, or discovering authentic data on India&apos;s thriving certified refurbished electronics sector.{' '}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-[#ea580c] font-semibold hover:text-[#c2410c] hover:underline inline-block focus:outline-none ml-1"
                >
                  ...Read Less
                </button>
              </>
            )}
          </p>
        </div>

        {/* 3. Top Bento Featured Card (2-Column Asymmetric Hero) */}
        {featuredPost && (
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#eaeaea] shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              
              {/* Left Column: Flagship Article Banner (~62% width on desktop) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="aspect-[16/9] w-full rounded-none overflow-hidden bg-slate-900 relative">
                    <img
                      src={featuredPost.imageUrl}
                      alt={featuredPost.imageAlt || featuredPost.title}
                      className="w-full h-full object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </div>

                  <h2 className="text-[18px] sm:text-[20px] font-bold text-[#071f12] mt-3 group-hover:text-[#ea580c] transition-colors line-clamp-2 leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>

                <div className="text-[12px] text-[#6b7280] font-medium mt-1">
                  {featuredPost.date}
                </div>
              </div>

              {/* Right Column: 4 Trending Side Articles (~38% width on desktop) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-3 sm:gap-3.5 h-full lg:pl-2">
                {bentoSidePosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center gap-3.5 transition-colors"
                  >
                    {/* Thumbnail: 135px x 80px rectangular with rounded-none */}
                    <div className="w-[130px] sm:w-[135px] h-[78px] sm:h-[80px] rounded-none overflow-hidden bg-slate-100 shrink-0 relative">
                      <img
                        src={post.imageUrl}
                        alt={post.imageAlt || post.title}
                        className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Text Block */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#071f12] line-clamp-2 leading-snug group-hover:text-[#ea580c] transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-[12px] text-[#6b7280] font-medium mt-1 block">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* 4. Main Content Split: 2-Column Editorial Feed (Left 68%) + Sticky Sidebar (Right 32%) */}
        {/* Starts IMMEDIATELY below the Hero Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start w-full">
          
          {/* ================= LEFT COLUMN (68% Width) ================= */}
          <div className="lg:col-span-8 space-y-9 w-full">
            
            {/* Part A: Trending Horizontal Stacked Cards */}
            {trendingPosts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 bg-[#ea580c] inline-block" />
                    <h2 className="text-[19px] sm:text-[20px] font-bold text-[#071f12]">
                      Trending
                    </h2>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 space-y-4">
                  {trendingPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col sm:flex-row gap-4 pt-4 first:pt-0"
                    >
                      {/* Left Thumbnail: 260px x 150px rounded-none */}
                      <div className="w-full sm:w-[250px] md:w-[260px] h-[160px] sm:h-[150px] rounded-none overflow-hidden bg-slate-100 shrink-0 relative">
                        <img
                          src={post.imageUrl}
                          alt={post.imageAlt || post.title}
                          className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Right Text Block */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h3 className="text-[16.5px] sm:text-[18px] font-bold text-[#071f12] group-hover:text-[#ea580c] transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-[13.5px] text-[#4b5563] line-clamp-2 leading-relaxed mt-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <span className="text-[12px] text-[#16a34a] font-medium mt-3 sm:mt-0">
                          {post.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Part B: Categorized Row 1 - Popular News (3-Card Horizontal Carousel with Circular Right Arrow) */}
            {popularNewsPosts.length > 0 && (
              <div className="space-y-3.5 relative">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 bg-[#ea580c] inline-block" />
                    <h2 className="text-[19px] sm:text-[20px] font-bold text-[#071f12]">
                      Popular News
                    </h2>
                  </div>
                  <Link href="/blog" className="text-[13.5px] font-semibold text-[#ea580c] hover:text-[#c2410c] hover:underline">
                    View All
                  </Link>
                </div>

                <div className="relative group">
                  <div
                    ref={popularNewsRef}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-1"
                  >
                    {popularNewsPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group/card block bg-white rounded-xl p-3 border border-[#eaeaea] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all shrink-0"
                      >
                        <div className="aspect-[16/9] w-full rounded-none overflow-hidden bg-slate-100 relative">
                          <img
                            src={post.imageUrl}
                            alt={post.imageAlt || post.title}
                            className="w-full h-full object-cover rounded-none group-hover/card:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-[14.5px] font-bold text-[#071f12] line-clamp-2 mt-2.5 leading-snug group-hover/card:text-[#ea580c] transition-colors">
                          {post.title}
                        </h3>
                        <span className="text-[12px] text-[#6b7280] font-medium block mt-1.5">
                          {post.date}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Circular Scroll Button */}
                  <button
                    type="button"
                    onClick={() => scrollContainer(popularNewsRef, 320)}
                    aria-label="Next Popular News"
                    className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center absolute -right-3 sm:-right-4 top-1/3 z-10 text-slate-700 hover:bg-[#071f12] hover:text-white hover:border-[#071f12] transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Part B: Categorized Row 2 - Tips & Tricks (3-Card Horizontal Carousel with Circular Right Arrow) */}
            {tipsTricksPosts.length > 0 && (
              <div className="space-y-3.5 relative">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 bg-[#ea580c] inline-block" />
                    <h2 className="text-[19px] sm:text-[20px] font-bold text-[#071f12]">
                      Tips &amp; Tricks
                    </h2>
                  </div>
                  <Link href="/blog" className="text-[13.5px] font-semibold text-[#ea580c] hover:text-[#c2410c] hover:underline">
                    View All
                  </Link>
                </div>

                <div className="relative group">
                  <div
                    ref={tipsTricksRef}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-1"
                  >
                    {tipsTricksPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group/card block bg-white rounded-xl p-3 border border-[#eaeaea] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all shrink-0"
                      >
                        <div className="aspect-[16/9] w-full rounded-none overflow-hidden bg-slate-100 relative">
                          <img
                            src={post.imageUrl}
                            alt={post.imageAlt || post.title}
                            className="w-full h-full object-cover rounded-none group-hover/card:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-[14.5px] font-bold text-[#071f12] line-clamp-2 mt-2.5 leading-snug group-hover/card:text-[#ea580c] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-[12.5px] text-[#4b5563] line-clamp-2 mt-1 leading-snug">
                          {post.excerpt}
                        </p>
                        <span className="text-[12px] text-[#6b7280] font-medium block mt-1.5">
                          {post.date}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Circular Scroll Button */}
                  <button
                    type="button"
                    onClick={() => scrollContainer(tipsTricksRef, 320)}
                    aria-label="Next Tips and Tricks"
                    className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center absolute -right-3 sm:-right-4 top-1/3 z-10 text-slate-700 hover:bg-[#071f12] hover:text-white hover:border-[#071f12] transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Part B: Categorized Row 3 - Tech News (At least 3 full cards guaranteed + Circular Right Arrow) */}
            {techNewsPosts.length > 0 && (
              <div className="space-y-3.5 relative">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 bg-[#ea580c] inline-block" />
                    <h2 className="text-[19px] sm:text-[20px] font-bold text-[#071f12]">
                      Tech News
                    </h2>
                  </div>
                  <Link href="/blog" className="text-[13.5px] font-semibold text-[#ea580c] hover:text-[#c2410c] hover:underline">
                    View All
                  </Link>
                </div>

                <div className="relative group">
                  <div
                    ref={techNewsRef}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-1"
                  >
                    {techNewsPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group/card block bg-white rounded-xl p-3 border border-[#eaeaea] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all shrink-0"
                      >
                        <div className="aspect-[16/9] w-full rounded-none overflow-hidden bg-slate-100 relative">
                          <img
                            src={post.imageUrl}
                            alt={post.imageAlt || post.title}
                            className="w-full h-full object-cover rounded-none group-hover/card:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-[14.5px] font-bold text-[#071f12] line-clamp-2 mt-2.5 leading-snug group-hover/card:text-[#ea580c] transition-colors">
                          {post.title}
                        </h3>
                        <span className="text-[12px] text-[#6b7280] font-medium block mt-1.5">
                          {post.date}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Circular Scroll Button */}
                  <button
                    type="button"
                    onClick={() => scrollContainer(techNewsRef, 320)}
                    aria-label="Next Tech News"
                    className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center absolute -right-3 sm:-right-4 top-1/3 z-10 text-slate-700 hover:bg-[#071f12] hover:text-white hover:border-[#071f12] transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* ================= RIGHT COLUMN (32% Width) — Sticky Sidebar ================= */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 w-full">

            {/* Widget 2: Follow Social Bar */}
            <div className="space-y-2.5">
              <h2 className="text-[18px] font-bold text-[#071f12] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#ea580c] inline-block" />
                Follow
              </h2>
              
              <div className="flex items-center gap-2.5">
                {/* Twitter / X */}
                <a
                  href="https://x.com/ecofonel82115"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow EcoFone on X"
                  className="w-10 h-10 rounded-full bg-[#1d9bf0] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow EcoFone on YouTube"
                  className="w-10 h-10 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/people/EcoFone/61583296272681/?mibextid=wwXIfr&rdid=3ro69EiPXA4Rlxf9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F187RLSW1y4%2F%3Fmibextid%3DwwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow EcoFone on Facebook"
                  className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ecofone_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow EcoFone on Instagram"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/ecovista-private-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow EcoFone on LinkedIn"
                  className="w-10 h-10 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Widget 3: You May Also Read (NO border-b dividers between items) */}
            <div className="space-y-2.5">
              <h2 className="text-[18px] font-bold text-[#071f12] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#ea580c] inline-block" />
                You May Also Read
              </h2>

              <div className="bg-white rounded-xl p-4 border border-[#eaeaea] shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-3.5">
                {YOU_MAY_ALSO_READ.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="group flex items-start gap-3 transition-colors"
                  >
                    {/* Small Thumbnail: 88px x 56px rounded-none */}
                    <div className="w-[88px] h-[56px] rounded-none overflow-hidden bg-slate-100 shrink-0 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13.5px] font-bold text-[#071f12] line-clamp-2 leading-snug group-hover:text-[#ea580c] transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[11.5px] text-[#16a34a] font-medium block mt-1">
                        {item.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 4: First Impressions (NO border-b dividers between items) */}
            <div className="space-y-2.5">
              <h2 className="text-[18px] font-bold text-[#071f12] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#ea580c] inline-block" />
                First Impressions
              </h2>

              <div className="bg-white rounded-xl p-4 border border-[#eaeaea] shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-3.5">
                {FIRST_IMPRESSIONS.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="group flex items-start gap-3 transition-colors"
                  >
                    {/* Small Thumbnail: 88px x 56px rounded-none */}
                    <div className="w-[88px] h-[56px] rounded-none overflow-hidden bg-slate-100 shrink-0 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13.5px] font-bold text-[#071f12] line-clamp-2 leading-snug group-hover:text-[#ea580c] transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[11.5px] text-[#16a34a] font-medium block mt-1">
                        {item.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}
