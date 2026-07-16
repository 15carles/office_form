import type { Component } from 'svelte';
import type { Snippet } from 'svelte';
import type { SkinId } from '$lib/games/types';
import ExcelSkin from './excel/ExcelSkin.svelte';
import FigmaSkin from './figma/FigmaSkin.svelte';
import NotionSkin from './notion/NotionSkin.svelte';

/** Props every skin component accepts. Skins may ignore the ones they don't use. */
export interface SkinComponentProps {
	gameId?: string;
	score?: number;
	statusText?: string;
	formulaText?: string;
	cellRef?: string;
	children?: Snippet;
}

export const SKIN_COMPONENTS: Record<SkinId, Component<SkinComponentProps>> = {
	excel: ExcelSkin,
	figma: FigmaSkin,
	notion: NotionSkin
};
