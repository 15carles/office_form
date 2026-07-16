<script lang="ts">
	import { t } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { getBestScore } from '$lib/stores/progress';
	import { VALID_GAMES } from '$lib/skins/registry';
	import { SKIN_PREVIEWS } from '$lib/skins/components';
	import type { SkinId } from '$lib/games/types';

	interface Props {
		skinId: SkinId;
		accent: string;
		featured?: boolean;
	}

	let { skinId, accent, featured = false }: Props = $props();

	const Preview = $derived(SKIN_PREVIEWS[skinId]);

	const totalBest = $derived(
		VALID_GAMES.reduce((sum, g) => sum + getBestScore(skinId, g), 0)
	);

	const GAME_LABELS: Record<string, string> = {
		snake: 'Data Flow', tetris: 'Layout Opt.', typing: 'Benchmark'
	};
</script>

<a href="{base}/{skinId}" class="skin-card" class:featured style:--accent={accent}>
	<div class="preview-wrap">
		<Preview />
		<div class="preview-overlay">
			<span class="open-label">{$t('home.open')}</span>
		</div>
	</div>

	<div class="card-body">
		<div class="card-title-row">
			<strong class="card-name">{$t(`skins.${skinId}.name`)}</strong>
			{#if featured}
				<span class="featured-badge">{$t('home.today')}</span>
			{/if}
		</div>
		<p class="card-desc">{$t(`skins.${skinId}.description`)}</p>

		<div class="card-games">
			{#each Object.values(GAME_LABELS) as label (label)}
				<span class="game-tag">{label}</span>
			{/each}
		</div>

		{#if totalBest > 0}
			<div class="card-score">
				<span class="score-dot" style:background={accent}></span>
				{$t('home.bestTotal', { values: { total: totalBest } })}
			</div>
		{/if}
	</div>
</a>

<style>
	.skin-card {
		display: flex;
		flex-direction: column;
		background: var(--of-surface, white);
		border: 1px solid var(--of-line, #e0e0e0);
		border-radius: var(--of-radius, 6px);
		text-decoration: none;
		color: inherit;
		font-family: var(--of-font, inherit);
		transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
		overflow: hidden;
	}

	.skin-card:hover {
		border-color: var(--accent);
		box-shadow: 0 6px 24px rgba(26, 26, 24, 0.08);
		transform: translateY(-2px);
	}

	.skin-card.featured {
		border-color: var(--accent);
		box-shadow: 0 0 0 1px var(--accent);
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
		padding: 14px 16px 16px;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.card-title-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.card-name {
		font-size: 13.5px;
		font-weight: 620;
		letter-spacing: -0.01em;
		color: var(--of-ink, #111);
	}

	.featured-badge {
		font-size: 9px;
		background: var(--accent);
		color: white;
		padding: 2px 7px;
		border-radius: 999px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 600;
	}

	.card-desc {
		font-size: 12px;
		color: var(--of-ink-muted, #888);
		line-height: 1.45;
		margin: 0;
	}

	.card-games {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
		margin-top: 2px;
	}

	.game-tag {
		font-size: 10px;
		background: var(--of-paper, #f5f5f5);
		border: 1px solid var(--of-line, #e5e5e5);
		border-radius: 999px;
		color: var(--of-ink-muted, #666);
		padding: 2px 9px;
	}

	.card-score {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
		color: var(--of-ink-muted, #888);
		margin-top: 3px;
	}

	.score-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
</style>
