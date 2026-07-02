import de from './de.json';
import en from './en.json';

export type Lang = 'de' | 'en';

export const languages: Lang[] = ['de', 'en'];
export const defaultLang: Lang = 'de';

const dictionaries = { de, en } as const;

/**
 * Liefert das komplette Übersetzungs-Objekt einer Sprache.
 * Genutzt in Seiten/Komponenten: const t = useTranslations(lang);
 */
export function useTranslations(lang: Lang) {
  return dictionaries[lang];
}

/** Ermittelt die Sprache aus dem URL-Pfad (/en/... => 'en', sonst 'de'). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'en') return 'en';
  return 'de';
}

/**
 * Zentrale Routen-Tabelle. Jede Seite hat eine ID und einen Pfad pro Sprache.
 * Basis für Navigation, Sprachumschalter und hreflang.
 * Neue Seite => hier ergänzen.
 */
export const routes = {
  home:       { de: '/',            en: '/en/' },
  services:   { de: '/leistungen',  en: '/en/services' },
  process:    { de: '/prozess',     en: '/en/process' },
  about:      { de: '/ueber-uns',   en: '/en/about' },
  contact:    { de: '/kontakt',     en: '/en/contact' },
  references: { de: '/referenzen',  en: '/en/references' },
  imprint:    { de: '/impressum',   en: '/en/imprint' },
  privacy:    { de: '/datenschutz', en: '/en/privacy' },
} as const;

export type PageId = keyof typeof routes;

/** Pfad einer Seite in der gewünschten Sprache. */
export function path(page: PageId, lang: Lang): string {
  return routes[page][lang];
}

/** Findet zu einem aktuellen Pfad die passende Seiten-ID (für Sprachwechsel). */
export function pageIdFromPath(pathname: string): PageId | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  for (const [id, paths] of Object.entries(routes)) {
    const dePath = paths.de.replace(/\/+$/, '') || '/';
    const enPath = paths.en.replace(/\/+$/, '') || '/';
    if (clean === dePath || clean === enPath) return id as PageId;
  }
  return null;
}

/** Gegenstück-URL in der anderen Sprache (für Sprachumschalter & hreflang). */
export function alternatePath(pathname: string, targetLang: Lang): string {
  const id = pageIdFromPath(pathname);
  if (!id) return targetLang === 'de' ? '/' : '/en/';
  return routes[id][targetLang];
}
