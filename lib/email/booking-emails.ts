// lib/email/booking-emails.ts
//
// Shared email + WhatsApp helper for the site's booking / inquiry /
// transfer flows. Used by the four route handlers under
// app/api/{site-inquiries, transfers, inquiries, public/quote}.
//
// What it does:
//   1. Lazily creates a single nodemailer transporter from SITE_SMTP_*
//      env vars (same pattern as lib/agents/notify.ts).
//   2. Renders three messages from one BookingEmailInput:
//        - the customer confirmation (orange template)
//        - an internal-team copy sent to info@jaetravel.co.ke
//        - an internal-team copy sent to it@jaetravel.co.ke
//   3. Sends a WhatsApp message to the company phone via the CallMeBot
//      API so the team gets pinged on the channel they actually watch.
//   4. Sends everything with Promise.allSettled so one failed recipient
//      doesn't abort the others, and returns a per-recipient status.
//
// The two admin copies share the same body (booking summary + WhatsApp
// link) so info@ and it@ each see the same booking; only the `to:` field
// differs. This keeps the operator inboxes in sync.

import nodemailer from 'nodemailer';

export type EmailStatus = 'sent' | 'failed' | 'skipped';

export interface EmailDispatchStatus {
  client: EmailStatus;
  info: EmailStatus;
  it: EmailStatus;
  /** Company WhatsApp number notification. */
  whatsapp: EmailStatus;
}

export type BookingKind = 'tour' | 'transfer' | 'inquiry' | 'quote';

export interface BookingEmailInput {
  /** Prefixed ID, e.g. "BK1700000000-AB12CD34" or "TR..." or "INQ..." */
  bookingId: string;
  /** What kind of booking this is — drives the subject line + phrasing. */
  bookingKind: BookingKind;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  service: {
    name: string;
    /** ISO date or human-readable — only used for display. */
    startDate: string;
    travelers: number;
    totalPrice: number;
    specialRequirements?: string;
  };
  /** Transfer-only: pickup and drop-off locations. Omit for tours / inquiries. */
  transfer?: { pickup: string; dropoff: string };
  /** Customer-facing PDF download link (tours + transfers). */
  pdfUrl?: string;
  /** Admin-facing PDF download link (tours + transfers). */
  adminPdfUrl?: string;
  /** Pre-built wa.me/254... link (with normalized country code). */
  customerWhatsApp?: string;
  /** Static wa.me/254726485228 link. */
  adminWhatsApp: string;
  /**
   * Company phone number that should receive the WhatsApp notification.
   * Defaults to "+254726485228" — the JaeTravel reservations line.
   * Used by the CallMeBot dispatch (see `sendBookingWhatsApp`).
   */
  companyWhatsAppNumber?: string;
}

const INFO_ADDRESS = 'info@jaetravel.co.ke';
const IT_ADDRESS = 'it@jaetravel.co.ke';

let _transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
let _transporterChecked = false;

function getTransporter(): ReturnType<typeof nodemailer.createTransport> | null {
  if (_transporterChecked) return _transporter;
  _transporterChecked = true;

  const host = process.env.SITE_SMTP_HOST;
  const port = Number(process.env.SITE_SMTP_PORT) || 465;
  const user = process.env.SITE_SMTP_USER;
  const pass = process.env.SITE_SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn(
      '[booking-emails] SITE_SMTP_HOST / SITE_SMTP_USER / SITE_SMTP_PASS not set — emails will be skipped. Check Vercel env vars.',
    );
    return null;
  }

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
  return _transporter;
}

function escapeHtml(s: string | number | undefined | null): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatSubject(kind: BookingKind, id: string, who: string, what: string): string {
  switch (kind) {
    case 'transfer':
      return `Transfer Booking #${id} – ${what}`;
    case 'inquiry':
      return `Inquiry Received #${id} – Thank You!`;
    case 'quote':
      return `Quote Request #${id} – ${what}`;
    case 'tour':
    default:
      return `Booking Confirmed #${id} – ${what}`;
  }
}

function formatAdminSubject(kind: BookingKind, id: string, who: string, what: string): string {
  switch (kind) {
    case 'transfer':
      return `New Transfer #${id} – ${who}`;
    case 'inquiry':
      return `New Inquiry #${id} – ${who}`;
    case 'quote':
      return `New Quote #${id} – ${who}`;
    case 'tour':
    default:
      return `New Booking #${id} – ${who}`;
  }
}

function buildKindHeadline(kind: BookingKind): string {
  switch (kind) {
    case 'transfer': return 'Transfer Confirmed!';
    case 'inquiry': return 'Message Received!';
    case 'quote': return 'Quote Request Received!';
    case 'tour':
    default: return 'Booking Confirmed!';
  }
}

function buildKindAdminHeadline(kind: BookingKind): string {
  switch (kind) {
    case 'transfer': return 'New Transfer!';
    case 'inquiry': return 'New Inquiry!';
    case 'quote': return 'New Quote!';
    case 'tour':
    default: return 'New Booking!';
  }
}

// ---------------------------------------------------------------------
// Customer email (orange template, mirrors what's currently in the routes).
// ---------------------------------------------------------------------
function buildCustomerHtml(input: BookingEmailInput): string {
  const { bookingId, bookingKind, customer, service, transfer, pdfUrl, adminWhatsApp } = input;
  const transferBlock =
    bookingKind === 'transfer' && transfer
      ? `
        <tr><td class="label">Pickup:</td><td class="value">${escapeHtml(transfer.pickup)}</td></tr>
        <tr><td class="label">Drop-off:</td><td class="value">${escapeHtml(transfer.dropoff)}</td></tr>`
      : '';

  const pdfButton = pdfUrl
    ? `<div style="text-align:center; margin:30px 0;">
        <a href="${escapeHtml(pdfUrl)}" class="btn">Download PDF Confirmation</a>
      </div>`
    : '';

  const waLink = adminWhatsApp
    ? `<a href="${escapeHtml(adminWhatsApp)}?text=${encodeURIComponent(
        `Hi, I have booking #${bookingId}`,
      )}" class="btn btn-wa" target="_blank">Chat on WhatsApp</a>`
    : '';

  const lead = bookingKind === 'inquiry'
    ? `Thank you for reaching out! We've received your inquiry and will get back to you within <strong>24 hours</strong>.`
    : bookingKind === 'transfer'
    ? `Your <strong>${escapeHtml(service.name)}</strong> transfer is confirmed! We'll contact you within <strong>1 hour</strong>.`
    : `Your booking for <strong>${escapeHtml(service.name)}</strong> is confirmed! Our team will contact you within <strong>24 hours</strong>.`;

  const detailHeadline = bookingKind === 'inquiry'
    ? 'Your Inquiry'
    : bookingKind === 'transfer'
    ? 'Transfer Summary'
    : 'Booking Summary';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(detailHeadline)} #${escapeHtml(bookingId)}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; color: #1f2937; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #f97316, #fb923c); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .card { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px; padding: 25px; margin-bottom: 25px; }
    table { width: 100%; border-collapse: collapse; font-size: 15px; }
    td { padding: 10px 0; vertical-align: top; }
    .label { font-weight: 600; color: #92400e; width: 140px; }
    .value { color: #1f2937; }
    .highlight { background: #fef3c7; padding: 6px 12px; border-radius: 6px; font-family: 'Courier New'; font-size: 14px; }
    .btn { display: inline-block; background: #f97316; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 10px 0; box-shadow: 0 4px 12px rgba(249,115,22,0.3); }
    .btn-wa { background: #25D366; }
    .footer { background: #f3f4f6; padding: 30px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${escapeHtml(buildKindHeadline(bookingKind))}</h1>
      <p style="margin: 8px 0 0; opacity: 0.95;">JaeTravel Expeditions</p>
    </div>
    <div class="content">
      <p style="font-size: 18px; margin-bottom: 25px;">Dear <strong>${escapeHtml(customer.name)}</strong>,</p>
      <p>${lead}</p>

      <div class="card">
        <h2 style="margin: 0 0 15px; color: #92400e; font-size: 20px; border-bottom: 2px solid #fbbf24; padding-bottom: 8px;">${escapeHtml(detailHeadline)}</h2>
        <table>
          <tr><td class="label">${bookingKind === 'inquiry' ? 'ID' : 'Booking ID'}:</td><td class="value"><span class="highlight">${escapeHtml(bookingId)}</span></td></tr>
          ${bookingKind === 'inquiry'
            ? `<tr><td class="label">Interested In:</td><td class="value">${escapeHtml(service.name || 'General')}</td></tr>
               <tr><td class="label">Message:</td><td class="value" style="font-style:italic; color:#6b7280;">${escapeHtml(service.specialRequirements || '')}</td></tr>`
            : `<tr><td class="label">${bookingKind === 'transfer' ? 'Service' : 'Tour'}:</td><td class="value">${escapeHtml(service.name)}</td></tr>
               <tr><td class="label">Date:</td><td class="value">${escapeHtml(service.startDate)}</td></tr>
               <tr><td class="label">Travelers:</td><td class="value">${escapeHtml(service.travelers)} ${service.travelers > 1 ? 'persons' : 'person'}</td></tr>
               <tr><td class="label">Total:</td><td class="value" style="font-weight:700; color:#dc2626; font-size:18px;">$${Number(service.totalPrice).toLocaleString()}</td></tr>
               ${transferBlock}
               <tr><td class="label">Requests:</td><td class="value" style="font-style:italic; color:#6b7280;">${escapeHtml(service.specialRequirements || 'None')}</td></tr>`}
        </table>
      </div>

      ${pdfButton}

      <div style="background:#ecfdf5; border:1px solid #bbf7d0; border-radius:12px; padding:25px; text-align:center;">
        <h3 style="margin:0 0 15px; color:#059669; font-size:18px;">Need Help?</h3>
        <p>Chat with us instantly on WhatsApp:</p>
        ${waLink}
      </div>

      ${bookingKind === 'tour' || bookingKind === 'transfer' ? `
      <div style="margin-top:30px; padding-top:20px; border-top:1px dashed #e5e7eb; font-size:14px; color:#6b7280;">
        <p>Full payment due 30 days before departure. Travel insurance recommended.</p>
      </div>` : ''}
    </div>
    <div class="footer">
      <p style="margin:0;">© 2025 JaeTravel Expeditions | TTA/0036 | Nairobi, Kenya</p>
      <p style="margin:8px 0 0; opacity:0.8;">
        <a href="tel:+254726485228" style="color:#f97316; text-decoration:none;">+254 726 485 228</a> |
        <a href="mailto:info@jaetravel.co.ke" style="color:#f97316; text-decoration:none;">info@jaetravel.co.ke</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------
// Admin email (green template). Sent to BOTH info@ and it@ with the
// same body, so each inbox gets its own message and one SMTP failure
// doesn't kill the other copy.
// ---------------------------------------------------------------------
function buildAdminHtml(input: BookingEmailInput, recipientLabel: string): string {
  const { bookingId, bookingKind, customer, service, transfer, adminPdfUrl, customerWhatsApp } = input;

  const transferBlock =
    bookingKind === 'transfer' && transfer
      ? `<tr><td class="label">Pickup:</td><td class="value">${escapeHtml(transfer.pickup)}</td></tr>
         <tr><td class="label">Drop-off:</td><td class="value">${escapeHtml(transfer.dropoff)}</td></tr>`
      : '';

  const detailHeadline = bookingKind === 'inquiry'
    ? 'Message'
    : bookingKind === 'transfer'
    ? 'Transfer Details'
    : 'Booking Summary';

  const serviceLabel = bookingKind === 'inquiry' ? 'Interested In' : (bookingKind === 'transfer' ? 'Service' : 'Tour');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(buildKindAdminHeadline(bookingKind))} #${escapeHtml(bookingId)}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; color: #1f2937; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 25px; margin-bottom: 25px; }
    table { width: 100%; border-collapse: collapse; font-size: 15px; }
    td { padding: 10px 0; vertical-align: top; }
    .label { font-weight: 600; color: #166534; width: 120px; }
    .value { color: #065f46; }
    .highlight { background: #d1fae5; padding: 6px 12px; border-radius: 6px; font-family: 'Courier New'; }
    .btn { display: inline-block; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 8px 4px; }
    .btn-wa { background: #25D366; }
    .btn-pdf { background: #f97316; }
    .footer { background: #f3f4f6; padding: 25px; text-align: center; font-size: 13px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${escapeHtml(buildKindAdminHeadline(bookingKind))}</h1>
      <p style="margin: 8px 0 0; opacity: 0.95;">JaeTravel Expeditions <span style="opacity:0.7; font-size:14px;">(copy to ${escapeHtml(recipientLabel)})</span></p>
    </div>
    <div class="content">
      <h2 style="margin:0 0 20px; color:#059669; font-size:24px;">${bookingKind === 'inquiry' ? 'Customer' : 'Customer Details'}</h2>
      <div class="card">
        <table>
          <tr><td class="label">Name:</td><td class="value"><strong>${escapeHtml(customer.name)}</strong></td></tr>
          <tr><td class="label">Email:</td><td class="value"><a href="mailto:${escapeHtml(customer.email)}" style="color:#059669;">${escapeHtml(customer.email)}</a></td></tr>
          <tr><td class="label">Phone:</td><td class="value"><a href="tel:${escapeHtml(customer.phone)}" style="color:#059669;">${escapeHtml(customer.phone)}</a></td></tr>
        </table>
      </div>

      <h2 style="margin:0 0 20px; color:#059669; font-size:24px;">${escapeHtml(detailHeadline)}</h2>
      <div class="card">
        <table>
          <tr><td class="label">ID:</td><td class="value"><span class="highlight">${escapeHtml(bookingId)}</span></td></tr>
          ${bookingKind === 'inquiry'
            ? `<tr><td class="label">${escapeHtml(serviceLabel)}:</td><td class="value">${escapeHtml(service.name || 'General')}</td></tr>
               <tr><td class="label">Message:</td><td class="value" style="font-style:italic; color:#6b7280;">${escapeHtml(service.specialRequirements || '')}</td></tr>`
            : `<tr><td class="label">${escapeHtml(serviceLabel)}:</td><td class="value"><strong>${escapeHtml(service.name)}</strong></td></tr>
               <tr><td class="label">Date:</td><td class="value">${escapeHtml(service.startDate)}</td></tr>
               <tr><td class="label">Travelers:</td><td class="value">${escapeHtml(service.travelers)}</td></tr>
               <tr><td class="label">Total:</td><td class="value" style="font-weight:700; color:#059669; font-size:18px;">$${Number(service.totalPrice).toLocaleString()}</td></tr>
               ${transferBlock}
               <tr><td class="label">Requests:</td><td class="value" style="font-style:italic; color:#6b7280;">${escapeHtml(service.specialRequirements || 'None')}</td></tr>`}
        </table>
      </div>

      <div style="text-align:center; margin:30px 0;">
        ${adminPdfUrl ? `<a href="${escapeHtml(adminPdfUrl)}" class="btn btn-pdf" target="_blank">Download Admin PDF</a>` : ''}
        ${customerWhatsApp ? `<a href="${escapeHtml(customerWhatsApp)}?text=${encodeURIComponent(
          bookingKind === 'inquiry'
            ? `Hi ${customer.name}, thanks for your inquiry!`
            : `Hi ${customer.name}, your ${bookingKind === 'transfer' ? 'transfer' : 'booking'} #${bookingId} is confirmed!`,
        )}" class="btn btn-wa" target="_blank">Contact Customer</a>` : ''}
      </div>

      <p style="font-size:14px; color:#6b7280; text-align:center; font-style:italic;">
        Submitted: ${new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })}
      </p>
    </div>
    <div class="footer">
      <p>JaeTravel Expeditions Booking System</p>
      <p style="margin:8px 0 0; opacity:0.8;">Licensed Tour Operator | TTA/0036</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Build the human-readable WhatsApp message text that gets sent to the
 * company phone for every new booking. Kept short because WhatsApp previews
 * look best under ~600 chars, and because some gateways truncate at 1024.
 */
function buildBookingWhatsAppText(input: BookingEmailInput): string {
  const { bookingId, bookingKind, customer, service, transfer } = input;
  const kindLabel =
    bookingKind === 'transfer' ? 'Transfer'
    : bookingKind === 'inquiry' ? 'Inquiry'
    : bookingKind === 'quote' ? 'Quote'
    : 'Booking';

  const transferLine = bookingKind === 'transfer' && transfer
    ? `🚐 ${transfer.pickup} → ${transfer.dropoff}\n`
    : '';

  const reqLine = service.specialRequirements
    ? `\n📝 Notes: ${service.specialRequirements}`
    : '';

  return [
    `🆕 *New ${kindLabel} #${bookingId}*`,
    ``,
    `👤 ${customer.name}`,
    `📧 ${customer.email}`,
    `📞 ${customer.phone}`,
    ``,
    `🏞️ ${service.name}`,
    `📅 ${service.startDate}`,
    `👥 ${service.travelers} traveler${service.travelers > 1 ? 's' : ''}`,
    `💰 $${Number(service.totalPrice).toLocaleString()}`,
    transferLine.trimEnd(),
    reqLine,
  ].filter((l) => l !== '').join('\n').trimEnd();
}

/**
 * Send a WhatsApp message to the company phone via CallMeBot's free
 * gateway (https://www.callmebot.com). To enable, the company phone must
 * be registered with CallMeBot ONE TIME:
 *
 *   1. From the company phone, send "I allow callmebot to send me messages"
 *      via WhatsApp to +34 644 59 71 47.
 *   2. CallMeBot replies with an API key.
 *   3. Set CALLMEBOT_API_KEY=<that-key> in the env (Vercel dashboard +
 *      .env). Also set CALLMEBOT_PHONE if the company phone is not the
 *      default +254726485228.
 *
 * If CALLMEBOT_API_KEY is missing or CallMeBot returns a non-2xx, the
 * function returns 'skipped' or 'failed' so the rest of the booking
 * flow continues normally — the email send is the authoritative channel.
 */
async function sendBookingWhatsApp(
  input: BookingEmailInput,
): Promise<EmailStatus> {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) {
    return 'skipped';
  }
  const phone = (input.companyWhatsAppNumber || '+254726485228').replace(/[^0-9]/g, '');
  const text = buildBookingWhatsAppText(input);

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { method: 'GET', cache: 'no-store' });
    if (!res.ok) {
      console.error(`[booking-whatsapp] CallMeBot HTTP ${res.status} for ${input.bookingId}`);
      return 'failed';
    }
    const body = await res.text();
    if (!/message\s*sent/i.test(body)) {
      console.error(`[booking-whatsapp] CallMeBot unexpected response for ${input.bookingId}: ${body.slice(0, 200)}`);
      return 'failed';
    }
    return 'sent';
  } catch (err: any) {
    console.error(`[booking-whatsapp] CallMeBot fetch failed for ${input.bookingId}:`, err?.message);
    return 'failed';
  }
}

/**
 * Send the three confirmation emails + the company WhatsApp notification
 * for a booking. Safe to call when neither channel is configured — every
 * status will come back as `'skipped'`.
 *
 * Returns per-recipient status so the caller can surface it in the API
 * response and (optionally) the UI.
 */
export async function sendBookingEmails(input: BookingEmailInput): Promise<EmailDispatchStatus> {
  const fromAddress = process.env.SITE_SMTP_USER || 'noreply@jaetravel.co.ke';
  const transporter = getTransporter();

  if (!transporter) {
    // No SMTP, but we can still try the WhatsApp channel independently.
    const whatsappStatus = await sendBookingWhatsApp(input);
    return { client: 'skipped', info: 'skipped', it: 'skipped', whatsapp: whatsappStatus };
  }

  const customerSubject = formatSubject(input.bookingKind, input.bookingId, input.customer.name, input.service.name);
  const adminSubject = formatAdminSubject(input.bookingKind, input.bookingId, input.customer.name, input.service.name);

  const customerHtml = buildCustomerHtml(input);
  const infoHtml = buildAdminHtml(input, 'info@');
  const itHtml = buildAdminHtml(input, 'it@');

  const customerMsg = {
    from: `"JaeTravel Expeditions" <${fromAddress}>`,
    to: input.customer.email,
    subject: customerSubject,
    html: customerHtml,
  };

  const infoMsg = {
    from: `"JaeTravel Expeditions" <${fromAddress}>`,
    to: INFO_ADDRESS,
    subject: adminSubject,
    html: infoHtml,
  };

  const itMsg = {
    from: `"JaeTravel Expeditions" <${fromAddress}>`,
    to: IT_ADDRESS,
    subject: adminSubject,
    html: itHtml,
  };

  const [custRes, infoRes, itRes, whatsappRes] = await Promise.allSettled([
    transporter.sendMail(customerMsg),
    transporter.sendMail(infoMsg),
    transporter.sendMail(itMsg),
    sendBookingWhatsApp(input),
  ]);

  const toStatus = (r: PromiseSettledResult<unknown>): EmailStatus =>
    r.status === 'fulfilled' ? 'sent' : 'failed';

  if (custRes.status === 'rejected') console.error('[booking-emails] customer send failed:', (custRes as PromiseRejectedResult).reason?.message);
  if (infoRes.status === 'rejected') console.error('[booking-emails] info@ send failed:', (infoRes as PromiseRejectedResult).reason?.message);
  if (itRes.status === 'rejected') console.error('[booking-emails] it@ send failed:', (itRes as PromiseRejectedResult).reason?.message);

  console.log(
    `[booking-emails] ${input.bookingId} → client:${toStatus(custRes)} info@:${toStatus(infoRes)} it@:${toStatus(itRes)} whatsapp:${toStatus(whatsappRes)}`,
  );

  return {
    client: toStatus(custRes),
    info: toStatus(infoRes),
    it: toStatus(itRes),
    whatsapp: toStatus(whatsappRes),
  };
}
