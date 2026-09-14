// lib/agents/notify.ts
//
// Shared "📢 notify" channel for agents.
//
// Modes:
//   - 'log'   → just recorded as a notify-kind AgentMessage, shown in the UI.
//   - 'email' → sent for real through SMTP.
//
// SMTP configuration is read from environment variables:
//
//   SMTP_HOST
//   SMTP_PORT
//   SMTP_USER
//   SMTP_PASS
//
// Recommended production configuration for cPanel SMTP:
//
//   SMTP_HOST=mail.jaetravel.co.ke
//   SMTP_PORT=465
//   SMTP_USER=info@jaetravel.co.ke
//   SMTP_PASS=your-mailbox-password
//
// For SMTP port 465, Nodemailer requires:
//   secure: true
//
// Do NOT use:
//   tls: { secure: true }
//
// SECURITY:
// Never hardcode SMTP credentials in source code.

import { getSiteSmtpFrom, getSiteSmtpTransporter } from '@/lib/email/smtp';

function getTransporter() {
  const transporter = getSiteSmtpTransporter();
  if (!transporter) {
    throw new Error('SITE_SMTP_HOST / SITE_SMTP_USER / SITE_SMTP_PASS are not set — cannot send email notifications.');
  }
  return transporter;
}

export async function sendNotificationEmail(
  to: string,
  subject: string,
  body: string,
): Promise<void> {
  const recipient = to.trim();

  if (!recipient) {
    throw new Error('Notification email recipient is empty.');
  }

  const from = getSiteSmtpFrom();

  if (!from) {
    throw new Error(
      'SMTP_USER is not set — cannot determine the notification sender.',
    );
  }

  const t = getTransporter();

  // Verify the SMTP connection before attempting the actual message.
  // This produces a much clearer error when the SMTP host, TLS certificate,
  // port, or credentials are incorrect.
  try {
    await t.verify();
  } catch (error: unknown) {
    const err = error as {
      name?: string;
      code?: string;
      command?: string;
      response?: string;
      responseCode?: number;
      message?: string;
    };

    console.error('[agents/notify] SMTP verification failed:', {
      name: err?.name,
      code: err?.code,
      command: err?.command,
      response: err?.response,
      responseCode: err?.responseCode,
      message: err?.message,
    });

    throw error;
  }

  await t.sendMail({
    from: `"JaeTravel Expeditions" <${from}>`,
    to: recipient,
    subject,
    text: body,
  });
}
