'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export interface ServiceCardItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  linkText: string;
  linkUrl: string;
  theme: 'green' | 'orange';
  iconType: 'phone' | 'rupee' | 'gear';
}

export interface ServicesSectionData {
  pillDot: string;
  tag: string;
  titlePrefix: string;
  buyText: string;
  sellText: string;
  repairText: string;
  titleSuffix: string;
  subtitleLine1: string;
  subtitleLine2: string;
  warrantyCard: {
    tag: string;
    title: string;
    description: string;
  };
  replacementCard: {
    tag: string;
    title: string;
    description: string;
  };
  serviceCards: ServiceCardItem[];
  footerTag: string;
}

const DEFAULT_DATA: ServicesSectionData = {
  pillDot: "#ea580c",
  tag: "REVENUE STREAMDESK",
  titlePrefix: "Earn from ",
  buyText: "Buy",
  sellText: "Sell",
  repairText: "Repair",
  titleSuffix: " Services",
  subtitleLine1: "EcoFone ensures steady cash flows by combining three high-margin",
  subtitleLine2: "revenue channels in a single storefront.",
  warrantyCard: {
    tag: "OFFICIAL GUARANTEE",
    title: "6-Month Comprehensive Warranty",
    description: "Every certified refurbished device undergoes a strict 32-point diagnostics check. If any hardware or technical issue arises, we cover complete diagnostic repair or replacement within 6 months."
  },
  replacementCard: {
    tag: "NO-RISK TRIAL",
    title: "3-Day Hassle-Free Replacement",
    description: "Shop with absolute peace of mind. If you are not completely satisfied with your refurbished smartphone, bring it back within 3 days for an instant exchange or upgrade."
  },
  serviceCards: [
    {
      id: "buy",
      number: "01",
      title: "Buy Used Smartphones",
      tagline: "GREAT DEVICES. SMARTER PRICES.",
      description: "Purchase pre-owned mobile phones at competitive rates. Instantly check parameters to evaluate and acquire stock.",
      linkText: "Know More",
      linkUrl: "/services#buy",
      theme: "green",
      iconType: "phone"
    },
    {
      id: "sell",
      number: "02",
      title: "Sell Certified Refurbished",
      tagline: "TURN DEVICES INTO REVENUE.",
      description: "Sell premium, warranty-backed devices. Build quick customer trust with certification seals and replacement assurances.",
      linkText: "Know More",
      linkUrl: "/services#sell",
      theme: "orange",
      iconType: "rupee"
    },
    {
      id: "repair",
      number: "03",
      title: "Repair & Accessories",
      tagline: "EVERYDAY NEEDS. RECURRING INCOME.",
      description: "Earn daily from walk-in repair diagnostics, battery replacements, and life-style accessories sales.",
      linkText: "Know More",
      linkUrl: "/services#repair",
      theme: "green",
      iconType: "gear"
    }
  ],
  footerTag: "ONE STORE  •  MULTIPLE OPPORTUNITIES"
};

export default function RevenueStreamdesk() {
  const [data, setData] = useState<ServicesSectionData>(DEFAULT_DATA);

  useEffect(() => {
    fetch('/api/v1/cms/services-section')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Network response not ok');
      })
      .then((json) => {
        if (json && json.serviceCards) {
          setData(json);
        }
      })
      .catch(() => {
        // Fallback gracefully to default visual data
      });
  }, []);

  return (
    <section className="w-full relative pt-0 pb-8 sm:pt-0 sm:pb-12 lg:pt-0 lg:pb-16 overflow-hidden">
      
      {/* Subtle organic ambient background rings matching mockup */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[550px] h-[550px] rounded-full border border-emerald-500/10 pointer-events-none -z-10" />
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[750px] h-[750px] rounded-full border border-emerald-500/5 pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] rounded-full border border-orange-500/10 pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[850px] h-[850px] rounded-full border border-emerald-500/5 pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header Block */}
        <div className="text-center space-y-3.5 max-w-none xl:max-w-5xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111827] tracking-[-0.03em] leading-[1.15]">
            Multiple <span className="text-[#ea580c]">Revenue Streams.</span> One <span className="text-[#1E724C]">EcoFone</span> Store.
          </h2>

          {/* 2-line Subtitle */}
          <p className="text-[#64748B] text-sm sm:text-[15px] leading-relaxed font-normal max-w-2xl mx-auto">
            EcoFone brings together buy, sell and repair services to drive steady customer footfall<br className="hidden sm:inline" />
            {' '}and diversified revenue opportunities from a single store.
          </p>
        </div>

        {/* Top 2 Guarantee & Replacement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
          
          {/* Card 1: Official Guarantee */}
          <div className="bg-[#F3F9F5] border border-[#D6ECE0] rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex items-start gap-4 sm:gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.015)] hover:shadow-md transition-all duration-300">
            {/* Green Shield Icon Squircle */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#D6EFE1] flex items-center justify-center flex-shrink-0 text-[#1E724C]">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            
            {/* Text details */}
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#1E724C] block">
                {data.warrantyCard.tag}
              </span>
              <h3 className="text-base sm:text-[17px] font-extrabold text-[#111827] tracking-tight leading-snug">
                {data.warrantyCard.title}
              </h3>
              <p className="text-[12.5px] sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                {data.warrantyCard.description}
              </p>
            </div>
          </div>

          {/* Card 2: No-Risk Trial */}
          <div className="bg-[#FDF8F3] border border-[#F6E6D6] rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex items-start gap-4 sm:gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.015)] hover:shadow-md transition-all duration-300">
            {/* Orange Replacement Icon Squircle */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#F6E5D4] flex items-center justify-center flex-shrink-0 text-[#E06915]">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m17 2 4 4-4 4" />
                <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                <path d="m7 22-4-4 4-4" />
                <path d="M21 13v1a4 4 0 0 1-4 4H3" />
              </svg>
            </div>

            {/* Text details */}
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E06915] block">
                {data.replacementCard.tag}
              </span>
              <h3 className="text-base sm:text-[17px] font-extrabold text-[#111827] tracking-tight leading-snug">
                {data.replacementCard.title}
              </h3>
              <p className="text-[12.5px] sm:text-[13px] text-[#64748B] leading-relaxed font-normal">
                {data.replacementCard.description}
              </p>
            </div>
          </div>

        </div>

        {/* 3 Main Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto pt-2">
          {data.serviceCards.map((card) => {
            const isOrange = card.theme === 'orange';

            return (
              <div
                key={card.id}
                className="bg-white border border-[#ECECEC] rounded-[30px] sm:rounded-[34px] p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between h-full min-h-[340px] sm:min-h-[360px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 group"
              >
                {/* Top Row: Icon + Number (01, 02, 03) */}
                <div className="flex items-center justify-between z-10 relative">
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${
                      isOrange
                        ? 'bg-[#FEF3EB] text-[#E06915]'
                        : 'bg-[#EBF5EF] text-[#1E724C]'
                    }`}
                  >
                    {card.iconType === 'phone' && (
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="20" x="5" y="2" rx="3" ry="3" />
                        <path d="M12 18h.01" />
                      </svg>
                    )}
                    {card.iconType === 'rupee' && (
                      <div className="relative flex flex-col items-center justify-center">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <ellipse cx="12" cy="7" rx="6" ry="3" fill="#FDCB9E" fillOpacity="0.4" />
                          <path d="M6 7v6c0 1.66 2.69 3 6 3s6-1.34 6-3V7" />
                          <path d="M6 13v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4" />
                        </svg>
                        <span className="absolute text-[11px] font-black text-[#E06915] top-[2px]">₹</span>
                      </div>
                    )}
                    {card.iconType === 'gear' && (
                      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </div>

                  <span className="text-[#CBD5E1] font-bold text-lg sm:text-xl tracking-wider">
                    {card.number}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="space-y-2 my-auto pt-6 pb-4 z-10 relative">
                  <h3 className="text-[21px] sm:text-[23px] font-extrabold text-[#111827] tracking-tight leading-snug mb-2">
                    {card.title}
                  </h3>

                  <p className="text-[13px] sm:text-[13.5px] text-[#64748B] leading-relaxed font-normal pr-4 sm:pr-8">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Row: Know More link */}
                <div className="pt-4 flex items-center justify-between z-10 relative mt-auto">
                  <Link
                    href={card.linkUrl || '/services'}
                    className={`inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-80 ${
                      isOrange ? 'text-[#E06915]' : 'text-[#1E724C]'
                    }`}
                  >
                    {card.linkText || 'Know More'}
                    <span className="text-lg">→</span>
                  </Link>
                </div>

                {/* Bottom-Right Corner Product Images Masked into Quarter Circle */}
                <div
                  className={`absolute bottom-0 right-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none transition-transform duration-500 group-hover:scale-105 overflow-hidden rounded-tl-[100%] z-0 ${
                    isOrange ? 'bg-[#FEF3EB]' : 'bg-[#EBF5EF]'
                  }`}
                >
                  {card.id === 'buy' && (
                    <img src="/card_buy_phone_new.jpg" alt="Buy" className="w-full h-full object-cover translate-x-3 translate-y-3 scale-110 sm:translate-x-4 sm:translate-y-4" />
                  )}
                  {card.id === 'sell' && (
                    <img src="/card_sell_phone_new.jpg" alt="Sell" className="w-full h-full object-cover translate-x-3 translate-y-3 scale-110 sm:translate-x-4 sm:translate-y-4" />
                  )}
                  {card.id === 'repair' && (
                    <img src="/card_accessories_new.jpg" alt="Repair" className="w-full h-full object-cover translate-x-3 translate-y-3 scale-110 sm:translate-x-4 sm:translate-y-4" />
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
