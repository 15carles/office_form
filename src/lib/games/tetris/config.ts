import type { GameConfig } from '../types';

export const tetrisConfig: GameConfig = {
	id: 'tetris',
	displayKey: 'games.tetris.name',
	descriptionKey: 'games.tetris.description',
	scoreUnitKey: 'games.tetris.scoreUnit',
	minWidth: 220,
	minHeight: 400,
	compatibleSkins: ['excel', 'figma', 'notion'],
	recommendedSkins: ['figma']
};
