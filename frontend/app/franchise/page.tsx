import React from 'react';
import { Metadata } from 'next';
import FranchiseLeadForm from '../../components/franchise-lead-form';
import FranchiseFaqAccordion from '../../components/franchise-faq-accordion';
import { StandardFranchiseModel, ShopInShopModel, ChooseFranchiseModel } from '../../components/franchise-detailed-models';
import { ShieldCheck, Award, TrendingUp, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refurbished Phone Franchise India | EcoFone B2B Partner Network',
  description: 'Start an enterprise-grade refurbished smartphone retail franchise with EcoFone. Low investment, high operating margins (15–25%), and complete nationwide supply support.',
  alternates: {
    canonical: 'https://www.ecofone.co.in/franchise'
  },
  openGraph: {
    title: 'Refurbished Phone Franchise India | EcoFone Enterprise Network',
    description: 'Partner with EcoFone to launch a high-trust refurbished smartphone franchise in your territory. View FICO and Shop-in-Shop financial breakdowns.',
    images: [{ url: 'https://www.ecofone.co.in/franchise-og.jpg' }]
  }
};

export default function FranchisePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the refurbished phone franchise cost in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The total investment for an EcoFone franchise ranges from ₹10 Lakh to ₹25 Lakh, depending on the model (Shop-in-Shop, Retail Store, or Master Franchise). This includes inventory, branding, and POS software setup."
        }
      },
      {
        "@type": "Question",
        "name": "What are the eligibility criteria for a second-hand mobile shop franchise?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You need a commercial space of 80 to 500 sq. ft. in a prominent retail market area and the required capital. Prior electronics retail experience is a bonus but full operational onboarding is provided."
        }
      },
      {
        "@type": "Question",
        "name": "What profit margins can I expect as a refurbished phone dealer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EcoFone partners enjoy competitive margins of 15–25% margins across our three income streams: buying, selling, and certified repairs."
        }
      },
      {
        "@type": "Question",
        "name": "What is the expected payback period for this business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With our proven operating model and high-demand inventory, the average payback period for our franchise partners is 12–24 months payback."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide training and marketing support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide end-to-end training for your staff on device testing, sales, and software operations, along with hyper-local digital marketing support."
        }
      }
    ]
  };

  return (
    <div className="bg-[#FFFFFF] text-slate-900 font-sans min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* 1. Model Selector (FICO vs FIFO) */}
      <ChooseFranchiseModel />

      {/* 2. Detailed Breakdowns */}
      <div className="flex flex-col">
        <StandardFranchiseModel />
        <ShopInShopModel />
      </div>

      {/* 3. FAQs & Lead Form Section */}
      <section id="apply-franchise-form" className="py-20 lg:py-24 bg-[#FAF9F6] border-t border-slate-200/80 scroll-mt-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            
            {/* FAQs Left */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white border border-slate-200/80 rounded-md shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
                    PARTNER CLARITY & INSIGHTS
                  </span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Franchise FAQs</h2>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Clear answers on capital allocation, operating models, revenue shares, and onboarding protocols.
                </p>
              </div>

              {/* Structured High-Trust Stat Blocks (rounded-xl) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2 text-[#0F3D23] mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#eefcf2] border border-emerald-100 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#0F3D23]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">32-Point Check</span>
                  </div>
                  <div className="text-xl font-black text-slate-900">100% Certified</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Every device verified with diagnostics report</p>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2 text-[#E85D04] mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[#E85D04]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Gross Margins</span>
                  </div>
                  <div className="text-xl font-black text-[#E85D04]">15% – 25%</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Across Buy, Sell, and Express Repair</p>
                </div>
              </div>

              {/* Interactive Accordion */}
              <FranchiseFaqAccordion />

              {/* Trust Badge Bar */}
              <div className="p-4 sm:p-5 bg-white border border-slate-200/80 rounded-xl shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#eefcf2] border border-emerald-100 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#0F3D23]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Organized Re-Commerce Network</div>
                  <p className="text-[11px] text-slate-500">Corporate agreement backing, warranty coverage, and national inventory pool.</p>
                </div>
              </div>
            </div>

            {/* Lead Form Right */}
            <div className="lg:col-span-7">
              <div className="sticky top-28">
                <FranchiseLeadForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structured Enterprise Footer Disclaimer */}
      <footer className="bg-[#0F172A] text-slate-400 text-center py-8 px-4 border-t border-slate-800">
        <p className="text-[11px] text-slate-400 max-w-4xl mx-auto leading-relaxed">
          Disclaimer: Returns depend on territory demographics, initial investment, and localized operational execution. The benchmark figures (15–25% margins, 12–24 months payback, and ₹10–25 Lakh investment) are indicative and based on active performing stores. Franchise approvals are subject to territory exclusivity surveys and formal background verification.
        </p>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 flex gap-2">
        <a 
          href="#apply-franchise-form" 
          className="flex-1 bg-[#E85D04] hover:bg-[#D05000] text-white font-bold text-center py-3 rounded-lg text-xs uppercase tracking-wider shadow-sm transition-colors"
        >
          APPLY FOR FRANCHISE →
        </a>
        <a 
          href="https://wa.me/919919965499?text=Hello%20EcoFone,%20I%20am%20interested%20in%20starting%20a%20Refurbished%20Phone%20Franchise." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-12 bg-[#0F3D23] hover:bg-[#0A2917] text-white rounded-lg flex items-center justify-center shadow-sm transition-colors"
          aria-label="WhatsApp Franchise Desk"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
