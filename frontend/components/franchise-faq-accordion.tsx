'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FRANCHISE_FAQS: FaqItem[] = [
  {
    question: "What is the refurbished phone franchise cost in India?",
    answer: "The total investment for an EcoFone franchise ranges from ₹10 Lakh to ₹25 Lakh, depending on the model (Shop-in-Shop, Retail Experience Store, or Master Franchise). This includes inventory allocation, branding, interior setup, and POS software."
  },
  {
    question: "What are the eligibility criteria for a second-hand mobile shop franchise?",
    answer: "You need a commercial space of 80 to 500 sq. ft. in a prominent retail or electronics market area, along with the required capital. Prior electronics retail experience is valued but full onboarding and systems training are provided."
  },
  {
    question: "What profit margins can I expect as an EcoFone franchise dealer?",
    answer: "EcoFone partners benefit from competitive margins of 15–25% margins across our multi-channel revenue streams: certified refurbished device sales, customer trade-in buybacks, and express repair services."
  },
  {
    question: "What is the expected payback period for an EcoFone store?",
    answer: "Based on store economics across our active locations, the average indicative payback period for our franchise partners is 12–24 months payback with consistent operational margins."
  },
  {
    question: "What training and ongoing marketing support does EcoFone provide?",
    answer: "We deliver full 360-degree support: technician training on our 32-point diagnostics protocol, retail POS & billing software setup, hyper-local digital advertising campaigns, and direct supply chain replenishment."
  }
];

export default function FranchiseFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {FRANCHISE_FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx}
            className={`bg-white border border-slate-200/80 border-l-4 ${isOpen ? 'border-l-[#E85D04]' : 'border-l-slate-300'} rounded-xl transition-all duration-150 shadow-xs overflow-hidden`}
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <h4 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-snug">
                {faq.question}
              </h4>
              <div className={`w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-orange-50 text-[#E85D04]' : ''}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-1">
                <p className="pt-2">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
