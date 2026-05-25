# User Management CRM

Frontend for a small-team CRM focused on user management, lead management, and
deal tracking. The app uses real backend data, authenticated API requests,
server-state management, and CRUD-focused UI flows.

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
- All successful logins land on `/dashboard`.
- Protected application layout with redirect to `/login` when no token exists.
- Logout button that clears the stored token.
- Role-aware navigation:
  - admins can access dashboard, users, leads, and deals
  - sales agents can access dashboard, leads, and deals
  - viewers are currently dashboard-only
- Leads CRUD:
  - list leads
  - create leads
  - edit leads
  - delete leads with confirmation
  - open a dedicated lead detail page
  - view owner, status, priority, budget, and linked deals
- Deals:
  - create a deal from Lead Detail
  - view deals linked to a lead
  - view a dedicated Deals page
  - admins see all deals with owner context
  - sales agents see deals linked to their own leads
- Users CRUD:
  - list users
  - create users with full names
  - edit user full name, role, and status
  - delete users with confirmation
  - hide delete actions for protected demo accounts and the current user
- TanStack Query for server-state fetching, mutations, and query invalidation.
- Shared frontend domain types for users, leads, and deals.
- Zod form schemas for user, lead, and deal forms.
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
main application layout protects dashboard, users, leads, lead detail, and deals
pages with a token guard.

Frontend navigation mirrors the current role model for user experience, while
the backend remains the source of truth for authorization. All roles land on the
dashboard after login. Viewers are redirected away from protected CRM sections
such as leads and deals.

Server state is managed with TanStack Query. API functions live in `src/api`,
while pages and feature components use queries and mutations to fetch data,
perform writes, and invalidate stale query data. Lead Detail also fetches linked
deals through the backend relationship route.

The codebase separates route pages from feature implementation:

- `src/pages`: route-level page components.
- `src/features`: feature-specific tables, modals, and schemas.
- `src/domain`: shared frontend domain types.
- `src/components`: reusable UI primitives and shared UI helpers.

Current primary routes:

- `/login`
- `/dashboard`
- `/users`
- `/leads`
- `/leads/$leadId`
- `/deals`

## Development Process

See [PROCESS.md](./docs/PROCESS.md) for the step-by-step project history.
