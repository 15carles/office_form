<script lang="ts">
	import { setupI18n } from '$lib/i18n';
	import { isLoading } from 'svelte-i18n';
	import { togglePanic } from '$lib/stores/panic';
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

<svelte:window onkeydown={handleKeydown} />

{#if !$isLoading}
	{@render children()}
{/if}
