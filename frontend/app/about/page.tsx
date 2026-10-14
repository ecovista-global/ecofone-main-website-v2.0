'use client';

import React, { useEffect, useState } from 'react';
import ScrollReveal from '../../components/scroll-reveal';
import { api } from '../../lib/api';

const isValidSocialLink = (url: string | undefined | null) => {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed === '' || trimmed === '#' || trimmed === 'javascript:void(0)') return false;

  const normalized = trimmed.replace(/\/+$/, '');

  const genericUrls = [
    'https://linkedin.com',
    'https://www.linkedin.com',
    'https://twitter.com',
    'https://www.twitter.com',
    'https://x.com',
    'https://www.x.com',
    'https://github.com',
    'https://www.github.com',
    'linkedin.com',
    'www.linkedin.com',
    'twitter.com',
    'www.twitter.com',
    'x.com',
    'www.x.com',
    'github.com',
    'www.github.com'
  ];

  if (genericUrls.includes(normalized)) {
    return false;
  }

  return true;
};

const MOCK_TEAM_MEMBERS = [
  {
    id: 't-1',
    name: 'Divyansh Chaurasia',
    role: 'Founder & CEO',
    bio: 'Visionary leader driving the sustainable re-commerce revolution in India with EcoFone.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    order: 1
  },
  {
    id: 't-2',
    name: 'Rohan Malhotra',
    role: 'Head of Diagnostics & Quality',
    bio: 'Diagnostics expert overseeing the 32-point mobile inspection and certified seal assurance.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    order: 2
  },
  {
    id: 't-3',
    name: 'Neha Kapoor',
    role: 'Director of Franchise Operations',
    bio: 'Supports franchise partners from initial demographic survey to grand outlet launch.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    order: 3
  }
];

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await api.getTeamMembers();
        setTeamMembers(data || []);
      } catch (err) {
        console.error('Failed to load team members, using offline fallbacks:', err);
        setTeamMembers(MOCK_TEAM_MEMBERS);
      }
    };
    loadTeam();
  }, []);

  return (
    <div className="bg-[#FAF9F6] text-slate-850 min-h-screen">
      
      {/* 1. New Modern Hero Section */}
      {/* 1. New Modern Hero Section */}
      <section className="relative pt-2 sm:pt-4 lg:pt-6 pb-16 overflow-hidden bg-[#FAF9F6]">
        
        {/* Decorative Background Blobs */}
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            
            {/* Main Content: Text & Features */}
            <div className="space-y-5 sm:space-y-6 z-10 relative z-20 text-left py-8 sm:py-12">
              
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1] max-w-4xl">
                Building Profitable FICO Partnerships for a <span className="text-[#ea580c]">Bigger Tomorrow.</span>
              </h1>
              
              <p className="text-slate-500 text-[15px] sm:text-base lg:text-[17px] leading-relaxed max-w-2xl font-medium pb-2">
                EcoFone operates on a powerful FICO (Franchise Invested, Company Operated) B2B2C model, designed to organize India's refurbished smartphone market. You invest in the retail space, and our expert team handles the rest—managing end-to-end store operations, supplying premium certified inventory, and driving sales. This hands-free approach enables you to scale profitably while we deliver sustainable technology to everyday consumers.
              </p>

            </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full -mt-10 lg:-mt-16 relative z-20 mb-16 bg-gradient-to-r from-[#FAF9F6] via-white to-[#FAF9F6] border-y border-slate-200/50 shadow-sm overflow-hidden">
        
        {/* Subtle decorative elements matching the website theme */}
        <div className="absolute top-0 left-[20%] w-[500px] h-full bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-[20%] w-[400px] h-full bg-orange-100/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* 1. Left Intro (3 cols) */}
            <div className="lg:col-span-3 space-y-3 flex flex-col justify-center">
              <h2 className="font-display font-black text-2xl lg:text-[22px] xl:text-[26px] text-slate-900 leading-[1.1] tracking-tight">
                A GROWING MARKET.<br />
                <span className="text-[#0d613e]">A BIGGER IMPACT.</span>
              </h2>
              <p className="text-slate-500 text-[12px] xl:text-[13px] leading-relaxed">
                India's refurbished smartphone market is expanding rapidly, creating long-term opportunities for organised retail — and a more sustainable future.
              </p>
            </div>

            {/* 2. Stat 1 (2 cols) */}
            <div className="lg:col-span-2 flex flex-col justify-center lg:px-4 lg:border-l border-slate-100">
              <div className="font-black text-4xl lg:text-5xl text-slate-900">13%</div>
              <div className="font-bold text-[13px] text-slate-900 mt-1">YoY Growth</div>
              <p className="text-[11px] text-slate-500 leading-snug mt-1">Refurbished smartphone<br/>volumes in India (H1 2026)</p>
              <p className="text-[9px] text-slate-400 mt-auto pt-3">Source: Counterpoint Research</p>
            </div>

            {/* 3. Stat 2 (2 cols) */}
            <div className="lg:col-span-2 flex flex-col justify-center lg:px-4 lg:border-l border-slate-100">
              <div className="font-black text-4xl lg:text-5xl text-slate-900">~20%</div>
              <div className="font-bold text-[13px] text-slate-900 mt-1">Organised Market</div>
              <p className="text-[11px] text-slate-500 leading-snug mt-1">Share of organised<br/>players in India's<br/>refurbished market</p>
              <p className="text-[9px] text-slate-400 mt-auto pt-3">Source: Counterpoint Research</p>
            </div>

            {/* 4. Stat 3 (2 cols) */}
            <div className="lg:col-span-2 flex flex-col justify-center lg:px-4 lg:border-l border-slate-100">
              <div className="font-black text-4xl lg:text-[40px] xl:text-5xl text-slate-900">15.6%</div>
              <div className="font-bold text-[13px] text-slate-900 mt-1">CAGR (FY25-30)</div>
              <p className="text-[11px] text-slate-500 leading-snug mt-1">India's used & refurbished<br/>electronics market<br/>projected to grow at 15.6%</p>
              <p className="text-[9px] text-slate-400 mt-auto pt-3">Source: Deven Choksey Research</p>
            </div>

            {/* 5. Chart (3 cols) */}
            <div className="lg:col-span-3 bg-[#eaf8f0] rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-0.5 relative z-10">
                <div className="font-bold text-[13px] text-slate-900">India's Refurbished Smartphone Market</div>
                <p className="text-[9.5px] text-slate-500 font-medium">Growing towards a more accessible and sustainable future.</p>
              </div>
              
              <div className="mt-6 flex flex-col gap-1.5 relative z-10">
                <div className="flex items-end justify-between gap-1.5 h-16 w-full">
                  {/* Verified Market Trajectory Bars (15.6% CAGR normalized to 100%) */}
                  {[42, 48, 56, 65, 75, 87, 100].map((height, i) => (
                    <div key={i} className="w-full bg-[#a7f3d0] rounded-sm relative" style={{ height: `${height}%` }}>
                      {i === 6 && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#064e3b] text-white text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          15.6% CAGR
                        </div>
                      )}
                      {i === 6 && (
                        <div className="absolute inset-0 bg-[#10b981] rounded-sm" />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Year Labels */}
                <div className="flex justify-between gap-1.5 w-full">
                  {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year, i) => (
                    <span key={i} className="w-full text-center text-[8px] text-slate-500 font-bold">{year}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Workspace Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-16 space-y-12 sm:space-y-16">

        {/* 2. What We Believe In & Vision / Mission */}
        <ScrollReveal className="space-y-12 sm:space-y-16 pt-8">
          {/* Top Section */}
          <div className="text-center mb-10">
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">What We Believe In</h2>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-200/60 pt-4 md:pt-12">
            
            {/* Item 1 */}
            <div className="flex gap-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#eefcf2] text-[#0d613e] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-[14px] sm:text-[15px] text-slate-900">Trust Before Transactions</h3>
                <p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                  We never cut corners on device quality, diagnostic checks or warranty fulfilment.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 text-ecoOrange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-[14px] sm:text-[15px] text-slate-900">Partnership Mindset</h3>
                <p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                  We treat franchisees as long-term partners. Their growth drives our growth.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4 p-6 md:p-8 border-b border-slate-200/60 md:border-b-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#eefcf2] text-[#0d613e] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-[14px] sm:text-[15px] text-slate-900">Systems Over Guesswork</h3>
                <p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                  Our operations run on structured processes and audited workflows for consistent quality across all stores.
                </p>
              </div>
            </div>

            {/* Bottom Row Divider (Desktop only) */}
            <div className="hidden md:block col-span-3 h-[1px] bg-slate-200/60" />

            {/* Item 4 */}
            <div className="flex gap-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 text-ecoOrange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-[14px] sm:text-[15px] text-slate-900">Growth With Responsibility</h3>
                <p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                  We actively reduce e-waste by extending device lifecycles and promote responsible consumption across India.
                </p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex gap-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#eefcf2] text-[#0d613e] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-[14px] sm:text-[15px] text-slate-900">Our Vision</h3>
                <p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                  To build a nationwide network of EcoFone stores representing consistent quality, transparent pricing, and sustainable tech retail.
                </p>
              </div>
            </div>

            {/* Item 6 */}
            <div className="flex gap-4 p-6 md:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 text-ecoOrange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8A7 7 0 0 1 11 20z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 2c-2.26 4.33-5.27 7.14-8 8" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-[14px] sm:text-[15px] text-slate-900">Our Mission</h3>
                <ul className="space-y-1.5 text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-ecoOrange-600 font-bold mt-0.5">✓</span>
                    <span>Certified, warranty-backed phones</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-ecoOrange-600 font-bold mt-0.5">✓</span>
                    <span>Profitable franchise ecosystem</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-ecoOrange-600 font-bold mt-0.5">✓</span>
                    <span>Full operational support</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </ScrollReveal>



        {/* 5. Founders & Leadership Team (Redesigned) */}
        <ScrollReveal className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4 sm:pb-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-[11px] sm:text-xs text-[#ea580c] font-black uppercase tracking-[0.15em]">
              Our Founders
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-slate-900 leading-tight">
              Leadership <span className="text-[#ea580c]">Team</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              Meet the visionary minds driving EcoFone's sustainable re-commerce revolution across India.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-14">
            {[
              {
                name: "Gaurav Srivastava",
                role: "Founder & CEO",
                bio: "17+ years of industry experience, including 10+ years in the mobile industry and 7+ years in franchise business development, with expertise in sales, retail expansion, and team leadership.",
                imageUrl: "/gaurav_srivastava.png",
                linkedinUrl: "https://www.linkedin.com/in/gaurav-srivastava-69506a6b",
                years: "17+"
              },
              {
                name: "Abhishek Deva",
                role: "Co-Founder",
                bio: "5+ years of experience in startup building, technology, marketing, and team leadership. Focused on scaling EcoFone's brand, building efficient operations, and creating a trusted customer experience.",
                imageUrl: "/abhishek_deva.png",
                linkedinUrl: "https://www.linkedin.com/in/abhishek-deva-62a824150",
                years: "5+"
              }
            ].map((founder, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-stretch group">
                {/* Image Side */}
                <div className="w-full sm:w-[240px] flex-shrink-0">
                  <div className="w-full h-[320px] rounded-[24px] overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                    <img 
                      src={founder.imageUrl} 
                      alt={founder.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-center py-2 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] block">{founder.role}</span>
                    <h3 className="font-display font-black text-2xl sm:text-[28px] text-[#0f172a] leading-tight">{founder.name}</h3>
                  </div>
                  
                  <p className="text-slate-500 text-[13px] sm:text-[14px] leading-relaxed font-medium">
                    {founder.bio}
                  </p>
                  
                  <div className="w-full h-px bg-slate-200/80 my-4"></div>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-display font-black text-4xl sm:text-[40px] text-[#064e3b] leading-none">{founder.years}</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#064e3b] font-bold uppercase tracking-widest leading-tight">Years</span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-tight">Industry Experience</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    {isValidSocialLink(founder.linkedinUrl) && (
                      <a 
                        href={founder.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-slate-700 hover:text-[#0a66c2] transition-colors group/btn"
                      >
                        <svg className="w-5 h-5 text-[#94a3b8] group-hover/btn:text-[#0a66c2] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .52 1 1.3v4.82h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5V18.5h3z" />
                        </svg>
                        <span className="text-[13px] font-bold text-slate-800">Connect on LinkedIn</span>
                        <svg className="w-4 h-4 text-slate-400 group-hover/btn:text-[#0a66c2] group-hover/btn:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </ScrollReveal>

        {/* 6. Key Team Members */}
        {teamMembers.length > 0 && (
          <ScrollReveal className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] text-ecoOrange-600 font-extrabold uppercase tracking-wider bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full w-max mx-auto block">
                Operations & Support
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">Key Team Members</h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
                Our certified hardware repair specialists, diagnostic technicians, and coordinators who run day-to-day franchise operations.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="group w-[160px] sm:w-[190px] h-[230px] [perspective:1000px] cursor-pointer flex-shrink-0">
                  <div className="relative h-full w-full rounded-2xl shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    
                    {/* Front Face - portrait photo */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl [backface-visibility:hidden]">
                      {member.imageUrl ? (
                        <img 
                          src={member.imageUrl} 
                          alt={member.name} 
                          className="h-full w-full rounded-2xl object-cover" 
                        />
                      ) : (
                        <div className="h-full w-full rounded-2xl bg-gradient-to-tr from-emerald-950 via-[#102d1b] to-emerald-900 flex flex-col items-center justify-center border border-emerald-800/30">
                          <span className="text-xl font-black text-emerald-400 tracking-wider">{member.initials}</span>
                        </div>
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent rounded-2xl" />
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <h3 className="font-display font-extrabold text-white text-xs leading-tight">{member.name}</h3>
                        <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-wider mt-0.5 block">{member.role}</span>
                      </div>
                    </div>

                    {/* Back Face - bio details */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#111827] border border-slate-800 p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between text-slate-300 text-left">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-[10px] flex-shrink-0">
                            {member.initials}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display font-extrabold text-[11px] text-white leading-tight truncate">{member.name}</h3>
                            <span className="text-[8px] text-ecoOrange-500 font-bold uppercase tracking-wider block mt-0.5 truncate">{member.role}</span>
                          </div>
                        </div>
                        <p className="text-slate-400 text-[9px] leading-relaxed line-clamp-4">
                          {member.bio}
                        </p>
                      </div>
                      {/* Social Platform Links */}
                      <div className="space-y-2">
                        {(isValidSocialLink(member.linkedinUrl) || isValidSocialLink(member.twitterUrl) || isValidSocialLink(member.githubUrl)) && (
                          <div className="flex items-center gap-2 pb-1">
                            {isValidSocialLink(member.linkedinUrl) && (
                              <a 
                                href={member.linkedinUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all p-0.5"
                                title="LinkedIn Profile"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .52 1 1.3v4.82h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5V18.5h3z" />
                                </svg>
                              </a>
                            )}
                            {isValidSocialLink(member.twitterUrl) && (
                              <a 
                                href={member.twitterUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all p-0.5"
                                title="Twitter / X Profile"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              </a>
                            )}
                            {isValidSocialLink(member.githubUrl) && (
                              <a 
                                href={member.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all p-0.5"
                                title="GitHub Profile"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-[7px] font-bold uppercase tracking-widest text-slate-500 border-t border-slate-850 pt-2">
                          <span>EcoFone Staff</span>
                          <span className="text-emerald-400">Active</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* 7. Mission & Vision (Redesigned) */}
        <ScrollReveal className="pt-4 sm:pt-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Box: Visual Graphic */}
            <div className="relative w-full rounded-[32px] overflow-hidden bg-[#e6ece9] flex items-center justify-center shadow-inner">
               <img 
                 src="/mission_vision.png" 
                 alt="Same Devices. Greater Possibilities." 
                 className="w-full h-auto object-contain z-10 relative"
               />
               {/* Fallback if image is missing */}
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-0">
                 <h3 className="font-display font-black text-2xl text-emerald-800/40">Graphic Placeholder</h3>
                 <p className="text-emerald-800/40 mt-2 font-medium">Add <span className="font-bold">/mission_vision.png</span> to public folder.</p>
               </div>
            </div>

            {/* Right Box: Content & Points */}
            <div className="space-y-6 lg:pr-6">
              
              {/* Header */}
              <div className="space-y-3">
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight max-w-[500px]">
                  A More Accessible, Reliable and Sustainable <span className="text-[#ea580c]">Tech Future.</span>
                </h2>
                <p className="text-slate-500 text-[13px] sm:text-sm leading-relaxed max-w-md font-normal pt-1">
                  At EcoFone, we believe technology should create opportunities — not barriers. Our mission is to make high-quality smartphones accessible to more people, while building a more trusted and sustainable way of consuming technology.
                </p>
              </div>

              {/* The 3 Points */}
              <div className="space-y-7 pt-4">
                
                {/* Point 01: Accessibility */}
                <div className="flex items-center gap-4 border-b border-slate-100/80 pb-6">
                  {/* Icon & Number */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-[#fff5ec] text-[#ea580c] flex items-center justify-center shadow-xs">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="font-display font-bold text-xl sm:text-2xl text-[#ea580c] w-8 text-center">01</span>
                  </div>
                  {/* Divider & Content */}
                  <div className="border-l border-slate-200/80 pl-4 sm:pl-5 py-1">
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg">Accessibility</h4>
                    <p className="text-[12px] sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                      We want every individual to have the opportunity to own a smartphone.
                    </p>
                  </div>
                </div>

                {/* Point 02: Reliability */}
                <div className="flex items-center gap-4 border-b border-slate-100/80 pb-6">
                  {/* Icon & Number */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-[#e6f4ed] text-[#0d613e] flex items-center justify-center shadow-xs">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="font-display font-bold text-xl sm:text-2xl text-[#0d613e] w-8 text-center">02</span>
                  </div>
                  {/* Divider & Content */}
                  <div className="border-l border-slate-200/80 pl-4 sm:pl-5 py-1">
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg">Reliability</h4>
                    <p className="text-[12px] sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                      We build customer trust through rigorous quality assurance and transparent processes.
                    </p>
                  </div>
                </div>

                {/* Point 03: Sustainability */}
                <div className="flex items-center gap-4">
                  {/* Icon & Number */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-[#fff5ec] text-[#ea580c] flex items-center justify-center shadow-xs">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h4c0-2.5 1.5-4.5 3-6.5C18.5 12 20 9.5 20 7c0-2.5-1.5-4-3-5-1.5-1-3.5-1-5 0s-3 2.5-3 5c0 1.5-.5 2.5-1 3.5C7.5 11.5 6 13.5 6 16c0 2.5 1.5 5 4 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8" />
                      </svg>
                    </div>
                    <span className="font-display font-bold text-xl sm:text-2xl text-[#ea580c] w-8 text-center">03</span>
                  </div>
                  {/* Divider & Content */}
                  <div className="border-l border-slate-200/80 pl-4 sm:pl-5 py-1">
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg">Sustainability</h4>
                    <p className="text-[12px] sm:text-[13px] text-slate-500 mt-1 leading-relaxed">
                      We promote eco-friendly practices in smartphone refurbishment to reduce e-waste and build a greener future.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
