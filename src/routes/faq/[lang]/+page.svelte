<script lang="ts">
	import FaqPage from '$lib/components/FaqPage.svelte';

	let { data } = $props();
</script>

<FaqPage lang={data.lang} />
