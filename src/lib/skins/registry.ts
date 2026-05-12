import type { SkinId, GameId } from '$lib/games/types';

export const VALID_SKINS: SkinId[] = ['excel', 'figma', 'notion'];
export const VALID_GAMES: GameId[] = ['snake', 'tetris', 'typing'];

export const COMPATIBILITY: Record<SkinId, GameId[]> = {
	excel:  ['snake', 'tetris', 'typing'],
	figma:  ['snake', 'tetris', 'typing'],
	notion: ['snake', 'tetris', 'typing']
};

export const RECOMMENDED: Record<SkinId, GameId> = {
	excel:  'snake',
	figma:  'tetris',
	notion: 'typing'
};

export function isValidSkin(s: string): s is SkinId {
	return VALID_SKINS.includes(s as SkinId);
}

export function isValidGame(g: string): g is GameId {
	return VALID_GAMES.includes(g as GameId);
}

export function pageTitle(skinId: SkinId): string {
	const titles: Record<SkinId, string> = {
		excel:  'Q3 Revenue Analysis.xlsx — Excel',
		figma:  'Design System v2 — Figma',
		notion: 'Meeting Notes — Notion'
	};
	return titles[skinId];
}
