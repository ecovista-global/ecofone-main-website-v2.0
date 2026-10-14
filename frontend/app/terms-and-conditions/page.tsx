'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const SECTIONS = [
  { id: 'introduction', title: 'Introduction & About Us' },
  { id: 'usage', title: 'Terms of Use' },
  { id: 'products', title: 'Refurbished Devices Policy' },
  { id: 'orders', title: 'Orders & Delivery' },
  { id: 'warranty', title: 'Warranty & Return Policy' },
  { id: 'privacy', title: 'Privacy Policy' },
  { id: 'franchise', title: 'Franchise Policy' },
  { id: 'legal', title: 'Legal & Contact' },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('introduction');

  // Automatically update active section based on scroll position using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is most visible
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Sort by intersection ratio to find the most visible one
          visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px', // Trigger when section hits top third of screen
        threshold: [0, 0.2, 0.5, 0.8, 1]
      }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Adjusted offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full bg-[#f9fafb] min-h-screen pb-20 font-sans">
      
      {/* Main Content Layout */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start relative">
          
          {/* Left Sidebar (Sticky Navigation) - Styled exactly like the screenshot */}
          <div className="hidden lg:block w-[300px] shrink-0 sticky top-32 z-10">
            <div className="bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 py-3">
              <nav className="flex flex-col">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center justify-between px-6 py-4 text-[15px] transition-all duration-200 text-left ${
                        isActive 
                          ? 'text-[#ea580c] font-bold bg-white' 
                          : 'text-slate-500 font-bold hover:text-slate-800 bg-white'
                      }`}
                    >
                      <span className="pr-4 leading-snug">{section.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 text-[#ea580c]" strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Content Area - Pure document style text */}
          <div className="flex-1 w-full bg-white sm:bg-transparent sm:p-0 p-6 rounded-xl">
            <div className="space-y-12 pb-20">
              
              {/* 1. Introduction & About Us */}
              <section id="introduction" className="scroll-mt-32">
                <div className="mb-4">
                  <h2 className="text-[15px] font-bold text-slate-900">1. Introduction & About Us</h2>
                </div>
                <div className="text-[14px] text-slate-700 leading-[1.8] space-y-4">
                  <p>
                    By using the EcoFone website and services, you agree to these Terms. EcoFone is a premium re-commerce brand operated by Ecovista Global Private Limited, dedicated to extending the lifecycle of electronics in India.
                  </p>
                  <p>
                    <strong>Company Particulars:</strong><br/>
                    Legal Entity: Ecovista Global Private Limited<br/>
                    CIN: U70109UP2020PTC138839<br/>
                    Registered Office: 505, JB Metro Heights, Kanpur Road, Lucknow – 226012
                  </p>
                  <p>
                    <strong>Eligibility & Acceptance:</strong> You must be legally capable of entering into a contract under Indian law to buy, sell, or trade devices with us. Using our platform means you accept these terms in full. If a specific service has separate terms (like a specific warranty policy), those apply as well.
                  </p>
                </div>
              </section>

              {/* 2. Terms of Use */}
              <section id="usage" className="scroll-mt-32">
                <div className="mb-4">
                  <h2 className="text-[15px] font-bold text-slate-900">2. Terms of Use</h2>
                </div>
                <div className="text-[14px] text-slate-700 leading-[1.8] space-y-4">
                  <p>
                    Our website is built for genuine customers. You agree to use it responsibly and lawfully. 
                  </p>
                  <p>
                    <strong>Prohibited Actions:</strong> Providing false information, misusing discounts, scraping our data, or attempting to sell stolen or unlawfully obtained devices.
                  </p>
                  <p>
                    <strong>Intellectual Property:</strong> Everything you see here—our logo, designs, images, and text—belongs to EcoFone. Please do not copy or use them without our written permission.
                  </p>
                  <p>
                    <strong>Accuracy:</strong> We try our absolute best to keep all prices, images, and device grades accurate. However, the actual cosmetic condition of refurbished phones may vary slightly from standard stock photos.
                  </p>
                </div>
              </section>

              {/* 3. Products & Trade-Ins */}
              <section id="products" className="scroll-mt-32">
                <div className="mb-4">
                  <h2 className="text-[15px] font-bold text-slate-900">3. Refurbished Devices Policy</h2>
                </div>
                <div className="text-[14px] text-slate-700 leading-[1.8] space-y-4">
                  <p>
                    <strong>Buying Refurbished Devices:</strong> We sell pre-owned devices that undergo strict quality checks. We will clearly state their cosmetic grade (e.g., Like New, Excellent) and warranty status. We never pretend a refurbished phone is brand new.
                  </p>
                  <p>
                    <strong>Selling & Trade-Ins:</strong> When you sell us your phone, the initial price we quote online is an estimate. The final offer depends on our physical 32-point inspection. If the actual condition differs from what you selected online, the price will be adjusted accordingly.
                  </p>
                  <p>
                    <em>Your Responsibilities When Selling:</em> You must be the absolute legal owner of the device. The device must not be stolen or blacklisted. We check IMEIs and cooperate with law enforcement if fraud is suspected. You must factory reset your phone and back up your data before handing it over. We cannot be held responsible for lost data.
                  </p>
                </div>
              </section>

              {/* 4. Orders & Delivery */}
              <section id="orders" className="scroll-mt-32">
                <div className="mb-4">
                  <h2 className="text-[15px] font-bold text-slate-900">4. Orders & Delivery</h2>
                </div>
                <div className="text-[14px] text-slate-700 leading-[1.8] space-y-4">
                  <p>
                    <strong>Order Confirmation:</strong> Placing an order is an offer to purchase. We may occasionally need to cancel an order due to stock issues, fraud flags, or severe pricing errors. If we cancel an order you've already paid for, you will be fully refunded to your original payment method.
                  </p>
                  <p>
                    <strong>Pricing & Promotions:</strong> All prices are listed in INR. Prices can change without notice, and promotional discounts cannot be stacked together unless explicitly permitted in the offer.
                  </p>
                  <p>
                    <strong>Shipping:</strong> Delivery timelines are estimates. While we aim to be exceptionally fast, external factors like severe weather, remote locations, or courier disruptions can sometimes affect delivery times.
                  </p>
                </div>
              </section>

              {/* 5. Warranty & Repairs */}
              <section id="warranty" className="scroll-mt-32">
                <div className="mb-4">
                  <h2 className="text-[15px] font-bold text-slate-900">5. Warranty & Return Policy</h2>
                </div>
                <div className="text-[14px] text-slate-700 leading-[1.8] space-y-4">
                  <p>
                    <strong>Replacement & Returns:</strong> We offer a 3-day replacement window for refurbished devices that meet our return policy conditions (e.g., hardware faults not caused by user damage). 
                  </p>
                  <p>
                    <strong>Warranty Coverage:</strong> Eligible devices come with a 6-month EcoFone warranty. Spare parts used in our repair services carry a 90-day warranty.
                  </p>
                  <p>
                    <strong>Warranty Exclusions:</strong> Our warranty covers technical defects but does not cover physical damage, water/liquid damage, unauthorized third-party repairs, tampering, or normal daily cosmetic wear and tear.
                  </p>
                  <p>
                    <strong>Repairs:</strong> We may use genuine OEM or high-quality compatible parts for repairs depending on availability. If additional unseen issues are found after opening a device, we will always ask for your explicit approval before proceeding with any extra costs.
                  </p>
                </div>
              </section>

              {/* 6. Privacy & Security */}
              <section id="privacy" className="scroll-mt-32">
                <div className="mb-4">
                  <h2 className="text-[15px] font-bold text-slate-900">6. Privacy Policy</h2>
                </div>
                <div className="text-[14px] text-slate-700 leading-[1.8] space-y-4">
                  <p>
                    Your privacy is incredibly important to us. We collect only what we absolutely need to process your orders, verify ownership (like IMEI numbers to prevent fraud), and improve our website experience. This is all governed strictly by our Privacy Policy and applicable Indian data protection laws.
                  </p>
                  <p>
                    We use highly secure third-party payment gateways and never store your full credit card details. While we take strong security measures to protect our platform, no digital system on the internet is entirely foolproof.
                  </p>
                  <p>
                    <strong>E-Waste Initiative:</strong> We responsibly handle electronics to reduce e-waste in India. We encourage you to never throw electronics or batteries in the regular trash. Trade them in or recycle them properly!
                  </p>
                </div>
              </section>

              {/* 7. Franchise & Business */}
              <section id="franchise" className="scroll-mt-32">
                <div className="mb-4">
                  <h2 className="text-[15px] font-bold text-slate-900">7. Franchise Policy</h2>
                </div>
                <div className="text-[14px] text-slate-700 leading-[1.8] space-y-4">
                  <p>
                    Information on our website regarding franchise opportunities (such as expected ROI, payback periods, or setup costs) is purely for preliminary evaluation. 
                  </p>
                  <p>
                    Submitting an inquiry or application does not automatically make you an EcoFone franchisee. A formal relationship is only established once a written Franchise Agreement is officially signed. Please note that any financial projections shown online are estimates based on past performance, not guarantees.
                  </p>
                </div>
              </section>

              {/* 8. Legal & Contact */}
              <section id="legal" className="scroll-mt-32">
                <div className="mb-4">
                  <h2 className="text-[15px] font-bold text-slate-900">8. Legal & Contact</h2>
                </div>
                <div className="text-[14px] text-slate-700 leading-[1.8] space-y-4">
                  <p>
                    <strong>Limitation of Liability:</strong> While we strive for perfection in everything we do, we are not liable for indirect or consequential damages arising simply from using our website. We are also not responsible for delays caused by forces beyond our reasonable control (Force Majeure) like natural disasters, strikes, or network outages.
                  </p>
                  <p>
                    <strong>Governing Law:</strong> These terms are governed by the laws of India. Any legal disputes will be handled exclusively in the competent courts of Lucknow, Uttar Pradesh.
                  </p>
                  <p>
                    <strong>Customer Support:</strong> Email: business@ecofone.co.in | Phone: +91 99199 65499
                  </p>
                  <p>
                    <strong>Grievance Officer:</strong> Legal Dept | Email: business@ecofone.co.in
                  </p>
                </div>
              </section>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
