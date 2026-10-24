'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Play, X, MapPin, Sparkles, Quote } from 'lucide-react';

interface GalleryItem {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  videoTitle: string;
  quote: string;
  rating: number;
  tag: string;
  videoEmbedUrl?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'story-1',
    name: 'Suresh Kumar',
    role: 'Franchise Store Owner',
    location: 'Lucknow Hazratganj Outlet',
    image: '/gallery_owner_launch.jpg',
    videoTitle: 'Grand Store Launch & Owner Journey',
    quote: '"From store layout planning to initial inventory allocation and digital marketing, EcoFone supported us end-to-end. We achieved steady profitability within our first quarter!"',
    rating: 5,
    tag: 'Store Launch',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'story-2',
    name: 'Rahul & Priya Verma',
    role: 'Co-Founders & Partners',
    location: 'New Delhi Saket Outlet',
    image: '/gallery_ribbon_opening.jpg',
    videoTitle: 'Opening Day Experience & Ribbon Cutting',
    quote: '"The grand opening ceremony brought huge local excitement. Customers love the 32-point diagnostics warranty backing. Footfall has grown 40% month-on-month."',
    rating: 5,
    tag: 'Grand Opening',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'story-3',
    name: 'Vikram Singh',
    role: 'Franchise Partner',
    location: 'Jaipur Tonk Road Store',
    image: '/gallery_customer_handover.jpg',
    videoTitle: 'Customer Handover & Buyback Experience',
    quote: '"Instant trade-in buybacks combined with certified refurbished sales creates multiple revenue streams every single day. The customer trust in EcoFone is unmatched."',
    rating: 5,
    tag: 'Customer Delight',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  {
    id: 'story-4',
    name: 'Rohit & Ananya',
    role: 'Operations Lead & Partner',
    location: 'Mumbai Andheri Store',
    image: '/gallery_partner_meet.jpg',
    videoTitle: 'Diagnostic Tech & Daily Store Operations',
    quote: '"EcoFone’s structured POS software and transparent grading tests make store operations smooth even without prior cellular hardware background. A future-ready business!"',
    rating: 5,
    tag: 'Tech Diagnostics',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  }
];

import { api } from '../lib/api';

export default function StoreGalleryInteractions() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [activeModal, setActiveModal] = useState<GalleryItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const cms = await api.getCmsContent();
        if (cms && Array.isArray(cms.partnerStories) && cms.partnerStories.length > 0) {
          setItems(cms.partnerStories);
        }
      } catch (e) {}
    }
    load();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#f8fbf9] py-16 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans border-t border-slate-200/50">
      
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0f281e] leading-[1.15]">
              Happy Moments with Our <br className="hidden sm:inline" />
              <span className="text-[#ea580c]">Store Owners</span> & Partners
            </h2>
            
            <p className="text-[14px] sm:text-[16px] text-slate-600 leading-relaxed font-normal">
              Real stories, store openings, and proud interactions from franchise partners powering India’s re-commerce revolution with EcoFone.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous Stories"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 flex items-center justify-center transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next Stories"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 flex items-center justify-center transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Gallery Cards Carousel / Grid */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] sm:min-w-[340px] md:min-w-[360px] lg:min-w-[380px] max-w-[400px] bg-white rounded-[26px] border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group snap-start"
            >
              
              {/* Top Media Area with YouTube Style Overlay */}
              <div 
                className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setActiveModal(item)}
              >
                <img
                  src={item.image}
                  alt={`${item.name} - ${item.location}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 group-hover:from-black/70 transition-colors" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[11px] font-bold">
                  <MapPin className="w-3 h-3 text-[#ea580c]" />
                  <span>{item.tag}</span>
                </div>

                {/* Video Title Header Overlay */}
                <div className="absolute top-3.5 right-3.5 max-w-[170px] text-right">
                  <span className="text-[10px] font-semibold text-white/90 bg-emerald-900/70 backdrop-blur-sm px-2.5 py-0.5 rounded-md line-clamp-1 border border-emerald-400/30">
                    EcoFone Partner
                  </span>
                </div>

                {/* Center YouTube Style Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-10 sm:w-16 sm:h-11 bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                  <span className="font-bold tracking-tight text-white/95 text-[12px] line-clamp-1">
                    {item.videoTitle}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" /> Watch
                  </span>
                </div>

              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                
                <div className="space-y-2.5">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Name and Role */}
                  <div>
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 tracking-tight leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                      <span className="text-emerald-700 font-semibold">{item.role}</span>
                      <span className="text-slate-300">•</span>
                      <span>{item.location}</span>
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="pt-2 border-t border-slate-100 relative">
                  <Quote className="w-5 h-5 text-emerald-600/15 absolute -top-2.5 right-0 rotate-180" />
                  <p className="text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed font-normal italic">
                    {item.quote}
                  </p>
                </div>

                {/* Footer Action */}
                <button
                  onClick={() => setActiveModal(item)}
                  className="w-full mt-2 py-2.5 px-4 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 text-[12px] font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 border border-emerald-200/50"
                >
                  <span>View Interaction & Story</span>
                  <Play className="w-3 h-3 fill-current" />
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Video / Photo Modal Popup */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Media */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <img
                src={activeModal.image}
                alt={activeModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {activeModal.tag}
                  </span>
                  <span className="text-white/80 text-xs font-medium">
                    {activeModal.location}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {activeModal.videoTitle}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{activeModal.name}</h4>
                  <p className="text-xs text-slate-500">{activeModal.role} • {activeModal.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(activeModal.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {activeModal.quote}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
