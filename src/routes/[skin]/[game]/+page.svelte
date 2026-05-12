<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { recordScore } from '$lib/stores/progress';
	import { formulaText, cellRef, type SnakeState } from '$lib/games/snake/engine';
	import ExcelSkin from '$lib/skins/excel/ExcelSkin.svelte';
	import GameCanvas from '$lib/components/GameCanvas.svelte';
	import Snake from '$lib/games/snake/Snake.svelte';

	const skinId = $derived($page.params.skin);
	const gameId = $derived($page.params.game);

	const VALID = {
		excel: ['snake', 'tetris', 'typing'],
		figma: ['snake', 'tetris', 'typing'],
		notion: ['snake', 'tetris', 'typing']
	} as Record<string, string[]>;

	$effect(() => {
		const valid = VALID[skinId];
		if (!valid || !valid.includes(gameId)) goto('/');
	});

	let score = $state(0);
	let snakeState = $state<SnakeState | null>(null);

	const currentCellRef = $derived(
		snakeState ? cellRef(snakeState.snake[0]) : 'C5'
	);
	const currentFormula = $derived(
		snakeState ? formulaText(snakeState) : '=SUMA(C5:C12)'
	);
	const statusText = $derived(
		snakeState?.status === 'running'
			? $t('ui.status.calculating')
			: snakeState?.status === 'over'
				? $t('ui.status.error')
				: $t('ui.status.ready')
	);

	function handleScore(s: number) {
		score = s;
	}

	function handleGameOver(finalScore: number) {
		recordScore(skinId, gameId, finalScore);
	}

	const pageTitle = $derived(
		skinId === 'excel'
			? 'Q3 Revenue Analysis.xlsx — Excel'
			: skinId === 'figma'
				? 'Design System v2 — Figma'
				: 'Meeting Notes — Notion'
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

{#if skinId === 'excel'}
	<ExcelSkin
		{gameId}
		{score}
		{statusText}
		formulaText={currentFormula}
		cellRef={currentCellRef}
	>
		{#snippet children()}
			<GameCanvas paused={$panicMode}>
				{#snippet children(w, h)}
					<Snake
						width={w}
						height={h}
						paused={$panicMode}
						onScore={handleScore}
						onGameOver={handleGameOver}
						onStateChange={(s) => (snakeState = s)}
					/>
				{/snippet}
			</GameCanvas>
		{/snippet}
	</ExcelSkin>
{/if}
