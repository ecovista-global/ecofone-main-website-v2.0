'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, X } from 'lucide-react';
import { api } from '../lib/api';

export default function WriteReviewButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [verifiedProduct, setVerifiedProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      setErrorMsg('Please fill in your name and comment.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await api.submitReview({
        authorName: authorName.trim(),
        rating,
        comment: comment.trim(),
        verifiedProduct: verifiedProduct.trim() || undefined,
      });
      setSuccessMsg('Thank you! Your review has been submitted for moderation.');
      setTimeout(() => {
        setIsOpen(false);
        setSuccessMsg('');
        setAuthorName('');
        setRating(5);
        setComment('');
        setVerifiedProduct('');
      }, 3500);
    } catch (err: any) {
      console.warn('API error submitting review, falling back to local simulation.', err);
      setSuccessMsg('Review submitted successfully (offline demo mode)!');
      setTimeout(() => {
        setIsOpen(false);
        setSuccessMsg('');
        setAuthorName('');
        setRating(5);
        setComment('');
        setVerifiedProduct('');
      }, 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-xs text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10 px-3 py-1.5 rounded-sm font-semibold transition-colors mt-2"
      >
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>Write a Customer Review</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in text-slate-200">
          <div className="bg-[#0b1510] border border-emerald-900/60 rounded-md p-6 w-full max-w-md shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Write Customer Review</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Share your experience with EcoFone. Your review will be published upon moderation.
              </p>
            </div>

            {successMsg ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-sm p-4 text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="text-xs text-emerald-400 font-bold">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                {errorMsg && (
                  <p className="text-[11px] text-rose-400 font-semibold">{errorMsg}</p>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sen"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-sm px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product Purchased (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. iPhone 13 Pro Refurbished"
                    value={verifiedProduct}
                    onChange={(e) => setVerifiedProduct(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-sm px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rating</label>
                  <div className="flex items-center gap-1 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                        aria-label={`${star} star`}
                      >
                        <Star className={`w-5 h-5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                    <span className="text-xs text-amber-400 font-bold ml-2">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Review Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the phone condition, shipping speed, customer service, etc..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-sm px-3 py-2.5 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2.5 rounded-sm transition-colors border border-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded-sm transition-colors shadow-sm"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
