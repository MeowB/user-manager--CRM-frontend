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

Users:

- `GET /users` returns users without password fields.
- Create a user.
- Edit the user's role/status.
- Delete the user.

## Frontend UI

- Visiting a protected route without a token redirects to `/login`.
- Login stores the token and redirects into the app.
- Logout clears the token and redirects to `/login`.
- Leads table shows loading, empty, success, and delete confirmation states.
- Users table shows loading, empty, success, and delete confirmation states.
- Create/edit/delete actions show success or error feedback.
