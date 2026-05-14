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

		<!-- Canvas -->
		<div class="canvas-area">
			<div class="canvas-bg">

				<!-- Plugin window — game lives here -->
				<div class="play-region" style:display={$panicMode ? 'none' : 'flex'}>
					<div class="plugin-panel">

						<!-- Plugin title bar -->
						<div class="plugin-header">
							<div class="plugin-title-row">
								<span class="plugin-icon">⬡</span>
								<span class="plugin-name">Color Matrix</span>
							</div>
							<button class="plugin-close" tabindex="-1">×</button>
						</div>

						<!-- Plugin options (fake controls) -->
						<div class="plugin-controls">
							<div class="plugin-ctrl-row">
								<span class="ctrl-label">Harmony</span>
								<select class="ctrl-select" tabindex="-1">
									<option>Complementary</option>
									<option>Analogous</option>
									<option>Triadic</option>
									<option>Split-comp</option>
								</select>
							</div>
							<div class="plugin-ctrl-row">
								<span class="ctrl-label">Steps</span>
								<div class="ctrl-stepper">
									<button class="step-btn" tabindex="-1">−</button>
									<span class="step-val">20</span>
									<button class="step-btn" tabindex="-1">+</button>
								</div>
							</div>
						</div>

						<!-- Game canvas -->
						<div class="plugin-body">
							{#if children}
								{@render children()}
							{/if}
						</div>

						<!-- Plugin footer -->
						<div class="plugin-footer">
							<span class="footer-info">
								{score > 0 ? `${score} tiles` : '20 steps · 256 cells'}
							</span>
							<button class="plugin-apply" tabindex="-1">Apply to Frame</button>
						</div>

					</div>
				</div>

				{#if $panicMode}
					<div class="panic-region">
						<FigmaPanic />
					</div>
				{/if}

			</div>
		</div>

		<!-- Right panel: Design properties -->
		<div class="right-panel">
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
		gap: 0;
		flex-shrink: 0;
		border-bottom: 1px solid #3a3a3a;
	}
	.top-left { width: 220px; display: flex; align-items: center; }
	.figma-logo { font-size: 18px; color: #f24e1e; cursor: default; }
	.top-center { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; }
	.file-name { font-size: 12px; font-weight: 600; color: #e0e0e0; }
	.file-version { font-size: 11px; color: #666; }
	.top-right { width: 220px; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }

	.share-btn, .present-btn {
		padding: 5px 12px;
		font-size: 11px;
		font-family: inherit;
		cursor: pointer;
		border-radius: 6px;
	}
	.share-btn { background: #333; border: 1px solid #555; color: #e0e0e0; }
	.share-btn:hover { background: #444; }
	.present-btn { background: #18a0fb; border: none; color: white; }
	.present-btn:hover { background: #1090e8; }

	.avatar {
		width: 28px; height: 28px;
		border-radius: 50%;
		background: #7b61ff;
		color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 12px; font-weight: 700;
	}

	/* Toolbar */
	.toolbar {
		height: 40px;
		min-height: 40px;
		background: #1e1e1e;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		flex-shrink: 0;
		border-bottom: 1px solid #3a3a3a;
	}
	.tool-group { display: flex; gap: 4px; align-items: center; }
	.tool {
		width: 30px; height: 28px;
		background: transparent;
		border: 1px solid transparent;
		color: #bbb;
		font-size: 14px;
		cursor: pointer;
		border-radius: 4px;
		display: flex; align-items: center; justify-content: center;
	}
	.tool:hover { background: #333; }
	.tool.active { background: #18a0fb22; border-color: #18a0fb; color: #18a0fb; }
	.zoom-label { font-size: 11px; color: #888; }

	/* Main area */
	.main-area {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	/* Left panel */
	.left-panel {
		width: 220px;
		min-width: 220px;
		background: #2c2c2c;
		border-right: 1px solid #3a3a3a;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		flex-shrink: 0;
	}

	.panel-tabs {
		display: flex;
		border-bottom: 1px solid #3a3a3a;
		flex-shrink: 0;
	}
	.ptab {
		flex: 1;
		padding: 7px;
		font-size: 11px;
		background: transparent;
		border: none;
		color: #888;
		cursor: pointer;
		font-family: inherit;
	}
	.ptab.active { color: #e0e0e0; border-bottom: 2px solid #18a0fb; }

	.layers-list { flex: 1; overflow-y: auto; padding: 4px 0; }
	.layer-item {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 26px;
		padding-right: 8px;
		color: #ccc;
		font-size: 11px;
		cursor: default;
	}
	.layer-item:hover { background: #383838; }
	.layer-item.selected { background: #18a0fb22; color: #18a0fb; }
	.layer-icon { font-size: 10px; color: #888; width: 14px; text-align: center; flex-shrink: 0; }
	.layer-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	/* Canvas */
	.canvas-area {
		flex: 1;
		background: #1a1a1a;
		position: relative;
		overflow: hidden;
	}

	.canvas-bg {
		width: 100%;
		height: 100%;
		background-image: radial-gradient(circle, #3a3a3a 1px, transparent 1px);
		background-size: 20px 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.play-region {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* ── Plugin window ─────────────────────────────────── */
	.plugin-panel {
		width: 320px;
		height: min(560px, calc(100vh - 104px));
		display: flex;
		flex-direction: column;
		background: #ffffff;
		border-radius: 2px;
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.12),
			0 8px 40px rgba(0, 0, 0, 0.55),
			0 2px 8px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		color: #333;
		font-family: 'Inter', 'Segoe UI', sans-serif;
	}

	/* Plugin title bar */
	.plugin-header {
		height: 40px;
		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12px;
		background: #f2f2f2;
		border-bottom: 1px solid #e0e0e0;
		flex-shrink: 0;
	}
	.plugin-title-row {
		display: flex;
		align-items: center;
		gap: 7px;
	}
	.plugin-icon {
		font-size: 13px;
		color: #888;
	}
	.plugin-name {
		font-size: 12px;
		font-weight: 600;
		color: #1e1e1e;
		letter-spacing: -0.01em;
	}
	.plugin-close {
		width: 22px; height: 22px;
		background: transparent;
		border: none;
		color: #999;
		font-size: 16px;
		cursor: pointer;
		border-radius: 4px;
		display: flex; align-items: center; justify-content: center;
		line-height: 1;
		padding: 0;
	}
	.plugin-close:hover { background: #e8e8e8; color: #333; }

	/* Plugin controls */
	.plugin-controls {
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 7px;
		border-bottom: 1px solid #ebebeb;
		background: #fafafa;
		flex-shrink: 0;
	}
	.plugin-ctrl-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.ctrl-label {
		width: 58px;
		font-size: 11px;
		color: #888;
		flex-shrink: 0;
	}
	.ctrl-select {
		flex: 1;
		height: 26px;
		border: 1px solid #d5d5d5;
		border-radius: 4px;
		font-size: 11px;
		font-family: inherit;
		padding: 0 6px;
		background: white;
		color: #333;
		cursor: pointer;
		outline: none;
	}
	.ctrl-stepper {
		display: flex;
		align-items: center;
		border: 1px solid #d5d5d5;
		border-radius: 4px;
		overflow: hidden;
		height: 26px;
		background: white;
	}
	.step-btn {
		width: 26px;
		height: 100%;
		background: #f5f5f5;
		border: none;
		cursor: pointer;
		font-size: 14px;
		color: #666;
		display: flex; align-items: center; justify-content: center;
		padding: 0;
	}
	.step-btn:hover { background: #ebebeb; }
	.step-val {
		flex: 1;
		text-align: center;
		font-size: 11px;
		color: #333;
		min-width: 28px;
	}

	/* Plugin body — game canvas goes here */
	.plugin-body {
		flex: 1;
		overflow: hidden;
		position: relative;
		background: #fff;
	}

	/* Plugin footer */
	.plugin-footer {
		height: 40px;
		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12px;
		background: #fafafa;
		border-top: 1px solid #ebebeb;
		flex-shrink: 0;
	}
	.footer-info {
		font-size: 11px;
		color: #aaa;
	}
	.plugin-apply {
		padding: 5px 14px;
		background: #18a0fb;
		border: none;
		border-radius: 6px;
		color: white;
		font-size: 11px;
		font-family: inherit;
		font-weight: 500;
		cursor: pointer;
	}
	.plugin-apply:hover { background: #1090e8; }

	/* ─────────────────────────────────────────────────── */

	.panic-region {
		position: absolute;
		inset: 0;
	}

	/* Right panel */
	.right-panel {
		width: 220px;
		min-width: 220px;
		background: #2c2c2c;
		border-left: 1px solid #3a3a3a;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		flex-shrink: 0;
	}

	.prop-section {
		padding: 10px 12px;
		border-bottom: 1px solid #3a3a3a;
	}

	.prop-label {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
		margin-bottom: 6px;
	}

	.prop-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 11px;
		color: #aaa;
		margin-bottom: 4px;
	}

	.prop-val { color: #e0e0e0; font-variant-numeric: tabular-nums; }
	.score-val { color: #18a0fb; font-weight: 600; }
	.muted { color: #666; }

	.color-dot {
		width: 12px; height: 12px;
		border-radius: 2px;
		border: 1px solid #555;
		flex-shrink: 0;
	}
</style>
