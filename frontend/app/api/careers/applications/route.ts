import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { buildEcoFoneEmailHtml, getEmailLogoAttachment } from '../../../../lib/email-templates';
import { verifyAdminAuth } from '../../../../lib/auth-guard';

import { readFallbackJson, writeFallbackJson } from '../../../../lib/json-fallback';

const HR_EMAIL = process.env.HR_EMAIL || 'future@ecofone.co.in';

async function getApplications(): Promise<any[]> {
  return await readFallbackJson<any[]>('careers_applications.json', []);
}

async function saveApplications(apps: any[]): Promise<void> {
  await writeFallbackJson('careers_applications.json', apps);
}

async function dispatchEmailToHr(app: any) {
  const smtpHost = process.env.SMTP_HOST || 'smtp.zoho.in';
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
  const smtpUser = process.env.SMTP_USER || 'future@ecofone.co.in';
  const smtpPass = process.env.SMTP_PASS;

  // 1. Internal Notification for EcoFone HR / Talent Team
  const internalEmailHtml = buildEcoFoneEmailHtml({
    headerTitle: 'EcoFone Futures',
    badgeText: 'JOB AT ECOVISTA GLOBAL PVT. LTD.',
    recipientGreeting: `New Application: ${app.fullName} (${app.jobTitle || app.areaOfInterest})`,
    introMessage: `A new candidate has submitted their job application for <strong>EcoFone</strong> (under <strong>Ecovista Global Private Limited</strong>). Candidate credentials and Drive link are summarized below:`,
    highlightBoxContent: app.coverNote ? `"${app.coverNote}"` : undefined,
    detailRows: [
      { label: 'Candidate Name', value: app.fullName },
      { label: 'Email Address', value: app.email, isLink: true, linkType: 'mail' },
      { label: 'Contact Number', value: app.phone, isLink: true, linkType: 'tel' },
      { label: 'Gender', value: app.gender || 'Not specified' },
      { label: 'Area of Interest', value: app.areaOfInterest || app.jobTitle || 'General' },
      { label: 'Target Position', value: app.jobTitle || 'General Application' },
      { label: 'Experience Level', value: app.experienceYears ? `${app.experienceYears} Years` : 'Not specified' },
      { label: 'Current Location', value: app.currentLocation || 'Not specified' },
      { label: 'Current Salary (CTC)', value: app.currentSalary || 'Not specified' },
      { label: 'Expected Salary (CTC)', value: app.expectedSalary || 'Not specified' },
      { 
        label: 'Resume / CV', 
        value: app.resumeFileName ? `${app.resumeFileName} (Attached directly to email)` : (app.resumeUrl || 'Not provided'), 
        isLink: app.resumeUrl && !app.resumeUrl.startsWith('/uploads'), 
        linkType: 'url' 
      },
      { label: 'LinkedIn Profile', value: app.linkedinUrl || 'Not provided', isLink: !!app.linkedinUrl, linkType: 'url' },
      { label: 'Portfolio / Samples', value: app.portfolioUrl || 'Not provided', isLink: !!app.portfolioUrl, linkType: 'url' }
    ],
    signoffTeam: 'EcoFone Futures & Talent Acquisition',
    signoffContactLine: `Recipient: ${HR_EMAIL} • Ecovista Global Private Limited`
  });

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const logoAttachment = getEmailLogoAttachment();
      const mailAttachments: any[] = [logoAttachment];

      // Attach candidate resume file directly if uploaded locally
      if (app.resumeUrl && app.resumeUrl.startsWith('/uploads/resumes/')) {
        const relativeFile = app.resumeUrl.replace(/^\//, '');
        const fullFilePath = path.join(process.cwd(), 'public', relativeFile);
        if (fs.existsSync(fullFilePath)) {
          mailAttachments.push({
            filename: app.resumeFileName || path.basename(fullFilePath),
            path: fullFilePath
          });
        }
      }

      // 1. Send Internal Notification to HR (future@ecofone.co.in)
      await transporter.sendMail({
        from: `"EcoFone Futures" <${smtpUser}>`,
        to: HR_EMAIL,
        replyTo: app.email,
        subject: `[Job Application - Ecovista Global] ${app.jobTitle || app.areaOfInterest} - ${app.fullName}`,
        html: internalEmailHtml,
        text: `New application for ${app.jobTitle}\n\nCompany: Ecovista Global Private Limited (EcoFone)\nCandidate: ${app.fullName}\nEmail: ${app.email}\nPhone: ${app.phone}\nGender: ${app.gender}\nArea of Interest: ${app.areaOfInterest}\nExperience: ${app.experienceYears}\nLocation: ${app.currentLocation}\nCurrent Salary: ${app.currentSalary}\nExpected Salary: ${app.expectedSalary}\nResume: ${app.resumeFileName || app.resumeUrl}\nLinkedIn: ${app.linkedinUrl}\nPortfolio: ${app.portfolioUrl}\n\nCover Note:\n${app.coverNote}`,
        attachments: mailAttachments
      });
      console.log(`[SMTP Mailer] Application successfully emailed to ${HR_EMAIL}`);

      // 2. Auto-reply delivery confirmation to Candidate (Matching user's exact theme & logo)
      if (app.email && app.email.includes('@')) {
        try {
          const candidateAutoReplyHtml = buildEcoFoneEmailHtml({
            headerTitle: 'EcoFone Futures',
            recipientGreeting: `Dear ${app.fullName},`,
            introMessage: `Thank you for your application to <strong>EcoFone</strong>, a flagship brand under <strong>Ecovista Global Private Limited</strong>! We have successfully received your credentials for <strong>${app.jobTitle || app.areaOfInterest}</strong>.`,
            highlightBoxContent: `Role: ${app.jobTitle || app.areaOfInterest} • Application Ref: ${app.id} • Status: Under Review`,
            mainBodyNotes: `Our Talent Acquisition team is actively reviewing your qualifications and submitted CV. If your background aligns with our current openings, an HR specialist will contact you directly within <strong>24 to 48 business hours</strong>.`,
            signoffTeam: 'EcoFone Futures & Talent Acquisition',
            signoffContactLine: 'Email: future@ecofone.co.in • Ecovista Global Private Limited',
            isAutoReply: true
          });

          await transporter.sendMail({
            from: `"EcoFone Futures" <${smtpUser}>`,
            to: app.email,
            subject: `Application Received: ${app.jobTitle || app.areaOfInterest} - EcoFone (Ecovista Global)`,
            html: candidateAutoReplyHtml,
            text: `Dear ${app.fullName},\n\nThank you for applying to EcoFone (Ecovista Global Private Limited)! We have successfully received your application for the role of ${app.jobTitle || app.areaOfInterest} (Ref: ${app.id}).\n\nOur talent team is actively reviewing your qualifications and will reach out within 24-48 business hours.\n\nWarm regards,\nEcoFone Futures Team\nEmail: future@ecofone.co.in`,
            attachments: [logoAttachment]
          });
          console.log(`[Auto-Responder] Confirmation email sent to candidate: ${app.email}`);
        } catch (autoErr: any) {
          console.warn('[Auto-Responder] Failed to send candidate confirmation:', autoErr.message);
        }
      }

      return { sent: true, method: 'smtp' };
    } catch (err: any) {
      console.error('[SMTP Mailer] Failed to send via SMTP:', err.message);
    }
  }

  console.log(`[Direct Web Trigger] Application for ${app.jobTitle} from ${app.fullName} (<${app.email}>) recorded and targeted to HR: ${HR_EMAIL}`);
  return { sent: true, method: 'direct_recorded' };
}

export async function GET(req: Request) {
  const auth = verifyAdminAuth(req);
  if (!auth.isAuthorized) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
  }

  // Query backend PostgreSQL database first
  try {
    const backendUrl = process.env.BACKEND_URL || process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:4012';
    const authHeader = req.headers.get('authorization') || '';
    const res = await fetch(`${backendUrl.replace(/\/+$/, '')}/api/v1/career/applications`, {
      headers: { ...(authHeader && { Authorization: authHeader }) },
      cache: 'no-store',
    });
    if (res.ok) {
      const dbApps = await res.json();
      if (Array.isArray(dbApps) && dbApps.length > 0) {
        return NextResponse.json(dbApps);
      }
    }
  } catch (err: any) {
    console.warn('[Careers] Backend DB fetch warning, using local fallback:', err?.message);
  }

  const apps = await getApplications();
  return NextResponse.json(apps);
}

export async function POST(req: Request) {
  try {
    // 0. Rate limiting guard (Max 5 requests per 10 minutes per IP)
    const rateLimit = checkRateLimit(req, { prefix: 'careers_apply', maxRequests: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.isAllowed) {
      return NextResponse.json(
        { success: false, error: `Too many submissions. Please wait ${rateLimit.retryAfterSeconds} seconds before submitting again.` },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await req.json();

    // Required fields validation
    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Full Name, Email, and Contact Number are required.' },
        { status: 400 }
      );
    }

    const resumeLink = body.resumeUrl || body.resumeDriveUrl || body.linkedinPortfolio || '';
    if (!resumeLink) {
      return NextResponse.json(
        { success: false, error: 'Resume / CV Google Drive link is required.' },
        { status: 400 }
      );
    }

    const apps = await getApplications();
    const newApp = {
      id: `app-${Date.now()}`,
      jobId: body.jobId || '',
      jobTitle: body.jobTitle || body.role || 'General Application',
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      gender: body.gender || 'Not specified',
      experienceYears: body.experienceYears || 'Fresher',
      currentLocation: body.currentLocation || '',
      areaOfInterest: body.areaOfInterest || body.jobTitle || 'General',
      currentSalary: body.currentSalary || '',
      expectedSalary: body.expectedSalary || '',
      resumeUrl: resumeLink.trim(),
      resumeFileName: body.resumeFileName || '',
      resumeFileSize: body.resumeFileSize || '',
      linkedinUrl: (body.linkedinUrl || '').trim(),
      portfolioUrl: (body.portfolioUrl || '').trim(),
      linkedinPortfolio: resumeLink.trim(), // backward compatibility
      coverNote: body.coverNote || '',
      company: 'Ecovista Global Private Limited',
      brand: 'EcoFone',
      hrRecipient: HR_EMAIL,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    // 1. Persist to PostgreSQL backend database
    try {
      const backendUrl = process.env.BACKEND_URL || process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:4012';
      await fetch(`${backendUrl.replace(/\/+$/, '')}/api/v1/career/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp),
      });
    } catch (dbErr: any) {
      console.warn('[Careers] Direct backend DB persistence warning:', dbErr?.message);
    }

    apps.unshift(newApp);
    await saveApplications(apps);

    // Direct background email dispatch to HR (future@ecofone.co.in)
    const emailResult = await dispatchEmailToHr(newApp);

    return NextResponse.json({
      success: true,
      application: newApp,
      hrRecipient: HR_EMAIL,
      emailDispatched: emailResult.sent
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Application ID required' }, { status: 400 });
    }
    const apps = await getApplications();
    const index = apps.findIndex((a: any) => a.id === body.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }
    apps[index] = {
      ...apps[index],
      ...body
    };
    await saveApplications(apps);
    return NextResponse.json({ success: true, application: apps[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Application ID required' }, { status: 400 });
    }
    let apps = await getApplications();
    apps = apps.filter((a: any) => a.id !== id);
    await saveApplications(apps);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
