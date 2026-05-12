<script lang="ts">
	import { t } from 'svelte-i18n';
	import { getGameOfDay } from '$lib/stores/gameOfDay';

	const daily = getGameOfDay();

	const SKINS = [
		{ id: 'excel', color: '#1f7145', icon: '⊞' },
		{ id: 'figma', color: '#f24e1e', icon: '◈' },
		{ id: 'notion', color: '#191919', icon: '☰' }
	] as const;
</script>

<svelte:head>
	<title>Workflow Suite — Dashboard</title>
</svelte:head>

<main>
	<header>
		<h1>{$t('home.title')}</h1>
		<p>{$t('home.subtitle')}</p>
	</header>

	<section class="featured">
		<span class="badge">{$t('home.featured')}</span>
		<a href="/{daily.skinId}/{daily.gameId}" class="featured-card">
			<div class="featured-preview" style="--accent: {SKINS.find(s => s.id === daily.skinId)?.color}">
				<span class="featured-icon">{SKINS.find(s => s.id === daily.skinId)?.icon}</span>
			</div>
			<div class="featured-info">
				<strong>{$t(`skins.${daily.skinId}.name`)}</strong>
				<span>{$t(`games.${daily.gameId}.name`)}</span>
			</div>
		</a>
	</section>

	<section class="grid">
		<h2>{$t('home.browse')}</h2>
		<div class="cards">
			{#each SKINS as skin}
				<a href="/{skin.id}" class="card">
					<div class="card-preview" style="--accent: {skin.color}">
						<span class="card-icon">{skin.icon}</span>
					</div>
					<div class="card-info">
						<strong>{$t(`skins.${skin.id}.name`)}</strong>
						<p>{$t(`skins.${skin.id}.description`)}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
</main>

<style>
	main {
		min-height: 100vh;
		background: #f5f5f5;
		padding: 48px 32px;
		font-family: var(--skin-font-family);
		overflow-y: auto;
	}

	header {
		margin-bottom: 40px;
	}

	header h1 {
		font-size: 24px;
		font-weight: 600;
		color: #111;
		margin-bottom: 6px;
	}

	header p {
		font-size: 13px;
		color: #666;
	}

	.featured {
		margin-bottom: 40px;
	}

	.badge {
		display: inline-block;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
		margin-bottom: 10px;
	}

	.featured-card {
		display: flex;
		align-items: center;
		gap: 16px;
		background: white;
		border: 1px solid #e0e0e0;
		padding: 16px 20px;
		text-decoration: none;
		color: inherit;
		max-width: 400px;
		transition: border-color 0.15s;
	}

	.featured-card:hover {
		border-color: var(--accent, #1f7145);
	}

	.featured-preview {
		width: 48px;
		height: 48px;
		background: var(--accent, #1f7145);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.featured-icon {
		font-size: 20px;
		color: white;
	}

	.featured-info {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.featured-info strong {
		font-size: 13px;
		font-weight: 600;
		color: #111;
	}

	.featured-info span {
		font-size: 12px;
		color: #888;
	}

	.grid h2 {
		font-size: 13px;
		font-weight: 600;
		color: #555;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 14px;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 12px;
	}

	.card {
		display: flex;
		align-items: center;
		gap: 14px;
		background: white;
		border: 1px solid #e0e0e0;
		padding: 14px 16px;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.card:hover {
		border-color: var(--accent, #333);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.card-preview {
		width: 40px;
		height: 40px;
		background: var(--accent, #333);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.card-icon {
		font-size: 16px;
		color: white;
	}

	.card-info {
		flex: 1;
		min-width: 0;
	}

	.card-info strong {
		display: block;
		font-size: 13px;
		font-weight: 600;
		color: #111;
		margin-bottom: 2px;
	}

	.card-info p {
		font-size: 11px;
		color: #888;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
