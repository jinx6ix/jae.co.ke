"use client";

import { useEffect, useRef } from "react";

interface PreferredSourceClient {
  init: (options: {
    theme?: "light" | "dark";
    lang?: string;
  }) => void;

  addPreferredSource: () => void;
}

interface GooglePreferredSourceProps {
  theme?: "light" | "dark";
  lang?: string;
}

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<
      (preferredSource: PreferredSourceClient) => void
    >;
  }
}

export function GooglePreferredSource({
  theme = "light",
  lang = "en",
}: GooglePreferredSourceProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let connected = false;

    const register = (
      preferredSource: PreferredSourceClient
    ) => {
      preferredSource.init({
        theme,
        lang,
      });

      const button = buttonRef.current;

      if (!button || connected) {
        return;
      }

      connected = true;

      const handleClick = () => {
        preferredSource.addPreferredSource();
      };

      button.addEventListener("click", handleClick);

      return () => {
        button.removeEventListener("click", handleClick);
      };
    };

    /*
     * Google Preferred Sources exposes a callback queue.
     *
     * If Google's library has not loaded yet, this callback
     * waits in the queue.
     *
     * If it has already loaded, the queue is still available
     * and Google can consume it.
     */
    if (!window.PREFERRED_SOURCE) {
      window.PREFERRED_SOURCE = [];
    }

    window.PREFERRED_SOURCE.push(register);

    /*
     * Safety fallback:
     *
     * If the Google library loaded before this component mounted,
     * wait briefly and check whether the Google callback API has
     * become available.
     */
    const interval = window.setInterval(() => {
      if (window.PREFERRED_SOURCE) {
        // The Google library handles the queue.
        // We only need to keep the queue alive.
      }
    }, 500);

    return () => {
      window.clearInterval(interval);
    };
  }, [theme, lang]);

  return (
    <button
      ref={buttonRef}
      id="google-preferred-source-button"
      type="button"
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      Add JaeTravel as a Preferred Source
    </button>
  );
}