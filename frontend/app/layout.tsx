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
                    "https://www.facebook.com/people/EcoFone/61583296272681/?mibextid=wwXIfr&rdid=3ro69EiPXA4Rlxf9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F187RLSW1y4%2F%3Fmibextid%3DwwXIfr"
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
                        <footer className="w-full bg-[#f8f9fa] border-t border-gray-200 text-slate-600 text-[12px] font-sans pb-6">
              {/* TOP SECTION: Links & Logo */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-6 lg:gap-8">
                  
                  {/* Col 1: Logo & Socials */}
                  <div className="col-span-2 md:col-span-1 flex flex-col space-y-6">
                    <Link href="/" className="inline-block">
                      <img src="/logo.jpg" alt="EcoFone Logo" className="h-10 sm:h-12 w-auto object-contain object-left" />
                    </Link>
                    <div className="flex flex-col gap-2.5">
                      <span className="font-bold text-[13px] text-slate-700">Follow us on</span>
                      <div className="flex items-center gap-2">
                        {/* Social Icons matching Cashify's grey circular style */}
                        <a href="https://x.com/ecofonel82115" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center hover:bg-slate-600 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="https://www.facebook.com/people/EcoFone/61583296272681" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center hover:bg-slate-600 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </a>
                        <a href="https://www.instagram.com/ecofone_official" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center hover:bg-slate-600 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center hover:bg-slate-600 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>

                                    {/* Col 2: Services */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-[13px] text-slate-700">Services</h4>
                    <ul className="flex flex-col gap-3">
                      <li><Link href="/buy" className="hover:text-[#38b2ac] transition-colors">Buy Refurbished Phones</Link></li>
                      <li><Link href="/sell" className="hover:text-[#38b2ac] transition-colors">Sell Old Phone</Link></li>
                      <li><Link href="/franchise" className="hover:text-[#38b2ac] transition-colors">Franchise Program</Link></li>
                      <li><Link href="/contact" className="hover:text-[#38b2ac] transition-colors">Mobile Repair</Link></li>
                      <li><Link href="/contact" className="hover:text-[#38b2ac] transition-colors">Corporate Sales</Link></li>
                    </ul>
                  </div>

                                    {/* Col 3: Company */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-[13px] text-slate-700">Company</h4>
                    <ul className="flex flex-col gap-3">
                      <li><Link href="/about" className="hover:text-[#ea580c] transition-colors">About Us</Link></li>
                      <li><Link href="/careers" className="hover:text-[#ea580c] transition-colors">Careers</Link></li>
                      <li><Link href="/blog" className="hover:text-[#ea580c] transition-colors">Articles</Link></li>
                      <li><Link href="/franchise" className="hover:text-[#ea580c] transition-colors">Partner With Us</Link></li>
                    </ul>
                  </div>



                  {/* Col 5: Help & Support */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-[13px] text-slate-700">Help & Support</h4>
                    <ul className="flex flex-col gap-3">
                      <li><Link href="/faq" className="hover:text-[#38b2ac] transition-colors">FAQ</Link></li>
                      <li><Link href="/contact" className="hover:text-[#38b2ac] transition-colors">Contact Us</Link></li>
                      <li><Link href="/warranty-policy" className="hover:text-[#38b2ac] transition-colors">Warranty Policy</Link></li>
                      <li><Link href="/refund-policy" className="hover:text-[#38b2ac] transition-colors">Refund Policy</Link></li>
                    </ul>
                  </div>

                                    {/* Col 6: More Info & Chat */}
                  <div className="flex flex-col gap-4 relative">
                    <h4 className="font-bold text-[13px] text-slate-700">More Info</h4>
                    <ul className="flex flex-col gap-3">
                      <li><Link href="/terms-and-conditions" className="hover:text-[#38b2ac] transition-colors">Terms & Conditions</Link></li>
                      <li><Link href="/privacy-policy" className="hover:text-[#38b2ac] transition-colors">Privacy Policy</Link></li>
                      <li><Link href="/terms-of-use" className="hover:text-[#38b2ac] transition-colors">Terms of Use</Link></li>
                      <li><Link href="/e-waste-policy" className="hover:text-[#38b2ac] transition-colors">E-Waste Policy</Link></li>
                      <li><Link href="/cookie-policy" className="hover:text-[#38b2ac] transition-colors">Cookie Policy</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* MIDDLE SECTION: Registered Office & Guarantee Box */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <hr className="border-gray-200" />
                <div className="pt-6 pb-2 flex flex-col lg:flex-row justify-between items-start gap-8">
                  
                  {/* Left: Office Address Text */}
                  <div className="flex flex-col gap-3 text-[11px] text-slate-500 leading-relaxed max-w-3xl pr-4">
                    <p>Registered Office:</p>
                    <p>
                      EcoFone Limited (formerly known as EcoFone Pvt. Ltd. and Manak Waste Management Pvt. Ltd.) | 505, JB Metro Heights, Transport Nagar, Kanpur Road, Lucknow, Uttar Pradesh 226012, India, Support-9919965499 | CIN: U46524DL2009PLC190441<br/>
                      EcoFone Limited (formerly known as EcoFone Pvt. Ltd. and Manak Waste Management Pvt. Ltd.) is ISO 27001 & 27701 Compliance Certified. Person who may be contacted in case of any compliance related queries or grievances: Manoj Kumar (grievanceofficer@ecofone.co.in)<br/>
                      EcoFone Limited (formerly known as EcoFone Pvt. Ltd. and Manak Waste Management Pvt. Ltd.) is R2v3 Certified. Current certification scope covers Downstream Vendor Management, Logical Data Sanitization, and Testing & Repair of Used Laptops only.
                    </p>
                    <p className="mt-1">
                      Country of Origin : India ** All product , logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
                    </p>
                  </div>



                </div>
              </div>

              {/* BOTTOM SECTION: Copyright */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <hr className="border-gray-200 mb-6" />
                <span className="text-[12px] text-slate-600">Copyright © <CopyrightYear /> EcoFone All rights reserved</span>
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
