<script lang="ts">
	import type { Snippet } from 'svelte';
	import { t, locale } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { toggleFullscreen, isFullscreen } from '$lib/stores/fullscreen';
	import { getBestScore } from '$lib/stores/progress';
	import OutlookPanic from './OutlookPanic.svelte';

	interface Props {
		gameId?: string;
		score?: number;
		statusText?: string;
		children?: Snippet;
	}

	let { gameId = 'typing', score = 0, statusText = '', children }: Props = $props();

	let skinRoot: HTMLElement;
	const best = $derived(getBestScore('outlook', gameId));

	// Unread badge on the inbox: live score while playing, plausible filler otherwise
	const inboxCount = $derived(score > 0 ? score : 4);

	const EMAIL_IDS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'];
	const EMAIL_META: Record<string, { time: string; unread: boolean; avatarColor: string }> = {
		m1: { time: '9:42', unread: false, avatarColor: '#c239b3' },
		m2: { time: '9:15', unread: true, avatarColor: '#0f6cbd' },
		m3: { time: '8:47', unread: true, avatarColor: '#8764b8' },
		m4: { time: '8:12', unread: false, avatarColor: '#038387' },
		m5: { time: '7:58', unread: false, avatarColor: '#5c5c5c' },
		m6: { time: '7:30', unread: true, avatarColor: '#ca5010' },
		m7: { time: '7:05', unread: false, avatarColor: '#5c5c5c' },
		m8: { time: '6:52', unread: false, avatarColor: '#498205' }
	};

	function initials(name: string): string {
		return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
	}

	const openFrom = $derived($t('outlookContent.emails.m1.from'));
	const openSubject = $derived($t('outlookContent.emails.m1.subject'));
	const openDate = $derived(
		new Date().toLocaleDateString($locale ?? 'en', { weekday: 'short', day: 'numeric', month: 'short' }) + ' 9:42'
	);
</script>

<div bind:this={skinRoot} class="outlook-skin">

	<!-- Top bar -->
	<div class="top-bar">
		<div class="top-left">
			<button class="waffle" tabindex="-1" aria-label="App launcher">
				<span class="waffle-grid">
					{#each Array(9) as _, i (i)}<span class="waffle-dot"></span>{/each}
				</span>
			</button>
			<span class="app-name">Outlook</span>
		</div>
		<div class="top-center">
			<div class="search-box">
				<svg class="search-icon" viewBox="0 0 16 16" width="14" height="14"><circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#616161" stroke-width="1.4"/><line x1="10" y1="10" x2="14" y2="14" stroke="#616161" stroke-width="1.4" stroke-linecap="round"/></svg>
				<span class="search-text">{$t('outlookContent.searchPlaceholder')}</span>
			</div>
		</div>
		<div class="top-right">
			<button class="top-icon" tabindex="-1" onclick={() => toggleFullscreen(skinRoot)} title={$isFullscreen ? $t('ui.exitFullscreen') : $t('ui.fullscreen')}>
				<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="white" stroke-width="1.3" stroke-linecap="round"><path d="M2 6V2h4M14 10v4h-4M10 2h4v4M6 14H2v-4"/></svg>
			</button>
			<button class="top-icon" tabindex="-1" aria-label="Settings">
				<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="white" stroke-width="1.3"><circle cx="8" cy="8" r="2.4"/><path d="M8 1.6v2M8 12.4v2M1.6 8h2M12.4 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M12.5 3.5l-1.4 1.4M4.9 11.1l-1.4 1.4"/></svg>
			</button>
			<div class="avatar">JG</div>
		</div>
	</div>

	<!-- Command bar -->
	<div class="command-bar">
		<button class="new-mail" tabindex="-1">
			<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"><path d="M8 2.5v11M2.5 8h11"/></svg>
			{$t('outlookContent.newMail')}
		</button>
		<span class="cmd-sep"></span>
		<button class="cmd" tabindex="-1">
			<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#616161" stroke-width="1.2"><path d="M3.5 4.5h9l-.8 9a1 1 0 0 1-1 .9h-5.4a1 1 0 0 1-1-.9zM2 4.5h12M6 4.5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M6.5 7v4.5M9.5 7v4.5"/></svg>
			{$t('outlookContent.commands.delete')}
		</button>
		<button class="cmd" tabindex="-1">
			<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#616161" stroke-width="1.2"><rect x="2.5" y="3" width="11" height="3" rx="0.5"/><path d="M3.5 6v6a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6M6.5 9h3"/></svg>
			{$t('outlookContent.commands.archive')}
		</button>
		<span class="cmd-sep"></span>
		<button class="cmd" tabindex="-1">
			<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#616161" stroke-width="1.2" stroke-linecap="round"><path d="M6.5 3.5 3 7l3.5 3.5M3 7h6a4 4 0 0 1 4 4v1.5"/></svg>
			{$t('outlookContent.commands.reply')}
		</button>
		<button class="cmd" tabindex="-1">
			<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#616161" stroke-width="1.2" stroke-linecap="round"><path d="M6.5 2.5 3 6l3.5 3.5M3 6h5.5M11 5.5 14.5 9 11 12.5M14.5 9H9"/></svg>
			{$t('outlookContent.commands.replyAll')}
		</button>
		<button class="cmd" tabindex="-1">
			<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#616161" stroke-width="1.2" stroke-linecap="round"><path d="M9.5 3.5 13 7l-3.5 3.5M13 7H7a4 4 0 0 0-4 4v1.5"/></svg>
			{$t('outlookContent.commands.forward')}
		</button>
	</div>

	<div class="main-area">

		<!-- App rail -->
		<div class="rail">
			<button class="rail-btn active" tabindex="-1" title={$t('outlookContent.nav.mail')}>
				<svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="#0f6cbd" stroke-width="1.4"><rect x="2.5" y="4" width="15" height="12" rx="1.5"/><path d="m3 5.5 7 5 7-5"/></svg>
			</button>
			<button class="rail-btn" tabindex="-1" title={$t('outlookContent.nav.calendar')}>
				<svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="#616161" stroke-width="1.4"><rect x="3" y="4" width="14" height="13" rx="1.5"/><path d="M3 8h14M7 2.5V5M13 2.5V5"/></svg>
			</button>
			<button class="rail-btn" tabindex="-1" title={$t('outlookContent.nav.people')}>
				<svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="#616161" stroke-width="1.4"><circle cx="8" cy="7" r="3"/><path d="M2.5 16.5c.8-2.6 3-4 5.5-4s4.7 1.4 5.5 4M13.5 10a2.5 2.5 0 1 0-1.6-4.5M14 12.6c1.8.4 3 1.6 3.5 3.4"/></svg>
			</button>
			<button class="rail-btn" tabindex="-1" title={$t('outlookContent.nav.tasks')}>
				<svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="#616161" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="7.5"/><path d="m6.5 10.2 2.3 2.3 4.7-4.8"/></svg>
			</button>
		</div>

		<!-- Folder pane -->
		<div class="folders">
			<div class="folder-section">{$t('outlookContent.folders.favorites')}</div>
			<div class="folder active">
				<span class="folder-name">{$t('outlookContent.folders.inbox')}</span>
				<span class="folder-count">{inboxCount}</span>
			</div>
			<div class="folder">
				<span class="folder-name">{$t('outlookContent.folders.drafts')}</span>
				{#if best > 0}<span class="folder-count muted">{best}</span>{/if}
			</div>
			<div class="folder"><span class="folder-name">{$t('outlookContent.folders.sent')}</span></div>
			<div class="folder"><span class="folder-name">{$t('outlookContent.folders.archive')}</span></div>
			<div class="folder"><span class="folder-name">{$t('outlookContent.folders.deleted')}</span></div>
		</div>

		<!-- Message list -->
		<div class="msg-list">
			<div class="msg-list-header">
				<span class="msg-list-title">{$t('outlookContent.folders.inbox')}</span>
				<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="#616161" stroke-width="1.3" stroke-linecap="round"><path d="M2.5 4.5h11M4.5 8h7M6.5 11.5h3"/></svg>
			</div>
			{#each EMAIL_IDS as id, i (id)}
				{@const meta = EMAIL_META[id]}
				{@const from = $t(`outlookContent.emails.${id}.from`)}
				<div class="msg" class:selected={i === 0} class:unread={meta.unread}>
					<span class="msg-indicator"></span>
					<div class="msg-avatar" style:background={meta.avatarColor}>{initials(from)}</div>
					<div class="msg-body">
						<div class="msg-top">
							<span class="msg-from">{from}</span>
							<span class="msg-time">{meta.time}</span>
						</div>
						<div class="msg-subject">{$t(`outlookContent.emails.${id}.subject`)}</div>
						<div class="msg-snippet">{$t(`outlookContent.emails.${id}.snippet`)}</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Reading pane -->
		<div class="reading-pane">
			<div class="mail-subject">{openSubject}</div>
			<div class="mail-header">
				<div class="mail-avatar" style:background={EMAIL_META.m1.avatarColor}>{initials(openFrom)}</div>
				<div class="mail-meta">
					<span class="mail-from">{openFrom}</span>
					<span class="mail-to">{$t('outlookContent.toYou')}</span>
				</div>
				<span class="mail-date">{openDate}</span>
			</div>

			<!-- Content area: game (framed as a reply when typing) or panic mail -->
			<div class="mail-content">
				<div class="game-zone" style:display={$panicMode ? 'none' : 'flex'}>
					{#if gameId === 'typing'}
						<div class="reply-frame">
							<div class="reply-header">
								<div class="reply-avatar">JG</div>
								<span class="reply-label">{$t('outlookContent.replyTo', { values: { name: openFrom } })}</span>
							</div>
							<div class="reply-body">
								{#if children}{@render children()}{/if}
							</div>
							<div class="reply-footer">
								<button class="send-btn" tabindex="-1">{$t('outlookContent.send')}</button>
								<button class="discard-btn" tabindex="-1">{$t('outlookContent.discard')}</button>
								{#if statusText}<span class="draft-status">{statusText}</span>{/if}
							</div>
						</div>
					{:else}
						<div class="plain-game">
							{#if children}{@render children()}{/if}
						</div>
					{/if}
				</div>

				{#if $panicMode}
					<div class="panic-region">
						<OutlookPanic sender={openFrom} />
					</div>
				{/if}
			</div>
		</div>

	</div>
</div>

<style>
	.outlook-skin {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #fff;
		font-family: 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif;
		font-size: 13px;
		color: #242424;
		overflow: hidden;

		--accent: #0f6cbd;
		--skin-bg-primary: #ffffff;
		--skin-accent: #0f6cbd;
	}

	/* ── Top bar ──────────────────────────────────── */
	.top-bar {
		height: 48px; min-height: 48px;
		background: #0f6cbd;
		display: flex; align-items: center;
		padding: 0 10px;
		flex-shrink: 0;
	}
	.top-left { width: 220px; display: flex; align-items: center; gap: 6px; }
	.waffle {
		width: 34px; height: 34px;
		background: transparent; border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		border-radius: 4px;
	}
	.waffle:hover { background: rgba(255,255,255,0.12); }
	.waffle-grid {
		display: grid; grid-template-columns: repeat(3, 3px);
		gap: 2.5px;
	}
	.waffle-dot { width: 3px; height: 3px; background: white; border-radius: 50%; }
	.app-name { color: white; font-size: 15px; font-weight: 600; }

	.top-center { flex: 1; display: flex; justify-content: center; }
	.search-box {
		width: min(460px, 90%);
		height: 30px;
		background: white;
		border-radius: 4px;
		display: flex; align-items: center; gap: 8px;
		padding: 0 10px;
		cursor: text;
	}
	.search-text { color: #616161; font-size: 13px; }

	.top-right { width: 220px; display: flex; align-items: center; justify-content: flex-end; gap: 4px; }
	.top-icon {
		width: 34px; height: 34px;
		background: transparent; border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		border-radius: 4px;
	}
	.top-icon:hover { background: rgba(255,255,255,0.12); }
	.avatar {
		width: 30px; height: 30px; border-radius: 50%;
		background: #ca5010; color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 12px; font-weight: 600;
		margin-left: 6px;
	}

	/* ── Command bar ──────────────────────────────── */
	.command-bar {
		height: 44px; min-height: 44px;
		background: #fff;
		border-bottom: 1px solid #e1dfdd;
		display: flex; align-items: center; gap: 2px;
		padding: 0 14px;
		flex-shrink: 0;
	}
	.new-mail {
		display: flex; align-items: center; gap: 7px;
		background: #0f6cbd; color: white;
		border: none; border-radius: 4px;
		padding: 6px 14px;
		font-size: 13px; font-weight: 600;
		font-family: inherit; cursor: pointer;
		margin-right: 8px;
	}
	.new-mail:hover { background: #0c5aa0; }
	.cmd {
		display: flex; align-items: center; gap: 6px;
		background: transparent; border: none;
		padding: 6px 10px; border-radius: 4px;
		font-size: 13px; color: #424242;
		font-family: inherit; cursor: pointer;
	}
	.cmd:hover { background: #f5f5f5; }
	.cmd-sep { width: 1px; height: 22px; background: #e1dfdd; margin: 0 6px; }

	/* ── Main area ────────────────────────────────── */
	.main-area { flex: 1; display: flex; overflow: hidden; }

	/* App rail */
	.rail {
		width: 48px; min-width: 48px;
		background: #faf9f8;
		border-right: 1px solid #e1dfdd;
		display: flex; flex-direction: column; align-items: center;
		padding-top: 8px; gap: 4px;
		flex-shrink: 0;
	}
	.rail-btn {
		width: 38px; height: 38px;
		background: transparent; border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		border-radius: 4px; position: relative;
	}
	.rail-btn:hover { background: #f0f0f0; }
	.rail-btn.active::before {
		content: '';
		position: absolute; left: -5px; top: 9px;
		width: 3px; height: 20px;
		background: #0f6cbd; border-radius: 2px;
	}

	/* Folder pane */
	.folders {
		width: 190px; min-width: 190px;
		background: #faf9f8;
		border-right: 1px solid #e1dfdd;
		padding: 10px 6px;
		flex-shrink: 0;
		overflow-y: auto;
	}
	.folder-section {
		font-size: 12px; font-weight: 600; color: #616161;
		padding: 4px 10px 6px;
	}
	.folder {
		display: flex; align-items: center; justify-content: space-between;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 13px; color: #242424;
		cursor: default;
	}
	.folder:hover { background: #f0f0f0; }
	.folder.active { background: #e0ecf9; font-weight: 600; }
	.folder-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.folder-count { font-size: 12px; color: #0f6cbd; font-weight: 600; }
	.folder-count.muted { color: #616161; font-weight: 400; }

	/* Message list */
	.msg-list {
		width: 300px; min-width: 300px;
		border-right: 1px solid #e1dfdd;
		overflow-y: auto;
		flex-shrink: 0;
		background: #fff;
	}
	.msg-list-header {
		display: flex; align-items: center; justify-content: space-between;
		padding: 10px 14px 8px;
		position: sticky; top: 0; background: #fff; z-index: 1;
	}
	.msg-list-title { font-size: 14px; font-weight: 600; }
	.msg {
		display: flex; align-items: flex-start; gap: 9px;
		padding: 9px 10px 9px 0;
		border-bottom: 1px solid #f0f0f0;
		cursor: default;
		position: relative;
	}
	.msg:hover { background: #f5f5f5; }
	.msg.selected { background: #e0ecf9; }
	.msg-indicator { width: 3px; min-width: 3px; align-self: stretch; border-radius: 2px; margin-right: 4px; }
	.msg.selected .msg-indicator { background: #0f6cbd; }
	.msg.unread .msg-indicator { background: #0f6cbd; }
	.msg-avatar {
		width: 32px; height: 32px; min-width: 32px;
		border-radius: 50%; color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 11px; font-weight: 600;
		margin-top: 2px;
	}
	.msg-body { flex: 1; min-width: 0; }
	.msg-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
	.msg-from { font-size: 13px; color: #242424; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.msg.unread .msg-from { font-weight: 700; }
	.msg-time { font-size: 11px; color: #616161; flex-shrink: 0; }
	.msg.unread .msg-time { color: #0f6cbd; font-weight: 600; }
	.msg-subject { font-size: 12.5px; color: #242424; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.msg.unread .msg-subject { color: #0f6cbd; font-weight: 600; }
	.msg-snippet { font-size: 12px; color: #616161; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	/* ── Reading pane ─────────────────────────────── */
	.reading-pane {
		flex: 1;
		display: flex; flex-direction: column;
		overflow: hidden;
		background: #fff;
		padding: 18px 24px 16px;
		min-width: 0;
	}
	.mail-subject {
		font-size: 19px; font-weight: 650;
		letter-spacing: -0.01em;
		margin-bottom: 14px;
	}
	.mail-header {
		display: flex; align-items: center; gap: 11px;
		padding-bottom: 12px;
		border-bottom: 1px solid #e1dfdd;
		flex-shrink: 0;
	}
	.mail-avatar {
		width: 38px; height: 38px; border-radius: 50%;
		color: white; display: flex; align-items: center; justify-content: center;
		font-size: 13px; font-weight: 600;
	}
	.mail-meta { flex: 1; display: flex; flex-direction: column; gap: 1px; min-width: 0; }
	.mail-from { font-size: 13.5px; font-weight: 600; }
	.mail-to { font-size: 12px; color: #616161; }
	.mail-date { font-size: 12px; color: #616161; flex-shrink: 0; }

	.mail-content {
		flex: 1;
		position: relative;
		min-height: 0;
		padding-top: 14px;
		display: flex;
		flex-direction: column;

		/* Game theme — Fluent light */
		--game-bg: transparent;
		--game-cell-a: #faf9f8;
		--game-cell-b: #f3f2f1;
		--game-grid: #e1dfdd;
		--game-border: #c8c6c4;
		--game-border-soft: #edebe9;
		--game-text: #242424;
		--game-text-muted: #616161;
		--game-accent: #0f6cbd;
		--game-panel-bg: #faf9f8;
		--game-panel-border: #e1dfdd;
		--game-overlay-bg: rgba(255, 255, 255, 0.97);
		--game-overlay-border: #0f6cbd;
		--game-btn-bg: #0f6cbd;
		--game-btn-hover: #0c5aa0;
	}

	.game-zone { flex: 1; min-height: 0; flex-direction: column; }

	/* Typing framed as an inline reply */
	.reply-frame {
		flex: 1;
		display: flex; flex-direction: column;
		border: 1px solid #e1dfdd;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0,0,0,0.06);
		overflow: hidden;
		min-height: 0;
	}
	.reply-header {
		display: flex; align-items: center; gap: 9px;
		padding: 10px 14px;
		border-bottom: 1px solid #f0f0f0;
		flex-shrink: 0;
	}
	.reply-avatar {
		width: 26px; height: 26px; border-radius: 50%;
		background: #ca5010; color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 10px; font-weight: 600;
	}
	.reply-label { font-size: 12.5px; color: #616161; }
	.reply-body { flex: 1; min-height: 0; position: relative; overflow: hidden; }
	.reply-footer {
		display: flex; align-items: center; gap: 8px;
		padding: 10px 14px;
		border-top: 1px solid #f0f0f0;
		flex-shrink: 0;
	}
	.send-btn {
		background: #0f6cbd; color: white;
		border: none; border-radius: 4px;
		padding: 6px 18px;
		font-size: 13px; font-weight: 600;
		font-family: inherit; cursor: pointer;
	}
	.send-btn:hover { background: #0c5aa0; }
	.discard-btn {
		background: transparent; color: #424242;
		border: 1px solid #c8c6c4; border-radius: 4px;
		padding: 6px 14px;
		font-size: 13px; font-family: inherit; cursor: pointer;
	}
	.discard-btn:hover { background: #f5f5f5; }
	.draft-status { margin-left: auto; font-size: 11.5px; color: #616161; }

	/* Snake / tetris rendered as embedded content */
	.plain-game {
		flex: 1; min-height: 0;
		position: relative; overflow: hidden;
		border: 1px solid #edebe9;
		border-radius: 8px;
		background: #fff;
	}

	.panic-region {
		position: absolute;
		inset: 14px 0 0 0;
		background: #fff;
		overflow-y: auto;
	}
</style>
