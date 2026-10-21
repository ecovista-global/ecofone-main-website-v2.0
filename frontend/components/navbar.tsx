'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { api } from '../lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Secret admin logo click easter-egg state
  const [logoClicks, setLogoClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  
  // Premium Admin password modal state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminModalError, setAdminModalError] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hasHero = pathname === '/' || pathname === '/about';
      const threshold = hasHero ? 250 : 0;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const hasHero = pathname === '/' || pathname === '/about';
  const showGlass = isScrolled || !hasHero;

  const handleAdminAuthSubmit = async () => {
    if (!adminPasswordInput) {
      setAdminModalError('Please enter the administrator password.');
      return;
    }

    // 1. Try Master Admin API Login first
    try {
      const result = await api.masterAdminLogin(adminPasswordInput);
      if (result && result.token) {
        setIsAdminModalOpen(false);
        setAdminPasswordInput('');
        setAdminModalError('');

        sessionStorage.setItem('ecofone_token', result.token);
        sessionStorage.setItem('ecofone_phone', '+91 99199 65499');
        sessionStorage.setItem('ecofone_admin_role', 'master');

        router.push('/admin');
        return;
      }
    } catch {
      // Fall through to try Sub-Admin login
    }

    // 2. Try Sub-Admin login via backend
    try {
      const result = await api.subAdminLogin(adminPasswordInput);
      const { token } = result;

      setIsAdminModalOpen(false);
      setAdminPasswordInput('');
      setAdminModalError('');

      sessionStorage.setItem('ecofone_token', token);
      sessionStorage.setItem('ecofone_phone', '+91 99199 65499');
      sessionStorage.setItem('ecofone_admin_role', 'sub-admin');

      router.push('/admin');
    } catch {
      setAdminModalError('Invalid administrator credentials.');
    }
  };

  const handleLogoClick = async (e: React.MouseEvent) => {
    const now = Date.now();
    let currentClicks = logoClicks;
    
    if (now - lastClickTime > 2000) {
      currentClicks = 1;
    } else {
      currentClicks += 1;
    }

    setLogoClicks(currentClicks);
    setLastClickTime(now);

    if (currentClicks >= 3) {
      e.preventDefault();
      setLogoClicks(0);
      setIsAdminModalOpen(true);
      setAdminPasswordInput('');
      setAdminModalError('');
    }
  };

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Franchise', href: '/franchise' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const getLinkClass = (href: string) => {
    const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href);
    return isActive
      ? 'text-slate-950 font-bold border-b-2 border-slate-900 pb-0.5'
      : 'text-slate-700 hover:text-slate-950 font-semibold transition-colors';
  };

  if (pathname === '/admin') return null;

  return (
    <>
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-200">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-18 sm:h-20 flex items-center justify-between relative">
          {/* Logo on Left */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center py-1 group">
            <img src="/logo.jpg" alt="EcoFone Logo" className="h-10 sm:h-11 md:h-12 w-auto object-contain bg-transparent p-0 transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13.5px] lg:text-[14px] ${getLinkClass(link.href)}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Apply Button */}
          <Link
            href="/franchise?scroll=apply"
            className="hidden sm:inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-[13px] font-bold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-[0_4px_14px_rgba(234,88,12,0.25)] whitespace-nowrap"
          >
            <span>Apply for Franchise</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full transition-all focus:outline-none text-slate-800 hover:text-slate-950 hover:bg-slate-100 min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="bg-white border-b border-slate-200 p-6 shadow-xl space-y-4 md:hidden">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-900'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="border-t border-slate-100 pt-3">
              <Link
                href="/franchise?scroll=apply"
                className="w-full text-center bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Apply for Franchise</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </header>
    
    {isAdminModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
        <div className="bg-[#061C0F] border border-emerald-500/25 rounded-3xl p-8 max-w-sm w-full space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform scale-100 transition-all duration-300 relative overflow-hidden animate-scale-in">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-ecoOrange-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="text-center space-y-2 relative z-10">
            <div className="w-12 h-12 bg-emerald-950 border border-emerald-800/40 rounded-2xl flex items-center justify-center mx-auto mb-2 transition-transform duration-300 hover:scale-110">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-display font-extrabold text-white text-lg">Administrator Panel</h3>
            <p className="text-[11px] text-slate-400 leading-normal">
              Enter your administrative security credentials to request a data backup export of current leads.
            </p>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="relative">
              <input
                type={showAdminPassword ? "text" : "password"}
                placeholder="Enter administrator password"
                value={adminPasswordInput}
                onChange={(e) => {
                  setAdminPasswordInput(e.target.value);
                  setAdminModalError('');
                }}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    await handleAdminAuthSubmit();
                  }
                }}
                className="w-full bg-[#0a2d1a] border border-emerald-900 focus:border-emerald-500/50 rounded-2xl pl-4 pr-11 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-all text-center tracking-widest font-black"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowAdminPassword(!showAdminPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400 transition-colors p-1 flex items-center justify-center focus:outline-none"
                title={showAdminPassword ? "Hide password" : "Show password"}
              >
                {showAdminPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {adminModalError && (
              <div className="text-red-400 text-[10px] font-bold text-center animate-pulse">
                ⚠ {adminModalError}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2 relative z-10">
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(false)}
              className="w-1/2 border border-emerald-900/50 hover:bg-white/5 text-slate-300 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdminAuthSubmit}
              className="w-1/2 bg-ecoOrange-600 hover:bg-ecoOrange-500 text-white font-black py-2.5 rounded-xl text-xs transition-all shadow-[0_4px_12px_rgba(234,88,12,0.15)]"
            >
              Authenticate
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
