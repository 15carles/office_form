export type Direction = { x: -1 | 0 | 1; y: -1 | 0 | 1 };
export type Point = { x: number; y: number };

export interface SnakeState {
	snake: Point[];
	dir: Direction;
	nextDir: Direction;
	food: Point;
	score: number;
	status: 'idle' | 'running' | 'over';
	cols: number;
	rows: number;
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function cellRef(p: Point): string {
	return (LETTERS[p.x] ?? String(p.x + 1)) + (p.y + 1);
}

export function formulaText(state: SnakeState): string {
	const head = state.snake[0];
	return `=SERPIENTE(${cellRef(head)}; longitud=${state.snake.length}; puntos=${state.score})`;
}

export function initState(cols: number, rows: number): SnakeState {
	const midX = Math.floor(cols / 2);
	const midY = Math.floor(rows / 2);
	const snake: Point[] = [
		{ x: midX, y: midY },
		{ x: midX - 1, y: midY },
		{ x: midX - 2, y: midY }
	];
	const dir: Direction = { x: 1, y: 0 };
	return {
		snake,
		dir,
		nextDir: dir,
		food: spawnFood(snake, cols, rows),
		score: 0,
		status: 'idle',
		cols,
		rows
	};
}

function spawnFood(snake: Point[], cols: number, rows: number): Point {
	let p: Point;
	do {
		p = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
	} while (snake.some((s) => s.x === p.x && s.y === p.y));
	return p;
}

export function setDirection(state: SnakeState, dir: Direction): SnakeState {
	// Prevent reversing
	if (dir.x === -state.dir.x && dir.y === -state.dir.y) return state;
	return { ...state, nextDir: dir };
}

export function tick(state: SnakeState): { state: SnakeState; ate: boolean } {
	const dir = state.nextDir;
	const head: Point = {
		x: state.snake[0].x + dir.x,
		y: state.snake[0].y + dir.y
	};

	const hitWall = head.x < 0 || head.x >= state.cols || head.y < 0 || head.y >= state.rows;
	const hitSelf = state.snake.some((s) => s.x === head.x && s.y === head.y);

	if (hitWall || hitSelf) {
		return { state: { ...state, status: 'over' }, ate: false };
	}

	const ate = head.x === state.food.x && head.y === state.food.y;
	const newSnake = [head, ...state.snake];
	if (!ate) newSnake.pop();

	const newScore = ate ? state.score + 1 : state.score;
	const newFood = ate ? spawnFood(newSnake, state.cols, state.rows) : state.food;

	return {
		state: {
			...state,
			snake: newSnake,
			dir,
			food: newFood,
			score: newScore,
			status: 'running'
		},
		ate
	};
}

export function tickIntervalMs(score: number): number {
	return Math.max(75, 150 - score * 5);
}

export const KEY_MAP: Record<string, Direction> = {
	ArrowUp: { x: 0, y: -1 },
	ArrowDown: { x: 0, y: 1 },
	ArrowLeft: { x: -1, y: 0 },
	ArrowRight: { x: 1, y: 0 },
	w: { x: 0, y: -1 },
	s: { x: 0, y: 1 },
	a: { x: -1, y: 0 },
	d: { x: 1, y: 0 }
};
