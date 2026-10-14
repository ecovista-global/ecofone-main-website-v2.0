import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Careers at EcoFone | Job Openings & Hiring at Ecovista Global Private Limited',
  description:
    'Explore open career opportunities at EcoFone (Ecovista Global Private Limited). Actively hiring Franchise Sales Managers (FSM), Business Development Associates (BDA), Store Promoters & Front Manager Officers (FMO), Freelance Business Growth Partners (BGP), IT Full Stack Engineers, Social Media Strategists, and Interns. Apply online directly!',
  keywords: [
    'EcoFone careers',
    'EcoFone jobs',
    'EcoFone hiring',
    'Business Growth Partner freelance jobs',
    'Freelance sales commission jobs EcoFone',
    'Ecovista Global Private Limited careers',
    'Franchise Sales Manager jobs Lucknow',
    'Business Development Associate jobs Lucknow',
    'Front Manager Officer retail jobs',
    'Store promoter jobs Lucknow',
    'IT Software Engineer jobs Lucknow',
    'Social media strategist jobs Lucknow',
    'Internships in Lucknow',
    'Refurbished smartphone startup jobs India',
    'Re-commerce careers India',
    'Jobs at EcoFone'
  ],
  alternates: {
    canonical: 'https://www.ecofone.co.in/careers',
  },
  openGraph: {
    title: 'Careers at EcoFone - Build the Future of Re-Commerce',
    description:
      'Explore active job openings across Sales, Engineering, Marketing, Retail Operations, and Internships at EcoFone (Ecovista Global Private Limited).',
    url: 'https://www.ecofone.co.in/careers',
    siteName: 'EcoFone India',
    images: [
      {
        url: 'https://www.ecofone.co.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EcoFone Careers & Job Openings',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at EcoFone | Job Openings & Hiring',
    description:
      'We are hiring! Join EcoFone (Ecovista Global Private Limited) across Sales, IT, Social Media, and Store Operations.',
    images: ['https://www.ecofone.co.in/og-image.jpg'],
  },
};

const GOOGLE_JOBS_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.ecofone.co.in/careers#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.ecofone.co.in',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Careers & Job Openings',
          item: 'https://www.ecofone.co.in/careers',
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.ecofone.co.in/#organization',
      name: 'EcoFone (Ecovista Global Private Limited)',
      url: 'https://www.ecofone.co.in',
      logo: 'https://www.ecofone.co.in/logo.jpg',
      sameAs: [
        'https://www.instagram.com/ecofone.in',
        'https://www.linkedin.com/company/ecofone',
      ],
    },
    {
      '@type': 'JobPosting',
      '@id': 'https://www.ecofone.co.in/careers#job-fsm',
      title: 'Franchise Sales Manager (FSM)',
      description:
        '<p>Drive regional franchise network expansion for EcoFone by leading high-impact offline investor meetings and virtual Google Meet consultations. Responsible for pitching store unit economics, franchise ROI models, answering investor queries, and closing franchise partner agreements across key cities.</p><h3>Key Expectations:</h3><ul><li>Proven track record in franchise sales, dealership network expansion, or high-ticket B2B business development.</li><li>Expertise in leading face-to-face client meetings, Google Meet video pitch sessions, and contractual negotiations.</li><li>Thorough understanding of retail franchise models, CAPEX, OPEX, margins, inventory cycles, and payback periods.</li><li>Strong commercial acumen, high persuasive power, and willingness to travel for high-intent site feasibility meetings.</li></ul><p><strong>About the Company:</strong> EcoFone, a flagship brand under Ecovista Global Private Limited, is dedicated to making technology more sustainable, affordable, and trustworthy.</p>',
      identifier: {
        '@type': 'PropertyValue',
        name: 'EcoFone - Ecovista Global Private Limited',
        value: 'job-fsm',
      },
      datePosted: '2026-10-13T00:00:00+05:30',
      validThrough: '2027-06-30T23:59:59+05:30',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'EcoFone (Ecovista Global Private Limited)',
        sameAs: 'https://www.ecofone.co.in',
        logo: 'https://www.ecofone.co.in/logo.jpg',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'EcoFone Corporate HQ',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226010',
          addressCountry: 'IN',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India',
      },
      directApply: true,
      experienceRequirements: {
        '@type': 'OccupationalExperienceRequirements',
        monthsOfExperience: 24,
      },
    },
    {
      '@type': 'JobPosting',
      '@id': 'https://www.ecofone.co.in/careers#job-bda',
      title: 'Business Development Associate (BDA)',
      description:
        '<p>Spearhead high-energy outbound prospecting, cold calling, and lead qualification for EcoFone franchise expansion. Introduce aspiring entrepreneurs to India’s leading re-commerce brand, explain initial investment plans and unit models, qualify investor capability, and schedule targeted meetings for Franchise Sales Managers (FSMs).</p><h3>Key Expectations:</h3><ul><li>Exceptional verbal fluency in Hindi & English with confident telephone etiquette and rapport-building abilities.</li><li>Comfortable handling 100+ outbound calls per day, navigating objections, and qualifying serious business prospects.</li><li>Quick learner capable of understanding and explaining EcoFone franchise offerings, commercial plans, and brand USPs.</li><li>Diligent with CRM lead logging, scheduled call follow-ups, and meeting coordination with senior sales team.</li></ul>',
      identifier: {
        '@type': 'PropertyValue',
        name: 'EcoFone - Ecovista Global Private Limited',
        value: 'job-bda',
      },
      datePosted: '2026-10-13T00:00:00+05:30',
      validThrough: '2027-06-30T23:59:59+05:30',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'EcoFone (Ecovista Global Private Limited)',
        sameAs: 'https://www.ecofone.co.in',
        logo: 'https://www.ecofone.co.in/logo.jpg',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'EcoFone Corporate HQ',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226010',
          addressCountry: 'IN',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India',
      },
      directApply: true,
      experienceRequirements: {
        '@type': 'OccupationalExperienceRequirements',
        monthsOfExperience: 12,
      },
    },
    {
      '@type': 'JobPosting',
      '@id': 'https://www.ecofone.co.in/careers#job-store-promoter',
      title: 'Store Promoter & Front Manager Officer (FMO)',
      description:
        '<p>Represent EcoFone as the primary Front Manager Officer (FMO) on the retail store floor across our experience centers. Handle end-to-end customer dealing and front-desk interactions: engage walk-in visitors, showcase certified pre-owned smartphones, explain 32-point diagnostic testing and warranty standards, assist with old device buyback valuations, resolve buyer queries, and drive monthly store sales targets.</p><h3>Key Expectations:</h3><ul><li>Energetic personality with high customer dealing skills, hospitality mindset, and passion for gadget technology.</li><li>Strong verbal communication in Hindi & English with confidence in front-desk customer relationship handling.</li><li>Ability to explain certified refurbishment quality, testing standards, and cosmetic grading to build immediate trust with buyers.</li><li>Familiarity with POS billing counter operations, warranty issuance, customer feedback, and store inventory monitoring.</li></ul>',
      identifier: {
        '@type': 'PropertyValue',
        name: 'EcoFone - Ecovista Global Private Limited',
        value: 'job-store-promoter',
      },
      datePosted: '2026-10-13T00:00:00+05:30',
      validThrough: '2027-06-30T23:59:59+05:30',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'EcoFone (Ecovista Global Private Limited)',
        sameAs: 'https://www.ecofone.co.in',
        logo: 'https://www.ecofone.co.in/logo.jpg',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'EcoFone Store Experience Center',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226010',
          addressCountry: 'IN',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India',
      },
      directApply: true,
    },
    {
      '@type': 'JobPosting',
      '@id': 'https://www.ecofone.co.in/careers#job-bgp',
      title: 'Business Growth Partner (BGP) - Freelance & Commission-Based',
      description:
        '<p>Partner with EcoFone as an independent Business Growth Partner (BGP). Work on your own flexible schedule with zero fixed hours or geographic limits. Introduce potential franchise investors, business owners, and retail partners to India\'s fastest-growing re-commerce brand. Earn lucrative, high-ticket sales commissions per successfully signed franchise store agreement.</p><h3>Key Expectations:</h3><ul><li>Strong personal or professional network of retail investors, entrepreneurs, or business prospects across India.</li><li>Entrepreneurial mindset with passion for high-ticket deal making and pure performance-driven commission earnings.</li><li>Ability to initiate high-level conversations, pitch EcoFone franchise value proposition, and introduce qualified leads to our core sales team.</li><li>Zero office reporting required. Complete flexibility to work remotely as a freelance growth partner alongside your current job or business.</li></ul>',
      identifier: {
        '@type': 'PropertyValue',
        name: 'EcoFone - Ecovista Global Private Limited',
        value: 'job-bgp',
      },
      datePosted: '2026-10-13T00:00:00+05:30',
      validThrough: '2027-06-30T23:59:59+05:30',
      employmentType: 'CONTRACTOR',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'EcoFone (Ecovista Global Private Limited)',
        sameAs: 'https://www.ecofone.co.in',
        logo: 'https://www.ecofone.co.in/logo.jpg',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'EcoFone Corporate HQ',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226010',
          addressCountry: 'IN',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India',
      },
      directApply: true,
    },
    {
      '@type': 'JobPosting',
      '@id': 'https://www.ecofone.co.in/careers#job-it-general',
      title: 'IT Specialist & Full Stack Software Engineer',
      description:
        '<p>Develop and maintain the core digital infrastructure powering EcoFone e-commerce, franchise CRM, and store operations. Build responsive web platforms, internal workflow tools, automated device grading APIs, database pipelines, and support IT systems across headquarters and store branches.</p><h3>Key Expectations:</h3><ul><li>Hands-on proficiency with Next.js, React, TypeScript, Node.js, and relational databases (PostgreSQL, MySQL, Prisma).</li><li>Experience developing and integrating REST APIs, webhooks, auth systems, and cloud deployment pipelines.</li><li>Familiarity with POS/inventory system integration, CRM data flows, and secure server management.</li><li>Ability to troubleshoot office IT networking, device setups, and automated diagnostic testing suites.</li></ul>',
      identifier: {
        '@type': 'PropertyValue',
        name: 'EcoFone - Ecovista Global Private Limited',
        value: 'job-it-general',
      },
      datePosted: '2026-10-13T00:00:00+05:30',
      validThrough: '2027-06-30T23:59:59+05:30',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'EcoFone (Ecovista Global Private Limited)',
        sameAs: 'https://www.ecofone.co.in',
        logo: 'https://www.ecofone.co.in/logo.jpg',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'EcoFone Tech HQ',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226010',
          addressCountry: 'IN',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India',
      },
      directApply: true,
      experienceRequirements: {
        '@type': 'OccupationalExperienceRequirements',
        monthsOfExperience: 12,
      },
    },
    {
      '@type': 'JobPosting',
      '@id': 'https://www.ecofone.co.in/careers#job-social-media',
      title: 'Social Media & Content Strategist',
      description:
        '<p>Create engaging, viral social media content that champions EcoFone green tech mission and re-commerce brand leadership. Plan, shoot, and edit short-form reels/shorts, smartphone unboxings, refurbishment teardowns, customer testimonials, and trend-jacking campaigns across Instagram, YouTube, and LinkedIn.</p><h3>Key Expectations:</h3><ul><li>Strong portfolio of short-form video content (Reels/Shorts) with proven audience reach and engagement.</li><li>Proficient in video shooting (smartphones/cameras) and mobile/desktop editing (CapCut, Premiere Pro, VN, After Effects).</li><li>Keen pulse on trending audio, viral video pacing, copywriting hooks, and visual storytelling for young consumers.</li><li>Basic graphic design proficiency (Canva / Figma / Photoshop) for carousels, thumbnails, and stories.</li></ul>',
      identifier: {
        '@type': 'PropertyValue',
        name: 'EcoFone - Ecovista Global Private Limited',
        value: 'job-social-media',
      },
      datePosted: '2026-10-13T00:00:00+05:30',
      validThrough: '2027-06-30T23:59:59+05:30',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'EcoFone (Ecovista Global Private Limited)',
        sameAs: 'https://www.ecofone.co.in',
        logo: 'https://www.ecofone.co.in/logo.jpg',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'EcoFone Creative Studio HQ',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226010',
          addressCountry: 'IN',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India',
      },
      directApply: true,
    },
    {
      '@type': 'JobPosting',
      '@id': 'https://www.ecofone.co.in/careers#job-intern-all',
      title: 'Management & Tech Intern (All Categories)',
      description:
        '<p>Kickstart your career with high-impact hands-on experience at India fastest-growing re-commerce brand. Open across all departments: Business Development & Sales, Social Media & Marketing, IT & Web Development, Mobile Hardware Diagnostics, Store Operations, and Customer Support. Mentorship by department leads with Pre-Placement Offer (PPO) potential for top performers.</p><h3>Key Expectations:</h3><ul><li>High curiosity, self-driven initiative, adaptability, and eager mindset to learn fast in a startup environment.</li><li>Strong communication and organizational skills; ready to take ownership of live daily assignments.</li><li>Basic foundational skills in relevant field (MS Excel / Google Sheets, Figma, Coding, or Social Media creation).</li><li>Availability for 3 to 6 months full-time/part-time internship. Certificate, recommendation, and stipend provided.</li></ul>',
      identifier: {
        '@type': 'PropertyValue',
        name: 'EcoFone - Ecovista Global Private Limited',
        value: 'job-intern-all',
      },
      datePosted: '2026-10-13T00:00:00+05:30',
      validThrough: '2027-06-30T23:59:59+05:30',
      employmentType: 'INTERN',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'EcoFone (Ecovista Global Private Limited)',
        sameAs: 'https://www.ecofone.co.in',
        logo: 'https://www.ecofone.co.in/logo.jpg',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'EcoFone Corporate HQ',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226010',
          addressCountry: 'IN',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India',
      },
      directApply: true,
    },
  ],
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(GOOGLE_JOBS_STRUCTURED_DATA),
        }}
      />
      {children}
    </>
  );
}
