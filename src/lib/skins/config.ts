import type { SkinConfig } from '../games/types';

export const excelConfig: SkinConfig = {
	id: 'excel',
	displayKey: 'skins.excel.name',
	appNameKey: 'skins.excel.appName',
	accentColor: '#1f7145',
	compatibleGames: ['snake', 'tetris', 'typing'],
	recommendedGame: 'snake'
};

export const figmaConfig: SkinConfig = {
	id: 'figma',
	displayKey: 'skins.figma.name',
	appNameKey: 'skins.figma.appName',
	accentColor: '#f24e1e',
	compatibleGames: ['snake', 'tetris', 'typing'],
	recommendedGame: 'tetris'
};

export const notionConfig: SkinConfig = {
	id: 'notion',
	displayKey: 'skins.notion.name',
	appNameKey: 'skins.notion.appName',
	accentColor: '#191919',
	compatibleGames: ['snake', 'tetris', 'typing'],
	recommendedGame: 'typing'
};
