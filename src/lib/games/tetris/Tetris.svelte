<script lang="ts">
	import { onDestroy } from 'svelte';
	import { t } from 'svelte-i18n';
	import {
		initState, tick, moveLeft, moveRight, rotate,
		hardDrop, softDrop, tickIntervalMs, getGhostY,
		getShape, COLORS, SHAPES,
		type TetrisState
	} from './engine';

	interface Props {
		width: number;
		height: number;
		paused: boolean;
		onScore?: (score: number) => void;
		onGameOver?: (finalScore: number) => void;
		onStateChange?: (state: TetrisState) => void;
	}

	let { width, height, paused, onScore, onGameOver, onStateChange }: Props = $props();

	const showSidebar = $derived(width >= 300);
	const CELL = $derived(Math.max(1, Math.floor(Math.min(
		(width - 16 - (showSidebar ? 82 : 0)) / 10,
		(height - 16) / 22
	))));
	const gameW = $derived(10 * CELL);
	const gameH = $derived(20 * CELL);
	const previewSize = $derived(CELL * 4);

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let previewCanvas = $state<HTMLCanvasElement | undefined>(undefined);
	let previewCtx: CanvasRenderingContext2D;

	let game = $state<TetrisState>(initState());
	let intervalId: ReturnType<typeof setInterval> | null = null;

	let themeColors = $state({ cellA: '#fafafa', cellB: '#f3f3f3', grid: '#e0e0e0', border: '#bbb', previewBg: '#f9f9f9' });

	$effect(() => {
		if (canvas) {
			const s = getComputedStyle(canvas);
			themeColors = {
				cellA: s.getPropertyValue('--game-cell-a').trim() || '#fafafa',
				cellB: s.getPropertyValue('--game-cell-b').trim() || '#f3f3f3',
				grid: s.getPropertyValue('--game-grid').trim() || '#e0e0e0',
				border: s.getPropertyValue('--game-border').trim() || '#bbb',
				previewBg: s.getPropertyValue('--game-panel-bg').trim() || '#f9f9f9'
			};
			ctx = canvas.getContext('2d')!;
		}
	});
	$effect(() => {
		if (previewCanvas) {
			previewCtx = previewCanvas.getContext('2d')!;
			drawPreview();
		}
	});

	// Redraw whenever the game state, dimensions or theme change.
	// Resizing the canvas element clears its bitmap, so CELL must be a dependency.
	$effect(() => {
		game;
		CELL;
		themeColors;
		if (ctx) draw();
		if (previewCtx) drawPreview();
	});

	$effect(() => { onStateChange?.(game); });

	function setSpeed(level: number) {
		if (intervalId) clearInterval(intervalId);
		intervalId = setInterval(gameTick, tickIntervalMs(level));
	}

	function startGame() {
		game = { ...initState(), status: 'running' };
		setSpeed(game.level);
	}

	function gameTick() {
		if (paused || game.status !== 'running') return;
		const prev = game;
		game = tick(game);
		if (game.score !== prev.score) onScore?.(game.score);
		if (game.level !== prev.level) setSpeed(game.level);
		if (game.status === 'over') {
			clearInterval(intervalId!);
			intervalId = null;
			onGameOver?.(game.score);
		}
	}

	function draw() {
		if (!ctx || CELL < 1) return;
		ctx.clearRect(0, 0, gameW, gameH);
		drawBoard();
		if (game.status !== 'idle') {
			drawGhost();
			drawCurrent();
		}
		drawGrid();
	}

	function drawBoard() {
		for (let r = 0; r < game.rows; r++) {
			for (let c = 0; c < game.cols; c++) {
				const cell = game.board[r][c];
				drawCell(ctx, c, r, cell ? COLORS[cell] : (r % 2 === 0 ? themeColors.cellA : themeColors.cellB));
			}
		}
	}

	function drawGhost() {
		const ghostY = getGhostY(game);
		const shape = getShape(game.current);
		for (let r = 0; r < shape.length; r++) {
			for (let c = 0; c < shape[r].length; c++) {
				if (!shape[r][c]) continue;
				const x = (game.current.x + c) * CELL;
				const y = (ghostY + r) * CELL;
				ctx.fillStyle = 'rgba(0,0,0,0.08)';
				ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
			}
		}
	}

	function drawCurrent() {
		const shape = getShape(game.current);
		const color = COLORS[game.current.type];
		for (let r = 0; r < shape.length; r++) {
			for (let c = 0; c < shape[r].length; c++) {
				if (!shape[r][c]) continue;
				drawCell(ctx, game.current.x + c, game.current.y + r, color);
			}
		}
	}

	function drawGrid() {
		ctx.strokeStyle = themeColors.grid;
		ctx.lineWidth = 0.5;
		for (let r = 0; r <= game.rows; r++) {
			ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(gameW, r * CELL); ctx.stroke();
		}
		for (let c = 0; c <= game.cols; c++) {
			ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, gameH); ctx.stroke();
		}
		ctx.strokeStyle = themeColors.border;
		ctx.lineWidth = 1;
		ctx.strokeRect(0.5, 0.5, gameW - 1, gameH - 1);
	}

	function drawCell(c: CanvasRenderingContext2D, col: number, row: number, color: string) {
		const x = col * CELL;
		const y = row * CELL;
		c.fillStyle = color;
		c.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
		// Highlight
		c.fillStyle = 'rgba(255,255,255,0.3)';
		c.fillRect(x + 1, y + 1, CELL - 2, 3);
	}

	function drawPreview() {
		if (!previewCtx || !previewSize) return;
		previewCtx.clearRect(0, 0, previewSize, previewSize);
		previewCtx.fillStyle = themeColors.previewBg;
		previewCtx.fillRect(0, 0, previewSize, previewSize);

		const shape = SHAPES[game.next][0];
		const pc = CELL * 0.8;
		const offX = Math.floor((previewSize - shape[0].length * pc) / 2);
		const offY = Math.floor((previewSize - shape.length * pc) / 2);
		const color = COLORS[game.next];

		for (let r = 0; r < shape.length; r++) {
			for (let c = 0; c < shape[r].length; c++) {
				if (!shape[r][c]) continue;
				previewCtx.fillStyle = color;
				previewCtx.fillRect(offX + c * pc + 1, offY + r * pc + 1, pc - 2, pc - 2);
				previewCtx.fillStyle = 'rgba(255,255,255,0.3)';
				previewCtx.fillRect(offX + c * pc + 1, offY + r * pc + 1, pc - 2, 3);
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (paused || game.status !== 'running') return;
		let handled = true;
		switch (e.key) {
			case 'ArrowLeft':  game = moveLeft(game); break;
			case 'ArrowRight': game = moveRight(game); break;
			case 'ArrowDown':  game = softDrop(game); break;
			case 'ArrowUp': case 'z': case 'Z': game = rotate(game); break;
			case ' ':          game = hardDrop(game); gameTick(); break;
			default: handled = false;
		}
		if (handled) e.preventDefault();
	}

	$effect(() => {
		if (paused && intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		} else if (!paused && game.status === 'running' && !intervalId) {
			setSpeed(game.level);
		}
	});

	onDestroy(() => { if (intervalId) clearInterval(intervalId); });
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="tetris-wrap">
	<div class="game-area">
		<canvas bind:this={canvas} width={gameW} height={gameH}></canvas>

		{#if game.status === 'idle'}
			<div class="overlay">
				<div class="panel">
					<h3>{$t('games.tetris.start')}</h3>
					<p>{$t('games.tetris.controls')}</p>
					<button onclick={startGame}>{$t('games.tetris.startBtn')}</button>
				</div>
			</div>
		{/if}

		{#if game.status === 'over'}
			<div class="overlay">
				<div class="panel error">
					<h3>{$t('games.tetris.gameOver')}</h3>
					<p class="score-line">{$t('games.tetris.score')}: {game.score}</p>
					<button onclick={startGame}>{$t('games.tetris.retryBtn')}</button>
				</div>
			</div>
		{/if}
	</div>

	{#if game.status !== 'idle' && showSidebar}
		<div class="sidebar">
			<div class="stat-block">
				<span class="stat-label">{$t('games.tetris.next')}</span>
				<canvas bind:this={previewCanvas} width={previewSize} height={previewSize}></canvas>
			</div>
			<div class="stat-block">
				<span class="stat-label">{$t('games.tetris.score')}</span>
				<span class="stat-value">{game.score}</span>
			</div>
			<div class="stat-block">
				<span class="stat-label">{$t('games.tetris.lines')}</span>
				<span class="stat-value">{game.lines}</span>
			</div>
			<div class="stat-block">
				<span class="stat-label">{$t('games.tetris.level')}</span>
				<span class="stat-value">{game.level}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.tetris-wrap {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 12px;
		height: 100%;
		padding: 8px;
	}

	.game-area {
		position: relative;
		flex-shrink: 0;
	}

	canvas { display: block; }

	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.panel {
		background: var(--game-overlay-bg, rgba(255,255,255,0.95));
		border: 2px solid var(--game-overlay-border, #555);
		padding: 14px 20px;
		text-align: center;
		box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
		max-width: 180px;
		font-family: 'Inter', 'Segoe UI', sans-serif;
	}

	.panel h3 { font-size: 13px; font-weight: 600; color: var(--game-text, #333); margin-bottom: 6px; }
	.panel.error h3 { color: #c0392b; }
	.panel p { font-size: 10px; color: var(--game-text-muted, #666); margin-bottom: 10px; line-height: 1.6; }
	.score-line { font-size: 12px; font-weight: 700; color: var(--game-text, #333); }

	button {
		background: var(--game-btn-bg, #444);
		color: white;
		border: none;
		padding: 5px 16px;
		font-size: 11px;
		cursor: pointer;
		font-family: inherit;
	}
	button:hover { background: var(--game-btn-hover, #222); }

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 4px;
	}

	.stat-block {
		display: flex;
		flex-direction: column;
		gap: 4px;
		background: var(--game-panel-bg, #f5f5f5);
		border: 1px solid var(--game-panel-border, #ddd);
		padding: 6px 10px;
		min-width: 70px;
	}

	.stat-label {
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--game-text-muted, #888);
		font-family: 'Inter', 'Segoe UI', sans-serif;
	}

	.stat-value {
		font-size: 16px;
		font-weight: 700;
		color: var(--game-text, #333);
		font-family: 'Inter', 'Segoe UI', sans-serif;
	}
</style>
