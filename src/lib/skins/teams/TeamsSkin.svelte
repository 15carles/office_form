<script lang="ts">
	import type { Snippet } from 'svelte';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { toggleFullscreen, isFullscreen } from '$lib/stores/fullscreen';
	import { getBestScore } from '$lib/stores/progress';
	import TeamsPanic from './TeamsPanic.svelte';

	interface Props {
		gameId?: string;
		score?: number;
		statusText?: string;
		children?: Snippet;
	}

	let { gameId = 'typing', score = 0, statusText = '', children }: Props = $props();

	let skinRoot: HTMLElement;
	const best = $derived(getBestScore('teams', gameId));

	// Activity badge = live score; the group chat badge = best score
	const activityCount = $derived(score > 0 ? score : 3);

	const CHAT_IDS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
	const CHAT_META: Record<string, { avatarColor: string; group?: boolean; unread?: boolean }> = {
		c1: { avatarColor: '#c239b3' },
		c2: { avatarColor: '#5b5fc7', group: true, unread: true },
		c3: { avatarColor: '#038387', unread: true },
		c4: { avatarColor: '#ca5010' },
		c5: { avatarColor: '#5c5c5c' },
		c6: { avatarColor: '#498205' },
		c7: { avatarColor: '#8764b8' }
	};

	function initials(name: string): string {
		return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
	}

	const openName = $derived($t('outlookContent.emails.m1.from'));
</script>

<div bind:this={skinRoot} class="teams-skin">

	<!-- Top bar -->
	<div class="top-bar">
		<div class="top-left">
			<button class="nav-arrow" tabindex="-1" aria-label="Back">
				<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#616161" stroke-width="1.4" stroke-linecap="round"><path d="M10 3.5 5.5 8l4.5 4.5"/></svg>
			</button>
			<button class="nav-arrow" tabindex="-1" aria-label="Forward">
				<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#616161" stroke-width="1.4" stroke-linecap="round"><path d="M6 3.5 10.5 8 6 12.5"/></svg>
			</button>
		</div>
		<div class="top-center">
			<div class="search-box">
				<svg class="search-icon" viewBox="0 0 16 16" width="14" height="14"><circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#616161" stroke-width="1.4"/><line x1="10" y1="10" x2="14" y2="14" stroke="#616161" stroke-width="1.4" stroke-linecap="round"/></svg>
				<span class="search-text">{$t('teamsContent.searchPlaceholder')}</span>
			</div>
		</div>
		<div class="top-right">
			<button class="top-icon" tabindex="-1" onclick={() => toggleFullscreen(skinRoot)} title={$isFullscreen ? $t('ui.exitFullscreen') : $t('ui.fullscreen')}>
				<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="#424242" stroke-width="1.3" stroke-linecap="round"><path d="M2 6V2h4M14 10v4h-4M10 2h4v4M6 14H2v-4"/></svg>
			</button>
			<button class="top-icon" tabindex="-1" aria-label="More">
				<svg viewBox="0 0 16 16" width="15" height="15" fill="#424242"><circle cx="4" cy="8" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="12" cy="8" r="1.3"/></svg>
			</button>
			<div class="avatar">JG</div>
		</div>
	</div>

	<div class="main-area">

		<!-- App rail -->
		<div class="rail">
			<button class="rail-btn" tabindex="-1">
				<span class="rail-icon-wrap">
					<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#424242" stroke-width="1.4"><path d="M10 2.5a5 5 0 0 0-5 5v3l-1.5 2.5h13L15 10.5v-3a5 5 0 0 0-5-5zM8 15.5a2 2 0 0 0 4 0"/></svg>
					{#if activityCount > 0}<span class="rail-badge">{activityCount > 99 ? '99+' : activityCount}</span>{/if}
				</span>
				<span class="rail-label">{$t('teamsContent.nav.activity')}</span>
			</button>
			<button class="rail-btn active" tabindex="-1">
				<span class="rail-icon-wrap">
					<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#5b5fc7" stroke-width="1.4"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v7a1.5 1.5 0 0 1-1.5 1.5H8l-3.5 2.5V14H4.5A1.5 1.5 0 0 1 3 12.5z"/></svg>
				</span>
				<span class="rail-label active">{$t('teamsContent.nav.chat')}</span>
			</button>
			<button class="rail-btn" tabindex="-1">
				<span class="rail-icon-wrap">
					<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#424242" stroke-width="1.4"><circle cx="7" cy="6.5" r="2.5"/><circle cx="13.5" cy="7.5" r="2"/><path d="M2.5 15c.6-2.4 2.4-3.8 4.5-3.8s3.9 1.4 4.5 3.8M13 11.4c1.8.2 3.2 1.5 3.8 3.4"/></svg>
				</span>
				<span class="rail-label">{$t('teamsContent.nav.teams')}</span>
			</button>
			<button class="rail-btn" tabindex="-1">
				<span class="rail-icon-wrap">
					<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#424242" stroke-width="1.4"><rect x="3" y="4" width="14" height="13" rx="1.5"/><path d="M3 8h14M7 2.5V5M13 2.5V5"/></svg>
				</span>
				<span class="rail-label">{$t('teamsContent.nav.calendar')}</span>
			</button>
			<button class="rail-btn" tabindex="-1">
				<span class="rail-icon-wrap">
					<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#424242" stroke-width="1.4"><path d="M4 4.5c-.5 4 2 8.5 6 11 1.5-.3 2.5-1 3-2l-2.5-2-1.5 1a10 10 0 0 1-3.5-3.5l1-1.5-2-2.5z"/></svg>
				</span>
				<span class="rail-label">{$t('teamsContent.nav.calls')}</span>
			</button>
		</div>

		<!-- Chat list -->
		<div class="chat-list">
			<div class="chat-list-header">
				<span class="chat-list-title">{$t('teamsContent.chatHeader')}</span>
				<button class="new-chat" tabindex="-1" aria-label="New chat">
					<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="#424242" stroke-width="1.3" stroke-linecap="round"><path d="M11 2.5 13.5 5 6 12.5l-3 .8.8-3zM10 3.5 12.5 6"/></svg>
				</button>
			</div>
			{#each CHAT_IDS as id, i (id)}
				{@const meta = CHAT_META[id]}
				{@const name = $t(`teamsContent.chats.${id}.name`)}
				{@const unread = meta.unread ?? false}
				<div class="chat" class:selected={i === 0} class:unread>
					{#if meta.group}
						<div class="chat-avatar group" style:background={meta.avatarColor}>
							<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="white" stroke-width="1.5"><circle cx="7" cy="7.5" r="2.2"/><circle cx="13" cy="8" r="1.8"/><path d="M3 14.5c.5-1.8 1.9-2.8 4-2.8s3.5 1 4 2.8M12.5 11.7c1.4.2 2.5 1.1 3 2.6"/></svg>
						</div>
					{:else}
						<div class="chat-avatar" style:background={meta.avatarColor}>{initials(name)}</div>
					{/if}
					<div class="chat-body">
						<div class="chat-top">
							<span class="chat-name">{name}</span>
							<span class="chat-time">{$t(`teamsContent.chats.${id}.time`)}</span>
						</div>
						<div class="chat-snippet-row">
							<span class="chat-snippet">{$t(`teamsContent.chats.${id}.snippet`)}</span>
							{#if id === 'c2' && best > 0}
								<span class="chat-unread-badge">{best}</span>
							{:else if unread}
								<span class="chat-dot"></span>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Conversation panel -->
		<div class="conversation">
			<div class="conv-header">
				<div class="conv-avatar" style:background={CHAT_META.c1.avatarColor}>{initials(openName)}</div>
				<div class="conv-title">
					<span class="conv-name">{openName}</span>
					<div class="conv-tabs">
						<span class="conv-tab active">{$t('teamsContent.tabs.chat')}</span>
						<span class="conv-tab">{$t('teamsContent.tabs.files')}</span>
						<span class="conv-tab-add">+</span>
					</div>
				</div>
				<div class="conv-actions">
					<button class="conv-icon" tabindex="-1" aria-label="Video call">
						<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="#424242" stroke-width="1.3"><rect x="2.5" y="6" width="10" height="8" rx="1.5"/><path d="m12.5 9 4-2.5v7l-4-2.5z"/></svg>
					</button>
					<button class="conv-icon" tabindex="-1" aria-label="Call">
						<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="#424242" stroke-width="1.3"><path d="M4 4.5c-.5 4 2 8.5 6 11 1.5-.3 2.5-1 3-2l-2.5-2-1.5 1a10 10 0 0 1-3.5-3.5l1-1.5-2-2.5z"/></svg>
					</button>
				</div>
			</div>

			<!-- Content: game (framed) or panic conversation -->
			<div class="conv-content">
				<div class="game-zone" style:display={$panicMode ? 'none' : 'flex'}>
					{#if gameId === 'typing'}
						<div class="reply-frame">
							<div class="reply-body">
								{#if children}{@render children()}{/if}
							</div>
							<div class="compose-bar">
								<div class="compose-input">
									<div class="compose-tools">
										<span class="tool-ico" aria-hidden="true">Aa</span>
										<span class="tool-ico" aria-hidden="true">😊</span>
										<span class="tool-ico" aria-hidden="true">📎</span>
									</div>
									<span class="compose-placeholder">{$t('teamsContent.replyTo', { values: { name: openName } })}</span>
								</div>
								<button class="send-btn" tabindex="-1" aria-label={$t('teamsContent.send')}>
									<svg viewBox="0 0 20 20" width="16" height="16" fill="white"><path d="M2.5 10 17 3.5 13 17l-3.5-4.5L14 6.5 7.5 11z"/></svg>
								</button>
							</div>
							{#if statusText}<div class="draft-status">{statusText}</div>{/if}
						</div>
					{:else}
						<div class="shared-card">
							<div class="shared-game">
								{#if children}{@render children()}{/if}
							</div>
						</div>
					{/if}
				</div>

				{#if $panicMode}
					<div class="panic-region">
						<TeamsPanic name={openName} avatarColor={CHAT_META.c1.avatarColor} />
					</div>
				{/if}
			</div>
		</div>

	</div>
</div>

<style>
	.teams-skin {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f5f5f5;
		font-family: 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif;
		font-size: 13px;
		color: #242424;
		overflow: hidden;

		--accent: #5b5fc7;
		--skin-bg-primary: #ffffff;
		--skin-accent: #5b5fc7;
	}

	/* ── Top bar ──────────────────────────────────── */
	.top-bar {
		height: 48px; min-height: 48px;
		background: #ebebeb;
		display: flex; align-items: center;
		padding: 0 12px;
		flex-shrink: 0;
	}
	.top-left { width: 200px; display: flex; align-items: center; gap: 2px; }
	.nav-arrow {
		width: 30px; height: 30px;
		background: transparent; border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		border-radius: 4px;
	}
	.nav-arrow:hover { background: rgba(0,0,0,0.06); }

	.top-center { flex: 1; display: flex; justify-content: center; }
	.search-box {
		width: min(560px, 92%);
		height: 32px;
		background: white;
		border: 1px solid #d1d1d1;
		border-radius: 6px;
		display: flex; align-items: center; gap: 8px;
		padding: 0 12px;
		cursor: text;
	}
	.search-text { color: #616161; font-size: 13px; }

	.top-right { width: 200px; display: flex; align-items: center; justify-content: flex-end; gap: 2px; }
	.top-icon {
		width: 32px; height: 32px;
		background: transparent; border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		border-radius: 4px;
	}
	.top-icon:hover { background: rgba(0,0,0,0.06); }
	.avatar {
		width: 30px; height: 30px; border-radius: 50%;
		background: #ca5010; color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 12px; font-weight: 600;
		margin-left: 8px;
	}

	/* ── Main area ────────────────────────────────── */
	.main-area { flex: 1; display: flex; overflow: hidden; }

	/* App rail */
	.rail {
		width: 68px; min-width: 68px;
		background: #ebebeb;
		display: flex; flex-direction: column; align-items: center;
		padding-top: 6px; gap: 2px;
		flex-shrink: 0;
	}
	.rail-btn {
		width: 60px; height: 56px;
		background: transparent; border: none; cursor: pointer;
		display: flex; flex-direction: column; align-items: center; justify-content: center;
		gap: 3px; border-radius: 6px; position: relative;
	}
	.rail-btn:hover { background: rgba(0,0,0,0.05); }
	.rail-btn.active::before {
		content: '';
		position: absolute; left: 4px; top: 14px;
		width: 3px; height: 28px;
		background: #5b5fc7; border-radius: 2px;
	}
	.rail-icon-wrap { position: relative; display: flex; }
	.rail-badge {
		position: absolute; top: -5px; right: -8px;
		min-width: 16px; height: 16px;
		background: #c4314b; color: white;
		border-radius: 8px;
		font-size: 10px; font-weight: 600;
		display: flex; align-items: center; justify-content: center;
		padding: 0 4px;
	}
	.rail-label { font-size: 11px; color: #424242; }
	.rail-label.active { color: #5b5fc7; font-weight: 600; }

	/* Chat list */
	.chat-list {
		width: 320px; min-width: 320px;
		background: #fff;
		border-right: 1px solid #e0e0e0;
		display: flex; flex-direction: column;
		overflow: hidden;
		flex-shrink: 0;
	}
	.chat-list-header {
		display: flex; align-items: center; justify-content: space-between;
		padding: 12px 16px 10px;
		flex-shrink: 0;
	}
	.chat-list-title { font-size: 18px; font-weight: 700; }
	.new-chat {
		width: 30px; height: 30px;
		background: transparent; border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		border-radius: 4px;
	}
	.new-chat:hover { background: #f0f0f0; }

	.chat {
		display: flex; align-items: center; gap: 11px;
		padding: 8px 14px;
		margin: 0 6px 2px;
		border-radius: 6px;
		cursor: default;
	}
	.chat:hover { background: #f5f5f5; }
	.chat.selected { background: #eceafa; }
	.chat-avatar {
		width: 36px; height: 36px; min-width: 36px;
		border-radius: 50%; color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 12px; font-weight: 600;
	}
	.chat-avatar.group { border-radius: 8px; }
	.chat-body { flex: 1; min-width: 0; }
	.chat-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
	.chat-name { font-size: 14px; color: #242424; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.chat.unread .chat-name { font-weight: 700; }
	.chat-time { font-size: 11px; color: #616161; flex-shrink: 0; }
	.chat-snippet-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
	.chat-snippet { font-size: 13px; color: #616161; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.chat.unread .chat-snippet { color: #242424; font-weight: 600; }
	.chat-dot { width: 8px; height: 8px; min-width: 8px; border-radius: 50%; background: #5b5fc7; }
	.chat-unread-badge {
		min-width: 18px; height: 18px;
		background: #5b5fc7; color: white;
		border-radius: 9px;
		font-size: 11px; font-weight: 600;
		display: flex; align-items: center; justify-content: center;
		padding: 0 5px;
	}

	/* Conversation panel */
	.conversation {
		flex: 1;
		display: flex; flex-direction: column;
		background: #fff;
		overflow: hidden;
		min-width: 0;
	}
	.conv-header {
		display: flex; align-items: center; gap: 12px;
		padding: 10px 20px;
		border-bottom: 1px solid #e0e0e0;
		flex-shrink: 0;
	}
	.conv-avatar {
		width: 34px; height: 34px; border-radius: 50%;
		color: white; display: flex; align-items: center; justify-content: center;
		font-size: 12px; font-weight: 600;
	}
	.conv-title { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
	.conv-name { font-size: 15px; font-weight: 700; }
	.conv-tabs { display: flex; align-items: center; gap: 16px; }
	.conv-tab { font-size: 13px; color: #616161; cursor: default; padding-bottom: 2px; }
	.conv-tab.active { color: #242424; font-weight: 600; border-bottom: 2px solid #5b5fc7; }
	.conv-tab-add { font-size: 15px; color: #616161; }
	.conv-actions { display: flex; align-items: center; gap: 4px; }
	.conv-icon {
		width: 32px; height: 32px;
		background: transparent; border: 1px solid #d1d1d1; border-radius: 4px;
		cursor: pointer; display: flex; align-items: center; justify-content: center;
	}
	.conv-icon:hover { background: #f5f5f5; }

	.conv-content {
		flex: 1;
		position: relative;
		min-height: 0;
		display: flex; flex-direction: column;
		padding: 16px 20px;

		/* Game theme — Fluent light with Teams accent */
		--game-bg: transparent;
		--game-cell-a: #faf9fb;
		--game-cell-b: #f2f1f6;
		--game-grid: #e6e4ef;
		--game-border: #c7c4dc;
		--game-border-soft: #edecf5;
		--game-text: #242424;
		--game-text-muted: #616161;
		--game-accent: #5b5fc7;
		--game-panel-bg: #faf9fb;
		--game-panel-border: #e6e4ef;
		--game-overlay-bg: rgba(255, 255, 255, 0.97);
		--game-overlay-border: #5b5fc7;
		--game-btn-bg: #5b5fc7;
		--game-btn-hover: #4b4fb0;
	}

	.game-zone { flex: 1; min-height: 0; flex-direction: column; justify-content: flex-end; }

	/* Typing framed as an active chat compose — anchored to the bottom,
	   just above the message box, like the latest message in a thread */
	.reply-frame { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; min-height: 0; }
	.reply-body { flex: 0 1 auto; height: min(380px, 100%); min-height: 0; position: relative; overflow: hidden; }

	.compose-bar {
		display: flex; align-items: flex-end; gap: 10px;
		flex-shrink: 0;
		margin-top: 10px;
	}
	.compose-input {
		flex: 1;
		border: 1px solid #d1d1d1;
		border-radius: 8px;
		padding: 8px 12px;
		min-height: 60px;
		display: flex; flex-direction: column; gap: 8px;
	}
	.compose-tools { display: flex; gap: 12px; }
	.tool-ico { font-size: 12px; color: #616161; }
	.compose-placeholder { font-size: 13px; color: #909090; }
	.send-btn {
		width: 40px; height: 40px;
		background: #5b5fc7; border: none; border-radius: 6px;
		cursor: pointer; display: flex; align-items: center; justify-content: center;
		flex-shrink: 0;
	}
	.send-btn:hover { background: #4b4fb0; }
	.draft-status { font-size: 11.5px; color: #616161; margin-top: 6px; text-align: right; }

	/* snake / tetris shared content card */
	.shared-card {
		flex: 1; min-height: 0;
		border: 1px solid #e6e4ef;
		border-radius: 10px;
		background: #faf9fb;
		padding: 8px;
		display: flex;
	}
	.shared-game { flex: 1; min-height: 0; position: relative; overflow: hidden; }

	.panic-region {
		position: absolute;
		inset: 0;
		background: #fff;
		overflow-y: auto;
	}
</style>
