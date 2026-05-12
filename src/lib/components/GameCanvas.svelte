<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		paused: boolean;
		children: Snippet<[number, number]>;
	}

	let { paused, children }: Props = $props();

	let container: HTMLDivElement;
	let width = $state(0);
	let height = $state(0);
	let observer: ResizeObserver;

	onMount(() => {
		width = Math.floor(container.clientWidth);
		height = Math.floor(container.clientHeight);

		observer = new ResizeObserver((entries) => {
			const r = entries[0]?.contentRect;
			if (!r) return;
			width = Math.floor(r.width);
			height = Math.floor(r.height);
		});
		observer.observe(container);
	});

	onDestroy(() => observer?.disconnect());
</script>

<div bind:this={container} class="game-canvas-host">
	{#if width > 0 && height > 0}
		{@render children(width, height)}
	{/if}
</div>

<style>
	.game-canvas-host {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
</style>
