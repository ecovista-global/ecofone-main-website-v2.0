'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { submitToGoogleForm } from '../../lib/google-forms';

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
}

const DEFAULT_JOBS: JobPosition[] = [
  {
    id: 'job-fsm',
    title: 'Franchise Sales Manager (FSM)',
    department: 'Franchise & Business Expansion',
    location: 'Lucknow HQ / Regional Field Visits (Hybrid)',
    type: 'Full Time - Hybrid / Field',
    experience: '2 - 5 Years',
    description: 'Drive regional franchise network expansion for EcoFone by leading high-impact offline investor meetings and virtual Google Meet consultations. Responsible for pitching store unit economics, franchise ROI models, answering investor queries, and closing franchise partner agreements across key cities.',
    requirements: [
      'Proven track record in franchise sales, dealership network expansion, or high-ticket B2B business development.',
      'Expertise in leading face-to-face client meetings, Google Meet video pitch sessions, and contractual negotiations.',
      'Thorough understanding of retail franchise models, CAPEX, OPEX, margins, inventory cycles, and payback periods.',
      'Strong commercial acumen, high persuasive power, and willingness to travel for high-intent site feasibility meetings.'
    ],
    isActive: true
  },
  {
    id: 'job-bda',
    title: 'Business Development Associate (BDA)',
    department: 'Inside Sales & Business Development',
    location: 'Lucknow HQ',
    type: 'Full Time - On-site',
    experience: '1 - 3 Years / Freshers with High Grit',
    description: 'Spearhead high-energy outbound prospecting, cold calling, and lead qualification for EcoFone\'s franchise expansion. Introduce aspiring entrepreneurs to India’s leading re-commerce brand, explain initial investment plans and unit models, qualify investor capability, and schedule targeted meetings for Franchise Sales Managers (FSMs).',
    requirements: [
      'Exceptional verbal fluency in Hindi & English with confident telephone etiquette and rapport-building abilities.',
      'Comfortable handling 100+ outbound calls per day, navigating objections, and qualifying serious business prospects.',
      'Quick learner capable of understanding and explaining EcoFone\'s franchise offerings, commercial plans, and brand USPs.',
      'Diligent with CRM lead logging, scheduled call follow-ups, and meeting coordination with the senior sales team.'
    ],
    isActive: true
  },
  {
    id: 'job-store-promoter',
    title: 'Store Promoter & Front Manager Officer (FMO)',
    department: 'Retail & Store Ops',
    location: 'City-Specific (Lucknow, Kanpur & Store Experience Centers)',
    type: 'Full Time - On-site (Store)',
    experience: '0 - 3 Years',
    description: 'Represent EcoFone as the primary Front Manager Officer (FMO) on the retail store floor across our experience centers. Handle end-to-end customer dealing and front-desk interactions: engage walk-in visitors, showcase certified pre-owned smartphones, explain 32-point diagnostic testing and warranty standards, assist with old device buyback valuations, resolve buyer queries, and drive monthly store sales targets.',
    requirements: [
      'Energetic personality with high customer dealing skills, hospitality mindset, and passion for gadget technology.',
      'Strong verbal communication in Hindi & English with confidence in front-desk customer relationship handling.',
      'Ability to explain certified refurbishment quality, testing standards, and cosmetic grading to build immediate trust with buyers.',
      'Familiarity with POS billing counter operations, warranty issuance, customer feedback, and store inventory monitoring.'
    ],
    isActive: true
  },
  {
    id: 'job-bgp',
    title: 'Business Growth Partner (BGP) - Freelance',
    department: 'Franchise & Business Expansion (Freelance)',
    location: 'Pan-India (Remote / Work from Anywhere)',
    type: 'Freelance / High Commission-Based',
    experience: 'Open to All (Freelancers, Sales Pros, DSAs & Connectors)',
    description: 'Partner with EcoFone as an independent Business Growth Partner (BGP). Work on your own flexible schedule with zero fixed hours or geographic limits. Introduce potential franchise investors, business owners, and retail partners to India\'s fastest-growing re-commerce brand. Earn lucrative, high-ticket sales commissions per successfully signed franchise store agreement.',
    requirements: [
      'Strong personal or professional network of retail investors, entrepreneurs, or business prospects across India.',
      'Entrepreneurial mindset with passion for high-ticket deal making and pure performance-driven commission earnings.',
      'Ability to initiate high-level conversations, pitch EcoFone franchise value proposition, and introduce qualified leads to our core sales team.',
      'Zero office reporting required. Complete flexibility to work remotely as a freelance growth partner alongside your current job or business.'
    ],
    isActive: true
  },
  {
    id: 'job-it-general',
    title: 'IT Specialist & Full Stack Software Engineer',
    department: 'IT & Tech Development',
    location: 'Lucknow HQ / Hybrid',
    type: 'Full Time - Hybrid',
    experience: '1 - 4 Years',
    description: 'Develop and maintain the core digital infrastructure powering EcoFone\'s e-commerce, franchise CRM, and store operations. Build responsive web platforms, internal workflow tools, automated device grading APIs, database pipelines, and support IT systems across headquarters and store branches.',
    requirements: [
      'Hands-on proficiency with Next.js, React, TypeScript, Node.js, and relational databases (PostgreSQL, MySQL, Prisma).',
      'Experience developing and integrating REST APIs, webhooks, auth systems, and cloud deployment pipelines.',
      'Familiarity with POS/inventory system integration, CRM data flows, and secure server management.',
      'Ability to troubleshoot office IT networking, device setups, and automated diagnostic testing suites.'
    ],
    isActive: true
  },
  {
    id: 'job-social-media',
    title: 'Social Media & Content Strategist',
    department: 'Marketing & Social Media',
    location: 'Lucknow HQ (On-site / Studio)',
    type: 'Full Time - Creative',
    experience: '1 - 3 Years',
    description: 'Create engaging, viral social media content that champions EcoFone’s green tech mission and re-commerce brand leadership. Plan, shoot, and edit short-form reels/shorts, smartphone unboxings, refurbishment teardowns, customer testimonials, and trend-jacking campaigns across Instagram, YouTube, and LinkedIn.',
    requirements: [
      'Strong portfolio of short-form video content (Reels/Shorts) with proven audience reach and engagement.',
      'Proficient in video shooting (smartphones/cameras) and mobile/desktop editing (CapCut, Premiere Pro, VN, After Effects).',
      'Keen pulse on trending audio, viral video pacing, copywriting hooks, and visual storytelling for young consumers.',
      'Basic graphic design proficiency (Canva / Figma / Photoshop) for carousels, thumbnails, and stories.'
    ],
    isActive: true
  },
  {
    id: 'job-intern-all',
    title: 'Management & Tech Intern (All Categories)',
    department: 'Emerging Talent & Internship',
    location: 'Lucknow HQ / Hybrid',
    type: 'Internship (3 - 6 Months, Stipend + PPO Opportunity)',
    experience: 'Freshers / College Graduates / Final Year Students',
    description: 'Kickstart your career with high-impact hands-on experience at India’s fastest-growing re-commerce brand. Open across all departments: Business Development & Sales, Social Media & Marketing, IT & Web Development, Mobile Hardware Diagnostics, Store Operations, and Customer Support. Mentorship by department leads with Pre-Placement Offer (PPO) potential for top performers.',
    requirements: [
      'High curiosity, self-driven initiative, adaptability, and eager mindset to learn fast in a startup environment.',
      'Strong communication and organizational skills; ready to take ownership of live daily assignments.',
      'Basic foundational skills in relevant field (MS Excel / Google Sheets, Figma, Coding, or Social Media creation).',
      'Availability for 3 to 6 months full-time/part-time internship. Certificate, recommendation, and stipend provided.'
    ],
    isActive: true
  }
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobPosition[]>(DEFAULT_JOBS);
  const [loading, setLoading] = useState(true);

  // Application Modal State
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobPosition | null>(null);
  const [formFullName, setFormFullName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formGender, setFormGender] = useState('Female');
  const [formExperience, setFormExperience] = useState('1 - 2 Years');
  const [formLocation, setFormLocation] = useState('');
  const [formAreaOfInterest, setFormAreaOfInterest] = useState('IT / Software Development');
  const [formCurrentSalary, setFormCurrentSalary] = useState('');
  const [formExpectedSalary, setFormExpectedSalary] = useState('');
  const [formResumeUrl, setFormResumeUrl] = useState('');
  const [formLinkedinUrl, setFormLinkedinUrl] = useState('');
  const [formPortfolioUrl, setFormPortfolioUrl] = useState('');
  const [formCoverNote, setFormCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedDetails, setSubmittedDetails] = useState<{
    jobTitle: string;
    candidateName: string;
    email: string;
    phone: string;
    hrEmail: string;
  } | null>(null);

  // Modal Resume Upload States
  const [modalResumeMode, setModalResumeMode] = useState<'upload' | 'drive'>('upload');
  const [modalResumeFileName, setModalResumeFileName] = useState('');
  const [modalResumeFileSize, setModalResumeFileSize] = useState('');
  const [modalUploading, setModalUploading] = useState(false);
  const [modalUploadError, setModalUploadError] = useState('');
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Inline General Application Form State
  const [generalRole, setGeneralRole] = useState('General Application / Open Role');
  const [generalAreaOfInterest, setGeneralAreaOfInterest] = useState('Marketing');
  const [generalFullName, setGeneralFullName] = useState('');
  const [generalEmail, setGeneralEmail] = useState('');
  const [generalPhone, setGeneralPhone] = useState('');
  const [generalGender, setGeneralGender] = useState('Female');
  const [generalExperience, setGeneralExperience] = useState('1 - 2 Years');
  const [generalLocation, setGeneralLocation] = useState('');
  const [generalCurrentSalary, setGeneralCurrentSalary] = useState('');
  const [generalExpectedSalary, setGeneralExpectedSalary] = useState('');
  const [generalResumeUrl, setGeneralResumeUrl] = useState('');
  const [generalLinkedinUrl, setGeneralLinkedinUrl] = useState('');
  const [generalPortfolioUrl, setGeneralPortfolioUrl] = useState('');
  const [generalCoverNote, setGeneralCoverNote] = useState('');
  const [generalSubmitting, setGeneralSubmitting] = useState(false);
  const [generalSubmitSuccess, setGeneralSubmitSuccess] = useState(false);
  const [generalSubmitError, setGeneralSubmitError] = useState('');

  // General Form Resume Upload States
  const [generalResumeMode, setGeneralResumeMode] = useState<'upload' | 'drive'>('upload');
  const [generalResumeFileName, setGeneralResumeFileName] = useState('');
  const [generalResumeFileSize, setGeneralResumeFileSize] = useState('');
  const [generalUploading, setGeneralUploading] = useState(false);
  const [generalUploadError, setGeneralUploadError] = useState('');
  const generalFileInputRef = useRef<HTMLInputElement>(null);

  // Helper to upload CV file from device or Google Drive
  const handleUploadResumeFile = async (file: File, isModal: boolean) => {
    if (!file) return;

    const validExtensions = ['.pdf', '.doc', '.docx', '.txt', '.rtf'];
    const fileName = file.name || '';
    const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(ext)) {
      const err = 'Please upload a PDF, DOC, or DOCX document.';
      if (isModal) setModalUploadError(err);
      else setGeneralUploadError(err);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      const err = 'File size exceeds maximum limit of 10MB.';
      if (isModal) setModalUploadError(err);
      else setGeneralUploadError(err);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      if (isModal) {
        setModalUploading(true);
        setModalUploadError('');
      } else {
        setGeneralUploading(true);
        setGeneralUploadError('');
      }

      const res = await fetch('/api/careers/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload resume file.');
      }

      if (isModal) {
        setFormResumeUrl(data.url);
        setModalResumeFileName(data.fileName);
        setModalResumeFileSize(data.fileSize);
        setModalUploading(false);
        setSubmitError('');
      } else {
        setGeneralResumeUrl(data.url);
        setGeneralResumeFileName(data.fileName);
        setGeneralResumeFileSize(data.fileSize);
        setGeneralUploading(false);
        setGeneralSubmitError('');
      }
    } catch (err: any) {
      console.error('Resume upload error:', err);
      if (isModal) {
        setModalUploadError(err.message || 'Upload failed. Please try again or paste Drive link.');
        setModalUploading(false);
      } else {
        setGeneralUploadError(err.message || 'Upload failed. Please try again or paste Drive link.');
        setGeneralUploading(false);
      }
    }
  };

  // Fetch jobs dynamically from CMS API
  useEffect(() => {
    const fetchLiveJobs = async () => {
      try {
        const liveJobs = await api.getCareerJobs();
        if (Array.isArray(liveJobs) && liveJobs.length > 0) {
          setJobs(liveJobs.filter((j: any) => j.isActive !== false));
        }
      } catch (err) {
        console.error('Failed to load career jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveJobs();
  }, []);

  const handleOpenApplyModal = (job: JobPosition) => {
    setSelectedJobForModal(job);
    setFormAreaOfInterest(job.department || 'Diagnostics & QA');
    setSubmitSuccess(false);
    setSubmitError('');
    setSubmittedDetails(null);
    setFormResumeUrl('');
    setModalResumeFileName('');
    setModalResumeFileSize('');
    setModalUploadError('');
    setModalUploading(false);
    setModalResumeMode('upload');
  };

  const handleCloseApplyModal = () => {
    setSelectedJobForModal(null);
    setSubmitSuccess(false);
    setSubmitError('');
    setSubmittedDetails(null);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForModal) return;

    if (!formResumeUrl.trim()) {
      setSubmitError(
        modalResumeMode === 'upload'
          ? 'Please choose and upload your CV / Resume file before submitting.'
          : 'Please provide your Google Drive CV link.'
      );
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const hrEmail = 'future@ecofone.co.in';

      const payload = {
        jobId: selectedJobForModal.id,
        jobTitle: selectedJobForModal.title,
        areaOfInterest: formAreaOfInterest || selectedJobForModal.department || 'General',
        fullName: formFullName.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        gender: formGender,
        experienceYears: formExperience,
        currentLocation: formLocation.trim(),
        currentSalary: formCurrentSalary.trim(),
        expectedSalary: formExpectedSalary.trim(),
        resumeUrl: formResumeUrl.trim(),
        resumeFileName: modalResumeFileName,
        resumeFileSize: modalResumeFileSize,
        linkedinUrl: formLinkedinUrl.trim(),
        portfolioUrl: formPortfolioUrl.trim(),
        coverNote: formCoverNote.trim(),
        company: 'Ecovista Global Private Limited',
        brand: 'EcoFone',
        hrRecipient: hrEmail
      };

      // 1. Dedicated Careers Storage & Zoho SMTP dispatch to future@ecofone.co.in
      await api.submitCareerApplication(payload);

      // 2. Google Form Webhook Sync
      try {
        await submitToGoogleForm('Career', {
          applicantName: `${formFullName} (${selectedJobForModal.title})`,
          email: formEmail,
          phone: formPhone,
          gender: formGender,
          areaOfInterest: formAreaOfInterest,
          currentLocation: formLocation || 'Lucknow HQ',
          experienceYears: formExperience,
          currentSalary: formCurrentSalary,
          expectedSalary: formExpectedSalary,
          resumeUrl: formResumeUrl,
          linkedinUrl: formLinkedinUrl,
          portfolioUrl: formPortfolioUrl,
          coverNote: formCoverNote
        });
      } catch (gfErr) {
        console.warn('Google Form sync warning:', gfErr);
      }

      // Trigger broadcast channel for real-time admin sync
      if (typeof window !== 'undefined') {
        const bc = new BroadcastChannel('ecofone_crm');
        bc.postMessage('new_career_application_submitted');
        bc.close();
      }

      setSubmittedDetails({
        jobTitle: selectedJobForModal.title,
        candidateName: formFullName,
        email: formEmail,
        phone: formPhone,
        hrEmail
      });

      setSubmitSuccess(true);
      // Reset form fields
      setFormFullName('');
      setFormEmail('');
      setFormPhone('');
      setFormGender('Female');
      setFormExperience('1 - 2 Years');
      setFormLocation('');
      setFormCurrentSalary('');
      setFormExpectedSalary('');
      setFormResumeUrl('');
      setModalResumeFileName('');
      setModalResumeFileSize('');
      setFormLinkedinUrl('');
      setFormPortfolioUrl('');
      setFormCoverNote('');
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setSubmitError(err.message || 'Failed to submit application. Please reach us at future@ecofone.co.in');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!generalResumeUrl.trim()) {
      setGeneralSubmitError(
        generalResumeMode === 'upload'
          ? 'Please choose and upload your CV / Resume file before submitting.'
          : 'Please provide your Google Drive CV link.'
      );
      return;
    }

    setGeneralSubmitting(true);
    setGeneralSubmitError('');

    try {
      const hrEmail = 'future@ecofone.co.in';
      const payload = {
        jobId: 'general-app',
        jobTitle: generalRole,
        areaOfInterest: generalAreaOfInterest,
        fullName: generalFullName.trim(),
        email: generalEmail.trim(),
        phone: generalPhone.trim(),
        gender: generalGender,
        experienceYears: generalExperience,
        currentLocation: generalLocation.trim(),
        currentSalary: generalCurrentSalary.trim(),
        expectedSalary: generalExpectedSalary.trim(),
        resumeUrl: generalResumeUrl.trim(),
        resumeFileName: generalResumeFileName,
        resumeFileSize: generalResumeFileSize,
        linkedinUrl: generalLinkedinUrl.trim(),
        portfolioUrl: generalPortfolioUrl.trim(),
        coverNote: generalCoverNote.trim(),
        company: 'Ecovista Global Private Limited',
        brand: 'EcoFone',
        hrRecipient: hrEmail
      };

      // 1. Dedicated Careers Storage & Zoho SMTP dispatch to future@ecofone.co.in
      await api.submitCareerApplication(payload);

      // 2. Google Form Webhook Sync
      try {
        await submitToGoogleForm('Career', {
          applicantName: `${generalFullName} (${generalRole})`,
          email: generalEmail,
          phone: generalPhone,
          gender: generalGender,
          areaOfInterest: generalAreaOfInterest,
          currentLocation: generalLocation || 'Lucknow HQ',
          experienceYears: generalExperience,
          currentSalary: generalCurrentSalary,
          expectedSalary: generalExpectedSalary,
          resumeUrl: generalResumeUrl,
          linkedinUrl: generalLinkedinUrl,
          portfolioUrl: generalPortfolioUrl,
          coverNote: generalCoverNote
        });
      } catch (gfErr) {
        console.warn('Google Form sync warning:', gfErr);
      }

      // Trigger broadcast channel for real-time admin sync
      if (typeof window !== 'undefined') {
        const bc = new BroadcastChannel('ecofone_crm');
        bc.postMessage('new_career_application_submitted');
        bc.close();
      }

      setGeneralSubmitSuccess(true);
      // Reset general form
      setGeneralFullName('');
      setGeneralEmail('');
      setGeneralPhone('');
      setGeneralGender('Female');
      setGeneralExperience('1 - 2 Years');
      setGeneralLocation('');
      setGeneralCurrentSalary('');
      setGeneralExpectedSalary('');
      setGeneralResumeUrl('');
      setGeneralResumeFileName('');
      setGeneralResumeFileSize('');
      setGeneralLinkedinUrl('');
      setGeneralPortfolioUrl('');
      setGeneralCoverNote('');
    } catch (err: any) {
      console.error('Error submitting general application:', err);
      setGeneralSubmitError(err.message || 'Failed to submit application. Please reach us at future@ecofone.co.in');
    } finally {
      setGeneralSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pt-5 pb-20 md:pt-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER: Current Open Roles */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Current <span className="text-[#ea580c]">Open Roles</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium mt-1.5 max-w-3xl">
            Explore exciting career opportunities at EcoFone (Ecovista Global Private Limited). Find the role that matches your skills and ambitions.
          </p>
        </div>

        {/* JOBS LISTING: All openings together */}
        <div className="space-y-6">
          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 text-sm font-medium">No open positions listed right now.</p>
            </div>
          ) : (
            jobs.map((job) => {
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 transition-all relative border border-slate-200/90 shadow-sm hover:shadow-md hover:border-orange-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Left Column: Details */}
                    <div className="space-y-3.5 flex-1">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                          {job.department}
                        </span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                          {job.type}
                        </span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>{job.location}</span>
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          • Exp: {job.experience}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {job.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl font-normal">
                        {job.description}
                      </p>

                      {/* Key Expectations */}
                      {job.requirements && job.requirements.length > 0 && (
                        <div className="pt-2">
                          <h4 className="text-xs font-bold text-slate-800 mb-1.5">Key Expectations:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-500 space-y-1 font-normal">
                            {job.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Apply Button */}
                    <div className="lg:self-center shrink-0">
                      <button
                        onClick={() => handleOpenApplyModal(job)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs tracking-wide shadow-md shadow-orange-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                      >
                        <span>Apply for this Role</span>
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ================= GENERAL APPLICATION BOX ================= */}
        <section id="general-application" className="mt-14 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mx-auto">
            {/* Ecovista Global Private Limited Context Header */}
            <div className="text-center mb-8">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-800 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200 inline-block mb-3">
                JOB AT ECOVISTA GLOBAL PVT. LTD.
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Build the Future of Re-Commerce with EcoFone
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal mt-2">
                <strong>EcoFone</strong>, a flagship brand under <strong>Ecovista Global Private Limited</strong>, is dedicated to making technology more sustainable, affordable, and trustworthy. Through expertly refurbishing and renewing smartphones, EcoFone reduces electronic waste, conserves resources, and supports a cleaner, greener planet while delivering premium quality devices as India’s first re-commerce brand.
              </p>
              <div className="mt-3 text-[11px] text-slate-500 font-medium">
                Target HR Mail: <span className="text-[#ea580c] font-bold">future@ecofone.co.in</span>
              </div>
            </div>

            {generalSubmitSuccess ? (
              <div className="text-center py-8 space-y-4 bg-orange-50/30 rounded-2xl border border-orange-100 p-6">
                <div className="w-16 h-16 rounded-full bg-orange-100 text-[#ea580c] mx-auto flex items-center justify-center shadow-inner">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-900">Application Delivered to HR!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your application has been successfully recorded and dispatched directly to EcoFone HR (Ecovista Global Private Limited) at <span className="text-[#ea580c] font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">future@ecofone.co.in</span>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setGeneralSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 hover:shadow-lg"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                {generalSubmitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {generalSubmitError}
                  </div>
                )}

                {/* NAME & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={generalFullName}
                      onChange={e => setGeneralFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={generalEmail}
                      onChange={e => setGeneralEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* CONTACT NO & GENDER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact No. *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={generalPhone}
                      onChange={e => setGeneralPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                    <select
                      required
                      value={generalGender}
                      onChange={e => setGeneralGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* EXPERIENCE & LOCATION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Year of Experience *</label>
                    <select
                      value={generalExperience}
                      onChange={e => setGeneralExperience(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    >
                      <option value="Fresher (0 - 1 Year)">Fresher (0 - 1 Year)</option>
                      <option value="1 - 2 Years">1 - 2 Years</option>
                      <option value="2 - 4 Years">2 - 4 Years</option>
                      <option value="4 - 6 Years">4 - 6 Years</option>
                      <option value="6+ Years">6+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Location / Current City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lucknow, UP / Delhi NCR"
                      value={generalLocation}
                      onChange={e => setGeneralLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* AREA OF INTEREST & ROLE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Area of Interest *</label>
                    <select
                      required
                      value={generalAreaOfInterest}
                      onChange={e => setGeneralAreaOfInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    >
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales &amp; Business Expansion</option>
                      <option value="Finance">Finance &amp; Accounts</option>
                      <option value="IT">IT &amp; Software Development</option>
                      <option value="Social media">Social Media &amp; Content</option>
                      <option value="Diagnostics & QA">Diagnostics &amp; Hardware QA</option>
                      <option value="Retail Store Operations">Retail Store Operations</option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Specific Domain / Role Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Marketing Executive / Diagnostics Specialist"
                      value={generalRole}
                      onChange={e => setGeneralRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* CURRENT SALARY & EXPECTED SALARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Salary *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹3.5 LPA / Fresher / ₹25,000/mo"
                      value={generalCurrentSalary}
                      onChange={e => setGeneralCurrentSalary(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expected Salary *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹5 LPA / ₹35,000/mo"
                      value={generalExpectedSalary}
                      onChange={e => setGeneralExpectedSalary(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* ATTACH CV / RESUME - UPLOAD FROM DRIVE OR DEVICE */}
                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="block text-xs font-bold text-orange-950">
                        Attach CV / Resume *
                      </label>
                      <p className="text-[11px] text-orange-800/80">
                        Upload directly from your device or Google Drive
                      </p>
                    </div>

                    {/* Mode Toggle Buttons */}
                    <div className="inline-flex items-center p-1 bg-white/90 rounded-xl border border-orange-200/80 self-start sm:self-auto text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setGeneralResumeMode('upload')}
                        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                          generalResumeMode === 'upload'
                            ? 'bg-[#ea580c] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Upload File / Drive</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGeneralResumeMode('drive')}
                        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                          generalResumeMode === 'drive'
                            ? 'bg-[#ea580c] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span>Google Drive Link</span>
                      </button>
                    </div>
                  </div>

                  {generalResumeMode === 'upload' ? (
                    <div>
                      <input
                        ref={generalFileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadResumeFile(file, false);
                        }}
                      />

                      {generalResumeFileName && generalResumeUrl ? (
                        <div className="p-3.5 rounded-xl bg-white border border-emerald-300 shadow-sm flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                                  {generalResumeFileName}
                                </p>
                                <span className="shrink-0 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                  Uploaded ✓
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {generalResumeFileSize} • Attached directly to EcoFone HR email
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setGeneralResumeUrl('');
                              setGeneralResumeFileName('');
                              setGeneralResumeFileSize('');
                              if (generalFileInputRef.current) generalFileInputRef.current.value = '';
                            }}
                            className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition-all shrink-0"
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => generalFileInputRef.current?.click()}
                          onDragOver={e => e.preventDefault()}
                          onDrop={e => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) handleUploadResumeFile(file, false);
                          }}
                          className="border-2 border-dashed border-orange-300 hover:border-[#ea580c] bg-white/80 hover:bg-white rounded-xl p-5 text-center cursor-pointer transition-all group shadow-sm"
                        >
                          {generalUploading ? (
                            <div className="flex flex-col items-center justify-center py-2 space-y-2">
                              <svg className="animate-spin w-7 h-7 text-[#ea580c]" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                              </svg>
                              <p className="text-xs font-bold text-orange-950">Uploading Resume to EcoFone HR portal...</p>
                              <p className="text-[11px] text-orange-700">Please wait while the file is processed</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#ea580c] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-inner">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </div>
                              <p className="text-xs font-bold text-slate-800">
                                <span className="text-[#ea580c] hover:underline">Click to upload from Device or Google Drive</span>
                              </p>
                              <p className="text-[11px] text-slate-500 mt-1">
                                Supports PDF, DOC, DOCX up to 10MB
                              </p>
                              <span className="mt-2 text-[10px] font-semibold text-orange-800 bg-orange-100/70 px-2.5 py-0.5 rounded-full">
                                📁 Choose directly from Google Drive, Files &amp; Downloads
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {generalUploadError && (
                        <p className="text-[11px] font-bold text-red-600 mt-1.5 flex items-center gap-1">
                          <span>⚠️</span> <span>{generalUploadError}</span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <input
                        type="url"
                        placeholder="https://drive.google.com/file/d/..."
                        value={generalResumeUrl}
                        onChange={e => {
                          setGeneralResumeUrl(e.target.value);
                          setGeneralResumeFileName('Google Drive Link');
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-orange-300 text-xs bg-white focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                      />
                      <div className="flex items-center gap-1.5 text-[11px] text-orange-800 font-semibold">
                        <span>⚠️</span>
                        <span>Please ensure your Google Drive link permission is set to: <strong>&ldquo;Anyone with the link can view&rdquo;</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* LINKEDIN (OPTIONAL) & PORTFOLIO (OPTIONAL) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      LinkedIn Profile URL <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={generalLinkedinUrl}
                      onChange={e => setGeneralLinkedinUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Portfolio / Work Samples URL <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/... or portfolio"
                      value={generalPortfolioUrl}
                      onChange={e => setGeneralPortfolioUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* COVER NOTE */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cover Note / Strengths Pitch <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your background, key strengths, and why you want to work with EcoFone..."
                    value={generalCoverNote}
                    onChange={e => setGeneralCoverNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500 font-medium">
                    HR Recipient: <span className="text-[#ea580c] font-bold">future@ecofone.co.in</span>
                  </div>

                  <button
                    type="submit"
                    disabled={generalSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs tracking-wide uppercase transition-all shadow-md shadow-orange-500/20 hover:shadow-lg disabled:opacity-50"
                  >
                    {generalSubmitting ? 'Submitting to HR...' : 'Submit Job Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* FOOTER NOTE FOR DIRECT INQUIRIES */}
        <div className="mt-16 text-center text-xs text-slate-400 font-medium border-t border-slate-200/80 pt-8">
          Don&apos;t see an exact match? Send your resume directly to{' '}
          <a href="mailto:future@ecofone.co.in" className="text-[#ea580c] font-bold hover:underline">
            future@ecofone.co.in
          </a>{' '}
          for future considerations.
        </div>
      </div>

      {/* ================= CANDIDATE APPLICATION MODAL ================= */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
                    ECOVISTA GLOBAL PVT. LTD.
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {selectedJobForModal.department}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  Apply for {selectedJobForModal.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  📍 {selectedJobForModal.location} • {selectedJobForModal.type}
                </p>
              </div>

              <button
                onClick={handleCloseApplyModal}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Submission Success State */}
            {submitSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 text-[#ea580c] mx-auto flex items-center justify-center shadow-inner">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-black text-slate-900">Application Delivered to HR!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your application for <strong className="text-slate-900">{submittedDetails?.jobTitle}</strong> has been successfully received and directly routed to EcoFone HR (Ecovista Global Private Limited) at <span className="text-[#ea580c] font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">future@ecofone.co.in</span>.
                </p>

                {submittedDetails && (
                  <div className="p-4 rounded-2xl bg-orange-50/40 border border-orange-100 text-left space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-orange-200/60">
                      <span className="font-bold text-slate-500 uppercase text-[10px]">Recipient HR</span>
                      <span className="font-bold text-[#ea580c]">{submittedDetails.hrEmail}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Applicant:</span>
                      <span className="font-bold text-slate-800">{submittedDetails.candidateName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Contact:</span>
                      <span className="font-semibold text-slate-700">{submittedDetails.phone} • {submittedDetails.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Status:</span>
                      <span className="font-bold text-[#ea580c] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse"></span>
                        Dispatched &amp; Recorded
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-slate-400">
                  Our talent acquisition team will review your credentials and contact you directly.
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleCloseApplyModal}
                    className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-colors shadow-md shadow-orange-500/20 hover:shadow-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Application Form */
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                {submitError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {submitError}
                  </div>
                )}

                {/* NAME & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formFullName}
                      onChange={e => setFormFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formEmail}
                      onChange={e => setFormEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    />
                  </div>
                </div>

                {/* CONTACT NO & GENDER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact No. *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formPhone}
                      onChange={e => setFormPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                    <select
                      required
                      value={formGender}
                      onChange={e => setFormGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* EXPERIENCE & LOCATION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Year of Experience *</label>
                    <select
                      value={formExperience}
                      onChange={e => setFormExperience(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    >
                      <option value="Fresher (0 - 1 Year)">Fresher (0 - 1 Year)</option>
                      <option value="1 - 2 Years">1 - 2 Years</option>
                      <option value="2 - 4 Years">2 - 4 Years</option>
                      <option value="4 - 6 Years">4 - 6 Years</option>
                      <option value="6+ Years">6+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Location / Current City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lucknow, UP / Delhi NCR"
                      value={formLocation}
                      onChange={e => setFormLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    />
                  </div>
                </div>

                {/* AREA OF INTEREST */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Area of Interest *</label>
                  <select
                    required
                    value={formAreaOfInterest}
                    onChange={e => setFormAreaOfInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                  >
                    <option value="IT / Software Development">IT &amp; Software Development</option>
                    <option value="Diagnostics & QA">Diagnostics &amp; Hardware QA</option>
                    <option value="Marketing">Marketing &amp; Growth</option>
                    <option value="Sales">Sales &amp; Business Expansion</option>
                    <option value="Finance">Finance &amp; Accounts</option>
                    <option value="Social media">Social Media &amp; Content</option>
                    <option value="Retail Store Operations">Retail Store Operations</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* CURRENT SALARY & EXPECTED SALARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Salary *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹3.5 LPA / Fresher / ₹25,000/mo"
                      value={formCurrentSalary}
                      onChange={e => setFormCurrentSalary(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expected Salary *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹5 LPA / ₹35,000/mo"
                      value={formExpectedSalary}
                      onChange={e => setFormExpectedSalary(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    />
                  </div>
                </div>

                {/* ATTACH CV / RESUME - UPLOAD FROM DRIVE OR DEVICE */}
                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="block text-xs font-bold text-orange-950">
                        Attach CV / Resume *
                      </label>
                      <p className="text-[11px] text-orange-800/80">
                        Upload directly from your device or Google Drive
                      </p>
                    </div>

                    {/* Mode Toggle Buttons */}
                    <div className="inline-flex items-center p-1 bg-white/90 rounded-xl border border-orange-200/80 self-start sm:self-auto text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setModalResumeMode('upload')}
                        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                          modalResumeMode === 'upload'
                            ? 'bg-[#ea580c] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Upload File / Drive</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setModalResumeMode('drive')}
                        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                          modalResumeMode === 'drive'
                            ? 'bg-[#ea580c] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span>Google Drive Link</span>
                      </button>
                    </div>
                  </div>

                  {modalResumeMode === 'upload' ? (
                    <div>
                      <input
                        ref={modalFileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadResumeFile(file, true);
                        }}
                      />

                      {modalResumeFileName && formResumeUrl ? (
                        <div className="p-3.5 rounded-xl bg-white border border-emerald-300 shadow-sm flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                                  {modalResumeFileName}
                                </p>
                                <span className="shrink-0 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                  Uploaded ✓
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {modalResumeFileSize} • Attached directly to EcoFone HR email
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setFormResumeUrl('');
                              setModalResumeFileName('');
                              setModalResumeFileSize('');
                              if (modalFileInputRef.current) modalFileInputRef.current.value = '';
                            }}
                            className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition-all shrink-0"
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => modalFileInputRef.current?.click()}
                          onDragOver={e => e.preventDefault()}
                          onDrop={e => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) handleUploadResumeFile(file, true);
                          }}
                          className="border-2 border-dashed border-orange-300 hover:border-[#ea580c] bg-white/80 hover:bg-white rounded-xl p-5 text-center cursor-pointer transition-all group shadow-sm"
                        >
                          {modalUploading ? (
                            <div className="flex flex-col items-center justify-center py-2 space-y-2">
                              <svg className="animate-spin w-7 h-7 text-[#ea580c]" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                              </svg>
                              <p className="text-xs font-bold text-orange-950">Uploading Resume to EcoFone HR portal...</p>
                              <p className="text-[11px] text-orange-700">Please wait while the file is processed</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#ea580c] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-inner">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </div>
                              <p className="text-xs font-bold text-slate-800">
                                <span className="text-[#ea580c] hover:underline">Click to upload from Device or Google Drive</span>
                              </p>
                              <p className="text-[11px] text-slate-500 mt-1">
                                Supports PDF, DOC, DOCX up to 10MB
                              </p>
                              <span className="mt-2 text-[10px] font-semibold text-orange-800 bg-orange-100/70 px-2.5 py-0.5 rounded-full">
                                📁 Choose directly from Google Drive, Files &amp; Downloads
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {modalUploadError && (
                        <p className="text-[11px] font-bold text-red-600 mt-1.5 flex items-center gap-1">
                          <span>⚠️</span> <span>{modalUploadError}</span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <input
                        type="url"
                        placeholder="https://drive.google.com/file/d/..."
                        value={formResumeUrl}
                        onChange={e => {
                          setFormResumeUrl(e.target.value);
                          setModalResumeFileName('Google Drive Link');
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-orange-300 text-xs bg-white focus:ring-2 focus:ring-[#ea580c] outline-none"
                      />
                      <div className="flex items-center gap-1.5 text-[11px] text-orange-800 font-semibold">
                        <span>⚠️</span>
                        <span>Please ensure your Google Drive link permission is set to: <strong>&ldquo;Anyone with the link can view&rdquo;</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* LINKEDIN (OPTIONAL) & PORTFOLIO (OPTIONAL) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      LinkedIn Profile URL <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formLinkedinUrl}
                      onChange={e => setFormLinkedinUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Portfolio / Work Samples URL <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/... or portfolio"
                      value={formPortfolioUrl}
                      onChange={e => setFormPortfolioUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                    />
                  </div>
                </div>

                {/* COVER NOTE */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cover Note / Why are you a great fit? <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your relevant background and strengths..."
                    value={formCoverNote}
                    onChange={e => setFormCoverNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleCloseApplyModal}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
