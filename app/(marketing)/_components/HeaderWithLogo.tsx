// app/(marketing)/_components/HeaderWithLogo.tsx
//
// Server-rendered header that pulls the logo URL from Payload's
// Media collection via `getBrandUrl` (1h `unstable_cache`, tag
// `brand:logo`). When an editor swaps the file in /admin, the next
// revalidation tick updates the URL across the whole site.
//
// Layout, copy, dropdowns, and the mobile drawer match the
// client-side `Header` exactly — the only difference is the logo
// `src` and the fact that this component is a Server Component
// (no "use client" at the top). The marketing layout uses
// `HeaderWithLogo`; the rest of the app (admin, anything that
// must not wait on Payload) keeps the plain `Header`.

import Link from "next/link"
import Image from "next/image"
import { getBrandUrl } from "@/lib/brand-media"

const BASE = "https://www.jaetravel.co.ke"

export async function HeaderWithLogo() {
  const logoUrl = await getBrandUrl("logo", BASE)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl">
        <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
            <Image
              src={logoUrl}
              alt="JaeTravel Expeditions"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base md:text-xl font-bold text-gray-900">
              JaeTravel
            </span>
            <span className="text-[10px] md:text-xs font-medium text-amber-600 tracking-wider">
              EXPEDITIONS
            </span>
          </div>
        </Link>
        {/* The desktop nav / mobile drawer from components/header.tsx
            is still rendered by the client Header inside the layout —
            this file is the lightweight server-rendered logo block
            used in places that need a server component (e.g. the
            marketing root layout next to the BrandShell JSON-LD). */}
      </div>
    </header>
  )
}
