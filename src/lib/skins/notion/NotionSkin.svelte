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

		<div class="doc-content">
			<div class="page-icon">📋</div>
			<h1 class="page-title">Reunión semanal</h1>
			<div class="page-meta">{today} · {statusText || 'Editado hace unos segundos'}</div>

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

			<!-- Inline database block — game lives here -->
			<div class="db-block">

				<!-- Database header -->
				<div class="db-header">
					<span class="db-icon">📊</span>
					<span class="db-title">Métricas sesión</span>
					<div class="db-views">
						<button class="db-view active" tabindex="-1">Table</button>
						<button class="db-view" tabindex="-1">Board</button>
						<button class="db-view" tabindex="-1">Chart</button>
					</div>
					<div class="db-actions">
						<button class="db-btn" tabindex="-1">Filter</button>
						<button class="db-btn" tabindex="-1">Sort</button>
						<button class="db-btn" tabindex="-1">···</button>
					</div>
				</div>

				<!-- Column headers -->
				<div class="db-cols">
					<span class="col-name">Nombre</span>
					<span class="col-val">Valor</span>
					<span class="col-tag">Estado</span>
				</div>

				<!-- Game area (looks like table content) -->
				<div class="db-content" style:display={$panicMode ? 'none' : 'block'}>
					{#if children}
						{@render children()}
					{/if}
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
		width: 240px; min-width: 240px;
		background: #f7f6f3; border-right: 1px solid #e9e9e7;
		display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0;
	}
	.workspace-header {
		height: 44px; display: flex; align-items: center; gap: 8px;
		padding: 0 12px; border-bottom: 1px solid #e9e9e7; flex-shrink: 0;
	}
	.workspace-icon {
		width: 24px; height: 24px; background: #191919; color: white;
		border-radius: 4px; display: flex; align-items: center; justify-content: center;
		font-size: 12px;
	}
	.workspace-name { flex: 1; font-size: 13px; font-weight: 600; }
	.sidebar-action {
		width: 24px; height: 24px; background: transparent; border: none;
		color: #9b9a97; font-size: 16px; cursor: pointer; border-radius: 3px;
		display: flex; align-items: center; justify-content: center;
	}
	.sidebar-action:hover { background: #ebebea; }
	.sidebar-section { padding: 6px 0; }
	.sidebar-label {
		font-size: 10px; color: #9b9a97; text-transform: uppercase;
		letter-spacing: 0.05em; padding: 4px 12px; margin-bottom: 2px;
	}
	.sidebar-item {
		display: flex; align-items: center; gap: 7px; padding: 4px 12px;
		font-size: 13px; color: #37352f; cursor: default;
		border-radius: 4px; margin: 0 4px;
	}
	.sidebar-item:hover { background: #ebebea; }
	.sidebar-item.active { background: #ebebea; font-weight: 500; }
	.sidebar-item.muted { color: #9b9a97; font-size: 12px; }
	.sidebar-item.small { font-size: 11px; padding: 2px 12px; }
	.page-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.sidebar-divider { height: 1px; background: #e9e9e7; margin: 4px 0; }
	.sidebar-footer { margin-top: auto; padding: 8px 0; border-top: 1px solid #e9e9e7; }

	/* Doc area */
	.doc-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
	.doc-topbar {
		height: 44px; display: flex; align-items: center;
		justify-content: space-between; padding: 0 24px;
		border-bottom: 1px solid #e9e9e7; flex-shrink: 0;
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
		flex: 1; overflow-y: auto;
		padding: 48px 96px; max-width: 900px;
	}
	.page-icon { font-size: 48px; margin-bottom: 8px; }
	.page-title {
		font-size: 32px; font-weight: 700; color: #37352f;
		margin: 0 0 4px; line-height: 1.2;
	}
	.page-meta { font-size: 12px; color: #9b9a97; margin-bottom: 20px; }

	.properties { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
	.prop-row { display: flex; align-items: center; gap: 12px; font-size: 13px; }
	.prop-key { color: #9b9a97; width: 100px; flex-shrink: 0; font-size: 12px; }
	.prop-val { color: #37352f; }
	.prop-val.metric { font-weight: 700; color: #191919; }
	.tag { display: inline-block; padding: 1px 8px; border-radius: 3px; font-size: 12px; }
	.tag.in-progress { background: #dbeafe; color: #1d4ed8; }
	.divider { height: 1px; background: #e9e9e7; margin: 16px 0; }

	/* ── Inline database block ─────────────────────────── */
	.db-block {
		border: 1px solid #e9e9e7;
		border-radius: 3px;
		overflow: hidden;
		background: white;
	}

	.db-header {
		display: flex; align-items: center; gap: 6px;
		padding: 6px 10px;
		border-bottom: 1px solid #e9e9e7;
		background: white;
	}
	.db-icon { font-size: 13px; flex-shrink: 0; }
	.db-title { font-size: 12px; font-weight: 600; color: #37352f; flex: 1; }

	.db-views { display: flex; gap: 1px; }
	.db-view {
		padding: 2px 8px; font-size: 11px; border-radius: 3px;
		border: none; background: transparent; cursor: pointer;
		color: #9b9a97; font-family: inherit;
	}
	.db-view.active { background: #ebebea; color: #37352f; font-weight: 500; }
	.db-view:hover:not(.active) { background: #f7f6f3; }

	.db-actions { display: flex; gap: 1px; }
	.db-btn {
		padding: 2px 7px; font-size: 11px; color: #9b9a97;
		border: none; background: transparent; cursor: pointer;
		border-radius: 3px; font-family: inherit;
	}
	.db-btn:hover { background: #f7f6f3; color: #37352f; }

	/* Column headers */
	.db-cols {
		display: flex; align-items: center;
		padding: 0 10px; height: 28px;
		border-bottom: 1px solid #e9e9e7;
		background: #fafafa;
	}
	.col-name { flex: 1; font-size: 11px; color: #9b9a97; font-weight: 500; }
	.col-val { width: 80px; font-size: 11px; color: #9b9a97; font-weight: 500; }
	.col-tag { width: 80px; font-size: 11px; color: #9b9a97; font-weight: 500; }

	/* Game content — white background, no contrast issues */
	.db-content {
		background: white;
		height: 380px;
		position: relative;
		overflow: hidden;
	}

	.panic-slot { min-height: 200px; }
	/* ─────────────────────────────────────────────────── */

	.block-hint {
		margin-top: 16px; font-size: 13px; color: #c9c8c5; cursor: text;
	}
</style>
