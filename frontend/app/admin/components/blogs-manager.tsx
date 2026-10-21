'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Image as ImageIcon, 
  Upload, 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle, 
  Globe, 
  Lock, 
  Folder, 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link2,
  ChevronDown,
  Sparkles,
  Calendar,
  User,
  Eye,
  RefreshCw
} from 'lucide-react';
import { api } from '../../../lib/api';
import { BlogPost } from '../../../data/blogs';

interface BlogsManagerProps {
  onCountChange?: (count: number) => void;
}

const PRESET_IMAGES = [
  { label: 'OnePlus 16 Hero Studio', url: '/techbyte_oneplus16_hero.jpg' },
  { label: 'iPhone 17 Festival Deals', url: '/techbyte_iphone17_festival.jpg' },
  { label: 'Periscope Camera Lens', url: '/techbyte_camera_lens.jpg' },
  { label: 'Curved Value Flagship', url: '/techbyte_budget_flagship.jpg' },
  { label: 'eSIM Carrier Setup', url: '/techbyte_esim_transfer.jpg' },
  { label: 'AMOLED Smartwatch Deal', url: '/techbyte_smartwatch_deal.jpg' },
  { label: 'Refurbished MacBook Studio', url: '/techbyte_refurbished_macbook.jpg' },
  { label: 'Twin Flagships Duo', url: '/techbyte_flagship_duo.jpg' },
];

const PLACEMENT_OPTIONS = [
  { id: 'Hero Main Featured', label: 'Hero Main Featured', desc: 'Large Flagship 1440px Hero Banner' },
  { id: 'Hero Right Trending', label: 'Hero Right Trending', desc: 'Bento Grid 4 Side Articles' },
  { id: 'Trending Feed', label: 'Main Feed / Trending', desc: 'Horizontal Carousel Stream' },
  { id: 'Popular News', label: 'Popular News', desc: 'Popular Tech & Mobile News Grid' },
  { id: 'Tips & Tricks', label: 'Tips & Tricks', desc: 'How-to & Telecom Guides Grid' },
  { id: 'Tech News', label: 'Tech News', desc: 'Hardware & Specifications Section' },
  { id: 'First Impressions', label: 'First Impressions', desc: 'Sticky Sidebar Hardware Reviews' },
  { id: 'You May Also Read', label: 'You May Also Read', desc: 'Sidebar Editorial Recommendations' },
];

export default function BlogsManager({ onCountChange }: BlogsManagerProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Composer Form Inputs
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [placement, setPlacement] = useState('Trending Feed');
  const [category, setCategory] = useState('Tech News');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');
  const [imageUrl, setImageUrl] = useState('/techbyte_oneplus16_hero.jpg');
  const [authorName, setAuthorName] = useState('EcoFone Editorial Team');
  const [authorRole, setAuthorRole] = useState('Senior Technology Editor');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Composer Dropdowns
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);
  const [isVisibilityPickerOpen, setIsVisibilityPickerOpen] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Portal mounted state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll when any modal is open
  useEffect(() => {
    if (isComposerOpen || Boolean(deleteConfirmId)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isComposerOpen, deleteConfirmId]);

  // Dismiss on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isComposerOpen) setIsComposerOpen(false);
        if (deleteConfirmId) setDeleteConfirmId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComposerOpen, deleteConfirmId]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await api.getBlogs();
      if (data && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
        if (onCountChange) {
          onCountChange(data.blogs.length);
        }
      }
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      showMessage('error', 'Failed to load blogs from registry');
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Open Composer for New Blog
  const handleOpenNewComposer = () => {
    setEditingBlog(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setPlacement('Trending Feed');
    setCategory('Tech News');
    setStatus('PUBLISHED');
    setImageUrl('/techbyte_oneplus16_hero.jpg');
    setAuthorName('EcoFone Editorial Team');
    setAuthorRole('Senior Technology Editor');
    setIsCategoryPickerOpen(false);
    setIsVisibilityPickerOpen(false);
    setIsComposerOpen(true);
  };

  // Open Composer for Edit
  const handleOpenEditComposer = (blog: BlogPost) => {
    setEditingBlog(blog);
    setTitle(blog.title || '');
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setPlacement(blog.placement || 'Trending Feed');
    setCategory(blog.category || 'Tech News');
    setStatus((blog.status || 'PUBLISHED') as 'PUBLISHED' | 'DRAFT');
    setImageUrl(blog.imageUrl || '/techbyte_oneplus16_hero.jpg');
    setAuthorName(blog.author?.name || 'EcoFone Editorial Team');
    setAuthorRole(blog.author?.role || 'Senior Technology Editor');
    setIsCategoryPickerOpen(false);
    setIsVisibilityPickerOpen(false);
    setIsComposerOpen(true);
  };

  // Handle Local Device File Upload
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please select an image file (PNG, JPG, WebP, AVIF).');
      return;
    }

    setIsUploadingImage(true);
    try {
      const result = await api.uploadBlogImage(file);
      if (result && result.success && result.url) {
        setImageUrl(result.url);
        showMessage('success', 'Image attached to article successfully!');
      } else {
        throw new Error(result.error || 'Failed to upload image');
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      showMessage('error', err.message || 'Image upload failed. Try another image.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  // Insert Markdown formatting into content textarea
  const insertFormatting = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = prefix + (selected || 'text') + suffix;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 4));
    }, 0);
  };

  // Submit Blog (Create or Update)
  const handleSubmitBlog = async (overrideStatus?: 'PUBLISHED' | 'DRAFT') => {
    if (!title.trim()) {
      showMessage('error', 'Please enter an article headline.');
      return;
    }

    const targetStatus = overrideStatus || status;
    setIsSubmitting(true);

    const payload = {
      id: editingBlog?.id,
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      placement,
      category,
      status: targetStatus,
      imageUrl,
      author: {
        name: authorName.trim() || 'EcoFone Editorial Team',
        role: authorRole.trim() || 'Technology Editor',
        avatar: '/logo.png',
      },
    };

    try {
      if (editingBlog) {
        const res = await api.updateBlog(editingBlog.id, payload);
        if (res.success) {
          showMessage('success', `✓ Article "${res.blog.title}" updated successfully!`);
          setIsComposerOpen(false);
          await fetchBlogs();
        } else {
          throw new Error(res.error || 'Failed to update article');
        }
      } else {
        const res = await api.createBlog(payload);
        if (res.success) {
          showMessage('success', `✓ New article "${res.blog.title}" published successfully!`);
          setIsComposerOpen(false);
          await fetchBlogs();
        } else {
          throw new Error(res.error || 'Failed to create article');
        }
      }
    } catch (err: any) {
      console.error('Blog submission error:', err);
      showMessage('error', err.message || 'Operation failed. Check server connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick Status Toggle from Table
  const handleQuickStatusChange = async (blog: BlogPost, newStatus: 'PUBLISHED' | 'DRAFT') => {
    try {
      const res = await api.updateBlog(blog.id, { status: newStatus });
      if (res.success) {
        setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, status: newStatus } : b));
        showMessage('success', `Article status changed to ${newStatus}`);
      } else {
        throw new Error(res.error || 'Failed to update status');
      }
    } catch (err: any) {
      showMessage('error', err.message || 'Failed to update status');
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string) => {
    try {
      const res = await api.deleteBlog(id);
      if (res.success) {
        setBlogs(prev => prev.filter(b => b.id !== id && b.slug !== id));
        setDeleteConfirmId(null);
        showMessage('success', '✓ Article permanently deleted from registry.');
        if (onCountChange) {
          onCountChange(blogs.length - 1);
        }
      } else {
        throw new Error(res.error || 'Failed to delete article');
      }
    } catch (err: any) {
      showMessage('error', err.message || 'Failed to delete article');
    }
  };

  // KPIs
  const totalArticles = blogs.length;
  const publishedArticles = blogs.filter(b => (b.status || 'PUBLISHED') === 'PUBLISHED').length;
  const draftArticles = blogs.filter(b => b.status === 'DRAFT').length;
  const heroCount = blogs.filter(b => b.placement === 'Hero Main Featured' || b.category === 'Hero Main Featured').length;
  const activeCategoriesCount = new Set(blogs.map(b => b.category)).size;

  // Filtered List
  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = !searchQuery || (
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.author?.name && b.author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.slug && b.slug.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const matchesCategory = categoryFilter === 'ALL' || (
      (b.category && b.category.toLowerCase() === categoryFilter.toLowerCase()) ||
      (b.placement && b.placement.toLowerCase() === categoryFilter.toLowerCase())
    );

    const bStatus = (b.status || 'PUBLISHED').toUpperCase();
    const matchesStatus = statusFilter === 'ALL' || bStatus === statusFilter.toUpperCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate approximate words and reading time for writing canvas
  const wordCount = (content || '').trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 180));

  let lastGroupDate = '';

  return (
    <div className="space-y-6 text-slate-800">

      {/* Toast Alert */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center justify-between text-sm font-semibold transition-all shadow-sm ${
          message.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-2.5">
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-[#059669]" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header Bar & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <nav className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
            <span>EcoFone Console</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#059669]">TechByte Blog Management</span>
          </nav>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>TechByte Editorial Platform</span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] uppercase tracking-widest">
              Live Dynamic CMS
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition-all shadow-sm"
          >
            <span>View Public /blog</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleOpenNewComposer}
            className="bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Create New Blog</span>
          </button>
        </div>
      </div>

      {/* 4-Card KPI Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Total Articles */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Total Articles</span>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalArticles}</p>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
              Published ({publishedArticles})
            </span>
          </div>
        </div>

        {/* KPI 2: Featured / Hero */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Featured / Hero</span>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#059669]">{heroCount || 1}</p>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
              Hero Slot
            </span>
          </div>
        </div>

        {/* KPI 3: Drafts / Scheduled */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Drafts / Scheduled</span>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">{draftArticles}</p>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Pending
            </span>
          </div>
        </div>

        {/* KPI 4: Categories Active */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Categories Active</span>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{activeCategoriesCount} Sections</p>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              TechByte
            </span>
          </div>
        </div>
      </div>

      {/* Main Blog Registry Table Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        
        {/* Table Top Filter Bar */}
        <div className="pb-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
              TechByte Article Registry
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
              {filteredBlogs.length} Total
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white w-52 sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent text-[#059669] font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-white text-slate-800">All Articles</option>
                <option value="Hero Main Featured" className="bg-white text-[#059669]">Hero Featured</option>
                <option value="Trending" className="bg-white text-slate-800">Trending</option>
                <option value="Popular News" className="bg-white text-slate-800">Popular News</option>
                <option value="Tips & Tricks" className="bg-white text-slate-800">Tips & Tricks</option>
                <option value="Tech News" className="bg-white text-slate-800">Tech News</option>
                <option value="First Impressions" className="bg-white text-slate-800">First Impressions</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-[#059669] font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-white text-slate-800">All Statuses</option>
                <option value="PUBLISHED" className="bg-white text-[#059669]">Published</option>
                <option value="DRAFT" className="bg-white text-amber-600">Draft</option>
              </select>
            </div>

            <button
              onClick={fetchBlogs}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
              title="Refresh Registry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-400 text-xs font-semibold animate-pulse">
            Loading articles registry from storage...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No articles match your search or filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto text-[11px] sm:text-xs">
            <table className="w-full text-left text-slate-700 min-w-[780px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider bg-slate-50/50">
                  <th className="py-3 px-3">Article / Details</th>
                  <th className="py-3 px-3">Category / Placement</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Change Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBlogs.map((blog) => {
                  const blogDate = blog.date || (blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent');
                  const showDateHeader = blogDate !== lastGroupDate;
                  lastGroupDate = blogDate;

                  const isPublished = (blog.status || 'PUBLISHED').toUpperCase() === 'PUBLISHED';

                  return (
                    <React.Fragment key={blog.id}>
                      {showDateHeader && (
                        <tr className="bg-slate-50/80">
                          <td colSpan={5} className="py-2 px-3 font-extrabold text-[10px] text-[#059669] uppercase tracking-widest border-y border-slate-200">
                            📅 {blogDate}
                          </td>
                        </tr>
                      )}
                      <tr className="hover:bg-slate-50/80 transition-colors group">
                        
                        {/* 1. Article / Details Column */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative shadow-sm">
                              <img
                                src={blog.imageUrl || '/techbyte_oneplus16_hero.jpg'}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                                onError={(e: any) => { e.target.src = '/techbyte_oneplus16_hero.jpg'; }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-[#059669] transition-colors">
                                {blog.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                <span className="text-slate-700 font-semibold">{blog.author?.name || 'EcoFone Admin'}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400 font-mono text-[10px]">/{blog.slug}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500">{blog.readingTime || '4 min read'}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* 2. Category / Placement Column */}
                        <td className="py-3 px-3">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            {blog.placement || blog.category}
                          </span>
                        </td>

                        {/* 3. Status Column */}
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            isPublished
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {isPublished ? '● PUBLISHED' : '○ DRAFT'}
                          </span>
                        </td>

                        {/* 4. Quick Change Status Dropdown */}
                        <td className="py-3 px-3 text-center">
                          <select
                            value={isPublished ? 'PUBLISHED' : 'DRAFT'}
                            onChange={(e) => handleQuickStatusChange(blog, e.target.value as any)}
                            className="bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-700 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
                          >
                            <option value="PUBLISHED" className="bg-white text-emerald-700 font-bold">PUBLISHED ▾</option>
                            <option value="DRAFT" className="bg-white text-amber-700 font-bold">DRAFT ▾</option>
                          </select>
                        </td>

                        {/* 5. Actions Column */}
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Edit Button */}
                            <button
                              onClick={() => handleOpenEditComposer(blog)}
                              className="p-2 rounded-lg bg-slate-50 hover:bg-[#ecfdf5] hover:text-[#059669] text-slate-600 transition-colors border border-slate-200"
                              title="Edit Article in Composer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* View Live */}
                            <Link
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors border border-slate-200"
                              title="Preview Article on Public Blog"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            {/* Delete Button */}
                            <button
                              onClick={() => setDeleteConfirmId(blog.id)}
                              className="p-2 rounded-lg bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors border border-slate-200"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* PART 2: LINKEDIN-STYLE BLOG COMPOSER MODAL (CREATE & EDIT) */}
      {/* ========================================================================= */}
      {mounted && isComposerOpen && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsComposerOpen(false);
          }}
          className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          
          <div 
            onClick={(e) => e.stopPropagation()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`max-w-2xl w-full rounded-2xl shadow-2xl border bg-[#131b2e] text-white flex flex-col max-h-[92vh] overflow-hidden transition-all duration-150 my-auto ${
              isDraggingOver ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-[#1e293b]'
            }`}
          >

            {/* Hidden native file picker for device image selection */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp, image/avif, image/jpg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />

            {/* 1. Modal Header (LinkedIn Style) */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-start justify-between gap-3 bg-[#0f1627]">
              
              {/* Left Profile Stack */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold overflow-hidden shrink-0 shadow-inner">
                  <img src="/logo.png" alt="EcoFone" className="w-8 h-8 object-contain" onError={(e: any) => { e.target.style.display = 'none'; }} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Author Name"
                      className="text-sm font-bold text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-emerald-500 focus:outline-none px-0.5"
                    />
                    <span className="text-[10px] text-slate-500 font-mono">({authorRole})</span>
                  </div>

                  {/* LinkedIn Interactive Pills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    
                    {/* Pill 1: Placement / Category Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setIsCategoryPickerOpen(!isCategoryPickerOpen); setIsVisibilityPickerOpen(false); }}
                        className="bg-[#1e293b] hover:bg-[#253249] text-xs font-semibold px-3 py-1 rounded-full border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                      >
                        <Folder className="w-3.5 h-3.5 text-emerald-400" />
                        <span>📂 {placement}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      {isCategoryPickerOpen && (
                        <div className="absolute left-0 top-full mt-1.5 w-64 bg-[#111827] border border-slate-700 rounded-xl shadow-2xl py-1 z-50 max-h-60 overflow-y-auto">
                          <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-800">
                            Select Page Placement
                          </div>
                          {PLACEMENT_OPTIONS.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setPlacement(opt.id);
                                if (opt.id === 'Popular News' || opt.id === 'Tips & Tricks' || opt.id === 'Tech News' || opt.id === 'Trending Feed') {
                                  setCategory(opt.id === 'Trending Feed' ? 'Trending' : opt.id);
                                }
                                setIsCategoryPickerOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-800/80 transition-colors ${
                                placement === opt.id ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300'
                              }`}
                            >
                              <span>{opt.label}</span>
                              <span className="text-[10px] text-slate-500">{opt.desc}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Pill 2: Visibility / Status Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setIsVisibilityPickerOpen(!isVisibilityPickerOpen); setIsCategoryPickerOpen(false); }}
                        className="bg-[#1e293b] hover:bg-[#253249] text-xs font-semibold px-3 py-1 rounded-full border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                      >
                        {status === 'PUBLISHED' ? (
                          <>
                            <Globe className="w-3.5 h-3.5 text-emerald-400" />
                            <span>🌐 Public (Published)</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 text-amber-400" />
                            <span>🔒 Save as Draft</span>
                          </>
                        )}
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      {isVisibilityPickerOpen && (
                        <div className="absolute left-0 top-full mt-1.5 w-52 bg-[#111827] border border-slate-700 rounded-xl shadow-2xl py-1 z-50">
                          <button
                            type="button"
                            onClick={() => { setStatus('PUBLISHED'); setIsVisibilityPickerOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-800 transition-colors ${
                              status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300'
                            }`}
                          >
                            <Globe className="w-3.5 h-3.5 text-emerald-400" />
                            <div>
                              <p className="font-semibold">Public (Published)</p>
                              <p className="text-[10px] text-slate-500">Visible on /blog page</p>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => { setStatus('DRAFT'); setIsVisibilityPickerOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-800 transition-colors ${
                              status === 'DRAFT' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'
                            }`}
                          >
                            <Lock className="w-3.5 h-3.5 text-amber-400" />
                            <div>
                              <p className="font-semibold">Save as Draft</p>
                              <p className="text-[10px] text-slate-500">Hidden from public</p>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* 2. Distraction-Free Writing Canvas (Scrollable) */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Headline Input */}
              <div>
                <input
                  type="text"
                  placeholder="Article Headline..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xl sm:text-2xl font-black text-white placeholder-slate-500 bg-transparent border-0 border-b border-slate-800/80 focus:border-emerald-500 focus:ring-0 pb-2 transition-colors leading-tight"
                />
              </div>

              {/* Excerpt Input */}
              <div>
                <textarea
                  rows={2}
                  placeholder="Write a punchy 1-2 sentence excerpt for article cards & social previews..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full text-xs sm:text-sm text-slate-200 placeholder-slate-500 bg-[#0e1524] border border-slate-800 rounded-xl p-3 focus:border-emerald-500 focus:ring-0 resize-none leading-relaxed"
                />
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1 p-1 bg-[#090D16] border border-slate-800 rounded-xl text-slate-400">
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('## ')}
                  className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                  title="Heading 2"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                  title="Heading 3"
                >
                  <Heading3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('1. ')}
                  className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> ')}
                  className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                  title="Quote"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('[', '](https://)')}
                  className="p-1.5 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                  title="Link"
                >
                  <Link2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Content Body */}
              <div>
                <textarea
                  ref={textareaRef}
                  rows={8}
                  placeholder="Share your thoughts / Write full article content (supports Markdown, subheadings, bullet lists, bold text, links)..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[220px] bg-[#0e1524] border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:ring-0 font-sans leading-relaxed resize-y"
                />
              </div>

              {/* 3. In-Modal 16:9 Image Attachment Preview (LinkedIn Style) */}
              {imageUrl && (
                <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-md group">
                  <div className="aspect-[16/9] w-full max-h-56 overflow-hidden bg-slate-950">
                    <img
                      src={imageUrl}
                      alt="Article Attachment Preview"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                      onError={(e: any) => { e.target.src = '/techbyte_oneplus16_hero.jpg'; }}
                    />
                  </div>

                  {/* Image Overlays */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 bg-black/75 hover:bg-black text-white text-[10px] font-bold rounded-lg backdrop-blur-sm border border-white/20 flex items-center gap-1 transition-colors"
                      title="Replace with an image from your device"
                    >
                      <Upload className="w-3 h-3 text-emerald-400" />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="p-1.5 bg-black/75 hover:bg-rose-600 text-white rounded-lg backdrop-blur-sm border border-white/20 transition-colors"
                      title="Remove Attachment"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/75 text-emerald-400 text-[10px] font-mono rounded-md backdrop-blur-sm">
                    {imageUrl}
                  </div>
                </div>
              )}

              {/* Upload Drop Zone if no image attached */}
              {!imageUrl && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-6 text-center cursor-pointer bg-slate-900/40 hover:bg-emerald-950/20 transition-all"
                >
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-200">
                    Click or Drag &amp; Drop an image from your device
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    PNG, JPG, WebP, or AVIF (Recommended 16:9 ratio, max 10MB)
                  </p>
                </div>
              )}

              {/* Preset Image Chooser */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Or pick from verified studio library:</span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                        imageUrl === preset.url
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* 4. Bottom Toolbar & Publish Action Bar */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0f1627] flex items-center justify-between gap-3">
              
              {/* Left Toolbar */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700/80"
                  disabled={isUploadingImage}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{isUploadingImage ? 'Uploading...' : 'Add Image'}</span>
                </button>

                <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5 font-medium">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{wordCount} words · ~{estimatedReadTime} min read</span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="px-3.5 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>

                {status === 'PUBLISHED' && (
                  <button
                    type="button"
                    onClick={() => handleSubmitBlog('DRAFT')}
                    disabled={isSubmitting}
                    className="px-3 py-2 text-xs font-bold bg-[#1e293b] hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-xl transition-colors"
                  >
                    Save as Draft
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleSubmitBlog()}
                  disabled={isSubmitting || isUploadingImage}
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>{editingBlog ? 'Update Article' : (status === 'DRAFT' ? 'Save Draft' : 'Publish Article')}</span>
                </button>
              </div>

            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Dialog */}
      {mounted && deleteConfirmId && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteConfirmId(null);
          }}
          className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#131b2e] border-2 border-slate-700/80 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 my-auto animate-scale-up"
          >
            <div className="flex items-center gap-3 text-rose-400">
              <Trash2 className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Delete TechByte Article?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete this article? This action removes it from the public <code className="text-emerald-400">/blog</code> stream immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteBlog(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-600/20 transition-all"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
