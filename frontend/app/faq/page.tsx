import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | EcoFone',
  description: 'Find answers to common questions about buying refurbished phones, selling your old phone, our warranty policy, data security, and franchise opportunities at EcoFone.',
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Buying Refurbished Devices',
      questions: [
        {
          q: 'What does "refurbished" mean at EcoFone?',
          a: 'Refurbished devices are pre-owned phones that have undergone a rigorous, multi-point quality check by our expert technicians. Any faulty parts are repaired or replaced, ensuring the device works like new before it is sold.'
        },
        {
          q: 'Do your refurbished phones come with a warranty?',
          a: 'Yes! All refurbished smartphones sold by EcoFone come with a minimum 6-month comprehensive warranty, covering any technical defects or software issues.'
        },
        {
          q: 'Are the accessories included in the box?',
          a: 'Depending on the product condition grade, we provide compatible charging cables and adapters. Please check the specific product page for exact in-the-box contents.'
        }
      ]
    },
    {
      category: 'Selling Your Device',
      questions: [
        {
          q: 'Is my personal data safe when I sell my phone to EcoFone?',
          a: 'Absolutely. EcoFone offers a 100% Deep Data Cleaning Guarantee. We use certified data erasure tools and overwrite methods that permanently destroy all personal data, ensuring complete privacy.'
        },
        {
          q: 'How is the resale value of my old phone calculated?',
          a: 'The price is determined by our proprietary algorithm based on the current market value, the brand and model, physical condition (scratches, dents), and functionality of the device.'
        },
        {
          q: 'How do I get paid for my old device?',
          a: 'Once your device is picked up or dropped off and passes our physical inspection, we initiate an instant payment via UPI, IMPS bank transfer, or cash, according to your preference.'
        }
      ]
    },
    {
      category: 'Policies & Certifications',
      questions: [
        {
          q: 'Is EcoFone a certified organization?',
          a: 'Yes, EcoFone is R2v3 Certified for responsible recycling and data sanitization, and we hold ISO 27001 & 27701 certifications for information security and privacy compliance.'
        },
        {
          q: 'What is your return and refund policy?',
          a: 'We offer a hassle-free return window (typically 7 days) if the device has a functional defect that isn\'t user-caused. Refunds are processed to the original payment method within 5-7 business days.'
        }
      ]
    },
    {
      category: 'Franchise Program',
      questions: [
        {
          q: 'Who can apply for an EcoFone Franchise?',
          a: 'Anyone with an entrepreneurial mindset, a basic understanding of the retail or electronics market, and the required initial investment capacity can apply for our kiosk, store, or master franchise models.'
        },
        {
          q: 'What support does EcoFone provide to franchisees?',
          a: 'We provide end-to-end support, including store setup, branding, continuous inventory supply, staff training, marketing assistance, and our proprietary CRM/billing software.'
        }
      ]
    }
  ];

  // Generate structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(cat => cat.questions.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    })))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen pt-10 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Frequently Asked <span className="text-ecoOrange-500">Questions</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about buying, selling, and partnering with EcoFone. Can't find the answer you're looking for? Feel free to <Link href="/contact" className="text-emerald-600 font-bold hover:underline">contact us</Link>.
            </p>
          </div>

          <div className="space-y-12">
            {faqs.map((category, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                  {category.category}
                </h2>
                
                <div className="space-y-6">
                  {category.questions.map((faq, fIdx) => (
                    <details 
                      key={fIdx} 
                      className="group border-b border-slate-100 last:border-0 pb-6 last:pb-0"
                    >
                      <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-slate-800 hover:text-emerald-700 transition-colors text-base md:text-lg pr-4">
                        <span>{faq.q}</span>
                        <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                      </summary>
                      <p className="text-slate-600 mt-4 text-sm md:text-base leading-relaxed animate-fade-in pl-2 border-l-2 border-emerald-100">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
