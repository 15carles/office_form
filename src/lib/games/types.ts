export type SkinId = 'excel' | 'figma' | 'notion' | 'outlook';
export type GameId = 'snake' | 'tetris' | 'typing';

export interface GameComponentProps<TState = unknown> {
	width: number;
	height: number;
	paused: boolean;
	onScore?: (score: number) => void;
	onGameOver?: (finalScore: number) => void;
	onStateChange?: (state: TState) => void;
}
