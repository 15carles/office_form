<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { recordScore } from '$lib/stores/progress';
	import { isValidSkin, isValidGame, pageTitle } from '$lib/skins/registry';

	// Skins
	import ExcelSkin from '$lib/skins/excel/ExcelSkin.svelte';
	import FigmaSkin from '$lib/skins/figma/FigmaSkin.svelte';
	import NotionSkin from '$lib/skins/notion/NotionSkin.svelte';

	// Games
	import GameCanvas from '$lib/components/GameCanvas.svelte';
	import Snake from '$lib/games/snake/Snake.svelte';
	import Tetris from '$lib/games/tetris/Tetris.svelte';
	import Typing from '$lib/games/typing/Typing.svelte';

	// Snake-specific state for formula bar
	import { formulaText, cellRef, type SnakeState } from '$lib/games/snake/engine';
	import type { TetrisState } from '$lib/games/tetris/engine';
	import type { TypingState } from '$lib/games/typing/engine';

	const skinId = $derived($page.params.skin);
	const gameId = $derived($page.params.game);

	$effect(() => {
		if (!isValidSkin(skinId) || !isValidGame(gameId)) goto(base || '/');
	});

	let score = $state(0);
	let snakeState = $state<SnakeState | null>(null);
	let tetrisState = $state<TetrisState | null>(null);
	let typingState = $state<TypingState | null>(null);

	// Excel formula bar — driven by snake state
	const excelCellRef = $derived(snakeState ? cellRef(snakeState.snake[0]) : 'C5');
	const excelFormula = $derived(snakeState ? formulaText(snakeState) : '=SUMA(C5:C12)');
	const excelStatus = $derived(
		snakeState?.status === 'running' ? $t('ui.status.calculating') :
		snakeState?.status === 'over'    ? $t('ui.status.error') : $t('ui.status.ready')
	);

	// Figma right panel — driven by tetris or snake score
	const figmaScore = $derived(score);

	// Notion properties — driven by typing state
	const notionStatus = $derived(
		typingState?.status === 'running'
			? `${typingState.wpm} ${$t('games.typing.scoreUnit')} · ${typingState.accuracy}% ${$t('games.typing.accuracyShort')}`
			: typingState?.status === 'over'
				? `${$t('ui.status.typingDone')}: ${typingState.wpm} ${$t('games.typing.scoreUnit')}`
				: $t('ui.status.waiting')
	);

	function handleScore(s: number) { score = s; }
	function handleGameOver(s: number) { recordScore(skinId, gameId, s); }
</script>

<svelte:head>
	<title>{isValidSkin(skinId) ? pageTitle(skinId) : 'Dashboard'}</title>
</svelte:head>

{#snippet gameContent()}
	<GameCanvas paused={$panicMode}>
		{#snippet children(w, h)}
			{#if gameId === 'snake'}
				<Snake
					width={w} height={h} paused={$panicMode}
					onScore={handleScore}
					onGameOver={handleGameOver}
					onStateChange={(s) => (snakeState = s)}
				/>
			{:else if gameId === 'tetris'}
				<Tetris
					width={w} height={h} paused={$panicMode}
					onScore={handleScore}
					onGameOver={handleGameOver}
					onStateChange={(s) => (tetrisState = s)}
				/>
			{:else if gameId === 'typing'}
				<Typing
					width={w} height={h} paused={$panicMode}
					onScore={handleScore}
					onGameOver={handleGameOver}
					onStateChange={(s) => (typingState = s)}
				/>
			{/if}
		{/snippet}
	</GameCanvas>
{/snippet}

{#if skinId === 'excel'}
	<ExcelSkin
		{gameId} {score}
		statusText={excelStatus}
		formulaText={excelFormula}
		cellRef={excelCellRef}
	>
		{#snippet children()}
			{@render gameContent()}
		{/snippet}
	</ExcelSkin>

{:else if skinId === 'figma'}
	<FigmaSkin {gameId} score={figmaScore}>
		{#snippet children()}
			{@render gameContent()}
		{/snippet}
	</FigmaSkin>

{:else if skinId === 'notion'}
	<NotionSkin {gameId} {score} statusText={notionStatus}>
		{#snippet children()}
			{@render gameContent()}
		{/snippet}
	</NotionSkin>
{/if}
