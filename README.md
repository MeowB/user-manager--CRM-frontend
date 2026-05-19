# User Management CRM

Frontend for a small-team CRM focused on user management and lead management.
The app uses real backend data, authenticated API requests, server-state
management, and CRUD-focused UI flows.

## Related Repositories

- Backend: https://github.com/MeowB/user-manager--CRM-backend

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui-style components
- TanStack Router
- TanStack Query
- Sonner toasts

## Features

- Login flow using the backend auth endpoint.
- Protected application layout with redirect to `/login` when no token exists.
- Logout button that clears the stored token.
- Leads CRUD:
  - list leads
  - create leads
  - edit leads
  - delete leads with confirmation
- Users CRUD:
  - list users
  - create users
  - edit user role/status
  - delete users with confirmation
- TanStack Query for server-state fetching, mutations, and query invalidation.
- Shared frontend domain types for leads and users.
- Zod form schemas for lead and user forms.
- Loading skeletons, empty states, inline errors, pending states, and success/error toasts.

## Local Setup

### Requirements

- Node.js
- Running backend API

### Environment Variables

Create a local `.env` file from `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

### Install And Run

```bash
npm install
npm run dev
```

Useful scripts:

- `npm run dev`: start the Vite development server.
- `npm run build`: run TypeScript and create a production build.
- `npm run preview`: preview the production build locally.
- `npm run lint`: run ESLint.

## Architecture Overview

Routing is handled with TanStack Router. The login route is public, while the
main application layout protects dashboard, users, and leads pages with a token
guard.

Server state is managed with TanStack Query. API functions live in `src/api`,
while pages and feature components use queries and mutations to fetch data,
perform writes, and invalidate stale query data.

The codebase separates route pages from feature implementation:

- `src/pages`: route-level page components.
- `src/features`: feature-specific tables, modals, and schemas.
- `src/domain`: shared frontend domain types.
- `src/components`: reusable UI primitives and shared UI helpers.

## Development Process

See [PROCESS.md](./docs/PROCESS.md) for the step-by-step project history.
