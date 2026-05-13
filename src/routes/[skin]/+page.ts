import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => [
	{ skin: 'excel' },
	{ skin: 'figma' },
	{ skin: 'notion' }
];
