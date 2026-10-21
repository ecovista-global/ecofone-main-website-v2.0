"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Maximize2,
  X,
  Play,
  MapPin,
  Camera,
} from "lucide-react";
import { DEFAULT_GALLERY_ITEMS, GalleryItemData } from "@/lib/gallery-data";

interface GallerySectionProps {
  initialData?: GalleryItemData[];
}

export default function GallerySection({ initialData }: GallerySectionProps) {
  const [items, setItems] = useState<GalleryItemData[]>(initialData || DEFAULT_GALLERY_ITEMS);
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItemData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch latest gallery items
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setItems(data);
          }
        }
      } catch (err) {
        console.warn("Using default gallery data:", err);
      }
    }
    loadGallery();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -440 : 440;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current && e.deltaY !== 0 && !e.shiftKey) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const sortedData = [...items].sort(
    (a, b) => (Number(a.display_order) ?? 0) - (Number(b.display_order) ?? 0)
  );

  return (
    <section className="w-full bg-[#07130e] py-20 sm:py-24 overflow-x-hidden relative font-sans text-white border-t border-emerald-950/80">
      
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Block & Navigation Controls */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-10 sm:mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>ECOFONE IN ACTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.15] text-white">
            Moments in Motion: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Our Stores & Partners
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            Glimpses into grand openings, diagnostic hardware labs, partner summits, and happy customer handovers powering India's re-commerce revolution.
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-emerald-600/30 border border-white/10 hover:border-emerald-400/50 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center justify-center transition-all duration-200 shadow-lg shadow-emerald-900/40 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2-Row Dense Masonry Horizontal Grid */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className="overflow-x-auto pb-8 px-4 sm:px-6 lg:px-12 scrollbar-none snap-x scroll-smooth cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="grid gap-6 min-w-max pb-2"
          style={{
            gridTemplateRows: "repeat(2, 320px)",
            gridAutoColumns: "320px",
            gridAutoFlow: "column dense",
          }}
        >
          {sortedData.map((item) => {
            const rawCaption = item.caption || "";
            let size = "1x1";
            const sizeMatch = rawCaption.match(/^SIZE:([^|]+)\|/);
            if (sizeMatch) size = sizeMatch[1];
            const cleanCaption = rawCaption.replace(/^SIZE:[^|]+\|/, "");

            let gridClass = "col-span-1 row-span-1";
            if (size === "1x2") gridClass = "col-span-1 row-span-2";
            else if (size === "2x1") gridClass = "col-span-2 row-span-1";
            else if (size === "2x2") gridClass = "col-span-2 row-span-2";

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className={`relative overflow-hidden rounded-3xl bg-[#0e1d17] border border-emerald-900/40 shadow-xl group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/60 ${gridClass}`}
              >
                {/* Media Image */}
                <Image
                  src={item.media_url}
                  alt={cleanCaption || "EcoFone Gallery"}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/90 transition-colors duration-300" />

                {/* Top Badge: Type / EcoFone */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10 pointer-events-none">
                  <span className="text-[11px] font-bold bg-black/60 backdrop-blur-md text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#ea580c]" />
                    <span>EcoFone Network</span>
                  </span>
                </div>

                {/* Video Play Indicator */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                )}

                {/* Expand icon on hover */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Story Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none space-y-1">
                  <p className="text-white text-sm sm:text-[15px] font-bold tracking-tight drop-shadow-md line-clamp-2 leading-snug">
                    {cleanCaption || "EcoFone Experience Center"}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    <span>Click to view full photo</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ─── LIGHTBOX MODAL ─────────────────────────────────── */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[150] flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0a1812] border border-emerald-900/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="px-6 py-4 border-b border-emerald-900/50 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  EcoFone Store Moments
                </span>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Media Viewport */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] bg-black flex items-center justify-center">
              <Image
                src={activeLightboxItem.media_url}
                alt="Full preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Lightbox Caption Footer */}
            <div className="p-6 bg-[#07130e] border-t border-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {activeLightboxItem.caption.replace(/^SIZE:[^|]+\|/, "")}
                </h4>
                <p className="text-xs text-slate-400">
                  Refurbished Smartphone Retail Network • Uttar Pradesh & Pan-India
                </p>
              </div>

              <button
                onClick={() => setActiveLightboxItem(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
