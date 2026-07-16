<script lang="ts">
	interface Props {
		/** Icon size in px. */
		size?: number;
		/** Render the "OfficeForms" wordmark next to the icon. */
		wordmark?: boolean;
	}

	let { size = 26, wordmark = true }: Props = $props();
</script>

<!--
	OfficeForms mark: a form document whose checked boxes quietly
	draw a T-tetromino. Same artwork as static/favicon.svg.
-->
<span class="logo">
	<svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<rect width="32" height="32" rx="7" fill="var(--of-brand, #2456d6)" />
		<!-- Form field lines -->
		<rect x="7" y="7" width="18" height="2.6" rx="1.3" fill="white" opacity="0.95" />
		<rect x="7" y="11.6" width="12" height="2.6" rx="1.3" fill="white" opacity="0.55" />
		<!-- Checkbox grid — the checked ones form a T piece -->
		<rect x="7" y="17.5" width="5" height="5" rx="1.2" fill="white" />
		<rect x="13.5" y="17.5" width="5" height="5" rx="1.2" fill="white" />
		<rect x="20" y="17.5" width="5" height="5" rx="1.2" fill="white" />
		<rect x="7" y="24" width="5" height="5" rx="1.2" fill="white" opacity="0.28" />
		<rect x="13.5" y="24" width="5" height="5" rx="1.2" fill="white" />
		<rect x="20" y="24" width="5" height="5" rx="1.2" fill="white" opacity="0.28" />
	</svg>
	{#if wordmark}
		<span class="wordmark">
			<span class="w-office">Office</span><span class="w-forms">Forms</span>
		</span>
	{/if}
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		user-select: none;
	}

	svg {
		display: block;
		flex-shrink: 0;
	}

	.wordmark {
		font-family: var(--of-font);
		font-size: 16px;
		letter-spacing: -0.02em;
		color: var(--of-ink, #1a1a18);
		line-height: 1;
	}

	.w-office { font-weight: 500; }
	.w-forms { font-weight: 750; }
</style>
