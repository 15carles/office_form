import { error } from '@sveltejs/kit';
import { FAQ_LOCALES } from '$lib/content/faq';
import type { EntryGenerator, PageLoad } from './$types';

export const ssr = true;
export const prerender = true;

// English lives at /faq (canonical); the other locales at /faq/<lang>.
const SUB_LOCALES = FAQ_LOCALES.filter((l) => l !== 'en');

export const entries: EntryGenerator = () => SUB_LOCALES.map((lang) => ({ lang }));

export const load: PageLoad = ({ params }) => {
	if (!SUB_LOCALES.includes(params.lang as (typeof SUB_LOCALES)[number])) {
		error(404, 'Not found');
	}
	return { lang: params.lang as (typeof FAQ_LOCALES)[number] };
};
