import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

export function FaqIsland() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="kosten">
        <AccordionTrigger>Was kostet mich das wirklich?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-text-secondary">
            <p><strong>Website-Erstellung:</strong> 499 € Festpreis. Kontaktformular, SEO, DSGVO: alles inklusive. Keine versteckten Kosten.</p>
            <p><strong>Laufende Betreuung:</strong> Optional und monatlich kündbar:</p>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li><strong>Technik-Paket (15 € / Monat):</strong> Hosting, Domain & SSL, Updates, Backups, Monitoring</li>
              <li><strong>Sorglos-Paket (29 € / Monat):</strong> alles aus Technik – plus Änderungen inklusive: neue Texte, Bilder oder Öffnungszeiten, kurz anrufen genügt</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="wartung">
        <AccordionTrigger>Bieten Sie Wartung & Betreuung an?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-text-secondary">
            <p>Ja, optional und monatlich kündbar:</p>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li><strong>Technik-Paket (15 € / Monat):</strong> Hosting, Domain & SSL, Updates, Backups und Monitoring</li>
              <li><strong>Sorglos-Paket (29 € / Monat):</strong> alles aus Technik – plus Inhaltsänderungen inklusive (neue Texte, Bilder, Öffnungszeiten) und ein jährlicher Website-Check</li>
            </ul>
            <p className="text-sm text-text-muted">Neue Handynummer, Betriebsurlaub, ein neues Projektfoto? Eine kurze Nachricht genügt – ich kümmere mich.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="kunden">
        <AccordionTrigger>Bringt mir die Webseite neue Kunden?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-text-secondary">
            <p>Die Seite wird auf Sichtbarkeit und Anfragen gebaut: saubere SEO-Grundlagen, schnelle Ladezeiten, klare Leistungen, starke Referenzen und sichtbare Kontaktmöglichkeiten.</p>
            <p className="text-sm text-text-muted">Auf Wunsch: lokale SEO-Optimierung, Google Unternehmensprofil, strukturierte Inhalte.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="aufwand">
        <AccordionTrigger>Wie viel Arbeit habe ich damit?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-text-secondary">
            <p>So viel oder wenig, wie Sie möchten:</p>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li><strong>Minimal:</strong> 30 Min. Telefonat, ich mache den Rest</li>
              <li><strong>Mitsprache:</strong> Sie liefern Texte/Bilder und geben Feedback</li>
              <li><strong>Eng betreut:</strong> Gemeinsame Abstimmung bei jedem Schritt</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="recht">
        <AccordionTrigger>Ist die Seite rechtssicher?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-text-secondary">
            <p>DSGVO-konforme Umsetzung: Impressum, Datenschutz, SSL. Cookie-Hinweis wird eingebaut, wenn nötig. Hosting datenschutzkonform wählbar.</p>
            <p className="text-sm text-text-muted">Hinweis: Keine Rechtsberatung. Umsetzung nach gängigen Standards.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="abhaengig">
        <AccordionTrigger>Gehört mir die Seite oder bin ich abhängig?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-text-secondary">
            <p>Kein Lock-in. Sie erhalten vollen Zugriff auf Inhalte und Code. Anbieterwechsel jederzeit möglich.</p>
            <p className="text-sm text-text-muted">Ich setze auf transparente, gängige Technologien.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="erweiterbar">
        <AccordionTrigger>Kann ich später Funktionen dazubuchen?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-text-secondary">
            <p>Ja. Die Seite ist modular: Galerie, Terminbuchung, Formular-Automatisierung, Mehrsprachigkeit und mehr sind jederzeit nachrüstbar.</p>
            <p className="text-sm text-text-muted">Schlank starten, bei Bedarf erweitern.</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
