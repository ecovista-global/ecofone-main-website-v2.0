import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Smartphone, 
  RefreshCw, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Zap, 
  ArrowRight, 
  Shield, 
  Clock, 
  RotateCcw, 
  Lock, 
  Sparkles, 
  Store, 
  PhoneCall,
  Check
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | Buy, Sell & Repair Refurbished Phones | EcoFone',
  description: 'Explore EcoFone re-commerce services: Sell your used phone for instant cash, buy 32-point certified refurbished smartphones with 6-month warranty, and get express repairs.',
  alternates: {
    canonical: 'https://www.ecofone.co.in/services'
  },
  openGraph: {
    title: 'EcoFone Services | Buy, Sell & Certified Repairs',
    description: 'Trusted re-commerce smartphone solutions in India. Certified refurbished phones, instant buyback with deep data wipe, and express genuine repairs.',
    images: [{ url: 'https://www.ecofone.co.in/services_hero.jpg' }]
  }
};

export default function ServicesPage() {
  return (
    <div className="bg-[#FAF9F6] text-slate-900 font-sans min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-slate-200/80 overflow-hidden bg-white">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-orange-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF9F6] border border-slate-200/80 rounded-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
                ECOFONE RE-COMMERCE ECOSYSTEM
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              One Destination for <br className="hidden sm:inline" />
              <span className="text-[#E85D04]">Buy</span>, <span className="text-[#0F3D23]">Sell</span> & <span className="text-[#E85D04]">Certified Repairs</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
              We are organizing India’s smartphone re-commerce market through strict 32-point diagnostics, instant fair buyback payments, and authorized warranty coverage.
            </p>

            {/* Quick Service Anchor Navigation Strip */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a 
                href="#buy" 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FAF9F6] hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-xs font-bold text-slate-800 transition-all shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-[#0F3D23]"></div>
                <span>01. Sell Your Old Phone (Instant Cash)</span>
              </a>
              <a 
                href="#sell" 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FAF9F6] hover:bg-orange-50 border border-slate-200/80 hover:border-orange-300 text-xs font-bold text-slate-800 transition-all shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-[#E85D04]"></div>
                <span>02. Buy Certified Refurbished</span>
              </a>
              <a 
                href="#repair" 
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FAF9F6] hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-xs font-bold text-slate-800 transition-all shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-[#0F3D23]"></div>
                <span>03. Express Repair & Accessories</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THREE-PILLAR CORE SERVICES BREAKDOWN */}
      <div className="space-y-0">

        {/* PILLAR 1: Sell Your Phone / We Buy Used Smartphones */}
        <section id="buy" className="py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-28 bg-[#FAF9F6]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200/80 rounded-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0F3D23]"></span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
                    INSTANT CASH BUYBACK SERVICE
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Turn Your Old Smartphone Into <span className="text-[#0F3D23]">Instant Cash</span>
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Sell your pre-owned smartphone in minutes. Whether online or at any EcoFone experience outlet, our transparent valuation algorithm calculates top market prices based on functional condition without hidden deductions.
                </p>

                {/* Key Features List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">Instant Spot Payment</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">Instant funds transfer via UPI, direct bank IMPS, or cash immediately after physical verification.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0 mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">100% Deep Data Sanitization</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">Compliant with global data protection protocols. We perform certified multi-pass memory wipe on every traded device.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0 mt-0.5">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">Free In-Store Diagnostics</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">Walk into our stores across Lucknow, Delhi NCR, and UP for zero-obligation testing and on-the-spot price quotes.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link 
                    href="/sell" 
                    className="bg-[#0F3D23] hover:bg-[#0A2917] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-2"
                  >
                    <span>Check Your Phone's Resale Value</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/stores" 
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-xs"
                  >
                    Find Nearest Store
                  </Link>
                </div>

              </div>

              {/* Right Media Card */}
              <div className="lg:col-span-6">
                <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 relative mb-6">
                    <img 
                      src="/card_buy_phone.jpg" 
                      alt="EcoFone Sell Your Phone Service" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 left-3 bg-[#0F3D23] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                      Best Price Guaranteed
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-100 pt-5">
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">10 Mins</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Average Evaluation</span>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-[#0F3D23]">0% Deduct</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Zero Hidden Fees</span>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">Instant</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Direct UPI Payout</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PILLAR 2: Buy Certified Refurbished Smartphones */}
        <section id="sell" className="py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-28 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Media Card */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="bg-[#FAF9F6] p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 relative mb-6">
                    <img 
                      src="/card_sell_phone.jpg" 
                      alt="EcoFone Certified Refurbished Phones" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 left-3 bg-[#E85D04] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                      6-Month Warranty Backed
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-200/80 pt-5">
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-[#E85D04]">32-Point</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Hardware Inspection</span>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">6 Months</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Full Warranty</span>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">3 Days</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Hassle-Free Return</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Details */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF9F6] border border-slate-200/80 rounded-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
                    CERTIFIED REFURBISHED SMARTPHONES
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Flagship Smartphones at <span className="text-[#E85D04]">Up to 70% Off</span>
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Experience like-new iPhones, Samsung Galaxies, and OnePlus flagships without paying brand-new premium retail prices. Every device is backed by testing certification and warranty seal.
                </p>

                {/* Key Benefits */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">Comprehensive 6-Month Warranty</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">Includes diagnostic warranty covering motherboard, display, touch sensors, and hardware buttons.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] shrink-0 mt-0.5">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">3-Day Replacement Window</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">Complete purchase satisfaction: if the device doesn't feel right, exchange or upgrade with zero friction.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">Graded Quality Standards</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">Available in Pristine (Flawless), Excellent, and Superb grades to fit every budget and preference.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link 
                    href="/buy" 
                    className="bg-[#E85D04] hover:bg-[#D05000] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-2"
                  >
                    <span>Browse Refurbished Inventory</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/verify-certificate/EF-2026-8842" 
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-xs"
                  >
                    Verify Certificate Sample
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* PILLAR 3: Repair & High-Margin Accessories */}
        <section id="repair" className="py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-28 bg-[#FAF9F6]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200/80 rounded-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0F3D23]"></span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
                    EXPRESS SERVICE LAB & ACCESSORIES
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Express Diagnostics, <span className="text-[#0F3D23]">Repairs & Gear</span>
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Walk-in repair lab equipped with certified precision tools. We perform on-the-spot screen replacements, battery renewals, and provide certified fast-charging accessories.
                </p>

                {/* Repair Highlights */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">30-Minute Screen & Battery Replacement</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">Quick turnaround by trained technicians with genuine test calibration on leading brands.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">90-Day Repair Warranty</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">All replacement parts are covered by an unconditional 3-month functionality warranty.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="w-9 h-9 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] shrink-0 mt-0.5">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">Certified Fast-Charge Accessories</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">GaN chargers, MFi braided cables, tempered glass shields, and protective phone armor.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-[#0F3D23] hover:bg-[#0A2917] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-2"
                  >
                    <span>Book Repair Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a 
                    href="https://wa.me/919919965499?text=Hello%20EcoFone,%20I%20need%20repair%20support%20for%20my%20device." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-xs flex items-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Support Desk</span>
                  </a>
                </div>

              </div>

              {/* Right Media Card */}
              <div className="lg:col-span-6">
                <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 relative mb-6">
                    <img 
                      src="/card_accessories.jpg" 
                      alt="EcoFone Repair and Accessories" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 left-3 bg-[#0F3D23] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                      Express Diagnostic Lab
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-100 pt-5">
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">30 Mins</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Screen Fix</span>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-[#0F3D23]">90 Days</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Part Warranty</span>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Tested Parts</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* 3. OFFICIAL GUARANTEES BANNER */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">The EcoFone Promise</h3>
            <p className="text-slate-500 text-sm mt-1">Certified quality assurance standards across all partner centers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 shadow-xs text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900 mb-1">6-Month Warranty</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete hardware & technical defect coverage backed by national inventory service desks.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 shadow-xs text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85D04] mb-4">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900 mb-1">3-Day Trial Replacement</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Test your phone in real life with peace of mind. Hassle-free exchange within 3 business days.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-xl p-6 shadow-xs text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center text-[#0F3D23] mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900 mb-1">Deep Data Wipe Guarantee</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Military-grade data eradication on every traded device ensures total privacy and zero identity leak.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION: B2B FRANCHISE & STORES */}
      <section className="py-16 sm:py-20 bg-[#FAF9F6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-[#0F3D23] text-white rounded-2xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-md">
            
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-300 block">
                BECOME AN ECOFONE RETAIL PARTNER
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Want to Bring These Services to Your Store?
              </h3>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Launch an EcoFone Franchise or integrate a Shop-in-Shop inside your existing electronics retail outlet. Generate high returns across all 3 revenue channels.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <Link 
                  href="/franchise" 
                  className="bg-[#E85D04] hover:bg-[#D05000] text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-lg transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Explore Franchise Models</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-lg transition-all"
                >
                  Contact Business Desk
                </Link>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </section>

    </div>
  );
}
