<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { toggleFullscreen, isFullscreen } from '$lib/stores/fullscreen';
	import { getBestScore } from '$lib/stores/progress';
	import ExcelPanic from './ExcelPanic.svelte';

	interface Props {
		gameId?: string;
		score?: number;
		statusText?: string;
		formulaText?: string;
		cellRef?: string;
		children?: Snippet;
	}

	let {
		gameId = 'snake',
		score = 0,
		statusText = '',
		formulaText = '=SUMA(C5:C12)',
		cellRef = 'C5',
		children
	}: Props = $props();

	let skinRoot: HTMLElement;
	let bgCanvas: HTMLCanvasElement;
	let wrapEl: HTMLElement;

	const RIBBON_TABS = ['Inicio', 'Insertar', 'Diseño de página', 'Fórmulas', 'Datos', 'Revisar', 'Vista'];

	const best = $derived(getBestScore('excel', gameId));

	// Game grid dimensions — must match snake engine
	const G_COLS = 10, G_ROWS = 14, GCW = 28, GRH = 20;
	const GAME_W = G_COLS * GCW; // 280px
	const GAME_H = G_ROWS * GRH; // 280px

	const COL_W = 90, ROW_H = 22;

	const TABLE_HEADERS = ['Delegación', 'Octubre', 'Noviembre', 'Diciembre', 'Total Q4', 'Var. %', 'Objetivo', 'Cumpl. %'];
	const TABLE_ROWS = [
		['Madrid Norte', '48.320', '51.200', '67.840', '167.360', '+12,4%', '155.000', '107,97%'],
		['Madrid Sur',   '39.100', '42.750', '58.300', '140.150', '+8,1%',  '135.000', '103,81%'],
		['Barcelona',    '55.600', '59.200', '71.500', '186.300', '+15,2%', '175.000', '106,46%'],
		['Valencia',     '28.400', '31.100', '39.800', '99.300',  '+6,7%',  '95.000',  '104,53%'],
		['Sevilla',      '22.100', '24.500', '31.200', '77.800',  '+4,3%',  '80.000',   '97,25%'],
		['Bilbao',       '19.800', '21.300', '28.900', '70.000',  '+9,8%',  '65.000',  '107,69%'],
		['Zaragoza',     '17.500', '18.900', '24.600', '61.000',  '+3,1%',  '60.000',  '101,67%'],
		['Málaga',       '16.200', '17.800', '23.100', '57.100',  '+7,5%',  '55.000',  '103,82%'],
	];
	const TABLE_TOTALS = ['TOTAL', '247.020', '266.750', '345.240', '859.010', '+8,9%', '820.000', '104,76%'];
	const KPIS: [string, string, boolean][] = [
		['Facturación total', '859.010 €', true],
		['Crecimiento YoY',   '+8,9%',     false],
		['Ticket medio',      '1.847 €',   false],
		['Nº operaciones',    '465',        false],
		['Objetivo anual',    '87,3%',     true],
	];
	const NOTES = [
		'Notas y observaciones:',
		'· Los datos incluyen ventas directas y canal digital (e-commerce).',
		'· Variación % calculada respecto al mismo trimestre del año anterior (Q4 2024).',
		'· Objetivos fijados en reunión de dirección del 02/10/2025.',
		'· Próxima revisión: 15/01/2026 · Responsable: A. Fernández (Dir. Comercial)',
	];

	function drawBackground() {
		if (!bgCanvas || !wrapEl) return;
		const W = wrapEl.clientWidth;
		const H = wrapEl.clientHeight;
		if (W === 0 || H === 0) return;

		bgCanvas.width = W;
		bgCanvas.height = H;
		const ctxOrNull = bgCanvas.getContext('2d');
		if (!ctxOrNull) return;
		const ctx: CanvasRenderingContext2D = ctxOrNull;

		const TC = Math.ceil(W / COL_W) + 1;
		const TR = Math.ceil(H / ROW_H) + 1;

		// Base alternating rows
		for (let r = 0; r < TR; r++) {
			ctx.fillStyle = r % 2 === 0 ? '#ffffff' : '#fafafa';
			ctx.fillRect(0, r * ROW_H, W, ROW_H);
		}

		function fr(col: number, row: number, cols: number, color: string) {
			ctx.fillStyle = color;
			ctx.fillRect(col * COL_W, row * ROW_H, cols * COL_W, ROW_H);
		}
		function sr(col: number, row: number, cols: number, color: string, lw = 1) {
			ctx.strokeStyle = color; ctx.lineWidth = lw;
			ctx.strokeRect(col * COL_W + 0.5, row * ROW_H + 0.5, cols * COL_W - 1, ROW_H - 1);
		}
		function tx(col: number, row: number, str: string, opts: { bold?: boolean; size?: number; color?: string; align?: 'left' | 'right' | 'center' } = {}) {
			ctx.font = (opts.bold ? 'bold ' : '') + (opts.size || 11) + 'px Calibri, Segoe UI, sans-serif';
			ctx.fillStyle = opts.color || '#222';
			ctx.textBaseline = 'middle';
			const y = row * ROW_H + ROW_H / 2 + 1;
			if (opts.align === 'right') {
				ctx.textAlign = 'right';
				ctx.fillText(str, (col + 1) * COL_W - 5, y);
			} else if (opts.align === 'center') {
				ctx.textAlign = 'center';
				ctx.fillText(str, col * COL_W + COL_W / 2, y);
			} else {
				ctx.textAlign = 'left';
				ctx.fillText(str, col * COL_W + 5, y);
			}
		}

		// Title block
		fr(0, 0, 8, '#e8f5ee');
		tx(0, 0, 'INFORME DE VENTAS Q4 2025  —  Generado automáticamente · Uso interno', { bold: true, size: 12, color: '#1f7145' });
		tx(0, 1, `=FECHA.HOY()  →  Actualizado: ${new Date().toLocaleDateString('es-ES')}  ·  Libro: Informe_Ventas_Q4_2025.xlsx  ·  Hoja: Resumen Q4`, { size: 10, color: '#999' });

		// Main table
		const TR_START = 3;
		fr(0, TR_START, TABLE_HEADERS.length, '#1f7145');
		TABLE_HEADERS.forEach((h, i) => {
			tx(i, TR_START, h, { bold: true, color: 'white', align: i === 0 ? 'left' : 'right', size: 11 });
		});
		TABLE_ROWS.forEach((row, ri) => {
			const r = TR_START + 1 + ri;
			if (ri % 2 === 0) fr(0, r, 8, '#f2faf6');
			row.forEach((val, ci) => {
				let color = '#222';
				if (ci === 5) color = val.startsWith('+') ? '#1a7a3c' : '#c0392b';
				if (ci === 7) color = parseFloat(val) >= 100 ? '#1a7a3c' : '#c0392b';
				tx(ci, r, val, { align: ci === 0 ? 'left' : 'right', color, size: 11 });
			});
		});
		const totRow = TR_START + 1 + TABLE_ROWS.length;
		fr(0, totRow, 8, '#d4edda');
		sr(0, totRow, 8, '#1f7145', 1.5);
		TABLE_TOTALS.forEach((val, ci) => {
			tx(ci, totRow, val, { bold: true, align: ci === 0 ? 'left' : 'right', color: ci === 5 ? '#1a7a3c' : '#111', size: 11 });
		});

		// KPI box (col 9)
		const KC = 9, KR = TR_START;
		fr(KC, KR, 3, '#1f7145');
		tx(KC, KR, 'KPIs PRINCIPALES', { bold: true, color: 'white', size: 11 });
		KPIS.forEach(([label, val, hl], i) => {
			const r = KR + 1 + i;
			if (hl) fr(KC, r, 3, '#e8f5ee');
			sr(KC, r, 3, '#b2dfca', 0.5);
			tx(KC, r, label, { color: '#555', size: 10 });
			tx(KC + 2, r, val, { bold: hl, color: '#1f7145', align: 'right', size: 11 });
		});

		// Bar chart (col 9, below KPIs)
		const BC = 9, BR = KR + 7;
		fr(BC, BR, 3, '#1f7145');
		tx(BC, BR, 'Ventas por delegación (miles €)', { bold: true, color: 'white', size: 10 });
		const barData = [167, 140, 186, 99, 77, 70];
		const barLabels = ['MAD-N', 'MAD-S', 'BCN', 'VLC', 'SVL', 'BIL'];
		barData.forEach((val, i) => {
			const r = BR + 1 + i;
			const bw = Math.floor((val / 200) * (COL_W * 2 - 10));
			ctx.fillStyle = '#2e9e61';
			ctx.fillRect(BC * COL_W + COL_W + 2, r * ROW_H + 3, bw, ROW_H - 6);
			sr(BC, r, 3, '#d0ead8', 0.5);
			tx(BC, r, barLabels[i], { size: 10, color: '#555' });
			tx(BC + 2, r, val + 'k', { size: 10, color: '#1a7a3c', align: 'right' });
		});

		// Notes block
		const NR = totRow + 2;
		fr(0, NR, 8, '#fffde7');
		sr(0, NR, 8, '#f0c040', 1);
		tx(0, NR, '⚠  ' + NOTES[0], { bold: true, color: '#7a6000', size: 11 });
		for (let i = 1; i < NOTES.length; i++) {
			tx(0, NR + i, NOTES[i], { color: '#666', size: 10 });
		}

		// Comparison table (col 9, lower)
		const T2R = NR + NOTES.length + 2, T2C = 9;
		fr(T2C, T2R, 3, '#1f7145');
		tx(T2C, T2R, 'Comparativa Q4 2024 vs 2025', { bold: true, color: 'white', size: 10 });
		[['Q4 2024', '789.200 €', '—'], ['Q4 2025', '859.010 €', '+8,9%'], ['Diferencia', '+69.810 €', '']].forEach(([a, b, c], i) => {
			const r = T2R + 1 + i;
			if (i % 2 === 0) fr(T2C, r, 3, '#f2faf6');
			sr(T2C, r, 3, '#d0ead8', 0.5);
			tx(T2C, r, a, { size: 10, color: '#333' });
			tx(T2C + 1, r, b, { size: 10, color: i === 2 ? '#1a7a3c' : '#222', align: 'right', bold: i === 2 });
			tx(T2C + 2, r, c, { size: 10, color: '#1a7a3c', align: 'right', bold: i === 1 });
		});

		// Grid lines
		ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 0.5;
		for (let c = 0; c <= TC; c++) {
			ctx.beginPath(); ctx.moveTo(c * COL_W, 0); ctx.lineTo(c * COL_W, H); ctx.stroke();
		}
		for (let r = 0; r <= TR; r++) {
			ctx.beginPath(); ctx.moveTo(0, r * ROW_H); ctx.lineTo(W, r * ROW_H); ctx.stroke();
		}

		// Clear game zone at bottom-left so game canvas renders on top cleanly
		ctx.fillStyle = '#f0faf4';
		ctx.fillRect(0, H - GAME_H, GAME_W, GAME_H);
		ctx.strokeStyle = '#a0d0b0'; ctx.lineWidth = 1.5;
		ctx.strokeRect(1, H - GAME_H + 1, GAME_W - 2, GAME_H - 2);
	}

	onMount(() => {
		drawBackground();
		const observer = new ResizeObserver(() => drawBackground());
		observer.observe(wrapEl);
		return () => observer.disconnect();
	});
</script>

<div bind:this={skinRoot} class="excel-skin">

	<!-- Title bar -->
	<div class="title-bar">
		<span class="file-name">Informe_Ventas_Q4_2025.xlsx — Excel</span>
		<div class="title-wbtns">
			<button class="wb" onclick={() => toggleFullscreen(skinRoot)} title={$isFullscreen ? $t('ui.exitFullscreen') : $t('ui.fullscreen')}
				style:background={$isFullscreen ? '#e74c3c' : '#f39c12'}></button>
		</div>
	</div>

	<!-- Ribbon -->
	<div class="ribbon">
		<div class="ribbon-tabs">
			{#each RIBBON_TABS as tab, i}
				<div class="rtab" class:active={i === 0}>{tab}</div>
			{/each}
		</div>
		<div class="ribbon-actions">
			<button class="ract">Copiar</button>
			<button class="ract">Pegar</button>
			<span class="sep">|</span>
			<span>Calibri &nbsp; 11</span>
			<span class="sep">|</span>
			<button class="ract"><b>N</b></button>
			<button class="ract"><i>K</i></button>
			<button class="ract"><u>S</u></button>
			<span class="sep">|</span>
			<button class="ract">Σ Autosuma</button>
			<button class="ract">Ordenar y filtrar</button>
			<button class="ract">Formato condicional</button>
		</div>
	</div>

	<!-- Formula bar -->
	<div class="formula-bar">
		<div class="cell-ref">{cellRef}</div>
		<span class="sep-v">|</span>
		<span class="fx">ƒx</span>
		<div class="formula-content">{formulaText}</div>
	</div>

	<!-- Sheet body -->
	<div class="sheet-outer">
		<div class="col-header-row">
			<div class="corner-cell"></div>
			<div class="col-headers-inner">
				{#each Array(14) as _, i}
					<div class="ch">{String.fromCharCode(65 + i)}</div>
				{/each}
			</div>
		</div>

		<div class="sheet-body">
			<div class="row-headers">
				{#each Array(24) as _, i}
					<div class="rh">{i + 1}</div>
				{/each}
			</div>

			<!-- Grid canvas wrap: background canvas + game overlay -->
			<div class="grid-canvas-wrap" bind:this={wrapEl}>
				<canvas class="bg-canvas" bind:this={bgCanvas}></canvas>

				<!-- Game slot: bottom-left corner, same size as snake grid -->
				<div
					class="game-slot"
					style:display={$panicMode ? 'none' : 'block'}
					style:width="{GAME_W}px"
					style:height="{GAME_H}px"
				>
					{#if children}
						{@render children()}
					{/if}
				</div>

				{#if $panicMode}
					<div class="panic-region">
						<ExcelPanic />
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Sheet tabs -->
	<div class="sheet-tabs">
		<div class="stab active">Resumen Q4</div>
		<div class="stab">Detalle mensual</div>
		<div class="stab">Previsión 2026</div>
		<div class="stab add">+</div>
	</div>

	<!-- Status bar -->
	<div class="status-bar">
		<span class="status-text">{statusText || $t('ui.status.ready')}</span>
		<span class="score-display">Puntuación: {score} &nbsp;|&nbsp; Récord: {best}</span>
		<span>Promedio: 18.432 &nbsp;|&nbsp; Recuento: 48 &nbsp;|&nbsp; Suma: 885.736</span>
	</div>
</div>

<style>
	.excel-skin {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #d4d4d4;
		font-family: 'Calibri', 'Segoe UI', sans-serif;
		font-size: 12px;
		overflow: hidden;

		--accent: #1f7145;
		--skin-bg-primary: #ffffff;
		--skin-accent: #1f7145;
	}

	/* Title bar */
	.title-bar {
		background: #1f7145;
		color: white;
		height: 28px;
		min-height: 28px;
		padding: 0 12px;
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		user-select: none;
		flex-shrink: 0;
	}
	.file-name { flex: 1; font-size: 12px; }
	.title-wbtns { display: flex; gap: 6px; }
	.wb {
		width: 11px; height: 11px;
		border-radius: 50%;
		cursor: pointer;
		border: none;
	}

	/* Ribbon */
	.ribbon {
		background: #f3f3f3;
		border-bottom: 2px solid #1f7145;
		flex-shrink: 0;
		user-select: none;
	}
	.ribbon-tabs { display: flex; padding: 0 8px; }
	.rtab {
		padding: 5px 14px;
		font-size: 12px;
		color: #333;
		cursor: pointer;
		border: 1px solid transparent;
		border-bottom: none;
		position: relative;
		top: 1px;
	}
	.rtab.active {
		background: white;
		border-color: #ccc;
		color: #1f7145;
		font-weight: 600;
	}
	.ribbon-actions {
		background: white;
		padding: 3px 12px;
		display: flex;
		align-items: center;
		gap: 12px;
		border-bottom: 1px solid #e0e0e0;
		font-size: 11px;
		color: #333;
	}
	.ract {
		padding: 2px 7px;
		border: 1px solid #ccc;
		background: #fafafa;
		cursor: pointer;
		font-size: 11px;
		font-family: inherit;
	}
	.ract:hover { background: #e8f5ee; border-color: #1f7145; }
	.sep { color: #ccc; }

	/* Formula bar */
	.formula-bar {
		background: white;
		border-bottom: 1px solid #ccc;
		padding: 2px 8px;
		display: flex;
		align-items: center;
		gap: 6px;
		height: 24px;
		min-height: 24px;
		flex-shrink: 0;
	}
	.cell-ref {
		border: 1px solid #bbb;
		padding: 1px 5px;
		width: 52px;
		font-size: 11px;
		text-align: center;
		color: #333;
	}
	.sep-v { color: #aaa; margin: 0 2px; }
	.fx { color: #888; font-style: italic; font-size: 13px; }
	.formula-content { flex: 1; color: #333; font-size: 11px; }

	/* Sheet outer */
	.sheet-outer {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.col-header-row {
		display: flex;
		flex-shrink: 0;
		border-bottom: 1px solid #bbb;
		background: #f3f3f3;
	}
	.corner-cell {
		width: 46px; min-width: 46px;
		height: 18px;
		background: #f3f3f3;
		border-right: 1px solid #bbb;
		flex-shrink: 0;
	}
	.col-headers-inner { display: flex; overflow: hidden; }
	.ch {
		height: 18px;
		width: 90px; min-width: 90px;
		background: #f3f3f3;
		border-right: 1px solid #ccc;
		font-size: 10px;
		color: #555;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		user-select: none;
	}

	.sheet-body { flex: 1; display: flex; overflow: hidden; }
	.row-headers {
		width: 46px; min-width: 46px;
		overflow: hidden;
		flex-shrink: 0;
	}
	.rh {
		height: 22px;
		background: #f3f3f3;
		border-right: 1px solid #bbb;
		border-bottom: 1px solid #e8e8e8;
		font-size: 10px;
		color: #555;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
	}

	/* Canvas area */
	.grid-canvas-wrap {
		flex: 1;
		position: relative;
		overflow: hidden;
	}
	.bg-canvas {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
	}
	.game-slot {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.panic-region {
		position: absolute;
		inset: 0;
	}

	/* Sheet tabs */
	.sheet-tabs {
		background: #f3f3f3;
		border-top: 1px solid #ccc;
		padding: 2px 8px 0;
		display: flex;
		gap: 2px;
		flex-shrink: 0;
	}
	.stab {
		padding: 3px 14px;
		font-size: 11px;
		background: white;
		border: 1px solid #ccc;
		border-bottom: none;
		color: #333;
		cursor: pointer;
	}
	.stab.active { color: #1f7145; font-weight: 600; }
	.stab.add { color: #999; padding: 3px 10px; }

	/* Status bar */
	.status-bar {
		background: #1f7145;
		color: white;
		padding: 2px 12px;
		font-size: 11px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}
	.score-display { font-weight: 700; }
</style>
