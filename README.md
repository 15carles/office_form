# alttab.top — Office Games

Play Snake, Tetris, and a Typing game disguised as Excel, Figma, or Notion.  
Press **Escape** at any time to swap the game for a convincing decoy — a sales chart, a component spec, or meeting notes.

**Live site:** https://alttab.top

---

## What it is

Nine combinations of 3 games × 3 office-tool skins, each designed to be indistinguishable from the real application at a glance:

| Skin | Disguise | Panic decoy |
|------|----------|-------------|
| Excel | Ribbon, formula bar, sheet tabs | Sales bar chart (Q4 regional data) |
| Figma | Layers panel, canvas, design properties | Annotated Button component spec |
| Notion | Sidebar, document blocks, page properties | Meeting notes + task table |

Games:
- **Snake** — classic, score by food. Formula bar updates live with head position
- **Tetris** — standard 7-piece Tetris with wall kick, ghost piece, and level speed
- **Typing** — WPM + accuracy benchmark, 30-word sessions in EN or ES

All scores saved locally. No account. No data sent anywhere.

---

## Routes

```
/                     Homepage — skin picker
/[skin]               Game selector for that skin (excel | figma | notion)
/[skin]/[game]        Active game (snake | tetris | typing)
```

---

## Tech stack

- [SvelteKit](https://kit.svelte.dev) + TypeScript
- [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) — fully static output
- [`svelte-i18n`](https://github.com/kaisermann/svelte-i18n) — EN / ES
- Cloudflare Pages — hosting + CDN
- No database, no backend, no cookies

---

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build to .svelte-kit/output
npm run preview    # preview production build
```

### Key concepts

**Panic mode** (`src/lib/stores/panic.ts`) — a global Svelte store. Any component can toggle it; Escape key is wired in `+layout.svelte`. Each skin watches `panicMode` and swaps its game slot for a static decoy.

**Skins** (`src/lib/skins/`) — each skin is a self-contained Svelte component that accepts a `children` snippet (the game) and wraps it in a pixel-accurate UI shell.

**Games** (`src/lib/games/`) — pure-TS engine files (no Svelte, no DOM) + a Svelte component for rendering. Engines are deterministic and testable in isolation.

**Progress** (`src/lib/stores/progress.ts`) — best scores and streak stored in `localStorage` under the key `alttab_progress`.

---

## Deploy

The project deploys to Cloudflare Pages via GitHub Actions on push to `main`.

Required secrets in GitHub:
```
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Custom domain `alttab.top` is configured in Cloudflare Pages → Custom Domains.

---

## Project structure

```
src/
├── lib/
│   ├── components/       GameCanvas, SkinCard, DayBadge, skin previews
│   ├── games/
│   │   ├── snake/        engine.ts · Snake.svelte · config.ts
│   │   ├── tetris/       engine.ts · Tetris.svelte · config.ts
│   │   └── typing/       engine.ts · Typing.svelte · config.ts
│   ├── skins/
│   │   ├── excel/        ExcelSkin.svelte · ExcelPanic.svelte
│   │   ├── figma/        FigmaSkin.svelte · FigmaPanic.svelte
│   │   ├── notion/       NotionSkin.svelte · NotionPanic.svelte
│   │   ├── config.ts     per-skin metadata
│   │   └── registry.ts   valid combos · RECOMMENDED · pageTitle
│   ├── stores/           panic · fullscreen · progress · gameOfDay
│   └── i18n/             en.json · es.json
├── routes/
│   ├── +layout.svelte    Escape handler · i18n init
│   ├── +page.svelte      Homepage
│   ├── [skin]/
│   │   ├── +page.svelte  Game selector
│   │   └── [game]/
│   │       └── +page.svelte  Active game
static/
├── sitemap.xml
└── _headers              Security headers (noindex, CSP, X-Frame-Options)
```
