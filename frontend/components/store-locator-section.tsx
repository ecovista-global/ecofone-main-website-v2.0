'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Phone, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../lib/api';

export interface StoreItem {
  id: string;
  name: string;
  area?: string;
  city?: string;
  address: string;
  timings?: string;
  phone?: string;
  isOpen?: boolean;
  type?: string;
  imageUrl?: string;
  mapsUrl?: string;
  latitude?: number;
  longitude?: number;
}

const DEFAULT_STORES: StoreItem[] = [
  {
    id: "store-hazratganj",
    name: "EcoFone Store - Hazratganj",
    area: "Hazratganj",
    city: "Lucknow",
    address: "Shop No. 12, Ground Floor, Hazratganj Market, Lucknow, Uttar Pradesh – 226001",
    timings: "10:00 AM - 10:00 PM",
    phone: "+91 99199 65499",
    isOpen: true,
    type: "LIVE",
    imageUrl: "/store_hazratganj.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shop+No.+12+Ground+Floor+Hazratganj+Market+Lucknow+Uttar+Pradesh+226001"
  },
  {
    id: "store-alambagh",
    name: "EcoFone Store - Alambagh",
    area: "Alambagh",
    city: "Lucknow",
    address: "Shop No. G-4, Alambagh Market, Alambagh, Lucknow, Uttar Pradesh – 226005",
    timings: "10:00 AM - 09:00 PM",
    phone: "+91 99199 65499",
    isOpen: true,
    type: "LIVE",
    imageUrl: "/store_alambagh.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shop+No.+G-4+Alambagh+Market+Alambagh+Lucknow+Uttar+Pradesh+226005"
  },
  {
    id: "store-gomtinagar",
    name: "EcoFone Store - Gomti Nagar",
    area: "Gomti Nagar",
    city: "Lucknow",
    address: "D-202, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh – 226010",
    timings: "10:00 AM - 09:00 PM",
    phone: "+91 99199 65499",
    isOpen: true,
    type: "LIVE",
    imageUrl: "/store_gomtinagar.jpg",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=D-202+Vibhuti+Khand+Gomti+Nagar+Lucknow+Uttar+Pradesh+226010"
  }
];

export default function StoreLocatorSection() {
  const [stores, setStores] = useState<StoreItem[]>(DEFAULT_STORES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchStores() {
      try {
        const data = await api.locateStores();
        if (Array.isArray(data) && data.length > 0) {
          setStores(data);
        }
      } catch (err) {
        console.warn('Using default stores fallback:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStores();
  }, []);

  // Slide controls
  const visibleCardsCount = 3;
  const maxIndex = Math.max(0, stores.length - visibleCardsCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="stores-section" className="w-full bg-[#f8fbf9] py-14 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans">
      
      {/* Decorative ambient backdrop */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-orange-100/30 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Top Header Row with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          
          {/* Left Titles */}
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <span className="inline-block bg-[#e8f5e9] text-[#1b5e20] text-[11px] sm:text-xs font-black tracking-widest px-3.5 py-1 rounded-full uppercase mb-3 border border-emerald-200/60 shadow-sm">
              OUR STORES
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0f281e] tracking-tight leading-[1.15]">
              Find an <span className="text-[#ea580c]">EcoFone Store</span> Near You
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-[15px] mt-2.5 leading-relaxed font-medium">
              Visit our nearest EcoFone store to explore the latest smartphones, accessories and more.
            </p>
          </div>

          {/* Right Action Controls (No page redirection - inline controls) */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-slate-700/70 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-[13px] font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{showAll ? 'Show Carousel' : 'View all stores'}</span>
              <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
            </button>

            {!showAll && stores.length > visibleCardsCount && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous store"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Next store"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0a271d] hover:bg-[#061810] flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* ── STORE CARDS DISPLAY (3 in a row on desktop) ── */}
        {showAll ? (
          /* Grid View when 'View all stores' is clicked */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          /* Carousel View (Default) */
          <div className="relative overflow-hidden" ref={carouselContainerRef}>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-transform duration-500 ease-out"
              style={{
                transform: stores.length > visibleCardsCount 
                  ? `translateX(-${currentIndex * (100 / visibleCardsCount)}%)` 
                  : 'none'
              }}
            >
              {stores.map((store) => (
                <div key={store.id} className="w-full">
                  <StoreCard store={store} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function StoreCard({ store }: { store: StoreItem }) {
  const directionsUrl = store.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address || store.name)}`;
  const cleanPhone = (store.phone || '+91 99199 65499').replace(/\s+/g, '');

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-slate-200/90 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group h-full">
      
      {/* 1. Top Storefront Image */}
      <div className="w-full h-[200px] sm:h-[220px] relative overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={store.imageUrl || '/store_hazratganj.jpg'}
          alt={store.name}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/store_hazratganj.jpg')) {
              target.src = '/store_hazratganj.jpg';
            }
          }}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />

        {/* Floating Open/Closed Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          {store.isOpen !== false ? (
            <span className="inline-flex items-center gap-1.5 bg-[#4ade80]/90 backdrop-blur-md text-[#064e3b] text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              Open Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-rose-500/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-200" />
              Closed
            </span>
          )}
        </div>
      </div>

      {/* 2. Middle Content Stack */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Store Name & Google Maps External Link */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-lg sm:text-[19px] text-[#0f281e] tracking-tight leading-snug">
              {store.name}
            </h3>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${store.name} on Google Maps`}
              className="text-slate-400 hover:text-emerald-700 transition-colors flex-shrink-0 mt-0.5"
              title="Open location on Google Maps"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Details (Address & Timings) */}
          <div className="space-y-3 mt-4 text-[13px] sm:text-[13.5px]">
            {/* Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
              <p className="text-slate-600 leading-snug">
                <strong className="text-slate-900 font-bold">Address:</strong>{' '}
                {store.address}
              </p>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
              <p className="text-slate-600 leading-snug">
                <strong className="text-slate-900 font-bold">Timings:</strong>{' '}
                {store.timings || '10:00 AM - 09:00 PM'}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Bottom Action Buttons Bar (Call Store | Get Directions) */}
        <div className="mt-6 pt-3 border-t border-slate-100 grid grid-cols-2 divide-x divide-slate-100 bg-[#f8fbf9] -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 rounded-b-[24px] sm:rounded-b-[28px] overflow-hidden">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center justify-center gap-2 py-3.5 px-3 text-[#059669] hover:text-[#047857] hover:bg-emerald-50/60 font-bold text-xs sm:text-[13px] transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Store</span>
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 px-3 text-[#059669] hover:text-[#047857] hover:bg-emerald-50/60 font-bold text-xs sm:text-[13px] transition-all"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>
        </div>

      </div>

    </div>
  );
}
