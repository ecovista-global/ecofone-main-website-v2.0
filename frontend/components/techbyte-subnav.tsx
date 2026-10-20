'use client';

import React from 'react';
import Link from 'next/link';

interface SubNavItem {
  id: string;
  label: string;
  href: string;
  alignRight?: boolean;
  sections?: {
    title?: string;
    items: { name: string; href: string; hasArrow?: boolean }[];
  }[];
}

const SUB_NAV_ITEMS: SubNavItem[] = [
  {
    id: 'all',
    label: 'All',
    href: '/blog',
    sections: [
      {
        title: 'Sell Online',
        items: [
          { name: 'Sell Phone', href: '/sell', hasArrow: true },
          { name: 'Sell Laptop', href: '/sell', hasArrow: true },
          { name: 'Sell Smartwatch', href: '/sell', hasArrow: true },
          { name: 'Sell Tablet', href: '/sell', hasArrow: true },
        ]
      },
      {
        title: 'Explore TechByte',
        items: [
          { name: 'Latest Tech News', href: '/blog' },
          { name: 'Buying Guides & Tips', href: '/blog' },
          { name: 'Buy Certified Devices', href: '/buy' },
          { name: 'Franchise Expansion', href: '/franchise' },
        ]
      }
    ]
  },
  {
    id: 'sell-phone',
    label: 'Sell Phone',
    href: '/sell',
    sections: [
      {
        title: 'Top Brands',
        items: [
          { name: 'Apple', href: '/sell' },
          { name: 'Xiaomi', href: '/sell' },
          { name: 'Samsung', href: '/sell' },
          { name: 'OnePlus', href: '/sell' },
          { name: 'Nokia', href: '/sell' },
          { name: 'Poco', href: '/sell' },
          { name: 'More Phone Brands', href: '/sell' },
        ]
      },
      {
        title: 'Top Selling Phones',
        items: [
          { name: 'Apple iPhone 15', href: '/sell' },
          { name: 'Samsung Galaxy S24', href: '/sell' },
          { name: 'Apple iPhone 13', href: '/sell' },
          { name: 'OnePlus 12', href: '/sell' },
          { name: 'Apple iPhone 14', href: '/sell' },
          { name: 'Xiaomi Redmi Note 13 Pro', href: '/sell' },
        ]
      }
    ]
  },
  {
    id: 'sell-gadgets',
    label: 'Sell Gadgets',
    href: '/sell',
    sections: [
      {
        items: [
          { name: 'Phone', href: '/sell', hasArrow: true },
          { name: 'Laptop', href: '/sell', hasArrow: true },
          { name: 'Smart Speaker', href: '/sell', hasArrow: true },
          { name: 'Tablet', href: '/sell', hasArrow: true },
          { name: 'Gaming Consoles', href: '/sell', hasArrow: true },
          { name: 'iMac', href: '/sell' },
          { name: 'Smartwatch', href: '/sell', hasArrow: true },
          { name: 'TV', href: '/sell', hasArrow: true },
          { name: 'Earbuds', href: '/sell', hasArrow: true },
          { name: 'DSLR Camera', href: '/sell', hasArrow: true },
          { name: 'AC', href: '/sell', hasArrow: true },
        ]
      }
    ]
  },
  {
    id: 'buy-refurbished',
    label: 'Buy Refurbished Devices',
    href: '/buy',
    sections: [
      {
        items: [
          { name: 'Refurbished Phones', href: '/buy' },
          { name: 'Refurbished Laptops', href: '/buy' },
          { name: 'Refurbished Smart Watches', href: '/buy' },
          { name: 'Refurbished Tablets', href: '/buy' },
          { name: 'Refurbished Gaming Consoles', href: '/buy' },
        ]
      },
      {
        title: 'Top Brands',
        items: [
          { name: 'Apple', href: '/buy' },
          { name: 'Xiaomi', href: '/buy' },
          { name: 'Samsung', href: '/buy' },
          { name: 'OnePlus', href: '/buy' },
          { name: 'Google', href: '/buy' },
          { name: 'Oppo', href: '/buy' },
          { name: 'Vivo', href: '/buy' },
          { name: 'All Brands', href: '/buy' },
        ]
      }
    ]
  },
  {
    id: 'find-new-gadget',
    label: 'Find New Gadget',
    href: '/buy',
    sections: [
      {
        items: [
          { name: 'Find New Phone', href: '/buy', hasArrow: true },
          { name: 'Find New Laptop', href: '/buy', hasArrow: true },
          { name: 'Find New Smartwatch', href: '/buy', hasArrow: true },
          { name: 'Find New Tablet', href: '/buy', hasArrow: true },
        ]
      },
      {
        title: 'Explore',
        items: [
          { name: 'Videos', href: '/blog' },
          { name: 'News', href: '/blog' },
          { name: 'Reviews', href: '/blog' },
          { name: 'Articles', href: '/blog' },
          { name: 'QnA', href: '/faq' },
          { name: 'Tips and Tricks', href: '/blog' },
          { name: 'Tech News', href: '/blog' },
        ]
      }
    ]
  },
  {
    id: 'buy-laptop',
    label: 'Buy Laptop',
    href: '/buy',
    sections: [
      {
        title: 'Laptops',
        items: [
          { name: 'Refurbished Laptops', href: '/buy' },
          { name: 'Sell Laptop', href: '/sell' },
          { name: 'Find New Laptop', href: '/buy' },
        ]
      },
      {
        title: 'Top Brands',
        items: [
          { name: 'Apple MacBook', href: '/buy' },
          { name: 'Dell', href: '/buy' },
          { name: 'HP', href: '/buy' },
          { name: 'Lenovo', href: '/buy' },
          { name: 'Asus', href: '/buy' },
        ]
      }
    ]
  },
  {
    id: 'ecofone-store',
    label: 'EcoFone Store',
    href: '/#stores-section',
    alignRight: true,
    sections: [
      {
        title: 'More in EcoFone Stores',
        items: [
          { name: 'Delhi', href: '/#stores-section' },
          { name: 'Gurgaon', href: '/#stores-section' },
          { name: 'Noida', href: '/#stores-section' },
          { name: 'Bengaluru', href: '/#stores-section' },
          { name: 'Chennai', href: '/#stores-section' },
          { name: 'Pune', href: '/#stores-section' },
          { name: 'Agra', href: '/#stores-section' },
          { name: 'Patna', href: '/#stores-section' },
          { name: 'Ghaziabad', href: '/#stores-section' },
          { name: 'Meerut', href: '/#stores-section' },
          { name: 'Mohali', href: '/#stores-section' },
          { name: 'Lucknow HQ', href: '/#stores-section' },
          { name: 'Thane', href: '/#stores-section' },
          { name: 'More Stores', href: '/#stores-section' },
        ]
      }
    ]
  },
  {
    id: 'more',
    label: 'More',
    href: '/about',
    alignRight: true,
    sections: [
      {
        items: [
          { name: 'New Offers', href: '/buy' },
          { name: 'Partner with Us', href: '/franchise' },
          { name: 'Contact Us', href: '/contact' },
          { name: 'Warranty Policy', href: '/terms-and-conditions' },
          { name: 'Refer & Earn', href: '/contact' },
        ]
      },
      {
        title: 'Company',
        items: [
          { name: 'About Us', href: '/about' },
          { name: 'Careers', href: '/careers' },
          { name: 'Articles', href: '/blog' },
          { name: 'Become Franchise Partner', href: '/franchise' },
          { name: 'Terms & Conditions', href: '/terms-and-conditions' },
        ]
      }
    ]
  }
];

export default function TechByteSubnav() {
  return (
    <nav className="w-full bg-white border-b border-[#e5e7eb] sticky top-0 md:top-[72px] lg:top-[80px] z-40 transition-all shadow-sm">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative">
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 overflow-x-auto md:overflow-visible scrollbar-none py-0">
          {SUB_NAV_ITEMS.map((item) => (
            <div key={item.id} className="relative group shrink-0">
              {/* Top Emerald Active Indicator Line */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#16a34a] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Menu Item Link */}
              <Link
                href={item.href}
                className="flex items-center gap-1.5 py-3.5 px-2 text-[13px] sm:text-[13.5px] font-semibold text-slate-700 group-hover:text-[#16a34a] transition-colors whitespace-nowrap"
              >
                <span>{item.label}</span>
                <svg
                  className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#16a34a] transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Interactive Hover Dropdown Menu */}
              {item.sections && (
                <div
                  className={`absolute top-full ${
                    item.alignRight ? 'right-0 left-auto' : 'left-0'
                  } pt-0.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 transform translate-y-1 group-hover:translate-y-0`}
                >
                  <div className="bg-white rounded-b-xl shadow-2xl border border-gray-100 py-3 px-4 min-w-[240px] max-w-[320px] max-h-[480px] overflow-y-auto text-slate-800">
                    <div className="space-y-3.5">
                      {item.sections.map((section, sIdx) => (
                        <div key={sIdx} className={sIdx > 0 ? 'pt-2.5 border-t border-slate-100' : ''}>
                          {section.title && (
                            <h4 className="text-[11.5px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                              {section.title}
                            </h4>
                          )}
                          <ul className="space-y-1">
                            {section.items.map((sub, iIdx) => (
                              <li key={iIdx}>
                                <Link
                                  href={sub.href}
                                  className="text-[13px] text-slate-600 hover:text-[#16a34a] hover:bg-emerald-50/60 font-medium py-1 px-2 rounded-md flex items-center justify-between transition-colors"
                                >
                                  <span>{sub.name}</span>
                                  {sub.hasArrow && (
                                    <span className="text-slate-400 text-[11px] font-bold">&gt;</span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
