import type { Component } from 'svelte';
import type { Snippet } from 'svelte';
import type { SkinId } from '$lib/games/types';
import ExcelSkin from './excel/ExcelSkin.svelte';
import FigmaSkin from './figma/FigmaSkin.svelte';
import NotionSkin from './notion/NotionSkin.svelte';
import OutlookSkin from './outlook/OutlookSkin.svelte';
import TeamsSkin from './teams/TeamsSkin.svelte';
import SlackSkin from './slack/SlackSkin.svelte';
import SalesforceSkin from './salesforce/SalesforceSkin.svelte';
import SkinPreviewExcel from '$lib/components/SkinPreviewExcel.svelte';
import SkinPreviewFigma from '$lib/components/SkinPreviewFigma.svelte';
import SkinPreviewNotion from '$lib/components/SkinPreviewNotion.svelte';
import SkinPreviewOutlook from '$lib/components/SkinPreviewOutlook.svelte';
import SkinPreviewTeams from '$lib/components/SkinPreviewTeams.svelte';
import SkinPreviewSlack from '$lib/components/SkinPreviewSlack.svelte';
import SkinPreviewSalesforce from '$lib/components/SkinPreviewSalesforce.svelte';

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
	notion: NotionSkin,
	outlook: OutlookSkin,
	teams: TeamsSkin,
	slack: SlackSkin,
	salesforce: SalesforceSkin
};

/** Prop-less SVG thumbnails shown on the dashboard cards. */
export const SKIN_PREVIEWS: Record<SkinId, Component> = {
	excel: SkinPreviewExcel,
	figma: SkinPreviewFigma,
	notion: SkinPreviewNotion,
	outlook: SkinPreviewOutlook,
	teams: SkinPreviewTeams,
	slack: SkinPreviewSlack,
	salesforce: SkinPreviewSalesforce
};
