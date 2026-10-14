'use client';
import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function TopBrands() {
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    api.getBrandsSection().then((data) => {
      setBrands(data || []);
    }).catch(console.error);
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="w-full bg-[#f2f5f1] border-y border-slate-200/90 py-5 sm:py-6 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6 md:gap-4">
          
          <div className="hidden lg:flex items-center text-[11px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap pr-8 border-r border-slate-300/90">
            WE DEAL IN <br /> TOP BRANDS
          </div>

          <div className="flex-1 flex items-center justify-between flex-wrap gap-6 sm:gap-8 px-2 sm:px-6">
            {brands.map((brand) => {
              if (brand.type === 'svg' && brand.name.toLowerCase() === 'apple') {
                return (
                  <div key={brand.id} className="flex items-center justify-center hover:opacity-100 opacity-90 transition-opacity" title={brand.name}>
                    <svg className="h-6 sm:h-7 w-auto" fill={brand.color || '#1A1A1A'} viewBox="0 0 384 512">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                  </div>
                );
              }
              if (brand.type === 'image') {
                return (
                  <div key={brand.id} className="flex items-center justify-center hover:opacity-100 opacity-90 transition-opacity" title={brand.name}>
                    <img src={brand.logo} alt={brand.name} className="h-6 sm:h-7 w-auto object-contain" />
                  </div>
                );
              }
              // Fallback to text styling based on existing presets or custom color
              if (brand.badge) {
                return (
                  <div key={brand.id} className="flex items-center gap-1.5 justify-center hover:opacity-100 opacity-90 transition-opacity" title={brand.name}>
                    <span className="text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center justify-center" style={{ backgroundColor: brand.color || '#eb0028' }}>{brand.logo}</span>
                    <span className="font-extrabold tracking-tight text-xs sm:text-sm" style={{ color: brand.color || '#eb0028' }}>{brand.name.toUpperCase()}</span>
                  </div>
                );
              }
              if (brand.box) {
                return (
                  <div key={brand.id} className="flex items-center justify-center hover:opacity-100 opacity-90 transition-opacity" title={brand.name}>
                    <div className="px-2.5 py-1 rounded-[4px] flex items-center justify-center font-black text-xs sm:text-sm" style={{ backgroundColor: brand.color || '#ffc915', color: brand.textColor || '#fff' }}>
                      {brand.logo}
                    </div>
                  </div>
                );
              }
              return (
                <div key={brand.id} className="flex items-center justify-center hover:opacity-100 opacity-90 transition-opacity" title={brand.name}>
                  <span className="font-black tracking-wider text-base sm:text-lg" style={{ color: brand.color || '#333' }}>{brand.logo}</span>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center text-[11px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap pl-8 border-l border-slate-300/90">
            AND MANY MORE
          </div>
        </div>
      </div>
    </section>
  );
}
