// Preview-mockup system for the letter campaign ("Vorschau-Seiten").
//
// Each entry below becomes a statically built page at /vorschau/<slug>/ that
// looks like the prospect's future website (NOT like a DigitalHandwerk page).
// Slugs carry a random suffix so the pages can't be guessed or enumerated;
// they are excluded from the sitemap and carry noindex.
//
// Workflow: add the current letter batch here, build & deploy, send letters
// with the QR code pointing at the page. Delete entries when a batch is done.

export interface PreviewProspect {
  /** URL slug incl. random suffix, e.g. "schreinerei-haag-x7k2" */
  slug: string;
  /** Cleaned-up display name used as the site's wordmark */
  businessName: string;
  /** Key into tradeBySlug: elektriker | sanitaer | schreiner | maler | kfz-betrieb | dachdecker */
  trade: string;
  /** Town without postcode, e.g. "Bretten" */
  town: string;
  /** Street + number (public directory data), shown in the contact section */
  street?: string;
  /** Display-formatted phone, e.g. "07258 85 98" */
  phone?: string;
}

export interface PreviewTheme {
  /** light page or dark page */
  mode: "light" | "dark";
  /** CSS custom properties driving the whole preview design */
  vars: {
    bg: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    accentDeep: string;
    /** readable text color on accent backgrounds */
    onAccent: string;
    radius: string;
  };
  /** heading typography personality */
  heading: "serif" | "sans-caps" | "sans";
  /** trade noun for eyebrows/copy, e.g. "Schreinerei" */
  tradeNoun: string;
  /** hero headline, {town} gets replaced */
  heroHeadline: string;
  heroSub: string;
  /** short label for the gallery placeholder tiles */
  galleryHint: string;
  /**
   * Services + heading for preview-only trades that have no public landing
   * page in trades.ts. For the six core trades these stay unset and the
   * preview pulls them from trades.ts.
   */
  servicesHeading?: string;
  services?: string[];
}

export const previewThemes: Record<string, PreviewTheme> = {
  schreiner: {
    mode: "light",
    vars: {
      bg: "#FAF6EF",
      surface: "#FFFFFF",
      surfaceMuted: "#F3ECDF",
      text: "#2B211A",
      textSecondary: "#6B5B4D",
      border: "#E5DBC9",
      accent: "#9C6B30",
      accentDeep: "#5C3D1E",
      onAccent: "#FFF9F0",
      radius: "0.75rem",
    },
    heading: "serif",
    tradeNoun: "Schreinerei",
    heroHeadline: "Möbel nach Maß. Handwerk aus {town}.",
    heroSub:
      "Vom Einbauschrank über Türen bis zum kompletten Innenausbau – Holzarbeiten, die auf den Millimeter passen. Persönlich geplant, sauber umgesetzt.",
    galleryHint: "Ihre Möbel & Projekte",
  },
  elektriker: {
    mode: "dark",
    vars: {
      bg: "#101418",
      surface: "#1A2026",
      surfaceMuted: "#222A32",
      text: "#F2F5F7",
      textSecondary: "#9FAEBA",
      border: "#2E3942",
      accent: "#FFD028",
      accentDeep: "#E0B000",
      onAccent: "#15181C",
      radius: "0.375rem",
    },
    heading: "sans-caps",
    tradeNoun: "Elektrotechnik",
    heroHeadline: "Strom, Licht & smarte Technik in {town}",
    heroSub:
      "Von der Steckdose bis zur Wallbox: Elektroinstallationen, die zuverlässig laufen – im Neubau, in der Sanierung und im Notfall.",
    galleryHint: "Ihre Anlagen & Projekte",
  },
  maler: {
    mode: "light",
    vars: {
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      surfaceMuted: "#F7F4F2",
      text: "#221D26",
      textSecondary: "#665E6E",
      border: "#E9E4E1",
      accent: "#D93A2B",
      accentDeep: "#A82417",
      onAccent: "#FFF8F6",
      radius: "0.625rem",
    },
    heading: "serif",
    tradeNoun: "Malerfachbetrieb",
    heroHeadline: "Frische Farbe für {town}",
    heroSub:
      "Innenräume, Fassaden, Lackierarbeiten – saubere Ausführung, ordentliche Baustelle und ein Ergebnis, das lange hält.",
    galleryHint: "Vorher / Nachher",
  },
  dachdecker: {
    mode: "light",
    vars: {
      bg: "#F6F5F3",
      surface: "#FFFFFF",
      surfaceMuted: "#ECEAE6",
      text: "#23272B",
      textSecondary: "#5C636B",
      border: "#DDD9D3",
      accent: "#C4502C",
      accentDeep: "#933A1E",
      onAccent: "#FFF7F4",
      radius: "0.25rem",
    },
    heading: "sans-caps",
    tradeNoun: "Dachdeckerbetrieb",
    heroHeadline: "Ihr Dach in guten Händen – {town} & Umgebung",
    heroSub:
      "Neueindeckung, Sanierung, Reparatur nach Sturm: Arbeit, auf die Sie sich verlassen können. Dicht, dauerhaft, sauber ausgeführt.",
    galleryHint: "Ihre Dächer & Baustellen",
  },
  sanitaer: {
    mode: "light",
    vars: {
      bg: "#F4F9FB",
      surface: "#FFFFFF",
      surfaceMuted: "#E8F2F6",
      text: "#142A33",
      textSecondary: "#4E6973",
      border: "#D7E6EC",
      accent: "#0E6E82",
      accentDeep: "#0A4D5B",
      onAccent: "#F2FBFD",
      radius: "9999px",
    },
    heading: "sans",
    tradeNoun: "Sanitär & Heizung",
    heroHeadline: "Bad & Heizung aus einer Hand in {town}",
    heroSub:
      "Vom neuen Bad über die Heizungswartung bis zum Rohrbruch-Notdienst – schnelle Hilfe und saubere Installationen vom Fachbetrieb.",
    galleryHint: "Ihre Bäder & Anlagen",
  },
  "kfz-betrieb": {
    mode: "dark",
    vars: {
      bg: "#17181A",
      surface: "#1F2124",
      surfaceMuted: "#27292D",
      text: "#F1F2F3",
      textSecondary: "#A2A7AD",
      border: "#34373C",
      accent: "#F4641E",
      accentDeep: "#C84A0E",
      onAccent: "#FFF6F1",
      radius: "0.375rem",
    },
    heading: "sans-caps",
    tradeNoun: "KFZ-Werkstatt",
    heroHeadline: "Ihre freie Werkstatt in {town}",
    heroSub:
      "Inspektion, HU-Vorbereitung, Reifen, Bremsen – alle Marken, faire Preise und ein Termin, wenn Sie ihn brauchen.",
    galleryHint: "Ihre Werkstatt",
  },
  gartenbau: {
    mode: "light",
    vars: {
      bg: "#F5F8F2",
      surface: "#FFFFFF",
      surfaceMuted: "#EAF0E3",
      text: "#25301F",
      textSecondary: "#5C6B52",
      border: "#DAE3D0",
      accent: "#4C7A3D",
      accentDeep: "#36592B",
      onAccent: "#F6FBF2",
      radius: "0.75rem",
    },
    heading: "serif",
    tradeNoun: "Garten- & Landschaftsbau",
    heroHeadline: "Ihr Garten. Unser Handwerk. In {town}.",
    heroSub:
      "Von der Neuanlage über Pflaster und Natursteinmauern bis zur laufenden Pflege – Außenanlagen, die jedes Jahr schöner werden.",
    galleryHint: "Ihre Gärten & Projekte",
    servicesHeading: "Alles rund um Ihren Garten",
    services: [
      "Gartengestaltung & Neuanlage",
      "Pflasterarbeiten & Wege",
      "Terrassen & Sitzplätze",
      "Natursteinmauern & Hochbeete",
      "Zaunbau & Sichtschutz",
      "Rollrasen & Bepflanzung",
      "Teich- & Wasseranlagen",
      "Gartenpflege & Baumschnitt",
    ],
  },
  zimmerei: {
    mode: "dark",
    vars: {
      bg: "#221C16",
      surface: "#2C241C",
      surfaceMuted: "#352C22",
      text: "#F4EDE3",
      textSecondary: "#BFAE99",
      border: "#473A2C",
      accent: "#D9912F",
      accentDeep: "#B57117",
      onAccent: "#231A0E",
      radius: "0.375rem",
    },
    heading: "sans-caps",
    tradeNoun: "Zimmerei & Holzbau",
    heroHeadline: "Holzbau, der Bestand hat – {town} & Region",
    heroSub:
      "Dachstühle, Carports, Aufstockungen: massives Handwerk in Holz, geplant und ausgeführt vom Fachbetrieb.",
    galleryHint: "Ihre Bauprojekte",
    servicesHeading: "Vom Dachstuhl bis zum Anbau",
    services: [
      "Dachstühle & Dachtragwerke",
      "Carports & Überdachungen",
      "Aufstockungen & Anbauten",
      "Holzrahmenbau",
      "Gauben & Dachausbau",
      "Terrassen & Balkone aus Holz",
      "Fachwerk- & Altbausanierung",
      "Innenausbau mit Holz",
    ],
  },
  fliesenleger: {
    mode: "light",
    vars: {
      bg: "#FAFAF8",
      surface: "#FFFFFF",
      surfaceMuted: "#F0F0EC",
      text: "#26262B",
      textSecondary: "#63636B",
      border: "#E3E3DD",
      accent: "#3E6B75",
      accentDeep: "#2B4D55",
      onAccent: "#F4FAFB",
      radius: "0.125rem",
    },
    heading: "sans",
    tradeNoun: "Fliesenleger",
    heroHeadline: "Fliesen, präzise verlegt – in {town}",
    heroSub:
      "Bad, Küche, Terrasse: saubere Flächen, gerade Fugen und Beratung, die zur Nutzung passt – vom Fachbetrieb.",
    galleryHint: "Ihre Bäder & Flächen",
    servicesHeading: "Flächen, die überzeugen",
    services: [
      "Bad- & Sanitärfliesen",
      "Großformat & XXL-Fliesen",
      "Naturstein & Feinsteinzeug",
      "Barrierefreie Duschen",
      "Balkon- & Terrassenbeläge",
      "Mosaik & Akzentflächen",
      "Reparatur & Austausch",
      "Silikon- & Fugenarbeiten",
    ],
  },
  flaschner: {
    mode: "light",
    vars: {
      bg: "#F4F5F6",
      surface: "#FFFFFF",
      surfaceMuted: "#E9EBED",
      text: "#23272C",
      textSecondary: "#5B636C",
      border: "#DCDFE3",
      accent: "#4A6B8A",
      accentDeep: "#34506B",
      onAccent: "#F4F8FC",
      radius: "0.375rem",
    },
    heading: "serif",
    tradeNoun: "Flaschnerei & Spenglerei",
    heroHeadline: "Spenglerarbeiten mit Präzision – {town} & Umgebung",
    heroSub:
      "Dachrinnen, Stehfalz, Verkleidungen: Blecharbeiten nach Maß, die dicht halten und gut aussehen – über Jahrzehnte.",
    galleryHint: "Ihre Blecharbeiten",
    servicesHeading: "Blech & Metall rund ums Dach",
    services: [
      "Dachrinnen & Fallrohre",
      "Stehfalz-Bedachungen",
      "Kamin- & Gaubenverkleidungen",
      "Wandverkleidungen aus Metall",
      "Dachentwässerung",
      "Blecharbeiten nach Maß",
      "Reparaturen & Wartung",
      "Denkmalgerechte Arbeiten",
    ],
  },
};

/** Current letter batch. Delete entries once a batch is finished & redeploy. */
export const previewProspects: PreviewProspect[] = [
  {
    slug: "schreinerei-haag-x7k2",
    businessName: "Schreinerei Haag",
    trade: "schreiner",
    town: "Oberderdingen",
    street: "Alemannenstr. 26",
    phone: "07258 85 98",
  },
  {
    slug: "elektro-neuwert-m3f8",
    businessName: "Elektrotechnik Neuwert",
    trade: "elektriker",
    town: "Bretten",
    street: "Theodor-Heuss-Str. 8",
    phone: "0172 621 05 33",
  },
  {
    slug: "maler-weigele-q5w9",
    businessName: "Malerfachgeschäft Weigele",
    trade: "maler",
    town: "Bretten",
    street: "Obere Mühlstr. 28",
    phone: "07252 77 95 83",
  },
  // Demo entries for the preview-only trades — replace with real prospects
  // before sending letters, then delete.
  {
    slug: "demo-gartenbau-z4t7",
    businessName: "Gartenbau Musterbetrieb",
    trade: "gartenbau",
    town: "Karlsruhe",
  },
  {
    slug: "demo-zimmerei-k8r2",
    businessName: "Zimmerei Musterbetrieb",
    trade: "zimmerei",
    town: "Karlsruhe",
  },
  {
    slug: "demo-fliesen-p6n3",
    businessName: "Fliesen Musterbetrieb",
    trade: "fliesenleger",
    town: "Karlsruhe",
  },
  {
    slug: "demo-flaschner-w9j5",
    businessName: "Flaschnerei Musterbetrieb",
    trade: "flaschner",
    town: "Karlsruhe",
  },
];
