<script lang="ts">
	import { t } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { getGameOfDay } from '$lib/stores/gameOfDay';
	import { getSkin } from '$lib/skins/registry';

	const daily = getGameOfDay();
	const accent = getSkin(daily.skinId).accentColor;
</script>

<a href="{base}/{daily.skinId}/{daily.gameId}" class="day-badge" style:--accent={accent}>
	<div class="badge-left">
		<span class="badge-label">{$t('home.featured')}</span>
		<span class="badge-combo">
			{$t(`skins.${daily.skinId}.name`)} · {$t(`games.${daily.gameId}.name`)}
		</span>
	</div>
	<div class="badge-action">
		<span class="badge-dot" style:background={accent}></span>
		{$t('home.open')}
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
