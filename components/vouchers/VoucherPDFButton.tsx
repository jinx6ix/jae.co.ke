// components/vouchers/VoucherPDFButton.tsx
'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
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

// Module-level cache for the inlined logo data URL. @react-pdf/renderer's
// <Image> resolves a string src against the local filesystem when the src
// starts with "/", which throws ENOENT on Windows. Converting the logo to
// a data URL lets pdf().toBlob() render it without any I/O, and we cache
// the conversion so the second click is instant.
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
      // Generate the PDF on demand and create a one-shot blob URL. This is
      // more reliable than the legacy usePDF() hook — the URL exists only
      // for the lifetime of the click, so we can revoke it after triggering
      // the download and avoid the "stale blob URL" warnings some browsers
      // show with long-lived usePDF URLs.
      const logoSrc = await getLogoDataUrl();
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
      // concise message including the actual reason. The old generic
      // "Could not generate the PDF. Please try again." hid the underlying
      // cause (in practice: an ENOENT from <Image src="/logos/..."> on
      // Windows, which the data-URL fix below addresses).
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