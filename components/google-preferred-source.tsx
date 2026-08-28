"use client";

import { useEffect, useRef, useState } from "react";
import { Newspaper } from "lucide-react";

interface GooglePreferredSourceProps {
  theme?: "light" | "dark";
  lang?: string;
}

declare global {
  interface Window {
    __googlePreferredSourceInitialized?: boolean;
  }
}

export function GooglePreferredSource({
  theme = "light",
  lang = "en",
}: GooglePreferredSourceProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadGoogleWidget = async () => {
      try {
        // Prevent duplicate initialization
        if (window.__googlePreferredSourceInitialized) {
          setReady(true);
          return;
        }

        // Load Google's publisher script
        const existingScript = document.querySelector(
          'script[src="https://news.google.com/swg/js/v1/publisher.js"]'
        );

        if (!existingScript) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");

            script.src =
              "https://news.google.com/swg/js/v1/publisher.js";

            script.async = true;

            script.onload = () => resolve();
            script.onerror = () =>
              reject(new Error("Failed to load Google Publisher script"));

            document.head.appendChild(script);
          });
        }

        if (cancelled) return;

        // Give Google's script time to expose the widget
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (cancelled) return;

        window.__googlePreferredSourceInitialized = true;

        setReady(true);
      } catch (error) {
        console.error(
          "Google Preferred Source initialization failed:",
          error
        );

        setReady(true);
      }
    };

    loadGoogleWidget();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = () => {
    if (!widgetRef.current) return;

    /*
     * Google's Preferred Source widget creates an iframe inside
     * this element. Clicking the hidden widget allows Google to
     * handle the actual "Add as preferred source" action.
     */

    const iframe = widgetRef.current.querySelector(
      "iframe"
    ) as HTMLIFrameElement | null;

    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          type: "google-preferred-source-click",
        },
        "https://news.google.com"
      );
    }

    /*
     * If Google has not created the iframe yet, temporarily
     * make the widget visible and trigger its button.
     */
    if (!iframe) {
      const googleButton =
        widgetRef.current.querySelector(
          "button"
        ) as HTMLButtonElement | null;

      if (googleButton) {
        googleButton.click();
      }
    }
  };

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* GOOGLE PREFERRED SOURCE WIDGET                               */}
      {/* Hidden because we provide our own circular UI button.        */}
      {/* ------------------------------------------------------------ */}

      <div
        ref={widgetRef}
        google-add-preferred-source-btn=""
        data-theme={theme}
        data-lang={lang}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* ------------------------------------------------------------ */}
      {/* FLOATING CIRCULAR BUTTON                                      */}
      {/* ------------------------------------------------------------ */}

      <button
        type="button"
        onClick={handleClick}
        disabled={!ready}
        aria-label="Add JaeTravel Expeditions as a preferred source on Google"
        title="Add JaeTravel Expeditions as a preferred source on Google"
        className="
          fixed
          right-5
          bottom-24
          z-[9999]
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-background
          text-foreground
          shadow-lg
          transition-all
          duration-200
          hover:scale-110
          hover:shadow-xl
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-60
          focus:outline-none
          focus:ring-2
          focus:ring-primary
          focus:ring-offset-2
        "
      >
        <Newspaper
          className="h-5 w-5"
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
    </>
  );
}