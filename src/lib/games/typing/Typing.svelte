<script lang="ts">
	import { t, locale } from 'svelte-i18n';
	import { get } from 'svelte/store';
	import { initState, handleInput, isCurrentWordWrong, type TypingState } from './engine';

	interface Props {
		width: number;
		height: number;
		paused: boolean;
		onScore?: (score: number) => void;
		onGameOver?: (finalScore: number) => void;
		onStateChange?: (state: TypingState) => void;
	}

	let { width, height, paused, onScore, onGameOver, onStateChange }: Props = $props();

	let state = $state<TypingState>(initState(get(locale) ?? 'en'));
	let inputEl: HTMLInputElement;

	$effect(() => { onStateChange?.(state); });

	const VISIBLE_BEFORE = 1;
	const VISIBLE_AFTER = 4;

	const visibleWords = $derived(() => {
		const start = Math.max(0, state.currentIndex - VISIBLE_BEFORE);
		const end = Math.min(state.words.length, state.currentIndex + VISIBLE_AFTER + 1);
		return state.words.slice(start, end).map((w, i) => ({
			word: w,
			index: start + i,
			isCurrent: start + i === state.currentIndex,
			isDone: start + i < state.currentIndex
		}));
	});

	function startGame() {
		state = { ...initState(get(locale) ?? 'en'), status: 'running' };
		setTimeout(() => inputEl?.focus(), 50);
	}

	function onInput(e: Event) {
		if (paused || state.status !== 'running') return;
		const val = (e.target as HTMLInputElement).value;
		const prev = state;
		state = handleInput(state, val);
		if (state.wpm !== prev.wpm) onScore?.(state.wpm);
		if (state.status === 'over') onGameOver?.(state.wpm);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') return; // let parent handle
		if (paused) e.preventDefault();
	}
</script>

<div class="typing-wrap" style:width="{width}px" style:max-height="{height}px">

	{#if state.status === 'idle'}
		<div class="start-panel">
			<h3>{$t('games.typing.start')}</h3>
			<p>{$t('games.typing.description')}</p>
			<button onclick={startGame}>{$t('games.typing.startBtn')}</button>
		</div>

	{:else if state.status === 'over'}
		<div class="results-panel">
			<h3>{$t('games.typing.gameOver')}</h3>
			<div class="stats-grid">
				<div class="stat"><span class="stat-n">{state.wpm}</span><span class="stat-l">{$t('games.typing.score')}</span></div>
				<div class="stat"><span class="stat-n">{state.accuracy}%</span><span class="stat-l">{$t('games.typing.accuracy')}</span></div>
				<div class="stat"><span class="stat-n">{state.errors}</span><span class="stat-l">{$t('games.typing.errors')}</span></div>
			</div>
			<button onclick={startGame}>{$t('games.typing.retryBtn')}</button>
		</div>

	{:else}
		<div class="game-area">
			<!-- Live stats bar -->
			<div class="stats-bar">
				<span class="stat-pill">{state.wpm} <small>{$t('games.typing.scoreUnit')}</small></span>
				<span class="stat-pill">{state.accuracy}% <small>{$t('games.typing.accuracyShort')}</small></span>
				<span class="stat-pill">{state.currentIndex}/{state.words.length} <small>{$t('games.typing.wordsShort')}</small></span>
			</div>

			<!-- Words display -->
			<div class="words-display">
				{#each visibleWords() as item (item.index)}
					<span
						class="word"
						class:current={item.isCurrent}
						class:done={item.isDone}
						class:error={item.isCurrent && isCurrentWordWrong(state)}
					>
						{#if item.isCurrent}
							<span class="typed">{state.typed}</span><span class="remaining">{item.word.slice(state.typed.length)}</span>
						{:else}
							{item.word}
						{/if}
					</span>
				{/each}
			</div>

			<!-- Hidden input -->
			<input
				bind:this={inputEl}
				class="hidden-input"
				value={state.typed}
				oninput={onInput}
				onkeydown={onKeydown}
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck={false}
				disabled={paused}
			/>

			<div class="input-hint">{$t('games.typing.hint')}</div>
		</div>
	{/if}
</div>

<style>
	.typing-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		box-sizing: border-box;
		font-family: 'Inter', 'Segoe UI', sans-serif;
		background: var(--game-bg, transparent);
	}

	.start-panel, .results-panel {
		background: var(--game-panel-bg, white);
		border: 1px solid var(--game-panel-border, #e0e0e0);
		padding: 24px 28px;
		text-align: center;
		max-width: 360px;
		width: 100%;
	}

	.start-panel h3, .results-panel h3 {
		font-size: 14px;
		font-weight: 600;
		color: var(--game-text, #333);
		margin-bottom: 8px;
	}

	.start-panel p {
		font-size: 12px;
		color: var(--game-text-muted, #888);
		margin-bottom: 16px;
		line-height: 1.5;
	}

	button {
		background: var(--game-btn-bg, #191919);
		color: white;
		border: none;
		padding: 7px 20px;
		font-size: 12px;
		cursor: pointer;
		font-family: inherit;
		margin-top: 12px;
	}
	button:hover { background: var(--game-btn-hover, #333); }

	.stats-grid {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin: 16px 0;
	}

	.stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
	.stat-n { font-size: 22px; font-weight: 700; color: var(--game-text, #191919); }
	.stat-l { font-size: 10px; color: var(--game-text-muted, #888); text-transform: uppercase; letter-spacing: 0.05em; }

	.game-area {
		width: 100%;
		max-width: 480px;
	}

	.stats-bar {
		display: flex;
		gap: 10px;
		margin-bottom: 16px;
		justify-content: center;
	}

	.stat-pill {
		background: var(--game-panel-bg, #f0f0f0);
		border: 1px solid var(--game-panel-border, #e0e0e0);
		padding: 3px 10px;
		font-size: 13px;
		font-weight: 600;
		color: var(--game-text, #333);
		border-radius: 2px;
	}

	.stat-pill small { font-weight: 400; font-size: 10px; color: var(--game-text-muted, #888); margin-left: 3px; }

	.words-display {
		background: var(--game-panel-bg, white);
		border: 1px solid var(--game-panel-border, #e0e0e0);
		padding: 16px;
		margin-bottom: 10px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		min-height: 80px;
		align-content: flex-start;
	}

	.word {
		font-size: 15px;
		color: var(--game-text-muted, #aaa);
		line-height: 1.4;
		font-family: 'Courier New', monospace;
	}

	.word.done { color: #ccc; text-decoration: line-through; }
	.word.current { color: var(--game-text, #191919); font-weight: 600; }
	.word.error .typed { color: #c0392b; }
	.typed { color: var(--game-text, #191919); }
	.remaining { color: var(--game-text-muted, #555); }

	.hidden-input {
		width: 100%;
		padding: 8px 12px;
		font-size: 15px;
		font-family: 'Courier New', monospace;
		border: 2px solid var(--game-overlay-border, #191919);
		outline: none;
		color: var(--game-text, #191919);
		background: var(--game-panel-bg, white);
	}

	.hidden-input:focus { border-color: var(--game-accent, #555); }

	.input-hint {
		margin-top: 6px;
		font-size: 10px;
		color: var(--game-text-muted, #aaa);
		text-align: center;
	}

	kbd {
		background: var(--game-panel-bg, #f0f0f0);
		border: 1px solid var(--game-panel-border, #ccc);
		padding: 1px 4px;
		font-size: 9px;
		font-family: inherit;
	}
</style>
