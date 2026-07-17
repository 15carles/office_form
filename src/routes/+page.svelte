<script lang="ts">
	import { t } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { setLocale, type SupportedLocale } from '$lib/i18n';
	import { prefs, streak } from '$lib/stores/progress';
	import { getGameOfDay } from '$lib/stores/gameOfDay';
	import { SKINS } from '$lib/skins/registry';
	import Logo from '$lib/components/Logo.svelte';
	import SkinCard from '$lib/components/SkinCard.svelte';
	import DayBadge from '$lib/components/DayBadge.svelte';

	const todayCombo = getGameOfDay();

	const LOCALES: { code: SupportedLocale; label: string }[] = [
		{ code: 'es', label: 'ES' },
		{ code: 'en', label: 'EN' },
		{ code: 'de', label: 'DE' },
		{ code: 'it', label: 'IT' },
		{ code: 'fr', label: 'FR' }
	];
</script>

<svelte:head>
	<title>OfficeForms — Dashboard</title>
</svelte:head>

<div class="page">

	<!-- Header -->
	<header class="header">
		<div class="header-inner">
			<a href="{base}/" class="brand" aria-label="OfficeForms">
				<Logo size={26} />
			</a>
			<nav class="header-nav">
				<div class="lang-switcher">
					{#each LOCALES as loc (loc.code)}
						<button
							class="lang-btn"
							class:active={$prefs.locale === loc.code}
							onclick={() => setLocale(loc.code)}
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
			<p class="hero-tagline">{$t('home.tagline')}</p>

			<div class="hero-actions">
				<a class="cta" href="{base}/{todayCombo.skinId}/{todayCombo.gameId}">
					{$t('home.openFeatured')}
					<span class="cta-arrow">→</span>
				</a>

				{#if $streak.currentStreak > 1}
					<div class="streak-chip">
						<span class="streak-dot"></span>
						{$t('home.streak', {
							values: { current: $streak.currentStreak, longest: $streak.longestStreak }
						})}
					</div>
				{/if}
			</div>
		</section>

		<!-- Featured today (the badge carries its own label) -->
		<section class="section">
			<DayBadge />
		</section>

		<!-- Skin cards grid -->
		<section class="section">
			<h2 class="section-title">{$t('home.browse')}</h2>
			<div class="cards-grid">
				{#each SKINS as skin (skin.id)}
					<SkinCard
						skinId={skin.id}
						accent={skin.accentColor}
						featured={todayCombo.skinId === skin.id}
					/>
				{/each}
			</div>
		</section>

		<!-- Info bar -->
		<section class="info-bar">
			<div class="info-item">
				<span class="info-icon">⌨</span>
				<span>{$t('home.hintEsc', { values: { key: 'Esc' } })}</span>
			</div>
			<div class="info-item">
				<span class="info-icon">⊟</span>
				<span>{$t('home.hintFullscreen')}</span>
			</div>
			<div class="info-item">
				<span class="info-icon">☁</span>
				<span>{$t('home.hintPrivacy')}</span>
			</div>
		</section>

	</main>

	<footer class="footer">
		<span class="footer-brand">{$t('home.footer')}</span>
		<span class="footer-domain">officeforms.pro</span>
	</footer>
</div>

<style>
	.page {
		min-height: 100vh;
		background: var(--of-paper);
		display: flex;
		flex-direction: column;
		font-family: var(--of-font);
		color: var(--of-ink);
		overflow-y: auto;
	}

	/* ── Header ─────────────────────────────────────── */
	.header {
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--of-line);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.header-inner {
		max-width: 1040px;
		margin: 0 auto;
		padding: 0 32px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.brand {
		text-decoration: none;
		display: inline-flex;
	}

	.header-nav { display: flex; align-items: center; gap: 12px; }

	.lang-switcher {
		display: flex;
		border: 1px solid var(--of-line);
		border-radius: 999px;
		overflow: hidden;
		background: var(--of-surface);
	}

	.lang-btn {
		padding: 5px 12px;
		font-size: 11px;
		background: transparent;
		border: none;
		cursor: pointer;
		color: var(--of-ink-muted);
		font-family: inherit;
		font-weight: 550;
		letter-spacing: 0.04em;
		transition: background 0.12s, color 0.12s;
	}

	.lang-btn.active { background: var(--of-ink); color: white; }
	.lang-btn:hover:not(.active) { background: var(--of-paper); color: var(--of-ink); }

	/* ── Main ───────────────────────────────────────── */
	.main {
		flex: 1;
		max-width: 1040px;
		margin: 0 auto;
		width: 100%;
		padding: 56px 32px 64px;
		display: flex;
		flex-direction: column;
		gap: 44px;
	}

	/* ── Hero ───────────────────────────────────────── */
	.hero {
		display: flex;
		flex-direction: column;
		gap: 14px;
		max-width: 560px;
	}

	.hero-title {
		font-size: 32px;
		font-weight: 650;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: var(--of-ink);
		margin: 0;
	}

	.hero-tagline {
		font-size: 15px;
		line-height: 1.55;
		color: var(--of-ink-muted);
		margin: 0;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
		margin-top: 8px;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--of-brand);
		color: white;
		text-decoration: none;
		font-size: 13px;
		font-weight: 550;
		padding: 10px 18px;
		border-radius: var(--of-radius);
		transition: background 0.12s, transform 0.12s;
	}

	.cta:hover { background: var(--of-brand-hover); transform: translateY(-1px); }

	.cta-arrow { transition: transform 0.12s; }
	.cta:hover .cta-arrow { transform: translateX(2px); }

	.streak-chip {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: var(--of-ink-muted);
		background: var(--of-surface);
		border: 1px solid var(--of-line);
		border-radius: 999px;
		padding: 6px 14px;
	}

	.streak-dot {
		width: 7px; height: 7px;
		border-radius: 50%;
		background: var(--of-brand);
	}

	/* ── Sections ───────────────────────────────────── */
	.section { display: flex; flex-direction: column; gap: 14px; }

	.section-title {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--of-ink-faint);
		margin: 0;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
		gap: 18px;
	}

	@media (max-width: 800px) {
		.cards-grid { grid-template-columns: 1fr; }
		.main { padding: 36px 20px 48px; }
		.header-inner { padding: 0 20px; }
	}

	/* ── Info bar ───────────────────────────────────── */
	.info-bar {
		display: flex;
		gap: 28px;
		flex-wrap: wrap;
		border-top: 1px solid var(--of-line);
		padding-top: 24px;
	}

	.info-item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: var(--of-ink-faint);
	}

	.info-icon { font-size: 14px; }

	/* ── Footer ─────────────────────────────────────── */
	.footer {
		border-top: 1px solid var(--of-line);
		padding: 16px 32px;
		font-size: 11px;
		color: var(--of-ink-faint);
		background: var(--of-surface);
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.footer-domain::before {
		content: '·';
		margin-right: 8px;
	}
</style>
