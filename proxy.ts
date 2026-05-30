// proxy.ts - Combined proxy and redirect handler
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of all supported locales
const supportedLocales = ['en', 'fr', 'de', 'it', 'hi', 'ar', 'zh'];
const defaultLocale = 'en';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  
  // ✅ BYPASS STATIC VERIFICATION FILES
  const bypassFiles = [
    'tiktokHKtXE2qxZn7UFcYEGlIuLdzZn9nlpbbG.txt'
  ];

  if (bypassFiles.some(file => pathname.includes(file))) {
    return NextResponse.next();
  }

  // Extract the first segment of the path (e.g., /fr/... -> fr)
  const pathSegments = pathname.split('/');
  const localeFromPath = pathSegments[1];

  // Check if the extracted segment is a supported locale
  const locale = supportedLocales.includes(localeFromPath) ? localeFromPath : defaultLocale;

  const response = NextResponse.next();
  response.headers.set('x-locale', locale);

  // ——————————————————————————————————————————————————
  // REDIRECTS SECTION
  // ——————————————————————————————————————————————————

  // Regional variants that should redirect to canonical
  const regionalPatterns = ['/en-gb', '/en-au', '/en-us', '/en-ca'];
  for (const variant of regionalPatterns) {
    if (pathname === variant || pathname.startsWith(`${variant}/`)) {
      const path = pathname.replace(new RegExp(`^${variant}`), '') || '/';
      return NextResponse.redirect(new URL(path, request.nextUrl.origin), 301);
    }
  }

  // Block query params that create duplicate pages
  const duplicateParams = ['destination', 'vehicle', 'service'];
  const hasDuplicateParams = duplicateParams.some(param => request.nextUrl.searchParams.has(param));
  if (hasDuplicateParams) {
    const url = request.nextUrl.clone();
    duplicateParams.forEach(param => url.searchParams.delete(param));
    return NextResponse.redirect(url, 301);
  }

  // Remove trailing slashes (except for root)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanPath = pathname.slice(0, -1);
    return NextResponse.redirect(new URL(cleanPath, request.nextUrl.origin), 301);
  }

  // Legacy URL redirects
  if (pathname.startsWith('/product/')) {
    const newPath = pathname.replace('/product/', '/tours/');
    return NextResponse.redirect(new URL(newPath, request.nextUrl.origin), 301);
  }
  if (pathname.startsWith('/booking/')) {
    const newPath = pathname.replace('/booking/', '/book-now/');
    return NextResponse.redirect(new URL(newPath, request.nextUrl.origin), 301);
  }
  if (pathname.startsWith('/destination/')) {
    const newPath = pathname.replace('/destination/', '/destinations/');
    return NextResponse.redirect(new URL(newPath, request.nextUrl.origin), 301);
  }

  return response;
}