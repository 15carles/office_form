export type SkinId = 'excel' | 'figma' | 'notion';
export type GameId = 'snake' | 'tetris' | 'typing';

export interface GameConfig {
	id: GameId;
	displayKey: string;
	descriptionKey: string;
	scoreUnitKey: string;
	minWidth: number;
	minHeight: number;
	compatibleSkins: SkinId[];
	recommendedSkins: SkinId[];
}

export interface GameComponentProps {
	width: number;
	height: number;
	paused: boolean;
	onScore: (score: number) => void;
	onGameOver: (finalScore: number) => void;
}

export interface SkinConfig {
	id: SkinId;
	displayKey: string;
	appNameKey: string;
	accentColor: string;
	compatibleGames: GameId[];
	recommendedGame: GameId;
}
