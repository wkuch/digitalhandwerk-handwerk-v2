// Single source of truth for the profession ("Gewerk") landing pages.
// Used by the trade pages themselves, the homepage "Branchen" hub section,
// the footer, and the cross-link grids — so internal linking and on-page
// content stay consistent and every money page is reachable.

export interface TradeFaq {
  question: string;
  answer: string;
}

export interface Trade {
  /** key used to look the trade up, e.g. "elektriker" */
  slug: string;
  /** short label for nav/footer/chips, e.g. "Elektriker" */
  nav: string;
  /** descriptive, keyword-rich anchor text, e.g. "Website für Elektriker" */
  navLong: string;
  /** absolute path with trailing slash */
  href: string;
  /** one-line teaser for the homepage cards */
  tagline: string;
  /** schema.org Service serviceType */
  serviceType: string;
  /** schema.org Service description */
  serviceDescription: string;
  /** heading of the trade-specific services section */
  servicesHeading: string;
  /** intro paragraph of the services section */
  servicesIntro: string;
  /** trade-specific services (unique, keyword-rich content) */
  services: string[];
  /** heading of the FAQ section */
  faqHeading: string;
  /** visible + structured-data FAQ (kept in sync by construction) */
  faqs: TradeFaq[];
}

export const trades: Trade[] = [
  {
    slug: "elektriker",
    nav: "Elektriker",
    navLong: "Website für Elektriker",
    href: "/website-fuer-elektriker/",
    tagline: "Notdienst, Photovoltaik, Smart-Home – sichtbar für genau die Anfragen, die sich lohnen.",
    serviceType: "Webdesign für Elektrikerbetriebe",
    serviceDescription:
      "Professionelle Websites für Elektrikerbetriebe ab 499 € – DSGVO-konform, mobiloptimiert, SEO-optimiert.",
    servicesHeading: "Für jede Elektro-Leistung gefunden werden",
    servicesIntro:
      "Ob Neubau, Sanierung oder Notfall – Ihre Website zeigt klar, was Ihr Betrieb kann. Das bringt passende Anfragen und ein besseres Google-Ranking für Ihre Leistungen.",
    services: [
      "Elektroinstallation & Verkabelung",
      "Zählerschrank & Sicherungskasten",
      "Photovoltaik & Solaranlagen",
      "E-Auto-Ladestationen (Wallbox)",
      "Smart-Home & KNX",
      "Beleuchtungsplanung",
      "E-Check & Prüfungen",
      "Notdienst & Störungsbehebung",
    ],
    faqHeading: "Häufige Fragen zur Elektriker-Website",
    faqs: [
      {
        question: "Was kostet eine Website für einen Elektrikerbetrieb?",
        answer:
          "Eine professionelle Website für Ihren Elektrikerbetrieb kostet bei DigitalHandwerk 499 € als einmaliger Festpreis. Darin enthalten: Design, SEO-Grundlagen, DSGVO-konforme Umsetzung mit Impressum und Datenschutzerklärung, mobil-optimiertes Layout und Kontaktformular. Kein Abo, keine versteckten Kosten.",
      },
      {
        question: "Wie lange dauert es, bis die Website für meinen Elektrikerbetrieb online ist?",
        answer:
          "In der Regel ist die Website innerhalb von 2–4 Wochen fertig und live. Nach einem kurzen Erstgespräch erhalten Sie einen konkreten Zeitplan. Sie entscheiden, wie viel Sie selbst beitragen möchten.",
      },
      {
        question: "Hilft die Website dabei, mehr Aufträge als Elektriker zu bekommen?",
        answer:
          "Ja. Die Website wird gezielt auf lokale Suchanfragen optimiert – etwa „Elektriker Karlsruhe“ oder „Elektriker Notfall“. Mit einer klaren Leistungsübersicht, Ihrer Telefonnummer und einem einfachen Kontaktformular senken wir die Hemmschwelle für neue Anfragen spürbar.",
      },
      {
        question: "Lohnt sich eine eigene Website, wenn ich als Elektriker ohnehin ausgelastet bin?",
        answer:
          "Gerade dann. Mit einer Website steuern Sie, welche Aufträge Sie bekommen – etwa lukrative Photovoltaik- oder Smart-Home-Projekte statt nur Kleinreparaturen. Sie filtern Anfragen vor und gewinnen Kunden, die zu Ihrem Betrieb passen.",
      },
      {
        question: "Brauche ich als Elektrikerbetrieb wirklich eine eigene Website?",
        answer:
          "Ja. Die meisten Kunden suchen Handwerker heute zuerst online. Ohne eigene Website überlassen Sie diese Anfragen der Konkurrenz oder Portalen, die für jeden Lead Gebühren verlangen. Eine eigene Seite gehört Ihnen – ohne Vermittlungsprovision.",
      },
    ],
  },
  {
    slug: "sanitaer",
    nav: "Sanitär",
    navLong: "Website für Sanitärbetriebe",
    href: "/website-fuer-sanitaer/",
    tagline: "Bad, Heizung, Rohrbruch – Anfragen rund um die Uhr, auch wenn Sie auf der Baustelle sind.",
    serviceType: "Webdesign für Sanitärbetriebe",
    serviceDescription:
      "Professionelle Websites für Sanitärbetriebe ab 499 € – DSGVO-konform, mobiloptimiert, SEO-optimiert.",
    servicesHeading: "Für jede Sanitär-Leistung sichtbar",
    servicesIntro:
      "Heizung, Bad oder Notdienst – Kunden wollen wissen, was Sie können, bevor sie anrufen. Eine klare Leistungsübersicht erhöht die Qualität der Anfragen und bringt Sie für die richtigen Suchbegriffe nach vorne.",
    services: [
      "Bad-Renovierung & Sanierung",
      "Heizungsinstallation & -wartung",
      "Wärmepumpen & moderne Heiztechnik",
      "Rohrbruch & Notdienst",
      "Wasser- & Abwasserinstallation",
      "Barrierefreie Bäder",
      "Armaturen & Sanitärobjekte",
      "Entwässerung & Abflussreinigung",
    ],
    faqHeading: "Häufige Fragen zur Sanitär-Website",
    faqs: [
      {
        question: "Was kostet eine Website für einen Sanitärbetrieb?",
        answer:
          "Eine professionelle Website für Ihren Sanitärbetrieb kostet bei DigitalHandwerk 499 € als einmaliger Festpreis. Enthalten sind Design, Leistungsübersicht, SEO-Grundlagen, DSGVO-konforme Umsetzung und Kontaktformular. Kein Abo, keine versteckten Kosten.",
      },
      {
        question: "Bringt mir eine Website neue Kunden, auch ohne Notdienst?",
        answer:
          "Ja. Auch geplante Aufträge wie Bad-Renovierungen oder der Heizungstausch werden online recherchiert. Eine klare Leistungsübersicht mit Referenzen überzeugt Kunden, die in hochwertige Projekte investieren wollen – nicht nur Notfälle.",
      },
      {
        question: "Wie werde ich bei Notfallanfragen gefunden?",
        answer:
          "Durch lokale SEO-Optimierung rankt Ihre Website für Suchanfragen wie „Klempner Notfall Karlsruhe“ oder „Rohrbruch Sanitär sofort“. Eine schnelle, mobiloptimierte Seite mit gut sichtbarer Telefonnummer sorgt dafür, dass Kunden im Ernstfall direkt bei Ihnen anrufen.",
      },
      {
        question: "Kann ich Bad- und Heizungsprojekte mit Bildern darstellen?",
        answer:
          "Unbedingt. Eine Referenzgalerie mit abgeschlossenen Bädern und Heizungsanlagen schafft Vertrauen und hebt Sie von Mitbewerbern ab. Sie liefern die Fotos, ich integriere sie performant und mobiloptimiert.",
      },
      {
        question: "Wie lange dauert es, bis meine Sanitär-Website online ist?",
        answer:
          "In der Regel ist die Website innerhalb von 2–4 Wochen fertig und live. Nach einem kurzen Erstgespräch erhalten Sie einen konkreten Zeitplan mit klaren Meilensteinen.",
      },
    ],
  },
  {
    slug: "schreiner",
    nav: "Schreiner",
    navLong: "Website für Schreiner",
    href: "/website-fuer-schreiner/",
    tagline: "Maßmöbel & Innenausbau mit einer Referenzgalerie in Szene gesetzt, die Vertrauen schafft.",
    serviceType: "Webdesign für Schreinereien",
    serviceDescription:
      "Professionelle Websites für Schreinereien ab 499 € – mit Referenzgalerie, DSGVO-konform, SEO-optimiert.",
    servicesHeading: "Für jedes Schreiner-Projekt gefunden werden",
    servicesIntro:
      "Maßmöbel, Küchen, Treppen, Innenausbau – wer nach einem Schreiner für ein bestimmtes Projekt sucht, findet Ihre Seite, weil die richtigen Begriffe an der richtigen Stelle stehen.",
    services: [
      "Möbel nach Maß",
      "Einbauküchen",
      "Innenausbau",
      "Türen & Zargen",
      "Treppenbau",
      "Fenster & Fensterbänke",
      "Parkett & Bodenbeläge",
      "Reparaturen & Restaurierung",
    ],
    faqHeading: "Häufige Fragen zur Schreiner-Website",
    faqs: [
      {
        question: "Was kostet eine Website für eine Schreinerei?",
        answer:
          "Eine professionelle Website für Ihre Schreinerei kostet bei DigitalHandwerk 499 € als einmaliger Festpreis. Enthalten sind Design, Referenzgalerie, SEO-Grundlagen, DSGVO-konforme Umsetzung und Kontaktformular. Kein Abo, keine versteckten Kosten.",
      },
      {
        question: "Kann ich meine Projekte als Schreiner auf der Website zeigen?",
        answer:
          "Ja, absolut. Eine Projektreferenz- oder Galerie-Sektion ist eines der wirkungsvollsten Elemente für Schreiner-Websites. Kunden sehen sofort die Qualität Ihrer Arbeit – das schafft Vertrauen, bevor das erste Gespräch stattfindet. Sie liefern die Fotos, ich integriere sie professionell.",
      },
      {
        question: "Wie finden mich Kunden, die einen Schreiner suchen?",
        answer:
          "Durch lokale SEO-Optimierung rankt Ihre Website für Suchanfragen wie „Schreiner Karlsruhe“, „Maßmöbel Schreinerei“ oder „Kücheneinbau Tischler“. Mit optimierten Meta-Tags, sauberem Code und strukturierten Daten sorgen wir dafür, dass Google Ihren Betrieb korrekt einordnet.",
      },
      {
        question: "Reichen meine Fotos vom Handy für eine Schreiner-Website?",
        answer:
          "In den meisten Fällen ja. Moderne Smartphone-Fotos sind völlig ausreichend; ich optimiere sie für schnelle Ladezeiten und eine ansprechende Darstellung. Bei Bedarf gebe ich Tipps, wie Sie Ihre Projekte noch besser in Szene setzen.",
      },
      {
        question: "Kann ich später einen Konfigurator oder Shop ergänzen?",
        answer:
          "Ja. Die Website ist modular aufgebaut. Funktionen wie ein Anfrage-Konfigurator für Möbel, ein Terminkalender oder ein kleiner Shop lassen sich jederzeit nachrüsten – wir starten schlank und erweitern, wenn Ihr Betrieb wächst.",
      },
    ],
  },
  {
    slug: "maler",
    nav: "Maler",
    navLong: "Website für Malerbetriebe",
    href: "/website-fuer-maler/",
    tagline: "Vorher–nachher zeigen statt verblassender Mundpropaganda – und mehr Aufträge gewinnen.",
    serviceType: "Webdesign für Malerbetriebe",
    serviceDescription:
      "Professionelle Websites für Malerbetriebe ab 499 € – mit Referenzgalerie, DSGVO-konform, SEO-optimiert.",
    servicesHeading: "Für jede Maler-Leistung rankbar",
    servicesIntro:
      "Innenanstrich, Fassade, Wärmedämmung – wer nach einem Maler für ein bestimmtes Projekt sucht, landet auf Ihrer Seite, weil die passenden Begriffe am richtigen Ort stehen.",
    services: [
      "Innenanstrich & Raumgestaltung",
      "Fassadenanstrich & -gestaltung",
      "Wärmedämmung (WDVS)",
      "Tapezierarbeiten",
      "Lackierarbeiten",
      "Bodenbeschichtung",
      "Trockenbau",
      "Schimmelsanierung",
    ],
    faqHeading: "Häufige Fragen zur Maler-Website",
    faqs: [
      {
        question: "Was kostet eine Website für einen Malerbetrieb?",
        answer:
          "Eine professionelle Website für Ihren Malerbetrieb kostet bei DigitalHandwerk 499 € als einmaliger Festpreis. Enthalten sind Design, Referenzgalerie, SEO-Grundlagen, DSGVO-konforme Umsetzung und Kontaktformular. Kein Abo, keine versteckten Kosten.",
      },
      {
        question: "Kann ich Vorher-Nachher-Fotos auf meiner Maler-Website zeigen?",
        answer:
          "Ja, Vorher-Nachher-Galerien sind besonders wirkungsvoll für Malerbetriebe. Kunden sehen sofort, was sie erwarten können. Sie liefern die Fotos, ich integriere sie professionell in Ihre Website – optimiert für schnelle Ladezeiten und mobile Darstellung.",
      },
      {
        question: "Wie lange dauert es, bis meine Maler-Website online ist?",
        answer:
          "In der Regel ist die Website innerhalb von 2–4 Wochen fertig und live. Nach einem kurzen Erstgespräch erhalten Sie einen konkreten Zeitplan.",
      },
      {
        question: "Wie hebe ich mich als Malerbetrieb online von der Konkurrenz ab?",
        answer:
          "Durch echte Vorher-Nachher-Bilder, klare Leistungsbeschreibungen und lokale Sichtbarkeit. Während viele Mitbewerber gar keine oder veraltete Websites haben, positioniert Sie eine moderne, schnelle Seite als professionellen Ansprechpartner in Ihrer Region.",
      },
      {
        question: "Bekomme ich über die Website auch größere Aufträge wie Fassaden?",
        answer:
          "Ja. Mit gezielten Inhalten zu Fassadengestaltung und Wärmedämmung ranken Sie für genau diese Suchanfragen. Ein strukturiertes Kontaktformular qualifiziert Anfragen vor, sodass ernsthafte Projektanfragen direkt bei Ihnen landen.",
      },
    ],
  },
  {
    slug: "kfz-betrieb",
    nav: "KFZ-Werkstatt",
    navLong: "Website für KFZ-Werkstätten",
    href: "/website-fuer-kfz-betrieb/",
    tagline: "Termine online annehmen und die Werkstatt füllen – Kunden finden Sie vor der nächsten.",
    serviceType: "Webdesign für KFZ-Werkstätten",
    serviceDescription:
      "Professionelle Websites für KFZ-Werkstätten ab 499 € – DSGVO-konform, mobiloptimiert, SEO-optimiert.",
    servicesHeading: "Für jede Werkstatt-Leistung gefunden werden",
    servicesIntro:
      "HU-Vorbereitung, Inspektion, Reifenwechsel oder Unfallschaden – wer Ihre Website besucht, soll sofort wissen, was Sie anbieten. Das spart Rückfragen und bringt passende Anfragen.",
    services: [
      "Inspektion & Wartung",
      "HU & AU Vorbereitung",
      "Reifenservice & Einlagerung",
      "Bremsen & Fahrwerk",
      "Klimaservice",
      "Unfallinstandsetzung & Karosserie",
      "Motordiagnose & Fahrzeugelektronik",
      "Ölwechsel & Service",
    ],
    faqHeading: "Häufige Fragen zur Werkstatt-Website",
    faqs: [
      {
        question: "Was kostet eine Website für eine KFZ-Werkstatt?",
        answer:
          "Eine professionelle Website für Ihre KFZ-Werkstatt kostet bei DigitalHandwerk 499 € als einmaliger Festpreis. Enthalten sind Design, Leistungsübersicht, Kontaktformular, SEO-Grundlagen und DSGVO-konforme Umsetzung. Kein Abo, keine versteckten Kosten.",
      },
      {
        question: "Kann ich Terminanfragen über meine Werkstatt-Website entgegennehmen?",
        answer:
          "Ja. Das Kontaktformular auf Ihrer Website ermöglicht Kunden, rund um die Uhr Terminanfragen zu senden. Sie erhalten die Anfrage per E-Mail und können direkt zurückrufen – kein Anrufbeantworter, kein verpasster Auftrag.",
      },
      {
        question: "Wie werde ich als KFZ-Werkstatt bei Google gefunden?",
        answer:
          "Durch lokale SEO-Optimierung Ihrer Website ranken Sie für Suchanfragen wie „KFZ Werkstatt Karlsruhe“ oder „Inspektion Autowerkstatt“. Mit strukturierten Daten, schnellen Ladezeiten und optimierten Meta-Tags sorgen wir dafür, dass Google Ihre Werkstatt korrekt einordnet.",
      },
      {
        question: "Brauche ich als freie Werkstatt überhaupt eine eigene Website?",
        answer:
          "Gerade als freie Werkstatt ist Sichtbarkeit entscheidend. Kunden vergleichen Werkstätten online nach Nähe, Leistungen und Vertrauen. Eine eigene Website macht Sie unabhängig von Portalen und zeigt, dass Sie alle Marken und Services professionell abdecken.",
      },
      {
        question: "Kann ich saisonale Leistungen wie Reifenwechsel online bewerben?",
        answer:
          "Ja. Saisonale Leistungen wie Reifenwechsel oder HU-Vorbereitung lassen sich gezielt auf der Website hervorheben. So erreichen Sie Kunden genau dann, wenn der Bedarf entsteht – und füllen Ihre Auslastung in ruhigeren Phasen.",
      },
    ],
  },
  {
    slug: "dachdecker",
    nav: "Dachdecker",
    navLong: "Website für Dachdecker",
    href: "/website-fuer-dachdecker/",
    tagline: "Nach dem Sturm sofort gefunden werden – nicht der Betrieb aus der Nachbarstadt.",
    serviceType: "Webdesign für Dachdeckerbetriebe",
    serviceDescription:
      "Professionelle Websites für Dachdeckerbetriebe ab 499 € – DSGVO-konform, mobiloptimiert, SEO-optimiert.",
    servicesHeading: "Für jede Dach-Leistung gefunden werden",
    servicesIntro:
      "Dacheindeckung, Flachdach, Sturmschaden oder Photovoltaik – wer sucht, will wissen, was Sie können. Eine klare Leistungsseite qualifiziert Anfragen und bringt Sie für mehr Suchbegriffe nach vorne.",
    services: [
      "Dacheindeckung & Neueindeckung",
      "Dachsanierung",
      "Flachdachabdichtung",
      "Dachfenster & Gauben",
      "Dachrinnen & Entwässerung",
      "Dachdämmung",
      "Photovoltaik-Montage",
      "Sturmschäden & Notreparatur",
    ],
    faqHeading: "Häufige Fragen zur Dachdecker-Website",
    faqs: [
      {
        question: "Was kostet eine Website für einen Dachdeckerbetrieb?",
        answer:
          "Eine professionelle Website für Ihren Dachdeckerbetrieb kostet bei DigitalHandwerk 499 € als einmaliger Festpreis. Enthalten sind Design, Referenzgalerie, Leistungsübersicht, SEO-Grundlagen und DSGVO-konforme Umsetzung. Kein Abo, keine versteckten Kosten.",
      },
      {
        question: "Wie kann ich als Dachdecker bei Notfallanfragen gefunden werden?",
        answer:
          "Mit lokaler SEO-Optimierung rankt Ihre Website für Suchanfragen wie „Dachdecker Notfall Karlsruhe“ oder „Sturmschaden Dach reparieren“. Schnelle Ladezeiten und eine mobiloptimierte Seite sind dabei entscheidend – da solche Anfragen fast immer vom Smartphone kommen.",
      },
      {
        question: "Wie lange dauert es, bis meine Dachdecker-Website online ist?",
        answer:
          "In der Regel ist die Website innerhalb von 2–4 Wochen fertig und live. Nach einem kurzen Erstgespräch erhalten Sie einen konkreten Zeitplan mit klaren Meilensteinen.",
      },
      {
        question: "Lohnt sich eine Website, wenn ich vor allem über Empfehlungen arbeite?",
        answer:
          "Ja. Empfehlungen sind wertvoll – aber selbst empfohlene Kunden prüfen Sie heute online, bevor sie anrufen. Eine professionelle Website mit Referenzen bestätigt die Empfehlung und macht aus Interessenten zahlende Kunden.",
      },
      {
        question: "Kann ich auf der Website auch Photovoltaik und Dämmung anbieten?",
        answer:
          "Selbstverständlich. Zusatzleistungen wie Photovoltaik-Montage, Dachdämmung oder Dachfenster lassen sich als eigene Leistungspunkte darstellen. So ranken Sie für mehr Suchanfragen und positionieren sich als Komplettanbieter rund ums Dach.",
      },
    ],
  },
];

export const tradeBySlug: Record<string, Trade> = Object.fromEntries(
  trades.map((t) => [t.slug, t]),
);

/** The local hub page, surfaced alongside the trades in grids/footer. */
export const localHub = {
  nav: "Karlsruhe",
  navLong: "Webdesign für Handwerker in Karlsruhe",
  href: "/webdesign-karlsruhe-handwerker/",
  tagline: "Ihr Webdesigner aus der Region – persönliche Beratung vor Ort, ab 499 €.",
};
