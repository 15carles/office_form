import type { SkinId, GameId } from '$lib/games/types';

/**
 * Single source of truth for skins and games.
 * To add a new skin: add an entry here, create its components under
 * src/lib/skins/<id>/ and register them in ./components.ts.
 */
export interface SkinDef {
	id: SkinId;
	/** Brand color used on the dashboard (cards, badges). */
	accentColor: string;
	/** Accent used for UI rendered inside the skin (game selector, etc.). */
	uiAccent: string;
	/** Fake document title shown in the browser tab. */
	pageTitle: string;
	compatibleGames: GameId[];
	recommendedGame: GameId;
}

export const SKINS: SkinDef[] = [
	{
		id: 'excel',
		accentColor: '#1f7145',
		uiAccent: '#1f7145',
		pageTitle: 'Q3 Revenue Analysis.xlsx — Excel',
		compatibleGames: ['snake', 'tetris', 'typing'],
		recommendedGame: 'snake'
	},
	{
		id: 'figma',
		accentColor: '#f24e1e',
		uiAccent: '#18a0fb',
		pageTitle: 'Design System v2 — Figma',
		compatibleGames: ['snake', 'tetris', 'typing'],
		recommendedGame: 'tetris'
	},
	{
		id: 'notion',
		accentColor: '#191919',
		uiAccent: '#191919',
		pageTitle: 'Meeting Notes — Notion',
		compatibleGames: ['snake', 'tetris', 'typing'],
		recommendedGame: 'typing'
	}
];

export const VALID_SKINS: SkinId[] = SKINS.map((s) => s.id);
export const VALID_GAMES: GameId[] = ['snake', 'tetris', 'typing'];

const SKINS_BY_ID = new Map(SKINS.map((s) => [s.id, s]));

export function getSkin(id: SkinId): SkinDef {
	return SKINS_BY_ID.get(id)!;
}

export function isValidSkin(s: string | undefined): s is SkinId {
	return VALID_SKINS.includes(s as SkinId);
}

export function isValidGame(g: string | undefined): g is GameId {
	return VALID_GAMES.includes(g as GameId);
}
