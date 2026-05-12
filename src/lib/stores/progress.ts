import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export interface ComboScore {
	best: number;
	last: number;
	sessions: number;
	lastPlayedAt: string;
}

export interface UserPrefs {
	locale: string;
	defaultSkin: string | null;
	panicKeyEnabled: boolean;
}

export interface StreakData {
	currentStreak: number;
	lastPlayedDate: string;
	longestStreak: number;
}

type ScoreStore = Record<string, ComboScore>;

function loadFromStorage<T>(key: string, fallback: T): T {
	if (!browser) return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function saveToStorage<T>(key: string, value: T) {
	if (!browser) return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Storage full or unavailable — fail silently
	}
}

const defaultPrefs: UserPrefs = {
	locale: 'en',
	defaultSkin: null,
	panicKeyEnabled: true
};

const defaultStreak: StreakData = {
	currentStreak: 0,
	lastPlayedDate: '',
	longestStreak: 0
};

export const scores = writable<ScoreStore>(loadFromStorage('alttab_scores', {}));
export const prefs = writable<UserPrefs>(loadFromStorage('alttab_prefs', defaultPrefs));
export const streak = writable<StreakData>(loadFromStorage('alttab_streak', defaultStreak));

scores.subscribe((v) => saveToStorage('alttab_scores', v));
prefs.subscribe((v) => saveToStorage('alttab_prefs', v));
streak.subscribe((v) => saveToStorage('alttab_streak', v));

export function recordScore(skinId: string, gameId: string, score: number) {
	const key = `${skinId}__${gameId}`;
	const today = new Date().toISOString().split('T')[0];

	scores.update((store) => {
		const existing = store[key] ?? { best: 0, last: 0, sessions: 0, lastPlayedAt: '' };
		return {
			...store,
			[key]: {
				best: Math.max(existing.best, score),
				last: score,
				sessions: existing.sessions + 1,
				lastPlayedAt: today
			}
		};
	});

	updateStreak(today);
}

function updateStreak(today: string) {
	streak.update((s) => {
		if (s.lastPlayedDate === today) return s;

		const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
		const newStreak = s.lastPlayedDate === yesterday ? s.currentStreak + 1 : 1;

		return {
			currentStreak: newStreak,
			lastPlayedDate: today,
			longestStreak: Math.max(s.longestStreak, newStreak)
		};
	});
}

export function getBestScore(skinId: string, gameId: string): number {
	const key = `${skinId}__${gameId}`;
	return get(scores)[key]?.best ?? 0;
}

export function setDefaultSkin(skinId: string) {
	prefs.update((p) => ({ ...p, defaultSkin: skinId }));
}
