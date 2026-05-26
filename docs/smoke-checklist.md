# Smoke Checklist

Use this checklist before pushing major changes or redeploying the CRM.

## Builds

Backend:

```bash
cd back-end
npm run test
npm run build
```

Backend CI:

- GitHub Actions runs migrations, seed, tests, and build against a temporary PostgreSQL database on push and pull request.
- Hosted backend deploys should run `npm run db:deploy` before `npm start` so migrations and repeatable demo seed data are restored.

Frontend:

```bash
cd front-end
npx tsc -b
npm run build
```

## Backend API

- `GET /health` returns an OK server/database status.
- `POST /auth/login` returns a JWT for a valid active user.
- Invalid login credentials return `401`.
- Invalid request bodies return `400` instead of `500`.

## Authenticated Checks

Use the JWT from login as:

```http
Authorization: Bearer <token>
```

Leads:

- `GET /leads` returns the lead list.
- Create a lead.
- Edit the lead.
- Delete the lead.
- `GET /leads/:id/deals` returns linked deals for an accessible lead.

Users:

- `GET /users` returns users without password fields.
- Create a user.
- Edit the user's full name, role, and status.
- Delete the user.
- Protected demo accounts cannot be edited or deleted.

Deals:

- `GET /deals` returns deals for admin and sales users.
- Admin sees all seeded deals.
- Sales agent sees only deals linked to their own leads.
- Viewer receives `403` for deal routes.
- Create a deal linked to an accessible lead.
- Edit a deal.
- Admin can delete a deal.
- Sales agent cannot delete a deal.

Dashboard:

- `GET /dashboard/summary` returns role-scoped dashboard data.
- Admin can request `GET /dashboard/summary?ownerId=<userId>` for sales agents and admins.
- Sales agent receives self-scoped dashboard data.
- Viewer receives aggregate dashboard data and remains blocked from record-level CRM routes.

## Frontend UI

- Visiting a protected route without a token redirects to `/login`.
- Login stores the token and redirects all roles to `/dashboard`.
- Logout clears the token and redirects to `/login`.
- Leads table shows loading, empty, success, and delete confirmation states.
- Users table shows loading, empty, success, and delete confirmation states.
- Users table shows full names.
- Users table hides edit/delete actions for protected demo accounts.
- Users table hides delete actions for the current user.
- Users, leads, and deals tables show pointer cursors on sortable headers and sort rows correctly.
- Lead owner and deal owner displays show full name plus email.
- Admin sees the Deals navigation link and Deals page.
- Sales agent sees the Deals navigation link and only their own deals.
- Viewer does not see the Deals navigation link.
- Lead Detail shows linked deals.
- Creating a deal from Lead Detail refreshes the linked deals section.
- Editing a deal refreshes visible deal lists.
- Admin deal deletion refreshes visible deal lists.
- Admin sees the Owner column on the Deals page.
- Admin and sales agents see the Pipeline navigation link and Pipeline page.
- Pipeline groups deals by stage.
- Dragging a deal to another stage updates the pipeline and dashboard metrics.
- Dashboard shows KPI cards, recent leads, recent deals, and pipeline snapshot.
- Admin dashboard owner filter excludes viewers and includes sales agents and admins.
- Create/edit/delete actions show success or error feedback.
