# CLAUDE.md — Projektregeln Operiva-Website

Kurz-Referenz für alle, die an dieser Website arbeiten (Mensch & KI). **Bitte einhalten.**

## Was das ist
Lead-Website für **Operiva** — Web-Agentur für **Websites + Automationen (n8n & Co.)**.
Ziel: Kontaktanfragen generieren. Tonalität: selbstbewusst, klar, „Sie"-Ansprache, kein Agentur-Blabla.

## Tech-Stack
- **Astro** (Stable), `output: 'static'` → reines HTML, überall deploybar (Hostinger, Netlify, Vercel).
- **Kein CSS-Framework.** Custom CSS mit Design-Tokens in `src/styles/global.css`. **Mobile First.**
- Kein Client-Framework, kein Tracking, keine externen Laufzeit-Skripte.

## Eiserne Regeln
1. **Texte niemals frei erfinden.** Alle Seitentexte stammen aus `operiva-texte.md` und liegen in `src/i18n/de.json` / `src/i18n/en.json`. Neue Texte nur nach Freigabe.
2. **Fonts immer lokal** (`public/fonts/`, `@font-face`, `font-display: swap`). **Kein Google-Fonts-CDN** (DSGVO).
3. **DSGVO beachten.** Keine externen Ressourcen, die IP-Adressen an Dritte senden, ohne Consent. Formspree (USA) = Drittland → im Datenschutz genannt.
4. **Barrierefreiheit:** semantisches HTML, Alt-Texte, Fokus sichtbar, `prefers-reduced-motion` respektieren.
5. **Mehrsprachig:** Texte nie hart ins Markup. Immer über `useTranslations(lang)`.

## Design-Tokens (Farb-Hex)
| Token | Wert | Zweck |
|-------|------|-------|
| `--color-bg` | `#0d0d0d` | Hintergrund (near-black) |
| `--color-text` | `#f5f5f0` | Text (off-white) |
| `--color-gold` | `#d4af5a` | Akzent (sparsam!) |
| `--color-bg-card` | `#141414` | Karten |
| `--color-border` | `#262626` | Trennlinien |

**Gold ist Akzent, nicht Fläche.** Zurückhaltend, seriös, edel.

## Font-Stack
- Headlines: `'Space Grotesk'` (400/500/700) → `--font-head`
- Fließtext: `'Inter'` (400/600) → `--font-body`

## i18n-Konvention
- Standard **DE unter `/`**, Englisch unter `/en/` (`astro.config.mjs`, `prefixDefaultLocale: false`).
- Routen-Mapping zentral in `src/i18n/utils.ts` → `routes`. Neue Seite = dort ergänzen (für Nav, Sprachwechsel, hreflang).
- Neue Sprache: `locales`-Array in `astro.config.mjs` + `src/i18n/<lang>.json` + `routes` erweitern.

## Struktur
```
src/components  Header, Footer, Hero, ServiceCard, ProcessStep, CTASection, SEO, ContactForm, *Page.astro
src/layouts     BaseLayout.astro
src/pages       DE-Routen (index, leistungen, prozess, ueber-uns, kontakt, ...)
src/pages/en    EN-Routen (index, services, process, about, contact, ...)
src/i18n        de.json, en.json, utils.ts
src/styles      global.css (Tokens, @font-face, Base, Utilities)
public/fonts    lokale woff2/woff
public/         logo.png, favicon*, robots.txt
```

Seiten-Muster: dünne Route (`src/pages/...astro`) → rendert `*Page.astro`-Komponente mit `lang`-Prop → nutzt `BaseLayout`.

## Offene Platzhalter (vor Go-Live!)
Siehe `README.md` → Abschnitt „To-do". Kurz: Formspree-ID, Impressum-Daten, Hosting-Name, echte Domain (`astro.config.mjs`, `robots.txt`), echtes `logo.png`/Favicon, Kontakt-E-Mail.
