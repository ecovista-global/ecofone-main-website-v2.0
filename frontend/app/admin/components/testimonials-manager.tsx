'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Upload, 
  Users, 
  Eye, 
  EyeOff,
  RotateCcw
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function TestimonialsManager() {
  const [activeTab, setActiveTab] = useState<'investors' | 'customers'>('investors');
  const [investors, setInvestors] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Form Fields
  const [authorName, setAuthorName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [initials, setInitials] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [status, setStatus] = useState<'Active' | 'Hidden'>('Active');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await api.getCmsContent();
      if (data && data.testimonials) {
        setInvestors(data.testimonials.investors || []);
        setCustomers(data.testimonials.customers || []);
      }
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const openCreateModal = () => {
    setEditingIndex(null);
    setAuthorName('');
    setSubtitle(activeTab === 'investors' ? 'Franchise Partner, Lucknow' : 'Verified Purchase');
    setComment('');
    setRating(5);
    setInitials('');
    setAvatarUrl('');
    setStatus('Active');
    setIsModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    const list = activeTab === 'investors' ? investors : customers;
    const item = list[idx];
    setEditingIndex(idx);
    setAuthorName(item.authorName || '');
    setSubtitle(item.subtitle || '');
    setComment(item.comment || '');
    setRating(item.rating || 5);
    setInitials(item.initials || '');
    setAvatarUrl(item.avatarUrl || '');
    setStatus(item.status || 'Active');
    setIsModalOpen(true);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const res = await api.uploadCmsMedia(file);
      if (res && res.success && res.url) {
        setAvatarUrl(res.url);
        showToast('success', 'Avatar image uploaded!');
      } else {
        throw new Error(res?.error || 'Upload failed');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Avatar upload failed');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    const isInv = activeTab === 'investors';
    const currentList = isInv ? [...investors] : [...customers];
    
    // Auto compute initials if empty
    const computedInitials = initials.trim() || 
      authorName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'EF';

    const newItem = {
      id: editingIndex !== null ? currentList[editingIndex].id : `${isInv ? 'inv' : 'cust'}-${Date.now()}`,
      authorName,
      subtitle,
      comment,
      rating: Number(rating),
      initials: computedInitials,
      avatarUrl,
      status,
    };

    if (editingIndex !== null) {
      currentList[editingIndex] = newItem;
    } else {
      currentList.push(newItem);
    }

    setSaving(true);
    try {
      const payload = {
        testimonials: {
          investors: isInv ? currentList : investors,
          customers: !isInv ? currentList : customers,
        }
      };
      const res = await api.updateCmsContent(payload);
      if (res && res.success) {
        if (isInv) setInvestors(currentList);
        else setCustomers(currentList);
        setIsModalOpen(false);
        showToast('success', `${isInv ? 'Investor' : 'Customer'} review saved successfully!`);
      } else {
        throw new Error(res?.error || 'Save failed');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (idx: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    const isInv = activeTab === 'investors';
    const updatedList = (isInv ? investors : customers).filter((_, i) => i !== idx);

    setSaving(true);
    try {
      const payload = {
        testimonials: {
          investors: isInv ? updatedList : investors,
          customers: !isInv ? updatedList : customers,
        }
      };
      const res = await api.updateCmsContent(payload);
      if (res && res.success) {
        if (isInv) setInvestors(updatedList);
        else setCustomers(updatedList);
        showToast('success', 'Testimonial removed.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Delete error');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (idx: number) => {
    const isInv = activeTab === 'investors';
    const list = isInv ? [...investors] : [...customers];
    const currentStatus = list[idx].status || 'Active';
    list[idx] = { ...list[idx], status: currentStatus === 'Active' ? 'Hidden' : 'Active' };

    try {
      const payload = {
        testimonials: {
          investors: isInv ? list : investors,
          customers: !isInv ? list : customers,
        }
      };
      await api.updateCmsContent(payload);
      if (isInv) setInvestors(list);
      else setCustomers(list);
      showToast('success', `Status set to ${list[idx].status}`);
    } catch (err) {
      showToast('error', 'Status toggle failed');
    }
  };

  const currentItems = activeTab === 'investors' ? investors : customers;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
        <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-500">Loading Testimonials & Reviews...</p>
      </div>
    );
  }

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

      {/* Header Banner Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Testimonials & Reviews CMS</h2>
            <p className="text-xs text-slate-500 font-medium">Manage both "Listen What Our Investors Say" and "Listen What Our Customers Say" carousel strips.</p>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add {activeTab === 'investors' ? 'Investor Testimonial' : 'Customer Review'}</span>
        </button>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex gap-2">
        <button
          onClick={() => setActiveTab('investors')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'investors'
              ? 'bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. Investor Testimonials ({investors.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'customers'
              ? 'bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>2. Customer Reviews ({customers.length})</span>
        </button>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentItems.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`bg-white rounded-2xl border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between transition-all ${
              item.status === 'Hidden' ? 'border-dashed border-slate-300 opacity-60' : 'border-slate-200/80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100/70 border border-emerald-200 flex items-center justify-center font-black text-emerald-800 text-xs">
                    {item.initials || 'EF'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{item.authorName}</h4>
                    <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleStatus(idx)}
                    title={item.status === 'Hidden' ? 'Make Active' : 'Hide from site'}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                      item.status === 'Hidden' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {item.status === 'Hidden' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < (item.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{item.comment}"
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                item.status === 'Hidden' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100/70 text-emerald-800'
              }`}>
                {item.status || 'Active'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(idx)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all"
                >
                  <Edit3 className="w-3 h-3 text-slate-500" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-lg text-slate-900">
                  {editingIndex !== null ? 'Edit Testimonial' : `Add ${activeTab === 'investors' ? 'Investor' : 'Customer'} Review`}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold p-1">✕</button>
            </div>

            <form onSubmit={handleSaveModal} className="flex flex-col flex-grow overflow-y-auto p-6 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Person Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                    placeholder="e.g. Amit Sharma"
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role / City / Badge</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    required
                    placeholder="e.g. Franchise Partner, Lucknow"
                    className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Star Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-emerald-500"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Initials (2 Chars)</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={initials}
                    onChange={(e) => setInitials(e.target.value.toUpperCase())}
                    placeholder="AS"
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Visibility Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-emerald-500"
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Hidden">Hidden (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quote / Review Content</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                  placeholder="Enter detailed testimonial or customer experience..."
                  className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avatar Photo (Optional)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="Or image URL (/avatars/amit.jpg)"
                    className="flex-grow bg-slate-50 border border-slate-200 text-xs text-slate-700 px-3 py-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
