import React from 'react';
import Link from 'next/link';
import { BadgeCheck, RefreshCw, FileText, Settings, ShieldCheck, Clock, ChevronDown } from 'lucide-react';

export default function WhatMakesDifferent() {
  const cards = [
    {
      title: 'Certified Quality',
      desc: 'Every device undergoes a 32-point multi-level diagnostic check with certification and warranty support.',
      iconColor: 'text-[#059669]',
      bgColor: 'bg-emerald-50',
      icon: <BadgeCheck className="w-6 h-6" strokeWidth={2.2} />,
    },
    {
      title: 'Multiple Revenue Streams',
      desc: 'Combine Buy, Sell and Repair services with accessories and upgrade programs to ensure steady income.',
      iconColor: 'text-[#f97316]',
      bgColor: 'bg-orange-50',
      icon: <RefreshCw className="w-6 h-6" strokeWidth={2.2} />,
    },
    {
      title: 'FICO Option',
      desc: 'Flexible investment model with company support for staffing, POS setup and store operations.',
      iconColor: 'text-[#059669]',
      bgColor: 'bg-emerald-50',
      icon: <FileText className="w-6 h-6" strokeWidth={2.2} />,
    },
    {
      title: 'Corporate Support',
      desc: 'Get end-to-end support from site selection to launch, along with digital marketing and training programs.',
      iconColor: 'text-[#f97316]',
      bgColor: 'bg-orange-50',
      icon: <Settings className="w-6 h-6" strokeWidth={2.2} />,
    },
    {
      title: '6-Month Warranty',
      desc: 'All certified devices come with a comprehensive 6-month warranty for complete peace of mind.',
      iconColor: 'text-[#059669]',
      bgColor: 'bg-emerald-50',
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={2.2} />,
    },
    {
      title: '3-Day Replacement',
      desc: "If you're not satisfied, return the device within 3 days for an exchange or upgrade — no questions asked.",
      iconColor: 'text-[#f97316]',
      bgColor: 'bg-orange-50',
      icon: <Clock className="w-6 h-6" strokeWidth={2.2} />,
    }
  ];

  return (
    <section className="w-full bg-[#f8fbf9] pt-20 pb-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Header (Pill badge omitted as requested) */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[44px] text-slate-900 leading-tight tracking-tight">
            What Makes <span className="text-[#f97316]">Eco</span><span className="text-[#059669]">Fone</span> Different
          </h2>
          <p className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed px-4">
            A proven, end-to-end model designed to help our franchise partners build a profitable, future-ready business.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Icon Container */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${card.bgColor} ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                {/* Text Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-base sm:text-[19px] font-bold text-slate-900 leading-tight mb-2.5">{card.title}</h3>
                  <p className="text-[13px] sm:text-[15px] text-slate-500 leading-relaxed mb-5">
                    {card.desc}
                  </p>
                  <Link href="/about" className={`inline-flex items-center gap-1.5 text-[13px] sm:text-[15px] font-bold ${card.iconColor} hover:opacity-80 transition-opacity`}>
                    Learn more
                    <span className="text-lg">→</span>
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
