# Phase 2 Roadmap: Ownership, Deals, And Pipeline

Purpose: move the CRM from basic lead/user management into a real sales workflow by adding lead ownership, lead detail pages, deals, pipeline tracking, and dashboard KPIs.

## 1. Add Lead Ownership

**Goal:** Connect leads to users so the CRM starts reflecting real team ownership.

Backend:
- Add `ownerId` to `Lead`.
- Add Prisma relation:
  - `User` has many `Lead`s.
  - `Lead` belongs to one `User` owner.
- On lead creation, assign `ownerId` from the JWT payload.
- Include safe owner info in lead responses.

Frontend:
- Update `Lead` domain type.
- Show lead owner in the Leads table or later on Lead Detail.
- Keep owner assignment automatic for now.

**Outcome:** Leads are no longer floating records; they belong to a user.

## 2. Add Role-Aware Lead Access

**Goal:** Make roles start to matter beyond UI labels.

Rules:
- Admin: can see all leads.
- Sales Agent: can see only their own leads.
- Viewer: can see leads but not mutate them, or can see all read-only depending on the final product choice.

Backend:
- Use `req.user` from `authMiddleware`.
- Filter lead queries based on role.
- Restrict create/edit/delete actions based on role.

Frontend:
- Hide or disable actions the current role cannot use.
- Keep backend as the real source of permission enforcement.

**Outcome:** The app starts behaving like a multi-user CRM.

## 3. Add Lead Detail Page

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

## 4. Extend Lead Fields For CRM Use

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

## 5. Add Deal Model

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

## 6. Add Deal API CRUD

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

## 7. Add Frontend Deal Contracts

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

## 8. Add "Create Deal From Lead"

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

## 9. Show Linked Deals On Lead Detail

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

## 10. Add Activity Timeline Placeholder

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

## 11. Add Deals Page

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

## 12. Add Pipeline Page

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
- stage movement can be a select or buttons
- drag-and-drop can wait

**Outcome:** The app gets its first real CRM pipeline view.

## 13. Add Dashboard KPIs

**Goal:** Make the dashboard meaningful using real data.

Initial KPI cards:
- Total leads
- Total deals
- Pipeline value
- Deals by stage
- Won deals
- Lost deals

Implementation options:
- Backend endpoint: `GET /dashboard/kpis`
- Or frontend-derived from existing leads/deals queries.

Recommendation:
- Use backend endpoint once deal data exists, because dashboard logic will grow.

Layout idea:

```txt
Dashboard
|-- KPI Cards
|   |-- Total Leads
|   |-- Total Deals
|   |-- Pipeline Value
|   `-- Win Rate
|
|-- Deals By Stage
`-- Recent Activity Placeholder
```

**Outcome:** Dashboard becomes useful instead of decorative.

## 14. Update Docs And Smoke Checklist

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

**Outcome:** Phase 2 is documented and reproducible.

## Suggested Session Order

1. Lead ownership data model
2. Role-aware lead access
3. Lead detail page shell
4. Lead fields: status, priority, budget
5. Deal model and migration
6. Deal API CRUD
7. Frontend deal contracts/API/schemas
8. Create deal from lead
9. Linked deals on lead detail
10. Deals list page
11. Pipeline page
12. Dashboard KPIs
13. Docs and smoke checklist

## Scope Boundary

Include in Phase 2:
- Lead ownership
- Lead detail
- Deals
- Pipeline
- Dashboard KPIs
- Activity placeholder

Do not include yet:
- Full Activities CRUD
- Task completion workflows
- Email/password reset
- Drag-and-drop pipeline
- Advanced filters/search/pagination
- Saved filter presets
- Full role permission matrix UI

Those are better for Phase 3.
