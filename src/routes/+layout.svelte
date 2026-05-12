<script lang="ts">
	import { onMount } from 'svelte';
	import { setupI18n } from '$lib/i18n';
	import { togglePanic, panicMode } from '$lib/stores/panic';
	import '../app.css';

	let { children } = $props();

	setupI18n();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && !document.fullscreenElement) {
			e.preventDefault();
			togglePanic();
		}
	}
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

{@render children()}
