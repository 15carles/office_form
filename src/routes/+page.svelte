<script lang="ts">
	import { t } from 'svelte-i18n';
	import { setLocale } from '$lib/i18n';
	import { prefs, streak } from '$lib/stores/progress';
	import SkinCard from '$lib/components/SkinCard.svelte';
	import DayBadge from '$lib/components/DayBadge.svelte';
	import type { SkinId } from '$lib/games/types';

	const SKINS: { id: SkinId; accent: string }[] = [
		{ id: 'excel',  accent: '#1f7145' },
		{ id: 'figma',  accent: '#f24e1e' },
		{ id: 'notion', accent: '#191919' }
	];

	const daily = { skinId: 'excel' as SkinId }; // just for featured highlight
	import { getGameOfDay } from '$lib/stores/gameOfDay';
	const todayCombo = getGameOfDay();

	const LOCALES = [
		{ code: 'es', label: 'ES' },
		{ code: 'en', label: 'EN' }
	];
</script>

<svelte:head>
	<title>Workflow Suite — Dashboard</title>
</svelte:head>

<div class="page">

	<!-- Header -->
	<header class="header">
		<div class="header-inner">
			<div class="logo">
				<span class="logo-mark">⊟</span>
				<span class="logo-text">{$t('home.title')}</span>
			</div>
			<nav class="header-nav">
				<!-- Language switcher — subtle, looks like a settings control -->
				<div class="lang-switcher">
					{#each LOCALES as loc}
						<button
							class="lang-btn"
							class:active={$prefs.locale === loc.code}
							onclick={() => setLocale(loc.code as 'en' | 'es')}
						>{loc.label}</button>
					{/each}
				</div>
			</nav>
		</div>
	</header>

	<main class="main">

		<!-- Hero -->
		<section class="hero">
			<h1 class="hero-title">{$t('home.subtitle')}</h1>

			<!-- Streak display (if any) -->
			{#if $streak.currentStreak > 1}
				<div class="streak-bar">
					<span class="streak-dot"></span>
					{$t('home.streakDays', { values: { count: $streak.currentStreak, record: $streak.longestStreak } })}
				</div>
			{/if}
		</section>

		<!-- Featured today -->
		<section class="section">
			<DayBadge />
		</section>

		<!-- Skin cards grid -->
		<section class="section">
			<h2 class="section-title">{$t('home.browse')}</h2>
			<div class="cards-grid">
				{#each SKINS as skin}
					<SkinCard
						skinId={skin.id}
						accent={skin.accent}
						featured={todayCombo.skinId === skin.id}
					/>
				{/each}
			</div>
		</section>

		<!-- Info bar -->
		<section class="info-bar">
			<div class="info-item">
				<span class="info-icon">⌨</span>
				<span>{$t('ui.panic.hint')}</span>
			</div>
			<div class="info-item">
				<span class="info-icon">⊟</span>
				<span>{$t('home.infoFullscreen')}</span>
			</div>
			<div class="info-item">
				<span class="info-icon">☁</span>
				<span>{$t('home.infoNoData')}</span>
			</div>
		</section>

	</main>

	<footer class="footer">
		<span>Workflow Suite · Internal productivity tools</span>
	</footer>
</div>

<style>
	.page {
		min-height: 100vh;
		background: #f5f5f4;
		display: flex;
		flex-direction: column;
		font-family: ui-sans-serif, 'Inter', 'Segoe UI', system-ui, sans-serif;
		overflow-y: auto;
	}

	/* Header */
	.header {
		background: white;
		border-bottom: 1px solid #e5e5e4;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.header-inner {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 32px;
		height: 52px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.logo-mark {
		font-size: 18px;
		color: #191919;
	}

	.logo-text {
		font-size: 15px;
		font-weight: 700;
		color: #191919;
		letter-spacing: -0.02em;
	}

	.header-nav { display: flex; align-items: center; gap: 12px; }

	.lang-switcher {
		display: flex;
		border: 1px solid #e5e5e4;
		overflow: hidden;
	}

	.lang-btn {
		padding: 4px 10px;
		font-size: 11px;
		background: white;
		border: none;
		cursor: pointer;
		color: #888;
		font-family: inherit;
		font-weight: 500;
		letter-spacing: 0.04em;
	}

	.lang-btn + .lang-btn { border-left: 1px solid #e5e5e4; }
	.lang-btn.active { background: #191919; color: white; }
	.lang-btn:hover:not(.active) { background: #f5f5f4; }

	/* Main */
	.main {
		flex: 1;
		max-width: 1100px;
		margin: 0 auto;
		width: 100%;
		padding: 40px 32px 48px;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	/* Hero */
	.hero { display: flex; flex-direction: column; gap: 12px; }

	.hero-title {
		font-size: 22px;
		font-weight: 600;
		color: #191919;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.streak-bar {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: #888;
		background: white;
		border: 1px solid #e5e5e4;
		padding: 5px 12px;
		width: fit-content;
	}

	.streak-dot {
		width: 7px; height: 7px;
		border-radius: 50%;
		background: #f24e1e;
	}

	/* Section */
	.section { display: flex; flex-direction: column; gap: 14px; }

	.section-title {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: #999;
		margin: 0;
	}

	/* Cards grid */
	.cards-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	@media (max-width: 800px) {
		.cards-grid { grid-template-columns: 1fr; }
	}

	/* Info bar */
	.info-bar {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
	}

	.info-item {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: #aaa;
	}

	.info-icon { font-size: 14px; }

	kbd {
		background: #f0f0ef;
		border: 1px solid #ddd;
		padding: 1px 5px;
		font-size: 10px;
		font-family: inherit;
		border-radius: 2px;
	}

	/* Footer */
	.footer {
		border-top: 1px solid #e5e5e4;
		padding: 14px 32px;
		font-size: 11px;
		color: #bbb;
		text-align: center;
		background: white;
	}
</style>
