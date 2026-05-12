# Changelog

All notable changes to this project are documented here.

## [1.0.0] — 2026-05-12

### Added

**Core infrastructure**
- SvelteKit project with TypeScript, SSG via `@sveltejs/adapter-static`
- `svelte-i18n` with EN/ES locales, locale persisted to localStorage
- `panicMode` store — Escape key toggles between game and decoy content globally
- `fullscreen` store — Fullscreen API wrapper usable from any skin
- `progress` store — best scores + streak tracking in localStorage (no account needed)
- `gameOfDay` store — deterministic daily skin+game combo (seeded by date)
- Security headers in `_headers`: `noindex`, `X-Frame-Options`, `CSP`

**Games**
- **Snake** — pure-TS engine, grid-based movement, growing tail, food spawning, score 10 pts/food, speed scales with score
- **Tetris** — 7 tetrominoes (I, O, T, S, Z, J, L), wall-kick rotation, ghost piece, line clearing with standard Tetris scoring (100/300/500/800 pts × level), variable tick speed per level
- **Typing** — WPM + accuracy tracking, 30-word sessions from EN/ES pool, space-to-advance mechanic, live stats

**Skins**
- **Excel** — ribbon (7 tabs + action bar), formula bar updating live with snake head position and current formula, column/row headers, sheet tabs, status bar with score/best. Panic: SVG sales bar chart (Q4 regional data)
- **Figma** — dark theme, layers panel, dotted canvas background, right panel with live score as "Layout units" property. Panic: annotated Button/Primary component spec
- **Notion** — sidebar workspace nav, document with page properties, game inside a callout block, live typing stats as page properties. Panic: meeting notes + task database table

**Routes**
- `/` — Homepage with skin cards (SVG miniature previews), DayBadge, streak display, ES/EN switcher
- `/[skin]` — Game selector (3 options, recommended highlighted)
- `/[skin]/[game]` — Active play: all 9 combinations, each skin receives live game state (formula bar, design properties, document metrics)

### Technical

- All games render on `<canvas>` inside a `GameCanvas.svelte` wrapper
- Skin previews are pixel-accurate SVG snapshots embedded in homepage cards
- Document title spoofed per skin (`Q3 Revenue Analysis.xlsx`, `Design System v2`, `Meeting Notes`)
- noindex set in `app.html` and `_headers`
- Responsive: card grid collapses to single column below 800 px
