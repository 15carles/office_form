<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { t } from 'svelte-i18n';
	import { excelConfig } from '$lib/skins/config';
	import ExcelSkin from '$lib/skins/excel/ExcelSkin.svelte';
	import { panicMode } from '$lib/stores/panic';

	const skinId = $derived($page.params.skin);

	// Redirect unknown skins to home
	$effect(() => {
		if (!['excel', 'figma', 'notion'].includes(skinId)) {
			goto('/');
		}
	});

	const GAMES = [
		{ id: 'snake', label: 'Visualizador de flujo de datos', recommended: skinId === 'excel' },
		{ id: 'tetris', label: 'Optimizador de diseño', recommended: skinId === 'figma' },
		{ id: 'typing', label: 'Benchmark de entrada', recommended: skinId === 'notion' }
	];
</script>

<svelte:head>
	<title>{skinId === 'excel' ? 'Q3 Revenue Analysis.xlsx — Excel' : skinId === 'figma' ? 'Design System v2 — Figma' : 'Meeting Notes — Notion'}</title>
</svelte:head>

{#if skinId === 'excel'}
	<ExcelSkin>
		{#snippet children()}
			<!-- Game selector overlay — looks like "open recent template" -->
			<div class="selector-overlay">
				<div class="selector-panel">
					<div class="selector-header">{$t('ui.openTemplate')}</div>
					<div class="selector-list">
						{#each GAMES as game}
							<a href="/{skinId}/{game.id}" class="selector-item" class:recommended={game.recommended}>
								<span class="item-icon">⊞</span>
								<span class="item-label">{game.label}</span>
								{#if game.recommended}
									<span class="rec-badge">{$t('ui.recommended')}</span>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			</div>
		{/snippet}
	</ExcelSkin>
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
		background: #1f7145;
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
		transition: background 0.1s;
	}

	.selector-item:hover {
		background: #e8f5ee;
		border-color: #b2dfca;
	}

	.selector-item.recommended {
		background: #f2faf6;
	}

	.item-icon { font-size: 14px; color: #1f7145; }
	.item-label { flex: 1; }

	.rec-badge {
		font-size: 9px;
		background: #1f7145;
		color: white;
		padding: 1px 5px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
</style>
