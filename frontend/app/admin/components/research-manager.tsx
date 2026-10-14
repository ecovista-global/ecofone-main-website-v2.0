'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ArrowRight } from 'lucide-react';
import { api } from '../../../lib/api';

interface ResearchArticle {
  id: string;
  publisher: string;
  date: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

export default function ResearchManager() {
  const [articles, setArticles] = useState<ResearchArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [publisher, setPublisher] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await api.getResearchArticles();
      setArticles(data || []);
    } catch (err) {
      console.error('Failed to fetch research articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createResearchArticle({ publisher, date, title, description, url, imageUrl });
      await fetchArticles();
      setShowAddModal(false);
      // reset form
      setPublisher('');
      setDate('');
      setTitle('');
      setDescription('');
      setUrl('');
      setImageUrl('');
    } catch (err) {
      console.error('Failed to add article:', err);
      alert('Failed to add article. Check console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this research article?')) return;
    try {
      await api.deleteResearchArticle(id);
      await fetchArticles();
    } catch (err) {
      console.error('Failed to delete article:', err);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-bold">Loading Research Articles...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Market Research Articles</h2>
          <p className="text-sm text-slate-500 font-medium">Manage the third-party research reports shown in the Market Opportunity section.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0E1524] hover:bg-[#1a2538] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col relative overflow-hidden">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-bold text-slate-900">{article.publisher}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{article.date}</p>
              </div>
              <button onClick={() => handleDelete(article.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="text-sm font-bold text-slate-800 leading-snug mb-2">{article.title}</h3>
            <p className="text-[11px] text-slate-500 line-clamp-3 mb-4 flex-grow">{article.description}</p>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <a href={article.url} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View Link <ArrowRight className="w-3 h-3" />
              </a>
              {article.imageUrl && (
                <div className="w-12 h-12 rounded border border-slate-200 overflow-hidden bg-slate-50">
                  <img src={article.imageUrl} alt="preview" className="w-full h-full object-cover opacity-80" />
                </div>
              )}
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-2xl">
            No research articles found. Click "Add Article" to create one.
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-lg text-slate-800">Add Research Article</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
            </div>
            
            <form onSubmit={handleAdd} className="flex flex-col flex-grow overflow-y-auto p-6 gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Publisher Name</label>
                  <input type="text" value={publisher} onChange={e => setPublisher(e.target.value)} required placeholder="e.g. Counterpoint Research" className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-3 rounded-xl outline-none focus:border-emerald-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</label>
                  <input type="text" value={date} onChange={e => setDate(e.target.value)} required placeholder="e.g. Jul 2026" className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-3 rounded-xl outline-none focus:border-emerald-500 focus:bg-white" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Article Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. India Refurbished Smartphone Volumes Grew 13%" className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-3 rounded-xl outline-none focus:border-emerald-500 focus:bg-white" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required placeholder="Brief summary of the article..." rows={3} className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-3 rounded-xl outline-none focus:border-emerald-500 focus:bg-white resize-none" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Redirect URL (Read More)</label>
                <input type="url" value={url} onChange={e => setUrl(e.target.value)} required placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-3 rounded-xl outline-none focus:border-emerald-500 focus:bg-white" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Right Side Image URL (Optional)</label>
                <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="/counterpoint_1.png or https://..." className="w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 px-4 py-3 rounded-xl outline-none focus:border-emerald-500 focus:bg-white" />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-auto">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
