import type { EntryGenerator } from './$types';
import { SKINS } from '$lib/skins/registry';

export const prerender = true;

export const entries: EntryGenerator = () =>
	SKINS.flatMap((s) => s.compatibleGames.map((game) => ({ skin: s.id, game })));
