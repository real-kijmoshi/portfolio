# kijmoshi.xyz

My portfolio, styled as a Polish bus stop: printed timetable, amber departure board, no delays expected.

**Live at [kijmoshi.xyz](https://kijmoshi.xyz)**

## Stack

React 19 · Vite 6 · Tailwind CSS · Framer Motion

## Run it

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

## Where things live

- `src/App.jsx` — the whole site. All content (projects, tech stack, social links) sits in the data block at the top of the file; components follow below. To add or edit a project, edit the `projects` array — the departure board, route stops, and live-count stat all derive from it.
- `screenshots/` — project screenshots served to the site via `raw.githubusercontent.com`, so they don't ship with the bundle.
- `public/` — favicon and the about photo.
