"use client";

import { useEffect, useRef } from "react";

interface GooglePreferredSourceProps {
  lang?: string;
  theme?: "light" | "dark";
}

export function GooglePreferredSource({
  lang = "en",
  theme = "light",
}: GooglePreferredSourceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const button = document.createElement("div");

    button.setAttribute(
      "google-add-preferred-source-btn",
      ""
    );

    button.setAttribute("data-theme", theme);
    button.setAttribute("data-lang", lang);

    containerRef.current.appendChild(button);
  }, [lang, theme]);

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center"
      aria-label="Add JaeTravel Expeditions as a preferred source"
    />
  );
}