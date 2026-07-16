<script lang="ts">
	// Plausible record detail content shown while panic mode is active.
	import { t } from 'svelte-i18n';

	const FIELD_IDS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'];
</script>

<div class="panic-details">
	<div class="pd-title">{$t('salesforceContent.panic.detailsTitle')}</div>
	<div class="pd-grid">
		{#each FIELD_IDS as id (id)}
			<div class="pd-field">
				<span class="pd-label">{$t(`salesforceContent.panic.${id}.label`)}</span>
				<span class="pd-value">{$t(`salesforceContent.panic.${id}.value`)}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.panic-details {
		font-family: 'Salesforce Sans', 'Segoe UI', system-ui, sans-serif;
		padding: 16px;
	}
	.pd-title {
		font-size: 14px; font-weight: 700; color: #080707;
		margin-bottom: 14px;
	}
	.pd-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px 32px;
	}
	.pd-field {
		display: flex; flex-direction: column; gap: 2px;
		border-bottom: 1px solid #f3f2f2;
		padding-bottom: 8px;
	}
	.pd-label { font-size: 11px; color: #706e6b; }
	.pd-value { font-size: 13px; color: #080707; font-weight: 600; }

	@media (max-width: 640px) {
		.pd-grid { grid-template-columns: 1fr; }
	}
</style>
