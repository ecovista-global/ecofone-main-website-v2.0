import path from 'path';

export function getEmailLogoAttachment() {
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  return {
    filename: 'ecofone-logo.png',
    path: logoPath,
    cid: 'ecofonelogo'
  };
}

interface EmailCardOptions {
  headerTitle: string; // e.g. "EcoFone Support" or "EcoFone Careers" or "EcoFone Franchise"
  badgeText?: string; // e.g. "HQ INQUIRY" or "JOB APPLICATION" or "FRANCHISE LEAD"
  recipientGreeting: string; // e.g. "Dear Aarav Sharma,"
  introMessage: string;
  highlightBoxContent?: string; // e.g. '"Quote / Message"'
  detailRows?: { label: string; value: string; isLink?: boolean; linkType?: 'mail' | 'tel' | 'url' }[];
  mainBodyNotes?: string;
  signoffTeam: string; // e.g. "EcoFone Customer Care Team"
  signoffContactLine?: string; // e.g. "Email: business@ecofone.co.in • Helpline: +91 99199 65499"
  isAutoReply?: boolean;
}

export function buildEcoFoneEmailHtml(opts: EmailCardOptions): string {
  const {
    headerTitle,
    badgeText,
    recipientGreeting,
    introMessage,
    highlightBoxContent,
    detailRows = [],
    mainBodyNotes,
    signoffTeam,
    signoffContactLine = 'Email: business@ecofone.co.in • Helpline: +91 99199 65499',
    isAutoReply = false
  } = opts;

  const detailRowsHtml = detailRows.length > 0
    ? `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 22px 0;">
        ${detailRows.map(row => `
          <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #edf2f7;">
            <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">${row.label}</div>
            <div style="font-size: 14px; font-weight: 600; color: #0f172a; word-break: break-word;">
              ${row.isLink && row.linkType === 'mail'
                ? `<a href="mailto:${row.value}" style="color: #0d9488; text-decoration: none;">${row.value}</a>`
                : row.isLink && row.linkType === 'tel'
                ? `<a href="tel:${row.value}" style="color: #0d9488; text-decoration: none;">${row.value}</a>`
                : row.isLink && row.linkType === 'url'
                ? `<a href="${row.value}" target="_blank" style="color: #0d9488; text-decoration: none;">${row.value}</a>`
                : row.value
              }
            </div>
          </div>
        `).join('')}
      </div>
    `
    : '';

  const highlightHtml = highlightBoxContent
    ? `
      <div style="background-color: #f2fbf6; border-left: 4px solid #ea580c; border-radius: 10px; padding: 16px 20px; margin: 20px 0; font-size: 14px; color: #334155; line-height: 1.6; font-style: italic;">
        ${highlightBoxContent}
      </div>
    `
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headerTitle}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eef2f6; margin: 0; padding: 32px 16px; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0;">
    
    <!-- BRAND HEADER WITH LOGO & FOREST GREEN THEME -->
    <div style="background: linear-gradient(135deg, #052e16 0%, #064e3b 55%, #047857 100%); padding: 26px 30px; position: relative;">
      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
        <tr>
          <td style="vertical-align: middle;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align: middle; padding-right: 14px;">
                  <img src="cid:ecofonelogo" alt="EcoFone Logo" height="36" style="height: 36px; max-height: 36px; width: auto; display: block; border: 0; border-radius: 6px;" />
                </td>
                <td style="vertical-align: middle;">
                  <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; line-height: 1.2;">
                    ${headerTitle}
                  </div>
                  <div style="height: 3.5px; width: 72px; background-color: #ea580c; border-radius: 2px; margin-top: 6px;"></div>
                </td>
              </tr>
            </table>
          </td>
          ${badgeText ? `
          <td style="text-align: right; vertical-align: middle;">
            <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.15); color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.06em; border: 1px solid rgba(255, 255, 255, 0.2);">
              ${badgeText}
            </span>
          </td>
          ` : ''}
        </tr>
      </table>
    </div>

    <!-- MAIN BODY CONTENT -->
    <div style="padding: 34px 30px 28px 30px; background-color: #ffffff;">
      <div style="font-size: 19px; font-weight: 700; color: #0f172a; margin-bottom: 14px; letter-spacing: -0.01em;">
        ${recipientGreeting}
      </div>

      <div style="font-size: 14px; line-height: 1.65; color: #334155; margin-bottom: 16px;">
        ${introMessage}
      </div>

      ${highlightHtml}
      ${detailRowsHtml}

      ${mainBodyNotes ? `
        <div style="font-size: 14px; line-height: 1.65; color: #334155; margin: 18px 0;">
          ${mainBodyNotes}
        </div>
      ` : ''}

      <!-- SIGN-OFF SECTION -->
      <div style="margin-top: 26px; padding-top: 18px; border-top: 1px solid #f1f5f9;">
        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">Warm regards,</div>
        <div style="font-size: 15px; font-weight: 800; color: #0f172a;">${signoffTeam}</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 5px; line-height: 1.5;">
          ${signoffContactLine.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" style="color: #ea580c; text-decoration: none; font-weight: 600;">$1</a>')}
        </div>
      </div>
    </div>

    <!-- CLEAN GREY FOOTER -->
    <div style="padding: 16px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; line-height: 1.5;">
      ${isAutoReply
        ? 'This is an automated delivery confirmation. Please do not reply directly to this email.'
        : 'Delivered securely in real-time from the EcoFone Online Operations Portal.'
      }
    </div>

  </div>
</body>
</html>
  `.trim();
}
