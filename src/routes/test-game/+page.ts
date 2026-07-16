import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

// Dev-only test harness: not prerendered, and 404s in production builds.
export const prerender = false;

export const load = () => {
	if (!dev) error(404, 'Not found');
};
