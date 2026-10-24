import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LayoutClientWrapper from "../components/layout-client-wrapper";
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
            <footer className="w-full bg-[#071f12] text-slate-300 font-sans border-t border-[#0d3820] pt-14 pb-12">
              <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
                {/* Top Row: Brand Pill & Social Icons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8">
                  {/* Brand Pill + Subtitle */}
                  <div className="flex items-center gap-3.5">
                    <Link href="/" className="bg-white rounded-xl px-3.5 py-2 inline-flex items-center shadow-sm hover:opacity-95 transition-opacity">
                      <img src="/logo.jpg" alt="EcoFone Logo" className="h-7 sm:h-8 w-auto object-contain" />
                    </Link>
                    <div className="w-[1px] h-6 bg-slate-700/80" />
                    <span className="text-white text-xs sm:text-[13px] font-black tracking-[0.2em] uppercase">
                      FRANCHISE NETWORK
                    </span>
                  </div>

                  {/* Circular Social Buttons */}
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://www.linkedin.com/company/ecovista-private-limited/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:border-emerald-500/30"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a
                      href="https://www.instagram.com/ecofone_official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:border-emerald-500/30"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </a>
                    <a
                      href="https://wa.me/919919965499"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:border-emerald-500/30"
                      aria-label="WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.186 1.564 5.941l-1.637 5.981 6.143-1.612c1.701.928 3.651 1.455 5.73 1.455 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                    </a>
                    <a
                      href="https://x.com/ecofonel82115"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:border-emerald-500/30"
                      aria-label="X"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a
                      href="https://www.facebook.com/people/EcoFone/61583296272681/?mibextid=wwXIfr&rdid=3ro69EiPXA4Rlxf9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F187RLSW1y4%2F%3Fmibextid%3DwwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:border-emerald-500/30"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                    </a>
                  </div>
                </div>

                {/* Corporate Info Block (Setu Style Left-Aligned) */}
                <div className="space-y-2 max-w-3xl pt-2">
                  <p className="text-[13px] sm:text-sm text-slate-400 font-normal">
                    India’s Trusted Smartphone Re-Commerce & Franchise Network
                  </p>
                  <p className="text-sm sm:text-[15px] font-bold text-white tracking-wide uppercase">
                    ECOVISTA GLOBAL PRIVATE LIMITED
                  </p>
                  <p className="text-[13px] text-slate-400 leading-relaxed">
                    505, JB Metro Heights, Transport Nagar, Kanpur Road, Lucknow, Uttar Pradesh 226012
                  </p>
                  <p className="text-[13px] text-slate-400 pt-1">
                    <a href="mailto:business@ecofone.co.in" className="text-slate-300 hover:text-emerald-400 transition-colors">business@ecofone.co.in</a>
                    <span className="mx-2 text-slate-600">•</span>
                    <a href="tel:+919919965499" className="text-slate-300 hover:text-emerald-400 transition-colors">+91 99199 65499</a>
                  </p>
                </div>

                {/* Horizontal Navigation Row (Setu Style) */}
                <div className="pt-10 pb-6">
                  <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-[13.5px] sm:text-[14px]">
                    <Link href="/" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors">Home</Link>
                    <Link href="/about" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors">About Us</Link>
                    <Link href="/franchise" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors">Franchise Program</Link>
                    <Link href="/careers" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors">Careers</Link>
                    <Link href="/blog" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors">Articles / Blogs</Link>
                    <Link href="/contact" className="text-slate-300 hover:text-emerald-400 font-medium transition-colors">Contact Us</Link>
                  </nav>
                </div>

                {/* Bottom Legal & Copyright Bar */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-400">
                  <p>© 2026 ECOVISTA GLOBAL PRIVATE LIMITED. All rights reserved.</p>
                  <div className="flex items-center gap-6">
                    <Link href="/terms-and-conditions" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                    <Link href="/terms-and-conditions" className="hover:text-emerald-400 transition-colors">Terms of Use</Link>
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
