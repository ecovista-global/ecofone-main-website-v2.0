import React from 'react';
import { Metadata } from 'next';
import FranchiseLeadForm from '../../components/franchise-lead-form';
import { StandardFranchiseModel, ShopInShopModel, ChooseFranchiseModel } from '../../components/franchise-detailed-models';

export const metadata: Metadata = {
  title: 'Refurbished Phone Franchise India | EcoFone',
  description: 'Start a profitable refurbished phone franchise in India with EcoFone. Low investment mobile store franchise, high margins, and complete business support.',
  alternates: {
    canonical: 'https://www.ecofone.co.in/franchise'
  },
  openGraph: {
    title: 'Refurbished Phone Franchise India | EcoFone',
    description: 'Start a profitable refurbished phone franchise in India with EcoFone.',
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
          "text": "The total investment for an EcoFone franchise ranges from [INVESTMENT RANGE], depending on the model (Kiosk, Retail Store, or Master Franchise). This includes inventory, branding, and POS software setup."
        }
      },
      {
        "@type": "Question",
        "name": "What are the eligibility criteria for a second-hand mobile shop franchise?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You need a commercial space of 100-500 sq.ft. in a high-footfall area and the ability to invest [INVESTMENT RANGE]. Prior retail experience is a bonus but not mandatory."
        }
      },
      {
        "@type": "Question",
        "name": "What profit margins can I expect as a refurbished phone dealer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EcoFone partners enjoy competitive margins of up to [MARGIN %] across our three income streams: buying, selling, and repairing mobile devices."
        }
      },
      {
        "@type": "Question",
        "name": "What is the expected payback period for this business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With our proven operating model and high-demand inventory, the average payback period for our franchise partners is [PAYBACK PERIOD]."
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
    <div className="bg-[#FAF9F6] text-slate-800 font-sans min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      

      <ChooseFranchiseModel />


      
      <div className="flex flex-col">
        <StandardFranchiseModel />
        <ShopInShopModel />
      </div>

      {/* 8. FAQs & 9. Lead Form Section (Side by Side on Desktop) */}
      <section id="apply" className="py-20 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* FAQs Left */}
            <div className="lg:col-span-5 space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Franchise FAQs</h2>
                <p className="text-slate-600">Common questions from our prospective partners.</p>
              </div>
              
              <div className="space-y-4">
                {schema.mainEntity.slice(0,4).map((faq, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm mb-2">{faq.name}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Form Right */}
            <div className="lg:col-span-7">
              <div className="sticky top-24">
                <FranchiseLeadForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-slate-900 text-center py-6 px-4">
        <p className="text-[10px] text-slate-500 max-w-4xl mx-auto leading-relaxed">
          Disclaimer: Returns depend on location, investment, and operational efficiency. The figures ([MARGIN %], [PAYBACK PERIOD], [INVESTMENT RANGE]) are indicative and based on average performing stores. Franchise approval is subject to territory availability and background verification.
        </p>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 flex gap-3">
        <a href="#apply" className="flex-1 bg-[#ea580c] text-white font-bold text-center py-3.5 rounded-xl text-sm shadow-lg">
          Get Franchise
        </a>
        <a href="https://wa.me/919919965499?text=Hello%20EcoFone,%20I%20am%20interested%20in%20starting%20a%20Refurbished%20Phone%20Franchise." target="_blank" rel="noopener noreferrer" className="w-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  );
}

