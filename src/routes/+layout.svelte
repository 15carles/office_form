<script lang="ts">
	import { setupI18n, locale } from '$lib/i18n';
	import { isLoading } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { togglePanic } from '$lib/stores/panic';
	import '../app.css';

	let { children } = $props();

	setupI18n();

	// Keep <html lang> in sync with the active locale (client-side; the
	// prerendered default in app.html is corrected after hydration).
	$effect(() => {
		const lang = $locale;
		if (browser && lang) document.documentElement.lang = lang;
	});

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
