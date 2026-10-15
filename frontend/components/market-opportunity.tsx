'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Database, FileText } from 'lucide-react';
import Link from 'next/link';
import { api } from '../lib/api';

export default function MarketOpportunity() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    // Fetch articles from the backend API
    const fetchArticles = async () => {
      try {
        const data = await api.getResearchArticles();
        if (Array.isArray(data) && data.length > 0) {
          setReports(data);
        } else {
          throw new Error('No valid data returned');
        }
      } catch (err) {
        console.error('Failed to fetch research articles:', err);
        // Fallback with authentic original research publications and charts
        setReports([
          {
            id: "1",
            publisher: 'Counterpoint Research',
            date: 'Jul 2026',
            title: 'India Refurbished Smartphone Volumes Grew 13% YoY in H1 2026',
            description: 'India refurbished smartphone volumes grew 13% YoY in H1 2026 as rising component costs and inflation drive strong consumer demand.',
            url: 'https://counterpointresearch.com/en/insights/india-refurbished-smartphone-volumes-grew-13-percent-yoy-in-h1-2026',
            imageUrl: '/article_counterpoint_chart.webp'
          },
          {
            id: "2",
            publisher: 'Business Standard',
            date: 'Sep 02 2026',
            title: 'Costlier new phones drive demand for refurbished devices in India: Report',
            description: "India's refurbished smartphone market is growing rapidly as new devices get costlier, with secondary market demand hitting record highs.",
            url: 'https://www.business-standard.com/technology/tech-news/refurbished-phones-market-india-new-smartphone-prices-126090200913_1.html',
            imageUrl: '/article_bs_costlier.jpg'
          },
          {
            id: "3",
            publisher: 'Business Standard',
            date: 'Apr 21 2025',
            title: '1 in 5 smartphones sold in India is refurbished: Counterpoint Research',
            description: 'Experts point out that many consumers looking to upgrade prefer feature-packed certified refurbished smartphones over entry-level new ones.',
            url: 'https://www.business-standard.com/industry/news/1-in-5-smartphones-sold-in-india-is-refurbished-counterpoint-research-125042101379_1.html',
            imageUrl: '/article_bs_1in5.jpg'
          },
          {
            id: "4",
            publisher: 'Times of India',
            date: 'July 16, 2026',
            title: 'Rising cost fuels rush for refurbished devices',
            description: "Soaring memory and chip costs push up new smartphone prices, accelerating consumer shift towards certified pre-owned alternatives.",
            url: 'https://timesofindia.indiatimes.com/business/india-business/rising-cost-fuels-rush-for-refurbished-devices/articleshow/132427518.cms',
            imageUrl: '/article_toi_rising.jpg'
          }
        ]);
      }
    };
    fetchArticles();
  }, []);

  const stats = [
    {
      id: '01',
      title: '13% YoY',
      description: 'India refurbished smartphone volume growth, H1 2026',
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" strokeWidth={2.5} />,
      iconBg: 'bg-emerald-50 border border-emerald-100',
      sourceLabel: 'Counterpoint Research',
      sourceUrl: 'https://counterpointresearch.com/en/insights/india-refurbished-smartphone-volumes-grew-13-percent-yoy-in-h1-2026'
    },
    {
      id: '02',
      title: '~20%',
      description: "organized share of India's refurbished smartphone market",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" strokeWidth={2.5} />,
      iconBg: 'bg-orange-50 border border-orange-100',
      sourceLabel: 'Financial Express',
      sourceUrl: 'https://www.financialexpress.com/business/industry-refurbished-smartphone-market-grows-13-in-h1-2026-as-new-phone-prices-bite-4330012/'
    },
    {
      id: '03',
      title: '15.6% CAGR',
      description: 'India used & refurbished electronics market, FY25 – FY30',
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" strokeWidth={2.5} />,
      iconBg: 'bg-emerald-50 border border-emerald-100',
      sourceLabel: 'Market Research Future',
      sourceUrl: 'https://www.marketresearchfuture.com/reports/india-refurbished-electronics-market-57638'
    }
  ];

  return (
    <section className="w-full bg-[#f8fbf9] pt-16 lg:pt-24 pb-8 lg:pb-10 relative overflow-hidden font-sans">
      
      {/* Background swooshes (decorative) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <svg className="absolute top-0 left-0 w-full h-[600px] text-emerald-900/5 opacity-50" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-100 200 C300 -100 800 400 1540 100" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M-100 300 C400 -50 900 500 1540 200" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-[#0f281e] leading-[1.1] mb-6">
            Why Invest in the <br className="hidden sm:block"/>
            <span className="text-[#ea580c]">Refurbished Smartphone</span> Market?
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-600 leading-relaxed max-w-2xl">
            India's smartphone market is steadily moving towards refurbished, pre-owned and recommerce models — creating a growing opportunity for organised retail.
          </p>
        </div>

        {/* Unified Stats Strip */}
        <div className="relative mb-10 sm:mb-12">
          <div className="bg-white rounded-[20px] sm:rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-200/60 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100/80 p-2 sm:p-4">
              {stats.map((stat) => (
                <div key={stat.id} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 lg:p-6 hover:bg-slate-50/50 transition-colors">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-[14px] ${stat.iconBg} flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-[22px] sm:text-[26px] font-black text-[#0f281e] tracking-tight leading-none mb-1.5">
                      {stat.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-slate-500 leading-snug mb-1.5">
                      {stat.description}
                    </p>
                    <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-400 hover:text-emerald-700 hover:underline transition-colors">
                      *Source: {stat.sourceLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research & Market Evidence Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h3 className="text-2xl sm:text-[32px] font-black text-[#0f281e] tracking-tight mb-2">
              Research & Market Evidence
            </h3>
            <p className="text-[15px] text-slate-500">
              Explore key reports and articles on the growth and potential of the refurbished smartphone market.
            </p>
          </div>
        </div>

        {/* 4 Research Cards (Dynamic Image Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {reports.map((report, idx) => (
            <div key={report.id || idx} className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group overflow-hidden flex flex-col relative h-full">
              
              {/* Top Image Column */}
              <div className="w-full h-[130px] flex-shrink-0 relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/50 flex items-center justify-center mb-4">
                {report.imageUrl ? (
                  <img 
                    src={report.imageUrl} 
                    alt={report.title} 
                    onError={(e) => {
                      const fallbacks = [
                        '/article_counterpoint_chart.webp',
                        '/article_bs_costlier.jpg',
                        '/article_bs_1in5.jpg',
                        '/article_toi_rising.jpg'
                      ];
                      const target = e.currentTarget;
                      const nextSrc = fallbacks[idx % fallbacks.length];
                      if (!target.src.endsWith(nextSrc)) {
                        target.src = nextSrc;
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="text-slate-300 bg-slate-100 w-full h-full flex items-center justify-center">
                    <FileText className="w-8 h-8 opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] pointer-events-none" />
              </div>

              {/* Bottom Text Stack */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">

                  <div>
                    <h5 className="text-[11px] font-bold text-slate-900 leading-none mb-0.5">{report.publisher}</h5>
                    <p className="text-[10px] text-slate-400 leading-none">{report.date}</p>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-[15px] font-black text-slate-900 leading-[1.3] tracking-tight mb-2">
                    {report.title}
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed mb-4 line-clamp-3">
                    {report.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <Link href={report.url || '#'} className="inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald-700 hover:text-emerald-800 group-hover:gap-2 transition-all">
                    Read research <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
