import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { checkRateLimit } from '../../../lib/rate-limit';
import { buildEcoFoneEmailHtml, getEmailLogoAttachment } from '../../../lib/email-templates';
import { verifyAdminAuth } from '../../../lib/auth-guard';

const DATA_FILE = path.join(process.cwd(), 'data', 'contact_messages.json');

function getMessages() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading contact messages file:', err);
  }
  return [];
}

function saveMessages(messages: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing contact messages file:', err);
  }
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
    const res = await fetch(`${backendUrl.replace(/\/+$/, '')}/api/v1/contact`, {
      headers: { ...(authHeader && { Authorization: authHeader }) },
      cache: 'no-store',
    });
    if (res.ok) {
      const dbMessages = await res.json();
      if (Array.isArray(dbMessages) && dbMessages.length > 0) {
        return NextResponse.json(dbMessages);
      }
    }
  } catch (err: any) {
    console.warn('[Contact] Backend DB fetch warning, using local fallback:', err?.message);
  }

  const messages = getMessages();
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  try {
    // 0. Rate limiting guard (Max 5 requests per 10 minutes per IP)
    const rateLimit = checkRateLimit(req, { prefix: 'contact', maxRequests: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.isAllowed) {
      return NextResponse.json(
        { success: false, error: `Too many submissions. Please wait ${rateLimit.retryAfterSeconds} seconds before submitting again.` },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await req.json();
    const { name, applicantName, email, phone, message, experienceDesc, location, locationPreference } = body;

    const contactName = name || applicantName || 'Inquirer';
    const contactEmail = email || '';
    const contactPhone = phone || '';
    const contactMessage = message || experienceDesc || '';
    const contactLocation = location || locationPreference || 'Lucknow HQ Inquiry';

    // 1. Persist to PostgreSQL backend database
    try {
      const backendUrl = process.env.BACKEND_URL || process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:4012';
      await fetch(`${backendUrl.replace(/\/+$/, '')}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: contactName,
          email: contactEmail,
          phone: contactPhone,
          locationPreference: contactLocation,
          investmentCapacity: 0,
          experienceDesc: contactMessage,
        }),
      });
    } catch (dbErr: any) {
      console.warn('[Contact] Backend DB persistence warning:', dbErr?.message);
    }

    // 2. Also save to local storage as safety backup
    const messages = getMessages();
    const newMessage = {
      id: `contact-${Date.now()}`,
      applicantName: contactName,
      email: contactEmail,
      phone: contactPhone,
      locationPreference: contactLocation,
      investmentCapacity: 0,
      experienceDesc: contactMessage,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    messages.unshift(newMessage);
    saveMessages(messages);

    // 2. Dispatch Zoho SMTP email (from business@ecofone.co.in)
    const smtpHost = process.env.BUSINESS_SMTP_HOST || process.env.SMTP_HOST || 'smtp.zoho.in';
    const smtpPort = process.env.BUSINESS_SMTP_PORT ? parseInt(process.env.BUSINESS_SMTP_PORT) : (process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465);
    const smtpUser = process.env.BUSINESS_SMTP_USER || 'business@ecofone.co.in';
    const smtpPass = process.env.BUSINESS_SMTP_PASS;

    // Target: ONLY business@ecofone.co.in
    const recipientEmails = process.env.BUSINESS_EMAIL || 'business@ecofone.co.in';

    // Internal Notification Email for EcoFone Business Team
    const internalEmailHtml = buildEcoFoneEmailHtml({
      headerTitle: 'EcoFone Business',
      badgeText: 'HQ INQUIRY',
      recipientGreeting: `New Inquiry from ${contactName}`,
      introMessage: `A new contact message has been submitted via the website contact portal. Please coordinate with the customer.`,
      highlightBoxContent: `"${contactMessage || 'No inquiry text provided.'}"`,
      detailRows: [
        { label: 'Customer Name', value: contactName },
        { label: 'Email Address', value: contactEmail, isLink: true, linkType: 'mail' },
        { label: 'Phone Number', value: contactPhone, isLink: true, linkType: 'tel' },
        { label: 'Location / Region', value: contactLocation }
      ],
      signoffTeam: 'EcoFone Business Team',
      signoffContactLine: 'Portal Lead Desk • Lucknow HQ'
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

        // 1. Send Internal Notification to business@ecofone.co.in
        await transporter.sendMail({
          from: `"EcoFone Business" <${smtpUser}>`,
          to: recipientEmails,
          replyTo: contactEmail || recipientEmails,
          subject: `[Contact Query] ${contactName} - EcoFone HQ`,
          html: internalEmailHtml,
          text: `New contact inquiry from ${contactName}\n\nEmail: ${contactEmail}\nPhone: ${contactPhone}\n\nMessage:\n${contactMessage}`,
          attachments: [logoAttachment]
        });

        console.log(`[Contact SMTP Mailer] Inquiry from ${contactName} successfully emailed to ${recipientEmails}`);

        // 2. Auto-reply delivery confirmation to the customer
        if (contactEmail && contactEmail.includes('@')) {
          try {
            const customerAutoReplyHtml = buildEcoFoneEmailHtml({
              headerTitle: 'EcoFone Business',
              recipientGreeting: `Dear ${contactName},`,
              introMessage: `Thank you for contacting <strong>EcoFone</strong>! We have successfully received your inquiry, and our team has created a ticket for you.`,
              highlightBoxContent: `"${contactMessage || 'Thank you for reaching out.'}"`,
              mainBodyNotes: `Our business support team is actively reviewing your request. A representative will get back to you within <strong>24 business hours</strong>.`,
              signoffTeam: 'EcoFone Business Team',
              signoffContactLine: 'Email: business@ecofone.co.in • Helpline: +91 99199 65499',
              isAutoReply: true
            });

            await transporter.sendMail({
              from: `"EcoFone Business" <${smtpUser}>`,
              to: contactEmail,
              subject: `We Received Your Message - EcoFone Business`,
              html: customerAutoReplyHtml,
              text: `Dear ${contactName},\n\nThank you for contacting EcoFone! We have successfully received your inquiry: "${contactMessage}"\n\nOur business team is actively reviewing your request. A representative will get back to you within 24 business hours.\n\nWarm regards,\nEcoFone Business Team\nEmail: business@ecofone.co.in • Helpline: +91 99199 65499`,
              attachments: [logoAttachment]
            });
            console.log(`[Auto-Responder] Confirmation email sent to inquirer: ${contactEmail}`);
          } catch (autoErr: any) {
            console.warn('[Auto-Responder] Failed to send customer confirmation:', autoErr.message);
          }
        }

        return NextResponse.json({ success: true, item: newMessage, emailDispatched: true, recipients: recipientEmails });
      } catch (err: any) {
        console.error('[Contact SMTP Mailer] Error sending email:', err.message);
        return NextResponse.json({ success: true, item: newMessage, emailDispatched: false, error: err.message });
      }
    }

    console.log(`[Contact Form] Query recorded from ${contactName} (${contactEmail})`);
    return NextResponse.json({ success: true, item: newMessage, emailDispatched: false, note: 'SMTP credentials missing' });
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

    const { id, status } = await req.json();
    const messages = getMessages();
    const index = messages.findIndex((m: any) => m.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    messages[index].status = status;
    saveMessages(messages);
    return NextResponse.json({ success: true, item: messages[index] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const clearAll = url.searchParams.get('clearAll');

    if (clearAll === 'true') {
      saveMessages([]);
      return NextResponse.json({ success: true, count: 0 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const messages = getMessages();
    const filtered = messages.filter((m: any) => m.id !== id);
    saveMessages(filtered);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
