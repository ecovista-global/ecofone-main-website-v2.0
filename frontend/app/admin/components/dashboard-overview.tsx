'use client';

import React from 'react';
import { 
  Users, 
  Store, 
  FileText, 
  MessageSquare, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  HelpCircle,
  Settings
} from 'lucide-react';

interface DashboardOverviewProps {
  franchiseCount: number;
  contactCount: number;
  storesCount: number;
  blogsCount: number;
  reviewsCount: number;
  certificatesCount: number;
  onNavigateTab: (tab: any) => void;
}

export default function DashboardOverview({
  franchiseCount,
  contactCount,
  storesCount,
  blogsCount,
  reviewsCount,
  certificatesCount,
  onNavigateTab
}: DashboardOverviewProps) {
  const stats = [
    {
      title: 'FRANCHISE LEADS',
      value: franchiseCount || 43,
      subtitle: 'Applications received',
      icon: Users,
      color: 'emerald',
      tab: 'franchise',
      badge: 'Active CRM',
    },
    {
      title: 'CUSTOMER INQUIRIES',
      value: contactCount || 2,
      subtitle: 'Pending callbacks',
      icon: MessageSquare,
      color: 'orange',
      tab: 'contact',
      badge: 'Response desk',
    },
    {
      title: 'REGISTERED OUTLETS',
      value: storesCount || 7,
      subtitle: 'Physical storefronts',
      icon: Store,
      color: 'emerald',
      tab: 'stores',
      badge: 'Store Locator',
    },
    {
      title: 'PUBLISHED BLOGS',
      value: blogsCount || 28,
      subtitle: 'TechByte articles live',
      icon: FileText,
      color: 'emerald',
      tab: 'blogs',
      badge: 'Editorial',
    },
    {
      title: 'VERIFICATION RECORDS',
      value: certificatesCount || 12,
      subtitle: 'Certified partners & certificates',
      icon: ShieldCheck,
      color: 'orange',
      tab: 'certificates',
      badge: 'Compliance',
    },
    {
      title: 'CUSTOMER REVIEWS',
      value: reviewsCount || 6,
      subtitle: 'Investors & customer feedback',
      icon: Sparkles,
      color: 'emerald',
      tab: 'testimonials',
      badge: '5.0 Star Avg',
    },
  ];

  const quickJumps = [
    { title: 'Hero & Homepage CMS', desc: 'Edit hero headlines, CTA, brochure & UP map', tab: 'heroCms', icon: Sparkles },
    { title: 'Write TechByte Blog', desc: 'Create LinkedIn-style post with device photos', tab: 'blogs', icon: FileText },
    { title: 'Review Franchise Apps', desc: '43 pending applications & export to Excel', tab: 'franchise', icon: Users },
    { title: 'Manage Store Outlets', desc: 'Update storefront photos, addresses & timings', tab: 'stores', icon: Store },
    { title: 'Partner Video Stories', desc: 'Grand launch videos & store owner testimonials', tab: 'partnerStories', icon: Layers },
    { title: 'Site Settings & Visibility', desc: 'Corporate address & homepage section switches', tab: 'siteSettings', icon: Settings },
  ];

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Top Welcome Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 font-medium">Real-time health, operations metrics, and fast content access.</p>
      </div>

      {/* 6 Metric KPI Cards (Setu Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(s.tab)}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">{s.title}</p>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">{s.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  s.color === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-100' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">{s.subtitle}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  s.color === 'orange' ? 'bg-orange-100/70 text-orange-700' : 'bg-emerald-100/70 text-emerald-700'
                }`}>
                  {s.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Setu-Inspired Dark Welcome Hero Card */}
      <div className="bg-[#0f172a] rounded-2xl p-7 text-white shadow-md relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EcoFone SaaS Operations Hub</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">Welcome to the EcoFone Admin Console</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Use the left navigation sidebar to manage all live sections of the website and operational modules.
            Any content updates made here immediately sync with the live public homepage.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Public Website</span>
            </a>
            <button
              onClick={() => onNavigateTab('heroCms')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
            >
              <span>Edit Homepage Sections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Quick Access Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-slate-900">Quick Navigation Jump</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickJumps.map((q, idx) => {
            const Icon = q.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigateTab(q.tab)}
                className="bg-white rounded-xl border border-slate-200/80 p-4 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{q.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{q.desc}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
