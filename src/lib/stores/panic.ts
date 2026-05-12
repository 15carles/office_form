import { writable } from 'svelte/store';

export const panicMode = writable(false);

export function togglePanic() {
	panicMode.update((v) => !v);
}

export function activatePanic() {
	panicMode.set(true);
}

export function deactivatePanic() {
	panicMode.set(false);
}
