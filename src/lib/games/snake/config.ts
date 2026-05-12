import type { GameConfig } from '../types';

export const snakeConfig: GameConfig = {
	id: 'snake',
	displayKey: 'games.snake.name',
	descriptionKey: 'games.snake.description',
	scoreUnitKey: 'games.snake.scoreUnit',
	minWidth: 200,
	minHeight: 200,
	compatibleSkins: ['excel', 'figma', 'notion'],
	recommendedSkins: ['excel']
};
