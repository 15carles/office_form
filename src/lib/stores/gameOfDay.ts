import type { SkinId, GameId } from '$lib/games/types';

export interface DailyCombo {
	skinId: SkinId;
	gameId: GameId;
}

const DAILY_COMBOS: DailyCombo[] = [
	{ skinId: 'excel', gameId: 'snake' },
	{ skinId: 'outlook', gameId: 'typing' },
	{ skinId: 'figma', gameId: 'tetris' },
	{ skinId: 'notion', gameId: 'typing' },
	{ skinId: 'figma', gameId: 'snake' },
	{ skinId: 'outlook', gameId: 'snake' },
	{ skinId: 'excel', gameId: 'tetris' },
	{ skinId: 'notion', gameId: 'snake' }
];

export function getGameOfDay(): DailyCombo {
	const seed = Math.floor(Date.now() / 86_400_000);
	return DAILY_COMBOS[seed % DAILY_COMBOS.length];
}
