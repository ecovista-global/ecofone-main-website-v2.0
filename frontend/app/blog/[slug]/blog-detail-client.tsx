'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  ChevronDown, 
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Store,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { BlogPost } from '../../../data/blogs';

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Check out this insightful research on EcoFone: ${post.title}\n\n`);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${post.title} via @ecofone\n`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  // Helper to parse markdown-like syntax into clean HTML elements
  const renderFormattedContent = (content: string) => {
    const sections = content.split('\n\n');

    return sections.map((section, idx) => {
      // H2 Headings
      if (section.startsWith('## ')) {
        return (
          <h2 
            key={idx} 
            className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mt-10 mb-4 pt-4 border-t border-slate-100 flex items-center gap-3 tracking-tight"
          >
            <span className="w-2 h-6 bg-emerald-600 rounded-full inline-block flex-shrink-0" />
            {section.replace('## ', '')}
          </h2>
        );
      }

      // H3 Headings
      if (section.startsWith('### ')) {
        return (
          <h3 
            key={idx} 
            className="text-lg sm:text-xl font-black text-slate-800 mt-6 mb-3 tracking-tight"
          >
            {section.replace('### ', '')}
          </h3>
        );
      }

      // Blockquotes
      if (section.startsWith('> ')) {
        return (
          <blockquote 
            key={idx} 
            className="my-6 p-5 sm:p-6 bg-emerald-50/60 border-l-4 border-emerald-600 rounded-r-2xl italic text-slate-700 text-sm sm:text-base leading-relaxed"
          >
            {section.replace(/^> \s*/gm, '')}
          </blockquote>
        );
      }

      // Horizontal separator
      if (section === '---') {
        return <hr key={idx} className="my-8 border-slate-200" />;
      }

      // Tables (Markdown table detection)
      if (section.includes('|') && section.includes('\n|')) {
        const lines = section.trim().split('\n');
        if (lines.length >= 2) {
          const headers = lines[0].split('|').map(s => s.trim()).filter(Boolean);
          const bodyRows = lines.slice(2).map(row => row.split('|').map(s => s.trim()).filter(Boolean));

          return (
            <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0e2a1f] text-white">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="py-3 px-4 font-bold border-b border-emerald-900/30">
                        {h.replace(/\*\*/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-3 px-4 text-slate-700 font-medium">
                          {cell.startsWith('**') && cell.endsWith('**') ? (
                            <strong className="text-slate-900">{cell.replace(/\*\*/g, '')}</strong>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Bullet List
      if (section.startsWith('- ') || section.includes('\n- ')) {
        const items = section.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={idx} className="space-y-2.5 my-4">
            {items.map((item, itemIdx) => {
              const cleanItem = item.replace(/^- /, '');
              const parts = cleanItem.split(':');
              return (
                <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span>
                    {parts.length > 1 ? (
                      <>
                        <strong className="text-slate-900 font-bold">{parts[0].replace(/\*\*/g, '')}:</strong>
                        {parts.slice(1).join(':')}
                      </>
                    ) : (
                      cleanItem.replace(/\*\*/g, '')
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered List
      if (/^\d+\.\s/.test(section)) {
        const items = section.split('\n').filter(line => /^\d+\.\s/.test(line));
        return (
          <ol key={idx} className="space-y-3 my-4">
            {items.map((item, itemIdx) => {
              const cleanItem = item.replace(/^\d+\.\s/, '');
              const parts = cleanItem.split(':');
              return (
                <li key={itemIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {itemIdx + 1}
                  </span>
                  <div>
                    {parts.length > 1 ? (
                      <>
                        <strong className="text-slate-900 font-bold">{parts[0].replace(/\*\*/g, '')}: </strong>
                        <span>{parts.slice(1).join(':')}</span>
                      </>
                    ) : (
                      <span>{cleanItem.replace(/\*\*/g, '')}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        );
      }

      // Standard Paragraphs (support bold formatting)
      const renderFormattedText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx} className="text-slate-900 font-bold">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
      };

      return (
        <p key={idx} className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-[1.75] mb-4">
          {renderFormattedText(section)}
        </p>
      );
    });
  };

  return (
    <div className="w-full bg-[#f8fbf9] min-h-screen font-sans pb-20">
      
      {/* Top Breadcrumb & Navigation Strip */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-emerald-700 transition-colors">Articles & Research</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-md">{post.title}</span>
          </div>

          <Link 
            href="/blog" 
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Header Hero */}
      <header className="bg-[#061c0f] text-white pt-12 pb-14 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="bg-white/10 text-slate-300 text-[11px] font-medium px-3 py-1 rounded-full">
              Source: {post.publisher}
            </span>
            <a 
              href={post.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 ml-auto"
            >
              Original Source <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.2] text-white">
            {post.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt="Author" className="w-10 h-10 rounded-full border border-white/20 object-cover" />
              <div>
                <div className="font-bold text-white text-sm">{post.author.name}</div>
                <div className="text-[11px] text-slate-400">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Featured Image Banner */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 max-h-[460px]">
            <img
              src={post.imageUrl}
              alt={post.imageAlt}
              className="w-full h-full object-cover object-center max-h-[460px]"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-xs">
              <p className="font-medium text-slate-200">
                {post.imageAlt} • Verified by EcoFone Recommerce Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Key Highlights Strip */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Key Research Findings at a Glance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {post.keyStats.map((stat, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <div className="text-xl sm:text-2xl font-black text-[#0e2a1f] mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Layout: Main Text + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
          
          {/* Main Article Body (8 Cols) */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-6">
            
            {/* Formatted Content */}
            <article className="prose-slate max-w-none">
              {renderFormattedContent(post.content)}
            </article>

            {/* Keyword Tags */}
            <div className="pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Related Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((kw, i) => (
                  <span key={i} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full font-medium transition-colors">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ Accordion Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="pt-10 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Frequently Asked Questions (FAQ)
                  </h3>
                </div>

                <div className="space-y-3">
                  {post.faqs.map((faq, i) => {
                    const isOpen = openFaqIndex === i;
                    return (
                      <div 
                        key={i} 
                        className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100/70 transition-colors"
                        >
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {faq.question}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* In-Article Conversion Banner */}
            <div className="bg-gradient-to-br from-[#061c0f] to-[#0e2a1f] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden my-8">
              <div className="relative z-10 space-y-4">
                <span className="bg-emerald-500/20 text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                  EcoFone Advantage
                </span>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  Looking to Upgrade Your Smartphone for Less?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Shop certified refurbished iPhones, Samsung Galaxy, and OnePlus devices with 40+ diagnostic tests, 6-month warranty, and free doorstep delivery across India.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/buy"
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-sm inline-flex items-center gap-1.5"
                  >
                    View Available Phones <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/sell"
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all border border-white/20 inline-flex items-center gap-1.5"
                  >
                    Sell Old Phone for Cash
                  </Link>
                </div>
              </div>
            </div>

          </main>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Social Share Box */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-600" /> Share This Research
              </h5>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  WhatsApp
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  Twitter / X
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] font-bold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  LinkedIn
                </button>
                <button
                  onClick={handleCopyLink}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* Quick Action 1: Buy Refurbished */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <h5 className="text-base font-black text-slate-900">
                Buy Certified Refurbished Phones
              </h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                Save up to 70% compared to new retail pricing. Tested across 40+ hardware points with 6-month warranty.
              </p>
              <Link
                href="/buy"
                className="w-full bg-[#0e2a1f] hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all inline-flex items-center justify-center gap-2"
              >
                Explore Inventory <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Action 2: Franchise Opportunity */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50/50 rounded-3xl border border-orange-200/60 p-6 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                <Store className="w-5 h-5" />
              </div>
              <h5 className="text-base font-black text-slate-900">
                Open an EcoFone Franchise
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tap into India's fastest growing ₹25,000 Cr recommerce industry. High margins of 12% - 20% with complete inventory and marketing backing.
              </p>
              <Link
                href="/franchise"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-sm"
              >
                Apply for Franchise <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* EcoFone Trust Points */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
              <h6 className="text-xs font-black uppercase tracking-wider text-slate-400">
                The EcoFone Promise
              </h6>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>40+ Point Diagnostic Testing</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>6-Month Repair & Replacement Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Legal Police Database Checked</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Walk-in Physical Store Service</span>
                </div>
              </div>
            </div>

          </aside>

        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="pt-16 mt-16 border-t border-slate-200/80 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-2">
                Continue Reading
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Related Market Intelligence & Research
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group h-full"
                >
                  <Link href={`/blog/${rPost.slug}`} className="h-40 w-full bg-slate-100 overflow-hidden relative block">
                    <img
                      src={rPost.imageUrl}
                      alt={rPost.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {rPost.publisher}
                    </span>
                  </Link>

                  <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                    <div>
                      <div className="text-[10px] text-slate-400 mb-1">{rPost.date} • {rPost.readingTime}</div>
                      <h4 className="text-sm font-black text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        <Link href={`/blog/${rPost.slug}`}>
                          {rPost.title}
                        </Link>
                      </h4>
                    </div>

                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
}
