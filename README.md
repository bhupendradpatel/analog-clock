# Analog Clock

A React analog clock that grew into a small time toolkit. Glassmorphism face,
sweeping hands, and five modes.

## Features

- **Clock** — analog face with hour/minute/second hands and an optional digital
  readout + date.
- **World** — multiple analog clocks across time zones, add/remove on the fly.
- **Stopwatch** — start/pause/lap/reset with centisecond precision.
- **Timer** — countdown with hours/minutes/seconds and a beep when it fires.
- **Alarm** — set multiple alarms; they ring (beep + flash) at the chosen time.

### Settings (⚙, persisted to `localStorage`)

- Light / dark theme
- Tick-tock sound on/off (off by default — browsers block audio autoplay until a
  user gesture)
- 12- / 24-hour format
- Smooth (sweeping) vs. ticking second hand
- Digital readout and date toggles
- Face skins: Default, Roman numerals, Minimal, Neon
- Clock size

## Getting started

Built with [Vite](https://vitejs.dev/) + React.

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm test         # run the Vitest suite
```

## Deployment (GitHub Pages)

```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```

The site is served from a sub-path, so `vite.config.js` sets
`base: '/analog-clock/'` to match the repo name. If you fork/rename the repo,
update that `base` (and the `homepage` field in `package.json`) to
`/<your-repo-name>/`.

## Structure

- `index.html` — Vite entry (at the project root).
- `src/index.jsx` — mounts the React app.
- `src/App.jsx` — shell: tab navigation, settings state, shared clock tick.
- `src/App.utils.js` — time-zone parts, hand angles, formatting.
- `src/hooks/` — `useNow` (rAF/interval tick) and `useLocalStorage`.
- `src/components/` — `AnalogClock`, `WorldClock`, `Stopwatch`, `Timer`,
  `Alarm`, `SettingsPanel`, `AudioPlayer`.
