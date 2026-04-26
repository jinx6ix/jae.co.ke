// components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";

// Define supported languages with their display names and flags (optional)
const languages = [
  { code: "en", name: "English", flag: "🇺🇸", pathPrefix: "" },        // no prefix for default
  { code: "fr", name: "Français", flag: "🇫🇷", pathPrefix: "fr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", pathPrefix: "de" },
  { code: "it", name: "Italiano", flag: "🇮🇹", pathPrefix: "it" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", pathPrefix: "hi" },
  { code: "ar", name: "العربية", flag: "🇸🇦", pathPrefix: "ar" },
  { code: "zh", name: "中文", flag: "🇨🇳", pathPrefix: "zh" },
];

// Helper to get the current locale from the pathname
function getCurrentLocale(pathname: string): string {
  const firstSegment = pathname.split("/")[1];
  const found = languages.find((lang) => lang.pathPrefix === firstSegment);
  return found ? found.code : "en";
}

// Helper to build the URL for a target locale while preserving the rest of the path
function getLocalizedUrl(pathname: string, targetLocale: string): string {
  const currentLocale = getCurrentLocale(pathname);
  const targetLang = languages.find((l) => l.code === targetLocale);
  if (!targetLang) return pathname;

  // Remove the current locale prefix if present
  let restPath = pathname;
  if (currentLocale !== "en") {
    const prefix = `/${currentLocale}`;
    if (pathname.startsWith(prefix)) {
      restPath = pathname.slice(prefix.length) || "/";
    }
  }

  // Add the target locale prefix if not English
  if (targetLocale === "en") {
    return restPath === "/" ? "/" : restPath;
  } else {
    const newPath = `/${targetLang.pathPrefix}${restPath === "/" ? "" : restPath}`;
    return newPath;
  }
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getCurrentLocale(pathname);

  const handleLanguageChange = (localeCode: string) => {
    if (localeCode === currentLocale) return;
    const newUrl = getLocalizedUrl(pathname, localeCode);
    router.push(newUrl);
  };

  const currentLang = languages.find((l) => l.code === currentLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors border border-gray-200">
        <Globe className="h-4 w-4" />
        <span className="hidden xl:inline">{currentLang?.name.slice(0, 2).toUpperCase()}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`gap-2 cursor-pointer ${lang.code === currentLocale ? "bg-amber-50 text-amber-600" : ""}`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}