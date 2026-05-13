import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => [
	{ skin: 'excel',  game: 'snake'  },
	{ skin: 'excel',  game: 'tetris' },
	{ skin: 'excel',  game: 'typing' },
	{ skin: 'figma',  game: 'snake'  },
	{ skin: 'figma',  game: 'tetris' },
	{ skin: 'figma',  game: 'typing' },
	{ skin: 'notion', game: 'snake'  },
	{ skin: 'notion', game: 'tetris' },
	{ skin: 'notion', game: 'typing' }
];
