<script lang="ts">
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

	const RIBBON_TABS = ['Inicio', 'Insertar', 'Diseño de página', 'Fórmulas', 'Datos', 'Revisar', 'Vista'];
	const activeTab = $state(0);

	const best = $derived(getBestScore('excel', gameId));
	const displayStatus = $derived(
		statusText || ($panicMode ? $t('ui.status.ready') : $t('ui.status.ready'))
	);

	function handleFullscreen() {
		toggleFullscreen(skinRoot);
	}
</script>

<div bind:this={skinRoot} class="excel-skin">

	<!-- Title bar -->
	<div class="title-bar">
		<span class="file-icon">⊞</span>
		<span class="file-name">{$t('skins.excel.appName')} — Excel</span>
		<div class="title-actions">
			<button class="title-btn" onclick={handleFullscreen} title={$isFullscreen ? $t('ui.exitFullscreen') : $t('ui.fullscreen')}>
				{$isFullscreen ? '⊡' : '⊟'}
			</button>
		</div>
	</div>

	<!-- Ribbon -->
	<div class="ribbon">
		<div class="ribbon-tabs">
			{#each RIBBON_TABS as tab, i}
				<button
					class="rtab"
					class:active={activeTab === i}
					onclick={() => {}}
				>{tab}</button>
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
		<!-- Col headers -->
		<div class="col-header-row">
			<div class="corner-cell"></div>
			<div class="col-headers-inner">
				{#each Array(12) as _, i}
					<div class="ch">{String.fromCharCode(65 + i)}</div>
				{/each}
			</div>
		</div>

		<div class="sheet-body">
			<!-- Row headers -->
			<div class="row-headers">
				{#each Array(20) as _, i}
					<div class="rh">{i + 1}</div>
				{/each}
			</div>

			<!-- Main content area -->
			<div class="grid-content">
				<!-- Fake report data cells (top portion) -->
				<div class="report-overlay">
					<div class="report-header">INFORME DE VENTAS Q4 2025 — Generado automáticamente · Uso interno</div>
					<div class="report-sub">=FECHA.HOY() → Actualizado: {new Date().toLocaleDateString('es-ES')} · Libro: Informe_Ventas_Q4_2025.xlsx</div>
				</div>

				<!-- Play area — hidden/shown via panicMode -->
				<div class="play-region" style:display={$panicMode ? 'none' : 'block'}>
					{#if children}
						{@render children()}
					{/if}
				</div>

				<!-- Panic content — visible only when panic active -->
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
		<button class="stab active">Resumen Q4</button>
		<button class="stab">Detalle mensual</button>
		<button class="stab">Previsión 2026</button>
		<button class="stab add">+</button>
	</div>

	<!-- Status bar -->
	<div class="status-bar">
		<span class="status-text">{displayStatus}</span>
		<span class="score-display">
			{$t('games.snake.score')}: {score} &nbsp;|&nbsp; {$t('games.snake.best')}: {best}
		</span>
		<span class="status-stats">Promedio: 18.432 &nbsp;|&nbsp; Recuento: 48 &nbsp;|&nbsp; Suma: 885.736</span>
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
		--skin-bg-secondary: #f3f3f3;
		--skin-accent: #1f7145;
		--skin-text-primary: #222;
		--skin-text-muted: #666;
		--skin-border: #cccccc;
	}

	/* Title bar */
	.title-bar {
		background: var(--accent);
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
	.file-icon { font-size: 14px; }
	.file-name { flex: 1; font-size: 12px; }
	.title-actions { display: flex; gap: 4px; }
	.title-btn {
		background: transparent;
		border: none;
		color: white;
		width: 24px;
		height: 24px;
		font-size: 14px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.title-btn:hover { background: rgba(255,255,255,0.15); }

	/* Ribbon */
	.ribbon {
		background: #f3f3f3;
		border-bottom: 2px solid var(--accent);
		flex-shrink: 0;
		user-select: none;
	}
	.ribbon-tabs {
		display: flex;
		padding: 0 8px;
	}
	.rtab {
		padding: 5px 14px;
		font-size: 12px;
		color: #333;
		cursor: pointer;
		border: 1px solid transparent;
		border-bottom: none;
		background: transparent;
		font-family: inherit;
		position: relative;
		top: 1px;
	}
	.rtab.active {
		background: white;
		border-color: #ccc;
		color: var(--accent);
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
	.ract:hover { background: #e8f5ee; border-color: var(--accent); }
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
	.sep-v { color: #aaa; }
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
		width: 46px;
		min-width: 46px;
		height: 18px;
		background: #f3f3f3;
		border-right: 1px solid #bbb;
		flex-shrink: 0;
	}
	.col-headers-inner { display: flex; overflow: hidden; }
	.ch {
		height: 18px;
		width: 90px;
		min-width: 90px;
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

	.sheet-body {
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	.row-headers {
		width: 46px;
		min-width: 46px;
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

	/* Grid content */
	.grid-content {
		flex: 1;
		position: relative;
		overflow: hidden;
		background: white;
	}

	.report-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: 3px 8px;
		pointer-events: none;
		z-index: 1;
	}
	.report-header {
		font-size: 11px;
		font-weight: bold;
		color: var(--accent);
		background: #e8f5ee;
		padding: 2px 4px;
	}
	.report-sub {
		font-size: 9px;
		color: #999;
		padding: 1px 4px;
	}

	/* Play / panic regions */
	.play-region {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 44px; /* below report overlay */
	}
	.panic-region {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 44px;
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
		font-family: inherit;
	}
	.stab.active { color: var(--accent); font-weight: 600; }
	.stab.add { color: #999; padding: 3px 10px; }

	/* Status bar */
	.status-bar {
		background: var(--accent);
		color: white;
		padding: 2px 12px;
		font-size: 11px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}
	.score-display { font-weight: 600; }
</style>
