<script lang="ts">
	import type { Snippet } from 'svelte';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { toggleFullscreen, isFullscreen } from '$lib/stores/fullscreen';
	import { getBestScore } from '$lib/stores/progress';
	import SalesforcePanic from './SalesforcePanic.svelte';

	interface Props {
		gameId?: string;
		score?: number;
		statusText?: string;
		children?: Snippet;
	}

	let { gameId = 'snake', score = 0, statusText = '', children }: Props = $props();

	let skinRoot: HTMLElement;
	const best = $derived(getBestScore('salesforce', gameId));

	// The game-hosting related list's record counter reflects the live score
	const gameCount = $derived(score > 0 ? score : 3);

	const NAV_IDS = ['home', 'opportunities', 'leads', 'accounts', 'contacts', 'reports', 'dashboards'];
	const STAGE_IDS = ['prospecting', 'qualification', 'needsAnalysis', 'proposal', 'negotiation', 'closedWon'];
	const CURRENT_STAGE = 3; // Proposal
	const CONTACT_ROLE_IDS = ['cr1', 'cr2', 'cr3'];

	const gameCardTitle = $derived(gameId === 'typing' ? $t('salesforceContent.relatedLists.notes') : $t('salesforceContent.gameCard.files'));
</script>

<div bind:this={skinRoot} class="sf-skin">

	<!-- Global header -->
	<div class="global-header">
		<button class="waffle" tabindex="-1" aria-label="App Launcher">
			<span class="waffle-grid">{#each Array(9) as _, i (i)}<span class="wd"></span>{/each}</span>
		</button>
		<span class="app-name">{$t('salesforceContent.appName')}</span>
		<div class="header-search">
			<svg viewBox="0 0 16 16" width="14" height="14"><circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#747474" stroke-width="1.4"/><line x1="10" y1="10" x2="14" y2="14" stroke="#747474" stroke-width="1.4" stroke-linecap="round"/></svg>
			<span>{$t('salesforceContent.searchPlaceholder')}</span>
		</div>
		<div class="header-right">
			<button class="hicon" tabindex="-1" onclick={() => toggleFullscreen(skinRoot)} title={$isFullscreen ? $t('ui.exitFullscreen') : $t('ui.fullscreen')} aria-label="Fullscreen">
				<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="white" stroke-width="1.3" stroke-linecap="round"><path d="M2 6V2h4M14 10v4h-4M10 2h4v4M6 14H2v-4"/></svg>
			</button>
			<span class="hicon" aria-hidden="true">⚙</span>
			<span class="hicon" aria-hidden="true">🔔</span>
			<div class="avatar">JG</div>
		</div>
	</div>

	<!-- Object navigation -->
	<div class="object-nav">
		{#each NAV_IDS as id (id)}
			<div class="nav-tab" class:active={id === 'opportunities'}>
				<span>{$t(`salesforceContent.nav.${id}`)}</span>
				<span class="nav-caret">▾</span>
			</div>
		{/each}
	</div>

	<!-- Scrollable record body -->
	<div class="record-scroll">

		<!-- Highlights panel -->
		<div class="highlights">
			<div class="hl-top">
				<div class="rec-icon">
					<svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M4 4h11l5 5v11H4z" opacity="0.9"/><path d="M8 12h8M8 15h8M8 9h4" stroke="#fe9339" stroke-width="1.4" stroke-linecap="round"/></svg>
				</div>
				<div class="rec-titles">
					<span class="rec-crumb">{$t('salesforceContent.recordType')}</span>
					<span class="rec-name">{$t('salesforceContent.recordName')}</span>
				</div>
				<div class="hl-fields">
					<div class="hlf"><span class="hlf-l">{$t('salesforceContent.highlights.account')}</span><span class="hlf-v link">{$t('salesforceContent.highlights.accountValue')}</span></div>
					<div class="hlf"><span class="hlf-l">{$t('salesforceContent.highlights.closeDate')}</span><span class="hlf-v">{$t('salesforceContent.highlights.closeDateValue')}</span></div>
					<div class="hlf"><span class="hlf-l">{$t('salesforceContent.highlights.amount')}</span><span class="hlf-v">€ {(65500 + score * 500).toLocaleString('es-ES')}</span></div>
					<div class="hlf"><span class="hlf-l">{$t('salesforceContent.highlights.owner')}</span><span class="hlf-v link">{$t('salesforceContent.highlights.ownerValue')}</span></div>
				</div>
				<div class="hl-btns">
					<button class="sf-btn" tabindex="-1">{$t('salesforceContent.buttons.follow')}</button>
					<button class="sf-btn" tabindex="-1">{$t('salesforceContent.buttons.edit')}</button>
				</div>
			</div>

			<!-- Path -->
			<div class="path">
				<div class="path-stages">
					{#each STAGE_IDS as id, i (id)}
						<div class="chevron" class:done={i < CURRENT_STAGE} class:current={i === CURRENT_STAGE}>
							<span class="chevron-label">{$t(`salesforceContent.stages.${id}`)}</span>
						</div>
					{/each}
				</div>
				<button class="path-btn" tabindex="-1">✓ {$t('salesforceContent.buttons.markComplete')}</button>
			</div>
		</div>

		<!-- Body: main + sidebar -->
		<div class="body">
			<div class="main-col">
				<!-- Tab strip -->
				<div class="card">
					<div class="rec-tabs">
						<span class="rec-tab active">{$t('salesforceContent.tabs.related')}</span>
						<span class="rec-tab">{$t('salesforceContent.tabs.details')}</span>
					</div>
				</div>

				<!-- Game-hosting related list -->
				<div class="card game-card">
					<div class="rl-header">
						<span class="rl-icon" style:background="#8c9196">
							<svg viewBox="0 0 16 16" width="12" height="12" fill="white"><path d="M3 2h7l3 3v9H3z"/></svg>
						</span>
						<span class="rl-title">{gameCardTitle} ({gameCount})</span>
						<div class="rl-actions">
							<button class="rl-act" tabindex="-1" aria-label="Add">＋</button>
							<button class="rl-act" tabindex="-1" aria-label="More">▾</button>
						</div>
					</div>
					<div class="rl-body">
						<div class="game-zone" style:display={$panicMode ? 'none' : 'flex'}>
							{#if gameId === 'typing'}
								<div class="chatter">
									<div class="chatter-slot">
										{#if children}{@render children()}{/if}
									</div>
									<div class="chatter-foot">
										<span class="chatter-ph">{$t('salesforceContent.chatterPlaceholder')}</span>
										<button class="sf-btn brand" tabindex="-1">{$t('salesforceContent.buttons.share')}</button>
										{#if statusText}<span class="chatter-status">{statusText}</span>{/if}
									</div>
								</div>
							{:else}
								<div class="game-embed">
									{#if children}{@render children()}{/if}
								</div>
							{/if}
						</div>

						{#if $panicMode}
							<div class="panic-region"><SalesforcePanic /></div>
						{/if}
					</div>
				</div>

				<!-- Static related list: Contact Roles -->
				<div class="card">
					<div class="rl-header">
						<span class="rl-icon" style:background="#7f8de1">
							<svg viewBox="0 0 16 16" width="12" height="12" fill="white"><circle cx="6" cy="6" r="2.4"/><path d="M2 13c.6-2 2.1-3.2 4-3.2s3.4 1.2 4 3.2" stroke="white" stroke-width="1.1" fill="none"/></svg>
						</span>
						<span class="rl-title">{$t('salesforceContent.relatedLists.contactRoles')} (3)</span>
					</div>
					<table class="rl-table">
						<thead><tr><th>Name</th><th>Role</th><th>Email</th></tr></thead>
						<tbody>
							{#each CONTACT_ROLE_IDS as id (id)}
								<tr>
									<td class="link">{$t(`salesforceContent.contactRoleRows.${id}.name`)}</td>
									<td>{$t(`salesforceContent.contactRoleRows.${id}.role`)}</td>
									<td class="link">{$t(`salesforceContent.contactRoleRows.${id}.email`)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<div class="side-col">
				<div class="card">
					<div class="rl-header">
						<span class="rl-title strong">{$t('salesforceContent.activity.title')}</span>
					</div>
					<div class="act-tabs">
						<span class="act-tab">✎ {$t('salesforceContent.activity.logCall')}</span>
						<span class="act-tab">✓ {$t('salesforceContent.activity.newTask')}</span>
						<span class="act-tab">✉ {$t('salesforceContent.activity.email')}</span>
					</div>
					<div class="act-feed">
						{#each ['a1', 'a2', 'a3'] as id (id)}
							<div class="act-item">
								<span class="act-dot"></span>
								<div class="act-main">
									<span class="act-subject">{$t(`salesforceContent.activity.${id}.subject`)}</span>
									<span class="act-meta">{$t(`salesforceContent.activity.${id}.type`)} · {$t(`salesforceContent.activity.${id}.date`)}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.sf-skin {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f3f3f3;
		font-family: 'Salesforce Sans', 'Segoe UI', system-ui, sans-serif;
		font-size: 13px;
		color: #080707;
		overflow: hidden;

		--accent: #0176d3;
		--skin-bg-primary: #ffffff;
		--skin-accent: #0176d3;
	}

	/* ── Global header ────────────────────────────── */
	.global-header {
		height: 50px; min-height: 50px;
		background: #032d60;
		display: flex; align-items: center; gap: 12px;
		padding: 0 14px;
		flex-shrink: 0;
	}
	.waffle {
		width: 32px; height: 32px; border-radius: 4px;
		background: transparent; border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
	}
	.waffle:hover { background: rgba(255,255,255,0.1); }
	.waffle-grid { display: grid; grid-template-columns: repeat(3, 3px); gap: 2.5px; }
	.wd { width: 3px; height: 3px; background: white; border-radius: 50%; }
	.app-name { color: white; font-size: 17px; font-weight: 700; font-style: italic; }
	.header-search {
		flex: 1; max-width: 460px; height: 32px;
		background: white; border-radius: 16px;
		display: flex; align-items: center; gap: 8px;
		padding: 0 14px; margin: 0 auto;
		color: #747474;
	}
	.header-right { display: flex; align-items: center; gap: 10px; }
	.hicon {
		color: white; font-size: 15px;
		background: transparent; border: none; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
		width: 28px; height: 28px; border-radius: 4px;
	}
	.avatar {
		width: 30px; height: 30px; border-radius: 50%;
		background: #e8912d; color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 11px; font-weight: 700;
	}

	/* ── Object nav ───────────────────────────────── */
	.object-nav {
		height: 40px; min-height: 40px;
		background: #fff;
		border-bottom: 1px solid #dddbda;
		display: flex; align-items: stretch;
		padding: 0 14px;
		flex-shrink: 0;
		box-shadow: 0 1px 2px rgba(0,0,0,0.05);
	}
	.nav-tab {
		display: flex; align-items: center; gap: 4px;
		padding: 0 14px;
		font-size: 13px; color: #080707;
		cursor: default;
		border-bottom: 3px solid transparent;
	}
	.nav-tab:hover { background: #f3f3f3; }
	.nav-tab.active { color: #0176d3; font-weight: 700; border-bottom-color: #0176d3; }
	.nav-caret { font-size: 8px; color: #706e6b; }

	/* ── Record scroll ────────────────────────────── */
	.record-scroll { flex: 1; overflow-y: auto; padding: 12px; }

	/* Highlights */
	.highlights {
		background: white;
		border: 1px solid #dddbda;
		border-radius: 8px;
		padding: 12px 16px;
		margin-bottom: 12px;
	}
	.hl-top { display: flex; align-items: center; gap: 12px; }
	.rec-icon {
		width: 40px; height: 40px; border-radius: 6px;
		background: #fe9339;
		display: flex; align-items: center; justify-content: center;
		flex-shrink: 0;
	}
	.rec-titles { display: flex; flex-direction: column; }
	.rec-crumb { font-size: 11px; color: #706e6b; }
	.rec-name { font-size: 18px; font-weight: 700; letter-spacing: -0.01em; }

	.hl-fields { display: flex; gap: 26px; margin-left: 26px; flex: 1; }
	.hlf { display: flex; flex-direction: column; gap: 1px; }
	.hlf-l { font-size: 11px; color: #706e6b; }
	.hlf-v { font-size: 13px; font-weight: 600; }
	.link { color: #0176d3; }

	.hl-btns { display: flex; gap: 6px; }
	.sf-btn {
		background: white; border: 1px solid #dddbda; border-radius: 4px;
		padding: 5px 14px; font-size: 13px; color: #0176d3; font-weight: 600;
		font-family: inherit; cursor: pointer;
	}
	.sf-btn:hover { background: #f4f6f9; }
	.sf-btn.brand { background: #0176d3; color: white; border-color: #0176d3; }
	.sf-btn.brand:hover { background: #014486; }

	/* Path */
	.path { display: flex; align-items: center; gap: 12px; margin-top: 14px; }
	.path-stages { display: flex; flex: 1; }
	.chevron {
		flex: 1;
		height: 30px;
		background: #ecebea;
		display: flex; align-items: center; justify-content: center;
		font-size: 11px; color: #514f4d;
		clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%);
		margin-right: -8px;
		padding-left: 8px;
	}
	.chevron:first-child { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%); padding-left: 0; }
	.chevron.done { background: #c5d9ec; color: #032d60; }
	.chevron.current { background: #0176d3; color: white; font-weight: 700; }
	.chevron-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0 6px; }
	.path-btn {
		background: #f3f3f3; border: 1px solid #c9c7c5; border-radius: 4px;
		padding: 6px 14px; font-size: 12px; color: #080707; font-weight: 600;
		font-family: inherit; cursor: pointer; white-space: nowrap;
	}
	.path-btn:hover { background: #ecebea; }

	/* Body columns */
	.body { display: flex; gap: 12px; align-items: flex-start; }
	.main-col { flex: 1.9; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
	.side-col { flex: 1; min-width: 0; }

	.card {
		background: white;
		border: 1px solid #dddbda;
		border-radius: 8px;
		overflow: hidden;
	}

	.rec-tabs { display: flex; gap: 20px; padding: 0 16px; }
	.rec-tab { padding: 12px 0; font-size: 14px; color: #514f4d; cursor: default; border-bottom: 3px solid transparent; }
	.rec-tab.active { color: #0176d3; font-weight: 700; border-bottom-color: #0176d3; }

	/* Related list header */
	.rl-header {
		display: flex; align-items: center; gap: 9px;
		padding: 10px 14px;
		border-bottom: 1px solid #dddbda;
	}
	.rl-icon {
		width: 22px; height: 22px; border-radius: 4px;
		display: flex; align-items: center; justify-content: center;
		flex-shrink: 0;
	}
	.rl-title { font-size: 14px; font-weight: 700; color: #080707; flex: 1; }
	.rl-title.strong { font-size: 15px; }
	.rl-actions { display: flex; gap: 2px; }
	.rl-act {
		width: 26px; height: 26px; border-radius: 4px;
		background: white; border: 1px solid #dddbda; cursor: pointer;
		font-size: 12px; color: #706e6b;
	}
	.rl-act:hover { background: #f4f6f9; }

	/* Game host */
	.game-card .rl-body {
		position: relative;
		height: 380px;
		min-height: 0;
		display: flex; flex-direction: column;

		/* Game theme — SLDS light */
		--game-bg: transparent;
		--game-cell-a: #fafaf9;
		--game-cell-b: #f3f2f2;
		--game-grid: #e5e5e5;
		--game-border: #c9c7c5;
		--game-border-soft: #ecebea;
		--game-text: #080707;
		--game-text-muted: #706e6b;
		--game-accent: #0176d3;
		--game-panel-bg: #fafaf9;
		--game-panel-border: #dddbda;
		--game-overlay-bg: rgba(255, 255, 255, 0.97);
		--game-overlay-border: #0176d3;
		--game-btn-bg: #0176d3;
		--game-btn-hover: #014486;
	}
	.game-zone { flex: 1; min-height: 0; display: flex; flex-direction: column; }
	.game-embed { flex: 1; min-height: 0; position: relative; overflow: hidden; }

	/* Chatter compose (typing) */
	.chatter { flex: 1; display: flex; flex-direction: column; min-height: 0; }
	.chatter-slot { flex: 1; min-height: 0; position: relative; overflow: hidden; }
	.chatter-foot {
		display: flex; align-items: center; gap: 10px;
		padding: 10px 14px;
		border-top: 1px solid #ecebea;
		flex-shrink: 0;
	}
	.chatter-ph { flex: 1; font-size: 13px; color: #969492; }
	.chatter-status { font-size: 11.5px; color: #706e6b; }

	.panic-region { position: absolute; inset: 0; background: white; overflow-y: auto; }

	/* Related list table */
	.rl-table { width: 100%; border-collapse: collapse; font-size: 13px; }
	.rl-table th {
		text-align: left; padding: 7px 14px;
		font-size: 11px; font-weight: 400; color: #706e6b;
		border-bottom: 1px solid #dddbda; background: #fafaf9;
	}
	.rl-table td { padding: 8px 14px; border-bottom: 1px solid #f3f2f2; }
	.rl-table tr:last-child td { border-bottom: none; }

	/* Activity card */
	.act-tabs { display: flex; gap: 4px; padding: 10px 14px; border-bottom: 1px solid #ecebea; flex-wrap: wrap; }
	.act-tab {
		font-size: 12px; color: #0176d3;
		border: 1px solid #dddbda; border-radius: 4px;
		padding: 4px 10px; cursor: default;
	}
	.act-feed { padding: 6px 0; }
	.act-item { display: flex; gap: 10px; padding: 9px 14px; align-items: flex-start; }
	.act-item:hover { background: #fafaf9; }
	.act-dot { width: 9px; height: 9px; min-width: 9px; border-radius: 2px; background: #8c9196; margin-top: 3px; }
	.act-main { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
	.act-subject { font-size: 13px; color: #080707; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.act-meta { font-size: 11px; color: #706e6b; }
</style>
