import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured in environment variables.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'eshaniqbal9090@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'DataNavigate Portal <notifications@datanavigate.co.uk>';

    const formData = await req.formData();
    const formType = (formData.get('formType') as string) || 'application';

    // =========================================================================
    // 1. CONTACT & HIRING INQUIRY FORM
    // =========================================================================
    if (formType === 'contact') {
      const name = (formData.get('name') as string) || 'Client';
      const email = (formData.get('email') as string) || 'No email provided';
      const inquiryType = (formData.get('inquiryType') as string) || 'Hiring Inquiry';
      const message = (formData.get('message') as string) || '';

      // Send to Admin / Team
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `[Inquiry] ${inquiryType} - ${name}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry</title>
</head>
<body style="margin: 0; padding: 30px 10px; background-color: #FAF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E8E5DF; box-shadow: 0 10px 30px rgba(25, 25, 25, 0.04);">
    <!-- Header -->
    <tr>
      <td style="padding: 32px 36px 28px; background-color: #12161F; background-image: linear-gradient(145deg, #12161F 0%, #1A2130 100%);">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              <span style="display: inline-block; padding: 4px 10px; background: rgba(0, 210, 133, 0.15); color: #00D285; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; border-radius: 9999px; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(0, 210, 133, 0.3);">
                Client & Hiring Inquiry
              </span>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">
                DataNavigate <span style="color: #00D285; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">LIMITED</span>
              </h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 36px 36px 24px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid #F0ECE1;">
              <span style="font-size: 12px; font-weight: 700; color: #827E77; text-transform: uppercase; letter-spacing: 0.05em;">Inquiry Category</span>
              <div style="margin-top: 4px; font-size: 16px; font-weight: 700; color: #191919;">${inquiryType}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 0; border-bottom: 1px solid #F0ECE1;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="50%" style="vertical-align: top; padding-right: 12px;">
                    <span style="font-size: 12px; font-weight: 700; color: #827E77; text-transform: uppercase;">From</span>
                    <div style="margin-top: 4px; font-size: 15px; font-weight: 600; color: #191919;">${name}</div>
                  </td>
                  <td width="50%" style="vertical-align: top; padding-left: 12px;">
                    <span style="font-size: 12px; font-weight: 700; color: #827E77; text-transform: uppercase;">Work Email</span>
                    <div style="margin-top: 4px; font-size: 15px; font-weight: 600;">
                      <a href="mailto:${email}" style="color: #026651; text-decoration: none;">${email}</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 24px;">
              <span style="font-size: 12px; font-weight: 700; color: #827E77; text-transform: uppercase; letter-spacing: 0.05em;">Message Details</span>
              <div style="margin-top: 10px; padding: 20px; background-color: #F8F7F2; border-left: 3px solid #00D285; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #2B2927; white-space: pre-wrap;">${message}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 36px 28px; background-color: #F8F7F2; border-top: 1px solid #E8E5DF; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #827E77;">
          Directly reply to this email to respond to <strong>${name}</strong> (${email}).
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data });
    }

    // =========================================================================
    // 2. CANDIDATE DOSSIER APPLICATION FORM (WITH CV ATTACHMENT)
    // =========================================================================
    const name = (formData.get('name') as string) || 'Applicant';
    const email = (formData.get('email') as string) || 'No email provided';
    const phone = (formData.get('phone') as string) || 'Not provided';
    const location = (formData.get('location') as string) || 'Not specified';
    const role = (formData.get('role') as string) || 'ServiceNow Senior Developer';
    const exp = (formData.get('exp') as string) || '5–8 Years';
    const linkedin = (formData.get('linkedin') as string) || '';
    const notes = (formData.get('notes') as string) || '';
    const modulesRaw = formData.get('selectedModules') as string;
    
    let selectedModules: string[] = [];
    try {
      if (modulesRaw) selectedModules = JSON.parse(modulesRaw);
    } catch {
      selectedModules = modulesRaw ? [modulesRaw] : [];
    }

    const file = formData.get('file') as File | null;
    const attachments: Array<{ filename: string; content: Buffer }> = [];

    if (file && typeof file.arrayBuffer === 'function') {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const moduleBadgesHtml = selectedModules.length > 0
      ? selectedModules.map(m => `
          <span style="display: inline-block; margin: 3px 4px 3px 0; padding: 5px 12px; background-color: #E6F7F2; color: #026651; font-size: 12px; font-weight: 700; border-radius: 6px; border: 1px solid #B8ECD9;">
            ${m}
          </span>
        `).join('')
      : '<span style="color: #AAA69E; font-style: italic;">No specific modules specified</span>';

    // -------------------------------------------------------------------------
    // A. Send Full Candidate Application to Admin / Seeni (With Attachment)
    // -------------------------------------------------------------------------
    const adminEmailPromise = resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[New Application] ${name} — ${role} (${exp})`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Candidate Application</title>
</head>
<body style="margin: 0; padding: 30px 10px; background-color: #FAF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E8E5DF; box-shadow: 0 12px 36px rgba(25, 25, 25, 0.05);">
    
    <!-- Executive Dark Brand Header -->
    <tr>
      <td style="padding: 36px 36px 30px; background-color: #0F141E; background-image: linear-gradient(135deg, #0B0E17 0%, #151C2C 100%);">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              <div style="display: inline-block; padding: 4px 12px; background: rgba(0, 210, 133, 0.12); color: #00D285; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; border-radius: 9999px; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(0, 210, 133, 0.28);">
                Candidate Application
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">
                ${name}
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; color: #94A3B8; font-weight: 500;">
                Target Role: <strong style="color: #E2E8F0;">${role}</strong> &bull; Experience: <strong style="color: #00D285;">${exp}</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 32px 36px;">
        
        <!-- CV Attachment Highlight Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${file ? '#F0FDF4' : '#FEF2F2'}; border: 1px solid ${file ? '#BBF7D0' : '#FECACA'}; border-radius: 10px; margin-bottom: 26px;">
          <tr>
            <td style="padding: 14px 18px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="30" style="vertical-align: middle; font-size: 20px;">
                    ${file ? '📎' : '⚠️'}
                  </td>
                  <td style="vertical-align: middle;">
                    <div style="font-size: 13px; font-weight: 700; color: ${file ? '#15803D' : '#B91C1C'};">
                      ${file ? `Attached Resume: ${file.name}` : 'No resume file attached'}
                    </div>
                    <div style="font-size: 11px; color: ${file ? '#166534' : '#991B1B'}; margin-top: 2px;">
                      ${file ? 'Document attached directly to this email ready for download' : 'Candidate did not upload an attachment'}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Profile Matrix Table -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #827E77; width: 140px; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em;">Email Address</td>
            <td style="padding: 10px 0; color: #191919; font-weight: 600;">
              <a href="mailto:${email}" style="color: #026651; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #827E77; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em; border-top: 1px solid #F5F3ED;">Phone / WhatsApp</td>
            <td style="padding: 10px 0; color: #191919; font-weight: 600; border-top: 1px solid #F5F3ED;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #827E77; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em; border-top: 1px solid #F5F3ED;">Location</td>
            <td style="padding: 10px 0; color: #191919; font-weight: 600; border-top: 1px solid #F5F3ED;">${location}</td>
          </tr>
          ${linkedin ? `
          <tr>
            <td style="padding: 10px 0; color: #827E77; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em; border-top: 1px solid #F5F3ED;">LinkedIn Profile</td>
            <td style="padding: 10px 0; border-top: 1px solid #F5F3ED;">
              <a href="${linkedin}" target="_blank" style="color: #0A66C2; text-decoration: none; font-weight: 700;">${linkedin} ↗</a>
            </td>
          </tr>` : ''}
          <tr>
            <td style="padding: 14px 0 10px; color: #827E77; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em; border-top: 1px solid #F5F3ED; vertical-align: top;">Module Mastery</td>
            <td style="padding: 14px 0 10px; border-top: 1px solid #F5F3ED;">
              ${moduleBadgesHtml}
            </td>
          </tr>
        </table>

        <!-- Candidate Notes / Highlights -->
        ${notes ? `
        <div style="margin-top: 24px; padding: 18px 20px; background-color: #FBF9F4; border: 1px solid #EFECE6; border-radius: 10px;">
          <div style="font-size: 11px; font-weight: 800; color: #827E77; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
            Candidate Brief & Highlights
          </div>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #2B2927; white-space: pre-wrap;">${notes}</p>
        </div>` : ''}

        <!-- Quick Action Reply Button -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
          <tr>
            <td align="center">
              <a href="mailto:${email}?subject=Regarding%20your%20application%20at%20DataNavigate%20Ltd" style="display: inline-block; padding: 12px 28px; background-color: #191919; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px; letter-spacing: 0.02em;">
                Reply Directly to ${name} ↵
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 36px; background-color: #F8F7F2; border-top: 1px solid #E8E5DF; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #827E77;">
          Delivered securely via <strong>DataNavigate Ltd Portal</strong>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      attachments,
    });

    // -------------------------------------------------------------------------
    // B. Send Automated Confirmation Receipt Directly to Candidate
    // -------------------------------------------------------------------------
    let candidateReceiptPromise = null;
    if (email && email.includes('@') && !email.includes('example.com')) {
      candidateReceiptPromise = resend.emails.send({
        from: fromEmail,
        to: [email],
        replyTo: toEmail,
        subject: `Application Confirmed: ${role} — DataNavigate Ltd`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 30px 10px; background-color: #FAF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E8E5DF; box-shadow: 0 12px 36px rgba(25, 25, 25, 0.05);">
    
    <!-- Brand Header -->
    <tr>
      <td style="padding: 36px 36px 28px; background-color: #0F141E; background-image: linear-gradient(135deg, #0B0E17 0%, #151C2C 100%);">
        <span style="display: inline-block; padding: 4px 10px; background: rgba(0, 210, 133, 0.15); color: #00D285; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; border-radius: 9999px; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(0, 210, 133, 0.3);">
          Application Confirmation
        </span>
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">
          DataNavigate <span style="color: #00D285; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">LIMITED</span>
        </h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 36px 36px 28px;">
        <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #191919; letter-spacing: -0.01em;">
          Hello ${name},
        </h2>
        <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #5C5852;">
          Thank you for applying to <strong>DataNavigate Ltd</strong>. Your application for <strong>${role}</strong> and CV attachment have been securely received by our recruitment & technical leadership team.
        </p>

        <!-- Process Timeline Card -->
        <div style="background-color: #F8F7F2; border: 1px solid #E8E5DF; border-radius: 12px; padding: 22px; margin: 24px 0;">
          <div style="font-size: 12px; font-weight: 800; color: #191919; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">
            What Happens Next:
          </div>

          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px;">
            <tr>
              <td width="28" style="vertical-align: top; padding-bottom: 12px; color: #00D285; font-weight: 900;">✓</td>
              <td style="vertical-align: top; padding-bottom: 12px; color: #2B2927;">
                <strong>Step 1: Application Received</strong><br>
                <span style="color: #827E77; font-size: 12px;">Profile & CV registered with our talent team.</span>
              </td>
            </tr>
            <tr>
              <td width="28" style="vertical-align: top; padding-bottom: 12px; color: #026651; font-weight: 900;">2 →</td>
              <td style="vertical-align: top; padding-bottom: 12px; color: #2B2927;">
                <strong>Step 2: Profile & Experience Review (24–48h)</strong><br>
                <span style="color: #827E77; font-size: 12px;">A ServiceNow Practice Director reviews your module certifications & experience depth.</span>
              </td>
            </tr>
            <tr>
              <td width="28" style="vertical-align: top; color: #026651; font-weight: 900;">3 →</td>
              <td style="vertical-align: top; color: #2B2927;">
                <strong>Step 3: Direct Consultation & Alignment</strong><br>
                <span style="color: #827E77; font-size: 12px;">Our team reaches out with matching enterprise platform roles.</span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Submission Summary Snapshot -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #827E77; width: 140px; font-weight: 600;">Target Role:</td>
            <td style="padding: 8px 0; color: #191919; font-weight: 700;">${role}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #827E77; font-weight: 600;">Experience:</td>
            <td style="padding: 8px 0; color: #191919; font-weight: 700;">${exp}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #827E77; font-weight: 600;">Specialization:</td>
            <td style="padding: 8px 0;">${moduleBadgesHtml}</td>
          </tr>
        </table>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #F0ECE1; font-size: 13px; color: #5C5852; line-height: 1.5;">
          Warm regards,<br>
          <strong style="color: #191919;">Talent Navigation & Advisory Team</strong><br>
          DataNavigate Limited
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 36px; background-color: #F8F7F2; border-top: 1px solid #E8E5DF; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #827E77;">
          <a href="https://www.linkedin.com/company/datanavigate" style="color: #0A66C2; text-decoration: none; font-weight: 700;">Follow DataNavigate on LinkedIn ↗</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });
    }

    const [adminResult] = await Promise.all([
      adminEmailPromise,
      candidateReceiptPromise,
    ]);

    if (adminResult.error) {
      return NextResponse.json({ error: adminResult.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: adminResult.data });
  } catch (err: any) {
    console.error('Email sending error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
