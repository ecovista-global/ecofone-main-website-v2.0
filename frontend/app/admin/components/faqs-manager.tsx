'use client';

import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  ChevronUp, 
  ChevronDown, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { api } from '../../../lib/api';

export default function FaqsManager() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const data = await api.getCmsContent();
      if (data && data.faqs) {
        setFaqs(data.faqs);
      }
    } catch (err) {
      console.error('Failed to load FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const openCreateModal = () => {
    setEditingIndex(null);
    setQuestion('');
    setAnswer('');
    setIsModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    setEditingIndex(idx);
    setQuestion(faqs[idx].q || '');
    setAnswer(faqs[idx].a || '');
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...faqs];
    const newFaq = {
      id: editingIndex !== null ? faqs[editingIndex].id : `faq-${Date.now()}`,
      q: question,
      a: answer,
    };

    if (editingIndex !== null) {
      updated[editingIndex] = newFaq;
    } else {
      updated.push(newFaq);
    }

    setSaving(true);
    try {
      const res = await api.updateCmsContent({ faqs: updated });
      if (res && res.success) {
        setFaqs(updated);
        setIsModalOpen(false);
        showToast('success', 'FAQ saved successfully!');
      } else {
        throw new Error(res?.error || 'Save failed');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Save error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (idx: number) => {
    if (!confirm('Are you sure you want to delete this FAQ item?')) return;
    const updated = faqs.filter((_, i) => i !== idx);
    setSaving(true);
    try {
      const res = await api.updateCmsContent({ faqs: updated });
      if (res && res.success) {
        setFaqs(updated);
        showToast('success', 'FAQ item removed.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Delete error');
    } finally {
      setSaving(false);
    }
  };

  const moveUp = async (idx: number) => {
    if (idx === 0) return;
    const updated = [...faqs];
    const temp = updated[idx];
    updated[idx] = updated[idx - 1];
    updated[idx - 1] = temp;
    setFaqs(updated);
    try {
      await api.updateCmsContent({ faqs: updated });
    } catch (e) {
      showToast('error', 'Reorder failed');
    }
  };

  const moveDown = async (idx: number) => {
    if (idx === faqs.length - 1) return;
    const updated = [...faqs];
    const temp = updated[idx];
    updated[idx] = updated[idx + 1];
    updated[idx + 1] = temp;
    setFaqs(updated);
    try {
      await api.updateCmsContent({ faqs: updated });
    } catch (e) {
      showToast('error', 'Reorder failed');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
        <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-500">Loading Frequently Asked Questions...</p>
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
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">FAQs Manager</h2>
            <p className="text-xs text-slate-500 font-medium">Manage the question & answer items displayed in the homepage interactive accordion.</p>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] divide-y divide-slate-100">
        {faqs.map((faq, idx) => (
          <div key={faq.id || idx} className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-grow">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  Q{idx + 1}
                </span>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{faq.q}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8 pt-1">
                {faq.a}
              </p>
            </div>

            {/* Actions: Reorder & Edit/Delete */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="flex flex-col mr-1">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === faqs.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => openEditModal(idx)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(idx)}
                className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {faqs.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm font-semibold">
            No FAQs found. Click "Add New FAQ" to create one.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-lg text-slate-900">
                  {editingIndex !== null ? 'Edit FAQ Item' : 'Add New FAQ Item'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold p-1">✕</button>
            </div>

            <form onSubmit={handleSaveModal} className="flex flex-col flex-grow overflow-y-auto p-6 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Question Headline</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  placeholder="e.g. What is the typical setup timeline for an EcoFone outlet?"
                  className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Detailed Answer</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  rows={5}
                  placeholder="Enter the complete response for website visitors..."
                  className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-emerald-500 focus:bg-white resize-none"
                />
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
                  {saving ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
