// components/vouchers/VoucherPDFButton.tsx
'use client';

import { useState } from 'react';
import { pdf, Font } from '@react-pdf/renderer';
import HotelVoucherPDF from './HotelVoucherPDF';
import VehicleVoucherPDF from './VehicleVoucherPDF';
import FlightVoucherPDF from './FlightVoucherPDF';

const PDFComponents = {
  HOTEL: HotelVoucherPDF,
  FLIGHT: FlightVoucherPDF,
  VEHICLE: VehicleVoucherPDF,
};

/**
 * Build a filesystem-safe filename for a voucher PDF download.
 *
 *   <ClientName>_<HotelName>.pdf
 *
 * Example: client "Balaiji S K & Family" + hotel "Mara Sweet Acacia"
 *        → "Balaiji_S_K_&_Family_Mara_Sweet_Acacia.pdf"
 *
 * Rules:
 *   - Collapse any whitespace run to a single underscore (so "Foo  Bar" → "Foo_Bar")
 *   - Keep & and alphanumerics; drop everything else (slashes, colons, quotes, etc.)
 *   - Trim leading/trailing underscores from each piece
 *   - If the hotel piece is empty (e.g. a vehicle/flight voucher), fall back
 *     to the voucher type ("Vehicle", "Flight") so we still produce
 *     `Client_Vehicle.pdf` rather than a trailing-underscore mess.
 */
function voucherFilename(voucher: any): string {
  const slug = (s: string) =>
    s
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')   // strip combining accents
      .replace(/[^\w&]+/g, '_')          // any non-word, non-& run → _
      .replace(/_+/g, '_')               // collapse runs of _
      .replace(/^_+|_+$/g, '');          // trim leading/trailing _

  const client = slug((voucher.clientName || voucher.booking?.client?.name || 'Client').toString());
  const hotelRaw =
    voucher.hotelName ||
    voucher.property?.name ||
    (voucher.type === 'HOTEL' ? '' : voucher.type.charAt(0) + voucher.type.slice(1).toLowerCase());
  const hotel = slug(hotelRaw || (voucher.type === 'HOTEL' ? 'Hotel' : voucher.type));

  return `${client}_${hotel}.pdf`;
}

// ─── Asset pre-loading ─────────────────────────────────────────────────────
// Both of these run before pdf().toBlob() is called so the renderer doesn't
// have to hit the network or filesystem during PDF generation.

// @react-pdf/renderer's browser bundle no longer auto-registers the standard
// PDF fonts (Helvetica, Helvetica-Bold, …) — it throws
// "Standard font 'Helvetica' is not registered. Call registerStdFonts()…"
// because the browser pdfkit build is shipped without the font binaries
// (size / licensing). The fix is to register our own TTF under the same
// family names that the existing PDF components already use. We use Geist
// (SIL OFL, already a dependency) so the PDF keeps the same visual feel as
// the rest of the dashboard.
const FONT_REG = [
  { url: '/fonts/Geist-Regular.ttf', family: 'Helvetica' },
  { url: '/fonts/Geist-Bold.ttf',    family: 'Helvetica-Bold' },
] as const;

let fontsRegisteredPromise: Promise<void> | null = null;
async function ensureFontsRegistered(): Promise<void> {
  if (fontsRegisteredPromise) return fontsRegisteredPromise;
  fontsRegisteredPromise = (async () => {
    for (const { url, family } of FONT_REG) {
      // Idempotent: Font.register is a no-op if the same family/src is
      // registered again, so a second click on the same button is safe.
      Font.register({ family, src: url });
    }
  })();
  return fontsRegisteredPromise;
}

// Logo data URL — see comment below on why we can't pass a /logos/... path
// directly to <Image src=…> in the browser bundle.
let logoDataUrlPromise: Promise<string> | null = null;
async function getLogoDataUrl(): Promise<string> {
  if (logoDataUrlPromise) return logoDataUrlPromise;
  logoDataUrlPromise = (async () => {
    const res = await fetch('/logos/logo.jpg');
    if (!res.ok) throw new Error(`Failed to fetch logo: ${res.status}`);
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error || new Error('FileReader failed'));
      reader.readAsDataURL(blob);
    });
  })();
  return logoDataUrlPromise;
}

export default function VoucherPDFButton({ voucher }: { voucher: any }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const Doc = PDFComponents[voucher.type as keyof typeof PDFComponents] || VehicleVoucherPDF;
    setLoading(true);
    try {
      // Run the two pre-flight loads in parallel — both just hit /public.
      const [, logoSrc] = await Promise.all([
        ensureFontsRegistered(),
        getLogoDataUrl(),
      ]);
      const blob = await pdf(<Doc voucher={voucher} logoSrc={logoSrc} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = voucherFilename(voucher);
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Give the browser a tick to start the download before revoking.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      // Log the real error to the console for debugging; the user gets a
      // concise message including the actual reason. Earlier versions hid
      // the underlying cause behind a generic "Please try again." — this
      // includes the actual exception so the next failure is easier to
      // diagnose without devtools.
      console.error('[VoucherPDFButton] failed to generate PDF', err);
      const msg = err instanceof Error ? err.message : String(err);
      window.alert(
        `Could not generate the PDF.\n\nReason: ${msg}\n\nPlease refresh the page and try again, or contact support if the issue persists.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn-primary"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? 'Preparing PDF…' : '⬇ Download PDF'}
    </button>
  );
}