'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ArrowRight, 
  Clock, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  BookOpen,
  Store,
  Smartphone,
  ArrowUpRight
} from 'lucide-react';
import { BlogPost } from '../../data/blogs';

interface BlogListingClientProps {
  posts: BlogPost[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Market Trends', 'Industry Analysis', 'Buying Guide'];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.publisher.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts[0];
  const remainingPosts = filteredPosts.filter((p) => p.id !== featuredPost.id);

  return (
    <div className="w-full bg-[#f8fbf9] min-h-screen font-sans">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#061c0f] text-white pt-20 pb-20 lg:pt-28 lg:pb-28 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              EcoFone Research & Knowledge Hub
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Market Intelligence, <br className="hidden sm:inline" />
              <span className="text-emerald-400">Recommerce</span> & Consumer Insights
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              In-depth research reports, verified market data from Counterpoint & Business Standard, and smart guides for buying, selling, and understanding certified refurbished electronics in India.
            </p>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
                <div className="text-lg sm:text-2xl font-black text-emerald-400">13% YoY</div>
                <div className="text-[11px] text-slate-300">Refurbished Growth</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
                <div className="text-lg sm:text-2xl font-black text-orange-400">1 in 5</div>
                <div className="text-[11px] text-slate-300">Phones Refurbished</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
                <div className="text-lg sm:text-2xl font-black text-emerald-400">Up to 70%</div>
                <div className="text-[11px] text-slate-300">Savings vs New</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0e2a1f] text-white shadow-sm'
                    : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research, brands, topics..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        
        {/* Featured Article Card (Show when viewing "All" and no search) */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                Featured Research Publication
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Image Column */}
                <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] bg-slate-100 overflow-hidden">
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-white/95 backdrop-blur-md text-emerald-900 text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                      {featuredPost.publisher}
                    </span>
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* Text Column */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {featuredPost.readingTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-[1.25] group-hover:text-emerald-700 transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Key stats pills */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {featuredPost.keyStats.slice(0, 2).map((stat, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                          <div className="text-base font-black text-[#0e2a1f]">{stat.value}</div>
                          <div className="text-[10px] text-slate-500 leading-tight">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={featuredPost.author.avatar} alt="EcoFone" className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                      <span className="text-xs font-semibold text-slate-700">{featuredPost.author.name}</span>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-[#0e2a1f] hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {searchQuery ? `Search Results (${filteredPosts.length})` : 'All Research & Analysis'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No articles match your criteria</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for different keywords such as "Counterpoint", "refurbished", "iPhone", or reset your category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-emerald-700 hover:underline pt-2 inline-block"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {(selectedCategory === 'All' && !searchQuery ? remainingPosts : filteredPosts).map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group h-full"
                >
                  
                  {/* Article Thumbnail */}
                  <Link href={`/blog/${post.slug}`} className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden block">
                    <img
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        {post.publisher}
                      </span>
                      <span className="bg-[#0e2a1f]/90 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {post.readingTime}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-black text-slate-900 leading-[1.3] group-hover:text-emerald-700 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                        <span>Read Full Analysis</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">EcoFone Intelligence</span>
                    </div>

                  </div>

                </article>
              ))}
            </div>
          )}
        </div>

        {/* EcoFone Trust & Recommerce Value Section */}
        <section className="bg-gradient-to-br from-[#061c0f] to-[#0e2a1f] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-white/10">
          <div className="max-w-4xl mx-auto space-y-8 relative z-10 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block">
              Why Consumers Trust EcoFone
            </span>

            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Driving India's Circular Economy with <br className="hidden sm:inline" />
              <span className="text-emerald-400">40+ Point Certified Diagnostics</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Whether you are buying a certified iPhone, selling your old device for instant cash, or opening a high-margin franchise in Uttar Pradesh, EcoFone delivers verified reliability with guaranteed warranties.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <h5 className="font-bold text-sm text-white">40+ Point Tested</h5>
                <p className="text-xs text-slate-400 leading-snug">
                  Camera, battery health, display, biometric and touch latency diagnostics before sale.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <Smartphone className="w-6 h-6 text-orange-400" />
                <h5 className="font-bold text-sm text-white">6-Month Warranty</h5>
                <p className="text-xs text-slate-400 leading-snug">
                  Complete hardware coverage with 7-day replacement and dedicated support.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <Store className="w-6 h-6 text-emerald-400" />
                <h5 className="font-bold text-sm text-white">Physical Store Network</h5>
                <p className="text-xs text-slate-400 leading-snug">
                  Walk into our Hazratganj, Alambagh, and Gomti Nagar stores in Lucknow anytime.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/buy"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md inline-flex items-center gap-2"
              >
                Browse Refurbished Phones <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sell"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all border border-white/20 inline-flex items-center gap-2"
              >
                Sell Old Phone For Cash <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/franchise"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all inline-flex items-center gap-2"
              >
                Apply for Franchise <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
