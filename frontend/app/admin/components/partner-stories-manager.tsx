'use client';

import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Play, 
  Star, 
  Eye, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function PartnerStoriesManager() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Form inputs
  const [name, setName] = useState('');
  const [role, setRole] = useState('Franchise Store Owner');
  const [location, setLocation] = useState('Lucknow Hazratganj Outlet');
  const [image, setImage] = useState('');
  const [videoTitle, setVideoTitle] = useState('Grand Store Launch & Owner Journey');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [tag, setTag] = useState('Store Launch');
  const [badge, setBadge] = useState('EcoFone Partner');
  const [videoEmbedUrl, setVideoEmbedUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const data = await api.getCmsContent();
      if (data && data.partnerStories) {
        setStories(data.partnerStories);
      }
    } catch (err: any) {
      console.warn('Failed to fetch partner stories:', err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const openCreateModal = () => {
    setEditingIndex(null);
    setName('');
    setRole('Franchise Store Owner');
    setLocation('Lucknow Hazratganj Outlet');
    setImage('/gallery_owner_launch.jpg');
    setVideoTitle('Grand Store Launch & Owner Journey');
    setQuote('"EcoFone supported us end-to-end. We achieved steady profitability within our first quarter!"');
    setRating(5);
    setTag('Store Launch');
    setBadge('EcoFone Partner');
    setVideoEmbedUrl('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
    setIsModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    const s = stories[idx];
    setEditingIndex(idx);
    setName(s.name || '');
    setRole(s.role || '');
    setLocation(s.location || '');
    setImage(s.image || '');
    setVideoTitle(s.videoTitle || '');
    setQuote(s.quote || '');
    setRating(s.rating || 5);
    setTag(s.tag || 'Store Launch');
    setBadge(s.badge || 'EcoFone Partner');
    setVideoEmbedUrl(s.videoEmbedUrl || '');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await api.uploadCmsMedia(file);
      if (res && res.success && res.url) {
        setImage(res.url);
        showToast('success', 'Image uploaded successfully!');
      } else {
        throw new Error(res?.error || 'Upload failed');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...stories];
    const newStory = {
      id: editingIndex !== null ? stories[editingIndex].id : `story-${Date.now()}`,
      name,
      role,
      location,
      image,
      videoTitle,
      quote,
      rating: Number(rating),
      tag,
      badge,
      videoEmbedUrl,
    };

    if (editingIndex !== null) {
      updated[editingIndex] = newStory;
    } else {
      updated.push(newStory);
    }

    setSaving(true);
    try {
      const res = await api.updateCmsContent({ partnerStories: updated });
      if (res && res.success) {
        setStories(updated);
        setIsModalOpen(false);
        showToast('success', 'Partner video story saved successfully!');
      } else {
        throw new Error(res?.error || 'Failed to save');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Save error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (idx: number) => {
    if (!confirm('Are you sure you want to delete this partner video story?')) return;
    const updated = stories.filter((_, i) => i !== idx);
    setSaving(true);
    try {
      const res = await api.updateCmsContent({ partnerStories: updated });
      if (res && res.success) {
        setStories(updated);
        showToast('success', 'Partner story deleted successfully.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
        <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-500">Loading Partner Video Stories...</p>
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
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Partner Video Stories</h2>
            <p className="text-xs text-slate-500 font-medium">Manage the "Happy Moments with Our Store Owners & Partners" video cards on the homepage.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partner Story</span>
          </button>
        </div>
      </div>

      {/* Grid of Partner Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story, idx) => (
          <div key={story.id || idx} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between group">
            <div>
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={story.image || '/gallery_owner_launch.jpg'}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Badges */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md shadow-sm">
                    {story.tag || 'Story'}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/90 text-slate-800 px-2 py-0.5 rounded-md shadow-sm backdrop-blur-xs">
                    {story.badge || 'Partner'}
                  </span>
                </div>

                {/* Video Title on Thumbnail */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <p className="text-xs font-bold truncate pr-2">{story.videoTitle || 'Store Owner Story'}</p>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-slate-900 truncate">{story.name}</h4>
                  <div className="flex items-center text-amber-500 text-xs font-black">
                    <Star className="w-3 h-3 fill-amber-500 mr-1" />
                    <span>{story.rating || 5}.0</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 font-semibold line-clamp-1">{story.role} • {story.location}</p>
                <p className="text-xs text-slate-600 line-clamp-3 italic pt-1 border-t border-slate-100">
                  {story.quote}
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(idx)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(idx)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-lg text-slate-900">
                  {editingIndex !== null ? 'Edit Partner Story' : 'Add New Partner Story'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold p-1">✕</button>
            </div>

            <form onSubmit={handleSaveModal} className="flex flex-col flex-grow overflow-y-auto p-6 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Partner Name(s)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Suresh Kumar"
                    className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role Title</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    placeholder="e.g. Franchise Store Owner"
                    className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Outlet Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    placeholder="e.g. Lucknow Hazratganj Outlet"
                    className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Top Tag Badge</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    required
                    placeholder="e.g. Store Launch"
                    className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Video Overlay Caption</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  required
                  placeholder="e.g. Grand Store Launch & Owner Journey"
                  className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quote / Story Interaction Text</label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  required
                  rows={3}
                  placeholder="Enter partner experience or testimony quote..."
                  className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">YouTube Embed URL (for Watch button)</label>
                <input
                  type="url"
                  value={videoEmbedUrl}
                  onChange={(e) => setVideoEmbedUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              {/* Photo Upload from Device */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Store Photo / Thumbnail Upload</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={image || '/gallery_owner_launch.jpg'} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload From Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Or enter path /gallery_owner_launch.jpg"
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
                  {saving ? 'Saving...' : 'Save Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
