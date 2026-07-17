<script lang="ts">
	import { base } from '$app/paths';
	import Logo from '$lib/components/Logo.svelte';
	import { FAQ, FAQ_LOCALES, LOCALE_LABELS } from '$lib/content/faq';
	import type { SupportedLocale } from '$lib/i18n';

	interface Props {
		lang: SupportedLocale;
	}

	let { lang }: Props = $props();

	const SITE = 'https://officeforms.pro';
	const content = $derived(FAQ[lang]);

	/** Absolute URL for hreflang/canonical (crawlers need absolute). */
	function faqUrl(l: SupportedLocale): string {
		return l === 'en' ? `${SITE}/faq` : `${SITE}/faq/${l}`;
	}
	/** Base-aware internal path for on-page links. */
	function faqPath(l: SupportedLocale): string {
		return l === 'en' ? `${base}/faq` : `${base}/faq/${l}`;
	}

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			inLanguage: lang,
			mainEntity: content.items.map((it) => ({
				'@type': 'Question',
				name: it.q,
				acceptedAnswer: { '@type': 'Answer', text: it.a }
			}))
		}).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{content.title}</title>
	<meta name="description" content={content.metaDescription} />
	<link rel="canonical" href={faqUrl(lang)} />
	{#each FAQ_LOCALES as l (l)}
		<link rel="alternate" hreflang={l} href={faqUrl(l)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={faqUrl('en')} />
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<div class="faq-page">
	<header class="faq-header">
		<a href="{base}/" class="brand" aria-label="OfficeForms"><Logo size={26} /></a>
		<nav class="langs" aria-label={content.langLabel}>
			{#each FAQ_LOCALES as l (l)}
				<a href={faqPath(l)} class="lang" class:active={l === lang} hreflang={l}>{l.toUpperCase()}</a>
			{/each}
		</nav>
	</header>

	<main class="faq-main">
		<h1 class="faq-title">{content.heading}</h1>
		<p class="faq-intro">{content.intro}</p>

		<div class="faq-list">
			{#each content.items as item (item.q)}
				<section class="faq-item">
					<h2 class="faq-q">{item.q}</h2>
					<p class="faq-a">{item.a}</p>
				</section>
			{/each}
		</div>

		<a href="{base}/" class="back">{content.backHome}</a>
	</main>

	<footer class="faq-footer">
		<span>OfficeForms · officeforms.pro</span>
	</footer>
</div>

<style>
	.faq-page {
		min-height: 100vh;
		min-height: 100dvh;
		background: var(--of-paper);
		color: var(--of-ink);
		font-family: var(--of-font);
		display: flex;
		flex-direction: column;
	}

	.faq-header {
		max-width: 820px;
		width: 100%;
		margin: 0 auto;
		padding: 20px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	.brand { text-decoration: none; display: inline-flex; }
	.langs { display: flex; gap: 2px; border: 1px solid var(--of-line); border-radius: 999px; overflow: hidden; background: var(--of-surface); }
	.lang {
		padding: 5px 11px;
		font-size: 11px;
		font-weight: 550;
		letter-spacing: 0.04em;
		color: var(--of-ink-muted);
		text-decoration: none;
	}
	.lang:hover { background: var(--of-paper); color: var(--of-ink); }
	.lang.active { background: var(--of-ink); color: #fff; }

	.faq-main {
		flex: 1;
		max-width: 820px;
		width: 100%;
		margin: 0 auto;
		padding: 24px 24px 64px;
	}

	.faq-title {
		font-size: 34px;
		font-weight: 700;
		letter-spacing: -0.03em;
		margin: 0 0 10px;
	}
	.faq-intro {
		font-size: 17px;
		line-height: 1.5;
		color: var(--of-ink-muted);
		margin: 0 0 36px;
		max-width: 640px;
	}

	.faq-list { display: flex; flex-direction: column; }
	.faq-item {
		padding: 22px 0;
		border-top: 1px solid var(--of-line);
	}
	.faq-q {
		font-size: 19px;
		font-weight: 650;
		letter-spacing: -0.01em;
		margin: 0 0 8px;
	}
	.faq-a {
		font-size: 16px;
		line-height: 1.62;
		color: var(--of-ink-muted);
		margin: 0;
		max-width: 680px;
	}

	.back {
		display: inline-block;
		margin-top: 36px;
		font-size: 15px;
		font-weight: 550;
		color: var(--of-brand);
		text-decoration: none;
	}
	.back:hover { text-decoration: underline; }

	.faq-footer {
		border-top: 1px solid var(--of-line);
		background: var(--of-surface);
		text-align: center;
		padding: 16px;
		font-size: 11px;
		color: var(--of-ink-faint);
	}

	@media (max-width: 560px) {
		.faq-title { font-size: 28px; }
	}
</style>
