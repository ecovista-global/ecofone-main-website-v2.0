'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, Clock, XCircle, Search, Download, ExternalLink, Mail, Phone, MessageSquare, Briefcase, Users, Eye } from 'lucide-react';
import { api } from '../../../lib/api';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  isActive?: boolean;
  createdAt?: string;
}

interface Application {
  id: string;
  jobId?: string;
  jobTitle: string;
  areaOfInterest?: string;
  fullName: string;
  gender?: string;
  email: string;
  phone: string;
  experienceYears: string;
  currentLocation: string;
  currentSalary?: string;
  expectedSalary?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  linkedinPortfolio?: string;
  coverNote: string;
  company?: string;
  brand?: string;
  status: 'PENDING' | 'SHORTLISTED' | 'INTERVIEWED' | 'REJECTED';
  createdAt: string;
}

const DEPARTMENTS = [
  'Franchise & Business Expansion',
  'Franchise & Business Expansion (Freelance)',
  'Inside Sales & Business Development',
  'Retail & Store Ops',
  'IT & Tech Development',
  'Marketing & Social Media',
  'Emerging Talent & Internship',
  'Diagnostics & QA',
  'Customer Support',
  'Operations & Logistics'
];

const JOB_TYPES = [
  'Full Time - On-site',
  'Full Time - Hybrid',
  'Full Time - Remote',
  'Part Time',
  'Freelance / Commission-Based',
  'Internship'
];

export default function CareersManager() {
  const [activeSubTab, setActiveSubTab] = useState<'openings' | 'applications'>('openings');

  // Job Openings State
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosition | null>(null);

  // Job Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDepartment, setFormDepartment] = useState('Diagnostics & QA');
  const [formLocation, setFormLocation] = useState('Lucknow HQ');
  const [formType, setFormType] = useState('Full Time - On-site');
  const [formExperience, setFormExperience] = useState('1 - 3 Years');
  const [formDescription, setFormDescription] = useState('');
  const [formRequirements, setFormRequirements] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [jobSubmitting, setJobSubmitting] = useState(false);

  // Applications State
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // Fetch Jobs
  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const data = await api.getCareerJobs();
      if (Array.isArray(data) && data.length > 0) {
        setJobs(data);
      }
    } catch (err) {
      console.error('Failed to load career jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch Applications
  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const data = await api.getCareerApplications();
      if (Array.isArray(data)) {
        setApplications(data);
      }
    } catch (err) {
      console.error('Failed to load career applications:', err);
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  // Open Job Modal for Create / Edit
  const handleOpenJobModal = (job?: JobPosition) => {
    if (job) {
      setEditingJob(job);
      setFormTitle(job.title);
      setFormDepartment(job.department);
      setFormLocation(job.location);
      setFormType(job.type);
      setFormExperience(job.experience);
      setFormDescription(job.description);
      setFormRequirements(Array.isArray(job.requirements) ? job.requirements.join('\n') : '');
      setFormIsActive(job.isActive !== false);
    } else {
      setEditingJob(null);
      setFormTitle('');
      setFormDepartment('Diagnostics & QA');
      setFormLocation('Lucknow HQ');
      setFormType('Full Time - On-site');
      setFormExperience('2 - 4 Years');
      setFormDescription('');
      setFormRequirements('');
      setFormIsActive(true);
    }
    setShowJobModal(true);
  };

  // Save Job Opening (Create / Update)
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setJobSubmitting(true);
    try {
      const reqArray = formRequirements
        .split('\n')
        .map(r => r.trim())
        .filter(r => r.length > 0);

      const payload = {
        title: formTitle,
        department: formDepartment,
        location: formLocation,
        type: formType,
        experience: formExperience,
        description: formDescription,
        requirements: reqArray,
        isActive: formIsActive
      };

      if (editingJob) {
        await api.updateCareerJob({ ...payload, id: editingJob.id });
      } else {
        await api.createCareerJob(payload);
      }

      await fetchJobs();
      setShowJobModal(false);
    } catch (err) {
      console.error('Failed to save job:', err);
      alert('Failed to save job opening. Please try again.');
    } finally {
      setJobSubmitting(false);
    }
  };

  // Toggle Active/Inactive Job
  const handleToggleJobActive = async (job: JobPosition) => {
    try {
      const updatedActive = !(job.isActive !== false);
      await api.updateCareerJob({ id: job.id, isActive: updatedActive });
      setJobs(prev => prev.map(j => (j.id === job.id ? { ...j, isActive: updatedActive } : j)));
    } catch (err) {
      console.error('Failed to toggle job status:', err);
    }
  };

  // Delete Job Opening
  const handleDeleteJob = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete opening: "${title}"?`)) return;
    try {
      await api.deleteCareerJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Failed to delete job opening.');
    }
  };

  // Update Application Status
  const handleUpdateAppStatus = async (id: string, newStatus: Application['status']) => {
    try {
      await api.updateCareerApplicationStatus(id, newStatus);
      setApplications(prev => prev.map(a => (a.id === id ? { ...a, status: newStatus } : a)));
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(prev => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error('Failed to update application status:', err);
    }
  };

  // Delete Application
  const handleDeleteApplication = async (id: string, applicantName: string) => {
    if (!confirm(`Are you sure you want to remove application from: "${applicantName}"?`)) return;
    try {
      await api.deleteCareerApplication(id);
      setApplications(prev => prev.filter(a => a.id !== id));
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
    } catch (err) {
      console.error('Failed to delete application:', err);
      alert('Failed to delete application.');
    }
  };

  // Export Applications to Excel via server route /api/careers/download
  const handleExportApplications = async () => {
    try {
      const token = typeof window !== 'undefined' ? (sessionStorage.getItem('ecofone_token') || localStorage.getItem('ecofone_token') || '') : '';
      const url = token ? `/api/careers/download?token=${encodeURIComponent(token)}` : '/api/careers/download';
      window.open(url, '_blank');
    } catch (e) {
      const exportData = applications.map(app => ({
        'Application ID': app.id,
        'Candidate Name': app.fullName,
        'Gender': app.gender || 'Not specified',
        'Target Role': app.jobTitle,
        'Area of Interest': app.areaOfInterest || app.jobTitle || 'General',
        'Email Address': app.email,
        'Phone Number': app.phone,
        'Experience (Years)': app.experienceYears,
        'Current Location': app.currentLocation,
        'Current Salary': app.currentSalary || 'N/A',
        'Expected Salary': app.expectedSalary || 'N/A',
        'Resume Drive Link': app.resumeUrl || app.linkedinPortfolio || 'N/A',
        'LinkedIn Profile': app.linkedinUrl || 'N/A',
        'Portfolio URL': app.portfolioUrl || 'N/A',
        'Cover Note / Pitch': app.coverNote,
        'Hiring Status': app.status,
        'Company': app.company || 'Ecovista Global Private Limited',
        'Application Date': new Date(app.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      }));

      const XLSX = await import('xlsx');
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates');
      XLSX.writeFile(workbook, `EcoFone_Ecovista_Applicants_${new Date().toISOString().slice(0, 10)}.xlsx`);
    }
  };

  // Filtered Applications
  const filteredApps = applications.filter(app => {
    const matchesSearch =
      (app.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.phone || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.jobTitle || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesRole = roleFilter === 'ALL' || app.jobTitle === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const pendingAppsCount = applications.filter(a => a.status === 'PENDING').length;
  const activeJobsCount = jobs.filter(j => j.isActive !== false).length;

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Briefcase className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Careers &amp; Hiring CMS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Publish and modify live job openings on the website, review candidate applications, and manage hiring stages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleOpenJobModal()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Opening</span>
          </button>

          <button
            onClick={handleExportApplications}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Responses ({applications.length})</span>
          </button>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('openings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeSubTab === 'openings'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Openings</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
            activeSubTab === 'openings' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {activeJobsCount} Active
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('applications')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeSubTab === 'applications'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Responses</span>
          {pendingAppsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white animate-pulse">
              {pendingAppsCount} New
            </span>
          )}
        </button>
      </div>

      {/* ================= SECTION 1: JOB OPENINGS ================= */}
      {activeSubTab === 'openings' && (
        <div className="space-y-4">
          {loadingJobs ? (
            <div className="p-12 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
              Loading current openings...
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <p className="text-slate-500 text-sm font-medium">No job openings created yet.</p>
              <button
                onClick={() => handleOpenJobModal()}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
              >
                Create First Opening
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map(job => (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl border p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                    job.isActive !== false ? 'border-slate-200 shadow-sm' : 'border-slate-200/60 opacity-60 bg-slate-50/50'
                  }`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {job.department}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {job.type}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        📍 {job.location}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        • Exp: {job.experience}
                      </span>
                      {job.isActive !== false ? (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Active on Site
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                          Draft / Inactive
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900">{job.title}</h3>
                    <p className="text-xs text-slate-500 max-w-3xl line-clamp-2">{job.description}</p>

                    {job.requirements && job.requirements.length > 0 && (
                      <div className="text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-600">Expectations ({job.requirements.length}):</span>{' '}
                        {job.requirements.slice(0, 2).join('; ')}
                        {job.requirements.length > 2 && '...'}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => handleToggleJobActive(job)}
                      title={job.isActive !== false ? 'Deactivate job' : 'Activate job'}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        job.isActive !== false
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {job.isActive !== false ? 'Pause' : 'Activate'}
                    </button>

                    <button
                      onClick={() => handleOpenJobModal(job)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Edit Opening"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteJob(job.id, job.title)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Delete Opening"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= SECTION 2: CANDIDATE RESPONSES ================= */}
      {activeSubTab === 'applications' && (
        <div className="space-y-4">
          {/* FILTER & SEARCH BAR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates by name, email, phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-semibold text-slate-700 outline-none"
              >
                <option value="ALL">All Statuses ({applications.length})</option>
                <option value="PENDING">Pending Review</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="INTERVIEWED">Interviewed</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-semibold text-slate-700 outline-none max-w-[200px]"
              >
                <option value="ALL">All Roles</option>
                {Array.from(new Set(applications.map(a => a.jobTitle))).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CANDIDATES TABLE / LIST */}
          {loadingApps ? (
            <div className="p-12 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
              Loading applications...
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 text-sm font-medium">No candidate responses match your criteria.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Candidate &amp; Gender</th>
                      <th className="py-3.5 px-4">Role / Area of Interest</th>
                      <th className="py-3.5 px-4">Exp &amp; Location</th>
                      <th className="py-3.5 px-4">CTC (Cur / Exp)</th>
                      <th className="py-3.5 px-4">Resume (Drive)</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Applied On</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredApps.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{app.fullName}</span>
                            {app.gender && app.gender !== 'Not specified' && (
                              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                {app.gender}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <a href={`mailto:${app.email}`} className="hover:text-[#ea580c] flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {app.email}
                            </a>
                            <span>•</span>
                            <a href={`tel:${app.phone}`} className="hover:text-[#ea580c] flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {app.phone}
                            </a>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{app.jobTitle}</div>
                          {app.areaOfInterest && app.areaOfInterest !== app.jobTitle && (
                            <div className="text-[11px] text-orange-700 font-semibold">{app.areaOfInterest}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 font-semibold">{app.experienceYears ? `${app.experienceYears} yrs` : 'Fresher'}</div>
                          <div className="text-[11px] text-slate-400">{app.currentLocation || 'Not specified'}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 font-semibold">Cur: {app.currentSalary || 'N/A'}</div>
                          <div className="text-[11px] text-slate-500">Exp: {app.expectedSalary || 'N/A'}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          {app.resumeUrl || app.linkedinPortfolio ? (
                            <a
                              href={(app.resumeUrl || app.linkedinPortfolio || '').startsWith('http') ? (app.resumeUrl || app.linkedinPortfolio) : `https://${app.resumeUrl || app.linkedinPortfolio}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 font-bold text-[11px] border border-orange-200 transition-colors"
                            >
                              <span>Drive CV</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-slate-400 text-[11px]">No link</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={app.status}
                            onChange={e => handleUpdateAppStatus(app.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold outline-none cursor-pointer border ${
                              app.status === 'SHORTLISTED'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : app.status === 'INTERVIEWED'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : app.status === 'REJECTED'
                                ? 'bg-red-50 text-red-600 border-red-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="SHORTLISTED">Shortlisted</option>
                            <option value="INTERVIEWED">Interviewed</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          {new Date(app.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="View Full Application"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteApplication(app.id, app.fullName)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT JOB OPENING ================= */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
              </h3>
              <button
                onClick={() => setShowJobModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Role Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Mobile Diagnostics Specialist"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department *</label>
                  <select
                    value={formDepartment}
                    onChange={e => setFormDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lucknow HQ"
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employment Type *</label>
                  <select
                    value={formType}
                    onChange={e => setFormType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {JOB_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2 - 4 Years"
                    value={formExperience}
                    onChange={e => setFormExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role Summary / Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Overview of the position, day-to-day responsibilities, and team impact..."
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Expectations / Requirements (1 per line)</label>
                <textarea
                  rows={4}
                  placeholder="e.g.&#10;Experience in motherboard-level mobile diagnosis&#10;Familiar with 32-point inspection software&#10;Good team collaboration skills"
                  value={formRequirements}
                  onChange={e => setFormRequirements(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Each line will become a bullet point on the career card.</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="job-active-cb"
                  checked={formIsActive}
                  onChange={e => setFormIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="job-active-cb" className="text-xs font-bold text-slate-700">
                  Visible &amp; Active on Website
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={jobSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm disabled:opacity-50"
                >
                  {jobSubmitting ? 'Saving...' : editingJob ? 'Update Opening' : 'Publish Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CANDIDATE APPLICATION DETAILS ================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Ecovista Global Candidate
                  </span>
                  {selectedApp.gender && selectedApp.gender !== 'Not specified' && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {selectedApp.gender}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-1.5">{selectedApp.fullName}</h3>
                <p className="text-xs text-slate-500">
                  Role: <strong className="text-slate-800">{selectedApp.jobTitle}</strong>
                  {selectedApp.areaOfInterest && selectedApp.areaOfInterest !== selectedApp.jobTitle && (
                    <span className="text-emerald-700 font-bold ml-1.5">• Area: {selectedApp.areaOfInterest}</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                <a href={`mailto:${selectedApp.email}`} className="block font-bold text-slate-800 hover:text-emerald-600 mt-0.5 truncate">
                  {selectedApp.email}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Phone</span>
                <a href={`tel:${selectedApp.phone}`} className="block font-bold text-slate-800 hover:text-emerald-600 mt-0.5 truncate">
                  {selectedApp.phone}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Experience</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedApp.experienceYears ? `${selectedApp.experienceYears} Years` : 'Fresher'}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Location</span>
                <p className="font-bold text-slate-800 mt-0.5 truncate">{selectedApp.currentLocation || 'Not specified'}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Current CTC</span>
                <p className="font-bold text-slate-800 mt-0.5 truncate">{selectedApp.currentSalary || 'N/A'}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Expected CTC</span>
                <p className="font-bold text-emerald-700 mt-0.5 truncate">{selectedApp.expectedSalary || 'N/A'}</p>
              </div>
            </div>

            {/* MANDATORY RESUME / CV DRIVE LINK */}
            {(selectedApp.resumeUrl || selectedApp.linkedinPortfolio) && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider">
                    📄 Resume / CV (Google Drive)
                  </span>
                  <p className="text-slate-600 text-[11px] truncate max-w-sm">
                    {selectedApp.resumeUrl || selectedApp.linkedinPortfolio}
                  </p>
                </div>
                <a
                  href={(selectedApp.resumeUrl || selectedApp.linkedinPortfolio || '').startsWith('http') ? (selectedApp.resumeUrl || selectedApp.linkedinPortfolio) : `https://${selectedApp.resumeUrl || selectedApp.linkedinPortfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shrink-0 transition-all"
                >
                  <span>Open Drive Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* OPTIONAL LINKEDIN & PORTFOLIO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedApp.linkedinUrl && (
                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block mb-0.5">LinkedIn Profile</span>
                  <a
                    href={selectedApp.linkedinUrl.startsWith('http') ? selectedApp.linkedinUrl : `https://${selectedApp.linkedinUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-700 hover:underline flex items-center gap-1.5 truncate"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="truncate">{selectedApp.linkedinUrl}</span>
                  </a>
                </div>
              )}

              {selectedApp.portfolioUrl && (
                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-xs">
                  <span className="text-[10px] font-bold text-purple-800 uppercase block mb-0.5">Portfolio / Website</span>
                  <a
                    href={selectedApp.portfolioUrl.startsWith('http') ? selectedApp.portfolioUrl : `https://${selectedApp.portfolioUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-purple-700 hover:underline flex items-center gap-1.5 truncate"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="truncate">{selectedApp.portfolioUrl}</span>
                  </a>
                </div>
              )}
            </div>

            {selectedApp.coverNote && (
              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1">Candidate Pitch / Strengths:</span>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedApp.coverNote}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="font-bold text-slate-700">Application Stage:</span>
              <select
                value={selectedApp.status}
                onChange={e => handleUpdateAppStatus(selectedApp.id, e.target.value as any)}
                className="px-3 py-1.5 rounded-xl font-bold bg-white border border-slate-200 outline-none"
              >
                <option value="PENDING">Pending Review</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="INTERVIEWED">Interviewed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Candidate</span>
                </a>
                <a
                  href={`mailto:${selectedApp.email}?subject=EcoFone Job Application: ${selectedApp.jobTitle}`}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
