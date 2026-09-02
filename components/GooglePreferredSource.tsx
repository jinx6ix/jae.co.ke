"use client";

import { useEffect, useRef } from "react";
import { Newspaper } from "lucide-react";

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
     */
    if (!window.PREFERRED_SOURCE) {
      window.PREFERRED_SOURCE = [];
    }

    window.PREFERRED_SOURCE.push(register);

    /*
     * Safety fallback:
     *
     * If Google's library loaded before this component mounted,
     * keep the callback queue available.
     */
    const interval = window.setInterval(() => {
      if (window.PREFERRED_SOURCE) {
        // Google handles the queue.
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
      aria-label="Add JaeTravel Expeditions as a Preferred Source"
      title="Add JaeTravel Expeditions as a Preferred Source"
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

        cursor-pointer

        transition-all
        duration-200

        hover:scale-110
        hover:bg-accent
        hover:text-accent-foreground
        hover:shadow-xl

        active:scale-95

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
      "
    >
      <Newspaper
        className="h-5 w-5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}