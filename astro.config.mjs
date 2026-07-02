// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ⚠️ PLATZHALTER: Vor Go-Live die echte Produktions-Domain eintragen.
// Wird für sitemap.xml, hreflang und Open-Graph-URLs verwendet.
const SITE_URL = 'https://www.operiva.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  // Mehrsprachigkeit: Deutsch ist Standard (unter /), Englisch unter /en/.
  // Weitere Sprachen später: locales-Array ergänzen + src/i18n/<lang>.json anlegen.
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false, // DE ohne Präfix, EN mit /en/
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-DE',
          en: 'en',
        },
      },
    }),
  ],
});
