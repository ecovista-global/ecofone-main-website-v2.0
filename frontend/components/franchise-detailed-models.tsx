'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Building2, 
  Check, 
  ArrowRight, 
  Wallet, 
  Store, 
  Maximize2, 
  Layers, 
  GraduationCap, 
  Award, 
  Smartphone, 
  Zap, 
  Sparkles, 
  Package, 
  TrendingUp, 
  MapPin, 
  FileSignature, 
  Users, 
  Rocket, 
  Globe, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  BarChart3,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useScrollReveal } from '../lib/use-scroll-reveal';

/* =========================================================================
   1. CHOOSE FRANCHISE MODEL (FICO vs FIFO Dedicated 3-Column Comparison)
   ========================================================================= */
export function ChooseFranchiseModel() {
  const { ref: sectionRef, isRevealed } = useScrollReveal({ threshold: 0.1 });

  const scrollToFico = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-fico-breakdown'));
    }
    const el = document.getElementById('fico-breakdown');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToShopInShop = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-sis-breakdown'));
    }
    const el = document.getElementById('partner-breakdown') || document.getElementById('shop-in-shop-breakdown');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="choose-model" 
      ref={sectionRef}
      className={`w-full bg-[#FAF9F6] py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-28 reveal-on-scroll ${isRevealed ? 'is-revealed' : ''}`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 bg-white border border-slate-200/80 rounded-md shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
              B2B PARTNERSHIP ARCHITECTURE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            Choose Your <span className="text-[#E85D04]">Franchise Model</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Institutional retail opportunities engineered for capital efficiency — invest passively with company management or operate hands-on with territorial exclusivity.
          </p>
        </div>

        {/* Dedicated 3-Column Desktop Grid (Fixes Connector Overlap Bug) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* 1. FICO Card */}
          <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:border-orange-300 hover:shadow-md transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block bg-orange-50 border border-orange-200/70 text-[#E85D04] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-md">
                  FICO MODEL
                </span>
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04]">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-[28px] font-black text-slate-900 leading-tight mb-3 tracking-tight">
                Franchise Investor,<br />Company Operated
              </h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Provide retail capital and let EcoFone central operations manage staffing, inventory merchandising, POS systems, and daily footfall conversions.
              </p>
              
              <div className="border-t border-slate-100 pt-5 mb-8">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">Core Structural Advantages</h3>
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-orange-50 border border-orange-200/70 text-[#E85D04] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Minimal day-to-day operational involvement required</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-orange-50 border border-orange-200/70 text-[#E85D04] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Professionally staffed and managed under EcoFone SOPs</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-orange-50 border border-orange-200/70 text-[#E85D04] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Transparent monthly revenue share or minimum return floor</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-orange-50 border border-orange-200/70 text-[#E85D04] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Ideal for commercial property owners and passive retail investors</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={scrollToFico}
              className="w-full bg-[#E85D04] hover:bg-[#D05000] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all duration-150 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>View Detailed Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Middle Connector Column (Never Overlaps Text) */}
          <div className="hidden lg:flex flex-col items-center justify-center px-2 py-4 self-center space-y-4 min-w-[150px]">
            {/* Top Indicator to FICO */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Capital Route</span>
              <span className="text-xs font-black text-[#E85D04] tracking-tight">Invest Passively</span>
              <div className="w-6 h-6 rounded-full bg-orange-50 text-[#E85D04] flex items-center justify-center mt-1 border border-orange-200/60">
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </div>
            </div>

            {/* Center Logo Card */}
            <div className="w-20 h-20 bg-white rounded-xl shadow-sm border border-slate-200/80 p-3 flex items-center justify-center">
              <img 
                src="/logo.jpg" 
                alt="EcoFone Enterprise" 
                className="w-full h-auto object-contain max-h-12" 
                width="64"
                height="32"
              />
            </div>

            {/* Bottom Indicator to FIFO */}
            <div className="flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-[#eefcf2] text-[#0F3D23] flex items-center justify-center mb-1 border border-emerald-200/60">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black text-[#0F3D23] tracking-tight">Operate Hands-On</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mt-0.5">Retail Route</span>
            </div>
          </div>

          {/* Mobile/Tablet Connector Badge (Below lg) */}
          <div className="lg:hidden flex items-center justify-center py-1">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200/80 shadow-xs text-xs font-bold text-slate-600">
              <span className="text-[#E85D04]">Passive Investment</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#0F3D23]">Active Retail</span>
            </div>
          </div>

          {/* 3. FIFO Card */}
          <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block bg-[#eefcf2] border border-emerald-200/70 text-[#0F3D23] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-md">
                  FIFO / PARTNER MODEL
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23]">
                  <Store className="w-5 h-5" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-[28px] font-black text-slate-900 leading-tight mb-3 tracking-tight">
                Franchise Investor,<br />Franchise Operated
              </h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Operate your own branded EcoFone experience center or integrate a Shop-in-Shop inside your existing electronics outlet with full corporate supply support.
              </p>
              
              <div className="border-t border-slate-100 pt-5 mb-8">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">Core Structural Advantages</h3>
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-[#eefcf2] border border-emerald-200/70 text-[#0F3D23] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Full direct control over local store operations and customer relationships</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-[#eefcf2] border border-emerald-200/70 text-[#0F3D23] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Higher upside margin potential (15–25%) across device sales and repairs</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-[#eefcf2] border border-emerald-200/70 text-[#0F3D23] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Complete technical diagnostics training and POS software suite</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-md bg-[#eefcf2] border border-emerald-200/70 text-[#0F3D23] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Ideal for telecom retailers, mobile dealers, and retail entrepreneurs</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <button 
              type="button"
              onClick={scrollToShopInShop}
              className="w-full bg-[#0F3D23] hover:bg-[#0A2917] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all duration-150 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>View Detailed Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   2. STANDARD FRANCHISE MODEL (FICO Breakdown & Roadmap)
   ========================================================================= */
export function StandardFranchiseModel() {
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const { ref: sectionRef, isRevealed } = useScrollReveal({ threshold: 0.1 });
  const { ref: timelineRef, isRevealed: isTimelineRevealed } = useScrollReveal({ threshold: 0.15 });

  useEffect(() => {
    const handleOpen = () => setIsBreakdownOpen(true);
    window.addEventListener('open-fico-breakdown', handleOpen);
    return () => window.removeEventListener('open-fico-breakdown', handleOpen);
  }, []);

  return (
    <section 
      id="fico-breakdown" 
      ref={sectionRef}
      className={`w-full bg-white py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-28 reveal-on-scroll ${isRevealed ? 'is-revealed' : ''}`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-md">
            <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
              FICO CAPITAL ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Franchise Investor, <span className="text-[#E85D04]">Company Operated (FICO)</span>
          </h2>
          <p className="text-slate-600 mt-2 text-base sm:text-lg max-w-3xl font-normal">
            Itemized breakdown of initial capital deployment, turnkey infrastructure, and guaranteed high-velocity inventory mix.
          </p>
        </div>

        {/* 1. HIGH-LEVEL EXECUTIVE SUMMARY METRICS BAR (Refined rounded-xl cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          
          {/* Metric 1 */}
          <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] tracking-widest font-bold uppercase text-slate-500">
                CAPITAL REQUIREMENT
              </span>
              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04]">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-1">
              ₹20 – 25 Lakh
            </div>
            <p className="text-slate-500 text-xs">
              Store fitout (100–300 sq. ft.), branding & seeded inventory
            </p>
          </div>

          {/* Metric 2 */}
          <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] tracking-widest font-bold uppercase text-slate-500">
                TARGET PAYBACK PERIOD
              </span>
              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#E85D04] mb-1">
              20 – 24 Mos.
            </div>
            <p className="text-slate-500 text-xs">
              Historical capital payback across performing retail centers
            </p>
          </div>

          {/* Metric 3 */}
          <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] tracking-widest font-bold uppercase text-slate-500">
                RETURN SHARING MODEL
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F3D23] mb-1">
              3% or 1.5%
            </div>
            <p className="text-slate-500 text-xs">
              3% on gross monthly sales or 1.5% capital return floor
            </p>
          </div>

        </div>

        {/* Progressive Disclosure Toggle Button */}
        <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 mb-6 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
            <FileText className="w-4 h-4 text-[#E85D04]" />
            <span>Review full itemized line-item capital allocation table</span>
          </div>
          <button
            type="button"
            onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <span>{isBreakdownOpen ? 'Hide Line-Item Allocation [-]' : 'View Line-Item Capital Allocation [+]'}</span>
            {isBreakdownOpen ? <ChevronUp className="w-4 h-4 text-[#E85D04]" /> : <ChevronDown className="w-4 h-4 text-[#E85D04]" />}
          </button>
        </div>

        {/* 2. PROGRESSIVE DISCLOSURE COLLAPSIBLE TABLE */}
        {isBreakdownOpen && (
          <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-sm mb-16 transition-all duration-300">
            <div className="bg-[#0F3D23] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-xs tracking-wider uppercase">FICO Capital Allocation Breakdown</h3>
              <span className="rounded-md px-2.5 py-1 text-xs uppercase tracking-wider font-semibold border border-white/20 bg-white/10 text-emerald-200">
                Audited Benchmark
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#FAF9F6] text-slate-700 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 text-center w-14">#</th>
                    <th className="px-5 py-3.5">Particular</th>
                    <th className="px-5 py-3.5">Scope & Deliverables</th>
                    <th className="px-5 py-3.5 text-right">Allocation</th>
                    <th className="px-5 py-3.5">Operational Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white editorial-table-row">
                    <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">01</td>
                    <td className="px-5 py-4 font-bold text-slate-900">Franchise Fee</td>
                    <td className="px-5 py-4 text-slate-600 text-xs leading-relaxed">Territory brand rights, operations manual, training & central CRM onboarding</td>
                    <td className="px-5 py-4 text-right font-black text-slate-900 whitespace-nowrap">₹2,00,000</td>
                    <td className="px-5 py-4 text-slate-500 text-[11px] leading-relaxed">One-time brand onboarding fee</td>
                  </tr>
                  <tr className="bg-[#FAF9F6] editorial-table-row">
                    <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">02</td>
                    <td className="px-5 py-4 font-bold text-slate-900">Infrastructure Development</td>
                    <td className="px-5 py-4 text-slate-600 text-xs leading-relaxed">Store interior, architectural glass & woodwork, corporate signage, 3D floor plan</td>
                    <td className="px-5 py-4 text-right font-black text-slate-900 whitespace-nowrap">₹3,00,000</td>
                    <td className="px-5 py-4 text-slate-500 text-[11px] leading-relaxed">Full turnkey physical outlet execution</td>
                  </tr>
                  <tr className="bg-white editorial-table-row">
                    <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">03</td>
                    <td className="px-5 py-4 font-bold text-slate-900">Electronics & POS Tools</td>
                    <td className="px-5 py-4 text-slate-600 text-xs leading-relaxed">Terminal PC, diagnostic printer, multi-angle CCTV, commercial AC, UPS inverter, barcode scanner</td>
                    <td className="px-5 py-4 text-right font-black text-slate-900 whitespace-nowrap">₹2,00,000</td>
                    <td className="px-5 py-4 text-slate-500 text-[11px] leading-relaxed">Standard billing & surveillance package</td>
                  </tr>
                  <tr className="bg-[#FAF9F6] editorial-table-row">
                    <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">04</td>
                    <td className="px-5 py-4 font-bold text-slate-900">Flagship Tier Stock</td>
                    <td className="px-5 py-4 text-slate-600 text-xs leading-relaxed">Certified iPhones, iPad line, and Samsung Ultra flagship inventory</td>
                    <td className="px-5 py-4 text-right font-black text-[#E85D04] whitespace-nowrap">65% of Capital</td>
                    <td className="px-5 py-4 text-slate-500 text-[11px] leading-relaxed">High demand, fast liquidity inventory</td>
                  </tr>
                  <tr className="bg-white editorial-table-row">
                    <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">05</td>
                    <td className="px-5 py-4 font-bold text-slate-900">Mid-Range Tier Stock</td>
                    <td className="px-5 py-4 text-slate-600 text-xs leading-relaxed">Popular Android devices (OnePlus, Vivo, Oppo, Xiaomi models)</td>
                    <td className="px-5 py-4 text-right font-black text-slate-900 whitespace-nowrap">30% of Capital</td>
                    <td className="px-5 py-4 text-slate-500 text-[11px] leading-relaxed">Volume movers in tier-2/3 demographics</td>
                  </tr>
                  <tr className="bg-[#FAF9F6] editorial-table-row">
                    <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">06</td>
                    <td className="px-5 py-4 font-bold text-slate-900">High-Margin Accessories</td>
                    <td className="px-5 py-4 text-slate-600 text-xs leading-relaxed">GaN chargers, MFi certified cables, ANC earbuds, tempered glass shields</td>
                    <td className="px-5 py-4 text-right font-black text-slate-900 whitespace-nowrap">5% of Capital</td>
                    <td className="px-5 py-4 text-slate-500 text-[11px] leading-relaxed">Up to 40% margin point-of-sale add-on</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. "FROM AGREEMENT TO STORE LAUNCH" - DEPLOYMENT ROADMAP */}
        <div 
          id="deployment-roadmap"
          ref={timelineRef}
          className={`w-full pt-14 border-t border-slate-200/80 scroll-mt-28 ${!isBreakdownOpen ? 'mt-8' : ''}`}
        >
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-md">
              <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
                DEPLOYMENT ROADMAP
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              From Agreement to <span className="text-[#E85D04]">Store Launch</span>
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-1 font-normal">
              A structured, 30-day corporate deployment pipeline managed end-to-end by EcoFone's project team.
            </p>
          </div>

          {/* 4 Steps Grid with Watermark Numbers & Refined rounded-xl Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 01 */}
            <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 relative overflow-hidden group">
              {/* Subtle Watermark Number */}
              <span className="font-display font-black text-5xl text-slate-200/60 group-hover:text-orange-200/70 transition-colors absolute top-3 right-4 pointer-events-none select-none">
                01
              </span>
              
              <div className="w-11 h-11 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] mb-5">
                <FileSignature className="w-5 h-5" />
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-1 tracking-tight">
                Agreement & Legal
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Execution of master franchise agreement, territory lock, and preliminary compliance.
              </p>

              <div className="border-t border-slate-200/80 pt-3 mt-4">
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D23] shrink-0"></span>
                    <span>Due diligence & territory study</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D23] shrink-0"></span>
                    <span>Formal contract execution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D23] shrink-0"></span>
                    <span>Compliance & entity checks</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 relative overflow-hidden group">
              <span className="font-display font-black text-5xl text-slate-200/60 group-hover:text-orange-200/70 transition-colors absolute top-3 right-4 pointer-events-none select-none">
                02
              </span>
              
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] mb-5">
                <Building2 className="w-5 h-5" />
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-1 tracking-tight">
                Store Setup & Fitout
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Full 2D/3D floor layout architecture, woodwork execution, display counters, and signage.
              </p>

              <div className="border-t border-slate-200/80 pt-3 mt-4">
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04] shrink-0"></span>
                    <span>Architectural layout plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04] shrink-0"></span>
                    <span>Interior fitout & fabrication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04] shrink-0"></span>
                    <span>POS hardware & CCTV wiring</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 relative overflow-hidden group">
              <span className="font-display font-black text-5xl text-slate-200/60 group-hover:text-orange-200/70 transition-colors absolute top-3 right-4 pointer-events-none select-none">
                03
              </span>
              
              <div className="w-11 h-11 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] mb-5">
                <Package className="w-5 h-5" />
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-1 tracking-tight">
                Stock & Staff Training
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Initial stock seed delivery, diagnostics hardware onboarding, and staff training.
              </p>

              <div className="border-t border-slate-200/80 pt-3 mt-4">
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D23] shrink-0"></span>
                    <span>Seeded inventory delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D23] shrink-0"></span>
                    <span>32-Point diagnostic testing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D23] shrink-0"></span>
                    <span>Local marketing kickoff</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 relative overflow-hidden group">
              <span className="font-display font-black text-5xl text-slate-200/60 group-hover:text-orange-200/70 transition-colors absolute top-3 right-4 pointer-events-none select-none">
                04
              </span>
              
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] mb-5">
                <Rocket className="w-5 h-5" />
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-1 tracking-tight">
                Launch & Operations
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Grand opening ribbon-cutting, live inventory sync on national website, and lead routing.
              </p>

              <div className="border-t border-slate-200/80 pt-3 mt-4">
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04] shrink-0"></span>
                    <span>Final operational inspection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04] shrink-0"></span>
                    <span>Official store handover</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D04] shrink-0"></span>
                    <span>Live lead desk activation</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   3. SHOP-IN-SHOP MODEL (Partner Program, Economics & Synergy)
   ========================================================================= */
export function ShopInShopModel() {
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const { ref: sectionRef, isRevealed } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    const handleOpen = () => setIsBreakdownOpen(true);
    window.addEventListener('open-sis-breakdown', handleOpen);
    return () => window.removeEventListener('open-sis-breakdown', handleOpen);
  }, []);

  return (
    <section 
      id="partner-breakdown" 
      ref={sectionRef}
      className={`w-full bg-[#FAF9F6] py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-28 reveal-on-scroll ${isRevealed ? 'is-revealed' : ''}`}
    >
      {/* Anchor alias so both #shop-in-shop-breakdown and #partner-breakdown scroll smoothly */}
      <div id="shop-in-shop-breakdown" className="scroll-mt-28" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Title & 6 Refined Feature Cards */}
        <div className="mb-14">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white border border-slate-200/80 rounded-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
                RETAIL PARTNERSHIP PROGRAM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-slate-900 leading-[1.1] mb-3 tracking-tight">
              EcoFone <span className="text-[#E85D04]">Shop-In-Shop</span> Partner Program
            </h2>
            <p className="text-slate-600 text-base leading-relaxed font-normal">
              Designed for existing telecom stores, electronic retail hubs, and multi-brand outlets seeking high-margin recommerce revenue without separate real estate leases.
            </p>
          </div>

          {/* 6 Refined Feature Cards (rounded-xl with subtle borders) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Card 1 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Low Investment</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  High capital efficiency re-commerce business model with seed inventory.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Plug & Play Setup</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Seamless turnkey integration into your active retail electronics outlet.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Space Required</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Requires only 80 – 150 sq. ft. of dedicated counter or kiosk space.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">CRM & POS Systems</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Automated device valuation, billing software, and customer trade-in buybacks.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Sales & Product Training</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hands-on 32-point diagnostics certification for your existing counter team.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Premium Devices</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct distribution pool of certified iPhones, Samsung Galaxies & OnePlus.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* MIDDLE SECTION: Metrics Strip & Collapsible Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          
          {/* Metric 1 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-sm transition-shadow">
            <span className="text-[10px] tracking-widest font-bold uppercase text-slate-500 block mb-1">
              ESTIMATED INVESTMENT
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-1">
              ₹10 – 12 Lakh
            </div>
            <p className="text-slate-500 text-xs">
              Kiosk branding, display fixtures & ₹8 Lakh seed inventory
            </p>
          </div>

          {/* Metric 2 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-sm transition-shadow">
            <span className="text-[10px] tracking-widest font-bold uppercase text-slate-500 block mb-1">
              INDICATIVE PAYBACK
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#E85D04] mb-1">
              12 – 24 Mos.*
            </div>
            <p className="text-slate-500 text-xs">
              Performance-based benchmark across existing retail kiosks
            </p>
          </div>

          {/* Metric 3: Clean Typographic Display with Left Accent Border */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-7 shadow-xs hover:shadow-sm transition-shadow">
            <span className="text-[10px] tracking-widest font-bold uppercase text-slate-500 block mb-1">
              COMMERCIAL COMMISSION MODEL
            </span>
            <div className="border-l-4 border-[#E85D04] pl-4 my-1">
              <div className="text-3xl sm:text-4xl font-bold text-[#E85D04] tracking-tight">
                3% of Total Sales
              </div>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Subject to agreement terms and monthly volume thresholds
            </p>
          </div>

        </div>

        {/* Toggle Button for Line-Item Breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 mb-14 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
            <FileText className="w-4 h-4 text-[#E85D04]" />
            <span>Review full Shop-in-Shop capital distribution table</span>
          </div>
          <button
            type="button"
            onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <span>{isBreakdownOpen ? 'Hide Capital Breakdown [-]' : 'View Line-Item Capital Allocation [+]'}</span>
            {isBreakdownOpen ? <ChevronUp className="w-4 h-4 text-[#E85D04]" /> : <ChevronDown className="w-4 h-4 text-[#E85D04]" />}
          </button>
        </div>

        {/* Collapsible Table Content */}
        {isBreakdownOpen && (
          <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-sm mb-14 transition-all duration-300 bg-white">
            <div className="bg-[#0F3D23] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-xs tracking-wider uppercase">Shop-In-Shop Capital Allocation</h3>
              <span className="rounded-md px-2.5 py-1 text-xs uppercase tracking-wider font-semibold border border-white/20 bg-white/10 text-emerald-200">
                Indicative Breakdown
              </span>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-[#FAF9F6] text-slate-700 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 text-center w-14">#</th>
                  <th className="px-5 py-3.5">Particular</th>
                  <th className="px-5 py-3.5 text-right">Amount (₹)</th>
                  <th className="px-5 py-3.5">Coverage & Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white editorial-table-row">
                  <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">01</td>
                  <td className="px-5 py-4 font-bold text-slate-900">Franchise Fee</td>
                  <td className="px-5 py-4 text-right font-black text-slate-900 whitespace-nowrap">₹2,00,000</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">Partner rights, onboarding, brand network listing</td>
                </tr>
                <tr className="bg-[#FAF9F6] editorial-table-row">
                  <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">02</td>
                  <td className="px-5 py-4 font-bold text-slate-900">Interior & Kiosk Branding</td>
                  <td className="px-5 py-4 text-right font-black text-slate-900 whitespace-nowrap">₹2,00,000</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">Illuminated signage, display counter & collateral</td>
                </tr>
                <tr className="bg-white editorial-table-row">
                  <td className="px-5 py-4 text-center font-bold text-slate-400 text-xs">03</td>
                  <td className="px-5 py-4 font-bold text-slate-900">Initial Seed Inventory</td>
                  <td className="px-5 py-4 text-right font-black text-[#E85D04] whitespace-nowrap">₹8,00,000</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">High-demand flagship iPhones & certified Android devices</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* BOTTOM SECTION: "Built Around Your Existing Business" (Synergy & Ongoing Support) */}
        <div className="pt-12 border-t border-slate-200/80">
          
          <div className="grid lg:grid-cols-12 gap-8 items-start mb-14">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white border border-slate-200/80 rounded-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
                  BUSINESS SYNERGY
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-2 tracking-tight">
                Built Around Your <span className="text-[#E85D04]">Existing Business</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Add certified pre-owned smartphone sales, trade-in buybacks, and express diagnostic repairs without disturbing your core retail operations.
              </p>
            </div>
            
            {/* 4 Synergy Cards (Refined rounded-xl) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Rapid Setup & Fitment</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Turnkey kiosk installation completed within 7–10 days inside active stores.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Corporate Branding Support</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">High-visibility LED signage, branded merchandise, and point-of-sale collateral.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Centralized Supply Chain</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Continuous inventory replenishment from central warehouses with return privileges.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Higher Margin Potential</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Blended gross margins of 15%–25% on certified devices, trade-ins, and accessories.</p>
                </div>
              </div>

            </div>
          </div>

          {/* PROCESS & ONGOING SUPPORT (Side-by-side in rounded-xl container) */}
          <div className="border border-slate-200/80 rounded-xl bg-white shadow-xs overflow-hidden">
            <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
              
              {/* Left Column: Our Partnership Process */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D23] mb-4 pb-3 border-b border-slate-100">
                    <FileText className="w-4 h-4 text-[#E85D04]" />
                    <span>Our Partnership Process</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    
                    {/* Step 1 */}
                    <div className="py-4 first:pt-0 group">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-2xl font-bold text-[#E85D04] leading-none shrink-0 w-8">
                          01
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 mb-0.5">Site Review & Territory Fit</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Space assessment (80-150 sq. ft.), footfall density audit & commercial eligibility.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="py-4 group">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-2xl font-bold text-[#E85D04] leading-none shrink-0 w-8">
                          02
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 mb-0.5">Setup & Master Agreement</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Formal contract signing, kiosk fabrication & illuminated corporate signage.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="py-4 group">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-2xl font-bold text-[#0F3D23] leading-none shrink-0 w-8">
                          03
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 mb-0.5">Stock Seed & Diagnostic Training</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Initial stock inventory dispatch & onsite 32-point diagnostic certification.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="py-4 last:pb-0 group">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-2xl font-bold text-[#E85D04] leading-none shrink-0 w-8">
                          04
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 mb-0.5">Launch & Lead Routing</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Go-live with national online store sync & geo-targeted digital marketing support.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Execution Window
                  </span>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">
                    Completed within 7–10 days from agreement signing.
                  </p>
                </div>
              </div>

              {/* Right Column: Ongoing Support from EcoFone */}
              <div className="lg:col-span-7 p-6 sm:p-8 bg-[#FAF9F6]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D23] mb-6 pb-3 border-b border-slate-200/80">
                  <ShieldCheck className="w-4 h-4 text-[#0F3D23]" />
                  <span>Ongoing Support from EcoFone</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                  
                  {/* Pillar 1 */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-2.5 font-bold text-sm text-slate-900">
                      <div className="w-8 h-8 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23]">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span>Business Advisory</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 pl-1">
                      <li>• Continuous stock fulfillment feeds</li>
                      <li>• Algorithmic dynamic pricing matrix</li>
                      <li>• Dedicated partner desk support</li>
                    </ul>
                  </div>

                  {/* Pillar 2 */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-2.5 font-bold text-sm text-slate-900">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04]">
                        <Globe className="w-4 h-4" />
                      </div>
                      <span>Digital & Marketing</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 pl-1">
                      <li>• Local Google Maps & SEO presence</li>
                      <li>• Central trade-in customer lead routing</li>
                      <li>• Targeted regional digital promotions</li>
                    </ul>
                  </div>

                  {/* Pillar 3 */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-2.5 font-bold text-sm text-slate-900">
                      <div className="w-8 h-8 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23]">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span>Training & Diagnostics</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 pl-1">
                      <li>• 32-Point diagnostic testing SOPs</li>
                      <li>• Retail sales conversion strategies</li>
                      <li>• Device grading & valuation training</li>
                    </ul>
                  </div>

                  {/* Pillar 4 */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-2.5 font-bold text-sm text-slate-900">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span>Brand & Warranty Trust</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 pl-1">
                      <li>• 6-Month comprehensive warranty</li>
                      <li>• National certified brand umbrella</li>
                      <li>• Hassle-free replacement guarantee</li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
