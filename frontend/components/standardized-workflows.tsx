'use client';

import React from 'react';
import { 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  Users2 
} from 'lucide-react';

export default function StandardizedWorkflows() {
  return (
    <section className="w-full relative font-sans">

      <div className="w-full space-y-8 sm:space-y-12 relative z-10">
        
        {/* Outcomes Header - Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Built for <span className="text-[#ea580c]">Consistency</span>, Quality and Scalability
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Our standardized workflows ensure that every store delivers the same high-quality experience, building customer trust and operational efficiency.
          </p>
        </div>

        {/* 4 Outcome Feature Cards - Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Feature 1: Clear Quality Benchmarks */}
          <div className="bg-white rounded-2xl p-6 lg:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-100 shadow-2xs">
              <Search className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-[16px] lg:text-[17px] font-bold text-slate-900 leading-tight">
                Clear Quality Benchmarks
              </h4>
              <p className="text-[13px] lg:text-[14px] text-slate-500 mt-2.5 leading-relaxed">
                Standardized 32-point diagnostics across all stores.
              </p>
            </div>
          </div>

          {/* Feature 2: Transparent Grading */}
          <div className="bg-white rounded-2xl p-6 lg:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#ea580c] flex items-center justify-center flex-shrink-0 border border-orange-100 shadow-2xs">
              <ShieldCheck className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-[16px] lg:text-[17px] font-bold text-slate-900 leading-tight">
                Transparent Grading
              </h4>
              <p className="text-[13px] lg:text-[14px] text-slate-500 mt-2.5 leading-relaxed">
                Clear device grading and pricing based on quality benchmarks.
              </p>
            </div>
          </div>

          {/* Feature 3: Centralized Procurement Support */}
          <div className="bg-white rounded-2xl p-6 lg:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-100 shadow-2xs">
              <TrendingUp className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-[16px] lg:text-[17px] font-bold text-slate-900 leading-tight">
                Centralized Procurement Support
              </h4>
              <p className="text-[13px] lg:text-[14px] text-slate-500 mt-2.5 leading-relaxed">
                Access to genuine parts supply and ongoing logistics support.
              </p>
            </div>
          </div>

          {/* Feature 4: Training & Onboarding */}
          <div className="bg-white rounded-2xl p-6 lg:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#ea580c] flex items-center justify-center flex-shrink-0 border border-orange-100 shadow-2xs">
              <Users2 className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-[16px] lg:text-[17px] font-bold text-slate-900 leading-tight">
                Training & Onboarding
              </h4>
              <p className="text-[13px] lg:text-[14px] text-slate-500 mt-2.5 leading-relaxed">
                Structured onboarding, store design branding, and staff training.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
