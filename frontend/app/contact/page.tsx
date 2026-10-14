'use client';

import React, { useState } from 'react';
import { api } from '../../lib/api';
import { submitToGoogleForm } from '../../lib/google-forms';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    locationPreference: 'Lucknow HQ Inquiry',
    investmentCapacity: 1000000,
    experienceDesc: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      // 1. Original response collection pipelines (Franchise/CRM Database & Google Form)
      try {
        await api.applyFranchise(formData);
      } catch (crmErr) {
        console.warn('CRM dispatch warning:', crmErr);
      }

      try {
        await submitToGoogleForm('Contact', formData);
      } catch (gfErr) {
        console.warn('Google Form sync warning:', gfErr);
      }

      // 2. Real-time Zoho SMTP email dispatch to inboxes (business@ecofone.co.in & future@ecofone.co.in)
      try {
        await api.submitContactMessage({
          name: formData.applicantName,
          email: formData.email,
          phone: formData.phone,
          location: formData.locationPreference,
          message: formData.experienceDesc
        });
      } catch (emailErr) {
        console.warn('Contact SMTP email dispatch warning:', emailErr);
      }

      setSubmitSuccess(true);
      if (typeof window !== 'undefined') {
        const bc = new BroadcastChannel('ecofone_crm');
        bc.postMessage('new_query_submitted');
        bc.close();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to dispatch contact query.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pt-6 pb-16 sm:pt-9 relative overflow-hidden">
      {/* Background Soft Mesh Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Dot Matrix on Margins (Matching Reference Design) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block opacity-25 pointer-events-none">
        <svg width="45" height="120" viewBox="0 0 45 120" fill="none">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 3 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 15 + 7} cy={r * 20 + 10} r="2.2" fill="#94a3b8" />
            ))
          )}
        </svg>
      </div>

      <div className="absolute right-6 top-24 hidden xl:block opacity-25 pointer-events-none">
        <svg width="45" height="120" viewBox="0 0 45 120" fill="none">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 3 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 15 + 7} cy={r * 20 + 10} r="2.2" fill="#94a3b8" />
            ))
          )}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact <span className="text-[#ea580c]">EcoFone HQ</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-xl mx-auto mt-2.5 leading-relaxed">
            Have franchise queries or support requests? Drop us a line or visit our head office.
          </p>
        </div>

        {/* ================= 3 FEATURE PILLS ROW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto mb-8">
          {/* 1. Quick Response */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-100 p-4 sm:p-5 flex items-center gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Quick Response</h4>
              <p className="text-[11px] sm:text-xs text-slate-500">We usually reply within 24 hours</p>
            </div>
          </div>

          {/* 2. Dedicated Support */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-100 p-4 sm:p-5 flex items-center gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Dedicated Support</h4>
              <p className="text-[11px] sm:text-xs text-slate-500">Get expert guidance at every step</p>
            </div>
          </div>

          {/* 3. Visit Our Office */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-100 p-4 sm:p-5 flex items-center gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Visit Our Office</h4>
              <p className="text-[11px] sm:text-xs text-slate-500">Meet our team in person</p>
            </div>
          </div>
        </div>

        {/* ================= MAIN 2-COLUMN SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-stretch max-w-7xl mx-auto">
          
          {/* ---------- LEFT COLUMN: FORM CARD ---------- */}
          <div className="bg-white rounded-[26px] border border-slate-100/90 p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-[3px] bg-[#ea580c] rounded-full inline-block" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-800">
                  SEND US A MESSAGE
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                We&apos;re here to help
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Fill in your details and we&apos;ll get back to you shortly.
              </p>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl animate-fade-in p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-emerald-900 text-base">Message Dispatched!</h4>
                <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                  Thank you for contacting EcoFone HQ. Your message has been routed to our executive relations desk. We will call or email you within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormData({
                      applicantName: '',
                      email: '',
                      phone: '',
                      locationPreference: 'Lucknow HQ Inquiry',
                      investmentCapacity: 1000000,
                      experienceDesc: '',
                    });
                    setSubmitSuccess(false);
                  }}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between pt-1">
                <div className="space-y-4">
                  {/* Field 1: Your Name */}
                  <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-[#ea580c]/10 transition-all px-4 py-3">
                    <div className="text-slate-400 mr-3 shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full text-xs text-slate-800 placeholder:text-slate-400 font-medium outline-none bg-transparent"
                    />
                    <span className="text-red-500 font-bold text-xs shrink-0 select-none ml-2">*</span>
                  </div>

                  {/* Field 2: Email Address */}
                  <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-[#ea580c]/10 transition-all px-4 py-3">
                    <div className="text-slate-400 mr-3 shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs text-slate-800 placeholder:text-slate-400 font-medium outline-none bg-transparent"
                    />
                    <span className="text-red-500 font-bold text-xs shrink-0 select-none ml-2">*</span>
                  </div>

                  {/* Field 3: Phone Number */}
                  <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-[#ea580c]/10 transition-all px-4 py-3">
                    <div className="text-slate-400 mr-3 shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      pattern="^[6-9]\d{9}$"
                      title="Please enter a valid 10-digit Indian mobile number"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      className="w-full text-xs text-slate-800 placeholder:text-slate-400 font-medium outline-none bg-transparent"
                    />
                    <span className="text-red-500 font-bold text-xs shrink-0 select-none ml-2">*</span>
                  </div>

                  {/* Field 4: Query / Message */}
                  <div className="relative flex items-start rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 focus-within:border-[#ea580c] focus-within:ring-2 focus-within:ring-[#ea580c]/10 transition-all px-4 py-3">
                    <div className="text-slate-400 mr-3 shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Your Query / Message"
                      value={formData.experienceDesc}
                      onChange={(e) => setFormData({ ...formData, experienceDesc: e.target.value })}
                      className="w-full text-xs text-slate-800 placeholder:text-slate-400 font-medium outline-none bg-transparent resize-none leading-relaxed"
                    />
                    <span className="text-red-500 font-bold text-xs shrink-0 select-none ml-2">*</span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 my-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs py-3.5 rounded-2xl transition-all shadow-[0_4px_16px_rgba(234,88,12,0.25)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ---------- RIGHT COLUMN: HEAD OFFICE CARD & MAP ---------- */}
          <div className="flex flex-col gap-6 h-full">
            
            {/* Card 1: Dark Green Corporate Office Banner */}
            <div className="bg-[#062c21] rounded-[26px] overflow-hidden relative shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-emerald-950 p-7 sm:p-8 shrink-0">
              
              {/* Background HQ Building Image Overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-2/5 sm:w-1/2 pointer-events-none select-none">
                <img
                  src="/ecofone_hq_building.jpg"
                  alt="EcoFone Head Office Building"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#062c21] via-[#062c21]/75 to-transparent" />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 max-w-sm sm:max-w-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-[3px] bg-[#ea580c] rounded-full inline-block" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                    CORPORATE OFFICE
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-5">
                  EcoFone Head Office
                </h3>

                <div className="space-y-3.5 text-xs">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-slate-200 leading-relaxed font-normal">
                      505, JB Metro Heights, 5th Floor,<br />
                      Transport Nagar Metro Station, Kanpur Road,<br />
                      Lucknow – 226012
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a
                      href="tel:+919919965499"
                      className="text-white font-semibold hover:text-emerald-300 transition-colors"
                    >
                      +91 99199 65499
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a
                      href="mailto:business@ecofone.co.in"
                      className="text-white font-semibold hover:text-emerald-300 transition-colors"
                    >
                      business@ecofone.co.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Styled Map */}
            <div className="rounded-[26px] overflow-hidden border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] relative flex-1 min-h-[230px] bg-[#FAF9F6] flex flex-col">
              {/* "Open in Maps" Overlay Button */}
              <a
                href="https://maps.google.com/?q=JB+Metro+Heights+505+5th+floor+transport+Nagar+Lucknow"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-white/95 hover:bg-white text-slate-800 text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200/80 transition-all hover:scale-105"
              >
                <span className="text-[#2563eb]">Open in Maps</span>
                <svg className="w-3.5 h-3.5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <iframe
                src="https://maps.google.com/maps?q=JB%20Metro%20Heights%20505%205th%20floor%20transport%20Nagar%20%2C%20Lucknow%2C%20Uttar%20Pradesh%20226012%20&#038;t=m&#038;z=13&#038;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full flex-1 min-h-[230px] opacity-95"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
