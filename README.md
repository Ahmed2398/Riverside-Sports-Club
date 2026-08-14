# Riverside Sports Club — Club Admin Dashboard

A staff-facing admin dashboard for a sports club. Features include login/auth,
a summary overview page, a searchable/filterable/paginated member list, and a
member detail view. Supports English and Arabic with full RTL layout and dark mode.

## Features

- **Authentication** — Login with JWT, protected routes, persistent sessions
- **Dashboard** — Stat cards with icons showing total members, active members, sessions, and average sessions
- **Member Management** — Searchable, filterable (tier/status), sortable, paginated member table
- **Member Detail** — Slide-out drawer with profile, sessions, membership info, confidential fields (with reveal/hide toggle), and recent sessions
- **Bilingual Support** — Full English/Arabic translations with RTL layout switching
- **Dark Mode** — Light/dark theme toggle with system preference detection, persisted to localStorage
- **Responsive Design** — Works on mobile, tablet, and desktop with a collapsible sidebar
- **404 Page** — Modern not-found page with navigation back to safety

## How to Run

### Terminal 1 — Mock API

```bash
cd mock-api
node server.mjs
```

The API runs on http://localhost:4000.

### Terminal 2 — Web App

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:5173.

## Tech Stack

| Category         | Technology                           |
| ---------------- | ------------------------------------ |
| Framework        | React 19 + TypeScript                |
| Build Tool       | Vite                                 |
| State Management | Redux Toolkit                        |
| Routing          | React Router v6                      |
| Styling          | SCSS Modules + CSS Custom Properties |
| HTTP Client      | Axios (with interceptors)            |
| Testing          | Vitest + React Testing Library       |
| i18n             | Custom translation system (en/ar)    |

## Architecture

```
src/
├── app/                    # App entry, layout (AppShell, Sidebar, Topbar)
│   ├── layout/
│   │   ├── AppShell/       # Shell with sidebar + topbar + content
│   │   ├── Sidebar/        # Navigation with icons
│   │   └── Topbar/         # Title, theme toggle, language toggle, user info
│   └── App.tsx             # Router + providers
├── features/
│   ├── auth/               # Login page, auth hook, auth slice
│   ├── summary/            # Dashboard page, stat cards, stat grid
│   ├── members/            # Members page, table, filters, pagination, detail drawer, skeleton
│   └── notFound/           # 404 page
├── shared/
│   ├── api/                # Axios client with interceptors, API types
│   ├── components/         # Reusable UI (Button, Avatar, Badge, ProgressBar, etc.)
│   ├── contexts/           # LocaleContext, ThemeContext
│   ├── hooks/              # useDebouncedValue, useAppDispatch/useAppSelector
│   └── i18n/               # Translation files (en.ts, ar.ts), useTranslation hook
├── styles/                 # Design tokens, mixins, global styles
└── test/                   # Test setup with mocks for contexts
```

## Decisions

- **SCSS Modules + CSS Custom Properties** — SCSS variables for compile-time values (spacing, typography) and CSS custom properties for runtime-switchable values (colors for dark mode). This avoids a heavy CSS-in-JS dependency while supporting theme switching.
- **Custom i18n over react-i18next** — Lightweight translation system with `useTranslation` hook and nested key lookups. Sufficient for two languages without adding bundle weight.
- **Redux Toolkit** — Chosen for predictable state management with async thunks for API calls. Slices are feature-scoped for maintainability.
- **Axios interceptors** — Centralized auth token and `Accept-Language` header injection. The locale is read from `localStorage` so API requests always match the UI language.
- **CSS logical properties** — Used `inset-inline-start`, `padding-inline`, `margin-block-end`, etc. throughout for automatic RTL/LTR layout switching without separate stylesheets.

## Tradeoffs

- **No CSS framework** — Hand-rolled SCSS modules give full control over the design system but require more maintenance than Tailwind/utility-first approaches.
- **localStorage for locale/theme** — Simple and synchronous but not reactive across tabs. Acceptable for an admin dashboard with single-tab usage.
- **Mock API** — Enables frontend development without a backend, but real API integration may require adjustments to data shapes and error handling.
- **Skeleton loading over spinners** — Better perceived performance but slightly more code than a simple spinner component.

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

Tests use **Vitest** with **React Testing Library**. Context providers (Locale, Theme) and the `useTranslation` hook are mocked in `src/test/setup.ts` so components can be tested in isolation without wrapping in providers.

## Design System

The design system is defined in `src/styles/_tokens.scss`:

- **Colors** — Primary, ink, line, success, warning, danger with dark mode overrides via `[data-theme='dark']`
- **Typography** — Font stack with Arabic support (Noto Sans Arabic), 6 size/weight levels
- **Spacing** — 8pt grid with 4px half-steps
- **Layout** — 44px min tap target, 4px/8px border radii, responsive breakpoints
- **Mixins** — Focus rings, tabular numbers, visually-hidden utility
