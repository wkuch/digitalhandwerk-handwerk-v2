import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function initGtag(googleAdsId: string) {
  if (typeof window === "undefined") return;

  // Initialize dataLayer and gtag function if not already present
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }

  // Only inject the script tag once
  if (document.getElementById("gtag-script")) return;

  const script = document.createElement("script");
  script.id = "gtag-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", googleAdsId);
}

interface Props {
  googleAdsId: string;
}

export function CookieConsentBanner({ googleAdsId }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === "granted" && googleAdsId && !googleAdsId.includes("XXXXXXX")) {
      // Consent was previously granted — restore tracking on page load
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
      initGtag(googleAdsId);
    }
  }, [googleAdsId]);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    setVisible(false);

    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });

    if (googleAdsId && !googleAdsId.includes("XXXXXXX")) {
      initGtag(googleAdsId);
    }
  }

  function handleDeny() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div
        role="dialog"
        aria-label="Cookie-Einstellungen"
        aria-modal="false"
        className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-2xl"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="mb-1 font-medium text-text">Cookie-Einstellungen</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Diese Website verwendet Cookies zur Analyse unserer Online-Marketingmaßnahmen.{" "}
              <a
                href="/datenschutz"
                className="underline underline-offset-2 text-accent hover:text-accent-hover"
              >
                Datenschutzerklärung
              </a>
            </p>
          </div>
          <div className="flex shrink-0 justify-center gap-3 sm:justify-start">
            <button
              onClick={handleDeny}
              className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Ablehnen
            </button>
            <button
              onClick={handleAccept}
              className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
