
# Process

### 1. Brainstorming

This project started as a simple idea: "a user management app."  
I wanted it to be more than just a list of users, so I spent time exploring ideas that would make it **realistic, useful, and portfolio-worthy**.  

#### Key steps in my process:

1. **Idea Exploration**  
   - Considered different contexts: classrooms, clubs, small teams.  
   - Settled on a lightweight **CRM for small teams**, because it’s professional, shows real-world thinking, and allows multiple modules and user roles.

2. **Defining Scope & Value**  
   - Identified who would use it (freelancers, small businesses, junior sales teams).  
   - Defined the problem it solves: scattered client information, lack of visibility, missed opportunities.  
   - Defined core value: centralization of leads, deals, and activities for clarity and productivity.

3. **Structuring the App**  
   - Decided on **modules**: Leads, Deals, Activities, Dashboard, Search/Filter, Authentication.  
   - Thought about **roles**: Admin, Sales Agent, Viewer — with clear permissions.  
   - Outlined **user flows**: from lead creation to deal closure, including admin oversight.

4. **Spec Sheet Drafting**  
   - Listed **functional requirements** for each module.  
   - Designed the **data model** (Leads, Deals, Activities).  
   - Defined **API endpoints** for full CRUD operations.  
   - Selected the **tech stack** (React, TypeScript, Tailwind, Node.js, Express, Prisma, PostgreSQL).  
   - Planned **UI pages** and **dashboard KPIs**.

This process ensures the app is **cohesive, realistic, and shows professional thinking**, not just technical ability.

> **Note:** For full details on Project Overview, User Roles, Features, Requirements, Data Model, API Endpoints, Technical Stack, UI Overview, and User Flows, see "docs/spec-sheet.md" file

<!-- > **Note:** Backend is private for security and intellectual property reasons. Demo works live. -->

---
### 2. Text Mockup & User Flow
This phase translates the functional requirements into a first representation of the interface, without focusing on visual design. The goal is to map the user journey, pages, and interactions in a clear, structured way.

**Purpose**: To define what users see and can do on each page, and how the app behaves in different scenarios (modals, workflows, and triggers).

#### Approach:

1. Start from the user flow: login → dashboard → leads → deals → activities → logout.
2. Define all pages: dashboard, leads list/detail, deals list/detail/pipeline, activities.
3. Define all modals: create/edit leads & deals, add activity, delete confirmation, move deal stage.
4. Document page elements: tables, filters, KPI cards, buttons, timeline sections.
5. Document triggers: which action opens which modal, what changes on system vs. user events.
6. Note permissions: which actions are restricted to which role.

#### Deliverables:
	- Text-based mockups of pages & modals
	- User-flow-based table of contents / checklist
	- Clear mapping of triggers, interactions, and permissions

> **Note:** For the full text mockup, see "docs/text-mockup.md" file

---

### 3. Figma Wireframes / Low Fidelity Mockup
This phase focuses on establishing the core application layout and main user workflow through low-fidelity wireframes. The objective is not to design every screen or interaction, but to validate structure, hierarchy, and navigation before starting implementation.

**Purpose:** To visually map the primary pages and their relationships, ensuring that the overall flow, layout, and information architecture are clear and code-ready without committing to visual design details.

#### Approach:
1. Identified the main user flow: login -> dashboard -> core management pages.
2. Created a single Figma page containing the key screens placed side by side to illustrate navigation and progression
3. Designed low-fidelity wireframes for:
	- Login page (authentication entry point)
	- Dashboard (global layout, navigation placement, and content sections)
4. Defined dashboard structure, including:
	- Navigation area placement (navbar)
	- Top KPI metrics
	- Recent activity feed (limited rows for scannability)
	- High-level charts and task overview sections
5. Used placeholders for content, data, and navigation labels to avoid premature visual decisions.

#### Deliverables: 
	- One low-fidelity Figma page showing the main workflow and core layouts
	- Clear visual separation of primary application areas
	- Enough structural detail to begin coding using a component-based UI system (shadcn)

> **Note:** For the first visual mockup, see "docs/lo-fi mockup.png".

---

### 4. Application Implementation (Scaffolding & Routing Foundation)

This phase focuses on establishing the technical foundation of the application, translating the validated user flows into a runnable, structured codebase.

**Purpose:** To set up a scalable frontend architecture with explicit routing, layout boundaries, and a clear separation between pages, routes, and future business logic.

#### Approach:
1. Scaffolded the project with Vite, React, and TypeScript.
2. Cleaned the default setup and applied neutral CSS.
3. Designed a feature-oriented folder structure (pages, routes, features).
4. Implemented code-based routing using TanStack Router.
5. Created and scoped application layout (navigation + content outlet).
6. Defined clear route boundaries between:
	- Public routes (login)
	- Main application routes (dashboard and users)

#### Deliverables:
	- Functional routing with TanStack Router
	- Standalone login page (no layout)
	- Shared application layout for dashboard and users
	- Navigable routes between core pages
	- Solid foundation for future data fetching and feature development

> **Note:** This phase focuses on routing and layout only. No business logic, data fetching, or UI components are implemented yet.

--- 

### 5. Server-state & First Data-Driven Screen
This step introduces server-state management into the appllication and connects the UI to real, asynchronous data.

**Purpose:** Demonstrate the use of TanStack Query to manage server-state in a predictable, scalable way while keeping a clean separation between data fetching logic and UI rendering.

#### Approach:
1. Configure a global TanStack Query client and provider at the application root.
2. Define a typed mock users API to simulate real-world data fetching.
3. Fetch users on the Users page using useQuery hooks.
4. Rendre a minimal list driven by asynchronous data.
5. Explicitly handle loading and error states in the UI.

#### Deliverables:
	- TanStack Query client and provider wired into the app
	- A mock users data source with async behavior and error simulation
	- A User page fetching data through TanStack Query
	- A simple list rendering user information
	- Clear loading and error states displayed to the user

> **Note:** This phase focuses on data fetching and server-state management only. The mock API mirrors a real backend response allowing for future integration.

---

### 6. Users Table Integration with shadcn/ui
This step enhances the Users page by integrating a structured table component from shadcn/ui, improving data presentation while maintaining existing data-fetching logic.

**Purpose:** To upgrade the Users page UI by replacing the basic list with a well-structured table component, demonstrating the ability to integrate third-party UI libraries without altering the underlying data logic.

#### Approach:
1. Install and configure shadcn/ui in the project.
2. Create a reusable UsersTable component using shadcn/ui table primitives.
3. Pass the fetched users data to the UsersTable component.
4. Display user data in a table layout with columns for Email, Role,.
5. Ensure that the TanStack Query setup and API contracts remain unchanged.

#### Deliverables:
	- shadcn/ui installed and configured
	- A reusable UsersTable component
	- Users page displaying data in a structured table format

---

### 7. Users Page UX & Visual Refinements

This step focuses on improving the visual clarity of the Users page through light UI and UX enhancements, while keeping all existing logic, data fetching, and component structure unchanged.

**Purpose:**  
To make the Users page easier to read and understand at a glance by adding contextual framing, clear user state indicators, and subtle visual polish without introducing new features or complexity.

#### Approach:
1. Add a page title and short descriptive text to provide context.
2. Ensure consistent alignment between page content and the users table.
3. Implement an empty state message for cases where no users are available.
4. Improve the visual representation of user status using a subtle badge.
5. Apply minimal table-level visual refinements for readability (row distinction, compact status column, borders).
6. Preserve existing TanStack Query logic and shadcn/ui integration.

#### Deliverables:
- Users page with clear title and description.
- Users table with visual status indicators for user state.
- Empty state handling when no users are present.
- Improved table readability through subtle visual cues.
- No changes to data flow, fetching logic, or application behavior.

---

### 8. Users Page – Actions Column (UI Only)

This step focuses on extending the Users page with a visual foundation for user-level actions, without introducing any new logic, state management, or data mutations.

**Purpose:**  
To visually prepare the Users page for future CRUD functionality by introducing an Actions column and clearly signposting available user interactions, while keeping the application behavior unchanged.

#### Approach:
1. Add an Actions column to the Users table layout.
2. Display placeholder action buttons (Edit, Delete) for each user row.
3. Ensure action buttons are visually clear and consistently aligned with existing table content.
4. Keep all actions non-functional or disabled (UI-only).

#### Deliverables:
- Users table with an Actions column.
- Placeholder Edit and Delete buttons for each user.

---

### 9. Create User - Modal Form with Validation (UI Only)
Implemented a controlled "Create User" flow using a modal, focusing on form structure, state management, and validation without introducing persistence or side effects. This setp establishes a solid UI and validation foundation before integrating backend functionality.

**Purpose:**  
To enable user creation through a modal form that includes proper structure and validation, while keeping all side effects, data mutations, and persistence out of scope.

#### Approach:
1. Chose a modal-based flow scoped to the User page to avoid route complexity.
2. Built a controlled modal using shadcn/ui Dialog, managed by parent state.
3. Implemented static form UI using shadcn components (inputs, selects, radio buttons).
4. Integrated React Hook Form to manage form state without local useState.
5. Defined a Zod schema for user creation.
6. Connected Zod validation to React Hook Form.
7. Tunedvalidation UX and errors messages to avoid aggressive feedback.
8. Managed modal lifecycle edge cases by resetting form state and clearing errors on open/close.

#### Deliverables:
- Controlled CreateUserModal component.
- User creation form with email, role and status fields.
- Centralized Zod schema for user creation.
- RHF-managed form state with validation.
- Disabled submit until form is valid.
- Clean form reset on modal open/close.
- no persistence or side effects(by design).

>**Note:** A minor validation flash can occur during modal close due to Radix Dialog focus and RHF re-rendre timing. This was accepted as a non-blocking UX edge case to avoid unnecessary complexity.
---

### 10. Backend Foundation - Database, ORM, and Server Setup
Backend groundwork for the application, establishing a fully functional database layer, ORM integration and Express server with diagnostic endpoint.

**Purpose:**
Build a stable, production-shaped backend foundation capable of connecting to a real PostgreSQL database, exposing a running API server, and providing runtime health diagnostics.

#### Approach:
1. Initialize a dedicated backend codebase.
2. Set up a local PostgreSQL database.
3. Configure Prisma ORM(v7) with a PostgreSQL driver adapter.
4. Define the initial database schema with a User model and apply migrations.
5. Generate and validate the Prisma Client.
6. Initialize an Express server with TypeScript support.
7. Implement a health-check endpoint that verifies server status and database connectivity.
8. Implement routing into isolated modules for future API routes.

#### Deliverables:
- Backend codebase initialized.
- Local PostgreSQL database running.
- Prisma configured with PostgreSQL.
- User model defined and migrated.
- Prisma client generated and validated.
- Express server initialized with TypeScript.
- Health-check endpoint confirming server and database status.

> **Note:** This phase focuses on backend infrastructure only. No user-specific API routes or frontend integration are implemented yet.

### 11. Authentication Skeleton (Routing Only)
This step establishes clear entry points for future authentication features while preserving the current backend stability.

**Purpose:**
To create a dedicated authentication route structure and verify end-to-end request flow from client to server, ensuring the backend is ready to support authentication logic in subsequent steps.

##### Approach:
1. Created a new auth module under /src/modules/auth.
2. Implemented auth.route.ts with placeholder endpoints for login and password change.
3. Defined dummy responses to validate route behavior without introducing logic.
4. Integrated the auth router into the central routing system (/src/routes/index.ts).
5. Started the server and verified route accessibility using an API client (e.g., Postman).
6. Confirmed no regression on existing routes (health-check endpoint).

#### Deliverables:
- /src/modules/auth/auth.route.ts with /login and /change-password endpoints
- Auth router successfully mounted under /auth
- Verified request/response cycle for both endpoints
- No impact on existing backend functionality


### Authentication Skeleton

Initial setup of the authentication module and route structure without implementing business logic.

**Purpose:**  
Establish a clear and modular `/auth` route structure integrated into the Express application, preparing the backend for future authentication features.

#### Approach:
1. Create `/auth` route module
2. Define placeholder endpoints for login and password change
3. Integrate auth routes into the main router
4. Return stub responses to validate request flow

**Deliverables:**
- `/auth` route module created
- Endpoints (`POST /auth/login`, `POST /auth/change-password`) exposed
- Routes successfully wired into the application
- Verified request/response cycle with placeholder responses

> **Note:**  
> This session focuses only on structure and routing. No authentication logic is implemented at this stage.

### Login Logic

Implementation of the core login flow allowing users to authenticate using email and password, with basic validation and error handling.

**Purpose:**  
Enable user authentication by verifying credentials against stored user data, establishing the foundation for future access control.

#### Approach:
1. Fetch user by email using Prisma
2. Validate user existence
3. Compare submitted password with stored password (temporary plain check)
4. Handle invalid credentials with consistent responses
5. Return success response on valid authentication

**Deliverables:**
- Functional `POST /auth/login` endpoint
- User lookup via Prisma
- Credential validation flow implemented
- Proper error handling for invalid login attempts
- End-to-end login flow tested

> **Note:**  
> Password comparison is currently implemented using a temporary plain check for simplicity.  
> This will be replaced with `bcrypt.compare` in a later step.

### Session 12 — Leads Creation (POST /leads)

Implementation of the first business feature allowing users to create leads and persist them in the database.

**Purpose:**  
Introduce the first core CRM entity and validate the full backend flow from request to database persistence.

#### Approach:
1. Define Lead model in Prisma schema
2. Run migration to update database
3. Generate Prisma client
4. Create `/leads` route module
5. Implement `POST /leads` endpoint
6. Connect route to main application
7. Test endpoint using Postman

**Deliverables:**
- Lead model defined and migrated
- Functional `POST /leads` endpoint
- Successful data persistence in database
- Verified request/response cycle

> **Note:**  
> Encountered Prisma client sync issues requiring a full reinstall and regeneration.  
> Resolved by returning to default Prisma client setup and removing custom output configuration.

### Session 13 — Leads Retrieval (GET /leads)

Implementation of the endpoint to retrieve all leads from the database.

**Purpose:**  
Enable reading persisted lead data and validate full read flow from database to client.

#### Approach:
1. Add GET /leads route
2. Use Prisma `findMany` to fetch all leads
3. Return results as JSON
4. Test endpoint using Postman

**Deliverables:**
- Functional GET /leads endpoint
- Leads successfully retrieved from database
- Verified response in Postman

> **Note:**  
> Minimal implementation without filtering or pagination to maintain scope and speed.

### Session 14 — Lead Detail Retrieval (GET /leads/:id)

Extension of the Leads module to support retrieval of a single lead by its unique identifier.

**Purpose:**  
Enable access to individual lead data and complete the core read capabilities of the Leads module.

#### Approach:
1. Implement `GET /leads/:id` endpoint
2. Extract `id` from route parameters
3. Query database using `prisma.lead.findUnique`
4. Handle non-existent lead with 404 response
5. Test endpoint using valid and invalid IDs
6. Verify behavior with multiple existing leads

**Deliverables:**
- Functional `GET /leads/:id` endpoint
- Proper 404 response for missing leads
- Verified retrieval of multiple distinct records

> **Note:**  
> Existing `GET /leads` endpoint was reused to validate multiple records.  
> UUID format was preserved for identifiers, aligning with the existing data model.


### Session 15 — Lead Update (PATCH /leads/:id)

Implementation of update functionality for the Lead entity, enabling modification of existing lead data.

**Purpose:**  
Complete the "update" portion of CRUD for leads and allow existing records to be modified through the API.

#### Approach:
1. Implement `PATCH /leads/:id` endpoint
2. Extract `id` from route parameters
3. Extract updatable fields (`name`, `email`, `company`) from request body
4. Use `prisma.lead.update` to modify the record
5. Handle non-existent lead using try/catch (Prisma throws on missing record)
6. Test endpoint using Postman with valid and invalid IDs
7. Verify updated data via `GET /leads` and `GET /leads/:id`

**Deliverables:**
- Functional `PATCH /leads/:id` endpoint
- Successful update of existing lead data
- Proper 404 response when lead does not exist
- Verified persistence of updated values

> **Note:**  
> Unlike `findUnique`, Prisma `update` throws an error when the record does not exist, requiring try/catch handling instead of a null check.

### Session 16 — Lead Deletion (DELETE /leads/:id)

Implementation of deletion functionality for the Lead entity, including proper handling of non-existent records.

**Purpose:**  
Enable removal of leads from the database while ensuring correct API behavior when attempting to delete a missing resource.

#### Approach:
1. Implement `DELETE /leads/:id` endpoint
2. Extract `id` from route parameters
3. Use `prisma.lead.delete` to remove the lead
4. Wrap operation in try/catch block
5. Handle Prisma `P2025` error for non-existent leads
6. Return appropriate HTTP responses (200, 404, 500)
7. Test endpoint using valid and invalid IDs

**Deliverables:**
- Functional delete endpoint
- Proper 404 response when lead does not exist
- 500 response for unexpected errors
- Verified deletion behavior through API testing

> **Note:**  
> Error handling was refined to distinguish between expected (not found) and unexpected (server) errors while keeping implementation minimal and aligned with MVP scope.


### Session 17 — Leads Display (Frontend Integration)

Integration of the Leads API into the frontend, enabling retrieval and display of lead data in the UI.

**Purpose:**  
Connect frontend to backend and visualize lead data, completing the first full-stack data flow for the Leads feature.

#### Approach:
1. Fetch leads from backend (`GET /leads`)
2. Handle asynchronous data loading in React
3. Resolve TypeScript issue with possibly undefined data
4. Reuse existing UI table structure from users page
5. Map leads data into table rows
6. Validate display with multiple records

**Deliverables:**
- Leads successfully fetched from backend
- Leads displayed in frontend table
- TypeScript-safe handling of async data
- Verified end-to-end data flow (DB → API → UI)

> **Note:**  
> Existing UI components were reused and adapted rather than rebuilt, prioritizing speed and consistency. Styling and layout refinement are intentionally deferred to maintain focus on functionality.

### Session 18 — Lead Creation (Frontend Integration)

Implementation of lead creation from the frontend, completing the full user flow for the Leads feature.

**Purpose:**  
Allow users to create new leads directly from the UI and validate the full data flow from frontend to database.

#### Approach:
1. Create a simple form in the frontend
2. Handle form submission with React
3. Prevent default form behavior
4. Send POST request to `/leads`
5. Refresh or update displayed leads
6. Verify new lead appears in UI and database

**Deliverables:**
- Functional form for creating leads
- Successful POST request from frontend
- New leads persisted in database
- UI updated with newly created lead

> **Note:**  
> Implementation was intentionally kept simple (no modal or validation) to prioritize completion of the full feature loop.

### Session 19 — Lead Deletion (Frontend Action)

Integration of lead deletion from the frontend, enabling users to remove leads directly from the UI.

**Purpose:**  
Allow users to delete leads through the interface and validate the full deletion flow from frontend to database.

#### Approach:
1. Add a delete button to each lead row in the table
2. Attach click handler to trigger deletion
3. Send DELETE request to `/leads/:id`
4. Refresh or update leads list after deletion
5. Verify removal in both UI and database

**Deliverables:**
- Functional delete button in UI
- Successful DELETE request from frontend
- Lead removed from database
- UI updated to reflect deletion

> **Note:**  
> A simple button-based approach was used without confirmation or additional UI feedback to maintain speed and focus on core functionality.

### Session 20 — Lead Creation Modal (Frontend UX)

Refinement of the lead creation flow by moving the form into a modal and improving basic input handling.

**Purpose:**  
Improve user experience by isolating lead creation in a dedicated modal while ensuring reliable form submission.

#### Approach:
1. Move lead creation form into a shadcn Dialog (modal)
2. Fix form submission issue caused by portal rendering
3. Ensure form is correctly placed inside DialogContent
4. Handle form submission with POST request to `/leads`
5. Add basic guard to prevent empty field submission
6. Validate functionality through UI interaction and database updates

**Deliverables:**
- Functional modal for creating leads
- Correct form submission within Dialog context
- Successful POST request from modal
- Basic protection against empty inputs

> **Note:**  
> Implementation focused on usability and correctness. Validation remains minimal and will be expanded later if needed.

### Session 21 — Navigation Layout & Sidebar (Frontend Polish)

Implementation of a basic application layout with sidebar navigation and active route highlighting.

**Purpose:**  
Improve usability and structure by introducing a persistent navigation system, making the app feel more like a real product.

#### Approach:
1. Replace grid layout with flexbox for simpler structure
2. Create a sidebar navigation with links (Dashboard, Users, Leads)
3. Style sidebar with subtle background and border separation
4. Implement active route highlighting using router features
5. Organize layout into sidebar + main content structure
6. Remove unnecessary footer to simplify layout

**Deliverables:**
- Functional sidebar navigation
- Active page highlighting
- Clean layout structure (sidebar + content)
- Improved visual clarity and usability

> **Note:**  
> Styling was intentionally kept minimal, focusing on clarity and structure rather than visual polish.
---
### Next Step Admin-Driven User Management & Credential Flow
Introduce user management capabilities aligned with an internal CRM model, where administrators create and manage user accounts. This phase establishes secure credential handling and role-based access foundations without implementing public registration or email-based onboarding.

**Goal:**
Enable controlled creation of user accounts by administrators, enforce role and status constraints, and provide a secure password change mechanism ensuring users can safely manage their credentials after initial provisioning.

**checklist:**
- [ ] Define admin-only user creation route (POST /users)
	- enforced via role check middlware
- [ ] Accept user attributes (email, role, status)
- [ ] Mark newly created users as requiring password change on first login
- [ ] Hash all passwords before persistence
- [ ] Prevent duplicate users via unique email constraint
- [ ] Implement login endpoint (POST /auth/login)
- [ ] Enforce mandatory password change on first login
- [ ] Implement password change endpoint (POST /auth/change-password)
- [ ] Restrict protected routes based on user role and status
- [ ] Document user management and authentication routes

## Authentication & Access — Implementation Breakdown

This phase is intentionally split into small, self-contained sessions to reduce cognitive load and maintain steady progress. Each session is designed to be completed, committed, and stopped without pressure to continue.

---

### Session 3 — Password Change Flow

**Description:**  
Introduce secure credential rotation for users, enforcing password updates when required.

**Goal:**  
Ensure users can change their password and that newly created accounts are forced to update credentials on first login.

**Checklist:**
- [ ] Add `mustChangePassword` logic to user model usage
- [ ] Implement `POST /auth/change-password`
- [ ] Validate current and new passwords
- [ ] Hash and persist updated password
- [ ] Clear password-change requirement after update

**Commit message:**  
`auth: add password change flow`

---

### Session 4 — Role & Status Enforcement

**Description:**  
Protect sensitive routes using role-based and status-based access control.

**Goal:**  
Prevent unauthorized or disabled users from accessing protected API endpoints.

**Checklist:**
- [ ] Implement basic authentication middleware
- [ ] Enforce user status checks (active / disabled)
- [ ] Enforce role-based restrictions where applicable
- [ ] Apply middleware to protected routes
- [ ] Return consistent authorization errors

**Commit message:**  
`auth: enforce role and status access control`

---

> **Note:**  
> Each session is intentionally independent. Completing and committing a single session is considered full progress for the day.

### Next Step — Leads Management (CRM Core)

- Define Lead model (id, name, email, status, etc.)
- Create CRUD endpoints for leads
- Link leads to users (owner / assigned)
- Prepare for pipeline/status tracking