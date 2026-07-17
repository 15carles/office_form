import type { SupportedLocale } from '$lib/i18n';

export interface FaqItem {
	q: string;
	a: string;
}

export interface FaqContent {
	/** <title> — unique per locale, keyword-led. */
	title: string;
	metaDescription: string;
	heading: string;
	intro: string;
	items: FaqItem[];
	backHome: string;
	langLabel: string;
}

export const FAQ_LOCALES: SupportedLocale[] = ['en', 'es', 'de', 'it', 'fr'];

/** Human-readable label for the language links. */
export const LOCALE_LABELS: Record<SupportedLocale, string> = {
	en: 'English',
	es: 'Español',
	de: 'Deutsch',
	it: 'Italiano',
	fr: 'Français'
};

export const FAQ: Record<SupportedLocale, FaqContent> = {
	en: {
		title: 'FAQ — Browser games disguised as office apps | OfficeForms',
		metaDescription:
			'Frequently asked questions about OfficeForms: free browser games (Snake, Tetris, typing) disguised as Excel, Outlook, Slack, Teams, Notion, Figma and Salesforce, with a one-key panic button.',
		heading: 'Frequently asked questions',
		intro:
			'Everything about OfficeForms — the free browser games hidden inside everyday office apps.',
		backHome: '← Back to OfficeForms',
		langLabel: 'Language',
		items: [
			{
				q: 'What is OfficeForms?',
				a: 'OfficeForms is a free website where classic browser games — Snake, Tetris and a typing-speed test — are disguised as everyday office apps such as Excel, Outlook, Slack, Teams, Notion, Figma and Salesforce. It runs entirely in your browser, with no account and nothing to install.'
			},
			{
				q: 'How do I hide the game quickly?',
				a: 'Press the Esc key. It instantly swaps the game for a realistic, static "work" view — a spreadsheet, an email thread or a chat — so anyone glancing at your screen just sees an ordinary office tool. Press Esc again to carry on playing. It works like a classic "boss key".'
			},
			{
				q: 'Which games can I play?',
				a: 'Three: Snake, Tetris and a typing benchmark. Each game is skinned to match the office app you pick, so it blends into the interface instead of looking like a game.'
			},
			{
				q: 'Which office apps can it look like?',
				a: 'Seven work environments so far: Excel (spreadsheet), Outlook (email), Microsoft Teams and Slack (chat), Notion (docs), Figma (design) and Salesforce (CRM). More can be added over time.'
			},
			{
				q: 'Is it free? Do I need an account?',
				a: 'It is completely free and there is no sign-up or download. Just open the site and play.'
			},
			{
				q: 'Does OfficeForms track me or send my data anywhere?',
				a: 'No. There are no accounts, and the games run locally in your browser — your scores and streak are saved only on your own device.'
			},
			{
				q: 'Does it work on mobile?',
				a: 'It works best on a desktop or laptop with a keyboard, because the games and the Esc panic shortcut are keyboard-based. It loads on phones, but the experience is designed for a work computer.'
			},
			{
				q: 'Can my coworkers tell it is a game?',
				a: 'Each environment is a careful visual replica — layout, colours and typography — of the real app, and the panic view looks like genuine work content, so at a glance it passes as an ordinary office tool. OfficeForms does not use the real company logos.'
			},
			{
				q: 'What languages is OfficeForms available in?',
				a: 'Five: English, Spanish, German, Italian and French. Both the interface and the disguised content follow the language you choose.'
			}
		]
	},
	es: {
		title: 'FAQ — Juegos de navegador disfrazados de apps de oficina | OfficeForms',
		metaDescription:
			'Preguntas frecuentes sobre OfficeForms: juegos de navegador gratis (Snake, Tetris, mecanografía) disfrazados de Excel, Outlook, Slack, Teams, Notion, Figma y Salesforce, con un botón de pánico de una sola tecla.',
		heading: 'Preguntas frecuentes',
		intro:
			'Todo sobre OfficeForms — los juegos de navegador gratuitos escondidos dentro de tus apps de oficina.',
		backHome: '← Volver a OfficeForms',
		langLabel: 'Idioma',
		items: [
			{
				q: '¿Qué es OfficeForms?',
				a: 'OfficeForms es una web gratuita donde juegos clásicos de navegador —Snake, Tetris y un test de mecanografía— van disfrazados de apps de oficina como Excel, Outlook, Slack, Teams, Notion, Figma y Salesforce. Funciona íntegramente en tu navegador, sin cuenta y sin instalar nada.'
			},
			{
				q: '¿Cómo oculto el juego al instante?',
				a: 'Pulsa la tecla Esc. Cambia el juego al momento por una vista de "trabajo" realista y estática —una hoja de cálculo, un hilo de correo o un chat—, de modo que quien mire tu pantalla solo ve una herramienta de oficina normal. Pulsa Esc otra vez para seguir jugando. Funciona como la clásica "tecla de pánico".'
			},
			{
				q: '¿A qué juegos puedo jugar?',
				a: 'A tres: Snake, Tetris y un benchmark de escritura. Cada juego se adapta visualmente a la app de oficina que elijas, así se camufla en la interfaz en vez de parecer un juego.'
			},
			{
				q: '¿De qué apps de oficina puede tener el aspecto?',
				a: 'De siete entornos de trabajo por ahora: Excel (hoja de cálculo), Outlook (correo), Microsoft Teams y Slack (chat), Notion (documentos), Figma (diseño) y Salesforce (CRM). Se irán añadiendo más.'
			},
			{
				q: '¿Es gratis? ¿Necesito una cuenta?',
				a: 'Es totalmente gratis y no hay registro ni descarga. Solo abre la web y juega.'
			},
			{
				q: '¿OfficeForms me rastrea o envía mis datos a algún sitio?',
				a: 'No. No hay cuentas y los juegos funcionan en local, en tu navegador: tus puntuaciones y tu racha se guardan únicamente en tu dispositivo.'
			},
			{
				q: '¿Funciona en el móvil?',
				a: 'Funciona mejor en un ordenador de sobremesa o portátil con teclado, porque los juegos y el atajo de pánico (Esc) se basan en el teclado. Carga en el móvil, pero la experiencia está pensada para un ordenador de trabajo.'
			},
			{
				q: '¿Se nota que es un juego?',
				a: 'Cada entorno es una réplica visual cuidada —disposición, colores y tipografía— de la app real, y la vista de pánico parece contenido de trabajo auténtico, así que de un vistazo pasa por una herramienta de oficina normal. OfficeForms no usa los logotipos reales de las marcas.'
			},
			{
				q: '¿En qué idiomas está OfficeForms?',
				a: 'En cinco: inglés, español, alemán, italiano y francés. Tanto la interfaz como el contenido disfrazado siguen el idioma que elijas.'
			}
		]
	},
	de: {
		title: 'FAQ — Als Office-Apps getarnte Browserspiele | OfficeForms',
		metaDescription:
			'Häufige Fragen zu OfficeForms: kostenlose Browserspiele (Snake, Tetris, Tipptest) getarnt als Excel, Outlook, Slack, Teams, Notion, Figma und Salesforce, mit einer Panik-Taste.',
		heading: 'Häufig gestellte Fragen',
		intro:
			'Alles über OfficeForms — die kostenlosen Browserspiele, versteckt in alltäglichen Office-Apps.',
		backHome: '← Zurück zu OfficeForms',
		langLabel: 'Sprache',
		items: [
			{
				q: 'Was ist OfficeForms?',
				a: 'OfficeForms ist eine kostenlose Website, auf der klassische Browserspiele — Snake, Tetris und ein Tipptest — als alltägliche Office-Apps wie Excel, Outlook, Slack, Teams, Notion, Figma und Salesforce getarnt sind. Alles läuft im Browser, ohne Konto und ohne Installation.'
			},
			{
				q: 'Wie blende ich das Spiel schnell aus?',
				a: 'Drücke die Esc-Taste. Sie ersetzt das Spiel sofort durch eine realistische, statische „Arbeits"-Ansicht — eine Tabelle, einen E-Mail-Verlauf oder einen Chat —, sodass ein Blick auf deinen Bildschirm nur ein gewöhnliches Office-Tool zeigt. Erneut Esc drücken, um weiterzuspielen. Es funktioniert wie eine klassische „Chef-Taste".'
			},
			{
				q: 'Welche Spiele kann ich spielen?',
				a: 'Drei: Snake, Tetris und einen Tipp-Benchmark. Jedes Spiel ist optisch an die gewählte Office-App angepasst und fügt sich so in die Oberfläche ein, statt wie ein Spiel auszusehen.'
			},
			{
				q: 'Wie welche Office-Apps kann es aussehen?',
				a: 'Bislang sieben Arbeitsumgebungen: Excel (Tabelle), Outlook (E-Mail), Microsoft Teams und Slack (Chat), Notion (Dokumente), Figma (Design) und Salesforce (CRM). Weitere kommen mit der Zeit hinzu.'
			},
			{
				q: 'Ist es kostenlos? Brauche ich ein Konto?',
				a: 'Es ist völlig kostenlos, ohne Registrierung und ohne Download. Einfach die Seite öffnen und spielen.'
			},
			{
				q: 'Verfolgt OfficeForms mich oder sendet meine Daten irgendwohin?',
				a: 'Nein. Es gibt keine Konten, und die Spiele laufen lokal in deinem Browser — deine Punkte und deine Serie werden nur auf deinem eigenen Gerät gespeichert.'
			},
			{
				q: 'Funktioniert es auf dem Handy?',
				a: 'Am besten funktioniert es auf einem Desktop oder Laptop mit Tastatur, da die Spiele und die Esc-Panik-Taste auf der Tastatur beruhen. Es lädt auf dem Handy, ist aber für einen Arbeitscomputer konzipiert.'
			},
			{
				q: 'Merken Kollegen, dass es ein Spiel ist?',
				a: 'Jede Umgebung ist eine sorgfältige visuelle Nachbildung — Layout, Farben und Typografie — der echten App, und die Panik-Ansicht sieht aus wie echter Arbeitsinhalt. Auf den ersten Blick geht sie als gewöhnliches Office-Tool durch. OfficeForms verwendet keine echten Firmenlogos.'
			},
			{
				q: 'In welchen Sprachen gibt es OfficeForms?',
				a: 'In fünf: Englisch, Spanisch, Deutsch, Italienisch und Französisch. Sowohl die Oberfläche als auch der getarnte Inhalt folgen der gewählten Sprache.'
			}
		]
	},
	it: {
		title: 'FAQ — Giochi da browser travestiti da app per ufficio | OfficeForms',
		metaDescription:
			'Domande frequenti su OfficeForms: giochi da browser gratuiti (Snake, Tetris, test di digitazione) travestiti da Excel, Outlook, Slack, Teams, Notion, Figma e Salesforce, con un pulsante panico a un solo tasto.',
		heading: 'Domande frequenti',
		intro:
			'Tutto su OfficeForms — i giochi da browser gratuiti nascosti dentro le app per ufficio di ogni giorno.',
		backHome: '← Torna a OfficeForms',
		langLabel: 'Lingua',
		items: [
			{
				q: 'Che cos’è OfficeForms?',
				a: 'OfficeForms è un sito gratuito dove giochi classici da browser — Snake, Tetris e un test di digitazione — sono travestiti da app per ufficio come Excel, Outlook, Slack, Teams, Notion, Figma e Salesforce. Funziona interamente nel browser, senza account e senza installare nulla.'
			},
			{
				q: 'Come nascondo il gioco all’istante?',
				a: 'Premi il tasto Esc. Sostituisce subito il gioco con una vista di "lavoro" realistica e statica — un foglio di calcolo, un thread di email o una chat — così chi guarda lo schermo vede solo un normale strumento da ufficio. Premi di nuovo Esc per continuare a giocare. Funziona come il classico "tasto capo".'
			},
			{
				q: 'A quali giochi posso giocare?',
				a: 'A tre: Snake, Tetris e un benchmark di digitazione. Ogni gioco è personalizzato per adattarsi all’app per ufficio scelta, così si mimetizza nell’interfaccia invece di sembrare un gioco.'
			},
			{
				q: 'A quali app per ufficio può somigliare?',
				a: 'Per ora a sette ambienti di lavoro: Excel (foglio di calcolo), Outlook (email), Microsoft Teams e Slack (chat), Notion (documenti), Figma (design) e Salesforce (CRM). Altri verranno aggiunti col tempo.'
			},
			{
				q: 'È gratis? Serve un account?',
				a: 'È completamente gratis, senza registrazione né download. Basta aprire il sito e giocare.'
			},
			{
				q: 'OfficeForms mi traccia o invia i miei dati da qualche parte?',
				a: 'No. Non ci sono account e i giochi funzionano in locale nel browser: i tuoi punteggi e la tua serie sono salvati solo sul tuo dispositivo.'
			},
			{
				q: 'Funziona su mobile?',
				a: 'Funziona meglio su desktop o laptop con tastiera, perché i giochi e la scorciatoia panico (Esc) si basano sulla tastiera. Si carica su telefono, ma l’esperienza è pensata per un computer da lavoro.'
			},
			{
				q: 'I colleghi si accorgono che è un gioco?',
				a: 'Ogni ambiente è un’accurata replica visiva — layout, colori e tipografia — dell’app reale, e la vista panico sembra vero contenuto di lavoro, quindi a colpo d’occhio passa per un normale strumento da ufficio. OfficeForms non usa i loghi reali delle aziende.'
			},
			{
				q: 'In quali lingue è disponibile OfficeForms?',
				a: 'In cinque: inglese, spagnolo, tedesco, italiano e francese. Sia l’interfaccia sia il contenuto travestito seguono la lingua scelta.'
			}
		]
	},
	fr: {
		title: 'FAQ — Jeux de navigateur déguisés en applis de bureau | OfficeForms',
		metaDescription:
			'Questions fréquentes sur OfficeForms : jeux de navigateur gratuits (Snake, Tetris, test de frappe) déguisés en Excel, Outlook, Slack, Teams, Notion, Figma et Salesforce, avec un bouton panique à une seule touche.',
		heading: 'Questions fréquentes',
		intro:
			'Tout sur OfficeForms — les jeux de navigateur gratuits cachés dans les applis de bureau du quotidien.',
		backHome: '← Retour à OfficeForms',
		langLabel: 'Langue',
		items: [
			{
				q: 'Qu’est-ce qu’OfficeForms ?',
				a: 'OfficeForms est un site gratuit où des jeux de navigateur classiques — Snake, Tetris et un test de frappe — sont déguisés en applis de bureau comme Excel, Outlook, Slack, Teams, Notion, Figma et Salesforce. Tout fonctionne dans le navigateur, sans compte et sans rien installer.'
			},
			{
				q: 'Comment masquer le jeu instantanément ?',
				a: 'Appuyez sur la touche Échap. Elle remplace aussitôt le jeu par une vue « travail » réaliste et statique — un tableur, un fil d’e-mails ou une messagerie — de sorte qu’un coup d’œil sur votre écran ne montre qu’un outil de bureau ordinaire. Appuyez de nouveau sur Échap pour reprendre. Cela fonctionne comme une « touche panique » classique.'
			},
			{
				q: 'À quels jeux puis-je jouer ?',
				a: 'À trois : Snake, Tetris et un test de vitesse de frappe. Chaque jeu est habillé pour correspondre à l’appli de bureau choisie, afin de se fondre dans l’interface plutôt que de ressembler à un jeu.'
			},
			{
				q: 'À quelles applis de bureau peut-il ressembler ?',
				a: 'À sept environnements de travail pour l’instant : Excel (tableur), Outlook (e-mail), Microsoft Teams et Slack (messagerie), Notion (documents), Figma (design) et Salesforce (CRM). D’autres seront ajoutés.'
			},
			{
				q: 'Est-ce gratuit ? Faut-il un compte ?',
				a: 'C’est entièrement gratuit, sans inscription ni téléchargement. Ouvrez simplement le site et jouez.'
			},
			{
				q: 'OfficeForms me suit-il ou envoie-t-il mes données quelque part ?',
				a: 'Non. Il n’y a pas de comptes et les jeux fonctionnent en local dans votre navigateur : vos scores et votre série ne sont enregistrés que sur votre appareil.'
			},
			{
				q: 'Est-ce que ça marche sur mobile ?',
				a: 'Cela fonctionne mieux sur un ordinateur de bureau ou portable avec clavier, car les jeux et le raccourci panique (Échap) reposent sur le clavier. Le site se charge sur mobile, mais l’expérience est pensée pour un ordinateur de travail.'
			},
			{
				q: 'Mes collègues peuvent-ils voir que c’est un jeu ?',
				a: 'Chaque environnement est une réplique visuelle soignée — disposition, couleurs et typographie — de l’appli réelle, et la vue panique ressemble à un vrai contenu de travail : au premier coup d’œil, cela passe pour un outil de bureau ordinaire. OfficeForms n’utilise pas les vrais logos des marques.'
			},
			{
				q: 'Dans quelles langues OfficeForms est-il disponible ?',
				a: 'En cinq : anglais, espagnol, allemand, italien et français. L’interface comme le contenu déguisé suivent la langue choisie.'
			}
		]
	}
};
