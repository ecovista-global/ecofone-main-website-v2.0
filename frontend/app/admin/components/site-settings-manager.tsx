'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ToggleLeft, 
  ToggleRight, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<any>({
    registeredAddress: '',
    contactEmail: '',
    supportEmail: '',
    contactPhone: '',
    whatsappNumber: '',
    googleMapsEmbed: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    sectionVisibility: {
      hero: true,
      topBrands: true,
      investorModel: true,
      revenueStreamdesk: true,
      whatMakesDifferent: true,
      marketOpportunity: true,
      storeLocator: true,
      splitReviews: true,
      partnerStories: true,
      faqs: true,
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await api.getCmsContent();
      if (data && data.siteSettings) {
        setSettings({
          ...data.siteSettings,
          sectionVisibility: {
            hero: true,
            topBrands: true,
            investorModel: true,
            revenueStreamdesk: true,
            whatMakesDifferent: true,
            marketOpportunity: true,
            storeLocator: true,
            splitReviews: true,
            partnerStories: true,
            faqs: true,
            ...(data.siteSettings.sectionVisibility || {})
          }
        });
      }
    } catch (err: any) {
      console.warn('Failed to load site settings:', err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.updateCmsContent({ siteSettings: settings });
      if (res && res.success) {
        showToast('success', 'Site settings & section visibility saved successfully!');
      } else {
        throw new Error(res?.error || 'Save failed');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (key: string) => {
    setSettings((prev: any) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [key]: !prev.sectionVisibility[key]
      }
    }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
        <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-500">Loading Site Settings...</p>
      </div>
    );
  }

  const sectionsList = [
    { key: 'hero', name: 'Hero Banner Section', desc: 'Starting in Uttar Pradesh headline, CTA buttons and storefront background' },
    { key: 'topBrands', name: 'Top Brands Recommerce Strip', desc: 'Apple, Samsung, OnePlus, Google logo ticker strip' },
    { key: 'investorModel', name: 'Investor 4-Step Model & Economics', desc: '01 Capital Investment to 04 You Earn and unit economics cards' },
    { key: 'revenueStreamdesk', name: 'Multiple Revenue Streams Desk', desc: 'Buy, Sell, Repair in-store channels and warranty guarantees' },
    { key: 'whatMakesDifferent', name: 'What Makes EcoFone Different', desc: '6 feature cards (Certified Quality, Corporate Support, etc.)' },
    { key: 'marketOpportunity', name: 'Market Stats & Research Articles', desc: 'Growth figures and Counterpoint/Business Standard news cards' },
    { key: 'storeLocator', name: 'Store Locator (Find a Store)', desc: 'Interactive outlet cards (Hazratganj, Alambagh, Gomti Nagar)' },
    { key: 'splitReviews', name: 'Investor & Customer Testimonials', desc: 'Dual reviews carousel with verified customer ratings' },
    { key: 'partnerStories', name: 'Partner Video Stories Gallery', desc: 'Store owner moments with YouTube play buttons' },
    { key: 'faqs', name: 'Frequently Asked Questions (FAQs)', desc: 'Interactive accordion for common franchise and customer questions' },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center justify-between text-sm font-semibold transition-all shadow-sm ${
          message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-2.5">
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>
      )}

      {/* Header Banner Card (matching Setu Site Settings) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Site Settings & Footer</h2>
            <p className="text-xs text-slate-500 font-medium">Manage corporate footer details, social media URLs, and toggle public homepage section visibility.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={fetchSettings}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Settings...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {/* Card 1: Footer Details (Exact Setu screenshot layout) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-base text-slate-900">Footer Details</h3>
          <p className="text-xs text-slate-500">Corporate office registered address, customer care numbers, and public contact emails.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registered Address</label>
            <textarea
              value={settings.registeredAddress || ''}
              onChange={(e) => setSettings({ ...settings, registeredAddress: e.target.value })}
              rows={3}
              placeholder="e.g. 505, JB Metro Heights, Kanpur Road, Lucknow – 226012"
              className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Business / Franchise Email</label>
              <input
                type="email"
                value={settings.contactEmail || ''}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                placeholder="business@ecofone.co.in"
                className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Customer Support Email</label>
              <input
                type="email"
                value={settings.supportEmail || ''}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                placeholder="future@ecofone.co.in"
                className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contact Phone</label>
              <input
                type="text"
                value={settings.contactPhone || ''}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                placeholder="+91 99199 65499"
                className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">WhatsApp Floating Button Number</label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="+91 99199 65499"
                className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Google Maps Embed URL</label>
            <input
              type="text"
              value={settings.googleMapsEmbed || ''}
              onChange={(e) => setSettings({ ...settings, googleMapsEmbed: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Social Media URLs</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Facebook</label>
                <input
                  type="text"
                  value={settings.facebook || ''}
                  onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 px-3 py-2 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Instagram</label>
                <input
                  type="text"
                  value={settings.instagram || ''}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 px-3 py-2 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">LinkedIn</label>
                <input
                  type="text"
                  value={settings.linkedin || ''}
                  onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 px-3 py-2 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">X (Twitter)</label>
                <input
                  type="text"
                  value={settings.twitter || ''}
                  onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                  placeholder="https://x.com/..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 px-3 py-2 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Section Visibility (Homepage) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Section Visibility (Homepage)</h3>
            <p className="text-xs text-slate-500">Toggle sections on or off on the live public homepage with instant sync.</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            Live Switches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionsList.map((sec) => {
            const isVisible = settings.sectionVisibility?.[sec.key] !== false;
            return (
              <div
                key={sec.key}
                onClick={() => toggleSection(sec.key)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isVisible 
                    ? 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs' 
                    : 'bg-slate-50 border-dashed border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">{sec.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{sec.desc}</p>
                </div>

                <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors flex-shrink-0 ${
                  isVisible ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                }`}>
                  <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
