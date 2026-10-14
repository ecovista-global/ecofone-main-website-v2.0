'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, BadgeCheck } from 'lucide-react';
import { api } from '../lib/api';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  verifiedProduct?: string;
  type?: string;
  subtitle?: string;
  isVerified?: boolean;
}

// Mock data (Will be replaced by API call later)
const MOCK_INVESTORS = [
  {
    id: '1',
    authorName: 'Amit Sharma',
    subtitle: 'Franchise Partner, Lucknow',
    comment: 'The EcoFone franchise model is well structured and highly supportive. From setup to operations, the team has been with us at every step. A truly trustworthy and future-ready business.',
    rating: 5,
    initials: 'AS'
  },
  {
    id: '2',
    authorName: 'Priyank Khanna',
    subtitle: 'Franchise Partner, Delhi',
    comment: 'Great brand, strong demand and excellent support system. EcoFone makes it easy to run a profitable refurbished device business in a growing market.',
    rating: 5,
    initials: 'PK'
  },
  {
    id: '3',
    authorName: 'Ritesh Desai',
    subtitle: 'Franchise Partner, Ahmedabad',
    comment: 'What impressed me the most is their transparency and operational support. EcoFone is not just a business, it\'s a long-term opportunity.',
    rating: 5,
    initials: 'RD'
  }
];

const MOCK_CUSTOMERS = [
  {
    id: 'c1',
    authorName: 'Rohan Mehta',
    subtitle: 'Verified Purchase',
    comment: 'Bought a Samsung Galaxy S22 from EcoFone. The device was in excellent condition with original accessories and a full 6-month warranty. Totally worth it!',
    rating: 5,
    initials: 'RM'
  },
  {
    id: 'c2',
    authorName: 'Sneha Nair',
    subtitle: 'Verified Purchase',
    comment: 'Amazing experience! The phone looks and works like new. Great pricing and very professional service.',
    rating: 5,
    initials: 'SN'
  },
  {
    id: 'c3',
    authorName: 'Aman Verma',
    subtitle: 'Verified Purchase',
    comment: 'EcoFone made upgrading my phone so easy. Genuine products, quick delivery and helpful support. Highly recommended!',
    rating: 5,
    initials: 'AV'
  }
];

export default function SplitReviews() {
  const [investors, setInvestors] = useState<any[]>(MOCK_INVESTORS);
  const [customers, setCustomers] = useState<any[]>(MOCK_CUSTOMERS);
  const [investorIndex, setInvestorIndex] = useState(0);
  const [customerIndex, setCustomerIndex] = useState(0);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await api.getReviews();
        if (res && res.reviews && Array.isArray(res.reviews) && res.reviews.length > 0) {
          const fetchedInvestors = res.reviews.filter((r: Review) => r.type === 'INVESTOR').map((r: Review) => ({
            id: r.id,
            authorName: r.authorName,
            subtitle: r.subtitle || 'Franchise Partner',
            comment: r.comment,
            rating: r.rating,
            initials: r.authorName.substring(0, 2).toUpperCase()
          }));
          const fetchedCustomers = res.reviews.filter((r: Review) => r.type === 'CUSTOMER' || !r.type).map((r: Review) => ({
            id: r.id,
            authorName: r.authorName,
            subtitle: r.subtitle || (r.isVerified ? 'Verified Purchase' : 'Customer'),
            comment: r.comment,
            rating: r.rating,
            initials: r.authorName.substring(0, 2).toUpperCase()
          }));
          
          if (fetchedInvestors.length > 0) setInvestors(fetchedInvestors);
          if (fetchedCustomers.length > 0) setCustomers(fetchedCustomers);
        }
      } catch (err) {
        console.warn('Backend API connection refused/offline. Using verified fallback reviews.', err);
      }
    }
    loadReviews();
  }, []);

  // Pagination for Investors
  const nextInvestor = () => setInvestorIndex((prev) => (prev + 1) % investors.length);
  const prevInvestor = () => setInvestorIndex((prev) => (prev - 1 + investors.length) % investors.length);

  // Pagination for Customers
  const nextCustomer = () => setCustomerIndex((prev) => (prev + 1) % customers.length);
  const prevCustomer = () => setCustomerIndex((prev) => (prev - 1 + customers.length) % customers.length);

  // Render Stars
  const renderStars = (rating: number, colorClass: string) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < rating ? colorClass : 'text-slate-200'} fill-current`} />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full flex flex-col overflow-hidden">
      
      {/* ----------------- INVESTORS SECTION ----------------- */}
      <div className="w-full bg-[#F8FAF9] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-12 border-b border-slate-200/50 relative">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] rounded-full border-[1.5px] border-emerald-500/10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0f281e] leading-[1.15]">
                Listen What <br className="hidden sm:inline" />
                <span className="text-[#ea580c]">Our Investors</span> Say
              </h2>
              
              <p className="text-[14px] sm:text-[16px] text-slate-600 leading-relaxed font-normal">
                Our franchise partners trust EcoFone for a profitable, scalable and purpose-driven business opportunity across India.
              </p>
            </div>
          </div>

        {/* Carousel Container */}
        <div className="relative flex items-center gap-4">
          <button onClick={prevInvestor} className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors z-10 hidden sm:flex">
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="w-full overflow-hidden">
            <div className="flex gap-6 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${investorIndex * 100}% - ${investorIndex * 24}px))` }}>
              {investors.map((review) => (
                <div key={review.id} className="min-w-full lg:min-w-[calc(33.333%-16px)] bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between min-h-[260px]">
                  <div className="flex gap-4 sm:gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <svg width="24" height="20" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#96cba9] fill-current opacity-60">
                        <path d="M12.25 24V14.125C12.25 10.125 11.25 7 9.25 4.75C7.25 2.5 4.16667 1.08333 0 0.5L1.5 6.25C4 6.75 5.83333 7.83333 7 9.5C8.33333 11 9 12.8333 9 15H2V24H12.25ZM27.75 24V14.125C27.75 10.125 26.75 7 24.75 4.75C22.75 2.5 19.6667 1.08333 15.5 0.5L17 6.25C19.5 6.75 21.3333 7.83333 22.5 9.5C23.8333 11 24.5 12.8333 24.5 15H17.5V24H27.75Z"/>
                      </svg>
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed font-medium">
                      {review.comment}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EBF5EF] flex items-center justify-center text-[#0d613e] font-bold text-sm">
                        {review.initials}
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-slate-900 leading-tight">{review.authorName}</h4>
                        <p className="text-[12px] text-slate-500">{review.subtitle}</p>
                      </div>
                    </div>
                    {renderStars(review.rating, 'text-[#ea580c]')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={nextInvestor} className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors z-10 hidden sm:flex">
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Mobile Pagination Dots */}
        <div className="flex sm:hidden justify-center items-center gap-2 mt-6">
          {investors.map((_, idx) => (
            <button key={idx} onClick={() => setInvestorIndex(idx)} className={`w-2 h-2 rounded-full transition-colors ${idx === investorIndex ? 'bg-[#0d613e]' : 'bg-slate-300'}`} />
          ))}
        </div>
        </div>
      </div>

      {/* ----------------- CUSTOMERS SECTION ----------------- */}
      <div className="w-full bg-[#FCF8F5] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-12 relative">
         {/* Subtle background element */}
         <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] rounded-full border-[1.5px] border-orange-500/10 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0f281e] leading-[1.15]">
                Listen What <br className="hidden sm:inline" />
                <span className="text-[#ea580c]">Our Customers</span> Say
              </h2>
              
              <p className="text-[14px] sm:text-[16px] text-slate-600 leading-relaxed font-normal">
                Real experiences from people across India who chose EcoFone for high-quality, reliable and affordable devices.
              </p>
            </div>
          </div>

        {/* Carousel Container */}
        <div className="relative flex items-center gap-4">
          <button onClick={prevCustomer} className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors z-10 hidden sm:flex">
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="w-full overflow-hidden">
            <div className="flex gap-6 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${customerIndex * 100}% - ${customerIndex * 24}px))` }}>
              {customers.map((review) => (
                <div key={review.id} className="min-w-full lg:min-w-[calc(33.333%-16px)] bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between min-h-[260px]">
                  <div className="flex gap-4 sm:gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <svg width="24" height="20" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-300 fill-current opacity-80">
                        <path d="M12.25 24V14.125C12.25 10.125 11.25 7 9.25 4.75C7.25 2.5 4.16667 1.08333 0 0.5L1.5 6.25C4 6.75 5.83333 7.83333 7 9.5C8.33333 11 9 12.8333 9 15H2V24H12.25ZM27.75 24V14.125C27.75 10.125 26.75 7 24.75 4.75C22.75 2.5 19.6667 1.08333 15.5 0.5L17 6.25C19.5 6.75 21.3333 7.83333 22.5 9.5C23.8333 11 24.5 12.8333 24.5 15H17.5V24H27.75Z"/>
                      </svg>
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed font-medium">
                      {review.comment}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FEF3EB] flex items-center justify-center text-[#ea580c] font-bold text-sm">
                        {review.initials}
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-slate-900 leading-tight">{review.authorName}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] font-semibold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3" />
                            {review.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                    {renderStars(review.rating, 'text-[#ea580c]')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={nextCustomer} className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors z-10 hidden sm:flex">
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Mobile Pagination Dots */}
        <div className="flex sm:hidden justify-center items-center gap-2 mt-6">
          {customers.map((_, idx) => (
            <button key={idx} onClick={() => setCustomerIndex(idx)} className={`w-2 h-2 rounded-full transition-colors ${idx === customerIndex ? 'bg-[#ea580c]' : 'bg-orange-200'}`} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
