# Stash

A lightweight React + TypeScript app (Vite) for search and retrieving web resources into collections and tags. Stash provides a dashboard, resource list with add/edit flows, collections grid, tag browsing, and detailed resource views — all using Redux Toolkit for client-side state and React Router for navigation.

---

## Quick overview

- Built with: React 19, TypeScript, Vite
- State management: Redux Toolkit
- Routing: react-router-dom
- Dev tooling: Vite, ESLint
- Main purpose: Search, retrieve, save, categorize, and browse web resources using collections and tags.

---

## Features

- Dashboard with overview and quick actions
- Resource list with Add / Edit modals and a saved-confirmation modal
- Collections grid to group resources
- Tag index and tag-based browsing
- Resource detail pages
- Client-side state via Redux Toolkit
- TypeScript throughout for safer refactors

---

## Requirements

- Node.js (LTS recommended)
- npm (or yarn / pnpm)

---

## Getting started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

Build for production:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

Run the linter:
```bash
npm run lint
```
core dependencies
```bash
npm install @reduxjs/toolkit  # Used to integrate Redux with your React components.
npm install react-redux # Used for centralized state management
npm install react-router-dom # Implemented for handling client-side routing and protected routes.
npm install -D @types/react-router-dom # Added as a development dependency to provide TypeScript support for your routing.
npm install lucide-react # Used to implement the icons you utilized throughout your interface, which contributes to the professional styling of your application.

Notes:
- The `build` script runs `tsc -b` then `vite build`. Fix TypeScript issues before building.
- There are currently no test scripts in package.json; add one if you want CI tests.

---

## Project layout (important files & folders)

```
/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ public/                    # Static assets
└─ src/
   ├─ main.tsx                # App entrypoint (Redux Provider + Router)
   ├─ App.tsx                 # Route definitions + modal wiring
   ├─ app/
   │  └─ store.ts             # Redux store (slices registered here)
   ├─ components/
   │  ├─ layout/              # DashboardLayout and layout components
   │  ├─ resources/           # ResourceList, Add/Edit/Saved modals
   │  ├─ collections/         # CollectionGrid and components
   │  ├─ dashboard/           # Dashboard widgets/components
   │  └─ shared/              # Shared UI components
   ├─ features/
   │  ├─ resources/           # Resource types, slice, selectors
   │  └─ collections/         # Collections logic and slice
   ├─ pages/
   │  ├─ DashboardPage.tsx
   │  ├─ ResourceDetailPage.tsx
   │  └─ TagsPage.tsx
   └─ styles/                 # CSS: global, layout, modals, responsive, etc.
```

How it fits together:
- `src/main.tsx` mounts the React app and wires Redux and BrowserRouter.
- `src/App.tsx` defines the routes and shows add/edit/saved modals based on Redux state (resources slice).
- Feature logic (slices, types) lives under `src/features` and UI under `src/components`.

---

## Routes

- `/` — Dashboard
- `/resources` — Resource list
- `/resources/:id` — Resource detail
- `/collections` — Collections grid
- `/tags` — Tags page

---

## Development tips & conventions

- Keep TypeScript types and slices in `src/features/*`. Register reducers in `src/app/store`.
- Reusable UI components go in `src/components/shared`.
- Add new pages under `src/pages` and register routes in `App.tsx`.
- Run `npm run lint` before committing to follow existing linting rules.
- The repo uses plain CSS files in `src/styles`. Follow the established naming (global.css, layout.css, modals.css, etc.).

---

## Adding tests

There are no test runners configured yet. To add tests:
- Choose a runner (Vitest, Jest) and add to devDependencies.
- Add test scripts to `package.json` and a basic config.
- Put unit tests near logic files (e.g., `src/features/resources/__tests__/*`) or in a `tests/` directory.

---

## CI / Deployment suggestions

- Add a GitHub Action that:
  - Installs dependencies
  - Runs `npm run lint`
  - Runs `npx tsc --noEmit` to verify types
  - Builds (`npm run build`) to ensure production build succeeds
  - Deploy the `dist` output from Vite to static hosts(Netlify, Vercel, GitHub Pages) or to any static-file serving environment.
  - Deployed on Netlify https://group1stash.netlify.app/

---

## Contributing

1. Fork the repository and create a branch: `git checkout -b feat/describe-what`
2. Install and run locally: `npm install && npm run dev`
3. Make your changes; run `npm run lint` and fix issues.
4. Open a PR with a clear description and screenshots if UI changed.

---

## License

```
MIT License

Copyright (c) 2026 Group 1

