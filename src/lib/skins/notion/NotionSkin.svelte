<script lang="ts">
	import type { Snippet } from 'svelte';
	import { t } from 'svelte-i18n';
	import { panicMode } from '$lib/stores/panic';
	import { toggleFullscreen, isFullscreen } from '$lib/stores/fullscreen';
	import { getBestScore } from '$lib/stores/progress';
	import NotionPanic from './NotionPanic.svelte';

	interface Props {
		gameId?: string;
		score?: number;
		statusText?: string;
		children?: Snippet;
	}

	let { gameId = 'typing', score = 0, statusText = '', children }: Props = $props();

	let skinRoot: HTMLElement;
	const best = $derived(getBestScore('notion', gameId));
	const today = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });

	const PAGES = [
		{ icon: '📋', name: 'Reunión semanal', active: true },
		{ icon: '📊', name: 'OKRs Q1 2026', active: false },
		{ icon: '📝', name: 'Roadmap producto', active: false },
		{ icon: '📁', name: 'Documentación API', active: false },
		{ icon: '✅', name: 'Tareas pendientes', active: false },
	];
</script>

<div bind:this={skinRoot} class="notion-skin">

	<!-- Sidebar -->
	<div class="sidebar">
		<div class="workspace-header">
			<div class="workspace-icon">⊞</div>
			<span class="workspace-name">Mi Empresa</span>
			<button class="sidebar-action" title="New page">+</button>
		</div>

		<div class="sidebar-section">
			<div class="sidebar-item muted"><span>🔍</span> Buscar</div>
			<div class="sidebar-item muted"><span>🕐</span> Actualizaciones</div>
			<div class="sidebar-item muted"><span>⚙️</span> Ajustes</div>
		</div>

		<div class="sidebar-divider"></div>

		<div class="sidebar-section">
			<div class="sidebar-label">PRIVADO</div>
			{#each PAGES as page}
				<div class="sidebar-item" class:active={page.active}>
					<span>{page.icon}</span>
					<span class="page-name">{page.name}</span>
				</div>
			{/each}
		</div>

		<div class="sidebar-footer">
			<div class="sidebar-item muted small">
				<span>{$t('games.typing.score')}: {score > 0 ? score : '—'}</span>
			</div>
			<div class="sidebar-item muted small">
				<span>{$t('games.typing.best')}: {best || '—'}</span>
			</div>
		</div>
	</div>

	<!-- Main document area -->
	<div class="doc-area">
		<!-- Doc top bar -->
		<div class="doc-topbar">
			<div class="breadcrumb">
				<span>Mi Empresa</span>
				<span class="sep">›</span>
				<span class="current-page">Reunión semanal</span>
			</div>
			<div class="doc-actions">
				<button class="doc-btn" onclick={() => toggleFullscreen(skinRoot)}>
					{$isFullscreen ? '⊡ Salir' : '⊟ Pantalla completa'}
				</button>
				<button class="doc-btn">Compartir</button>
				<div class="avatar-sm">A</div>
			</div>
		</div>

		<!-- Document content -->
		<div class="doc-content">
			<!-- Page title -->
			<div class="page-icon">📋</div>
			<h1 class="page-title">Reunión semanal</h1>
			<div class="page-meta">{today} · {statusText || 'Editado hace unos segundos'}</div>

			<!-- Properties block -->
			<div class="properties">
				<div class="prop-row">
					<span class="prop-key">Estado</span>
					<span class="tag in-progress">En curso</span>
				</div>
				<div class="prop-row">
					<span class="prop-key">Responsable</span>
					<span class="prop-val">A. Fernández</span>
				</div>
				<div class="prop-row">
					<span class="prop-key">Métricas</span>
					<span class="prop-val metric">{score > 0 ? `${score} ${gameId === 'typing' ? 'ppm' : 'pts'}` : '—'}</span>
				</div>
			</div>

			<div class="divider"></div>

			<!-- Figma embed block — game lives here -->
			<div class="embed-block">

				<!-- Embed header -->
				<div class="embed-header">
					<span class="embed-figma-icon">◈</span>
					<div class="embed-meta">
						<span class="embed-title">Design System v2 · Q4 Metrics</span>
						<span class="embed-source">figma.com</span>
					</div>
					<button class="embed-open" tabindex="-1">Abrir ↗</button>
				</div>

				<!-- Dark Figma canvas with game inside -->
				<div class="embed-canvas" style:display={$panicMode ? 'none' : 'block'}>
					<span class="frame-label">Q4 Dashboard — Frame 1</span>
					<div class="embed-artboard">
						{#if children}
							{@render children()}
						{/if}
					</div>
				</div>

				{#if $panicMode}
					<div class="panic-slot">
						<NotionPanic />
					</div>
				{/if}

			</div>

			<div class="block-hint">Escribe debajo para añadir notas...</div>
		</div>
	</div>
</div>

<style>
	.notion-skin {
		width: 100%;
		height: 100vh;
		display: flex;
		overflow: hidden;
		font-family: ui-sans-serif, 'Inter', system-ui, sans-serif;
		font-size: 14px;
		background: white;
		color: #37352f;

		--accent: #191919;
		--skin-bg-primary: #ffffff;
		--skin-accent: #191919;
	}

	/* Sidebar */
	.sidebar {
		width: 240px;
		min-width: 240px;
		background: #f7f6f3;
		border-right: 1px solid #e9e9e7;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		flex-shrink: 0;
	}

	.workspace-header {
		height: 44px;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 12px;
		border-bottom: 1px solid #e9e9e7;
		flex-shrink: 0;
	}
	.workspace-icon {
		width: 24px; height: 24px;
		background: #191919;
		color: white;
		border-radius: 4px;
		display: flex; align-items: center; justify-content: center;
		font-size: 12px;
	}
	.workspace-name { flex: 1; font-size: 13px; font-weight: 600; }
	.sidebar-action {
		width: 24px; height: 24px;
		background: transparent; border: none;
		color: #9b9a97; font-size: 16px; cursor: pointer;
		border-radius: 3px; display: flex; align-items: center; justify-content: center;
	}
	.sidebar-action:hover { background: #ebebea; }

	.sidebar-section { padding: 6px 0; }
	.sidebar-label {
		font-size: 10px; color: #9b9a97;
		text-transform: uppercase; letter-spacing: 0.05em;
		padding: 4px 12px; margin-bottom: 2px;
	}
	.sidebar-item {
		display: flex; align-items: center; gap: 7px;
		padding: 4px 12px;
		font-size: 13px; color: #37352f;
		cursor: default; border-radius: 4px; margin: 0 4px;
	}
	.sidebar-item:hover { background: #ebebea; }
	.sidebar-item.active { background: #ebebea; font-weight: 500; }
	.sidebar-item.muted { color: #9b9a97; font-size: 12px; }
	.sidebar-item.small { font-size: 11px; padding: 2px 12px; }
	.page-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

	.sidebar-divider { height: 1px; background: #e9e9e7; margin: 4px 0; }
	.sidebar-footer { margin-top: auto; padding: 8px 0; border-top: 1px solid #e9e9e7; }

	/* Doc area */
	.doc-area {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.doc-topbar {
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24px;
		border-bottom: 1px solid #e9e9e7;
		flex-shrink: 0;
	}
	.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9b9a97; }
	.breadcrumb .sep { color: #ccc; }
	.breadcrumb .current-page { color: #37352f; }
	.doc-actions { display: flex; align-items: center; gap: 8px; }
	.doc-btn {
		padding: 4px 10px; font-size: 12px; font-family: inherit;
		background: transparent; border: 1px solid #e9e9e7;
		border-radius: 4px; color: #37352f; cursor: pointer;
	}
	.doc-btn:hover { background: #f7f6f3; }
	.avatar-sm {
		width: 28px; height: 28px; border-radius: 50%;
		background: #7b61ff; color: white;
		display: flex; align-items: center; justify-content: center;
		font-size: 11px; font-weight: 700;
	}

	/* Document content */
	.doc-content {
		flex: 1;
		overflow-y: auto;
		padding: 48px 96px 48px 96px;
		max-width: 900px;
	}

	.page-icon { font-size: 48px; margin-bottom: 8px; }
	.page-title {
		font-size: 32px; font-weight: 700; color: #37352f;
		margin: 0 0 4px; line-height: 1.2;
	}
	.page-meta { font-size: 12px; color: #9b9a97; margin-bottom: 20px; }

	.properties {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 16px;
	}
	.prop-row {
		display: flex; align-items: center; gap: 12px;
		font-size: 13px;
	}
	.prop-key { color: #9b9a97; width: 100px; flex-shrink: 0; font-size: 12px; }
	.prop-val { color: #37352f; }
	.prop-val.metric { font-weight: 700; color: #191919; }

	.tag {
		display: inline-block; padding: 1px 8px;
		border-radius: 3px; font-size: 12px;
	}
	.tag.in-progress { background: #dbeafe; color: #1d4ed8; }

	.divider { height: 1px; background: #e9e9e7; margin: 16px 0; }

	/* ── Figma embed block ──────────────────────────────── */
	.embed-block {
		border: 1px solid #e9e9e7;
		border-radius: 4px;
		overflow: hidden;
		background: white;
	}

	.embed-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background: #fafafa;
		border-bottom: 1px solid #e9e9e7;
	}
	.embed-figma-icon {
		font-size: 14px;
		color: #f24e1e;
		flex-shrink: 0;
	}
	.embed-meta {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1px;
		overflow: hidden;
	}
	.embed-title {
		font-size: 12px;
		font-weight: 500;
		color: #37352f;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.embed-source {
		font-size: 10px;
		color: #9b9a97;
	}
	.embed-open {
		font-size: 11px;
		color: #9b9a97;
		background: transparent;
		border: 1px solid #e9e9e7;
		border-radius: 3px;
		padding: 3px 8px;
		cursor: pointer;
		font-family: inherit;
		white-space: nowrap;
		flex-shrink: 0;
	}
	.embed-open:hover { background: #f0f0ef; color: #37352f; }

	/* Dark Figma canvas (embed interior) */
	.embed-canvas {
		background: #1a1a1a;
		background-image: radial-gradient(circle, #2d2d2d 1px, transparent 1px);
		background-size: 16px 16px;
		padding: 28px 12px 12px;
		position: relative;
		min-height: 280px;
	}

	.frame-label {
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 10px;
		color: #4a4a4a;
		font-family: 'Inter', sans-serif;
		white-space: nowrap;
		pointer-events: none;
		letter-spacing: 0.02em;
	}

	/* White artboard — game renders here */
	.embed-artboard {
		background: white;
		width: 100%;
		height: 320px;
		position: relative;
		overflow: hidden;
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 16px rgba(0, 0, 0, 0.4);
	}

	.panic-slot { min-height: 200px; }
	/* ─────────────────────────────────────────────────── */

	.block-hint {
		margin-top: 16px;
		font-size: 13px;
		color: #c9c8c5;
		cursor: text;
	}
</style>
