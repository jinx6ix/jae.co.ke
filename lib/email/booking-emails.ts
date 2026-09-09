// lib/email/booking-emails.ts
//
// Shared email + WhatsApp helper for the site's booking / inquiry /
// transfer / quote flows.
//
// Sends:
//   1. Customer confirmation
//   2. Internal copy to info@jaetravel.co.ke
//   3. Internal copy to it@jaetravel.co.ke
//   4. Optional WhatsApp notification through CallMeBot
//
// SMTP configuration:
//   SITE_SMTP_HOST
//   SITE_SMTP_PORT
//   SITE_SMTP_USER
//   SITE_SMTP_PASS
//
// Supported SMTP:
//   Port 465 = implicit SSL/TLS
//   Port 587 = STARTTLS
//
// IMPORTANT:
//   This module never logs SITE_SMTP_PASS.

import nodemailer from 'nodemailer';

export type EmailStatus = 'sent' | 'failed' | 'skipped';

export interface SmtpErrorSummary {
  code?: string;
  response?: string;
  responseCode?: number;
  message?: string;
  command?: string;
}

export interface EmailDispatchStatus {
  client: EmailStatus;
  info: EmailStatus;
  it: EmailStatus;
  whatsapp: EmailStatus;

  errors?: {
    client?: SmtpErrorSummary;
    info?: SmtpErrorSummary;
    it?: SmtpErrorSummary;
  };
}

export type BookingKind = 'tour' | 'transfer' | 'inquiry' | 'quote';

export interface BookingEmailInput {
  bookingId: string;
  bookingKind: BookingKind;

  customer: {
    name: string;
    email: string;
    phone: string;
  };

  service: {
    name: string;
    startDate: string;
    travelers: number;
    totalPrice: number;
    specialRequirements?: string;
  };

  transfer?: {
    pickup: string;
    dropoff: string;
  };

  pdfUrl?: string;
  adminPdfUrl?: string;

  customerWhatsApp?: string;
  adminWhatsApp: string;

  companyWhatsAppNumber?: string;
}

const INFO_ADDRESS = 'info@jaetravel.co.ke';
const IT_ADDRESS = 'it@jaetravel.co.ke';

// ---------------------------------------------------------------------
// SMTP transporter
// ---------------------------------------------------------------------

let _transporter: ReturnType<typeof nodemailer.createTransport> | null =
  null;

let _transporterConfigKey: string | null = null;

function getTransporter(): ReturnType<typeof nodemailer.createTransport> | null {
  const host = process.env.SITE_SMTP_HOST?.trim();
  const port = Number(process.env.SITE_SMTP_PORT) || 465;
  const user = process.env.SITE_SMTP_USER?.trim();
  const pass = process.env.SITE_SMTP_PASS;

  // Never expose the password.
  console.log('[booking-emails] SMTP configuration check:', {
    host: host || '(unset)',
    port,
    user: user || '(unset)',
    passwordConfigured: Boolean(pass),
  });

  if (!host || !user || !pass) {
    console.error(
      '[booking-emails] SMTP configuration is incomplete. Required: SITE_SMTP_HOST, SITE_SMTP_PORT, SITE_SMTP_USER, SITE_SMTP_PASS',
    );

    return null;
  }

  /*
   * Recreate the transporter if the host/port/user configuration changes.
   *
   * We intentionally do NOT use the old _transporterChecked boolean,
   * because that could permanently cache a failed/missing configuration.
   */
  const configKey = `${host}:${port}:${user}`;

  if (_transporter && _transporterConfigKey === configKey) {
    return _transporter;
  }

  const secure = port === 465;

  console.log('[booking-emails] Creating SMTP transporter:', {
    host,
    port,
    secure,
    user,
  });

  _transporter = nodemailer.createTransport({
    host,
    port,

    // 465 = SSL/TLS immediately
    // 587 = plain connection followed by STARTTLS
    secure,

    ...(port === 587
      ? {
          requireTLS: true,
        }
      : {}),

    auth: {
      user,
      pass,
    },

    /*
     * Do not disable TLS certificate validation.
     *
     * If the mail server has a certificate problem, the error will now
     * be visible in Vercel logs instead of being silently ignored.
     */
  });

  _transporterConfigKey = configKey;

  return _transporter;
}

// ---------------------------------------------------------------------
// Generic helpers
// ---------------------------------------------------------------------

function escapeHtml(
  value: string | number | undefined | null,
): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function extractError(reason: any): SmtpErrorSummary {
  return {
    code: reason?.code,
    response: reason?.response,
    responseCode: reason?.responseCode,
    message: reason?.message,
    command: reason?.command,
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------------------------------------------------------------------
// Subjects
// ---------------------------------------------------------------------

function formatSubject(
  kind: BookingKind,
  id: string,
  _who: string,
  what: string,
): string {
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

function formatAdminSubject(
  kind: BookingKind,
  id: string,
  who: string,
  _what: string,
): string {
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

// ---------------------------------------------------------------------
// Email headlines
// ---------------------------------------------------------------------

function buildKindHeadline(kind: BookingKind): string {
  switch (kind) {
    case 'transfer':
      return 'Transfer Confirmed!';

    case 'inquiry':
      return 'Message Received!';

    case 'quote':
      return 'Quote Request Received!';

    case 'tour':
    default:
      return 'Booking Confirmed!';
  }
}

function buildKindAdminHeadline(kind: BookingKind): string {
  switch (kind) {
    case 'transfer':
      return 'New Transfer!';

    case 'inquiry':
      return 'New Inquiry!';

    case 'quote':
      return 'New Quote!';

    case 'tour':
    default:
      return 'New Booking!';
  }
}

// ---------------------------------------------------------------------
// Customer email
// ---------------------------------------------------------------------

function buildCustomerHtml(
  input: BookingEmailInput,
): string {
  const {
    bookingId,
    bookingKind,
    customer,
    service,
    transfer,
    pdfUrl,
    adminWhatsApp,
  } = input;

  const transferBlock =
    bookingKind === 'transfer' && transfer
      ? `
        <tr>
          <td class="label">Pickup:</td>
          <td class="value">${escapeHtml(transfer.pickup)}</td>
        </tr>
        <tr>
          <td class="label">Drop-off:</td>
          <td class="value">${escapeHtml(transfer.dropoff)}</td>
        </tr>`
      : '';

  const pdfButton = pdfUrl
    ? `
      <div style="text-align:center; margin:30px 0;">
        <a href="${escapeHtml(
          pdfUrl,
        )}" class="btn">
          Download PDF Confirmation
        </a>
      </div>
    `
    : '';

  const waLink = adminWhatsApp
    ? `
      <a
        href="${escapeHtml(
          adminWhatsApp,
        )}?text=${encodeURIComponent(
          `Hi, I have booking #${bookingId}`,
        )}"
        class="btn btn-wa"
        target="_blank"
        rel="noopener noreferrer"
      >
        Chat on WhatsApp
      </a>
    `
    : '';

  const lead =
    bookingKind === 'inquiry'
      ? `Thank you for reaching out! We've received your inquiry and will get back to you within <strong>24 hours</strong>.`
      : bookingKind === 'transfer'
        ? `Your <strong>${escapeHtml(
            service.name,
          )}</strong> transfer is confirmed! We'll contact you within <strong>1 hour</strong>.`
        : `Your booking for <strong>${escapeHtml(
            service.name,
          )}</strong> is confirmed! Our team will contact you within <strong>24 hours</strong>.`;

  const detailHeadline =
    bookingKind === 'inquiry'
      ? 'Your Inquiry'
      : bookingKind === 'transfer'
        ? 'Transfer Summary'
        : 'Booking Summary';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>
    ${escapeHtml(detailHeadline)} #${escapeHtml(bookingId)}
  </title>

  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f9fafb;
      color: #1f2937;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #f97316, #fb923c);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }

    .content {
      padding: 40px 30px;
    }

    .card {
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 15px;
    }

    td {
      padding: 10px 0;
      vertical-align: top;
    }

    .label {
      font-weight: 600;
      color: #92400e;
      width: 140px;
    }

    .value {
      color: #1f2937;
    }

    .highlight {
      background: #fef3c7;
      padding: 6px 12px;
      border-radius: 6px;
      font-family: 'Courier New';
      font-size: 14px;
    }

    .btn {
      display: inline-block;
      background: #f97316;
      color: white;
      padding: 14px 28px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 10px 0;
      box-shadow: 0 4px 12px rgba(249,115,22,0.3);
    }

    .btn-wa {
      background: #25D366;
    }

    .footer {
      background: #f3f4f6;
      padding: 30px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      <h1>
        ${escapeHtml(buildKindHeadline(bookingKind))}
      </h1>

      <p style="margin:8px 0 0; opacity:0.95;">
        JaeTravel Expeditions
      </p>
    </div>

    <div class="content">

      <p style="font-size:18px; margin-bottom:25px;">
        Dear <strong>${escapeHtml(customer.name)}</strong>,
      </p>

      <p>${lead}</p>

      <div class="card">

        <h2
          style="
            margin:0 0 15px;
            color:#92400e;
            font-size:20px;
            border-bottom:2px solid #fbbf24;
            padding-bottom:8px;
          "
        >
          ${escapeHtml(detailHeadline)}
        </h2>

        <table>

          <tr>
            <td class="label">
              ${bookingKind === 'inquiry' ? 'ID' : 'Booking ID'}:
            </td>

            <td class="value">
              <span class="highlight">
                ${escapeHtml(bookingId)}
              </span>
            </td>
          </tr>

          ${
            bookingKind === 'inquiry'
              ? `
                <tr>
                  <td class="label">Interested In:</td>
                  <td class="value">
                    ${escapeHtml(service.name || 'General')}
                  </td>
                </tr>

                <tr>
                  <td class="label">Message:</td>
                  <td
                    class="value"
                    style="font-style:italic; color:#6b7280;"
                  >
                    ${escapeHtml(
                      service.specialRequirements || '',
                    )}
                  </td>
                </tr>
              `
              : `
                <tr>
                  <td class="label">
                    ${
                      bookingKind === 'transfer'
                        ? 'Service'
                        : 'Tour'
                    }:
                  </td>

                  <td class="value">
                    ${escapeHtml(service.name)}
                  </td>
                </tr>

                <tr>
                  <td class="label">Date:</td>
                  <td class="value">
                    ${escapeHtml(service.startDate)}
                  </td>
                </tr>

                <tr>
                  <td class="label">Travelers:</td>
                  <td class="value">
                    ${escapeHtml(service.travelers)}
                    ${
                      service.travelers > 1
                        ? 'persons'
                        : 'person'
                    }
                  </td>
                </tr>

                <tr>
                  <td class="label">Total:</td>
                  <td
                    class="value"
                    style="
                      font-weight:700;
                      color:#dc2626;
                      font-size:18px;
                    "
                  >
                    $${Number(
                      service.totalPrice,
                    ).toLocaleString()}
                  </td>
                </tr>

                ${transferBlock}

                <tr>
                  <td class="label">Requests:</td>
                  <td
                    class="value"
                    style="
                      font-style:italic;
                      color:#6b7280;
                    "
                  >
                    ${escapeHtml(
                      service.specialRequirements ||
                        'None',
                    )}
                  </td>
                </tr>
              `
          }

        </table>

      </div>

      ${pdfButton}

      <div
        style="
          background:#ecfdf5;
          border:1px solid #bbf7d0;
          border-radius:12px;
          padding:25px;
          text-align:center;
        "
      >

        <h3
          style="
            margin:0 0 15px;
            color:#059669;
            font-size:18px;
          "
        >
          Need Help?
        </h3>

        <p>
          Chat with us instantly on WhatsApp:
        </p>

        ${waLink}

      </div>

      ${
        bookingKind === 'tour' ||
        bookingKind === 'transfer'
          ? `
            <div
              style="
                margin-top:30px;
                padding-top:20px;
                border-top:1px dashed #e5e7eb;
                font-size:14px;
                color:#6b7280;
              "
            >
              <p>
                Full payment due 30 days before departure.
                Travel insurance recommended.
              </p>
            </div>
          `
          : ''
      }

    </div>

    <div class="footer">

      <p style="margin:0;">
        © 2025 JaeTravel Expeditions |
        TTA/0036 |
        Nairobi, Kenya
      </p>

      <p
        style="
          margin:8px 0 0;
          opacity:0.8;
        "
      >
        <a
          href="tel:+254726485228"
          style="
            color:#f97316;
            text-decoration:none;
          "
        >
          +254 726 485 228
        </a>

        |

        <a
          href="mailto:info@jaetravel.co.ke"
          style="
            color:#f97316;
            text-decoration:none;
          "
        >
          info@jaetravel.co.ke
        </a>
      </p>

    </div>

  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------
// Admin email
// ---------------------------------------------------------------------

function buildAdminHtml(
  input: BookingEmailInput,
  recipientLabel: string,
): string {
  const {
    bookingId,
    bookingKind,
    customer,
    service,
    transfer,
    adminPdfUrl,
    customerWhatsApp,
  } = input;

  const transferBlock =
    bookingKind === 'transfer' && transfer
      ? `
        <tr>
          <td class="label">Pickup:</td>
          <td class="value">
            ${escapeHtml(transfer.pickup)}
          </td>
        </tr>

        <tr>
          <td class="label">Drop-off:</td>
          <td class="value">
            ${escapeHtml(transfer.dropoff)}
          </td>
        </tr>
      `
      : '';

  const detailHeadline =
    bookingKind === 'inquiry'
      ? 'Message'
      : bookingKind === 'transfer'
        ? 'Transfer Details'
        : 'Booking Summary';

  const serviceLabel =
    bookingKind === 'inquiry'
      ? 'Interested In'
      : bookingKind === 'transfer'
        ? 'Service'
        : 'Tour';

  return `<!DOCTYPE html>
<html>
<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>
    ${escapeHtml(
      buildKindAdminHeadline(bookingKind),
    )} #${escapeHtml(bookingId)}
  </title>

  <style>

    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f9fafb;
      color: #1f2937;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #059669, #10b981);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }

    .content {
      padding: 40px 30px;
    }

    .card {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 15px;
    }

    td {
      padding: 10px 0;
      vertical-align: top;
    }

    .label {
      font-weight: 600;
      color: #166534;
      width: 120px;
    }

    .value {
      color: #065f46;
    }

    .highlight {
      background: #d1fae5;
      padding: 6px 12px;
      border-radius: 6px;
      font-family: 'Courier New';
    }

    .btn {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 8px 4px;
    }

    .btn-wa {
      background: #25D366;
    }

    .btn-pdf {
      background: #f97316;
    }

    .footer {
      background: #f3f4f6;
      padding: 25px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
    }

  </style>

</head>

<body>

  <div class="container">

    <div class="header">

      <h1>
        ${escapeHtml(
          buildKindAdminHeadline(bookingKind),
        )}
      </h1>

      <p style="margin:8px 0 0; opacity:0.95;">

        JaeTravel Expeditions

        <span
          style="
            opacity:0.7;
            font-size:14px;
          "
        >
          (copy to ${escapeHtml(recipientLabel)})
        </span>

      </p>

    </div>

    <div class="content">

      <h2
        style="
          margin:0 0 20px;
          color:#059669;
          font-size:24px;
        "
      >
        ${
          bookingKind === 'inquiry'
            ? 'Customer'
            : 'Customer Details'
        }
      </h2>

      <div class="card">

        <table>

          <tr>
            <td class="label">Name:</td>

            <td class="value">
              <strong>
                ${escapeHtml(customer.name)}
              </strong>
            </td>
          </tr>

          <tr>
            <td class="label">Email:</td>

            <td class="value">

              <a
                href="mailto:${escapeHtml(customer.email)}"
                style="color:#059669;"
              >
                ${escapeHtml(customer.email)}
              </a>

            </td>
          </tr>

          <tr>
            <td class="label">Phone:</td>

            <td class="value">

              <a
                href="tel:${escapeHtml(customer.phone)}"
                style="color:#059669;"
              >
                ${escapeHtml(customer.phone)}
              </a>

            </td>
          </tr>

        </table>

      </div>

      <h2
        style="
          margin:0 0 20px;
          color:#059669;
          font-size:24px;
        "
      >
        ${escapeHtml(detailHeadline)}
      </h2>

      <div class="card">

        <table>

          <tr>

            <td class="label">
              ID:
            </td>

            <td class="value">

              <span class="highlight">
                ${escapeHtml(bookingId)}
              </span>

            </td>

          </tr>

          ${
            bookingKind === 'inquiry'
              ? `
                <tr>

                  <td class="label">
                    ${escapeHtml(serviceLabel)}:
                  </td>

                  <td class="value">
                    ${escapeHtml(
                      service.name || 'General',
                    )}
                  </td>

                </tr>

                <tr>

                  <td class="label">
                    Message:
                  </td>

                  <td
                    class="value"
                    style="
                      font-style:italic;
                      color:#6b7280;
                    "
                  >
                    ${escapeHtml(
                      service.specialRequirements ||
                        '',
                    )}
                  </td>

                </tr>
              `
              : `
                <tr>

                  <td class="label">
                    ${escapeHtml(serviceLabel)}:
                  </td>

                  <td class="value">

                    <strong>
                      ${escapeHtml(service.name)}
                    </strong>

                  </td>

                </tr>

                <tr>

                  <td class="label">
                    Date:
                  </td>

                  <td class="value">
                    ${escapeHtml(service.startDate)}
                  </td>

                </tr>

                <tr>

                  <td class="label">
                    Travelers:
                  </td>

                  <td class="value">
                    ${escapeHtml(service.travelers)}
                  </td>

                </tr>

                <tr>

                  <td class="label">
                    Total:
                  </td>

                  <td
                    class="value"
                    style="
                      font-weight:700;
                      color:#059669;
                      font-size:18px;
                    "
                  >
                    $${Number(
                      service.totalPrice,
                    ).toLocaleString()}
                  </td>

                </tr>

                ${transferBlock}

                <tr>

                  <td class="label">
                    Requests:
                  </td>

                  <td
                    class="value"
                    style="
                      font-style:italic;
                      color:#6b7280;
                    "
                  >
                    ${escapeHtml(
                      service.specialRequirements ||
                        'None',
                    )}
                  </td>

                </tr>
              `
          }

        </table>

      </div>

      <div
        style="
          text-align:center;
          margin:30px 0;
        "
      >

        ${
          adminPdfUrl
            ? `
              <a
                href="${escapeHtml(adminPdfUrl)}"
                class="btn btn-pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Admin PDF
              </a>
            `
            : ''
        }

        ${
          customerWhatsApp
            ? `
              <a
                href="${escapeHtml(
                  customerWhatsApp,
                )}?text=${encodeURIComponent(
                  bookingKind === 'inquiry'
                    ? `Hi ${customer.name}, thanks for your inquiry!`
                    : `Hi ${customer.name}, your ${
                        bookingKind === 'transfer'
                          ? 'transfer'
                          : 'booking'
                      } #${bookingId} is confirmed!`,
                )}"
                class="btn btn-wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Customer
              </a>
            `
            : ''
        }

      </div>

      <p
        style="
          font-size:14px;
          color:#6b7280;
          text-align:center;
          font-style:italic;
        "
      >
        Submitted:
        ${new Date().toLocaleString('en-KE', {
          timeZone: 'Africa/Nairobi',
        })}
      </p>

    </div>

    <div class="footer">

      <p>
        JaeTravel Expeditions Booking System
      </p>

      <p
        style="
          margin:8px 0 0;
          opacity:0.8;
        "
      >
        Licensed Tour Operator | TTA/0036
      </p>

    </div>

  </div>

</body>
</html>`;
}

// ---------------------------------------------------------------------
// WhatsApp message
// ---------------------------------------------------------------------

function buildBookingWhatsAppText(
  input: BookingEmailInput,
): string {
  const {
    bookingId,
    bookingKind,
    customer,
    service,
    transfer,
  } = input;

  const kindLabel =
    bookingKind === 'transfer'
      ? 'Transfer'
      : bookingKind === 'inquiry'
        ? 'Inquiry'
        : bookingKind === 'quote'
          ? 'Quote'
          : 'Booking';

  const transferLine =
    bookingKind === 'transfer' && transfer
      ? `🚐 ${transfer.pickup} → ${transfer.dropoff}\n`
      : '';

  const reqLine = service.specialRequirements
    ? `\n📝 Notes: ${service.specialRequirements}`
    : '';

  return [
    `🆕 *New ${kindLabel} #${bookingId}*`,
    '',
    `👤 ${customer.name}`,
    `📧 ${customer.email}`,
    `📞 ${customer.phone}`,
    '',
    `🏞️ ${service.name}`,
    `📅 ${service.startDate}`,
    `👥 ${service.travelers} traveler${
      service.travelers > 1 ? 's' : ''
    }`,
    `💰 $${Number(
      service.totalPrice,
    ).toLocaleString()}`,
    transferLine.trimEnd(),
    reqLine,
  ]
    .filter((line) => line !== '')
    .join('\n')
    .trimEnd();
}

// ---------------------------------------------------------------------
// WhatsApp / CallMeBot
// ---------------------------------------------------------------------

async function sendBookingWhatsApp(
  input: BookingEmailInput,
): Promise<EmailStatus> {
  const apiKey = process.env.CALLMEBOT_API_KEY;

  if (!apiKey) {
    console.log(
      `[booking-whatsapp] ${input.bookingId}: CALLMEBOT_API_KEY not configured — skipped`,
    );

    return 'skipped';
  }

  const phone = (
    input.companyWhatsAppNumber ||
    '+254726485228'
  ).replace(/[^0-9]/g, '');

  const text = buildBookingWhatsAppText(input);

  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    });

    const body = await response.text();

    if (!response.ok) {
      console.error(
        `[booking-whatsapp] ${input.bookingId}: HTTP ${response.status}`,
        body.slice(0, 300),
      );

      return 'failed';
    }

    if (!/message\s*sent/i.test(body)) {
      console.error(
        `[booking-whatsapp] ${input.bookingId}: unexpected response`,
        body.slice(0, 300),
      );

      return 'failed';
    }

    console.log(
      `[booking-whatsapp] ${input.bookingId}: WhatsApp notification sent`,
    );

    return 'sent';
  } catch (error: any) {
    console.error(
      `[booking-whatsapp] ${input.bookingId}: request failed`,
      {
        name: error?.name,
        message: error?.message,
      },
    );

    return 'failed';
  }
}

// ---------------------------------------------------------------------
// Main email dispatcher
// ---------------------------------------------------------------------

export async function sendBookingEmails(
  input: BookingEmailInput,
): Promise<EmailDispatchStatus> {
  console.log(
    `[booking-emails] ${input.bookingId}: starting notification dispatch`,
  );

  // ---------------------------------------------------------------
  // Validate customer email
  // ---------------------------------------------------------------

  const customerEmail =
    input.customer.email?.trim();

  if (!customerEmail || !isValidEmail(customerEmail)) {
    console.error(
      `[booking-emails] ${input.bookingId}: invalid customer email`,
      {
        email: customerEmail || '(empty)',
      },
    );

    const whatsappStatus =
      await sendBookingWhatsApp(input);

    const error: SmtpErrorSummary = {
      code: 'INVALID_CUSTOMER_EMAIL',
      message: 'The customer email address is invalid.',
    };

    return {
      client: 'failed',
      info: 'failed',
      it: 'failed',
      whatsapp: whatsappStatus,
      errors: {
        client: error,
        info: error,
        it: error,
      },
    };
  }

  // ---------------------------------------------------------------
  // Get SMTP transporter
  // ---------------------------------------------------------------

  const transporter = getTransporter();

  if (!transporter) {
    console.error(
      `[booking-emails] ${input.bookingId}: SMTP transporter unavailable`,
    );

    // WhatsApp is independent of SMTP.
    const whatsappStatus =
      await sendBookingWhatsApp(input);

    const error: SmtpErrorSummary = {
      code: 'SMTP_CONFIG_MISSING',
      message:
        'SMTP transporter could not be created. Check SITE_SMTP_HOST, SITE_SMTP_PORT, SITE_SMTP_USER and SITE_SMTP_PASS.',
    };

    return {
      client: 'failed',
      info: 'failed',
      it: 'failed',
      whatsapp: whatsappStatus,
      errors: {
        client: error,
        info: error,
        it: error,
      },
    };
  }

  // ---------------------------------------------------------------
  // Verify SMTP connection
  // ---------------------------------------------------------------

  try {
    console.log(
      `[booking-emails] ${input.bookingId}: verifying SMTP connection...`,
    );

    await transporter.verify();

    console.log(
      `[booking-emails] ${input.bookingId}: SMTP connection verified successfully`,
    );
  } catch (error: any) {
    const smtpError =
      extractError(error);

    console.error(
      `[booking-emails] ${input.bookingId}: SMTP VERIFY FAILED`,
      JSON.stringify({
        name: error?.name,
        code: error?.code,
        command: error?.command,
        response: error?.response,
        responseCode: error?.responseCode,
        message: error?.message,
      }),
    );

    /*
     * Clear the transporter so a later request gets a fresh
     * connection instead of reusing a known-bad transporter.
     */
    _transporter = null;
    _transporterConfigKey = null;

    const whatsappStatus =
      await sendBookingWhatsApp(input);

    return {
      client: 'failed',
      info: 'failed',
      it: 'failed',
      whatsapp: whatsappStatus,
      errors: {
        client: smtpError,
        info: smtpError,
        it: smtpError,
      },
    };
  }

  // ---------------------------------------------------------------
  // Build subjects
  // ---------------------------------------------------------------

  const customerSubject =
    formatSubject(
      input.bookingKind,
      input.bookingId,
      input.customer.name,
      input.service.name,
    );

  const adminSubject =
    formatAdminSubject(
      input.bookingKind,
      input.bookingId,
      input.customer.name,
      input.service.name,
    );

  // ---------------------------------------------------------------
  // Build HTML
  // ---------------------------------------------------------------

  const customerHtml =
    buildCustomerHtml(input);

  const infoHtml =
    buildAdminHtml(input, 'info@');

  const itHtml =
    buildAdminHtml(input, 'it@');

  // ---------------------------------------------------------------
  // Customer message
  // ---------------------------------------------------------------

  const customerMsg = {
    from: `"JaeTravel Expeditions" <${process.env.SITE_SMTP_USER?.trim() || 'noreply@jaetravel.co.ke'}>`,

    to: customerEmail,

    replyTo: INFO_ADDRESS,

    subject: customerSubject,

    html: customerHtml,

    text: [
      `Booking Confirmation #${input.bookingId}`,
      '',
      `Dear ${input.customer.name},`,
      '',
      `Your booking for ${input.service.name} has been received.`,
      '',
      `Booking ID: ${input.bookingId}`,
      `Date: ${input.service.startDate}`,
      `Travelers: ${input.service.travelers}`,
      `Total: $${Number(
        input.service.totalPrice,
      ).toLocaleString()}`,
      '',
      'JaeTravel Expeditions',
      '+254 726 485 228',
      INFO_ADDRESS,
    ].join('\n'),
  };

  // ---------------------------------------------------------------
  // info@ message
  // ---------------------------------------------------------------

  const infoMsg = {
    from: `"JaeTravel Expeditions" <${process.env.SITE_SMTP_USER?.trim() || 'noreply@jaetravel.co.ke'}>`,

    to: INFO_ADDRESS,

    replyTo: customerEmail,

    subject: adminSubject,

    html: infoHtml,

    text: [
      `New Booking #${input.bookingId}`,
      '',
      `Customer: ${input.customer.name}`,
      `Email: ${customerEmail}`,
      `Phone: ${input.customer.phone}`,
      '',
      `Tour: ${input.service.name}`,
      `Date: ${input.service.startDate}`,
      `Travelers: ${input.service.travelers}`,
      `Total: $${Number(
        input.service.totalPrice,
      ).toLocaleString()}`,
      '',
      `Booking ID: ${input.bookingId}`,
    ].join('\n'),
  };

  // ---------------------------------------------------------------
  // it@ message
  // ---------------------------------------------------------------

  const itMsg = {
    from: `"JaeTravel Expeditions" <${process.env.SITE_SMTP_USER?.trim() || 'noreply@jaetravel.co.ke'}>`,

    to: IT_ADDRESS,

    replyTo: customerEmail,

    subject: adminSubject,

    html: itHtml,

    text: [
      `New Booking #${input.bookingId}`,
      '',
      `Customer: ${input.customer.name}`,
      `Email: ${customerEmail}`,
      `Phone: ${input.customer.phone}`,
      '',
      `Tour: ${input.service.name}`,
      `Date: ${input.service.startDate}`,
      `Travelers: ${input.service.travelers}`,
      `Total: $${Number(
        input.service.totalPrice,
      ).toLocaleString()}`,
      '',
      `Booking ID: ${input.bookingId}`,
    ].join('\n'),
  };

  // ---------------------------------------------------------------
  // Send all notifications independently
  // ---------------------------------------------------------------

  const [
    customerResult,
    infoResult,
    itResult,
    whatsappResult,
  ] = await Promise.allSettled([
    transporter.sendMail(customerMsg),
    transporter.sendMail(infoMsg),
    transporter.sendMail(itMsg),
    sendBookingWhatsApp(input),
  ]);

  // ---------------------------------------------------------------
  // Convert Promise results to statuses
  // ---------------------------------------------------------------

  const toStatus = (
    result: PromiseSettledResult<unknown>,
  ): EmailStatus => {
    return result.status === 'fulfilled'
      ? 'sent'
      : 'failed';
  };

  const clientStatus =
    toStatus(customerResult);

  const infoStatus =
    toStatus(infoResult);

  const itStatus =
    toStatus(itResult);

  const whatsappStatus =
    toStatus(whatsappResult);

  // ---------------------------------------------------------------
  // Log customer result
  // ---------------------------------------------------------------

  if (customerResult.status === 'fulfilled') {
    const result: any =
      customerResult.value;

    console.log(
      `[booking-emails] ${input.bookingId}: customer email SENT`,
      {
        messageId: result?.messageId,
        response: result?.response,
      },
    );
  } else {
    const error =
      extractError(customerResult.reason);

    console.error(
      `[booking-emails] ${input.bookingId}: customer email FAILED`,
      JSON.stringify(error),
    );
  }

  // ---------------------------------------------------------------
  // Log info result
  // ---------------------------------------------------------------

  if (infoResult.status === 'fulfilled') {
    const result: any =
      infoResult.value;

    console.log(
      `[booking-emails] ${input.bookingId}: info@ email SENT`,
      {
        messageId: result?.messageId,
        response: result?.response,
      },
    );
  } else {
    const error =
      extractError(infoResult.reason);

    console.error(
      `[booking-emails] ${input.bookingId}: info@ email FAILED`,
      JSON.stringify(error),
    );
  }

  // ---------------------------------------------------------------
  // Log IT result
  // ---------------------------------------------------------------

  if (itResult.status === 'fulfilled') {
    const result: any =
      itResult.value;

    console.log(
      `[booking-emails] ${input.bookingId}: it@ email SENT`,
      {
        messageId: result?.messageId,
        response: result?.response,
      },
    );
  } else {
    const error =
      extractError(itResult.reason);

    console.error(
      `[booking-emails] ${input.bookingId}: it@ email FAILED`,
      JSON.stringify(error),
    );
  }

  // ---------------------------------------------------------------
  // Log WhatsApp result
  // ---------------------------------------------------------------

  if (whatsappResult.status === 'fulfilled') {
    console.log(
      `[booking-emails] ${input.bookingId}: WhatsApp status=${whatsappStatus}`,
    );
  } else {
    console.error(
      `[booking-emails] ${input.bookingId}: WhatsApp FAILED`,
      extractError(whatsappResult.reason),
    );
  }

  // ---------------------------------------------------------------
  // Final status
  // ---------------------------------------------------------------

  console.log(
    `[booking-emails] ${input.bookingId} FINAL STATUS: ` +
      `client=${clientStatus} ` +
      `info@=${infoStatus} ` +
      `it@=${itStatus} ` +
      `whatsapp=${whatsappStatus}`,
  );

  return {
    client: clientStatus,
    info: infoStatus,
    it: itStatus,
    whatsapp: whatsappStatus,

    errors: {
      client:
        customerResult.status === 'rejected'
          ? extractError(customerResult.reason)
          : undefined,

      info:
        infoResult.status === 'rejected'
          ? extractError(infoResult.reason)
          : undefined,

      it:
        itResult.status === 'rejected'
          ? extractError(itResult.reason)
          : undefined,
    },
  };
}