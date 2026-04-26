// app/ar/layout.tsx — Arabic locale layout (RTL) – NO HTML/BODY TAGS
import type { Metadata } from "next";
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "جيه تريفل للرحلات | سفاري شرق أفريقيا",
    template: "%s | جيه تريفل للرحلات الاستكشافية",
  },
  description:
    "اكتشف سفاري لا تُنسى في كينيا وتنزانيا ورواندا وأوغندا. متخصصون في تتبع الغوريلا والهجرة الكبرى والرحلات الميسرة.",
  alternates: {
    canonical: `${BASE_URL}/ar`,
    languages: buildHreflangAlternates("/"),
  },
  openGraph: {
    locale: "ar_AE",
    siteName: "جيه تريفل للرحلات الاستكشافية",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "جيه تريفل - سفاري شرق أفريقيا",
      },
    ],
  },
};

// This layout only provides metadata and wraps children.
// The root layout handles <html> and <body> with the correct direction.
export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return children;
}