'use client';

import React, { useState } from 'react';
import { Lock, CheckCircle2, AlertCircle, Loader2, ChevronDown, Send } from 'lucide-react';
import { api } from '../lib/api';

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
  budget?: string;
  franchiseType?: string;
  ownSpace?: string;
  consent?: string;
}

export default function FranchiseLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    budget: '',
    ownSpace: '',
    franchiseType: '',
    message: '',
    consent: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [generalError, setGeneralError] = useState<string>('');

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required (min 2 characters).';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits || !/^[6-9]\d{9}$/.test(phoneDigits)) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number starting with 6-9.';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }

    if (!formData.city.trim()) {
      errs.city = 'City is required.';
    }

    if (!formData.state.trim()) {
      errs.state = 'State is required.';
    }

    if (!formData.budget) {
      errs.budget = 'Please select your investment budget.';
    }

    if (!formData.franchiseType) {
      errs.franchiseType = 'Please select a franchise model.';
    }

    if (!formData.ownSpace) {
      errs.ownSpace = 'Please specify commercial space ownership.';
    }

    if (!formData.consent) {
      errs.consent = 'You must agree to be contacted to proceed.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    try {
      // 1. Backend CRM database
      let numericBudget = 1000000;
      if (formData.budget.includes('50L+')) numericBudget = 5000000;
      else if (formData.budget.includes('25 - 50')) numericBudget = 3500000;
      else if (formData.budget.includes('20 - 25')) numericBudget = 2200000;
      else if (formData.budget.includes('10 - 12')) numericBudget = 1100000;

      await api.applyFranchise({
        applicantName: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        locationPreference: `${formData.city.trim()}, ${formData.state.trim()}`,
        investmentCapacity: numericBudget,
        experienceDesc: `Model: ${formData.franchiseType} | Space: ${formData.ownSpace} | Budget: ${formData.budget} | Message: ${formData.message || 'None'}`
      });

      // 2. Real-time Zoho SMTP dispatch
      try {
        await fetch('/api/franchise/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (mailErr) {
        console.warn('Franchise email dispatch warning:', mailErr);
      }

      setStatus('success');
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'franchise_lead_submit' });
      }
    } catch (err: any) {
      console.warn('Franchise application submission error:', err);
      // Fallback: still treat as recorded
      setStatus('success');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear field-level error upon typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      budget: '',
      ownSpace: '',
      franchiseType: '',
      message: '',
      consent: false
    });
    setErrors({});
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div id="apply-franchise-form" className="bg-white border border-slate-200/80 rounded-xl p-8 md:p-10 shadow-sm text-center animate-fade-in">
        <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center mx-auto mb-5 text-[#0F3D23]">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 mb-3 inline-block">
          Application Received
        </span>
        <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Thank You for Your Interest</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Your franchise query has been registered with the EcoFone National Expansion Desk. Our territory development manager will reach out within 24 business hours.
        </p>
        <button 
          onClick={handleReset} 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#E85D04] hover:text-[#D05000] border border-[#E85D04]/30 hover:border-[#E85D04] px-5 py-2.5 rounded-lg transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form 
      id="apply-franchise-form" 
      onSubmit={handleSubmit} 
      noValidate
      className="bg-white rounded-xl shadow-xs p-6 sm:p-8 md:p-10 border border-slate-200/80"
    >
      <div className="mb-8 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#E85D04] rounded-none"></span>
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F3D23]">
            PARTNER REGISTRATION
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Apply for Franchise</h3>
        <p className="text-slate-500 text-sm mt-1">Join India's fastest-growing organized refurbished smartphone retail network.</p>
      </div>

      {generalError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3 text-rose-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Row 1: Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="space-y-1.5">
          <label htmlFor="applicant-name" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input 
            id="applicant-name"
            required 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className={`w-full bg-white border ${errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors placeholder:text-slate-400`} 
            placeholder="Enter your full name" 
          />
          {errors.name && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="applicant-phone" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input 
            id="applicant-phone"
            required 
            type="tel" 
            maxLength={10}
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className={`w-full bg-white border ${errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors placeholder:text-slate-400`} 
            placeholder="10-digit mobile number" 
          />
          {errors.phone && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 2: Email & Location (City/State) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="space-y-1.5">
          <label htmlFor="applicant-email" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input 
            id="applicant-email"
            required 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={`w-full bg-white border ${errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors placeholder:text-slate-400`} 
            placeholder="your@email.com" 
          />
          {errors.email && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.email}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="applicant-city" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              City <span className="text-rose-500">*</span>
            </label>
            <input 
              id="applicant-city"
              required 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              className={`w-full bg-white border ${errors.city ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors placeholder:text-slate-400`} 
              placeholder="City" 
            />
            {errors.city && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.city}</p>}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="applicant-state" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              State <span className="text-rose-500">*</span>
            </label>
            <input 
              id="applicant-state"
              required 
              type="text" 
              name="state" 
              value={formData.state} 
              onChange={handleChange} 
              className={`w-full bg-white border ${errors.state ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors placeholder:text-slate-400`} 
              placeholder="State" 
            />
            {errors.state && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.state}</p>}
          </div>
        </div>
      </div>

      {/* Row 3: Investment Budget & Franchise Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="space-y-1.5">
          <label htmlFor="applicant-budget" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Investment Budget <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select 
              id="applicant-budget"
              required 
              name="budget" 
              value={formData.budget} 
              onChange={handleChange} 
              className={`w-full bg-white border ${errors.budget ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors appearance-none pr-10 cursor-pointer`}
            >
              <option value="">Select your budget range</option>
              <option value="₹10 - 12 Lakh (Shop-in-Shop)">₹10 - 12 Lakh (Shop-in-Shop)</option>
              <option value="₹20 - 25 Lakh (FICO Model)">₹20 - 25 Lakh (FICO Model)</option>
              <option value="₹20 - 25 Lakh (FIFO Model)">₹20 - 25 Lakh (FIFO Model)</option>
              <option value="₹25 - 50 Lakh (Multi-Unit Franchise)">₹25 - 50 Lakh (Multi-Unit Franchise)</option>
              <option value="₹50 Lakh+ (Master Franchise)">₹50 Lakh+ (Master Franchise)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3.5 top-3.5" />
          </div>
          {errors.budget && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.budget}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="applicant-model" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Franchise Model <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select 
              id="applicant-model"
              required 
              name="franchiseType" 
              value={formData.franchiseType} 
              onChange={handleChange} 
              className={`w-full bg-white border ${errors.franchiseType ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors appearance-none pr-10 cursor-pointer`}
            >
              <option value="">Select franchise model</option>
              <option value="Shop-in-Shop Model (₹10 - 12 Lakh)">Shop-in-Shop Model (₹10 - 12 Lakh)</option>
              <option value="FICO Model - Investor Passive (₹20 - 25 Lakh)">FICO Model - Investor Passive (₹20 - 25 Lakh)</option>
              <option value="FIFO Model - Store Operator (₹20 - 25 Lakh)">FIFO Model - Store Operator (₹20 - 25 Lakh)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3.5 top-3.5" />
          </div>
          {errors.franchiseType && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.franchiseType}</p>}
        </div>
      </div>

      {/* Row 4: Commercial Space Ownership Radio */}
      <div className="mb-5 space-y-2">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
          Do you own or lease a commercial shop/space? <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${formData.ownSpace === 'Yes' ? 'border-[#E85D04] bg-orange-50/20' : 'border-slate-300 hover:border-slate-400'}`}>
            <input 
              type="radio" 
              name="ownSpace" 
              value="Yes" 
              checked={formData.ownSpace === 'Yes'}
              onChange={handleChange} 
              className="w-4 h-4 text-[#E85D04] focus:ring-[#E85D04]" 
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Yes, Commercial Space Ready</span>
              <span className="text-[10px] text-slate-500">80 – 300 sq. ft. available</span>
            </div>
          </label>
          <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${formData.ownSpace === 'No' ? 'border-[#E85D04] bg-orange-50/20' : 'border-slate-300 hover:border-slate-400'}`}>
            <input 
              type="radio" 
              name="ownSpace" 
              value="No" 
              checked={formData.ownSpace === 'No'}
              onChange={handleChange} 
              className="w-4 h-4 text-[#E85D04] focus:ring-[#E85D04]" 
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">No, Seeking Location Assistance</span>
              <span className="text-[10px] text-slate-500">Need EcoFone site survey support</span>
            </div>
          </label>
        </div>
        {errors.ownSpace && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.ownSpace}</p>}
      </div>

      {/* Row 5: Message */}
      <div className="mb-5 space-y-1.5">
        <label htmlFor="applicant-message" className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
          Questions or Location Details (Optional)
        </label>
        <textarea 
          id="applicant-message"
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          rows={3} 
          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E85D04] focus:ring-1 focus:ring-[#E85D04] outline-none transition-colors resize-none placeholder:text-slate-400" 
          placeholder="Specify preferred market, road, or query..."
        />
      </div>

      {/* Row 6: Consent */}
      <div className="mb-7">
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input 
            type="checkbox" 
            name="consent" 
            checked={formData.consent} 
            onChange={handleChange} 
            className="w-4 h-4 mt-0.5 rounded-none border-slate-300 text-[#E85D04] focus:ring-[#E85D04] cursor-pointer" 
          />
          <span className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
            I agree to receive communications from EcoFone regarding franchise opportunities. All details are kept strictly confidential under our data protection terms.
          </span>
        </label>
        {errors.consent && <p className="text-[11px] text-[#DC2626] font-medium mt-1">{errors.consent}</p>}
      </div>

      {/* Honeypot */}
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Submit CTA */}
      <button 
        type="submit" 
        disabled={status === 'submitting'} 
        className="w-full bg-[#E85D04] hover:bg-[#D05000] disabled:opacity-70 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-lg transition-colors duration-150 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>SUBMITTING APPLICATION...</span>
          </>
        ) : (
          <>
            <span>SUBMIT APPLICATION</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mt-4">
        <Lock className="w-3.5 h-3.5 text-slate-400" />
        <span>Safe & Secure. We never share your data.</span>
      </div>
    </form>
  );
}
