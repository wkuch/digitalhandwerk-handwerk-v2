# DigitalHandwerk v2: Premium Website Refresh Implementation Plan

## Summary

This plan rebuilds the DigitalHandwerk landing page from the ground up as a premium, conversion-optimized static site. The existing site (Astro 5.18, React islands, Tailwind 3, shadcn/ui) is functional but looks templated: centered-everything layouts, uniform spacing, 4-column card grids, default shadcn styling, and no motion. The v2 replaces every visual surface while preserving the proven content, information architecture, and contact form infrastructure.

**Framework:** Astro (latest stable, currently 5.x) with React islands for interactivity.
**CSS:** Tailwind 4 (new CSS-based configuration, `@theme` directive, no `tailwind.config.ts`).
**Animation:** Motion (framer-motion, now published as `motion`) for React islands; CSS animations + Intersection Observer for Astro-rendered sections.
**Deployment:** Vercel static.
**Package manager:** Bun (existing project uses `bun.lockb`).

### Key Architectural Decisions

1. **Tailwind 4 over Tailwind 3.** Tailwind 4 uses CSS-native configuration (`@import "tailwindcss"` + `@theme {}`) with no JavaScript config file. This aligns with the premium-website-plugin's design-system-strategy and removes the `tailwind.config.ts` / `postcss.config.js` boilerplate. The shadcn/ui components will need minor adjustments since shadcn's latest CLI supports Tailwind 4.
2. **Component decomposition.** The existing site is a single 809-line `index.astro` monolith. The v2 breaks each section into its own `.astro` component file, enabling parallel development and keeping each file under 150 lines.
3. **Premium typography.** Replace the current Montserrat/Inter setup with a display font for headlines (Instrument Serif) and a modern sans for body (Instrument Sans or Geist Sans). This immediately separates the site from the template look.
4. **Asymmetric, section-by-section layout.** Each section gets a distinct layout treatment. No two consecutive sections use the same grid. Varied vertical padding (120-200px). Left-aligned hero. Alternating content/image sides. This is the core anti-template strategy.
5. **Keep React islands minimal.** Only `ContactFormIsland` (client:load) and `FaqIsland` (client:visible). All animation for static sections uses CSS + a tiny scroll-reveal script (no framer-motion for static content). This maximizes Lighthouse performance.

---

## Context Findings

### Existing Codebase Analysis

| Aspect | Current State | v2 Direction |
|---|---|---|
| `index.astro` | 809 lines, all sections inline | Decomposed into ~12 section components |
| Layout | `BaseLayout.astro` with comprehensive `<head>` | Reuse and enhance (add font preloads, refine structured data) |
| CSS | `index.css` with shadcn CSS variables + `@tailwind` directives | Replace with Tailwind 4 `@import "tailwindcss"` + `@theme {}` |
| Tailwind config | `tailwind.config.ts` (JS-based, Tailwind 3) | Eliminated; tokens in CSS via `@theme` |
| Typography | Montserrat declared in config, Inter loaded via Google Fonts | Instrument Serif (headlines) + Instrument Sans (body) |
| Color palette | shadcn defaults (HSL variables) + emerald/stone hardcoded | Custom palette via `@theme` tokens: warm stone + deep emerald, no HSL indirection |
| Contact form | React Hook Form + Zod + Web3Forms (`contact-form.ts`) | Carry forward unchanged; visual restyling only |
| FAQ | Radix Accordion via shadcn | Carry forward; restyled |
| Assets | `Logo.png`, `portrait_wanja.jpg`, `flaschnerei-just-showcase.jpeg`, `dachdoktor-website-preview.jpg` | Reuse all; generate 4-6 additional images via Gemini API |
| SEO | Comprehensive: canonical, OG, Twitter, JSON-LD, geo, sitemap | Carry forward all structured data; enhance with BreadcrumbList |
| Vercel config | Security headers in `vercel.json` | Carry forward unchanged |
| Legal pages | `datenschutz.astro`, `impressum.astro` | Port content, apply new design system |
| 404 page | Minimal, unstyled | Premium 404 with brand personality |

### Content to Preserve (from existing `index.astro`)

All German copy, pricing, FAQ content, structured data, contact info, references, and legal text are carried forward. Copy will be reviewed against the anti-slop rules and lightly edited for voice, but the factual content and value propositions stay.

### Business Context (from `Docs/Business Plan.md`)

- Target: Handwerksbetriebe (1-10 employees), regional focus Karlsruhe, nationwide service
- Pricing: Starter 399 EUR (discounted from 499), Professional 799 EUR (discounted from 899)
- Key differentiators: personal contact (no agency), fast delivery, DSGVO compliance, trade-specific
- Wanja Mensch is the solo operator and personal brand

---

## Phase 1: Project Scaffold

### 1.1 Initialize Astro Project

Create a fresh Astro project in `/Users/wakuch/dev/wm-stuff/digitalhandwerk-handwerk-v2/`.

**Dependencies to install:**

```
# Core
astro (latest stable)
@astrojs/react
@astrojs/sitemap
@astrojs/vercel

# CSS
tailwindcss (v4)
@tailwindcss/vite

# React islands
react
react-dom
@types/react
@types/react-dom

# Form (carried from v1)
react-hook-form
@hookform/resolvers
zod
sonner

# UI primitives (only what's needed)
@radix-ui/react-accordion
@radix-ui/react-checkbox
@radix-ui/react-label
@radix-ui/react-slot
class-variance-authority
clsx
tailwind-merge

# Icons
lucide-react

# Animation (React islands only)
motion
```

**No longer needed (do NOT install):**
- `tailwindcss-animate` (Tailwind 4 has native animation utilities)
- `@astrojs/tailwind` (Tailwind 4 uses `@tailwindcss/vite` instead)
- `@tailwindcss/typography` (not needed; prose styles are custom)
- `autoprefixer` (Tailwind 4 includes autoprefixing)
- `postcss` (Tailwind 4 uses Vite plugin, not PostCSS)

### 1.2 Configuration Files

**`astro.config.mjs`:**
- `site: 'https://www.digitalhandwerk-mensch.de'`
- `output: 'static'`
- `adapter: vercel()`
- `integrations: [react(), sitemap()]`
- Tailwind 4 via Vite plugin: `vite: { plugins: [tailwindcss()] }`
- Path alias: `vite.resolve.alias` for `@/` to `./src`

**`tsconfig.json`:**
- Extend `astro/tsconfigs/strict`
- Path alias: `@/*` to `./src/*`
- `jsx: "react-jsx"`, `jsxImportSource: "react"`

**`vercel.json`:**
- Copy security headers from existing site unchanged

**No `tailwind.config.ts` file.** No `postcss.config.js` file. Tailwind 4 configuration is entirely in CSS.

**`.env`:**
- Copy `GEMINI_API_KEY` from existing `.env`

### 1.3 Validation Gate
- `bun run build` completes without errors
- `bun run dev` serves at localhost:4321
- A stub page renders with Tailwind classes working

---

## Phase 2: Design System

This is the most critical phase. Every visual decision is made here, before any component is built.

### 2.1 Color Palette

Evolve the existing Stone + Emerald palette into something more intentional. The "Clean Authority with warm undertones" direction:

```
Primary text:        #1C1917  (stone-900, warm near-black)
Secondary text:      #57534E  (stone-600)
Muted text:          #A8A29E  (stone-400)
Background:          #FAFAF9  (stone-50, warm white)
Surface:             #FFFFFF  (pure white for cards)
Surface muted:       #F5F5F4  (stone-100)
Border:              #E7E5E4  (stone-200)
Border subtle:       #D6D3D1  (stone-300)

Accent:              #047857  (emerald-700, deeper than current emerald-600)
Accent hover:        #065F46  (emerald-800)
Accent light:        #D1FAE5  (emerald-100, for badges/highlights)
Accent surface:      #ECFDF5  (emerald-50, for tinted sections)

Dark section bg:     #1C1917  (stone-900)
Dark section text:   #F5F5F4  (stone-100)
Dark section muted:  #A8A29E  (stone-400)
```

### 2.2 Typography

**Fonts:**
- **Headlines:** Instrument Serif (Google Fonts) at weights 400. Gives warmth and personality. Distinctive without being flashy. Signals quality over tech-bro.
- **Body & UI:** Inter (Google Fonts) at weights 400, 500, 600. Already excellent for body text, widely supported.
- **Monospace (optional):** JetBrains Mono for any code/technical elements.

**Type Scale:**
```
text-xs:    0.75rem / 1rem        (12px, labels)
text-sm:    0.875rem / 1.25rem    (14px, captions)
text-base:  1rem / 1.6            (16px, body)
text-lg:    1.125rem / 1.6        (18px, lead text)
text-xl:    1.25rem / 1.5         (20px, subheads)
text-2xl:   1.5rem / 1.4          (24px, section labels)
text-3xl:   2rem / 1.2            (32px, H3)
text-4xl:   2.5rem / 1.15         (40px, H2)
text-5xl:   3.5rem / 1.1          (56px, H1)
text-6xl:   4.5rem / 1.05         (72px, hero display, desktop only)
```

Headline letter-spacing: -0.02em to -0.03em.
Body letter-spacing: normal.

### 2.3 Spacing Scale

Use a custom scale that creates breathing room:

```
section-padding-y:   clamp(80px, 10vw, 160px)    (responsive section spacing)
section-padding-y-lg: clamp(100px, 14vw, 200px)  (hero and major sections)
content-max-width:   1200px                        (narrower than current 1400px)
text-max-width:      680px                         (optimal reading width)
gap-section-heading: 2rem                          (32px between label and heading)
gap-heading-body:    1.5rem                        (24px between heading and body)
```

### 2.4 Border Radius System

```
radius-sm:    4px    (inputs, small elements)
radius-md:    8px    (buttons, tags)
radius-lg:    12px   (cards)
radius-xl:    16px   (hero cards, featured elements)
radius-full:  9999px (pills, avatars)
```

### 2.5 Shadow System

```
shadow-sm:   0 1px 2px rgba(28, 25, 23, 0.04)
shadow-md:   0 4px 8px rgba(28, 25, 23, 0.06)
shadow-lg:   0 8px 24px rgba(28, 25, 23, 0.08)
shadow-xl:   0 16px 48px rgba(28, 25, 23, 0.12)
```

### 2.6 CSS Implementation

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  /* All color, typography, spacing, radius, and shadow tokens defined here */
  /* This replaces tailwind.config.ts entirely */
}

/* Base layer overrides */
/* Font imports (with preload hints in BaseLayout.astro) */
/* Custom utility classes for animations */
```

### 2.7 Validation Gate
- All design tokens render correctly via Tailwind utility classes
- Typography hierarchy is visually distinct at each level
- Color contrast passes WCAG AA (verify emerald on white, white on stone-900)

---

## Phase 3: Component Architecture

### 3.1 Project Structure

```
src/
  assets/                      # Images processed by Astro
    Logo.png                   # Carried from v1
    portrait_wanja.jpg         # Carried from v1
    flaschnerei-just-showcase.jpeg
    dachdoktor-website-preview.jpg
    hero-craftsman.webp        # NEW: Gemini-generated
    workspace-detail.webp      # NEW: Gemini-generated
    tools-closeup.webp         # NEW: Gemini-generated
    og-image.webp              # NEW: Gemini-generated
  components/
    layout/
      BaseLayout.astro         # <head>, font loading, structured data
      Header.astro             # Sticky nav with scroll behavior
      Footer.astro             # Footer with links and contact
      Container.astro          # Max-width wrapper
      Section.astro            # Section wrapper with consistent padding
    sections/
      Hero.astro               # Hero section
      WhySection.astro         # Benefits / differentiators
      PackagesSection.astro    # Pricing cards
      ProcessSection.astro     # 4-step process
      ReferencesSection.astro  # Portfolio / case studies
      AboutSection.astro       # About Wanja
      ContactSection.astro     # Contact form wrapper
      FaqSection.astro         # FAQ wrapper
    islands/
      ContactFormIsland.tsx    # React: form + validation + submission
      FaqIsland.tsx            # React: accordion
    ui/                        # shadcn primitives (React, for islands only)
      accordion.tsx
      button.tsx
      checkbox.tsx
      form.tsx
      input.tsx
      label.tsx
      textarea.tsx
    shared/
      SectionLabel.astro       # Reusable uppercase label ("Der Unterschied")
      ScrollReveal.astro       # CSS-only scroll reveal wrapper
  lib/
    contact-form.ts            # Carried from v1 unchanged
    utils.ts                   # cn() utility
  pages/
    index.astro                # Composes all sections
    datenschutz.astro
    impressum.astro
    404.astro
  styles/
    global.css                 # Tailwind 4 + @theme tokens
public/
    favicon.ico
    favicon-16x16.png
    favicon-32x32.png
    android-chrome-192x192.png
    android-chrome-512x512.png
    apple-touch-icon.png
    manifest.json
    robots.txt
```

### 3.2 Layout Components

**`Container.astro`:**
- Max-width 1200px (narrower than current 1400px for tighter content)
- Horizontal padding: `px-6 md:px-8`
- Accepts `class` prop for overrides
- Follow pattern: simple wrapper, no logic

**`Section.astro`:**
- Applies the `section-padding-y` responsive padding
- Accepts `id`, `class`, `dark` (boolean) props
- When `dark`, applies stone-900 background + light text
- Renders a `<section>` element with proper `id` for anchor links

**`SectionLabel.astro`:**
- The uppercase tracking-widest eyebrow label used above section headings
- Accepts `text` and optional `dark` prop for color variant
- Consistent styling across all sections

**`ScrollReveal.astro`:**
- Uses Intersection Observer (inline `<script>` tag)
- Adds `data-reveal` attribute; CSS handles the animation
- Supports `delay` prop for staggered reveals
- Respects `prefers-reduced-motion`
- No JavaScript framework dependency

### 3.3 Section Components

Each section is its own `.astro` file. This is the core architectural improvement over v1's monolith.

**Design principles per section:**
- No two adjacent sections share the same background color
- No two adjacent sections use the same layout pattern (e.g., centered -> left-aligned -> asymmetric grid)
- Each section has at least one distinctive visual element

Section-by-section layout plan is detailed in Phase 5.

### 3.4 React Islands

**`ContactFormIsland.tsx`:**
- Carry forward from v1 with minimal changes
- Visual restyling only (new tokens, updated input styles)
- Add Motion entrance animation (fade-up on the form container)
- Keep Web3Forms integration unchanged
- Keep URL param pre-filling unchanged
- Update Datenschutz link styling to match new design

**`FaqIsland.tsx`:**
- Carry forward from v1
- Restyle accordion to match new design tokens
- Add Motion for smooth open/close (Radix already animates, but add polish)
- Content unchanged

### 3.5 Validation Gate
- All component files created with proper TypeScript interfaces
- No component exceeds 150 lines
- `index.astro` is a clean composition of sections, under 80 lines
- `bun run build` succeeds

---

## Phase 4: BaseLayout and Header

### 4.1 `BaseLayout.astro`

Port from v1 with these changes:
- Font loading: preconnect + preload for Instrument Serif + Inter (replace Montserrat)
- Use `font-display: swap` on both fonts
- Update JSON-LD structured data (preserve all business info)
- Add BreadcrumbList JSON-LD for datenschutz and impressum pages
- OG image: point to new generated `og-image.webp`
- Preserve all existing meta tags (geo, canonical, OG, Twitter Cards)
- Import `src/styles/global.css` in frontmatter
- `scroll-behavior: smooth` on `<html>`
- No `@astrojs/tailwind` integration import (Tailwind 4 uses Vite plugin)

### 4.2 `Header.astro`

Complete redesign from v1's scroll-behavior-toggling header:

**Desktop (md+):**
- Fixed at top, full width
- Initially transparent with white text (blends with dark hero)
- On scroll (>40px): white background, subtle shadow, dark text
- Logo (smaller on scroll) + brand name left
- Nav links right: Pakete, Ablauf, Referenzen, Uber mich, FAQ
- CTA button right: "Erstgesprach buchen" (styled as emerald button)
- Scroll behavior: handled by a small inline `<script>` (same pattern as v1 but cleaner)

**Mobile (<md):**
- Logo + brand name left
- Hamburger menu button right (this is new; v1 only showed a contact link)
- Tapping hamburger opens a full-screen overlay with nav links
- The mobile menu is an Astro component with a `<script>` for toggle behavior (no React needed)

**Important:** The mobile hamburger menu is the one piece of new interactive UI. It can be done with pure CSS/JS: a checkbox hack or a small script that toggles a class. No React island needed.

### 4.3 Validation Gate
- Header renders correctly at all breakpoints
- Scroll behavior transitions smoothly (transparent -> solid)
- Mobile menu opens/closes
- Nav links scroll to correct sections
- CTA button scrolls to contact section

---

## Phase 5: Page-by-Page Build (Index)

### 5.1 Hero Section

**Current (v1):** Centered grid with text left, profile card right. Dark background. Standard layout.

**v2 Design:** Asymmetric, dramatic, full-viewport hero.

- Full viewport height (`min-h-screen`)
- Dark background (stone-900) with subtle gradient accent (emerald glow, top-right)
- Left-aligned content (60% width on desktop)
- Display headline in Instrument Serif, large (text-6xl on desktop, text-4xl mobile)
  - Headline: "Ihre Handwerker-Website. Gebaut, als ware sie meine eigene." (or similar, following anti-slop rules)
- Subtext: 1-2 sentences, max 2 lines. Body font, stone-300.
- Two CTA buttons: primary emerald "Erstgesprach buchen" + outline "Pakete ansehen"
- Trust signals below CTAs: horizontal row of 3 items (24h response, DSGVO, price). NOT card grid. Simple inline text with small icons.
- Right side (40%): Generated hero image or abstract visual element (NOT the profile card, which moves to About section)
- Animated entrance: staggered fade-up on headline, subtext, CTAs, trust signals (CSS-only with `ScrollReveal`)
- Scroll indicator at bottom: subtle animated chevron

**Anti-template notes:**
- NOT centered text
- NOT a card grid for trust signals
- NOT a symmetric 50/50 split
- The right-side visual is offset and slightly overlapping the section boundary

### 5.2 Why / Benefits Section

**Current (v1):** 4-column card grid. Classic template pattern.

**v2 Design:** Alternating spotlight layout.

- Light background (stone-50)
- Section label + heading left-aligned (not centered)
- Instead of 4 equal cards: 2 rows, each with a large statement left and detail right (or vice versa, alternating)
- Row 1: Large bold statement "Schnelle Umsetzung" left (text-3xl Instrument Serif), supporting text right with subtle icon
- Row 2: Reversed. Supporting text left, large bold statement "Rechtssicher & SEO-optimiert" right
- This creates visual rhythm and avoids the grid-of-cards pattern
- Each row has a subtle horizontal divider
- Scroll-reveal on each row with stagger

**Alternatively:** If 4 benefits must be shown, use 2x2 with dramatically different card sizes (one large spanning the full width, three smaller below). NOT 4 equal columns.

### 5.3 Packages / Pricing Section

**Current (v1):** 2-column card grid + "Optionale Erweiterungen" section below. The cards are good but feel template-ish.

**v2 Design:** Featured pricing with visual hierarchy.

- White background
- Section label + heading center-aligned (pricing is one of few sections where centered works)
- Starter card: emphasized (larger, dark background, slight scale up). "Fur die meisten ausreichend" badge. This is the conversion target.
- Professional card: standard size, lighter background. Secondary visual weight.
- Cards are NOT side-by-side equals. Starter is 60% width, Professional is 40%. Or Starter has a colored left border, Professional does not.
- Feature lists with custom checkmark icons (not generic lucide Check)
- CTA buttons: Starter gets the primary emerald button, Professional gets an outline button
- "Optionale Erweiterungen" section below: cleaner table layout instead of nested cards. Simple rows with feature name, description, price.
- Pricing example calculation at the bottom: subtle highlight box

### 5.4 Process Section

**Current (v1):** 4-column card grid with numbered circles. Standard "how it works" template.

**v2 Design:** Vertical timeline (mobile-first thinking).

- Light background (stone-100 or stone-50)
- Section label + heading left-aligned
- Vertical timeline with numbered steps on the left, content on the right
- On mobile: single column with numbers as inline badges
- On desktop: alternating left/right (step 1 content right, step 2 content left, etc.) creates visual interest
- Each step has: number badge, heading (Instrument Serif), short description
- A subtle connecting line between steps (CSS border or gradient)
- Scroll-reveal: each step animates in as you scroll past it

### 5.5 References Section

**Current (v1):** 2-column card grid with image overlays. Functional but standard.

**v2 Design:** Showcase gallery with hover interaction.

- Dark background (stone-900) for contrast with the image showcases
- Section label + heading left-aligned, white text
- Two reference projects shown as large image cards (aspect ratio ~16:10)
- On hover: image scales slightly, overlay darkens, "Website ansehen" link appears with arrow
- Images use `<Image>` from `astro:assets` for WebP conversion and responsive srcset
- Below each image: project name + URL in clean typography
- Space for future projects: add a subtle "Weitere Projekte folgen" note

### 5.6 About Section

**Current (v1):** Grid with profile card left, 3 border-left cards right. Functional.

**v2 Design:** Personal, editorial layout.

- Warm background (stone-50 or a very subtle emerald-50 tint)
- Asymmetric: large portrait image (left, ~40%) + text content (right, ~60%)
- Portrait: `portrait_wanja.jpg` displayed large, rounded-lg, with a subtle shadow
- Right side: Instrument Serif heading "Wanja Mensch", subtitle "Webentwickler & Digitalberater"
- Bio text in body font, comfortable reading width
- Below bio: 2-3 value propositions as simple text with small emerald accent dots (not cards)
- Quote at the bottom: slightly indented, italic, with a vertical emerald line
- This layout emphasizes the personal brand, which is the key differentiator

### 5.7 FAQ Section

**Current (v1):** Centered heading, accordion in a white card. Clean but basic.

**v2 Design:** Two-column FAQ.

- Light background
- Left column (40%): Section label, heading (Instrument Serif), and a short encouraging paragraph + direct contact CTA ("Frage nicht dabei? Schreiben Sie mir.")
- Right column (60%): The FaqIsland accordion, visually refined
- The left column creates asymmetry and avoids the centered-heading-above-accordion pattern
- Accordion styling: no borders between items, just generous spacing. Open item has emerald-tinted background.

### 5.8 Contact Section

**Current (v1):** Dark background, 2/5 + 3/5 grid (contact info left, form right). Functional.

**v2 Design:** Enhanced contact with urgency.

- Dark background (stone-900) with subtle emerald gradient glow
- Centered heading area: "Jetzt Anfrage senden" (Instrument Serif, white, large)
- Subtext: "Ich melde mich innerhalb von 24 Stunden bei Ihnen."
- Below: 2-column layout
  - Left: Direct contact info (email, phone) in a card with light background
  - Right: Contact form (React island) in a card with light background
- Both cards float on the dark background, creating depth
- The form card is wider than the contact card (3:2 ratio)
- Add a subtle trust reinforcement below: "Ihre Daten sind sicher. DSGVO-konform."

### 5.9 Footer

**Current (v1):** 3-column grid in dark background. Standard.

**v2 Design:** Clean, minimal footer.

- Stone-900 background (continuous from contact section, separated by a subtle border)
- Two-row layout:
  - Top row: Logo/brand left, nav links center, contact info right
  - Bottom row: Copyright left, Impressum + Datenschutz links right
- Minimal, no excess. The footer is not a design statement.

### 5.10 Validation Gate
- All sections render at 320px, 768px, 1024px, 1440px
- No horizontal scrollbar at any width
- Scroll-reveal animations fire correctly
- All anchor links from nav work
- CTA buttons in Packages section pre-fill the contact form
- Content matches v1 (no information lost)

---

## Phase 6: Legal and Utility Pages

### 6.1 `datenschutz.astro` and `impressum.astro`

- Port all content from v1 unchanged (legal text must not be altered)
- Apply new design system: typography, spacing, colors
- Add a proper header with back-navigation
- Use the `BaseLayout.astro` with page-specific title/description/canonical
- Add BreadcrumbList JSON-LD

### 6.2 `404.astro`

- Redesign from the current minimal placeholder
- Use the brand's voice: "Diese Seite gibt es nicht. Aber Ihre neue Handwerker-Website schon bald."
- Prominent link back to home
- Match the site's visual style

---

## Phase 7: Animation Strategy

### 7.1 Scroll Reveal (CSS-only, for Astro sections)

A `ScrollReveal.astro` component that:
1. Wraps content in a `<div data-reveal>` element
2. Injects a small inline `<script>` (once, via `is:inline` or a shared script) that uses `IntersectionObserver` to add a `data-visible` attribute when the element enters the viewport
3. CSS handles the transition:
   ```css
   [data-reveal] {
     opacity: 0;
     transform: translateY(20px);
     transition: opacity 0.6s ease-out, transform 0.6s ease-out;
   }
   [data-reveal][data-visible] {
     opacity: 1;
     transform: translateY(0);
   }
   @media (prefers-reduced-motion: reduce) {
     [data-reveal] {
       opacity: 1;
       transform: none;
       transition: none;
     }
   }
   ```
4. Supports staggered children via `data-reveal-delay="100"`, `data-reveal-delay="200"`, etc.

This gives 90% of the "premium motion" feel with zero JavaScript framework overhead.

### 7.2 Header Scroll Transition

Inline `<script>` in `Header.astro` (same pattern as v1):
- Listen to `scroll` event with `{ passive: true }`
- Toggle classes at `scrollY > 40`
- Background: transparent -> white/90 + blur
- Text color: white -> stone-900
- Logo size: large -> small
- Use CSS transitions for smooth interpolation

### 7.3 React Island Animations (Motion)

Only used inside React islands where Motion is already loaded for the form/accordion:

**ContactFormIsland:**
- Form container: `motion.div` with `initial={{ opacity: 0, y: 20 }}` and `animate={{ opacity: 1, y: 0 }}`
- Success toast animation: handled by Sonner (already animated)
- Button press: `whileTap={{ scale: 0.98 }}`

**FaqIsland:**
- Accordion items: `AnimatePresence` for smooth height transitions (if Radix's built-in animation isn't sufficient)
- Keep it subtle; the Radix accordion already handles open/close

### 7.4 CSS Micro-interactions

Defined globally in `global.css`:
- Buttons: `transition: all 0.2s ease-out;` with `hover:scale-[1.02]` and `active:scale-[0.98]`
- Cards: `hover:-translate-y-1` with shadow increase
- Links: underline animation (width from 0 to 100% on hover)
- Focus states: emerald ring on all interactive elements

### 7.5 Performance Budget
- Total JavaScript for animation: 0 KB additional for Astro sections (CSS-only)
- Motion library: loaded only when ContactFormIsland or FaqIsland hydrate
- No animation causes layout shift (only `transform` and `opacity`)
- All animations complete in under 1000ms

---

## Phase 8: Image Generation Shot List

Using Gemini API (`gemini-3.1-flash-image-preview`). API key already in `.env`.

### 8.1 Images to Generate

| # | Image | Purpose | Resolution | Aspect | Prompt Direction |
|---|---|---|---|---|---|
| 1 | Hero craftsman | Right side of hero section | 2K | 3:4 | Professional craftsman at work (electrician or general trades), warm lighting, depth of field, editorial quality. Not generic stock photo. Visible hands, tools, craftsmanship. Warm earth tones to match palette. Negative space for overlap with text area. |
| 2 | Workspace detail | Why/Benefits section accent | 1K | 16:9 | Close-up of organized workshop workspace, tools neatly arranged, warm wood surface, natural light. Quality and precision aesthetic. Macro detail of craftsmanship. |
| 3 | Tools closeup | Process section accent | 1K | 4:3 | Macro photograph of quality hand tools on a clean surface, warm lighting, shallow depth of field. Conveys precision and professionalism. |
| 4 | OG/Social share | Meta tags | 1K | 16:9 | Clean branded image: "DigitalHandwerk" text on warm stone-toned background with subtle emerald accent element. Professional, minimal. (May need to composite text in post) |
| 5 | About section bg | About section subtle background | 1K | 16:9 | Soft, defocused workshop environment, extremely warm tones, low contrast. Designed as a background that won't compete with foreground content. Almost abstract. |
| 6 | Mobile hero | Mobile-specific hero variant | 1K | 9:16 | Same craftsman concept as hero but vertical composition. Warm light, editorial feel. |

**Style block (copy into every prompt):**
```
Style: warm natural light, golden hour warmth, shallow depth of field,
muted earth tones with subtle green accents, editorial magazine quality,
shot on 85mm lens f/2.8. No harsh shadows. Professional, approachable,
authentic craftsmanship aesthetic. Not stock photography.
```

### 8.2 Generation Process
1. Generate hero image first (anchor for visual consistency)
2. Use hero as reference image for all subsequent generations
3. Convert all outputs from PNG to WebP: `magick input.png -quality 82 -resize '1920x1920>' output.webp`
4. Place in `src/assets/` (not `public/`) for Astro image optimization
5. Verify: no file over 500KB after conversion

### 8.3 Existing Images to Reuse
- `Logo.png` -> keep as-is
- `portrait_wanja.jpg` -> optimize to WebP, keep in `src/assets/`
- `flaschnerei-just-showcase.jpeg` -> optimize, keep
- `dachdoktor-website-preview.jpg` -> optimize, keep
- All favicon/PWA icons -> keep in `public/` unchanged

### 8.4 Estimated Cost
6 images at an average of $0.08 each = ~$0.48. Even with 2-3 iterations per image: under $3 total.

---

## Phase 9: SEO and Performance Strategy

### 9.1 SEO

**Carry forward from v1 (already excellent):**
- Canonical URLs per page
- Open Graph tags
- Twitter Card tags
- Geo metadata (Karlsruhe)
- JSON-LD: LocalBusiness schema with full contact info, offers, services, geo
- JSON-LD: FAQPage schema with all 7 FAQ items
- Sitemap (via `@astrojs/sitemap`)
- robots.txt

**New additions:**
- BreadcrumbList JSON-LD for legal pages
- Updated OG image (newly generated)
- Refined title tags: shorter, keyword-front-loaded
- Heading hierarchy audit: exactly one H1 per page, proper H2/H3 nesting
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` landmarks
- `text-wrap: balance` on all headings to prevent orphans
- `<img>` alt text review: descriptive for content, empty for decorative
- `lang="de"` on `<html>` element (already present in v1)

### 9.2 Performance Targets

| Metric | Target | Strategy |
|---|---|---|
| Lighthouse Performance | >= 95 mobile | Static site + optimized images + minimal JS |
| LCP | < 1.5s | Hero image preloaded, fonts preloaded, critical CSS inlined by Astro |
| FID/INP | < 100ms | React islands only hydrate when needed (client:visible/client:load) |
| CLS | < 0.05 | All images have width/height, fonts use font-display: swap |
| Total JS shipped | < 80KB gzipped | Only React + form + accordion. No full-page framework. |

**Image strategy:**
- All images via `<Image>` from `astro:assets` (automatic WebP/AVIF, srcset, lazy loading)
- Hero image: `loading="eager"`, `fetchpriority="high"`, preloaded in `<head>`
- All below-fold images: `loading="lazy"`
- Responsive srcset with appropriate `sizes` attribute

**Font strategy:**
- `<link rel="preconnect">` for Google Fonts
- `<link rel="preload">` for critical font files (Instrument Serif 400, Inter 400/500/600)
- `font-display: swap` to prevent FOIT
- Consider self-hosting fonts for better performance (download from Google Fonts, place in `public/fonts/`)

**JavaScript budget:**
- React + React DOM: ~42KB gzipped (loaded only when islands hydrate)
- react-hook-form + zod: ~15KB gzipped
- Radix accordion: ~5KB gzipped
- Motion (if used in islands): ~15KB gzipped
- Total: ~77KB gzipped, loaded progressively
- Zero JS for all Astro-rendered sections

---

## Phase 10: Quality Assurance

### 10.1 Visual QA

- [ ] Each section renders correctly at 320px, 375px, 768px, 1024px, 1440px, 1920px
- [ ] No horizontal scrollbar at any width
- [ ] Typography hierarchy is visually clear at every breakpoint
- [ ] Color contrast passes WCAG AA (test with axe or Lighthouse)
- [ ] All images are sharp (no pixelation)
- [ ] Dark/light section transitions are clean
- [ ] No Flash of Unstyled Text (FOUT)
- [ ] No layout shift on load

### 10.2 Functional QA

- [ ] Contact form submits successfully (Web3Forms)
- [ ] Form validation shows German error messages
- [ ] Package CTA buttons pre-fill the contact form message via URL params
- [ ] FAQ accordion opens/closes smoothly
- [ ] Privacy checkbox is required before submission
- [ ] All nav anchor links scroll to correct sections
- [ ] Mobile menu opens and closes
- [ ] Back links on legal pages navigate to home
- [ ] 404 page renders for unknown routes

### 10.3 Performance QA

- [ ] Lighthouse Performance >= 90 on mobile
- [ ] Lighthouse Accessibility >= 95
- [ ] Lighthouse Best Practices >= 95
- [ ] Lighthouse SEO = 100
- [ ] No render-blocking resources
- [ ] Images optimized (all WebP, none over 500KB)
- [ ] Fonts preloaded
- [ ] `bun run build` output: check JS bundle sizes

### 10.4 SEO QA

- [ ] Unique `<title>` on each page
- [ ] Meta descriptions present and under 160 characters
- [ ] OG tags render in social preview tools
- [ ] JSON-LD validates (use Google's Rich Results Test)
- [ ] Sitemap generated and accessible at `/sitemap-index.xml`
- [ ] robots.txt accessible and correct
- [ ] Single H1 per page
- [ ] No broken links (internal or external)

### 10.5 Accessibility QA

- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader: headings announce in correct order
- [ ] Form labels associated with inputs
- [ ] All images have alt text (or alt="" for decorative)
- [ ] Touch targets >= 44x44px on mobile
- [ ] `prefers-reduced-motion` disables animations
- [ ] Color is never the sole indicator of state

### 10.6 Browser QA

- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest (desktop + iOS)
- [ ] Edge latest
- [ ] Chrome on Android

---

## Execution Order (Task Dependencies)

```
Phase 1: Scaffold          (no dependencies)
Phase 2: Design System     (depends on Phase 1)
Phase 3: Component Arch    (depends on Phase 2)
Phase 4: BaseLayout/Header (depends on Phase 2, 3)
Phase 8: Image Generation  (depends on Phase 2 for style tokens; can run in parallel with 3-4)
Phase 5: Index Page Build  (depends on Phase 3, 4, 8)
Phase 6: Legal Pages       (depends on Phase 4; can run in parallel with 5)
Phase 7: Animation Polish  (depends on Phase 5)
Phase 9: SEO/Performance   (depends on Phase 5, 6)
Phase 10: QA               (depends on all above)
```

**Critical path:** 1 -> 2 -> 3 -> 4 -> 5 -> 7 -> 9 -> 10

**Parallel tracks:**
- Image generation (Phase 8) can start after Phase 2 and run alongside Phases 3-4
- Legal pages (Phase 6) can be built alongside Phase 5

---

## Open Questions and Assumptions

### Assumptions Made
1. **Bun is the package manager.** The existing project has `bun.lockb`. The v2 will also use Bun.
2. **No domain change.** The site will continue to be served at `digitalhandwerk-mensch.de`.
3. **Web3Forms continues as the form backend.** The API key and integration remain unchanged.
4. **Pricing stays the same.** Starter 399 EUR, Professional 799 EUR, with the discounted positioning.
5. **Self-hosting fonts is acceptable.** For maximum performance, fonts could be downloaded from Google Fonts and served from the same domain. This avoids the Google Fonts roundtrip but requires managing font files. If not desired, Google Fonts CDN with preconnect is the fallback.
6. **No mobile hamburger menu animation library needed.** The mobile menu can be implemented with CSS transitions + a small inline script.

### Open Questions
1. **Instrument Serif availability and licensing.** It is on Google Fonts and free to use. But if you have a different premium typeface preference, now is the time to decide. Alternatives: Playfair Display (more classic), Lora (more readable), or a commercial face like Canela.
2. **Copy refresh scope.** The plan assumes carrying forward existing German copy with light edits for anti-slop compliance. Should the copy be substantially rewritten, or are light edits sufficient? The existing copy is already specific and trades-focused, which is good.
3. **New reference projects.** Are there any new client projects beyond Flaschnerei Just and Dachdoktor to showcase?
4. **Google Analytics / tracking.** The v1 TODO list mentions implementing GA4. Should this be included in v2 scope, or deferred?
5. **Cookie consent banner.** Also mentioned in v1 TODOs. If GA4 is added, a consent banner becomes legally required. Should this be in scope?

---

## Risks and Considerations

1. **Tailwind 4 + shadcn compatibility.** shadcn/ui was originally designed for Tailwind 3. The latest shadcn CLI supports Tailwind 4, but some components may need manual adjustment. The risk is low since we only use 7 components (accordion, button, checkbox, form, input, label, textarea), and they are simple enough to adjust manually. Mitigation: install shadcn components after Tailwind 4 is configured and verify each one renders correctly.

2. **Font loading performance.** Adding two Google Fonts (Instrument Serif + Inter) could slow LCP if not handled carefully. Mitigation: preload the critical font files, use `font-display: swap`, consider self-hosting. Monitor LCP during development.

3. **Image generation quality.** Gemini-generated images may need multiple iterations. The craftsman hero image is the most critical, as it sets the visual tone. Mitigation: generate hero first, iterate until quality is right, then use as reference for consistency. Budget 2-3 attempts per image.

4. **Mobile menu implementation.** This is new functionality not in v1. While simple conceptually, the animation and a11y details (focus trapping, escape-to-close, aria attributes) need attention. Mitigation: follow established patterns; keep it simple (slide-in overlay, not complex drawer).

5. **Content continuity.** During the rebuild, the live site continues to serve from the old codebase. The v2 is built in a separate directory. Deployment cutover should be atomic (Vercel handles this naturally with branch deploys). Mitigation: test thoroughly on a preview deployment before cutting over.

6. **Astro version compatibility with `@tailwindcss/vite`.** As of Astro 5.x, the Vite plugin approach for Tailwind 4 should work, but verify with the latest Astro docs. If issues arise, fall back to PostCSS integration with Tailwind 4.

---

## Files Reference

### From Existing Project (to carry forward)

| Source Path | Destination | Notes |
|---|---|---|
| `src/lib/contact-form.ts` | `src/lib/contact-form.ts` | Unchanged |
| `src/lib/utils.ts` | `src/lib/utils.ts` | Unchanged (cn utility) |
| `src/assets/Logo.png` | `src/assets/Logo.png` | Unchanged |
| `src/assets/portrait_wanja.jpg` | `src/assets/portrait_wanja.jpg` | Unchanged |
| `src/assets/flaschnerei-just-showcase.jpeg` | `src/assets/flaschnerei-just-showcase.jpeg` | Unchanged |
| `src/assets/dachdoktor-website-preview.jpg` | `src/assets/dachdoktor-website-preview.jpg` | Unchanged |
| `public/favicon.ico` + all icon files | `public/` | Unchanged |
| `public/manifest.json` | `public/manifest.json` | Unchanged |
| `public/robots.txt` | `public/robots.txt` | Unchanged |
| `vercel.json` | `vercel.json` | Security headers unchanged |
| `src/components/ui/*.tsx` (7 files) | `src/components/ui/*.tsx` | Restyled for new tokens |
| `src/components/ContactFormIsland.tsx` | `src/components/islands/ContactFormIsland.tsx` | Restyled, Motion added |
| `src/components/FaqIsland.tsx` | `src/components/islands/FaqIsland.tsx` | Restyled |

### New Files to Create

| Path | Description |
|---|---|
| `astro.config.mjs` | Astro config with React, sitemap, Vercel, Tailwind 4 via Vite |
| `tsconfig.json` | TypeScript config |
| `src/styles/global.css` | Tailwind 4 + @theme tokens (replaces both index.css and tailwind.config.ts) |
| `src/components/layout/BaseLayout.astro` | Head, fonts, structured data |
| `src/components/layout/Header.astro` | Sticky nav with scroll behavior + mobile menu |
| `src/components/layout/Footer.astro` | Footer |
| `src/components/layout/Container.astro` | Max-width wrapper |
| `src/components/layout/Section.astro` | Section wrapper |
| `src/components/shared/SectionLabel.astro` | Eyebrow label |
| `src/components/shared/ScrollReveal.astro` | CSS-only scroll reveal |
| `src/components/sections/Hero.astro` | Hero section |
| `src/components/sections/WhySection.astro` | Benefits |
| `src/components/sections/PackagesSection.astro` | Pricing |
| `src/components/sections/ProcessSection.astro` | Process/timeline |
| `src/components/sections/ReferencesSection.astro` | Portfolio |
| `src/components/sections/AboutSection.astro` | About Wanja |
| `src/components/sections/ContactSection.astro` | Contact form wrapper |
| `src/components/sections/FaqSection.astro` | FAQ wrapper |
| `src/pages/index.astro` | Main page (section composition) |
| `src/pages/datenschutz.astro` | Privacy policy |
| `src/pages/impressum.astro` | Legal notice |
| `src/pages/404.astro` | Custom 404 |
