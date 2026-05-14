import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Regional variants that should redirect to canonical
  const regionalVariants = ["/en-gb", "/en-au", "/en-us", "/en-ca", "/en-gb/", "/en-au/", "/en-us/", "/en-ca/"];

  for (const variant of regionalVariants) {
    if (pathname === variant || pathname.startsWith(`${variant}/`)) {
      // Redirect to canonical URL without regional prefix
      const path = pathname.replace(new RegExp(`^${variant}`), "") || "/";
      const canonicalUrl = new URL(path, request.nextUrl.origin);
      return NextResponse.redirect(canonicalUrl, 301);
    }
  }

  // Block query params that create duplicate pages
  const duplicateParams = ["destination", "vehicle", "service"];
  const hasDuplicateParams = duplicateParams.some(param => request.nextUrl.searchParams.has(param));

  if (hasDuplicateParams) {
    // Remove duplicate params and redirect to clean URL
    const url = request.nextUrl.clone();
    duplicateParams.forEach(param => url.searchParams.delete(param));
    return NextResponse.redirect(url, 301);
  }

  // Remove trailing slashes (except for root)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const cleanPath = pathname.slice(0, -1);
    const url = new URL(cleanPath, request.nextUrl.origin);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, images, and api routes
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};