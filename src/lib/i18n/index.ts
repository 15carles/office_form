import { browser } from '$app/environment';
import { init, addMessages, locale } from 'svelte-i18n';
import { get } from 'svelte/store';
import { prefs } from '$lib/stores/progress';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import it from './locales/it.json';
import fr from './locales/fr.json';

const SUPPORTED_LOCALES = ['en', 'es', 'de', 'it', 'fr'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// The locale JSON carries a few non-string helper fields (e.g. `unread`) that
// svelte-i18n's dictionary type doesn't model; this cast keeps addMessages happy.
type Messages = Parameters<typeof addMessages>[1];
const dict = (m: unknown) => m as Messages;

// Messages are bundled and registered synchronously (not lazy-loaded) so the
// dictionary is available during SSR/prerender and there is no loading flash —
// this is what lets server-rendered pages (e.g. the FAQ) emit real content.
addMessages('en', dict(en));
addMessages('es', dict(es));
addMessages('de', dict(de));
addMessages('it', dict(it));
addMessages('fr', dict(fr));

function detectLocale(): string {
	if (!browser) return 'en';

	const saved = get(prefs).locale;
	if (SUPPORTED_LOCALES.includes(saved as SupportedLocale)) return saved;

	const browserLang = navigator.language.split('-')[0];
	if (SUPPORTED_LOCALES.includes(browserLang as SupportedLocale)) return browserLang;

	return 'en';
}

export function setupI18n() {
	init({
		fallbackLocale: 'en',
		initialLocale: detectLocale()
	});
}

export function setLocale(lang: SupportedLocale) {
	locale.set(lang);
	prefs.update((p) => ({ ...p, locale: lang }));
}

export { locale };
