# Smoke Checklist

Use this checklist before pushing major changes or redeploying the CRM.

## Builds

Backend:

```bash
cd back-end
npm run build
```

Frontend:

```bash
cd front-end
npx tsc -b
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

Deals:

- `GET /deals` returns deals for admin and sales users.
- Admin sees all seeded deals.
- Sales agent sees only deals linked to their own leads.
- Viewer receives `403` for deal routes.

## Frontend UI

- Visiting a protected route without a token redirects to `/login`.
- Login stores the token and redirects into the app.
- Logout clears the token and redirects to `/login`.
- Leads table shows loading, empty, success, and delete confirmation states.
- Users table shows loading, empty, success, and delete confirmation states.
- Users table shows full names.
- Lead owner and deal owner displays show full name plus email.
- Admin sees the Deals navigation link and Deals page.
- Sales agent sees the Deals navigation link and only their own deals.
- Viewer does not see the Deals navigation link.
- Lead Detail shows linked deals.
- Creating a deal from Lead Detail refreshes the linked deals section.
- Admin sees the Owner column on the Deals page.
- Create/edit/delete actions show success or error feedback.
