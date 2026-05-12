import { browser } from '$app/environment';
import { init, register, locale } from 'svelte-i18n';
import { get } from 'svelte/store';
import { prefs } from '$lib/stores/progress';

const SUPPORTED_LOCALES = ['en', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));

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
