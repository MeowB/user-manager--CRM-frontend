# User Management CRM Spec Sheet

This spec defines the product direction for a lightweight CRM built as a full-stack portfolio project. It started as the original planning document and has been updated to reflect the current implementation and the next planned phase.

## Table Of Contents

- [1. Project Overview](#1-project-overview)
- [2. Product Phases](#2-product-phases)
- [3. User Roles](#3-user-roles)
- [4. Core Features](#4-core-features)
- [5. Functional Requirements](#5-functional-requirements)
- [6. Data Model Direction](#6-data-model-direction)
- [7. API Direction](#7-api-direction)
- [8. Technical Stack](#8-technical-stack)
- [9. UI Direction](#9-ui-direction)
- [10. User Flows](#10-user-flows)

## 1. Project Overview

### What Is The App?

A lightweight, modular Customer Relationship Management (CRM) system designed to help small teams track leads, manage deals, and organize sales activities in a clear, structured interface.

### Who Is It For?

Freelancers, small businesses, and junior sales teams who need an efficient way to manage potential clients and follow up on opportunities without relying on heavy enterprise tools.

### Problem It Solves

Small teams often manage leads in spreadsheets, notes in messaging apps, and deals manually. This creates poor visibility, missed follow-ups, and inconsistent client tracking.

### Core Value

The CRM brings client-related information into one place: users, leads, deals, and eventually activities. It prioritizes clarity, focused workflows, and realistic sales-team behavior over enterprise-level complexity.

## 2. Product Phases

### Phase 1 - CRM Foundation

Current implemented foundation:

- Authentication with JWT login.
- Protected frontend layout and logout.
- User CRUD.
- Lead CRUD.
- Backend validation with Zod.
- Centralized backend error handling.
- TanStack Query for frontend server state.
- Loading states, toasts, confirmation modals, and smoke checklist.

### Phase 2 - Ownership, Deals, And Pipeline

Planned next phase:

- Lead ownership by user.
- Role-aware lead access.
- Lead detail page.
- Extended lead fields such as status, priority, and budget.
- Deal model and Deal CRUD.
- Create deal from lead.
- Linked deals on Lead Detail.
- Pipeline page.
- Dashboard KPIs.
- Activity timeline placeholder.

### Phase 3 - Activities And Advanced CRM Behavior

Later phase:

- Full Activities CRUD.
- Notes, calls, tasks, and meetings.
- System events.
- Advanced filters/search/pagination.
- Saved filter presets.
- More complete role permission UI.
- Automated smoke tests and broader verification.

### Phase 4 - Production Readiness And Portfolio Polish

Final portfolio-readiness phase:

- Automated smoke/API checks.
- Seed script for realistic demo data.
- Demo credentials documented safely.
- Screenshots or short demo video in the README.
- CI checks for frontend typecheck and backend build.
- Accessibility pass for core workflows.
- Deployment documentation.
- Architecture overview covering auth flow, data model, routing, and API boundaries.

## 3. User Roles

### Admin

Full control over CRM data and team management.

Permissions:

- Create, edit, and delete users.
- Create, edit, and delete leads.
- View all leads and deals.
- Manage roles and account status.
- Access dashboards and analytics.

### Sales Agent

Works on day-to-day lead and deal management.

Permissions:

- Create and edit their own leads.
- Create and manage deals linked to their leads.
- Move deals through pipeline stages.
- Add activities once the Activities module exists.

Restrictions:

- Cannot manage user accounts.
- Should not delete or edit records owned by other users unless explicitly allowed.

### Viewer

Read-only role for supervisors or external stakeholders.

Permissions:

- View CRM data and dashboards.

Restrictions:

- Cannot create, edit, or delete users, leads, deals, or activities.

## 4. Core Features

### Lead Management

Users can create, edit, delete, and review leads. Leads represent potential clients and will eventually include ownership, status, priority, budget, linked deals, and activities.

### Lead Detail

Lead Detail becomes the central workspace for a lead. It should show lead summary data, owner information, linked deals, and an activity timeline placeholder until Activities are implemented.

### Deal Pipeline

Deals represent sales opportunities linked to leads. Deals move through stages such as discovery, proposal, negotiation, closed won, and closed lost.

### Activities

Activities are planned for a later phase. They will include notes, calls, tasks, meetings, and system events shown in a timeline.

### Dashboard And KPIs

Dashboard metrics should become data-driven once leads and deals contain enough business data. Initial KPIs can include total leads, total deals, pipeline value, deals by stage, won deals, and lost deals.

### Authentication And Permissions

Authentication is implemented with JWT. Permissions should become more meaningful in Phase 2 as lead ownership and role-aware access are added.

## 5. Functional Requirements

### Leads

Current:

- Create leads with name, email, and optional company.
- Edit leads.
- Delete leads with confirmation.
- List leads using real backend data.

Planned:

- Assign each lead to an owner.
- Add lead status, priority, and budget.
- Open a Lead Detail page.
- Link one or more deals to a lead.
- Reserve space for lead activities.
- Filter/search/sort leads in a later phase.

### Deals

Planned:

- Create a deal associated with a specific lead.
- Edit deal details such as title, amount, and stage.
- Delete deals with confirmation.
- Move deals between pipeline stages.
- View all deals linked to a lead.
- Display deals in a pipeline page grouped by stage.

### Activities

Planned for Phase 3:

- Create activities linked to a lead or deal.
- Choose activity type: note, call, task, or meeting.
- Add content and due dates.
- Mark tasks as completed.
- Display activities and system events in a timeline.

### Users

Current:

- List users without password fields.
- Create users with hashed passwords.
- Edit role/status.
- Delete users with confirmation.

Planned:

- Use roles more deeply in API access rules.
- Potentially add user detail or owner-based reporting later.

### Dashboard

Planned:

- Show real KPIs derived from leads and deals.
- Include total leads, total deals, pipeline value, and stage breakdowns.
- Add recent activity placeholder until Activities exist.

## 6. Data Model Direction

Current implementation uses UUID string IDs.

### Current Core Models

User:

- `id`
- `email`
- `password`
- `role`: `admin`, `salesAgent`, `viewer`
- `status`: `active`, `disabled`
- `createdAt`
- `updatedAt`

Lead:

- `id`
- `name`
- `email`
- `company` nullable
- `createdAt`
- `updatedAt`

### Planned Lead Ownership

Lead should be extended with:

- `ownerId`
- `owner`

User should expose:

- `leads`

### Planned Lead Fields

Lead should later include:

- `status`: `new`, `contacted`, `negotiating`, `won`, `lost`
- `priority`: `low`, `medium`, `high`
- `budget`: nullable decimal/number

### Planned Deal Model

Deal:

- `id`
- `leadId`
- `title`
- `amount`
- `stage`: `discovery`, `proposal`, `negotiation`, `closedWon`, `closedLost`
- `createdAt`
- `updatedAt`

### Planned Activity Model

Activity:

- `id`
- `leadId`
- `dealId` nullable
- `type`: `note`, `call`, `task`, `meeting`
- `content`
- `dueDate` nullable
- `completed` for tasks
- `createdAt`
- `updatedAt`

## 7. API Direction

The current backend uses routes without an `/api` prefix.

### Current Auth API

- `POST /auth/login`
- `GET /auth/me`

### Current Users API

- `GET /users`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

### Current Leads API

- `GET /leads`
- `POST /leads`
- `GET /leads/:id`
- `PATCH /leads/:id`
- `DELETE /leads/:id`

### Planned Deals API

- `GET /deals`
- `POST /deals`
- `GET /deals/:id`
- `PATCH /deals/:id`
- `DELETE /deals/:id`

Optional relationship route:

- `GET /leads/:id/deals`

### Planned Dashboard API

- `GET /dashboard/kpis`

## 8. Technical Stack

Frontend:

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- TanStack Query
- Zod
- Sonner

Backend:

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT
- bcrypt
- Zod

Deployment:

- Frontend: Vercel
- Backend: Render
- Database: hosted PostgreSQL

## 9. UI Direction

Current pages:

- Login
- Dashboard placeholder
- Users
- Leads

Planned Phase 2 pages:

- Lead Detail
- Deals
- Pipeline
- Data-backed Dashboard

Lead Detail layout direction:

```txt
Lead Detail
|-- Header
|   |-- Lead name
|   |-- Company / email
|   `-- Actions: Edit Lead, Create Deal
|
|-- Main Content
|   |-- Lead Summary
|   |-- Linked Deals
|   `-- Activity Timeline Placeholder
|
`-- Side Panel
    |-- Owner
    |-- Status
    |-- Priority
    |-- Budget
    `-- Last updated
```

Pipeline layout direction:

```txt
Pipeline
|-- Discovery
|-- Proposal
|-- Negotiation
|-- Closed Won
`-- Closed Lost
```

## 10. User Flows

Current flow:

```txt
login -> leads/users -> create/edit/delete records -> logout
```

Planned lead-to-deal flow:

```txt
login -> leads -> open lead detail -> create deal -> view linked deals -> move deal through pipeline -> dashboard reflects updated KPIs
```

Planned activity flow:

```txt
lead detail -> add note/call/task -> timeline updates -> task can be completed later
```

## Checkpoint Assessment

The original direction is still valid. The app is on track as a junior full-stack portfolio CRM because it demonstrates real application concerns:

- authentication
- protected routes
- CRUD flows
- server-state management
- validation
- API error handling
- relational data planning
- iterative documentation

The main adjustment is scope clarity. Deals, pipeline, dashboard KPIs, and activities are not all part of one small finish pass. They should be phased so each layer has a stable data model and UI purpose before the next one is added.

The long-term direction is:

- Phase 2 adds product depth with ownership, deals, pipeline, and KPIs.
- Phase 3 adds workflow depth with activities, timelines, permissions, and advanced CRM behavior.
- Phase 4 adds production readiness and portfolio polish so the project is easy to demo, evaluate, and maintain.
