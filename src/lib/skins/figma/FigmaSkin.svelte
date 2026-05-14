<script lang="ts">
	import type { Snippet } from 'svelte';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { toggleFullscreen, isFullscreen } from '$lib/stores/fullscreen';
	import { getBestScore } from '$lib/stores/progress';
	import FigmaPanic from './FigmaPanic.svelte';

	interface Props {
		gameId?: string;
		score?: number;
		children?: Snippet;
	}

	let { gameId = 'tetris', score = 0, children }: Props = $props();

	let skinRoot: HTMLElement;
	const best = $derived(getBestScore('figma', gameId));

	const LAYERS = [
		{ name: 'Frame 1', type: 'frame', indent: 0 },
		{ name: 'Group', type: 'group', indent: 1 },
		{ name: 'Button/Primary', type: 'component', indent: 2 },
		{ name: 'Icon/chevron', type: 'vector', indent: 2 },
		{ name: 'Background', type: 'rect', indent: 1 },
		{ name: 'Header', type: 'text', indent: 1 },
		{ name: 'Divider', type: 'line', indent: 1 },
	];

	const ICONS: Record<string, string> = {
		frame: '⬜', group: '◻', component: '◈', vector: '⬡', rect: '▭', text: 'T', line: '—'
	};
</script>

<div bind:this={skinRoot} class="figma-skin">

	<!-- Top bar -->
	<div class="top-bar">
		<div class="top-left">
			<span class="figma-logo">◈</span>
		</div>
		<div class="top-center">
			<span class="file-name">{$t('skins.figma.appName')}</span>
			<span class="file-version">v2.4.1</span>
		</div>
		<div class="top-right">
			<button class="share-btn">Share</button>
			<button class="present-btn" onclick={() => toggleFullscreen(skinRoot)}>
				{$isFullscreen ? '⊡' : '▶'} {$isFullscreen ? 'Exit' : 'Present'}
			</button>
			<div class="avatar">A</div>
		</div>
	</div>

	<!-- Toolbar -->
	<div class="toolbar">
		<div class="tool-group">
			<button class="tool active" title="Move">▲</button>
			<button class="tool" title="Frame">⬜</button>
			<button class="tool" title="Shape">◯</button>
			<button class="tool" title="Pen">✒</button>
			<button class="tool" title="Text">T</button>
		</div>
		<div class="tool-group">
			<span class="zoom-label">100%</span>
		</div>
	</div>

	<div class="main-area">

		<!-- Left panel: Layers -->
		<div class="left-panel">
			<div class="panel-tabs">
				<button class="ptab active">Layers</button>
				<button class="ptab">Assets</button>
			</div>
			<div class="layers-list">
				{#each LAYERS as layer}
					<div class="layer-item" style:padding-left="{8 + layer.indent * 12}px">
						<span class="layer-icon">{ICONS[layer.type] ?? '◻'}</span>
						<span class="layer-name">{layer.name}</span>
					</div>
				{/each}
				{#if score > 0}
					<div class="layer-item selected" style:padding-left="20px">
						<span class="layer-icon">◈</span>
						<span class="layer-name">Layout/{score}units</span>
					</div>
				{/if}
			</div>
		</div>

		<!-- Canvas: fake artboard frames (no game here) -->
		<div class="canvas-area">
			<div class="canvas-bg">
				<!-- Decorative artboards so the canvas looks like real work -->
				<div class="artboard ab1">
					<span class="ab-label">Homepage · Desktop</span>
				</div>
				<div class="artboard ab2">
					<span class="ab-label">Card / Default</span>
				</div>
				<div class="artboard ab3">
					<span class="ab-label">Button component</span>
				</div>

				{#if $panicMode}
					<div class="panic-region">
						<FigmaPanic />
					</div>
				{/if}
			</div>
		</div>

		<!-- Right panel: plugin tab with game when playing, design props when panic -->
		<div class="right-panel">
			{#if !$panicMode}
				<!-- Plugin tabs — Color Matrix is active -->
				<div class="panel-tabs">
					<button class="ptab">Design</button>
					<button class="ptab">Prototype</button>
					<button class="ptab active plugin-tab">
						<span class="plugin-tab-dot"></span>Color Matrix
					</button>
				</div>

				<!-- Plugin controls -->
				<div class="plugin-opts">
					<div class="opt-row">
						<span class="opt-label">Harmony</span>
						<select class="opt-select" tabindex="-1">
							<option>Complementary</option>
							<option>Analogous</option>
							<option>Triadic</option>
							<option>Split-comp</option>
						</select>
					</div>
					<div class="opt-row">
						<span class="opt-label">Steps</span>
						<div class="opt-stepper">
							<button class="step-btn" tabindex="-1">−</button>
							<span class="step-val">20</span>
							<button class="step-btn" tabindex="-1">+</button>
						</div>
					</div>
				</div>

				<!-- Game fills the remaining right panel space -->
				<div class="plugin-game">
					{#if children}
						{@render children()}
					{/if}
				</div>

				<!-- Apply bar -->
				<div class="plugin-bar">
					<span class="bar-info">{score > 0 ? `${score} tiles` : '256 cells'}</span>
					<button class="apply-btn" tabindex="-1">Apply to Frame</button>
				</div>

			{:else}
				<!-- Normal design properties in panic mode -->
				<div class="panel-tabs">
					<button class="ptab active">Design</button>
					<button class="ptab">Prototype</button>
				</div>
				<div class="prop-section">
					<div class="prop-label">Frame</div>
					<div class="prop-row"><span>W</span><span class="prop-val">1440</span></div>
					<div class="prop-row"><span>H</span><span class="prop-val">900</span></div>
				</div>
				<div class="prop-section">
					<div class="prop-label">Layout</div>
					<div class="prop-row"><span>Units</span><span class="prop-val score-val">{score > 0 ? score : '—'}</span></div>
					<div class="prop-row"><span>Best</span><span class="prop-val">{best || '—'}</span></div>
				</div>
				<div class="prop-section">
					<div class="prop-label">Fill</div>
					<div class="prop-row">
						<span class="color-dot" style:background="#f5f5f5"></span>
						<span class="prop-val">#F5F5F5</span>
					</div>
				</div>
				<div class="prop-section">
					<div class="prop-label">Effects</div>
					<div class="prop-row muted">Drop shadow</div>
				</div>
			{/if}
		</div>

	</div>
</div>

<style>
	.figma-skin {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #2c2c2c;
		font-family: 'Inter', 'Segoe UI', sans-serif;
		font-size: 12px;
		overflow: hidden;
		color: #e0e0e0;

		--accent: #18a0fb;
		--skin-bg-primary: #2c2c2c;
		--skin-accent: #18a0fb;
	}

	/* Top bar */
	.top-bar {
		height: 40px;
		min-height: 40px;
		background: #1e1e1e;
		display: flex;
		align-items: center;
		padding: 0 12px;
		flex-shrink: 0;
		border-bottom: 1px solid #3a3a3a;
	}
	.top-left { width: 220px; display: flex; align-items: center; }
	.figma-logo { font-size: 18px; color: #f24e1e; cursor: default; }
	.top-center { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; }
	.file-name { font-size: 12px; font-weight: 600; color: #e0e0e0; }
	.file-version { font-size: 11px; color: #666; }
	.top-right { width: 240px; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }

	.share-btn, .present-btn {
		padding: 5px 12px; font-size: 11px; font-family: inherit;
		cursor: pointer; border-radius: 6px;
	}
	.share-btn { background: #333; border: 1px solid #555; color: #e0e0e0; }
	.share-btn:hover { background: #444; }
	.present-btn { background: #18a0fb; border: none; color: white; }
	.present-btn:hover { background: #1090e8; }
	.avatar {
		width: 28px; height: 28px; border-radius: 50%;
		background: #7b61ff; color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 12px; font-weight: 700;
	}

	/* Toolbar */
	.toolbar {
		height: 40px; min-height: 40px;
		background: #1e1e1e;
		display: flex; align-items: center; justify-content: space-between;
		padding: 0 16px; flex-shrink: 0;
		border-bottom: 1px solid #3a3a3a;
	}
	.tool-group { display: flex; gap: 4px; align-items: center; }
	.tool {
		width: 30px; height: 28px;
		background: transparent; border: 1px solid transparent;
		color: #bbb; font-size: 14px; cursor: pointer; border-radius: 4px;
		display: flex; align-items: center; justify-content: center;
	}
	.tool:hover { background: #333; }
	.tool.active { background: #18a0fb22; border-color: #18a0fb; color: #18a0fb; }
	.zoom-label { font-size: 11px; color: #888; }

	/* Main area */
	.main-area { flex: 1; display: flex; overflow: hidden; }

	/* Left panel */
	.left-panel {
		width: 220px; min-width: 220px;
		background: #2c2c2c; border-right: 1px solid #3a3a3a;
		display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0;
	}

	.panel-tabs {
		display: flex; border-bottom: 1px solid #3a3a3a; flex-shrink: 0;
	}
	.ptab {
		flex: 1; padding: 7px; font-size: 11px;
		background: transparent; border: none; color: #888;
		cursor: pointer; font-family: inherit;
		display: flex; align-items: center; justify-content: center; gap: 4px;
	}
	.ptab.active { color: #e0e0e0; border-bottom: 2px solid #18a0fb; }
	.plugin-tab { font-size: 10px; white-space: nowrap; }
	.plugin-tab-dot {
		width: 6px; height: 6px; border-radius: 50%;
		background: #18a0fb; flex-shrink: 0;
	}

	.layers-list { flex: 1; overflow-y: auto; padding: 4px 0; }
	.layer-item {
		display: flex; align-items: center; gap: 6px;
		height: 26px; padding-right: 8px; color: #ccc; font-size: 11px; cursor: default;
	}
	.layer-item:hover { background: #383838; }
	.layer-item.selected { background: #18a0fb22; color: #18a0fb; }
	.layer-icon { font-size: 10px; color: #888; width: 14px; text-align: center; flex-shrink: 0; }
	.layer-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	/* Canvas */
	.canvas-area { flex: 1; background: #1a1a1a; position: relative; overflow: hidden; }
	.canvas-bg {
		width: 100%; height: 100%;
		background-image: radial-gradient(circle, #3a3a3a 1px, transparent 1px);
		background-size: 20px 20px;
		position: relative;
	}

	/* Fake artboard frames on canvas */
	.artboard {
		position: absolute;
		background: #fff;
		border: none;
	}
	.ab-label {
		position: absolute;
		top: -18px; left: 0;
		font-size: 10px; color: #555;
		white-space: nowrap; font-family: 'Inter', sans-serif;
	}
	.ab1 { width: 420px; height: 260px; top: 12%; left: 8%; }
	.ab2 { width: 260px; height: 160px; top: 58%; left: 12%; }
	.ab3 { width: 160px; height: 100px; top: 20%; left: 55%; }

	.panic-region { position: absolute; inset: 0; }

	/* Right panel */
	.right-panel {
		width: 240px; min-width: 240px;
		background: #2c2c2c; border-left: 1px solid #3a3a3a;
		display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0;
	}

	/* Plugin controls (in right panel) */
	.plugin-opts {
		padding: 8px 10px;
		display: flex; flex-direction: column; gap: 6px;
		border-bottom: 1px solid #3a3a3a;
		flex-shrink: 0;
		background: #282828;
	}
	.opt-row { display: flex; align-items: center; gap: 6px; }
	.opt-label { width: 52px; font-size: 10px; color: #888; flex-shrink: 0; }
	.opt-select {
		flex: 1; height: 24px;
		border: 1px solid #4a4a4a; border-radius: 3px;
		font-size: 10px; font-family: inherit;
		padding: 0 5px; background: #333; color: #ccc;
		cursor: pointer; outline: none;
	}
	.opt-stepper {
		display: flex; align-items: center;
		border: 1px solid #4a4a4a; border-radius: 3px;
		overflow: hidden; height: 24px; background: #333;
	}
	.step-btn {
		width: 24px; height: 100%;
		background: #3a3a3a; border: none; cursor: pointer;
		font-size: 13px; color: #888;
		display: flex; align-items: center; justify-content: center; padding: 0;
	}
	.step-btn:hover { background: #444; }
	.step-val { flex: 1; text-align: center; font-size: 10px; color: #ccc; min-width: 24px; }

	/* Game area inside right panel */
	.plugin-game {
		flex: 1; overflow: hidden; position: relative;
		background: #1e1e1e;
	}

	/* Apply bar */
	.plugin-bar {
		height: 38px; min-height: 38px;
		display: flex; align-items: center; justify-content: space-between;
		padding: 0 10px;
		border-top: 1px solid #3a3a3a; background: #282828; flex-shrink: 0;
	}
	.bar-info { font-size: 10px; color: #666; }
	.apply-btn {
		padding: 4px 10px; background: #18a0fb; border: none;
		border-radius: 4px; color: white; font-size: 10px;
		font-family: inherit; font-weight: 500; cursor: pointer;
	}
	.apply-btn:hover { background: #1090e8; }

	/* Design properties (panic mode) */
	.prop-section { padding: 10px 12px; border-bottom: 1px solid #3a3a3a; }
	.prop-label {
		font-size: 10px; text-transform: uppercase;
		letter-spacing: 0.05em; color: #666; margin-bottom: 6px;
	}
	.prop-row {
		display: flex; justify-content: space-between; align-items: center;
		font-size: 11px; color: #aaa; margin-bottom: 4px;
	}
	.prop-val { color: #e0e0e0; font-variant-numeric: tabular-nums; }
	.score-val { color: #18a0fb; font-weight: 600; }
	.muted { color: #666; }
	.color-dot {
		width: 12px; height: 12px; border-radius: 2px;
		border: 1px solid #555; flex-shrink: 0;
	}
</style>
