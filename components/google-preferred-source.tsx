"use client";

interface GooglePreferredSourceProps {
  theme?: "light" | "dark";
  lang?: string;
}

export function GooglePreferredSource({
  theme = "light",
  lang,
}: GooglePreferredSourceProps) {
  return (
    <div
      google-add-preferred-source-btn=""
      data-theme={theme}
      {...(lang ? { "data-lang": lang } : {})}
    />
  );
}