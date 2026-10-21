'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BlogPost, 
  YOU_MAY_ALSO_READ, 
  FIRST_IMPRESSIONS 
} from '../../../data/blogs';

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
      const text = encodeURIComponent(`Read this on EcoFone TechByte: ${post.title}\n\n`);
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
            className="text-[20px] sm:text-[24px] font-bold text-[#071f12] mt-8 mb-3 pt-3 border-t border-slate-100 flex items-center gap-2.5 tracking-tight"
          >
            <span className="w-1.5 h-5 bg-gradient-to-b from-[#ea580c] to-[#16a34a] inline-block flex-shrink-0" />
            {section.replace('## ', '')}
          </h2>
        );
      }

      // H3 Headings
      if (section.startsWith('### ')) {
        return (
          <h3 
            key={idx} 
            className="text-[17px] sm:text-[19px] font-bold text-[#071f12] mt-5 mb-2.5 tracking-tight"
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
            className="my-5 p-4 sm:p-5 bg-emerald-50/60 border-l-4 border-[#16a34a] rounded-r-xl italic text-slate-700 text-[13.5px] sm:text-[14px] leading-relaxed"
          >
            {section.replace(/^> \s*/gm, '')}
          </blockquote>
        );
      }

      // Horizontal separator
      if (section === '---') {
        return <hr key={idx} className="my-6 border-slate-200" />;
      }

      // Tables (Markdown table detection)
      if (section.includes('|') && section.includes('\n|')) {
        const lines = section.trim().split('\n');
        if (lines.length >= 2) {
          const headers = lines[0].split('|').map(s => s.trim()).filter(Boolean);
          const bodyRows = lines.slice(2).map(row => row.split('|').map(s => s.trim()).filter(Boolean));

          return (
            <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#071f12] text-white">
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
      if (section.startsWith('- ') || section.startsWith('* ')) {
        const items = section.split('\n').filter(line => line.startsWith('- ') || line.startsWith('* '));
        return (
          <ul key={idx} className="my-4 space-y-2 text-[14px] text-slate-700 pl-4 list-disc marker:text-[#16a34a]">
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^[-*]\s+/, '');
              return (
                <li key={iIdx} className="leading-relaxed">
                  {cleanItem}
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
          <ol key={idx} className="my-4 space-y-2 text-[14px] text-slate-700 pl-4 list-decimal marker:font-bold marker:text-[#16a34a]">
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^\d+\.\s+/, '');
              return (
                <li key={iIdx} className="leading-relaxed">
                  {cleanItem}
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
            return <strong key={pIdx} className="text-[#111827] font-bold">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
      };

      return (
        <p key={idx} className="text-[14.5px] sm:text-[15px] text-[#374151] leading-[1.8] mb-4">
          {renderFormattedText(section)}
        </p>
      );
    });
  };

  return (
    <div className="w-full bg-[#f8faf9] min-h-screen font-sans text-slate-900 pb-20">

      {/* Main Content Area */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 sm:pt-8 space-y-6">
        
        {/* Breadcrumb Trail */}
        <nav className="text-[13px] text-[#6b7280] font-medium flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <span className="text-slate-400 font-normal">&gt;</span>
          <Link href="/blog" className="hover:text-[#ea580c] transition-colors">
            TechByte
          </Link>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-[#ea580c] font-medium">{post.category}</span>
          <span className="text-slate-400 font-normal">&gt;</span>
          <span className="text-[#071f12] font-semibold truncate max-w-[280px] sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* 2-Column Split: Article Body (68%) + Sticky Sidebar (32%) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= LEFT COLUMN: Article Content ================= */}
          <main className="w-full lg:w-[68%] bg-white rounded-xl border border-[#eaeaea] shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-5 sm:p-8 space-y-6">
            
            {/* Article Header Metadata */}
            <div className="space-y-3.5 border-b border-slate-100 pb-5">
              <span className="inline-block bg-[#071f12] text-[#22c55e] border border-emerald-900/40 text-[11.5px] font-bold px-2.5 py-0.5 uppercase tracking-wider">
                {post.category}
              </span>

              <h1 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-[#071f12] leading-tight">
                {post.title}
              </h1>

              {/* Byline */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-[#6b7280] pt-1">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar || '/logo.jpg'}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="font-medium text-slate-800">By {post.author.name}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>{post.readingTime}</span>
                  {post.sourceUrl && (
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ea580c] hover:underline"
                    >
                      Source: {post.publisher} ↗
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Article Image */}
            <div className="aspect-[16/9] w-full rounded-none overflow-hidden bg-slate-100 relative">
              <img
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                className="w-full h-full object-cover rounded-none"
              />
            </div>

            {/* Key Statistics / Highlights (If Present) */}
            {post.keyStats && post.keyStats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-100 rounded-lg">
                {post.keyStats.map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="text-[18px] sm:text-[20px] font-bold text-[#111827]">
                      {stat.value}
                    </div>
                    <div className="text-[11.5px] text-[#6b7280] font-medium leading-tight mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Lead Excerpt */}
            <p className="text-[15px] sm:text-[16px] text-slate-800 font-semibold leading-relaxed border-l-4 border-[#ea580c] pl-3.5 my-4">
              {post.excerpt}
            </p>

            {/* Article Body */}
            <article className="prose-slate max-w-none pt-2">
              {renderFormattedContent(post.content)}
            </article>

            {/* Social Share Strip */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[13px] font-bold text-[#111827]">
                Share this article:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="bg-[#25D366] hover:opacity-90 text-white text-[12px] font-bold px-3 py-1.5 rounded-md transition-opacity"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleShareTwitter}
                  className="bg-[#1d9bf0] hover:opacity-90 text-white text-[12px] font-bold px-3 py-1.5 rounded-md transition-opacity"
                >
                  X (Twitter)
                </button>
                <button
                  type="button"
                  onClick={handleShareLinkedIn}
                  className="bg-[#0a66c2] hover:opacity-90 text-white text-[12px] font-bold px-3 py-1.5 rounded-md transition-opacity"
                >
                  LinkedIn
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-bold px-3 py-1.5 rounded-md transition-colors"
                >
                  {copied ? 'Copied ✓' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* Related Research Articles */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 border-t border-slate-100 space-y-4">
                <h3 className="text-[18px] font-bold text-[#071f12]">
                  Related TechByte Articles
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group/card block bg-white rounded-lg p-2.5 border border-[#e5e7eb] shadow-sm hover:border-slate-300 transition-all"
                    >
                      <div className="aspect-[16/9] w-full rounded-none overflow-hidden bg-slate-100 relative">
                        <img
                          src={rel.imageUrl}
                          alt={rel.title}
                          className="w-full h-full object-cover rounded-none group-hover/card:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-[13.5px] font-bold text-[#071f12] line-clamp-2 mt-2 leading-snug group-hover/card:text-[#ea580c] transition-colors">
                        {rel.title}
                      </h4>
                      <span className="text-[11.5px] text-[#6b7280] font-medium block mt-1">
                        {rel.date}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </main>

          {/* ================= RIGHT COLUMN: Sticky Sidebar ================= */}
          <aside className="w-full lg:w-[32%] space-y-6 lg:sticky lg:top-28">

            {/* Widget 2: Follow Social Bar */}
            <div className="space-y-2.5">
              <h2 className="text-[18px] font-bold text-[#071f12] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#ea580c] inline-block" />
                Follow
              </h2>
              
              <div className="flex items-center gap-2.5">
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

            {/* Widget 3: You May Also Read */}
            <div className="space-y-2.5">
              <h2 className="text-[18px] font-bold text-[#071f12] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#ea580c] inline-block" />
                You May Also Read
              </h2>

              <div className="bg-white rounded-xl p-4 border border-[#eaeaea] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                {YOU_MAY_ALSO_READ.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="group flex items-start gap-3"
                  >
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

            {/* Widget 4: First Impressions */}
            <div className="space-y-2.5">
              <h2 className="text-[18px] font-bold text-[#071f12] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#ea580c] inline-block" />
                First Impressions
              </h2>

              <div className="bg-white rounded-xl p-4 border border-[#eaeaea] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                {FIRST_IMPRESSIONS.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="group flex items-start gap-3"
                  >
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
