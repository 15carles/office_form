<script lang="ts">
	import { onMount, onDestroy, untrack } from 'svelte';
	import { t } from 'svelte-i18n';
	import {
		initState,
		tick,
		setDirection,
		tickIntervalMs,
		cellRef,
		formulaText,
		KEY_MAP,
		type SnakeState
	} from './engine';

	interface Props {
		width: number;
		height: number;
		paused: boolean;
		accentColor?: string;
		onScore?: (score: number) => void;
		onGameOver?: (finalScore: number) => void;
		onStateChange?: (state: SnakeState) => void;
	}

	let {
		width,
		height,
		paused,
		accentColor = '#1f7145',
		onScore,
		onGameOver,
		onStateChange
	}: Props = $props();

	// Cell size — square, small enough for a fluid game
	const CW = 14;
	const CH = 14;

	let cols = $derived(Math.max(4, Math.floor(width / CW)));
	let rows = $derived(Math.max(4, Math.floor(height / CH)));
	let gameW = $derived(cols * CW);
	let gameH = $derived(rows * CH);

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let gameState = $state<SnakeState>(initState(10, 14));
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let snakeTheme = { cellA: '#f5fdf8', cellB: '#eef8f2', gridLine: '#c8e8d4', gridBorder: '#7ec8a0', snakeAccent: '' };

	// Reset game only when grid dimensions change (not on status changes)
	$effect(() => {
		cols; rows; // reactive dependencies — grid size only
		untrack(() => {
			if (gameState.status !== 'running') {
				gameState = initState(cols, rows);
			}
		});
	});

	$effect(() => {
		if (canvas) {
			const s = getComputedStyle(canvas);
			snakeTheme = {
				cellA: s.getPropertyValue('--game-cell-a').trim() || '#f5fdf8',
				cellB: s.getPropertyValue('--game-cell-b').trim() || '#eef8f2',
				gridLine: s.getPropertyValue('--game-border-soft').trim() || '#c8e8d4',
				gridBorder: s.getPropertyValue('--game-border').trim() || '#7ec8a0',
				snakeAccent: s.getPropertyValue('--game-accent').trim() || ''
			};
			ctx = canvas.getContext('2d')!;
			drawFrame();
		}
	});

	$effect(() => {
		onStateChange?.(gameState);
	});

	function startGame() {
		gameState = { ...initState(cols, rows), status: 'running' };
		clearInterval(intervalId!);
		intervalId = setInterval(gameTick, tickIntervalMs(0));
		drawFrame();
	}

	function gameTick() {
		if (paused || gameState.status !== 'running') return;

		const result = tick(gameState);
		gameState = result.state;

		if (result.ate) {
			onScore?.(gameState.score);
			clearInterval(intervalId!);
			intervalId = setInterval(gameTick, tickIntervalMs(gameState.score));
		}

		if (gameState.status === 'over') {
			clearInterval(intervalId!);
			intervalId = null;
			onGameOver?.(gameState.score);
		}

		drawFrame();
	}

	function drawFrame() {
		if (!ctx) return;
		ctx.clearRect(0, 0, gameW, gameH);
		drawGrid();
		if (gameState.status !== 'idle') {
			drawFood();
			drawSnake();
		}
	}

	function drawGrid() {
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				ctx.fillStyle = r % 2 === 0 ? snakeTheme.cellA : snakeTheme.cellB;
				ctx.fillRect(c * CW, r * CH, CW, CH);
				ctx.strokeStyle = snakeTheme.gridLine;
				ctx.lineWidth = 0.5;
				ctx.strokeRect(c * CW, r * CH, CW, CH);
			}
		}
		// Outer border
		ctx.strokeStyle = snakeTheme.gridBorder;
		ctx.lineWidth = 1.5;
		ctx.strokeRect(0.75, 0.75, gameW - 1.5, gameH - 1.5);
	}

	function drawSnake() {
		const arrows: Record<string, string> = {
			'1,0': '▶', '-1,0': '◄', '0,-1': '▲', '0,1': '▼'
		};
		const dir = gameState.dir;
		const baseColor = snakeTheme.snakeAccent || accentColor;
		const bodyColor = lighten(baseColor, 0.3);

		gameState.snake.forEach((seg, i) => {
			const x = seg.x * CW + 1;
			const y = seg.y * CH + 1;
			const w = CW - 2;
			const h = CH - 2;

			ctx.fillStyle = i === 0 ? baseColor : bodyColor;
			ctx.fillRect(x, y, w, h);
			ctx.strokeStyle = darken(baseColor, 0.2);
			ctx.lineWidth = 0.8;
			ctx.strokeRect(x, y, w, h);

			if (i === 0) {
				ctx.fillStyle = 'rgba(255,255,255,0.85)';
				ctx.font = `${Math.max(7, CW - 5)}px Calibri, sans-serif`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(arrows[`${dir.x},${dir.y}`] ?? '▶', x + w / 2, y + h / 2);
			}
		});
	}

	function drawFood() {
		const { x, y } = gameState.food;
		const px = x * CW + 1;
		const py = y * CH + 1;
		const w = CW - 2;
		const h = CH - 2;

		ctx.fillStyle = '#fff0f0';
		ctx.fillRect(px, py, w, h);
		ctx.strokeStyle = '#922b21';
		ctx.lineWidth = 0.8;
		ctx.strokeRect(px, py, w, h);
		ctx.fillStyle = '#c0392b';
		ctx.font = `bold ${Math.max(8, CW - 3)}px Calibri, sans-serif`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('$', px + w / 2, py + h / 2);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (paused) return;
		if (gameState.status === 'over' || gameState.status === 'idle') return;
		const dir = KEY_MAP[e.key];
		if (!dir) return;
		e.preventDefault();
		gameState = setDirection(gameState, dir);
	}

	// Simple color helpers (no external dep)
	function lighten(hex: string, amount: number): string {
		return adjustColor(hex, amount);
	}
	function darken(hex: string, amount: number): string {
		return adjustColor(hex, -amount);
	}
	function adjustColor(hex: string, amount: number): string {
		const n = parseInt(hex.replace('#', ''), 16);
		const r = Math.min(255, Math.max(0, (n >> 16) + Math.round(amount * 255)));
		const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + Math.round(amount * 255)));
		const b = Math.min(255, Math.max(0, (n & 0xff) + Math.round(amount * 255)));
		return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
	}

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="snake-wrap" style:width="{gameW}px" style:height="{gameH}px">
	<canvas bind:this={canvas} width={gameW} height={gameH}></canvas>

	{#if gameState.status === 'idle'}
		<div class="overlay">
			<div class="panel">
				<h3>{$t('games.snake.start')}</h3>
				<p>
					{$t('games.snake.description')}<br />
					Come los <span class="food-hint">$</span> para puntuar
				</p>
				<button onclick={startGame}>{$t('games.snake.startBtn')}</button>
			</div>
		</div>
	{/if}

	{#if gameState.status === 'over'}
		<div class="overlay">
			<div class="panel error">
				<h3>{$t('games.snake.gameOver')}</h3>
				<p class="score-line">
					{$t('games.snake.score')}: {gameState.score}
				</p>
				<button onclick={startGame}>{$t('games.snake.retryBtn')}</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.snake-wrap {
		position: relative;
		margin: 0 auto;
	}

	canvas {
		display: block;
	}

	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.panel {
		background: var(--game-overlay-bg, rgba(255, 255, 255, 0.95));
		border: 2px solid var(--game-overlay-border, #1f7145);
		padding: 14px 20px;
		text-align: center;
		pointer-events: all;
		box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
		max-width: 200px;
	}

	.panel h3 {
		color: var(--game-accent, #1f7145);
		font-size: 13px;
		margin-bottom: 6px;
		font-family: Calibri, sans-serif;
	}

	.panel.error h3 {
		color: #c0392b;
	}

	.panel p {
		font-size: 10px;
		color: var(--game-text-muted, #666);
		margin-bottom: 10px;
		line-height: 1.6;
		font-family: Calibri, sans-serif;
	}

	.score-line {
		font-size: 12px;
		font-weight: 700;
		color: #333;
	}

	.food-hint {
		color: #c0392b;
		font-weight: 700;
	}

	button {
		background: var(--game-btn-bg, #1f7145);
		color: white;
		border: none;
		padding: 5px 16px;
		font-size: 11px;
		cursor: pointer;
		font-family: Calibri, sans-serif;
	}

	button:hover {
		background: var(--game-btn-hover, #165a36);
	}
</style>
