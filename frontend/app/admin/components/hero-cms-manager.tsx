'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Upload, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ExternalLink, 
  RotateCcw, 
  Image as ImageIcon,
  FileText,
  DollarSign,
  TrendingUp,
  Shield,
  Layers,
  MapPin,
  Eye
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function HeroCmsManager() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'investment' | 'revenue' | 'differentiators' | 'stats'>('hero');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New map city input
  const [newCity, setNewCity] = useState('');
  const [uploadingBg, setUploadingBg] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingCardImg, setUploadingCardImg] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const data = await api.getCmsContent();
      if (data) {
        setCmsData(data);
      }
    } catch (err) {
      console.error('Failed to fetch CMS content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSave = async () => {
    if (!cmsData) return;
    setSaving(true);
    try {
      const res = await api.updateCmsContent(cmsData);
      if (res && res.success) {
        showToast('success', 'Changes saved successfully! Public website updated.');
      } else {
        throw new Error(res?.error || 'Save failed');
      }
    } catch (err: any) {
      console.error('Save error:', err);
      showToast('error', err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  // Upload hero background image
  const handleBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBg(true);
    try {
      const res = await api.uploadCmsMedia(file);
      if (res && res.success && res.url) {
        setCmsData((prev: any) => ({
          ...prev,
          hero: { ...prev.hero, bgImage: res.url }
        }));
        showToast('success', 'Hero image uploaded successfully!');
      } else {
        throw new Error(res?.error || 'Upload failed');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Image upload failed');
    } finally {
      setUploadingBg(false);
    }
  };

  // Upload brochure PDF
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdf(true);
    try {
      const res = await api.uploadCmsMedia(file);
      if (res && res.success && res.url) {
        setCmsData((prev: any) => ({
          ...prev,
          hero: { ...prev.hero, brochureUrl: res.url }
        }));
        showToast('success', 'Brochure PDF uploaded successfully!');
      } else {
        throw new Error(res?.error || 'Upload failed');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Brochure upload failed');
    } finally {
      setUploadingPdf(false);
    }
  };

  // Upload card image
  const handleCardImageUpload = async (cardId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCardImg(cardId);
    try {
      const res = await api.uploadCmsMedia(file);
      if (res && res.success && res.url) {
        setCmsData((prev: any) => {
          const updatedCards = prev.revenueStreamdesk.serviceCards.map((c: any) =>
            c.id === cardId ? { ...c, imageUrl: res.url } : c
          );
          return {
            ...prev,
            revenueStreamdesk: { ...prev.revenueStreamdesk, serviceCards: updatedCards }
          };
        });
        showToast('success', 'Service card image updated!');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Upload failed');
    } finally {
      setUploadingCardImg(null);
    }
  };

  // Map Cities handlers
  const addCity = () => {
    if (!newCity.trim()) return;
    const current = cmsData.hero?.mapCities || [];
    if (!current.includes(newCity.trim())) {
      setCmsData({
        ...cmsData,
        hero: {
          ...cmsData.hero,
          mapCities: [...current, newCity.trim()]
        }
      });
      setNewCity('');
    }
  };

  const removeCity = (city: string) => {
    setCmsData({
      ...cmsData,
      hero: {
        ...cmsData.hero,
        mapCities: (cmsData.hero?.mapCities || []).filter((c: string) => c !== city)
      }
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
        <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-500">Loading Homepage CMS Content...</p>
      </div>
    );
  }

  const hero = cmsData?.hero || {};
  const investorModel = cmsData?.investorModel || {};
  const revenueStreamdesk = cmsData?.revenueStreamdesk || {};
  const whatMakesDifferent = cmsData?.whatMakesDifferent || {};
  const marketStats = cmsData?.marketStats || {};

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center justify-between text-sm font-semibold transition-all shadow-sm ${
          message.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-2.5">
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>
      )}

      {/* Header Banner Card (Setu-style) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Hero & Homepage CMS</h2>
              <p className="text-xs text-slate-500 font-medium">Manage Hero banner, UP Map cities, 4-step model, unit economics, revenue streams, and market stats.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Live</span>
          </a>
          <button
            onClick={fetchContent}
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
            <span>{saving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Segmented Sub-Tabs Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-wrap gap-1.5">
        {[
          { id: 'hero', label: '1. Hero & Map', icon: Sparkles },
          { id: 'investment', label: '2. Investment & Unit Economics', icon: DollarSign },
          { id: 'revenue', label: '3. Revenue Streams & Guarantees', icon: Layers },
          { id: 'differentiators', label: '4. What Makes Us Different', icon: Shield },
          { id: 'stats', label: '5. Market Growth Stats', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#059669]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: HERO & MAP */}
      {activeSubTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Fields (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Hero Headlines & Copy</span>
              </h3>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Top Pill Badge Text</label>
                <input
                  type="text"
                  value={hero.badge || ''}
                  onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, badge: e.target.value } })}
                  placeholder="e.g. FROM UTTAR PRADESH TO ALL OF INDIA"
                  className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Title Line 1</label>
                  <input
                    type="text"
                    value={hero.titleLine1 || ''}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, titleLine1: e.target.value } })}
                    placeholder="Starting in"
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-orange-600">Highlighted Text (Orange)</label>
                  <input
                    type="text"
                    value={hero.titleHighlight || ''}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, titleHighlight: e.target.value } })}
                    placeholder="Uttar Pradesh."
                    className="w-full bg-orange-50/50 border border-orange-200 text-sm font-bold text-orange-700 px-4 py-2.5 rounded-xl outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Title Line 2</label>
                  <input
                    type="text"
                    value={hero.titleLine2 || ''}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, titleLine2: e.target.value } })}
                    placeholder="Scaling Across India."
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description Sub-Paragraph</label>
                <textarea
                  value={hero.description || ''}
                  onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, description: e.target.value } })}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primary CTA Text</label>
                  <input
                    type="text"
                    value={hero.ctaText || ''}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, ctaText: e.target.value } })}
                    placeholder="Apply for Franchise"
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primary CTA Link</label>
                  <input
                    type="text"
                    value={hero.ctaLink || ''}
                    onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, ctaLink: e.target.value } })}
                    placeholder="/franchise?scroll=apply"
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* UP Map Pin Cities */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>UP Map Active City Pins</span>
              </h3>
              <p className="text-xs text-slate-500">Manage the cities displayed on the interactive Uttar Pradesh store footprint map.</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {(hero.mapCities || []).map((city: string) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    <span>{city}</span>
                    <button
                      type="button"
                      onClick={() => removeCity(city)}
                      className="text-emerald-500 hover:text-emerald-800 font-black text-sm"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 max-w-md">
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCity())}
                  placeholder="Add new city (e.g. Kanpur, Varanasi)..."
                  className="flex-grow bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={addCity}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  Add City
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Storefront Image & Brochure Upload */}
          <div className="space-y-6">
            {/* Storefront Hero Image */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Hero Background Image</span>
              </h3>

              <div className="w-full aspect-[16/9] rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative group">
                <img
                  src={hero.bgImage || '/home_hero.jpg'}
                  alt="Hero Storefront Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-lg">Current Hero Storefront</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Upload New Image From Device</label>
                <div className="flex items-center gap-2">
                  <label className="flex-grow cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>{uploadingBg ? 'Uploading...' : 'Choose Device File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBgUpload}
                      disabled={uploadingBg}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={hero.bgImage || ''}
                  onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, bgImage: e.target.value } })}
                  placeholder="Or enter image URL (/home_hero.jpg)"
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 px-3 py-2 rounded-xl outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Franchise Brochure PDF */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Franchise Brochure PDF</span>
              </h3>
              <p className="text-xs text-slate-500">The file linked to the "Download Brochure" button on the hero section.</p>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <span className="text-xs font-mono text-slate-700 truncate">{hero.brochureUrl || '/brochure.pdf'}</span>
                </div>
                <a
                  href={hero.brochureUrl || '/brochure.pdf'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex-shrink-0 ml-2"
                >
                  View
                </a>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Upload New PDF File</label>
                <label className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>{uploadingPdf ? 'Uploading PDF...' : 'Upload PDF From Device'}</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    disabled={uploadingPdf}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={hero.brochureUrl || ''}
                  onChange={(e) => setCmsData({ ...cmsData, hero: { ...hero, brochureUrl: e.target.value } })}
                  placeholder="Or enter PDF path (/brochure.pdf)"
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 px-3 py-2 rounded-xl outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: INVESTMENT & UNIT ECONOMICS */}
      {activeSubTab === 'investment' && (
        <div className="space-y-6">
          {/* Section Heading & Copy */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Investment Section Headlines</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Headline Prefix</label>
                <input
                  type="text"
                  value={investorModel.headlinePrefix || ''}
                  onChange={(e) => setCmsData({ ...cmsData, investorModel: { ...investorModel, headlinePrefix: e.target.value } })}
                  placeholder="Invest Today. Build "
                  className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-orange-600">Headline Highlight</label>
                <input
                  type="text"
                  value={investorModel.headlineHighlight || ''}
                  onChange={(e) => setCmsData({ ...cmsData, investorModel: { ...investorModel, headlineHighlight: e.target.value } })}
                  placeholder="What's Next."
                  className="w-full bg-orange-50/50 border border-orange-200 text-sm font-bold text-orange-700 px-4 py-2.5 rounded-xl outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Section Subheading</label>
              <textarea
                value={investorModel.subheading || ''}
                onChange={(e) => setCmsData({ ...cmsData, investorModel: { ...investorModel, subheading: e.target.value } })}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white resize-none"
              />
            </div>
          </div>

          {/* 4 Process Steps */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>4-Step Franchise Journey</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(investorModel.steps || []).map((step: any, idx: number) => (
                <div key={step.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">{step.number || `0${idx + 1}`}</span>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                    <input
                      type="text"
                      value={step.title || ''}
                      onChange={(e) => {
                        const newSteps = [...investorModel.steps];
                        newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                        setCmsData({ ...cmsData, investorModel: { ...investorModel, steps: newSteps } });
                      }}
                      className="w-full bg-white border border-slate-200 text-xs font-bold text-slate-900 px-3 py-2 rounded-lg outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                    <textarea
                      value={step.description || ''}
                      onChange={(e) => {
                        const newSteps = [...investorModel.steps];
                        newSteps[idx] = { ...newSteps[idx], description: e.target.value };
                        setCmsData({ ...cmsData, investorModel: { ...investorModel, steps: newSteps } });
                      }}
                      rows={3}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-700 px-3 py-2 rounded-lg outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Unit Economics KPI Cards */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>4 Unit Economics Benchmark Cards</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(investorModel.unitEconomics || []).map((card: any, idx: number) => (
                <div key={card.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Label</label>
                    <input
                      type="text"
                      value={card.label || ''}
                      onChange={(e) => {
                        const newUe = [...investorModel.unitEconomics];
                        newUe[idx] = { ...newUe[idx], label: e.target.value };
                        setCmsData({ ...cmsData, investorModel: { ...investorModel, unitEconomics: newUe } });
                      }}
                      className="w-full bg-white border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-lg outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-emerald-600 uppercase">Primary Value</label>
                    <input
                      type="text"
                      value={card.value || ''}
                      onChange={(e) => {
                        const newUe = [...investorModel.unitEconomics];
                        newUe[idx] = { ...newUe[idx], value: e.target.value };
                        setCmsData({ ...cmsData, investorModel: { ...investorModel, unitEconomics: newUe } });
                      }}
                      className="w-full bg-white border border-emerald-300 text-sm font-black text-slate-900 px-3 py-2 rounded-lg outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Subtext</label>
                    <input
                      type="text"
                      value={card.subtext || ''}
                      onChange={(e) => {
                        const newUe = [...investorModel.unitEconomics];
                        newUe[idx] = { ...newUe[idx], subtext: e.target.value };
                        setCmsData({ ...cmsData, investorModel: { ...investorModel, unitEconomics: newUe } });
                      }}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-500 px-3 py-2 rounded-lg outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: REVENUE STREAMS & GUARANTEES */}
      {activeSubTab === 'revenue' && (
        <div className="space-y-6">
          {/* Top Guarantee Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Warranty Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Guarantee Banner 1: Warranty</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Badge Tag</label>
                  <input
                    type="text"
                    value={revenueStreamdesk.warrantyCard?.tag || ''}
                    onChange={(e) => setCmsData({
                      ...cmsData,
                      revenueStreamdesk: {
                        ...revenueStreamdesk,
                        warrantyCard: { ...revenueStreamdesk.warrantyCard, tag: e.target.value }
                      }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Headline</label>
                  <input
                    type="text"
                    value={revenueStreamdesk.warrantyCard?.title || ''}
                    onChange={(e) => setCmsData({
                      ...cmsData,
                      revenueStreamdesk: {
                        ...revenueStreamdesk,
                        warrantyCard: { ...revenueStreamdesk.warrantyCard, title: e.target.value }
                      }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                  <textarea
                    value={revenueStreamdesk.warrantyCard?.description || ''}
                    onChange={(e) => setCmsData({
                      ...cmsData,
                      revenueStreamdesk: {
                        ...revenueStreamdesk,
                        warrantyCard: { ...revenueStreamdesk.warrantyCard, description: e.target.value }
                      }
                    })}
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-600 px-3 py-2 rounded-xl resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Replacement Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Guarantee Banner 2: Replacement</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Badge Tag</label>
                  <input
                    type="text"
                    value={revenueStreamdesk.replacementCard?.tag || ''}
                    onChange={(e) => setCmsData({
                      ...cmsData,
                      revenueStreamdesk: {
                        ...revenueStreamdesk,
                        replacementCard: { ...revenueStreamdesk.replacementCard, tag: e.target.value }
                      }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Headline</label>
                  <input
                    type="text"
                    value={revenueStreamdesk.replacementCard?.title || ''}
                    onChange={(e) => setCmsData({
                      ...cmsData,
                      revenueStreamdesk: {
                        ...revenueStreamdesk,
                        replacementCard: { ...revenueStreamdesk.replacementCard, title: e.target.value }
                      }
                    })}
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                  <textarea
                    value={revenueStreamdesk.replacementCard?.description || ''}
                    onChange={(e) => setCmsData({
                      ...cmsData,
                      revenueStreamdesk: {
                        ...revenueStreamdesk,
                        replacementCard: { ...revenueStreamdesk.replacementCard, description: e.target.value }
                      }
                    })}
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-600 px-3 py-2 rounded-xl resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3 Revenue Stream Cards with Image Upload */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>3 Core In-Store Revenue Channels</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(revenueStreamdesk.serviceCards || []).map((card: any, idx: number) => (
                <div key={card.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg">{card.number || `0${idx + 1}`}</span>
                      <span className="text-[10px] font-bold uppercase text-slate-400">{card.theme}</span>
                    </div>

                    <div className="w-full aspect-[4/3] rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative group">
                      <img
                        src={card.imageUrl || '/card_buy_phone_new.jpg'}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                      <label className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer p-3 text-center">
                        <Upload className="w-5 h-5 text-white mb-1" />
                        <span className="text-white text-xs font-bold">
                          {uploadingCardImg === card.id ? 'Uploading...' : 'Upload Device Image'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCardImageUpload(card.id, e)}
                          disabled={uploadingCardImg === card.id}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Channel Title</label>
                      <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => {
                          const updated = [...revenueStreamdesk.serviceCards];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setCmsData({ ...cmsData, revenueStreamdesk: { ...revenueStreamdesk, serviceCards: updated } });
                        }}
                        className="w-full bg-white border border-slate-200 text-xs font-bold text-slate-900 px-3 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Tagline</label>
                      <input
                        type="text"
                        value={card.tagline || ''}
                        onChange={(e) => {
                          const updated = [...revenueStreamdesk.serviceCards];
                          updated[idx] = { ...updated[idx], tagline: e.target.value };
                          setCmsData({ ...cmsData, revenueStreamdesk: { ...revenueStreamdesk, serviceCards: updated } });
                        }}
                        className="w-full bg-white border border-slate-200 text-xs text-slate-700 px-3 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                      <textarea
                        value={card.description || ''}
                        onChange={(e) => {
                          const updated = [...revenueStreamdesk.serviceCards];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setCmsData({ ...cmsData, revenueStreamdesk: { ...revenueStreamdesk, serviceCards: updated } });
                        }}
                        rows={3}
                        className="w-full bg-white border border-slate-200 text-xs text-slate-600 px-3 py-2 rounded-lg resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Action Link</label>
                    <input
                      type="text"
                      value={card.linkUrl || ''}
                      onChange={(e) => {
                        const updated = [...revenueStreamdesk.serviceCards];
                        updated[idx] = { ...updated[idx], linkUrl: e.target.value };
                        setCmsData({ ...cmsData, revenueStreamdesk: { ...revenueStreamdesk, serviceCards: updated } });
                      }}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-700 px-3 py-2 rounded-lg mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: WHAT MAKES US DIFFERENT */}
      {activeSubTab === 'differentiators' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Section Headlines</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Main Headline</label>
                <input
                  type="text"
                  value={whatMakesDifferent.headline || ''}
                  onChange={(e) => setCmsData({ ...cmsData, whatMakesDifferent: { ...whatMakesDifferent, headline: e.target.value } })}
                  placeholder="What Makes EcoFone Different"
                  className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-4 py-2.5 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subheading</label>
                <input
                  type="text"
                  value={whatMakesDifferent.subheading || ''}
                  onChange={(e) => setCmsData({ ...cmsData, whatMakesDifferent: { ...whatMakesDifferent, subheading: e.target.value } })}
                  placeholder="A resilient business model engineered for retail profitability..."
                  className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-700 px-4 py-2.5 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">6 Key Value Cards</h3>
              <button
                type="button"
                onClick={() => {
                  const newCard = {
                    id: `wmd-${Date.now()}`,
                    title: 'New Value Proposition',
                    desc: 'Description of this advantage...',
                    color: 'emerald'
                  };
                  setCmsData({
                    ...cmsData,
                    whatMakesDifferent: {
                      ...whatMakesDifferent,
                      cards: [...(whatMakesDifferent.cards || []), newCard]
                    }
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(whatMakesDifferent.cards || []).map((card: any, idx: number) => (
                <div key={card.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      card.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {card.color || 'emerald'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = whatMakesDifferent.cards.filter((_: any, i: number) => i !== idx);
                        setCmsData({ ...cmsData, whatMakesDifferent: { ...whatMakesDifferent, cards: updated } });
                      }}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Card Title</label>
                    <input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => {
                        const updated = [...whatMakesDifferent.cards];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setCmsData({ ...cmsData, whatMakesDifferent: { ...whatMakesDifferent, cards: updated } });
                      }}
                      className="w-full bg-white border border-slate-200 text-xs font-bold text-slate-900 px-3 py-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                    <textarea
                      value={card.desc || ''}
                      onChange={(e) => {
                        const updated = [...whatMakesDifferent.cards];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setCmsData({ ...cmsData, whatMakesDifferent: { ...whatMakesDifferent, cards: updated } });
                      }}
                      rows={3}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-600 px-3 py-2 rounded-lg resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: MARKET GROWTH STATS */}
      {activeSubTab === 'stats' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Market Opportunity Headlines</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Headline</label>
                <input
                  type="text"
                  value={marketStats.headline || ''}
                  onChange={(e) => setCmsData({ ...cmsData, marketStats: { ...marketStats, headline: e.target.value } })}
                  placeholder="Why Invest in the Refurbished Smartphone Market?"
                  className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-4 py-2.5 rounded-xl"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subheading</label>
                <textarea
                  value={marketStats.subheading || ''}
                  onChange={(e) => setCmsData({ ...cmsData, marketStats: { ...marketStats, subheading: e.target.value } })}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-700 px-4 py-2.5 rounded-xl resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">3 Key Industry Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(marketStats.stats || []).map((stat: any, idx: number) => (
                <div key={stat.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-emerald-700 uppercase">Growth Figure / Stat</label>
                    <input
                      type="text"
                      value={stat.title || ''}
                      onChange={(e) => {
                        const updated = [...marketStats.stats];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setCmsData({ ...cmsData, marketStats: { ...marketStats, stats: updated } });
                      }}
                      className="w-full bg-white border border-emerald-300 text-lg font-black text-slate-900 px-3 py-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Context Description</label>
                    <textarea
                      value={stat.description || ''}
                      onChange={(e) => {
                        const updated = [...marketStats.stats];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setCmsData({ ...cmsData, marketStats: { ...marketStats, stats: updated } });
                      }}
                      rows={2}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-700 px-3 py-2 rounded-lg resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Source Label</label>
                      <input
                        type="text"
                        value={stat.sourceLabel || ''}
                        onChange={(e) => {
                          const updated = [...marketStats.stats];
                          updated[idx] = { ...updated[idx], sourceLabel: e.target.value };
                          setCmsData({ ...cmsData, marketStats: { ...marketStats, stats: updated } });
                        }}
                        className="w-full bg-white border border-slate-200 text-[11px] text-slate-700 px-2 py-1.5 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Source URL</label>
                      <input
                        type="text"
                        value={stat.sourceUrl || ''}
                        onChange={(e) => {
                          const updated = [...marketStats.stats];
                          updated[idx] = { ...updated[idx], sourceUrl: e.target.value };
                          setCmsData({ ...cmsData, marketStats: { ...marketStats, stats: updated } });
                        }}
                        className="w-full bg-white border border-slate-200 text-[11px] text-slate-700 px-2 py-1.5 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
