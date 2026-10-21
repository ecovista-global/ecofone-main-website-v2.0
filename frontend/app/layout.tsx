import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React from "react";
import LayoutClientWrapper from "../components/layout-client-wrapper";
import WriteReviewButton from "../components/write-review-button";
import CopyrightYear from "../components/copyright-year";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "EcoFone | Buy Refurbished Phones & Sell Old Phones for Instant Cash",
  description: "India's trusted re-commerce platform. Buy certified refurbished smartphones (iPhone, Samsung, OnePlus) with 6-month warranty. Sell your old mobile for instant cash or start a mobile franchise.",
  keywords: "refurbished phones, sell old phone, buy used iphone, second hand mobile phones, sell old mobile online, refurbished phone franchise, certified refurbished smartphones, old mobile buyer, refurbished mobile business India, ecofone India",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "EcoFone - Premium Refurbished Smartphones & Instant Cash for Old Phones",
    description: "Sell your used mobile phone instantly or shop premium, 32-point tested devices with free doorstep delivery, COD, and full warranty. Start a profitable franchise with us today.",
    url: "https://www.ecofone.co.in",
    siteName: "EcoFone India",
    images: [
      {
        url: "https://www.ecofone.co.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EcoFone Marketplace",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.ecofone.co.in/#organization",
                  "name": "EcoFone India",
                  "url": "https://www.ecofone.co.in",
                  "logo": "https://www.ecofone.co.in/logo.jpg",
                  "sameAs": [
                    "https://www.facebook.com/people/EcoFone/61583296272681/?mibextid=wwXIfr&rdid=3ro69EiPXA4Rlxf9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F187RLSW1y4%2F%3Fmibextid%3DwwXIfr",
                    "https://www.instagram.com/ecofone_official",
                    "https://www.linkedin.com/company/ecovista-private-limited/",
                    "https://x.com/ecofonel82115"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9999988888",
                    "contactType": "customer support",
                    "areaServed": "IN",
                    "availableLanguage": ["en", "hi"]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.ecofone.co.in/#website",
                  "url": "https://www.ecofone.co.in",
                  "name": "EcoFone | India's Premium Re-Commerce Hub",
                  "publisher": {
                    "@id": "https://www.ecofone.co.in/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.ecofone.co.in/buy?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.ecofone.co.in/#localbusiness",
                  "name": "EcoFone Store HQ",
                  "image": "https://www.ecofone.co.in/logo.jpg",
                  "telephone": "+91-9999988888",
                  "url": "https://www.ecofone.co.in",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Andheri West",
                    "addressLocality": "Mumbai",
                    "addressRegion": "MH",
                    "postalCode": "400053",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 19.1136,
                    "longitude": 72.8697
                  },
                  "priceRange": "₹₹",
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    "opens": "10:00",
                    "closes": "20:00"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-dots min-h-screen flex flex-col font-sans relative">
        <LayoutClientWrapper
          footer={
            <footer className="w-full bg-[#071f12] text-slate-300 font-sans border-t border-[#0d3820] pt-14 pb-8">
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#0f3d23]">
                  {/* Col 1: Brand & Review */}
                  <div className="flex flex-col space-y-4">
                    <Link href="/" className="inline-block">
                      <img src="/logo.jpg" alt="EcoFone Logo" className="h-12 w-auto object-contain rounded" />
                    </Link>
                    <p className="text-[13px] text-slate-300 leading-relaxed">
                      EcoFone is India’s premium franchise network and trade-in platform for high-quality refurbished smartphones. Extending the lifecycle of electronics for a greener tomorrow.
                    </p>
                    <div className="pt-2">
                      <WriteReviewButton />
                    </div>
                  </div>

                  {/* Col 2: Quick Links */}
                  <div className="flex flex-col space-y-3">
                    <h4 className="text-[13px] font-bold text-white tracking-wider uppercase">
                      QUICK LINKS
                    </h4>
                    <ul className="flex flex-col space-y-2 text-[13px] text-slate-300">
                      <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                      <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                      <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Our Services</Link></li>
                      <li><Link href="/franchise" className="hover:text-emerald-400 transition-colors">Franchise Program</Link></li>
                      <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Articles / Blogs</Link></li>
                      <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
                      <li className="pt-1">
                        <Link href="/verify-certificate/EF-2026-8842" className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                          <span>Verify Certificate</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 3: Contact Us */}
                  <div className="flex flex-col space-y-3">
                    <h4 className="text-[13px] font-bold text-white tracking-wider uppercase">
                      CONTACT US
                    </h4>
                    <div className="flex flex-col space-y-2.5 text-[13px] text-slate-300">
                      <p><span className="text-slate-400">Email:</span> <a href="mailto:business@ecofone.co.in" className="hover:text-emerald-400 transition-colors">business@ecofone.co.in</a></p>
                      <p><span className="text-slate-400">Phone:</span> <a href="tel:+919919965499" className="hover:text-emerald-400 transition-colors">+91 99199 65499</a></p>
                      <p className="leading-relaxed">
                        <span className="text-slate-400">Lucknow HQ:</span> 505, JB Metro Heights, Transport Nagar, Kanpur Road, Lucknow – 226012
                      </p>
                    </div>
                  </div>

                  {/* Col 4: Our Location */}
                  <div className="flex flex-col space-y-3">
                    <h4 className="text-[13px] font-bold text-white tracking-wider uppercase">
                      OUR LOCATION
                    </h4>
                    <div className="relative rounded-xl overflow-hidden border border-[#0f3d23] shadow-lg bg-[#05160d] group h-36">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2274483733226!2d80.8920155!3d26.7993086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bf88414995555%3A0xb35a9f24300bbba1!2sJB%20Metro%20Heights!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[25%] contrast-110"
                      />
                      <a
                        href="https://maps.google.com/?q=JB+Metro+Heights+Transport+Nagar+Lucknow"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2.5 left-2.5 bg-white/90 hover:bg-white text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 transition-all"
                      >
                        <span>Maps</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-400">
                  <p>© 2026 EcoFone Franchise Network. All rights reserved.</p>
                  <div className="flex items-center gap-4 text-slate-400">
                    <a href="https://www.facebook.com/people/EcoFone/61583296272681/?mibextid=wwXIfr&rdid=3ro69EiPXA4Rlxf9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F187RLSW1y4%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors" aria-label="Facebook">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                    </a>
                    <a href="https://www.instagram.com/ecofone_official" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors" aria-label="Instagram">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </a>
                    <a href="https://www.linkedin.com/company/ecovista-private-limited/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors" aria-label="LinkedIn">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://x.com/ecofonel82115" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors" aria-label="X">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          }
        >
          {children}
        </LayoutClientWrapper>
      </body>
    </html>
  );
}
