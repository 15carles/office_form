import type { GameConfig } from '../types';

export const typingConfig: GameConfig = {
	id: 'typing',
	displayKey: 'games.typing.name',
	descriptionKey: 'games.typing.description',
	scoreUnitKey: 'games.typing.scoreUnit',
	minWidth: 300,
	minHeight: 200,
	compatibleSkins: ['excel', 'figma', 'notion'],
	recommendedSkins: ['notion']
};
