import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkRateLimit } from '../../../../lib/rate-limit';
import { buildEcoFoneEmailHtml, getEmailLogoAttachment } from '../../../../lib/email-templates';

export async function POST(req: Request) {
  try {
    // 0. Rate limiting guard (Max 5 requests per 10 minutes per IP)
    const rateLimit = checkRateLimit(req, { prefix: 'franchise_lead', maxRequests: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.isAllowed) {
      return NextResponse.json(
        { success: false, error: `Too many submissions. Please wait ${rateLimit.retryAfterSeconds} seconds before submitting again.` },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await req.json();
    const { name, phone, email, city, state, budget, ownSpace, franchiseType, message } = body;

    const applicantName = name || 'Franchise Partner Applicant';
    const applicantEmail = email || '';
    const applicantPhone = phone || '';
    const location = `${city || ''}, ${state || ''}`.trim() || 'Not specified';
    const investmentBudget = budget || 'Not specified';
    const model = franchiseType || 'Standard Model';
    const space = ownSpace || 'Not specified';
    const userMessage = message || 'None';

    const smtpHost = process.env.BUSINESS_SMTP_HOST || 'smtp.zoho.in';
    const smtpPort = process.env.BUSINESS_SMTP_PORT ? parseInt(process.env.BUSINESS_SMTP_PORT) : 465;
    const smtpUser = process.env.BUSINESS_SMTP_USER || 'business@ecofone.co.in';
    const smtpPass = process.env.BUSINESS_SMTP_PASS;
    const recipientEmail = process.env.BUSINESS_EMAIL || 'business@ecofone.co.in';

    // Internal Notification Email for EcoFone Business Relations Team
    const internalEmailHtml = buildEcoFoneEmailHtml({
      headerTitle: 'EcoFone Business',
      badgeText: 'FRANCHISE LEAD',
      recipientGreeting: `New Franchise Inquiry from ${applicantName}`,
      introMessage: `A new prospective partner has submitted an expression of interest for the EcoFone Smartphone Retail Franchise network. Details below:`,
      highlightBoxContent: `Investment: ₹${investmentBudget} • Model: ${model} • Space: ${space}`,
      detailRows: [
        { label: 'Applicant Name', value: applicantName },
        { label: 'Phone Number', value: applicantPhone, isLink: true, linkType: 'tel' },
        { label: 'Email Address', value: applicantEmail, isLink: true, linkType: 'mail' },
        { label: 'Preferred Location', value: location },
        { label: 'Investment Budget', value: `₹${investmentBudget}` },
        { label: 'Franchise Model', value: model },
        { label: 'Retail Space', value: space },
        { label: 'Background / Message', value: userMessage }
      ],
      signoffTeam: 'EcoFone Business Team',
      signoffContactLine: 'Business Operations • Corporate HQ, Lucknow'
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
          to: recipientEmail,
          replyTo: applicantEmail || recipientEmail,
          subject: `[Franchise Lead] ${applicantName} - ₹${investmentBudget} (${location})`,
          html: internalEmailHtml,
          text: `New Franchise Lead:\nName: ${applicantName}\nPhone: ${applicantPhone}\nEmail: ${applicantEmail}\nLocation: ${location}\nBudget: ₹${investmentBudget}\nModel: ${model}\nSpace: ${space}\nMessage: ${userMessage}`,
          attachments: [logoAttachment]
        });

        console.log(`[Franchise SMTP Mailer] Lead from ${applicantName} emailed to ${recipientEmail}`);

        // 2. Auto-reply delivery confirmation to the franchise applicant
        if (applicantEmail && applicantEmail.includes('@')) {
          try {
            const franchiseAutoReplyHtml = buildEcoFoneEmailHtml({
              headerTitle: 'EcoFone Business',
              badgeText: 'FRANCHISE',
              recipientGreeting: `Dear ${applicantName},`,
              introMessage: `Thank you for your interest in joining <strong>EcoFone's Smartphone Retail Franchise Network</strong>! We have successfully received your partnership inquiry for <strong>${location}</strong>.`,
              highlightBoxContent: `Preferred Region: ${location} • Model: ${model} • Investment: ₹${investmentBudget}`,
              mainBodyNotes: `Our Franchise Expansion team is actively reviewing your location and territory feasibility. An area development manager will contact you within <strong>24 to 48 business hours</strong> to share the detailed franchise deck, financial ROI model, and store setup roadmap.`,
              signoffTeam: 'EcoFone Business Team',
              signoffContactLine: 'Email: business@ecofone.co.in • Corporate HQ, Lucknow',
              isAutoReply: true
            });

            await transporter.sendMail({
              from: `"EcoFone Business" <${smtpUser}>`,
              to: applicantEmail,
              subject: `Franchise Application Received - EcoFone Partner Network`,
              html: franchiseAutoReplyHtml,
              text: `Dear ${applicantName},\n\nThank you for your interest in joining the EcoFone Franchise Network!\n\nWe have received your application for ${location} (Model: ${model}, Budget: ₹${investmentBudget}).\n\nOur Franchise Relations team will review your application and reach out within 24-48 business hours.\n\nWarm regards,\nEcoFone Business Team\nEmail: business@ecofone.co.in`,
              attachments: [logoAttachment]
            });
            console.log(`[Auto-Responder] Confirmation email sent to franchise applicant: ${applicantEmail}`);
          } catch (autoErr: any) {
            console.warn('[Auto-Responder] Failed to send franchise applicant confirmation:', autoErr.message);
          }
        }

        return NextResponse.json({ success: true, emailDispatched: true });
      } catch (mailErr: any) {
        console.error('[Franchise SMTP Mailer] Error sending email:', mailErr.message);
        return NextResponse.json({ success: true, emailDispatched: false, error: mailErr.message });
      }
    }

    return NextResponse.json({ success: true, emailDispatched: false });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
