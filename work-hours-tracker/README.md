# Work Hours Tracker

I built this because my day looks like a bunch of mini clock‑ins and clock‑outs. When it’s time to update my invoice, adding up all those ranges was a tiny, annoying time sink. This little app lets me punch in start/end times fast and instantly see my total in decimal hours. Fewer sighs, faster invoices.

• Demo: https://workhourstracker.netlify.app/

## Scripts

- dev: Start the dev server
- build: Type-check and build for production
- preview: Preview the production build locally
- lint: Run ESLint

## Quick start

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal.

## Usage

- Click "+ Add range" to add more rows.
- For each range, type hours and minutes, then tap the AM/PM toggle (no fiddly native time pickers).
- The total updates automatically as soon as times are entered/changed.
- Click "Clear" to reset all rows for a new day.

Notes:
- Incomplete rows are ignored in the total.
- End time must be after start time (no overnight support yet).
- Total is rounded to exactly 2 decimals (e.g., 1:15 → 1.25, 2:30 → 2.50).

### Why decimal hours?
Because invoices. 1h 15m = 1.25, 45m = 0.75 — quick to multiply by your rate and drop into an invoice.

## Structure

- `src/App.tsx` – main app: rows list, add/remove, clear, and total
- `src/components/TimeRangeRow.tsx` – a single time range row with validation
- `src/utils/time.ts` – minutes math, 12‑hour input → minutes, and decimal rounding
- `src/types.ts` – shared types
- `src/App.css`, `src/index.css` – light blue theme and layout

## Deploy to Netlify

This is a static Vite app. A minimal `netlify.toml` is included:

```
[build]
	command = "npm run build"
	publish = "dist"
```

Steps:
1. Push the repo to GitHub.
2. In Netlify, create a new site from Git, point to this repo.
3. Use the defaults (build command `npm run build`, publish `dist`).
4. Deploy.

## Tech

- React + TypeScript (Vite)
- 100% client‑side — no backend needed
- Minimal, light‑blue UI that stays out of your way
