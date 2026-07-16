import type { EntryGenerator } from './$types';
import { SKINS } from '$lib/skins/registry';

export const prerender = true;

export const entries: EntryGenerator = () => SKINS.map((s) => ({ skin: s.id }));
