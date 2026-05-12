<script lang="ts">
	import { t } from 'svelte-i18n';
	import { getGameOfDay } from '$lib/stores/gameOfDay';
	import type { SkinId } from '$lib/games/types';

	const daily = getGameOfDay();

	const SKIN_ACCENT: Record<SkinId, string> = {
		excel: '#1f7145',
		figma: '#f24e1e',
		notion: '#191919'
	};

	const accent = SKIN_ACCENT[daily.skinId];
</script>

<a href="/{daily.skinId}/{daily.gameId}" class="day-badge" style:--accent={accent}>
	<div class="badge-left">
		<span class="badge-label">{$t('home.featured')}</span>
		<span class="badge-combo">
			{$t(`skins.${daily.skinId}.name`)} · {$t(`games.${daily.gameId}.name`)}
		</span>
	</div>
	<div class="badge-action">
		<span class="badge-dot" style:background={accent}></span>
		Open →
	</div>
</a>

<style>
	.day-badge {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: white;
		border: 1px solid #e0e0e0;
		border-left: 4px solid var(--accent);
		text-decoration: none;
		color: inherit;
		transition: box-shadow 0.15s;
		max-width: 520px;
	}

	.day-badge:hover {
		box-shadow: 0 2px 12px rgba(0,0,0,0.08);
	}

	.badge-left {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.badge-label {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #999;
		font-weight: 600;
	}

	.badge-combo {
		font-size: 13px;
		font-weight: 600;
		color: #111;
	}

	.badge-action {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: #888;
		white-space: nowrap;
	}

	.badge-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}
</style>
