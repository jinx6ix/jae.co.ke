"use client";

import { useEffect, useRef } from "react";

interface GooglePreferredSourceProps {
  theme?: "light" | "dark";
  lang?: string;
}

export function GooglePreferredSource({
  theme = "light",
  lang = "en",
}: GooglePreferredSourceProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        const preferredSource = await new Promise<any>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://news.google.com/swg/js/v1/publisher.mjs";
          script.type = "module";
          script.onload = () => resolve((window as any).preferredSource);
          script.onerror = () => reject(new Error("Failed to load the module"));
          document.head.appendChild(script);
        });

        if (cancelled) return;

        preferredSource.init({
          theme,
          lang,
        });

        const button = buttonRef.current;

        if (!button) return;

        button.onclick = () => {
          preferredSource.addPreferredSource();
        };
      } catch (error) {
        console.error(
          "Failed to initialize Google Preferred Source:",
          error
        );
      }
    }

    initialize();

    return () => {
      cancelled = true;

      if (buttonRef.current) {
        buttonRef.current.onclick = null;
      }
    };
  }, [theme, lang]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className="inline-flex items-center justify-center"
    >
      Add JaeTravel as a preferred source
    </button>
  );
}