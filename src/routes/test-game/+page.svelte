<script lang="ts">
	import { panicMode } from '$lib/stores/panic';
	import GameCanvas from '$lib/components/GameCanvas.svelte';
	import Snake from '$lib/games/snake/Snake.svelte';

	let score = $state(0);
	let lastGameOver = $state<number | null>(null);
</script>

<svelte:head>
	<title>Processing Report — Q4 Analytics</title>
</svelte:head>

<div class="test-page">
	<div class="info">
		<code>Score: {score}</code>
		{#if lastGameOver !== null}<code>Last game over: {lastGameOver}</code>{/if}
		<code>Panic: {$panicMode}</code>
		<small>Press Escape to toggle panic</small>
	</div>

	<div class="play-area">
		<GameCanvas paused={$panicMode}>
			{#snippet children(w, h)}
				<Snake
					width={w}
					height={h}
					paused={$panicMode}
					onScore={(s) => (score = s)}
					onGameOver={(s) => (lastGameOver = s)}
				/>
			{/snippet}
		</GameCanvas>
	</div>
</div>

<style>
	.test-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: #f3f3f3;
		font-family: Calibri, sans-serif;
	}

	.info {
		padding: 8px 12px;
		background: #1f7145;
		color: white;
		display: flex;
		gap: 16px;
		align-items: center;
		font-size: 12px;
	}

	code {
		background: rgba(0,0,0,0.2);
		padding: 2px 6px;
		font-family: monospace;
	}

	.play-area {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
</style>
