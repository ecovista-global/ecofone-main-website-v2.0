"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Maximize2 } from "lucide-react";
import { DEFAULT_GALLERY_ITEMS, GalleryItemData } from "@/types/gallery";

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
        console.warn("Using default gallery items:", err);
      }
    }
    loadGallery();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightboxItem(null);
      }
    };
    if (activeLightboxItem) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxItem]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
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
    <section className="w-full bg-[#f4f7f5] py-16 sm:py-20 lg:py-24 overflow-x-hidden relative font-sans border-t border-slate-200/70 border-b border-slate-200/50">
      
      {/* Header Block & Navigation Controls */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#071f12]">
            Store Experience <span className="text-[#ea580c]">& Moments.</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium max-w-xl">
            Take a look inside our certified refurbished experience centers, grand store openings, and partner milestones across India.
          </p>
        </div>

        {/* Minimalist Rounded Arrow Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous photos"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow hover:bg-slate-50 hover:border-slate-300 text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next photos"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow hover:bg-slate-50 hover:border-slate-300 text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 2-Row Dense Masonry Horizontal Grid */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className="overflow-x-auto pb-6 px-4 sm:px-6 lg:px-12 scrollbar-none snap-x scroll-smooth cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="grid gap-5 sm:gap-6 min-w-max pb-2"
          style={{
            gridTemplateRows: "repeat(2, 290px)",
            gridAutoColumns: "310px",
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
                className={`relative overflow-hidden rounded-2xl sm:rounded-[22px] bg-slate-200/60 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] group cursor-pointer transition-all duration-300 hover:-translate-y-1 ${gridClass}`}
              >
                {/* Clean Edge-to-Edge Photo */}
                <Image
                  src={item.media_url}
                  alt={cleanCaption || "EcoFone Community Gallery"}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  unoptimized
                />

                {/* Subtle Hover Gradient & Caption (Only visible on hover, clean by default) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
                  <p className="text-white text-xs sm:text-sm font-bold tracking-tight drop-shadow line-clamp-2 leading-snug">
                    {cleanCaption || "EcoFone Experience Center"}
                  </p>
                  <span className="text-[11px] text-emerald-300 font-semibold mt-1 flex items-center gap-1">
                    Click to view full photo →
                  </span>
                </div>

                {/* Expand Corner Hint on Hover */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── FULL-RESOLUTION LIGHTBOX MODAL ─────────────────── */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[150] flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0a1812] border border-emerald-900/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="px-6 py-4 border-b border-emerald-900/50 flex items-center justify-between bg-black/40">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Store Experience • EcoFone
              </span>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Media Viewport */}
            <div className="relative w-full h-[60vh] sm:h-[72vh] bg-black flex items-center justify-center">
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
                  EcoFone Refurbished Smartphone Network • Uttar Pradesh & Pan-India
                </p>
              </div>

              <button
                onClick={() => setActiveLightboxItem(null)}
                className="px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
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
