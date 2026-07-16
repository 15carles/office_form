<script lang="ts">
	// Plausible chat conversation shown while panic mode is active.
	import { t } from 'svelte-i18n';

	interface Props {
		name?: string;
		avatarColor?: string;
	}

	let { name = 'Elena Vidal', avatarColor = '#c239b3' }: Props = $props();

	function initials(n: string): string {
		return n.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
	}
</script>

<div class="panic-chat">
	<div class="day-sep"><span>{$t('teamsContent.panic.meetingTime')}</span></div>

	<div class="msg-row">
		<div class="msg-avatar" style:background={avatarColor}>{initials(name)}</div>
		<div class="msg-block">
			<div class="msg-meta"><span class="msg-name">{name}</span></div>
			<div class="bubble">{$t('teamsContent.panic.msg1')}</div>
		</div>
	</div>

	<div class="msg-row mine">
		<div class="msg-block">
			<div class="bubble mine">{$t('teamsContent.panic.msg2')}</div>
		</div>
	</div>

	<div class="msg-row">
		<div class="msg-avatar" style:background={avatarColor}>{initials(name)}</div>
		<div class="msg-block">
			<div class="bubble">{$t('teamsContent.panic.msg3')}</div>
		</div>
	</div>

	<div class="msg-row mine">
		<div class="msg-block">
			<div class="bubble mine">{$t('teamsContent.panic.msgMine')}</div>
		</div>
	</div>

	<div class="msg-row">
		<div class="msg-avatar" style:background={avatarColor}>{initials(name)}</div>
		<div class="msg-block">
			<div class="bubble">{$t('teamsContent.panic.msg4')}</div>

			<!-- Scheduled meeting card -->
			<div class="meeting-card">
				<div class="meeting-icon">
					<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="#5b5fc7" stroke-width="1.4"><rect x="3" y="4" width="14" height="13" rx="1.5"/><path d="M3 8h14M7 2.5V5M13 2.5V5"/></svg>
				</div>
				<div class="meeting-info">
					<span class="meeting-title">{$t('teamsContent.panic.meetingTitle')}</span>
					<span class="meeting-time">{$t('teamsContent.panic.meetingTime')}</span>
				</div>
				<button class="meeting-join" tabindex="-1">{$t('teamsContent.panic.meetingJoin')}</button>
			</div>
		</div>
	</div>
</div>

<style>
	.panic-chat {
		font-family: 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif;
		font-size: 14px;
		color: #242424;
		padding: 8px 4px 24px;
		display: flex; flex-direction: column; gap: 12px;
		max-width: 720px;
	}

	.day-sep {
		display: flex; align-items: center; justify-content: center;
		margin: 4px 0 8px;
	}
	.day-sep span {
		font-size: 11px; color: #616161;
		background: #f0f0f0; border-radius: 10px;
		padding: 2px 12px;
	}

	.msg-row { display: flex; gap: 10px; align-items: flex-start; }
	.msg-row.mine { justify-content: flex-end; }

	.msg-avatar {
		width: 30px; height: 30px; min-width: 30px; border-radius: 50%;
		color: white; display: flex; align-items: center; justify-content: center;
		font-size: 11px; font-weight: 600;
		margin-top: 16px;
	}
	.msg-block { display: flex; flex-direction: column; gap: 3px; max-width: 70%; }
	.msg-meta { padding-left: 2px; }
	.msg-name { font-size: 12px; font-weight: 600; color: #424242; }

	.bubble {
		background: #f5f5f5;
		border-radius: 8px;
		padding: 8px 12px;
		line-height: 1.45;
		width: fit-content;
	}
	.bubble.mine { background: #e8ebfa; }

	.meeting-card {
		display: flex; align-items: center; gap: 11px;
		background: white;
		border: 1px solid #e0e0e0;
		border-left: 3px solid #5b5fc7;
		border-radius: 8px;
		padding: 10px 12px;
		margin-top: 4px;
	}
	.meeting-info { display: flex; flex-direction: column; flex: 1; }
	.meeting-title { font-size: 13px; font-weight: 600; }
	.meeting-time { font-size: 12px; color: #616161; }
	.meeting-join {
		background: #5b5fc7; color: white;
		border: none; border-radius: 4px;
		padding: 6px 16px;
		font-size: 13px; font-weight: 600;
		font-family: inherit; cursor: pointer;
	}
	.meeting-join:hover { background: #4b4fb0; }
</style>
