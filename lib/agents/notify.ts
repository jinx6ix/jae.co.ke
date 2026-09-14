
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

import nodemailer from 'nodemailer';

type NotificationTransporter = ReturnType<typeof nodemailer.createTransport>;

let transporter: NotificationTransporter | null = null;
let transporterSignature: string | null = null;

function getTransporter(): NotificationTransporter {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      'SMTP_HOST / SMTP_USER / SMTP_PASS are not set — cannot send email notifications.',
    );
  }

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error(`Invalid SMTP_PORT: ${process.env.SMTP_PORT}`);
  }

  // Re-create the transporter if environment configuration changes.
  const signature = `${host}|${port}|${user}|${pass}`;

  if (transporter && transporterSignature === signature) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },

    // Fail reasonably quickly instead of allowing an agent notification
    // to hang for a long time.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  transporterSignature = signature;

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

  const from = process.env.SMTP_USER?.trim();

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
