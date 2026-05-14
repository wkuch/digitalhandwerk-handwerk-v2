"use client";

import { useState } from "react";
import { Loader2, Phone, Mail, CheckCircle } from "lucide-react";
import { toast, Toaster } from "sonner";

interface ChecklistItem {
  title: string;
  desc: string;
  tip: string;
}

const checklist: ChecklistItem[] = [
  {
    title: "Klare Leistungsdarstellung",
    desc: "Ihre Kunden müssen innerhalb von 3 Sekunden verstehen, was Sie anbieten. Keine Fachchinesisch, keine allgemeinen Floskeln.",
    tip: "Nutzen Sie eine bullet point-Liste mit Ihren Top-5-Leistungen direkt auf der Startseite.",
  },
  {
    title: "Telefonnummer & Kontaktformular über dem Fold",
    desc: "Die meisten Handwerker-Kunden sind unterwegs auf dem Smartphone. Wenn sie Ihre Nummer nicht sofort finden, rufen sie die Konkurrenz an.",
    tip: "Platzieren Sie Telefonnummer und ein Kurzformular im oberen Bildschirmbereich auf jeder Seite.",
  },
  {
    title: "Lokale Sichtbarkeit (Google Maps & SEO)",
    desc: "Kunden suchen 'Elektriker Karlsruhe', nicht nur 'Elektriker'. Ohne lokale SEO bleiben Sie unsichtbar.",
    tip: "Tragen Sie Ihr Unternehmen bei Google Business Profile ein. Nennen Sie Stadt und Umland auf Ihrer Website.",
  },
  {
    title: "Echte Bilder statt Stockfotos",
    desc: "Stockfotos von lächelnden Handwerkern wirken unauthentisch. Ihre Kunden wollen sehen, WER vorbeikommt und WIE Sie arbeiten.",
    tip: "Machen Sie 5–10 Fotos von Ihrem Team, Ihren Fahrzeugen und aktuellen Projekten.",
  },
  {
    title: "Rechtssicherheit (Impressum, Datenschutz, SSL)",
    desc: "Abmahnungen kosten schnell 1.000 € und mehr. DSGVO-konforme Datenschutzerklärung, korrektes Impressum und SSL-Verschlüsselung sind Pflicht.",
    tip: "Vergessen Sie nicht die Cookie-Einwilligung. Ein fehlendes SSL-Zertifikat schreckt Kunden ab.",
  },
];

export function LeadMagnetIsland() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", privacyAccepted: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      toast.error("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("access_key", "69b3932f-558e-4829-a907-aa7dc6e0c709");
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", "Checkliste angefordert - DigitalHandwerk");
      data.append("message", `Checkliste angefordert von ${formData.name} (${formData.email})`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        window.gtag?.("event", "conversion", {
          send_to: `${import.meta.env.PUBLIC_GOOGLE_ADS_ID}/${import.meta.env.PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}`,
        });
        setSubmitted(true);
        toast.success("Checkliste freigeschaltet!");
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch {
      toast.error("Fehler beim Senden. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg sm:p-8">
        <div className="mb-6 text-center">
          <CheckCircle className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
          <h3 className="mb-2 font-heading text-xl text-text">Checkliste freigeschaltet!</h3>
          <p className="text-sm text-text-secondary">Hier ist Ihre persönliche 5-Punkte-Checkliste.</p>
        </div>

        <div className="space-y-4">
          {checklist.map((item, i) => (
            <div key={i} className="rounded-xl border border-border bg-bg p-4">
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <h4 className="font-heading text-base text-text">{item.title}</h4>
              </div>
              <p className="mb-2 text-sm text-text-secondary">{item.desc}</p>
              <p className="text-xs text-accent">
                <span className="font-semibold">Tipp:</span> {item.tip}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-dark p-5 text-center">
          <p className="mb-3 text-sm text-dark-muted">
            Keine Zeit für DIY? Ich baue Ihnen eine fertige Website inklusive aller Punkte aus der Checkliste.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99]"
          >
            Jetzt unverbindlich anfragen
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-dark-muted">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> 0157 3396 2986
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> kontakt@digitalhandwerk.net
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors />
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg sm:p-8">
        <h3 className="mb-1 font-heading text-xl text-text">Checkliste anfordern</h3>
        <p className="mb-5 text-sm text-text-secondary">E-Mail eingeben. Checkliste sofort anzeigen.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="lm-name" className="mb-1.5 block text-sm font-medium text-text">Name</label>
            <input
              id="lm-name"
              type="text"
              required
              placeholder="Ihr Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div>
            <label htmlFor="lm-email" className="mb-1.5 block text-sm font-medium text-text">E-Mail *</label>
            <input
              id="lm-email"
              type="email"
              required
              placeholder="ihre@email.de"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="flex items-start gap-2.5">
            <input
              id="lm-privacy"
              type="checkbox"
              required
              checked={formData.privacyAccepted}
              onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-accent focus:ring-accent"
            />
            <label htmlFor="lm-privacy" className="text-xs font-normal leading-relaxed text-text-secondary">
              Ich stimme zu, dass meine Daten zur Zusendung der Checkliste verarbeitet werden.{" "}
              <a href="/datenschutz/" className="text-accent underline underline-offset-2 hover:text-accent-hover">
                Datenschutzerklärung
              </a>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Wird gesendet...
              </span>
            ) : (
              "Checkliste kostenlos erhalten"
            )}
          </button>
          <p className="text-center text-xs text-text-muted">Kein Spam. Sie bekommen die Checkliste sofort angezeigt.</p>
        </form>
      </div>
    </>
  );
}
