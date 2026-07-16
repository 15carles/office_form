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
		padding: 14px 18px;
		background: var(--of-surface, white);
		border: 1px solid var(--of-line, #e0e0e0);
		border-left: 4px solid var(--accent);
		border-radius: var(--of-radius, 6px);
		text-decoration: none;
		color: inherit;
		font-family: var(--of-font, inherit);
		transition: box-shadow 0.15s, transform 0.15s;
		max-width: 520px;
	}

	.day-badge:hover {
		box-shadow: 0 4px 16px rgba(26, 26, 24, 0.07);
		transform: translateY(-1px);
	}

	.badge-left {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.badge-label {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--of-ink-faint, #999);
		font-weight: 600;
	}

	.badge-combo {
		font-size: 13.5px;
		font-weight: 620;
		letter-spacing: -0.01em;
		color: var(--of-ink, #111);
	}

	.badge-action {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: var(--of-ink-muted, #888);
		white-space: nowrap;
	}

	.badge-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}
</style>
