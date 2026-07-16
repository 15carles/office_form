<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { t } from 'svelte-i18n';
	import { isValidSkin, getSkin } from '$lib/skins/registry';
	import { SKIN_COMPONENTS } from '$lib/skins/components';
	import { setDefaultSkin } from '$lib/stores/progress';
	import type { GameId } from '$lib/games/types';

	const skinId = $derived($page.params.skin);
	const skin = $derived(isValidSkin(skinId) ? getSkin(skinId) : null);

	$effect(() => {
		if (!skin) goto(base || '/');
		else setDefaultSkin(skin.id);
	});

	const GAME_ICONS: Record<GameId, string> = {
		snake: '⊞',
		tetris: '◱',
		typing: 'T'
	};
</script>

<svelte:head>
	<title>{skin ? $t(`skins.${skin.id}.pageTitle`) : 'Dashboard'}</title>
</svelte:head>

{#if skin}
	{@const Skin = SKIN_COMPONENTS[skin.id]}
	<Skin>
		{#snippet children()}
			<div class="selector-overlay">
				<div class="selector-panel" style:--accent={skin.uiAccent}>
					<div class="selector-header">{$t('ui.openTemplate')}</div>
					<div class="selector-list">
						{#each skin.compatibleGames as gameId (gameId)}
							<a href="{base}/{skin.id}/{gameId}" class="selector-item"
								class:recommended={skin.recommendedGame === gameId}>
								<span class="item-icon">{GAME_ICONS[gameId]}</span>
								<span class="item-label">{$t(`games.${gameId}.name`)}</span>
								{#if skin.recommendedGame === gameId}
									<span class="rec-badge">{$t('ui.recommended')}</span>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			</div>
		{/snippet}
	</Skin>
{/if}

<style>
	.selector-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(243, 243, 243, 0.85);
		z-index: 10;
	}

	.selector-panel {
		background: white;
		border: 1px solid #ccc;
		box-shadow: 0 4px 16px rgba(0,0,0,0.12);
		min-width: 280px;
	}

	.selector-header {
		background: var(--accent, #333);
		color: white;
		padding: 8px 14px;
		font-size: 12px;
		font-weight: 600;
	}

	.selector-list {
		padding: 6px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.selector-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px;
		text-decoration: none;
		color: #333;
		font-size: 12px;
		border: 1px solid transparent;
		font-family: inherit;
		transition: background 0.1s;
	}

	.selector-item:hover { background: #f5f5f5; border-color: #e0e0e0; }
	.selector-item.recommended { background: #fafafa; }

	.item-icon { font-size: 14px; color: var(--accent, #333); width: 18px; text-align: center; }
	.item-label { flex: 1; }

	.rec-badge {
		font-size: 9px;
		background: var(--accent, #333);
		color: white;
		padding: 1px 5px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
</style>
