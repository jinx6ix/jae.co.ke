// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of all supported locales
const supportedLocales = ['en', 'fr', 'de', 'it', 'hi', 'ar', 'zh'];
const defaultLocale = 'en';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Extract the first segment of the path (e.g., /fr/... -> fr)
  const pathSegments = pathname.split('/');
  const localeFromPath = pathSegments[1];

  // Check if the extracted segment is a supported locale
  const locale = supportedLocales.includes(localeFromPath) ? localeFromPath : defaultLocale;

  const response = NextResponse.next();
  response.headers.set('x-locale', locale);

  return response;
}