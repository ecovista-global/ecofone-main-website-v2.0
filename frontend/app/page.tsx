'use client';

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import SplitReviews from "../components/split-reviews";
import ScrollReveal from "../components/scroll-reveal";

import DifferentCarousel from "../components/different-carousel";
import TopBrands from "../components/top-brands";
import InvestorModel from "../components/investor-model";
import StoreLocatorSection from "../components/store-locator-section";
import WhatMakesDifferent from "../components/what-makes-different";
import MarketOpportunity from "../components/market-opportunity";
import StoreGalleryInteractions from "../components/store-gallery-interactions";
import RevenueStreamdesk from "../components/revenue-streamdesk";

const calculateRoiMetrics = (investAmt: number, isFico: boolean) => {
  // Calculation Core Logic
  const estProfit = !isFico
    ? Math.round((investAmt * 0.15) / 12)  // FIFO: 15% Annualized
    : Math.round(investAmt * 0.03);        // FICO: 3% Monthly Fixed

  const estPayback = !isFico
    ? "24 - 30"                            // FIFO: Target window
    : "24 - 30";                           // FICO: Target recovery window

  return { estProfit, estPayback };
};

export default function HomePage() {
  // Card Expansion state
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Calculator state
  const [investAmt, setInvestAmt] = useState(2000000);
  const [isFoco, setIsFoco] = useState(true);
  // Dynamic metrics computed based on investment sizes
  const { estProfit, estPayback } = calculateRoiMetrics(investAmt, isFoco);
  const storeSqFt = "100 - 150";

  // Individual card simulation highlighting states
  const [profitOrange, setProfitOrange] = useState(false);
  const [paybackOrange, setPaybackOrange] = useState(false);
  const [modeOrange, setModeOrange] = useState(false);

  const prevProfitRef = useRef(estProfit);
  const prevPaybackRef = useRef(estPayback);
  const prevModeRef = useRef(isFoco);

  const profitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const paybackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const modeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (estProfit !== prevProfitRef.current) {
      setProfitOrange(true);
      if (profitTimeoutRef.current) clearTimeout(profitTimeoutRef.current);
      profitTimeoutRef.current = setTimeout(() => setProfitOrange(false), 30000);
      prevProfitRef.current = estProfit;
    }
  }, [estProfit]);

  useEffect(() => {
    if (estPayback !== prevPaybackRef.current) {
      setPaybackOrange(true);
      if (paybackTimeoutRef.current) clearTimeout(paybackTimeoutRef.current);
      paybackTimeoutRef.current = setTimeout(() => setPaybackOrange(false), 30000);
      prevPaybackRef.current = estPayback;
    }
  }, [estPayback]);

  useEffect(() => {
    if (isFoco !== prevModeRef.current) {
      setModeOrange(true);
      if (modeTimeoutRef.current) clearTimeout(modeTimeoutRef.current);
      modeTimeoutRef.current = setTimeout(() => setModeOrange(false), 30000);
      prevModeRef.current = isFoco;
    }
  }, [isFoco]);

  useEffect(() => {
    return () => {
      if (profitTimeoutRef.current) clearTimeout(profitTimeoutRef.current);
      if (paybackTimeoutRef.current) clearTimeout(paybackTimeoutRef.current);
      if (modeTimeoutRef.current) clearTimeout(modeTimeoutRef.current);
    };
  }, []);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Typing animation states
  const phrases = ["Re-Commerce Network.", "Retail Outlet Hub.", "Eco-Retail Revolution."];
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          setTypingSpeed(1500); // Hold at full phrase
          setIsDeleting(true);
        } else {
          setTypingSpeed(75);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(400); // Pause before next phrase
        } else {
          setTypingSpeed(35);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, typingSpeed]);

  const faqs = [
    {
      q: "What is the typical setup timeline for an EcoFone franchise outlet?",
      a: "On average, a franchise outlet takes 30 to 45 business days to go live. This includes location demographic surveys, corporate interior design setups, POS installation, staff onboarding, and initial inventory seed shipments."
    },
    {
      q: "What is the difference between FICO and FIFO business options?",
      a: "Under FICO (Franchise Investor, Company Operated), EcoFone handles the complete day-to-day operation, staffing, and store management while you receive steady net margin shares. Under FIFO (Franchise Investor, Franchise Operated), you manage local store retail operations directly with complete wholesale stock support from us."
    },
    {
      q: "How does the CRM lead pipeline integration work?",
      a: "When local consumers submit device trade-in requests, contact forms, or franchise applications online, queries are automatically pushed to your localized store CRM lead desk. This directs ready buyers and sellers to your physical retail storefront."
    }
  ];

  return (
    <div className="relative space-y-16 lg:space-y-20 pb-20 md:pb-24 bg-[#FAF9F6] text-slate-800 overflow-x-hidden">

      {/* Group Hero and Top Brands to remove gap */}
      <div className="w-full flex flex-col">
        {/* 1. Hero Section (Image Background) */}
        <section className="w-full relative flex items-center min-h-[500px] lg:min-h-0 lg:aspect-[2012/900] overflow-hidden">
        {/* Full Bleed Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home_hero.jpg')" }}
        />

        {/* Soft, faded gradient strictly on the text side for readability */}
        <div className="absolute top-0 left-0 h-full w-full sm:w-[80%] lg:w-[55%] bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl space-y-6 text-left animate-slide-up">

            {/* Tagline with orange line */}
            <div className="flex items-center gap-4 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-800 uppercase">
              <span>FROM UTTAR PRADESH TO ALL OF INDIA</span>
              <div className="h-[2px] w-12 bg-ecoOrange-500 rounded-full" />
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-[72px] text-slate-900 tracking-tight leading-[1.05]">
              Starting in <br />
              <span className="text-ecoOrange-600">Uttar Pradesh.</span> <br />
              <span className="text-slate-900">Scaling Across India.</span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-slate-800 text-[16px] sm:text-[18px] leading-relaxed max-w-lg font-semibold pr-4">
              Join EcoFone's franchise network and be part of the fast-growing refurbished smartphone market.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/franchise?scroll=apply"
                className="bg-[#0e2a1f] hover:bg-[#061810] text-white text-[14px] sm:text-[15px] font-bold px-8 py-3.5 sm:py-4 rounded-full inline-flex items-center gap-2.5 transition-all duration-200 shadow-[0_8px_20px_rgba(14,42,31,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(14,42,31,0.4)]"
              >
                <span>Apply for Franchise</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link
                href="/brochure.pdf" target="_blank"
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-[14px] sm:text-[15px] font-bold px-8 py-3.5 sm:py-4 rounded-full inline-flex items-center gap-2.5 transition-all duration-200 shadow-md hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Brochure
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Top Brands Deal-In Strip (Directly below hero) */}
      <TopBrands />

      {/* 3. Investor Model Section */}
      <ScrollReveal className="w-full bg-[#f8fbf9]">
        <InvestorModel />
      </ScrollReveal>
      </div>

      <div className="flex flex-col">

        {/* 4. Multiple Revenue Streams Section */}
        <ScrollReveal className="w-full">
          <RevenueStreamdesk />
        </ScrollReveal>

        {/* 5. Difference / Core Values Section */}
        <ScrollReveal className="w-full">
          <WhatMakesDifferent />
        </ScrollReveal>

        {/* 5.2. Market Opportunity Section */}
        <ScrollReveal className="w-full">
          <MarketOpportunity />
        </ScrollReveal>
      </div>


      {/* 5.5. Store Locator Section (Redesigned) */}
      <ScrollReveal>
        <StoreLocatorSection />
      </ScrollReveal>

      {/* 6. Testimonials (Split Reviews) */}
      <ScrollReveal className="w-full border-t border-slate-200/60">
        <SplitReviews />
      </ScrollReveal>

      {/* 6.5. Store Owner Happy Interactions & Moments Gallery */}
      <ScrollReveal className="w-full">
        <StoreGalleryInteractions />
      </ScrollReveal>

      {/* 7. Interactive FAQs Accordion */}
      <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            FAQS
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4 pt-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm text-slate-800 hover:text-slate-900 focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className={`text-xs text-slate-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out px-6 ${activeFaq === index ? 'max-h-[200px] pb-5 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
              >
                <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
