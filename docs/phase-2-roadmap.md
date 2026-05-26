# Phase 2 Roadmap: Ownership, Deals, And Pipeline

Purpose: move the CRM from basic lead/user management into a real sales workflow by adding lead ownership, lead detail pages, deals, pipeline tracking, and dashboard KPIs.

## 1. Add Lead Ownership

**Goal:** Connect leads to users so the CRM starts reflecting real team ownership.

Backend:
- Add nullable `ownerId` to `Lead`.
- Add Prisma relation:
  - `User` has many `Lead`s.
  - `Lead` optionally belongs to one `User` owner.
- On lead creation, assign `ownerId` from the JWT payload.
- Include safe owner info in lead responses.
- Keep unassigned leads as a valid business state.

Frontend:
- Update `Lead` domain type.
- Show lead owner in the Leads table or later on Lead Detail.
- Keep owner assignment automatic for now.

**Outcome:** Leads can belong to a user while still supporting an intentional "Unassigned" state.

## 2. Add Role-Aware Lead Access

**Goal:** Make roles start to matter beyond UI labels.

Permission matrix:

Admin:
- Dashboard: all KPIs, including team/member-level metrics later.
- Leads: read all, create, edit all, delete all.
- Users: read, create, edit, and delete.
- Unassigned leads: visible.
- Future ownership controls: assign and reassign lead owners.

Sales Agent:
- Dashboard: own operational KPIs later.
- Leads: read own leads only.
- Leads: create leads assigned to self.
- Leads: edit own leads.
- Leads: cannot delete leads.
- Users: no access.
- Unassigned leads: not visible unless assigned by an admin later.

Viewer:
- Dashboard: broad aggregate KPIs only.
- Leads: no access to lead list or lead detail.
- Users: no access.
- Mutations: none.

Backend:
- Add role awareness to authenticated requests.
- Filter lead queries by role.
- Return `403` for forbidden lead and user access.
- Enforce admin-only lead deletion.
- Enforce viewer read-only/dashboard-only behavior on the backend, not only in the UI.

Frontend:
- Fetch or decode the current user's role.
- Hide nav links the current role cannot access.
- Hide or disable actions the current role cannot use.
- Redirect or show a forbidden state when a user manually opens a route they cannot access.
- Keep backend as the real source of permission enforcement.

**Outcome:** The app starts behaving like a multi-user CRM with realistic operational, admin, and stakeholder boundaries.

## 3. Add Demo Seed Data

**Goal:** Create realistic demo data once ownership and role rules exist, while keeping the database easy to reset during development.

Backend:
- Add `back-end/prisma/seed.ts`.
- Create demo users for each role:
  - Admin
  - Sales Agent
  - Viewer
- Create sample leads assigned to different owners.
- Keep `ownerId` nullable because unassigned leads are a valid CRM state.
- Add a backend seed script, for example `npm run seed`.

Data shape:
- Use clear demo identities that make ownership and permissions easy to test.
- Include enough lead variety to support detail pages, deals, pipeline views, and dashboard KPIs later.
- Avoid adding deals in this seed step until the Deal model exists.

Later ownership controls:
- Add an admin-only way to assign or reassign lead ownership.
- Keep deleted-user behavior as `ON DELETE SET NULL` so leads remain in the CRM if an owner account is removed.
- Add unassigned leads to admin review/filter workflows when filtering is introduced.

**Outcome:** Role-based behavior can be tested against repeatable demo data instead of manual one-off records.

## 4. Add Lead Detail Page

**Goal:** Create a central workspace for one lead.

Route:

```txt
/leads/:id
```

Layout idea:

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

Initial version can be simpler:

```txt
Lead Detail
|-- Lead summary
|-- Linked deals placeholder
`-- Activity timeline placeholder
```

Frontend:
- Add route.
- Add API function for `getLead(id)`.
- Make lead names clickable from Leads table.
- Show owner info if Step 1 is complete.

**Outcome:** Leads become inspectable records, not just table rows.

## 5. Extend Lead Fields For CRM Use

**Goal:** Bring Leads closer to the spec before deals and dashboard depend on them.

Potential fields:
- `status`: `new`, `contacted`, `negotiating`, `won`, `lost`
- `priority`: `low`, `medium`, `high`
- `budget`: decimal/number, nullable

Backend:
- Add Prisma enums/fields.
- Update lead create/update schemas.
- Update API responses.

Frontend:
- Update domain type.
- Update create/edit forms.
- Show status/priority in the table or detail page.

**Outcome:** Leads contain enough business data to support filtering, dashboard KPIs, and conversion workflow.

## 6. Add Deal Model

**Goal:** Add the core sales opportunity entity.

Prisma model idea:

```prisma
model Deal {
  id        String    @id @default(uuid())
  leadId    String
  lead      Lead      @relation(fields: [leadId], references: [id])
  title     String
  amount    Decimal
  stage     DealStage @default(discovery)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

enum DealStage {
  discovery
  proposal
  negotiation
  closedWon
  closedLost
}
```

**Outcome:** Deals can exist as opportunities linked to leads.

## 7. Add Deal API CRUD

**Goal:** Build the backend foundation for deals.

Routes:

```txt
GET /deals
POST /deals
GET /deals/:id
PATCH /deals/:id
DELETE /deals/:id
```

Validation:
- Zod create/update schemas.
- Validate stage values.
- Validate amount.
- Keep Prisma `P2025` handling.

Auth:
- Protected routes.
- Respect lead ownership rules where relevant.

**Outcome:** Deals have a complete backend API.

## 8. Add Frontend Deal Contracts

**Goal:** Prepare the frontend to consume deal data cleanly.

Files:

```txt
src/domain/deal.ts
src/api/deals.ts
src/features/deals/schemas/createDeal.schema.ts
src/features/deals/schemas/editDeal.schema.ts
```

Include:
- `Deal` type
- `DealInput`
- `DealStage`
- API functions
- Zod form schemas

**Outcome:** Deals follow the same frontend architecture as Leads and Users.

## 9. Add "Create Deal From Lead"

**Goal:** Make deal creation happen from the lead workflow.

On Lead Detail:
- Add `Create Deal` button.
- Open create deal modal.
- `leadId` is prefilled from the current lead.
- On success:
  - invalidate linked deals query
  - show toast
  - close modal

**Outcome:** Users can convert lead interest into a tracked opportunity.

## 10. Show Linked Deals On Lead Detail

**Goal:** Make the relationship between leads and deals visible.

API options:
- `GET /deals?leadId=...`
- or `GET /leads/:id/deals`

Frontend:
- Add linked deals section.
- Show deal title, amount, stage.
- Empty state: "No deals linked to this lead yet."
- Add edit/delete actions if useful.

**Outcome:** The Lead Detail page becomes a real CRM workspace.

## 11. Add Activity Timeline Placeholder

**Goal:** Reserve space for future Activities without building the full feature yet.

On Lead Detail:

```txt
Activity Timeline
+------------------------------------+
| Activities will appear here once   |
| notes, calls, tasks, and system    |
| events are added.                  |
+------------------------------------+
```

Optional placeholder items:
- "Lead created"
- "Deal created"
- "Stage changed"

Keep them static and non-data-backed for now.

**Outcome:** The UI is designed with the future Activities module in mind.

## 12. Add Deals Page

**Goal:** Give users a list view for all deals.

Route:

```txt
/deals
```

UI:

```txt
Deals
|-- Header with Create Deal button
`-- Deals table
    |-- Title
    |-- Lead
    |-- Amount
    |-- Stage
    `-- Actions
```

Use:
- TanStack Query
- skeleton loading
- empty state
- edit/delete confirmation
- toasts

**Outcome:** Deals can be managed outside the lead detail page too.

## 13. Add Pipeline Page

**Goal:** Visualize deals by stage.

Route:

```txt
/pipeline
```

Layout idea:

```txt
Pipeline
|-- Discovery
|   |-- Deal card
|   `-- Deal card
|-- Proposal
|   `-- Deal card
|-- Negotiation
|   `-- Deal card
|-- Closed Won
|   `-- Deal card
`-- Closed Lost
    `-- Deal card
```

Start simple:
- group deals by stage
- each deal appears as a compact card
- move deals between stages with drag and drop
- reuse the existing deal update API for stage changes

**Outcome:** The app gets its first real CRM pipeline view.

## 14. Add Dashboard KPIs

**Goal:** Make the dashboard meaningful using real data.

Initial KPI cards:
- Total leads
- Active deals
- Won value
- Pipeline value
- Won deals percentage

Implementation options:
- Backend endpoint: `GET /dashboard/summary`
- Or frontend-derived from existing leads/deals queries.

Recommendation:
- Use backend endpoint once deal data exists, because dashboard logic will grow.
- Keep KPI scoping on the backend because role-aware filtering is security-sensitive.

Role-aware scope:
- Admin default view shows all-team KPIs.
- Admin can filter KPIs by a specific user to inspect one team member's pipeline and lead state.
- Sales agents see their own KPIs only.
- Viewers see broad aggregate KPIs only.

API shape:

```txt
GET /dashboard/summary
GET /dashboard/summary?ownerId=<userId>
```

Rules:
- `ownerId` is accepted only for admins.
- No `ownerId` means all-team scope for admins and viewers.
- Sales agents always receive self-scoped KPIs.

Future dashboard v2:
- Add admin workforce overview with per-user performance, workload, lead ownership, deal value, and conversion signals.
- Consider a dedicated admin-only Analytics or Team Performance page with Team Performance, Conversion Rates, Revenue by Owner, Pipeline by Owner, and Leaderboard views.
- Keep basic owner comparisons based on current leads/deals separate from deeper movement analytics. Stage conversion, time-in-stage, proposal-to-won velocity, and bonus-oriented reporting should wait until Timeline Events exist.

Layout idea:

```txt
Dashboard
|-- KPI Cards
|   |-- Total Leads
|   |-- Active Deals
|   |-- Pipeline Value
|   |-- Won Value
|   `-- Won Deals %
|
|-- Admin Scope Filter
|-- Recent Leads
|-- Recent Deals
`-- Pipeline Snapshot
```

**Outcome:** Dashboard becomes useful instead of decorative.

## 15. Update Docs And Smoke Checklist

**Goal:** Close Phase 2 cleanly.

Update:
- frontend README
- backend README
- `PROCESS.md`
- smoke checklist
- env examples if needed

Add smoke checks:
- create lead
- create deal from lead
- view linked deals
- move deal stage
- pipeline renders grouped deals
- dashboard KPIs render
- deal edit/delete permissions work
- sortable users, leads, and deals tables work
- protected demo accounts cannot be edited or deleted

**Outcome:** Phase 2 is documented and reproducible.

## Suggested Session Order

1. Lead ownership data model
2. Role-aware lead access
3. Demo seed data
4. Lead detail page shell
5. Lead fields: status, priority, budget
6. Deal model and migration
7. Deal API CRUD
8. Frontend deal contracts/API/schemas
9. Create deal from lead
10. Linked deals on lead detail
11. Deals list page
12. Pipeline page
13. Dashboard KPIs
14. Deal edit/delete workflows
15. Table sorting
16. Docs and smoke checklist

## Scope Boundary

Include in Phase 2:
- Lead ownership
- Lead detail
- Deals
- Pipeline
- Dashboard KPIs
- Activity placeholder
- Drag-and-drop pipeline movement
- Deal edit/delete workflows
- Sortable users, leads, and deals tables

Do not include yet:
- Full Activities CRUD
- Task completion workflows
- Email/password reset
- Advanced filters/search/pagination
- Saved filter presets
- Full role permission matrix UI

Those are better for Phase 3.
