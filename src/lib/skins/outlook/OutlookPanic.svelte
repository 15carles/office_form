<script lang="ts">
	// Plausible corporate email thread shown while panic mode is active.
	import { t } from 'svelte-i18n';

	interface Props {
		sender?: string;
	}

	let { sender = 'Elena Vidal' }: Props = $props();
</script>

<div class="panic-mail">
	<p class="line">{$t('outlookContent.panic.greeting')}</p>
	<p class="line">{$t('outlookContent.panic.body1')}</p>
	<p class="line">{$t('outlookContent.panic.body2')}</p>
	<p class="line">{$t('outlookContent.panic.closing')}</p>

	<div class="signature">
		<span class="sig-name">{sender}</span>
		<span class="sig-role">{$t('outlookContent.panic.signerRole')}</span>
	</div>

	<div class="attachment">
		<div class="att-icon">
			<svg viewBox="0 0 16 16" width="16" height="16" fill="none"><rect x="2.5" y="1.5" width="11" height="13" rx="1" stroke="#1f7145" stroke-width="1.2"/><path d="M5 6.5h6M5 9h6M5 11.5h3.5" stroke="#1f7145" stroke-width="1.1" stroke-linecap="round"/></svg>
		</div>
		<div class="att-meta">
			<span class="att-name">{$t('outlookContent.panic.attachment')}</span>
			<span class="att-size">{$t('outlookContent.panic.attachmentSize')}</span>
		</div>
	</div>

	<div class="quoted">
		<div class="quoted-header">{$t('outlookContent.panic.quotedHeader')}</div>
		<p class="quoted-body">{$t('outlookContent.panic.quotedBody')}</p>
	</div>
</div>

<style>
	.panic-mail {
		font-family: 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif;
		font-size: 13.5px;
		color: #242424;
		line-height: 1.6;
		max-width: 640px;
		padding-bottom: 24px;
	}

	.line { margin: 0 0 14px; }

	.signature {
		display: flex; flex-direction: column;
		margin-bottom: 20px;
	}
	.sig-name { font-weight: 600; }
	.sig-role { font-size: 12px; color: #616161; }

	.attachment {
		display: inline-flex; align-items: center; gap: 9px;
		border: 1px solid #e1dfdd;
		border-radius: 6px;
		padding: 8px 14px 8px 10px;
		margin-bottom: 24px;
		background: #faf9f8;
		cursor: default;
	}
	.attachment:hover { background: #f3f2f1; }
	.att-meta { display: flex; flex-direction: column; }
	.att-name { font-size: 12.5px; font-weight: 600; color: #242424; }
	.att-size { font-size: 11px; color: #616161; }

	.quoted {
		border-top: 1px solid #e1dfdd;
		padding-top: 14px;
		color: #616161;
	}
	.quoted-header { font-size: 12px; margin-bottom: 8px; }
	.quoted-body { margin: 0; font-size: 13px; }
</style>
