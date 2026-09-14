// lib/email/smtp.ts
// Shared SMTP transport for all JaeTravel transactional emails.

import nodemailer from "nodemailer";

export type SiteSmtpTransporter = ReturnType<typeof nodemailer.createTransport>;

let transporter: SiteSmtpTransporter | null = null;
let configKey: string | null = null;

export function getSiteSmtpTransporter(): SiteSmtpTransporter | null {
  const host = process.env.SITE_SMTP_HOST?.trim();
  const port = Number(process.env.SITE_SMTP_PORT || 465);
  const user = process.env.SITE_SMTP_USER?.trim();
  const pass = process.env.SITE_SMTP_PASS;
  if (!host || !user || !pass) {
    console.error("[smtp] Missing SITE_SMTP_HOST, SITE_SMTP_USER or SITE_SMTP_PASS");
    return null;
  }
  if (!Number.isFinite(port) || port <= 0) {
    console.error("[smtp] Invalid SITE_SMTP_PORT:", process.env.SITE_SMTP_PORT);
    return null;
  }
  const key = `${host}|${port}|${user}|${pass}`;
  if (transporter && configKey === key) return transporter;
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    ...(port === 587 ? { requireTLS: true } : {}),
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  configKey = key;
  return transporter;
}

export function resetSiteSmtpTransporter(): void {
  transporter = null;
  configKey = null;
}

export function getSiteSmtpFrom(): string | null {
  return process.env.SITE_SMTP_USER?.trim() || null;
}
