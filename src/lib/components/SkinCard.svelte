<script lang="ts">
	import { t } from 'svelte-i18n';
	import { getBestScore } from '$lib/stores/progress';
	import SkinPreviewExcel from './SkinPreviewExcel.svelte';
	import SkinPreviewFigma from './SkinPreviewFigma.svelte';
	import SkinPreviewNotion from './SkinPreviewNotion.svelte';
	import type { SkinId } from '$lib/games/types';

	interface Props {
		skinId: SkinId;
		accent: string;
		featured?: boolean;
	}

	let { skinId, accent, featured = false }: Props = $props();

	const totalBest = $derived(
		['snake', 'tetris', 'typing'].reduce((sum, g) => sum + getBestScore(skinId, g), 0)
	);

	const GAME_LABELS: Record<string, string> = {
		snake: 'Data Flow', tetris: 'Layout Opt.', typing: 'Benchmark'
	};
</script>

<a href="/{skinId}" class="skin-card" class:featured style:--accent={accent}>
	<div class="preview-wrap">
		{#if skinId === 'excel'}
			<SkinPreviewExcel />
		{:else if skinId === 'figma'}
			<SkinPreviewFigma />
		{:else}
			<SkinPreviewNotion />
		{/if}
		<div class="preview-overlay">
			<span class="open-label">Open →</span>
		</div>
	</div>

	<div class="card-body">
		<div class="card-title-row">
			<strong class="card-name">{$t(`skins.${skinId}.name`)}</strong>
			{#if featured}
				<span class="featured-badge">Today</span>
			{/if}
		</div>
		<p class="card-desc">{$t(`skins.${skinId}.description`)}</p>

		<div class="card-games">
			{#each Object.entries(GAME_LABELS) as [g, label]}
				<span class="game-tag">{label}</span>
			{/each}
		</div>

		{#if totalBest > 0}
			<div class="card-score">
				<span class="score-dot" style:background={accent}></span>
				Best: {totalBest} total
			</div>
		{/if}
	</div>
</a>

<style>
	.skin-card {
		display: flex;
		flex-direction: column;
		background: white;
		border: 1px solid #e0e0e0;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
		overflow: hidden;
	}

	.skin-card:hover {
		border-color: var(--accent);
		box-shadow: 0 4px 20px rgba(0,0,0,0.1);
		transform: translateY(-2px);
	}

	.skin-card.featured {
		border-color: var(--accent);
		border-width: 2px;
	}

	.preview-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 320 / 200;
		overflow: hidden;
		background: #f5f5f5;
	}

	.preview-wrap :global(svg) {
		width: 100%;
		height: 100%;
	}

	.preview-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0,0,0,0);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s;
	}

	.skin-card:hover .preview-overlay {
		background: rgba(0,0,0,0.35);
	}

	.open-label {
		color: white;
		font-size: 14px;
		font-weight: 600;
		opacity: 0;
		transition: opacity 0.2s;
		letter-spacing: 0.05em;
	}

	.skin-card:hover .open-label { opacity: 1; }

	.card-body {
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.card-title-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.card-name {
		font-size: 13px;
		font-weight: 600;
		color: #111;
	}

	.featured-badge {
		font-size: 9px;
		background: var(--accent);
		color: white;
		padding: 1px 6px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 600;
	}

	.card-desc {
		font-size: 11px;
		color: #888;
		line-height: 1.4;
		margin: 0;
	}

	.card-games {
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
	}

	.game-tag {
		font-size: 10px;
		background: #f5f5f5;
		border: 1px solid #e5e5e5;
		color: #666;
		padding: 2px 7px;
	}

	.card-score {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 10px;
		color: #888;
		margin-top: 2px;
	}

	.score-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
</style>
