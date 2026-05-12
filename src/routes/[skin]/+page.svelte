<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { t } from 'svelte-i18n';
	import { isValidSkin, COMPATIBILITY, RECOMMENDED, pageTitle } from '$lib/skins/registry';
	import ExcelSkin from '$lib/skins/excel/ExcelSkin.svelte';
	import FigmaSkin from '$lib/skins/figma/FigmaSkin.svelte';
	import NotionSkin from '$lib/skins/notion/NotionSkin.svelte';
	import { setDefaultSkin } from '$lib/stores/progress';

	const skinId = $derived($page.params.skin);

	$effect(() => {
		if (!isValidSkin(skinId)) goto('/');
		else setDefaultSkin(skinId);
	});

	const GAME_META: Record<string, { icon: string }> = {
		snake:  { icon: '⊞' },
		tetris: { icon: '◱' },
		typing: { icon: 'T' }
	};
</script>

<svelte:head>
	<title>{isValidSkin(skinId) ? pageTitle(skinId) : 'Dashboard'}</title>
</svelte:head>

{#snippet gameSelector(accent: string)}
	<div class="selector-overlay">
		<div class="selector-panel" style:--accent={accent}>
			<div class="selector-header">{$t('ui.openTemplate')}</div>
			<div class="selector-list">
				{#each COMPATIBILITY[skinId] ?? [] as gameId}
					<a href="/{skinId}/{gameId}" class="selector-item"
						class:recommended={RECOMMENDED[skinId] === gameId}>
						<span class="item-icon">{GAME_META[gameId]?.icon}</span>
						<span class="item-label">{$t(`games.${gameId}.name`)}</span>
						{#if RECOMMENDED[skinId] === gameId}
							<span class="rec-badge">{$t('ui.recommended')}</span>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>
{/snippet}

{#if skinId === 'excel'}
	<ExcelSkin>
		{#snippet children()}
			{@render gameSelector('#1f7145')}
		{/snippet}
	</ExcelSkin>
{:else if skinId === 'figma'}
	<FigmaSkin>
		{#snippet children()}
			{@render gameSelector('#18a0fb')}
		{/snippet}
	</FigmaSkin>
{:else if skinId === 'notion'}
	<NotionSkin>
		{#snippet children()}
			{@render gameSelector('#191919')}
		{/snippet}
	</NotionSkin>
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
