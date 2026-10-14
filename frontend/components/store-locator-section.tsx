'use client';

import React from 'react';
import Link from 'next/link';

export default function StoreLocatorSection() {
  return (
    <section className="w-full bg-[#f8fbf9] py-10 sm:py-12 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT COLUMN: 3D Perspective Phone Graphic Asset (Seamlessly Blended) ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-4 select-none">
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] flex items-center justify-center">
              <img
                src="/store_locator_phone_mockup.png"
                alt="EcoFone Store Locator App Display"
                className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                style={{ mixBlendMode: 'darken' }}
              />
            </div>
          </div>

          {/* ── RIGHT COLUMN: Store Locator Content & 6 Features Grid ── */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Title */}
            <div className="space-y-3.5">

              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[44px] text-slate-900 leading-[1.15]">
                Visit an <span className="text-[#f97316]">Eco</span><span className="text-[#059669]">Fone</span> Store Near You
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Find a physical certified refurbished mobile store to buy warranty-backed smartphones,
                trade-in your old phone for instant cash, or get immediate express hardware repairs — all under one roof.
              </p>
            </div>

            {/* 6 Feature Items (2 Columns x 3 Rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 pt-1">
              
              {/* Feature 1: Buy */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center flex-shrink-0 border border-emerald-100/60 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">Buy</h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                    Explore a wide range of certified pre-owned smartphones at competitive prices.
                  </p>
                </div>
              </div>

              {/* Feature 2: Sell / Trade-In */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f97316] flex items-center justify-center flex-shrink-0 border border-orange-100/60 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">Sell / Trade-In</h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                    Get instant cash for your old phone after a quick device check.
                  </p>
                </div>
              </div>

              {/* Feature 3: Repair */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f97316] flex items-center justify-center flex-shrink-0 border border-orange-100/60 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.298c-.203-.896-.064-1.847.4-2.65l3.277-3.277a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">Repair</h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                    Get hardware repairs done in 15 minutes (where possible) by trained technicians.
                  </p>
                </div>
              </div>

              {/* Feature 4: Warranty Backed */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center flex-shrink-0 border border-emerald-100/60 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">Warranty Backed</h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                    All devices come with a 6-month comprehensive warranty.
                  </p>
                </div>
              </div>

              {/* Feature 5: Accessories */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center flex-shrink-0 border border-emerald-100/60 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">Accessories</h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                    Genuine accessories for a complete smartphone experience.
                  </p>
                </div>
              </div>

              {/* Feature 6: Multiple Locations */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f97316] flex items-center justify-center flex-shrink-0 border border-orange-100/60 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">Multiple Locations</h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                    Find EcoFone stores across major cities in India.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-full max-w-[580px]">
              
              {/* Button 1: Solid Orange Card with Map Pin */}
              <Link
                href="/stores"
                className="bg-[#f97316] hover:bg-orange-600 text-white font-semibold text-[13px] sm:text-sm px-4 h-13 sm:h-14 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group w-full"
              >
                <div className="w-7 h-7 rounded-full border-[1.5px] border-white/80 flex items-center justify-center flex-shrink-0 bg-white/10">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <span className="whitespace-nowrap">Find Closest Store (GPS)</span>
                <span className="group-hover:translate-x-1 transition-transform text-base">→</span>
              </Link>
              
              {/* Button 2: White Outline Card */}
              <Link
                href="/stores"
                className="bg-white border-2 border-orange-300 text-[#f97316] hover:bg-orange-50 font-semibold text-[13px] sm:text-sm px-4 h-13 sm:h-14 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-sm w-full"
              >
                <span className="whitespace-nowrap">View All Stores</span>
                <span className="group-hover:translate-x-1 transition-transform text-base">→</span>
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
