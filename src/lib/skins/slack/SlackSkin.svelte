<script lang="ts">
	import type { Snippet } from 'svelte';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { toggleFullscreen, isFullscreen } from '$lib/stores/fullscreen';
	import { getBestScore } from '$lib/stores/progress';
	import SlackPanic from './SlackPanic.svelte';

	interface Props {
		gameId?: string;
		score?: number;
		statusText?: string;
		children?: Snippet;
	}

	let { gameId = 'typing', score = 0, statusText = '', children }: Props = $props();

	let skinRoot: HTMLElement;
	const best = $derived(getBestScore('slack', gameId));

	// #general unread badge = live score; a DM badge = best score
	const generalUnread = $derived(score > 0 ? score : 2);

	const CHANNEL_IDS = ['general', 'projectq3', 'announcements', 'random', 'itsupport'];
	const DM_IDS = ['d1', 'd2', 'd3', 'd4'];
	const DM_COLORS: Record<string, string> = {
		d1: '#e8912d', d2: '#4a154b', d3: '#2eb67d', d4: '#e01e5a'
	};

	const channelName = $derived($t('slackContent.channelName'));

	function initials(name: string): string {
		return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
	}
</script>

<div bind:this={skinRoot} class="slack-skin">

	<!-- Workspace rail -->
	<div class="ws-rail">
		<button class="ws-active" tabindex="-1">Oc</button>
		<button class="ws-add" tabindex="-1" aria-label="Add">
			<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="#e8e0e8" stroke-width="1.6" stroke-linecap="round"><path d="M8 3.5v9M3.5 8h9"/></svg>
		</button>
	</div>

	<!-- Channel sidebar -->
	<div class="sidebar">
		<div class="ws-header">
			<span class="ws-name">{$t('slackContent.workspace')}</span>
			<svg viewBox="0 0 16 16" width="11" height="11" fill="#1d1c1d"><path d="M4 6l4 4 4-4z"/></svg>
			<button class="ws-compose" tabindex="-1" aria-label="Compose">
				<svg viewBox="0 0 18 18" width="15" height="15" fill="none" stroke="#1d1c1d" stroke-width="1.3"><path d="M12 3.5 14.5 6 6 14.5l-3 .6.6-3z"/><circle cx="14" cy="4" r="3.2" fill="#007a5a" stroke="none"/><path d="M14 2.7v2.6M12.7 4h2.6" stroke="white" stroke-width="1.1" stroke-linecap="round"/></svg>
			</button>
		</div>

		<div class="side-scroll">
			<div class="side-item"><span class="side-ico">🧵</span> {$t('slackContent.threads')}</div>

			<div class="side-section">{$t('slackContent.sectionChannels')}</div>
			{#each CHANNEL_IDS as id (id)}
				{@const name = $t(`slackContent.channels.${id}.name`)}
				{@const active = id === 'projectq3'}
				{@const unread = id === 'announcements'}
				<div class="channel" class:active class:unread>
					<span class="hash">#</span>
					<span class="ch-name">{name}</span>
					{#if id === 'general' && generalUnread > 0}
						<span class="badge">{generalUnread > 99 ? '99+' : generalUnread}</span>
					{/if}
				</div>
			{/each}

			<div class="side-section">{$t('slackContent.sectionDirect')}</div>
			{#each DM_IDS as id (id)}
				{@const name = $t(`slackContent.dms.${id}.name`)}
				{@const online = id === 'd1' || id === 'd2'}
				<div class="dm" class:unread={id === 'd2'}>
					<span class="presence" class:online></span>
					<span class="dm-name">{name}</span>
					{#if id === 'd2' && best > 0}
						<span class="badge">{best}</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Main channel area -->
	<div class="channel-area">
		<div class="ch-header">
			<div class="ch-title">
				<span class="ch-hash">#</span>
				<span class="ch-title-name">{channelName}</span>
				<svg class="ch-caret" viewBox="0 0 16 16" width="10" height="10" fill="#616061"><path d="M4 6l4 4 4-4z"/></svg>
			</div>
			<div class="ch-topic">{$t('slackContent.channelTopic')}</div>
			<div class="ch-actions">
				<div class="members">
					<span class="member-av" style:background="#e8912d">EV</span>
					<span class="member-av" style:background="#4a154b">AF</span>
					<span class="member-av" style:background="#2eb67d">ML</span>
					<span class="member-count">12</span>
				</div>
				<button class="ch-icon" tabindex="-1" onclick={() => toggleFullscreen(skinRoot)} title={$isFullscreen ? $t('ui.exitFullscreen') : $t('ui.fullscreen')}>
					<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="#616061" stroke-width="1.3" stroke-linecap="round"><path d="M2 6V2h4M14 10v4h-4M10 2h4v4M6 14H2v-4"/></svg>
				</button>
			</div>
		</div>

		<div class="ch-content">
			<div class="game-zone" style:display={$panicMode ? 'none' : 'flex'}>
				{#if gameId === 'typing'}
					<div class="compose-wrap">
						<div class="game-slot">
							{#if children}{@render children()}{/if}
						</div>
						<div class="composer">
							<div class="composer-toolbar">
								<span class="fmt"><b>B</b></span>
								<span class="fmt"><i>I</i></span>
								<span class="fmt"><s>S</s></span>
								<span class="fmt-sep"></span>
								<span class="fmt">🔗</span>
								<span class="fmt">≔</span>
								<span class="fmt-sep"></span>
								<span class="fmt">@</span>
								<span class="fmt">😊</span>
								<span class="fmt">📎</span>
							</div>
							<div class="composer-input">
								<span class="composer-placeholder">{$t('slackContent.messagePlaceholder', { values: { channel: channelName } })}</span>
								<button class="send-btn" tabindex="-1" aria-label="Send">
									<svg viewBox="0 0 20 20" width="16" height="16" fill="white"><path d="M2.5 10 17 3.5 13 17l-3.5-4.5L14 6.5 7.5 11z"/></svg>
								</button>
							</div>
							{#if statusText}<div class="draft-status">{statusText}</div>{/if}
						</div>
					</div>
				{:else}
					<div class="attach-card">
						<div class="attach-game">
							{#if children}{@render children()}{/if}
						</div>
					</div>
				{/if}
			</div>

			{#if $panicMode}
				<div class="panic-region">
					<SlackPanic {channelName} />
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.slack-skin {
		width: 100%;
		height: 100vh;
		display: flex;
		background: #fff;
		font-family: 'Lato', 'Segoe UI', system-ui, sans-serif;
		font-size: 15px;
		color: #1d1c1d;
		overflow: hidden;

		--accent: #007a5a;
		--skin-bg-primary: #ffffff;
		--skin-accent: #007a5a;
	}

	/* ── Workspace rail ───────────────────────────── */
	.ws-rail {
		width: 68px; min-width: 68px;
		background: #3f0e40;
		display: flex; flex-direction: column; align-items: center;
		padding-top: 12px; gap: 12px;
		flex-shrink: 0;
	}
	.ws-active {
		width: 38px; height: 38px;
		border-radius: 9px;
		background: white; color: #3f0e40;
		border: none; cursor: pointer;
		font-size: 15px; font-weight: 800;
	}
	.ws-add {
		width: 38px; height: 38px;
		border-radius: 9px;
		background: rgba(255,255,255,0.08); border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
	}
	.ws-add:hover { background: rgba(255,255,255,0.16); }

	/* ── Channel sidebar ──────────────────────────── */
	.sidebar {
		width: 260px; min-width: 260px;
		background: #f8f8f8;
		border-right: 1px solid #e8e8e8;
		display: flex; flex-direction: column;
		flex-shrink: 0;
		overflow: hidden;
	}
	.ws-header {
		height: 49px; min-height: 49px;
		display: flex; align-items: center; gap: 6px;
		padding: 0 16px;
		border-bottom: 1px solid #e8e8e8;
		flex-shrink: 0;
	}
	.ws-name { font-size: 18px; font-weight: 800; letter-spacing: -0.01em; }
	.ws-compose {
		margin-left: auto;
		width: 28px; height: 28px; border-radius: 50%;
		background: white; border: 1px solid #ddd; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
	}

	.side-scroll { flex: 1; overflow-y: auto; padding: 8px 0; }

	.side-item {
		display: flex; align-items: center; gap: 9px;
		padding: 4px 18px;
		font-size: 15px; color: #1d1c1d;
		cursor: default;
	}
	.side-ico { font-size: 13px; width: 16px; text-align: center; }

	.side-section {
		font-size: 13px; font-weight: 700; color: #616061;
		padding: 12px 18px 4px;
	}

	.channel, .dm {
		display: flex; align-items: center; gap: 8px;
		padding: 4px 18px;
		font-size: 15px; color: #616061;
		cursor: default;
	}
	.channel:hover, .dm:hover { background: #efefef; }
	.channel.active {
		background: #007a5a; color: white;
	}
	.channel.unread, .dm.unread { color: #1d1c1d; font-weight: 700; }
	.hash { color: #9a999a; font-weight: 400; }
	.channel.active .hash { color: rgba(255,255,255,0.8); }
	.ch-name, .dm-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.badge {
		min-width: 18px; height: 18px;
		background: #cd2553; color: white;
		border-radius: 9px;
		font-size: 11px; font-weight: 700;
		display: flex; align-items: center; justify-content: center;
		padding: 0 5px;
	}
	.presence {
		width: 9px; height: 9px; min-width: 9px;
		border-radius: 50%;
		border: 1.5px solid #949494;
		box-sizing: border-box;
	}
	.presence.online { background: #2eb67d; border-color: #2eb67d; }

	/* ── Channel area ─────────────────────────────── */
	.channel-area {
		flex: 1;
		display: flex; flex-direction: column;
		background: #fff;
		min-width: 0;
		overflow: hidden;
	}
	.ch-header {
		height: 49px; min-height: 49px;
		display: flex; align-items: center; gap: 12px;
		padding: 0 16px 0 20px;
		border-bottom: 1px solid #e8e8e8;
		flex-shrink: 0;
	}
	.ch-title { display: flex; align-items: center; gap: 4px; }
	.ch-hash { color: #616061; font-size: 17px; }
	.ch-title-name { font-size: 18px; font-weight: 900; letter-spacing: -0.01em; }
	.ch-caret { margin-left: 2px; }
	.ch-topic { font-size: 13px; color: #616061; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
	.ch-actions { display: flex; align-items: center; gap: 12px; margin-left: auto; }
	.members {
		display: flex; align-items: center;
		border: 1px solid #ddd; border-radius: 6px;
		padding: 2px 6px 2px 4px; gap: 2px;
	}
	.member-av {
		width: 22px; height: 22px; border-radius: 5px;
		color: white; font-size: 9px; font-weight: 700;
		display: flex; align-items: center; justify-content: center;
		margin-left: -2px;
	}
	.member-av:first-child { margin-left: 0; }
	.member-count { font-size: 12px; font-weight: 700; color: #616061; margin-left: 4px; }
	.ch-icon {
		width: 30px; height: 30px;
		background: transparent; border: none; border-radius: 6px; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
	}
	.ch-icon:hover { background: #f4f4f4; }

	.ch-content {
		flex: 1;
		position: relative;
		min-height: 0;
		display: flex; flex-direction: column;
		padding: 0 20px 20px;

		/* Game theme — Slack light with green accent */
		--game-bg: transparent;
		--game-cell-a: #f8f8f8;
		--game-cell-b: #f1f1f1;
		--game-grid: #e4e4e4;
		--game-border: #c9c9c9;
		--game-border-soft: #ededed;
		--game-text: #1d1c1d;
		--game-text-muted: #616061;
		--game-accent: #007a5a;
		--game-panel-bg: #f8f8f8;
		--game-panel-border: #e4e4e4;
		--game-overlay-bg: rgba(255, 255, 255, 0.97);
		--game-overlay-border: #007a5a;
		--game-btn-bg: #007a5a;
		--game-btn-hover: #05663f;
	}

	.game-zone { flex: 1; min-height: 0; flex-direction: column; justify-content: flex-end; padding-top: 16px; }

	/* Typing framed as composing a channel message */
	.compose-wrap { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; min-height: 0; }
	.game-slot { flex: 0 1 auto; height: min(380px, 100%); min-height: 0; position: relative; overflow: hidden; }

	.composer {
		border: 1px solid #c9c9c9;
		border-radius: 8px;
		margin-top: 12px;
		flex-shrink: 0;
		overflow: hidden;
	}
	.composer-toolbar {
		display: flex; align-items: center; gap: 4px;
		padding: 6px 10px;
		border-bottom: 1px solid #ededed;
		background: #f8f8f8;
	}
	.fmt {
		width: 24px; height: 24px;
		display: flex; align-items: center; justify-content: center;
		font-size: 13px; color: #616061; border-radius: 4px;
	}
	.fmt-sep { width: 1px; height: 16px; background: #ddd; margin: 0 3px; }
	.composer-input {
		display: flex; align-items: center;
		padding: 10px 10px 10px 14px;
	}
	.composer-placeholder { flex: 1; font-size: 15px; color: #8d8d8d; }
	.send-btn {
		width: 32px; height: 28px;
		background: #007a5a; border: none; border-radius: 5px;
		cursor: pointer; display: flex; align-items: center; justify-content: center;
	}
	.send-btn:hover { background: #05663f; }
	.draft-status { font-size: 12px; color: #616061; padding: 0 12px 8px; text-align: right; }

	/* snake / tetris as an attachment block */
	.attach-card {
		flex: 1; min-height: 0;
		border: 1px solid #e4e4e4;
		border-radius: 10px;
		background: #f8f8f8;
		padding: 8px;
		display: flex;
		margin-bottom: 12px;
	}
	.attach-game { flex: 1; min-height: 0; position: relative; overflow: hidden; }

	.panic-region {
		position: absolute;
		inset: 0 0 0 0;
		background: #fff;
		overflow-y: auto;
		padding: 0 20px;
	}
</style>
