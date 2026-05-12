import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isFullscreen = writable(false);

export function enterFullscreen(element?: Element) {
	if (!browser) return;
	const target = element ?? document.documentElement;
	target.requestFullscreen?.().then(() => isFullscreen.set(true)).catch(() => {});
}

export function exitFullscreen() {
	if (!browser) return;
	document.exitFullscreen?.().then(() => isFullscreen.set(false)).catch(() => {});
}

export function toggleFullscreen(element?: Element) {
	if (!browser) return;
	if (document.fullscreenElement) {
		exitFullscreen();
	} else {
		enterFullscreen(element);
	}
}

if (browser) {
	document.addEventListener('fullscreenchange', () => {
		isFullscreen.set(!!document.fullscreenElement);
	});
}
