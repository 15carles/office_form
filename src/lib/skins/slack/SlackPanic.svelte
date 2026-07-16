<script lang="ts">
	// Plausible Slack channel thread shown while panic mode is active.
	import { t } from 'svelte-i18n';

	interface Props {
		channelName?: string;
	}

	let { channelName = 'proyecto-q3' }: Props = $props();

	const MESSAGES: { id: string; sender: string; initials: string; color: string; time: string; mine?: boolean; reactions?: boolean; thread?: boolean }[] = [
		{ id: 'msg1', sender: 'A. Fernández', initials: 'AF', color: '#4a154b', time: '9:02', reactions: true },
		{ id: 'msg2', sender: 'Elena Vidal', initials: 'EV', color: '#e8912d', time: '9:08' },
		{ id: 'msg3', sender: 'M. López', initials: 'ML', color: '#2eb67d', time: '9:15', thread: true },
		{ id: 'msgMine', sender: 'Tú', initials: 'JG', color: '#e01e5a', time: '9:21', mine: true },
		{ id: 'msg4', sender: 'A. Fernández', initials: 'AF', color: '#4a154b', time: '9:24' }
	];
</script>

<div class="panic-channel">
	<div class="ch-intro">
		<div class="intro-hash">#</div>
		<div class="intro-text">
			<strong>#{channelName}</strong>
			<span>{$t('slackContent.channelTopic')}</span>
		</div>
	</div>

	{#each MESSAGES as m (m.id)}
		<div class="msg">
			<div class="msg-avatar" style:background={m.color}>{m.initials}</div>
			<div class="msg-main">
				<div class="msg-head">
					<span class="msg-sender">{m.mine ? $t('slackContent.you') : m.sender}</span>
					<span class="msg-time">{m.time}</span>
				</div>
				<div class="msg-text">{$t(`slackContent.panic.${m.id}`)}</div>

				{#if m.reactions}
					<div class="reactions">
						<span class="reaction">{$t('slackContent.panic.reactions')}</span>
					</div>
				{/if}
				{#if m.thread}
					<div class="thread">
						<span class="thread-avs">
							<span class="thread-av" style:background="#4a154b"></span>
							<span class="thread-av" style:background="#e8912d"></span>
						</span>
						<span class="thread-count">{$t('slackContent.panic.threadReplies')}</span>
						<span class="thread-last">{$t('slackContent.panic.threadLast')}</span>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.panic-channel {
		font-family: 'Lato', 'Segoe UI', system-ui, sans-serif;
		font-size: 15px;
		color: #1d1c1d;
		padding: 16px 0 24px;
		display: flex; flex-direction: column; gap: 16px;
		max-width: 760px;
	}

	.ch-intro { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 8px; }
	.intro-hash {
		width: 42px; height: 42px; border-radius: 10px;
		background: #f0f0f0; color: #616061;
		display: flex; align-items: center; justify-content: center;
		font-size: 22px; font-weight: 700; flex-shrink: 0;
	}
	.intro-text { display: flex; flex-direction: column; gap: 2px; }
	.intro-text strong { font-size: 20px; font-weight: 800; }
	.intro-text span { font-size: 13px; color: #616061; }

	.msg { display: flex; gap: 10px; align-items: flex-start; }
	.msg-avatar {
		width: 36px; height: 36px; min-width: 36px; border-radius: 8px;
		color: white; display: flex; align-items: center; justify-content: center;
		font-size: 12px; font-weight: 700;
	}
	.msg-main { flex: 1; min-width: 0; }
	.msg-head { display: flex; align-items: baseline; gap: 8px; }
	.msg-sender { font-size: 15px; font-weight: 800; }
	.msg-time { font-size: 12px; color: #616061; }
	.msg-text { font-size: 15px; line-height: 1.46; margin-top: 1px; }

	.reactions { display: flex; gap: 6px; margin-top: 5px; }
	.reaction {
		font-size: 12px;
		background: #e8f5f0; border: 1px solid #007a5a44;
		color: #1d1c1d; border-radius: 12px;
		padding: 1px 9px;
	}

	.thread {
		display: flex; align-items: center; gap: 8px;
		margin-top: 6px;
		border: 1px solid transparent; border-radius: 8px;
		padding: 3px 8px 3px 4px;
		width: fit-content;
		cursor: default;
	}
	.thread:hover { border-color: #ddd; background: white; }
	.thread-avs { display: flex; gap: 2px; }
	.thread-av { width: 20px; height: 20px; border-radius: 5px; }
	.thread-count { font-size: 13px; font-weight: 700; color: #1264a3; }
	.thread-last { font-size: 12px; color: #616061; }
</style>
