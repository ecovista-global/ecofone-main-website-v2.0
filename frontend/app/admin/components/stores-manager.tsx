'use client';

import React, { useState, useEffect } from 'react';
import { 
  Store as StoreIcon, 
  Plus, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  Upload, 
  CheckCircle2, 
  X, 
  RefreshCw 
} from 'lucide-react';
import { api } from '../../../lib/api';

export interface StoreData {
  id: string;
  name: string;
  area?: string;
  city?: string;
  address: string;
  timings?: string;
  phone?: string;
  isOpen?: boolean;
  type?: string;
  imageUrl?: string;
  mapsUrl?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
}

const PRESET_IMAGES = [
  { label: 'Hazratganj Storefront', url: '/store_hazratganj.jpg' },
  { label: 'Alambagh Storefront', url: '/store_alambagh.jpg' },
  { label: 'Gomti Nagar Storefront', url: '/store_gomtinagar.jpg' },
];

export default function StoresManager() {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreData | null>(null);

  // Form inputs
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Lucknow');
  const [address, setAddress] = useState('');
  const [timings, setTimings] = useState('10:00 AM - 09:00 PM');
  const [phone, setPhone] = useState('+91 99199 65499');
  const [isOpen, setIsOpen] = useState(true);
  const [imageUrl, setImageUrl] = useState('/store_hazratganj.jpg');
  const [mapsUrl, setMapsUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    setIsLoading(true);
    try {
      const data = await api.locateStores();
      if (Array.isArray(data)) {
        setStores(data);
      }
    } catch (err: any) {
      console.error('Error fetching stores:', err);
      showMessage('error', 'Failed to load stores from database');
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const openCreateModal = () => {
    setEditingStore(null);
    setName('');
    setArea('');
    setCity('Lucknow');
    setAddress('');
    setTimings('10:00 AM - 09:00 PM');
    setPhone('+91 99199 65499');
    setIsOpen(true);
    setImageUrl('/store_hazratganj.jpg');
    setMapsUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (store: StoreData) => {
    setEditingStore(store);
    setName(store.name || '');
    setArea(store.area || '');
    setCity(store.city || 'Lucknow');
    setAddress(store.address || '');
    setTimings(store.timings || '10:00 AM - 09:00 PM');
    setPhone(store.phone || '+91 99199 65499');
    setIsOpen(store.isOpen !== false);
    setImageUrl(store.imageUrl || '/store_hazratganj.jpg');
    setMapsUrl(store.mapsUrl || '');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/stores/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
        showMessage('success', 'Image uploaded successfully!');
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err: any) {
      showMessage('error', `Image upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      showMessage('error', 'Store Name and Address are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name,
        area,
        city,
        address,
        timings,
        phone,
        isOpen,
        type: 'LIVE',
        imageUrl,
        mapsUrl: mapsUrl.trim() || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      };

      if (editingStore) {
        await api.updateStore(editingStore.id, payload);
        showMessage('success', `Store "${name}" updated successfully.`);
      } else {
        await api.addStore(payload);
        showMessage('success', `Store "${name}" created successfully.`);
      }

      setIsModalOpen(false);
      await fetchStores();
    } catch (err: any) {
      showMessage('error', `Failed to save store: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, storeName: string) => {
    if (!window.confirm(`Are you sure you want to delete store "${storeName}"? This will immediately remove it from the website.`)) {
      return;
    }

    try {
      await api.deleteStore(id);
      showMessage('success', `Store "${storeName}" deleted.`);
      await fetchStores();
    } catch (err: any) {
      showMessage('error', `Failed to delete store: ${err.message}`);
    }
  };

  const handleToggleStatus = async (store: StoreData) => {
    const nextStatus = !(store.isOpen !== false);
    try {
      await api.updateStore(store.id, { isOpen: nextStatus });
      showMessage('success', `Status updated for "${store.name}".`);
      await fetchStores();
    } catch (err: any) {
      showMessage('error', `Failed to toggle status: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
            <StoreIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Stores & Experience Centers</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200/60">
                {stores.length} Outlets
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Manage storefront photos, addresses, contact numbers, timings and Open/Closed status displayed on the homepage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchStores}
            title="Refresh stores"
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Store</span>
          </button>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in ${
          message.type === 'success' 
            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
            : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Stores List Grid */}
      {isLoading ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-semibold">Loading stores...</p>
        </div>
      ) : stores.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
          <StoreIcon className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-50" />
          <h4 className="text-base font-bold text-slate-300 mb-1">No Stores Added Yet</h4>
          <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
            Add your first physical EcoFone retail store or experience center to display on the landing page.
          </p>
          <button
            onClick={openCreateModal}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
          >
            Add Store Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stores.map((store) => (
            <div 
              key={store.id} 
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:border-emerald-300 hover:shadow-md transition-all"
            >
              {/* Storefront Image Preview */}
              <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                <img
                  src={store.imageUrl || '/store_hazratganj.jpg'}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Status Pill Button */}
                <div className="absolute top-3 left-3">
                  <button
                    onClick={() => handleToggleStatus(store)}
                    title="Click to toggle status"
                    className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-full shadow-md backdrop-blur-md cursor-pointer transition-transform hover:scale-105 ${
                      store.isOpen !== false
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-rose-600 text-white hover:bg-rose-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${store.isOpen !== false ? 'bg-white animate-pulse' : 'bg-rose-200'}`} />
                    {store.isOpen !== false ? 'Open Now' : 'Closed'}
                  </button>
                </div>

                {/* Edit & Delete quick buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(store)}
                    title="Edit Store"
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-emerald-600 hover:text-white text-slate-700 flex items-center justify-center backdrop-blur-md transition-all shadow-md"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(store.id, store.name)}
                    title="Delete Store"
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-rose-600 hover:text-white text-slate-700 flex items-center justify-center backdrop-blur-md transition-all shadow-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Store Information */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-base leading-snug">
                      {store.name}
                    </h4>
                    {store.mapsUrl && (
                      <a
                        href={store.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-emerald-600 transition-colors flex-shrink-0 mt-0.5"
                        title="View on Google Maps"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-2.5 mt-3 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed line-clamp-2 text-slate-600">{store.address}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                      <span>{store.timings || '10:00 AM - 09:00 PM'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{store.phone || '+91 99199 65499'}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleStatus(store)}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Switch to: {store.isOpen !== false ? '🔴 Closed' : '🟢 Open Now'}
                  </button>
                  <button
                    onClick={() => openEditModal(store)}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit Details
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* ── CREATE / EDIT STORE MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl p-6 sm:p-7 shadow-2xl relative my-8 animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                <StoreIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingStore ? 'Edit Store Outlet' : 'Add New Store Outlet'}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in store address, timings, contact number, and storefront photo.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Store Name */}
              <div>
                <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">
                  Store Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EcoFone Store - Hazratganj"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              {/* Area & City in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hazratganj"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lucknow"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">
                  Complete Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Shop No. 12, Ground Floor, Hazratganj Market, Lucknow, Uttar Pradesh – 226001"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white resize-none transition-colors"
                />
              </div>

              {/* Phone & Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 99199 65499"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">
                    Store Timings
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 10:00 PM"
                    value={timings}
                    onChange={(e) => setTimings(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Open Now Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-bold text-slate-900 text-xs">Store Status</p>
                  <p className="text-[10px] text-slate-500">Shows green "Open Now" or red "Closed" badge on homepage</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isOpen 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                  {isOpen ? 'Open Now' : 'Closed'}
                </button>
              </div>

              {/* Store Image Field & Upload */}
              <div>
                <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">
                  Storefront Image URL / File Upload
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="/store_hazratganj.jpg or https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>

                {/* Preset image buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-500">Quick Presets:</span>
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                        imageUrl === preset.url
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Google Maps URL */}
              <div>
                <label className="block text-slate-500 font-bold mb-1 uppercase tracking-wider text-[10px]">
                  Google Maps Link / Directions URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://maps.app.goo.gl/... or google maps URL"
                  value={mapsUrl}
                  onChange={(e) => setMapsUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Leave empty to auto-generate directions from the store address.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="px-6 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingStore ? 'Update Store' : 'Create Store'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
