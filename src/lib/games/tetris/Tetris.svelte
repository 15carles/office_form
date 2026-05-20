<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { t } from 'svelte-i18n';
	import {
		initState, tick, moveLeft, moveRight, rotate,
		hardDrop, softDrop, tickIntervalMs, getGhostY,
		getShape, COLORS, SHAPES,
		type TetrisState, type TetroType
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

	let state = $state<TetrisState>(initState());
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
			draw();
		}
	});
	$effect(() => { if (previewCanvas) { previewCtx = previewCanvas.getContext('2d')!; drawPreview(); } });
	$effect(() => { onStateChange?.(state); });

	function startGame() {
		state = { ...initState(), status: 'running' };
		clearInterval(intervalId!);
		intervalId = setInterval(gameTick, tickIntervalMs(1));
		draw();
	}

	function gameTick() {
		if (paused || state.status !== 'running') return;
		const prev = state;
		state = tick(state);
		if (state.score !== prev.score) onScore?.(state.score);
		if (state.status === 'over') {
			clearInterval(intervalId!);
			intervalId = null;
			onGameOver?.(state.score);
		}
		draw();
		drawPreview();
	}

	function draw() {
		if (!ctx || CELL < 1) return;
		ctx.clearRect(0, 0, gameW, gameH);
		drawBoard();
		if (state.status !== 'idle') {
			drawGhost();
			drawCurrent();
		}
		drawGrid();
	}

	function drawBoard() {
		for (let r = 0; r < state.rows; r++) {
			for (let c = 0; c < state.cols; c++) {
				const cell = state.board[r][c];
				drawCell(ctx, c, r, cell ? COLORS[cell] : (r % 2 === 0 ? themeColors.cellA : themeColors.cellB));
			}
		}
	}

	function drawGhost() {
		const ghostY = getGhostY(state);
		const shape = getShape(state.current);
		for (let r = 0; r < shape.length; r++) {
			for (let c = 0; c < shape[r].length; c++) {
				if (!shape[r][c]) continue;
				const x = (state.current.x + c) * CELL;
				const y = (ghostY + r) * CELL;
				ctx.fillStyle = 'rgba(0,0,0,0.08)';
				ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
			}
		}
	}

	function drawCurrent() {
		const shape = getShape(state.current);
		const color = COLORS[state.current.type];
		for (let r = 0; r < shape.length; r++) {
			for (let c = 0; c < shape[r].length; c++) {
				if (!shape[r][c]) continue;
				drawCell(ctx, state.current.x + c, state.current.y + r, color);
			}
		}
	}

	function drawGrid() {
		ctx.strokeStyle = themeColors.grid;
		ctx.lineWidth = 0.5;
		for (let r = 0; r <= state.rows; r++) {
			ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(gameW, r * CELL); ctx.stroke();
		}
		for (let c = 0; c <= state.cols; c++) {
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

		const shape = SHAPES[state.next][0];
		const pc = CELL * 0.8;
		const offX = Math.floor((previewSize - shape[0].length * pc) / 2);
		const offY = Math.floor((previewSize - shape.length * pc) / 2);
		const color = COLORS[state.next];

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
		if (paused || state.status !== 'running') return;
		let handled = true;
		switch (e.key) {
			case 'ArrowLeft':  state = moveLeft(state); break;
			case 'ArrowRight': state = moveRight(state); break;
			case 'ArrowDown':  state = softDrop(state); break;
			case 'ArrowUp': case 'z': case 'Z': state = rotate(state); break;
			case ' ':          state = hardDrop(state); gameTick(); break;
			default: handled = false;
		}
		if (handled) { e.preventDefault(); draw(); drawPreview(); }
	}

	$effect(() => {
		if (paused && intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		} else if (!paused && state.status === 'running' && !intervalId) {
			intervalId = setInterval(gameTick, tickIntervalMs(state.level));
		}
	});

	onDestroy(() => { if (intervalId) clearInterval(intervalId); });
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="tetris-wrap">
	<div class="game-area">
		<canvas bind:this={canvas} width={gameW} height={gameH}></canvas>

		{#if state.status === 'idle'}
			<div class="overlay">
				<div class="panel">
					<h3>{$t('games.tetris.start')}</h3>
					<p>← → Mover &nbsp;·&nbsp; ↑ Rotar<br />↓ Bajar &nbsp;·&nbsp; Espacio Caída</p>
					<button onclick={startGame}>{$t('games.tetris.startBtn')}</button>
				</div>
			</div>
		{/if}

		{#if state.status === 'over'}
			<div class="overlay">
				<div class="panel error">
					<h3>{$t('games.tetris.gameOver')}</h3>
					<p class="score-line">{$t('games.tetris.score')}: {state.score}</p>
					<button onclick={startGame}>{$t('games.tetris.retryBtn')}</button>
				</div>
			</div>
		{/if}
	</div>

	{#if state.status !== 'idle' && showSidebar}
		<div class="sidebar">
			<div class="stat-block">
				<span class="stat-label">Siguiente</span>
				<canvas bind:this={previewCanvas} width={previewSize} height={previewSize}></canvas>
			</div>
			<div class="stat-block">
				<span class="stat-label">{$t('games.tetris.score')}</span>
				<span class="stat-value">{state.score}</span>
			</div>
			<div class="stat-block">
				<span class="stat-label">Líneas</span>
				<span class="stat-value">{state.lines}</span>
			</div>
			<div class="stat-block">
				<span class="stat-label">Nivel</span>
				<span class="stat-value">{state.level}</span>
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
