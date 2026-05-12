export type TetroType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
export type Cell = TetroType | null;
export type Board = Cell[][];

export interface Tetromino {
	type: TetroType;
	x: number;
	y: number;
	rotation: number;
}

export interface TetrisState {
	board: Board;
	current: Tetromino;
	next: TetroType;
	score: number;
	lines: number;
	level: number;
	status: 'idle' | 'running' | 'over';
	cols: number;
	rows: number;
}

export const COLS = 10;
export const ROWS = 20;

// Tetromino shapes — [rotation][row][col]
export const SHAPES: Record<TetroType, number[][][]> = {
	I: [
		[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
		[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
		[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
		[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]
	],
	O: [
		[[1,1],[1,1]],
		[[1,1],[1,1]],
		[[1,1],[1,1]],
		[[1,1],[1,1]]
	],
	T: [
		[[0,1,0],[1,1,1],[0,0,0]],
		[[0,1,0],[0,1,1],[0,1,0]],
		[[0,0,0],[1,1,1],[0,1,0]],
		[[0,1,0],[1,1,0],[0,1,0]]
	],
	S: [
		[[0,1,1],[1,1,0],[0,0,0]],
		[[0,1,0],[0,1,1],[0,0,1]],
		[[0,0,0],[0,1,1],[1,1,0]],
		[[1,0,0],[1,1,0],[0,1,0]]
	],
	Z: [
		[[1,1,0],[0,1,1],[0,0,0]],
		[[0,0,1],[0,1,1],[0,1,0]],
		[[0,0,0],[1,1,0],[0,1,1]],
		[[0,1,0],[1,1,0],[1,0,0]]
	],
	J: [
		[[1,0,0],[1,1,1],[0,0,0]],
		[[0,1,1],[0,1,0],[0,1,0]],
		[[0,0,0],[1,1,1],[0,0,1]],
		[[0,1,0],[0,1,0],[1,1,0]]
	],
	L: [
		[[0,0,1],[1,1,1],[0,0,0]],
		[[0,1,0],[0,1,0],[0,1,1]],
		[[0,0,0],[1,1,1],[1,0,0]],
		[[1,1,0],[0,1,0],[0,1,0]]
	]
};

export const COLORS: Record<TetroType, string> = {
	I: '#4fc3f7', // cyan
	O: '#fff176', // yellow
	T: '#ce93d8', // purple
	S: '#a5d6a7', // green
	Z: '#ef9a9a', // red
	J: '#90caf9', // blue
	L: '#ffcc80'  // orange
};

const TYPES: TetroType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

function randomType(): TetroType {
	return TYPES[Math.floor(Math.random() * TYPES.length)];
}

function emptyBoard(cols: number, rows: number): Board {
	return Array.from({ length: rows }, () => Array(cols).fill(null));
}

function spawnPiece(type: TetroType, cols: number): Tetromino {
	const shape = SHAPES[type][0];
	return {
		type,
		x: Math.floor((cols - shape[0].length) / 2),
		y: 0,
		rotation: 0
	};
}

export function initState(cols = COLS, rows = ROWS): TetrisState {
	const current = spawnPiece(randomType(), cols);
	return {
		board: emptyBoard(cols, rows),
		current,
		next: randomType(),
		score: 0,
		lines: 0,
		level: 1,
		status: 'idle',
		cols,
		rows
	};
}

export function getShape(t: Tetromino): number[][] {
	return SHAPES[t.type][t.rotation % SHAPES[t.type].length];
}

function isValid(board: Board, t: Tetromino, dx = 0, dy = 0, rot?: number): boolean {
	const shape = SHAPES[t.type][(rot ?? t.rotation) % SHAPES[t.type].length];
	for (let r = 0; r < shape.length; r++) {
		for (let c = 0; c < shape[r].length; c++) {
			if (!shape[r][c]) continue;
			const nx = t.x + c + dx;
			const ny = t.y + r + dy;
			if (nx < 0 || nx >= board[0].length || ny >= board.length) return false;
			if (ny < 0) continue;
			if (board[ny][nx]) return false;
		}
	}
	return true;
}

function lockPiece(board: Board, t: Tetromino): Board {
	const next = board.map(row => [...row]);
	const shape = getShape(t);
	for (let r = 0; r < shape.length; r++) {
		for (let c = 0; c < shape[r].length; c++) {
			if (!shape[r][c]) continue;
			const ny = t.y + r;
			const nx = t.x + c;
			if (ny >= 0 && ny < next.length) next[ny][nx] = t.type;
		}
	}
	return next;
}

function clearLines(board: Board): { board: Board; cleared: number } {
	const remaining = board.filter(row => row.some(cell => !cell));
	const cleared = board.length - remaining.length;
	const newRows = Array.from({ length: cleared }, () => Array(board[0].length).fill(null));
	return { board: [...newRows, ...remaining], cleared };
}

const LINE_POINTS = [0, 100, 300, 500, 800];

export function tick(state: TetrisState): TetrisState {
	if (state.status !== 'running') return state;

	if (isValid(state.board, state.current, 0, 1)) {
		return { ...state, current: { ...state.current, y: state.current.y + 1 } };
	}

	// Lock piece
	const locked = lockPiece(state.board, state.current);
	const { board: cleared, cleared: numCleared } = clearLines(locked);
	const newLines = state.lines + numCleared;
	const newLevel = Math.floor(newLines / 10) + 1;
	const newScore = state.score + (LINE_POINTS[numCleared] ?? 0) * state.level;

	const nextPiece = spawnPiece(state.next, state.cols);
	const over = !isValid(cleared, nextPiece);

	return {
		...state,
		board: cleared,
		current: nextPiece,
		next: randomType(),
		score: newScore,
		lines: newLines,
		level: newLevel,
		status: over ? 'over' : 'running'
	};
}

export function moveLeft(state: TetrisState): TetrisState {
	if (!isValid(state.board, state.current, -1, 0)) return state;
	return { ...state, current: { ...state.current, x: state.current.x - 1 } };
}

export function moveRight(state: TetrisState): TetrisState {
	if (!isValid(state.board, state.current, 1, 0)) return state;
	return { ...state, current: { ...state.current, x: state.current.x + 1 } };
}

export function rotate(state: TetrisState): TetrisState {
	const nextRot = (state.current.rotation + 1) % SHAPES[state.current.type].length;
	// Wall kick: try center, then shift right, then left
	for (const dx of [0, 1, -1, 2, -2]) {
		if (isValid(state.board, state.current, dx, 0, nextRot)) {
			return {
				...state,
				current: { ...state.current, rotation: nextRot, x: state.current.x + dx }
			};
		}
	}
	return state;
}

export function hardDrop(state: TetrisState): TetrisState {
	let dy = 0;
	while (isValid(state.board, state.current, 0, dy + 1)) dy++;
	return { ...state, current: { ...state.current, y: state.current.y + dy } };
}

export function softDrop(state: TetrisState): TetrisState {
	if (!isValid(state.board, state.current, 0, 1)) return state;
	return { ...state, current: { ...state.current, y: state.current.y + 1 } };
}

export function tickIntervalMs(level: number): number {
	return Math.max(100, 800 - (level - 1) * 70);
}

// Ghost piece: where the piece would land
export function getGhostY(state: TetrisState): number {
	let dy = 0;
	while (isValid(state.board, state.current, 0, dy + 1)) dy++;
	return state.current.y + dy;
}
