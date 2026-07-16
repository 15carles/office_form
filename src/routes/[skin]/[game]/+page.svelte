<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { recordScore } from '$lib/stores/progress';
	import { isValidSkin, isValidGame, getSkin } from '$lib/skins/registry';
	import { SKIN_COMPONENTS } from '$lib/skins/components';

	import GameCanvas from '$lib/components/GameCanvas.svelte';
	import Snake from '$lib/games/snake/Snake.svelte';
	import Tetris from '$lib/games/tetris/Tetris.svelte';
	import Typing from '$lib/games/typing/Typing.svelte';

	import { formulaText, cellRef, type SnakeState } from '$lib/games/snake/engine';
	import type { TetrisState } from '$lib/games/tetris/engine';
	import type { TypingState } from '$lib/games/typing/engine';
	import type { GameId } from '$lib/games/types';

	const GAME_COMPONENTS = { snake: Snake, tetris: Tetris, typing: Typing };

	const skin = $derived(isValidSkin($page.params.skin) ? getSkin($page.params.skin) : null);
	const gameId = $derived<GameId | null>(isValidGame($page.params.game) ? $page.params.game : null);

	$effect(() => {
		if (!skin || !gameId) goto(base || '/');
	});

	type LiveState = SnakeState | TetrisState | TypingState;

	let score = $state(0);
	let live = $state<LiveState | null>(null);

	// Reset per-game UI state when navigating between skin/game combos
	// (the page component is reused, not remounted).
	$effect(() => {
		skin;
		gameId;
		score = 0;
		live = null;
	});

	const snakeState = $derived(gameId === 'snake' ? (live as SnakeState | null) : null);
	const typingState = $derived(gameId === 'typing' ? (live as TypingState | null) : null);

	// Excel formula bar — driven by snake state while snake is the active game
	const excelCellRef = $derived(snakeState ? cellRef(snakeState.snake[0]) : 'C5');
	const excelFormula = $derived(snakeState ? formulaText(snakeState) : '=SUMA(C5:C12)');

	// Skin status bar text, localized
	const statusText = $derived.by(() => {
		if (!skin) return '';
		if (skin.id === 'excel') {
			if (snakeState?.status === 'running') return $t('ui.status.calculating');
			if (snakeState?.status === 'over') return $t('ui.status.error');
			return $t('ui.status.ready');
		}
		if (skin.id === 'notion' || skin.id === 'outlook' || skin.id === 'teams' || skin.id === 'slack' || skin.id === 'salesforce') {
			if (typingState?.status === 'running')
				return $t('games.typing.liveStatus', {
					values: { wpm: typingState.wpm, accuracy: typingState.accuracy }
				});
			if (typingState?.status === 'over')
				return $t('games.typing.doneStatus', { values: { wpm: typingState.wpm } });
			return $t('ui.status.waiting');
		}
		return '';
	});

	function handleGameOver(finalScore: number) {
		if (skin && gameId) recordScore(skin.id, gameId, finalScore);
	}
</script>

<svelte:head>
	<title>{skin ? $t(`skins.${skin.id}.pageTitle`) : 'Dashboard'}</title>
</svelte:head>

{#if skin && gameId}
	{@const Skin = SKIN_COMPONENTS[skin.id]}
	{@const Game = GAME_COMPONENTS[gameId]}
	<Skin {gameId} {score} {statusText} formulaText={excelFormula} cellRef={excelCellRef}>
		{#snippet children()}
			<GameCanvas paused={$panicMode}>
				{#snippet children(w, h)}
					<Game
						width={w}
						height={h}
						paused={$panicMode}
						onScore={(s: number) => (score = s)}
						onGameOver={handleGameOver}
						onStateChange={(s: LiveState) => (live = s)}
					/>
				{/snippet}
			</GameCanvas>
		{/snippet}
	</Skin>
{/if}
