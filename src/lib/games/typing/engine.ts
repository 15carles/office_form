export interface TypingState {
	words: string[];
	currentIndex: number;
	typed: string;
	correctChars: number;
	errors: number;
	startTime: number | null;
	endTime: number | null;
	status: 'idle' | 'running' | 'over';
	wpm: number;
	accuracy: number;
}

// Word pool — business-neutral, plausible in an office context
const WORD_POOL_EN = [
	'report', 'budget', 'quarter', 'revenue', 'analysis', 'forecast',
	'project', 'meeting', 'schedule', 'deadline', 'proposal', 'strategy',
	'client', 'invoice', 'contract', 'review', 'target', 'growth',
	'update', 'pipeline', 'priority', 'workflow', 'dashboard', 'metrics',
	'summary', 'market', 'product', 'service', 'delivery', 'support',
	'feedback', 'launch', 'impact', 'resource', 'agenda', 'sprint',
	'release', 'ticket', 'status', 'module', 'feature', 'version',
	'system', 'process', 'output', 'input', 'dataset', 'cluster'
];

const WORD_POOL_ES = [
	'informe', 'presupuesto', 'trimestre', 'ingresos', 'análisis',
	'proyecto', 'reunión', 'agenda', 'objetivo', 'estrategia',
	'cliente', 'factura', 'contrato', 'revisión', 'previsión',
	'crecimiento', 'mercado', 'producto', 'servicio', 'entrega',
	'estado', 'módulo', 'proceso', 'recurso', 'métrica', 'sistema',
	'impacto', 'equipo', 'resultado', 'criterio', 'versión', 'datos'
];

const WORD_POOL_DE = [
	'bericht', 'budget', 'quartal', 'umsatz', 'analyse', 'prognose',
	'projekt', 'termin', 'zeitplan', 'frist', 'angebot', 'strategie',
	'kunde', 'rechnung', 'vertrag', 'prüfung', 'ziel', 'wachstum',
	'update', 'pipeline', 'priorität', 'ablauf', 'dashboard', 'kennzahl',
	'markt', 'produkt', 'service', 'lieferung', 'support', 'freigabe',
	'ticket', 'status', 'modul', 'funktion', 'version', 'system',
	'prozess', 'ressource', 'ergebnis', 'datensatz'
];

const WORD_POOL_IT = [
	'rapporto', 'budget', 'trimestre', 'ricavi', 'analisi', 'previsione',
	'progetto', 'riunione', 'calendario', 'scadenza', 'proposta', 'strategia',
	'cliente', 'fattura', 'contratto', 'revisione', 'obiettivo', 'crescita',
	'pipeline', 'priorità', 'cruscotto', 'metrica', 'mercato', 'prodotto',
	'servizio', 'consegna', 'supporto', 'rilascio', 'ticket', 'stato',
	'modulo', 'funzione', 'versione', 'sistema', 'processo', 'risorsa',
	'risultato', 'impatto', 'sintesi', 'lancio'
];

const WORD_POOL_FR = [
	'rapport', 'budget', 'trimestre', 'revenu', 'analyse', 'prévision',
	'projet', 'réunion', 'agenda', 'échéance', 'proposition', 'stratégie',
	'client', 'facture', 'contrat', 'revue', 'objectif', 'croissance',
	'pipeline', 'priorité', 'flux', 'tableau', 'métrique', 'marché',
	'produit', 'service', 'livraison', 'support', 'version', 'ticket',
	'statut', 'module', 'fonction', 'système', 'processus', 'ressource',
	'résultat', 'impact', 'synthèse', 'lancement'
];

const WORD_POOLS: Record<string, string[]> = {
	en: WORD_POOL_EN,
	es: WORD_POOL_ES,
	de: WORD_POOL_DE,
	it: WORD_POOL_IT,
	fr: WORD_POOL_FR
};

const TOTAL_WORDS = 30;

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function generateWords(locale = 'en'): string[] {
	const pool = WORD_POOLS[locale] ?? WORD_POOL_EN;
	const shuffled = shuffle(pool);
	const result: string[] = [];
	while (result.length < TOTAL_WORDS) {
		result.push(...shuffled.slice(0, TOTAL_WORDS - result.length));
	}
	return result;
}

export function initState(locale = 'en'): TypingState {
	return {
		words: generateWords(locale),
		currentIndex: 0,
		typed: '',
		correctChars: 0,
		errors: 0,
		startTime: null,
		endTime: null,
		status: 'idle',
		wpm: 0,
		accuracy: 100
	};
}

export function handleInput(state: TypingState, input: string): TypingState {
	if (state.status === 'over') return state;

	const now = Date.now();
	const startTime = state.startTime ?? now;
	const currentWord = state.words[state.currentIndex];

	// Space pressed — advance to next word
	if (input.endsWith(' ')) {
		const typed = input.trimEnd();
		const correct = typed === currentWord;
		const newIndex = state.currentIndex + 1;
		const over = newIndex >= state.words.length;
		const endTime = over ? now : null;
		const wpm = calcWpm(state.correctChars + (correct ? currentWord.length : 0), startTime, now);

		return {
			...state,
			typed: '',
			currentIndex: newIndex,
			correctChars: state.correctChars + (correct ? currentWord.length + 1 : 0),
			errors: state.errors + (correct ? 0 : 1),
			startTime,
			endTime,
			status: over ? 'over' : 'running',
			wpm,
			accuracy: calcAccuracy(state.correctChars + (correct ? currentWord.length : 0), state.errors + (correct ? 0 : 1))
		};
	}

	return {
		...state,
		typed: input,
		startTime,
		status: 'running',
		wpm: calcWpm(state.correctChars, startTime, now),
		accuracy: calcAccuracy(state.correctChars, state.errors)
	};
}

function calcWpm(correctChars: number, startTime: number, now: number): number {
	const elapsed = (now - startTime) / 60000;
	return elapsed > 0.01 ? Math.round(correctChars / 5 / elapsed) : 0;
}

function calcAccuracy(correct: number, errors: number): number {
	const total = correct + errors;
	return total > 0 ? Math.round((correct / total) * 100) : 100;
}

export function isCurrentWordCorrect(state: TypingState): boolean {
	return state.words[state.currentIndex]?.startsWith(state.typed) ?? false;
}

export function isCurrentWordWrong(state: TypingState): boolean {
	return state.typed.length > 0 && !isCurrentWordCorrect(state);
}
