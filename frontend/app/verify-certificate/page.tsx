'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyCertificateInputPage() {
  const [uid, setUid] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUid = uid.trim();
    if (!cleanUid) {
      setError('Please enter a valid Certificate UID');
      return;
    }
    setError('');
    setIsSubmitting(true);
    router.push(`/verify-certificate/${encodeURIComponent(cleanUid)}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-12 px-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-950/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-amber-950/20 blur-3xl pointer-events-none" />

      {/* Main Form Container */}
      <div className="max-w-xl w-full mx-auto my-auto z-10">
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <img
              src="/logo.png"
              alt="EcoFone Logo"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="w-[2px] h-9 bg-slate-700/80" />
            <div className="text-left">
              <span className="text-sm sm:text-base font-extrabold tracking-widest text-emerald-400 uppercase block leading-tight">
                Verification Portal
              </span>
              <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">
                Ecovista Global Official Database
              </span>
            </div>
          </Link>
        </div>

        {/* Card Box */}
        <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="w-14 h-14 bg-emerald-950/50 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-lg shadow-emerald-950/40">
            <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-center text-white tracking-wide uppercase">
            Verify Certificate
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm text-center mt-2 max-w-sm mx-auto">
            Enter the unique Certificate UID to authenticate credentials issued by Ecovista Global / EcoFone.
          </p>

          <form onSubmit={handleVerify} className="mt-8 space-y-4">
            <div>
              <label htmlFor="certificate-uid" className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Certificate Record UID
              </label>
              <div className="relative">
                <input
                  id="certificate-uid"
                  type="text"
                  value={uid}
                  onChange={(e) => {
                    setUid(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. EVG-INT-2026-4745180"
                  className="w-full px-4 py-3.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm sm:text-base font-mono uppercase tracking-wider transition-all"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !uid.trim()}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying Record...
                </>
              ) : (
                <>
                  <span>Verify Record</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Info */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              ← Return Home
            </Link>
            <span className="font-mono text-[10px] text-slate-600">
              Protocol v2.4 • Secured
            </span>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center text-[10px] text-slate-600 mt-8 z-10">
        © {new Date().getFullYear()} Ecovista Global Private Limited. All rights reserved. Secure Verification Protocol.
      </div>
    </div>
  );
}
