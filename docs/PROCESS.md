
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

### Session 22 — Leads Page Polish (Frontend UI)

Refinement of the Leads page to improve layout clarity, spacing, and overall presentation.

**Purpose:**  
Enhance readability and visual structure of the Leads feature to make the interface more consistent and demo-ready.

#### Approach:
1. Adjust table layout and spacing for better readability
2. Improve alignment of columns and action buttons
3. Refine positioning of primary action (“Add Lead”)
4. Ensure consistent styling with existing components
5. Validate visual clarity with multiple data entries

**Deliverables:**
- Cleaner and more readable leads table
- Improved spacing and alignment
- More consistent UI presentation across elements
- Demo-ready interface for Leads feature

> **Note:**  
> Minor inconsistencies with the Users page were identified and will be addressed later as part of a broader UI consistency pass.

### Session 23 — Lead Update (Edit) Functionality (Frontend Integration)

Implementation of lead editing from the frontend, completing full CRUD functionality for the Leads feature.

**Purpose:**  
Allow users to modify existing leads through the UI and validate the complete update flow from frontend to database.

#### Approach:
1. Add edit button to each lead row
2. Create an Edit Lead modal using existing dialog structure
3. Pass selected lead data to modal
4. Pre-fill form fields with current lead values
5. Handle form submission using PATCH request to `/leads/:id`
6. Fix issues related to React re-renders and form structure
7. Validate update behavior through UI and database changes

**Deliverables:**
- Functional edit button in UI
- Modal with pre-filled lead data
- Successful PATCH request from frontend
- Updated lead reflected in UI and database
- Stable component behavior (no infinite re-renders)

> **Note:**  
> Existing modal and form patterns were reused to maintain consistency and minimize complexity. Minor bugs related to state and effects were resolved during implementation.

### Session 24 — Login Page (Frontend Entry Point)

Implementation of a minimal login page to provide a clear entry point into the application.

**Purpose:**  
Introduce a realistic access flow (login → app) to improve first impression and usability for demo and portfolio purposes.

#### Approach:
1. Create a centered login form using existing UI components
2. Add input fields for username and password
3. Handle form submission with a simple redirect (fake authentication)
4. Store a temporary login flag in localStorage
5. Redirect users to the Leads page (main functional feature)

**Deliverables:**
- Clean and functional login page
- Working form submission handler
- Redirect to `/leads` after login
- Improved application entry flow

> **Note:**  
> Authentication is intentionally mocked. Real authentication (JWT, backend validation) will be implemented in a later phase.

### Session 25 — App Walkthrough & Final Polish (Stability Check)

Final walkthrough of the application to validate core flows and resolve minor UI inconsistencies before deployment.

**Purpose:**  
Ensure the application is stable, consistent, and ready for deployment by verifying real user interactions and fixing small visual issues.

#### Approach:
1. Perform full user flow walkthrough:
   - Login → Leads page
   - Create lead
   - Edit lead
   - Delete lead
   - Navigation between pages
2. Identify minor UI inconsistencies and layout issues
3. Apply small fixes (spacing, alignment, consistency)
4. Confirm absence of blocking bugs

**Deliverables:**
- Verified end-to-end functionality
- No infinite loops or broken flows
- Improved UI consistency across pages
- Stable, demo-ready application state

> **Note:**  
> API calls remain inline for now. Refactoring to a dedicated API layer is planned for a future iteration after deployment.

### Session 26 — Deployment (Full-Stack App Live)

Successfully deployed the CRM application (frontend + backend + database) to production.

**Purpose:**  
Make the application publicly accessible and production-ready to support portfolio demonstration and job applications.

---

### Backend Deployment (Render)

- Deployed Node.js + Express API to Render
- Configured environment variables:
  - `DATABASE_URL` (Supabase Postgres with connection pooling)
- Ensured server listens on `process.env.PORT`
- Fixed TypeScript build issues (`tsconfig` mismatch)
- Switched from running `.ts` files to compiled `/dist` output
- Resolved Prisma client issues:
  - Removed custom generator output
  - Removed adapter-based setup
  - Regenerated standard Prisma client
- Verified deployment with `/health` endpoint:
  - server status: OK
  - database connection: OK

---

### Database (Supabase)

- Created hosted PostgreSQL database
- Configured Prisma connection string
- Applied schema via `prisma migrate deploy`
- Verified tables and connectivity

---

### Frontend Deployment (Vercel)

- Deployed React (Vite) application to Vercel
- Configured environment variable:
  - `VITE_API_URL` → Render backend URL
- Replaced hardcoded localhost API calls with environment-based URL
- Ensured environment variables are injected at build time

---

### Production Fixes

- Fixed API base URL handling (centralized constant)
- Resolved environment variable issues (missing redeploy)
- Fixed SPA routing issue on Vercel:
  - Added `vercel.json` rewrite to support client-side routing
- Verified all routes work on reload (no 404)

---

### Final Validation

- Full end-to-end test in production:
  - login → redirect
  - create lead
  - edit lead
  - delete lead
- Confirmed frontend ↔ backend ↔ database integration
- Application is now publicly accessible and fully functional

---

### Outcome

- Live full-stack application deployed
- Portfolio updated with working demo
- Project is ready for demonstration and job applications

> This marks the transition from development phase to application phase.

---

### Session 27 - Roadmap Documentation & Terminal Workflow

Created a structured roadmap to plan the remaining consistency and completion work for the CRM application.

**Purpose:**  
Preserve a clear trace of the next development steps after deployment, while also improving the project documentation workflow using terminal-only tools.

#### Approach:
1. Reviewed the current frontend and backend codebase structure.
2. Identified remaining consistency gaps between frontend, backend, authentication, users, and leads.
3. Broke the remaining work into roughly one-hour coding sessions.
4. Created a styled roadmap source document locally.
5. Generated an export version using headless Chrome during the initial documentation pass.
6. Edited the source document from the terminal using Micro.
7. Regenerated the export after edits.
8. Moved the roadmap files into the frontend docs folder.
9. Removed the temporary root-level docs folder to keep documentation inside the project structure.
10. Later consolidated the roadmap to Markdown only so the portfolio docs stay lean and maintainable.

#### Deliverables:
- `front-end/docs/finish-roadmap.md`
- Roadmap split into one-hour implementation sessions.
- Cleaner documentation structure with no unused root `docs` folder.
- Improved terminal workflow for editing, regenerating, moving, and cleaning documentation files.

> **Note:**  
> This session focused on planning, documentation, and workflow hygiene rather than application code changes. The roadmap now provides the next implementation path for making the app more consistent.

---

### Session 28 - Frontend API Auth Normalization

Refactored frontend lead API calls so protected requests consistently send the JWT stored during login.

**Purpose:**  
Ensure all protected lead actions use the same authentication behavior and reduce duplicated request logic across UI components.

#### Approach:
1. Create a small `apiFetch` helper in `src/api/api.ts`
2. Centralize API base URL handling and JWT attachment
3. Create a dedicated `src/api/leads.ts` module for lead-specific API calls
4. Replace inline `fetch` calls in lead components with typed API functions
5. Fix form data typing by validating raw form values before creating the lead payload
6. Build the frontend to confirm the refactor is TypeScript-safe
7. Practice a keyboard-focused editing workflow using Neovim

**Deliverables:**
- Shared `apiFetch` helper for authenticated frontend requests
- Lead API module with `getLeads`, `createLead`, `updateLead`, and `deleteLead`
- Lead create, edit, delete, and fetch calls using the centralized API layer
- Successful frontend build after refactor

> **Note:**  
> This helper is frontend-side request preparation, not backend middleware. It attaches the current JWT when an API call is made so protected backend routes receive the expected `Authorization` header.

---

### Session 29 - Users API Completion & Mock Cleanup

Completed the remaining Users API work from the finish roadmap and removed the unused frontend users mock file after confirming the real API flow is active.

**Purpose:**  
Finish the user-management backend foundation, verify the frontend no longer depends on mock users data, and keep the roadmap checkpoint accurate for the next session.

#### Approach:
1. Confirmed the current Prisma `User` model fields:
   - `id`
   - `email`
   - `password`
   - `role`
   - `status`
   - `createdAt`
   - `updatedAt`
2. Confirmed the backend user enum values:
   - `UserRole`: `admin`, `salesAgent`, `viewer`
   - `UserStatus`: `active`, `disabled`
3. Compared the backend users route against roadmap Step 3.
4. Decided to implement the roadmap's optional `PATCH /users/:id` endpoint instead of leaving it out of scope.
5. Added `PATCH /users/:id` support for role and status updates only.
6. Kept user API responses filtered through `userSelect` so passwords are not returned.
7. Added basic request checks for missing update fields, invalid role values, invalid status values, and missing users.
8. Reviewed frontend users imports and confirmed the users page and create modal use `src/api/users.ts`.
9. Confirmed no frontend source file imports `src/api/users.mock.ts`.
10. Removed the unused users mock API file.
11. Ran the backend build to verify the Users API change.

#### Deliverables:
- `PATCH /users/:id` endpoint in `back-end/src/modules/users/users.route.ts`
- Role/status-only user update behavior
- `404` handling for missing users during update
- Removed unused `front-end/src/api/users.mock.ts`
- `front-end/docs/PROCESS.md` updated with the current roadmap checkpoint
- Successful backend build after the Users API change

#### Roadmap Checkpoint:
- Steps 1 and 2 are complete.
- Step 3 is now complete: users can be listed, created with hashed passwords, returned without passwords, and updated through `PATCH /users/:id` for role/status changes.
- Step 4 is complete from the users API side: frontend users code imports the real `src/api/users.ts`, and the unused mock file has been removed.
- Step 5 is the next active implementation target: wire frontend user editing to `PATCH /users/:id`.
- Step 6 follows after that: convert Leads data fetching and mutations to React Query.

> **Note:**  
> The roadmap allowed `PATCH /users/:id` as optional, but it was implemented now because it cleanly completes the Users API foundation before moving on to the Leads React Query work.

---

### Current Checkpoint - 19/05/2026

Reviewed the existing frontend code against the finish roadmap before starting the next implementation session.

**Purpose:**  
Re-establish the actual project state so the next work can return to a clear, step-oriented process.

#### Confirmed Current State:
- Step 1 is complete: frontend API auth is centralized through `src/api/api.ts`.
- Step 2 is complete: protected backend route shape is in place.
- Step 3 is complete: the Users API supports listing, creation, password-safe responses, and role/status updates.
- Step 4 is complete: the frontend Users page uses the real users API instead of mock data.
- Step 5 is complete: frontend user editing is already wired to `PATCH /users/:id`.

#### Step 5 Verification:
- `src/api/users.ts` includes `updateUser(id, input)`.
- `src/features/users/components/EditUserModal.tsx` uses a React Query mutation.
- Successful user updates invalidate the `["users"]` query.
- The edit modal only submits `role` and `status`.
- `src/pages/users/components/UsersTable.tsx` opens the edit modal with the selected user.
- The backend `PATCH /users/:id` route accepts and validates role/status updates.

#### Next Active Step:
- Step 6: Make Lead data fetching consistent by moving Leads fetching and mutations to React Query.

> **Note:**  
> `finish-roadmap.md` was intentionally left unchanged. This checkpoint records actual current status without editing the roadmap source.

---

### Session 30 - Leads Data Fetching With TanStack Query

Converted the Leads feature from manual state/effect fetching to TanStack Query so it follows the same server-state pattern as the Users feature.

**Purpose:**  
Make Leads data fetching and mutations more predictable by centralizing server-state behavior around query keys, mutations, and invalidation instead of manually refetching after modal changes.

#### Approach:
1. Replaced manual `useState`/`useEffect` lead fetching in `LeadsTable` with `useQuery`.
2. Used the existing `getLeads` API function as the `["leads"]` query function.
3. Converted lead deletion to a `useMutation`.
4. Converted lead creation to a `useMutation` inside the create modal.
5. Converted lead editing to a `useMutation` inside the edit modal.
6. Invalidated the `["leads"]` query after successful create, edit, and delete mutations.
7. Added response guard checks to lead API mutation functions so failed HTTP responses throw errors.
8. Added basic polish for empty, pending, and error states.
9. Ran the TypeScript build check to verify the refactor.

#### Deliverables:
- `LeadsTable` now uses TanStack Query `useQuery` for the leads list.
- Lead create, edit, and delete actions now use `useMutation`.
- Successful mutations refresh the list through `queryClient.invalidateQueries({ queryKey: ["leads"] })`.
- `src/api/leads.ts` now throws on failed create, update, and delete responses.
- Empty state added for an empty leads list.
- Submit/delete controls are disabled while relevant mutations are pending.
- Inline mutation errors are shown for create, edit, and delete failures.
- `npx tsc -b` passed after the changes.

> **Note:**  
> This step completes the main technical goal of Roadmap Step 6. Leads and Users now follow the same TanStack Query server-state pattern.

---

### Session 31 - Shared Lead Contracts And Feature Structure

Aligned the frontend Leads contract with the backend Prisma model and cleaned up the Leads folder structure.

**Purpose:**  
Make frontend lead types reflect the API response shape and keep route pages separate from feature implementation details.

#### Approach:
1. Standardized the Leads route folder to `src/pages/leads`.
2. Moved Leads table and modal components into `src/features/leads/components`.
3. Updated route imports after the folder move.
4. Updated the frontend `Lead` type so `company` can be `string | null`.
5. Added `createdAt` and `updatedAt` to the frontend `Lead` domain type.
6. Updated lead input types so optional company values can be sent as `null`.
7. Added Zod schemas for lead create and edit forms.
8. Converted empty company form input to `null`.
9. Updated the table and edit modal to safely display/edit nullable company values.

#### Deliverables:
- Consistent `pages/leads` and `features/leads` folder structure.
- Frontend `Lead` type aligned with the backend model.
- Lead create/edit schemas under `src/features/leads/schemas`.
- Nullable company handling in list, create, and edit flows.
- TypeScript check passed after the changes.

---

### Session 32 - Backend Request Validation

Added Zod validation to backend write routes so invalid request bodies return intentional `400` responses.

**Purpose:**  
Protect database writes from malformed client input and make API errors easier to understand.

#### Approach:
1. Installed Zod in the backend.
2. Added create/update schemas for Leads.
3. Validated `POST /leads` with `createLeadSchema`.
4. Validated `PATCH /leads/:id` with `updateLeadSchema`.
5. Added login validation for `POST /auth/login`.
6. Added user create validation for `POST /users`.
7. Added user update validation for `PATCH /users/:id`.
8. Replaced manual role/status checks with Zod enums.
9. Kept route-specific Prisma handling for duplicate emails and missing records.

#### Deliverables:
- Backend Zod schemas for auth, leads, and users.
- `400` responses for invalid request bodies.
- Partial-update schemas for lead and user patch routes.
- Backend build passed after validation changes.

---

### Session 33 - Centralized Backend Error Handling

Added Express error middleware and reduced repeated generic `500` handling in backend routes.

**Purpose:**  
Keep route handlers focused on API behavior while centralizing unexpected server errors in one middleware.

#### Approach:
1. Added `errorMiddleware` under `src/middleware`.
2. Registered the middleware in `app.ts` after the main router.
3. Removed generic-only `try/catch` blocks from simple read/create routes.
4. Kept route-local handling for known Prisma errors:
   - `P2025` for missing leads/users.
   - `P2002` for duplicate user email.
5. Re-threw unexpected errors so the central middleware can handle them.

#### Deliverables:
- Central backend error middleware.
- Cleaner Leads and Users routes.
- Preserved `404` and `409` API behavior for known Prisma cases.
- Backend build passed after the refactor.

---

### Session 34 - Frontend Auth Guard And Logout

Added a minimal frontend auth guard and logout flow to align navigation with protected backend routes.

**Purpose:**  
Prevent protected pages from rendering without a token and give users a clear way to end their session.

#### Approach:
1. Added a `beforeLoad` guard to the protected layout route.
2. Redirected users without a token to `/login`.
3. Added a logout button to the sidebar.
4. Cleared the stored token on logout.
5. Redirected to `/login` after logout.
6. Improved TypeScript path alias configuration for editor support.
7. Adjusted sidebar layout so logout sits at the bottom.

#### Deliverables:
- Protected layout guard for dashboard, users, and leads.
- Sidebar logout button.
- Token clearing on logout.
- Improved `@/` path alias config.
- Frontend TypeScript check passed.

---

### Session 35 - CRUD UX Polish

Improved the user-facing CRUD experience across Leads, Users, and login.

**Purpose:**  
Make the app feel more complete by improving loading states, destructive-action safety, feedback, and page layout.

#### Approach:
1. Added a wider, centered page shell for Leads and Users.
2. Moved primary create actions into page headers.
3. Added skeleton loading components for table states.
4. Installed and configured Sonner toasts.
5. Added success/error toasts for lead and user create, edit, and delete actions.
6. Added backend and frontend support for deleting users.
7. Added user delete confirmation modal.
8. Added lead delete confirmation modal.
9. Replaced the remaining login `alert()` with inline error text and a toast.
10. Removed remaining frontend debug logs.

#### Deliverables:
- Better Leads and Users page layout.
- Shared `TableSkeleton` and base `Skeleton` component.
- Sonner toaster configured at the app root.
- Confirmation modals for destructive lead/user deletion.
- User delete is now wired end to end.
- No remaining frontend `alert()`, `console.log`, or `console.error`.
- Frontend and backend checks passed during the polish pass.

> **Note:**  
> This session completes Roadmap Step 11. Step 12 follows with README and environment example updates.

---

### Session 36 - Documentation And Environment Examples

Updated setup documentation and environment examples so the project is easier to run and understand.

**Purpose:**  
Make the current full-stack state reproducible without reverse-engineering required environment variables, scripts, or available routes.

#### Approach:
1. Added a frontend `.env.example`.
2. Replaced the misspelled backend `.env.exemple` with `.env.example`.
3. Documented backend environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `PORT`
4. Rewrote the backend README with setup, scripts, routes, validation, and error-handling notes.
5. Rewrote the frontend README with setup, features, architecture, and current UX behavior.
6. Verified frontend TypeScript and backend build after the docs pass.

#### Deliverables:
- `front-end/.env.example`
- `back-end/.env.example`
- Updated frontend README.
- Updated backend README.
- Removed misspelled backend `.env.exemple`.
- Frontend `npx tsc -b` passed.
- Backend `npm run build` passed.

---

### Session 37 - Architecture Orientation Comments

Added concise file headers to architectural and contract files across the frontend and backend.

**Purpose:**  
Improve codebase navigation as the project grows without adding noisy comments to every component.

#### Approach:
1. Added short headers to frontend API client files.
2. Added short headers to frontend domain contract files.
3. Added short headers to shared skeleton components.
4. Added short headers to frontend form schema files.
5. Added short headers to backend app, server, router, Prisma, and middleware files.
6. Added short headers to backend request schema files.
7. Avoided commenting obvious modal/table components.

#### Deliverables:
- Orientation comments for key frontend architecture files.
- Orientation comments for key backend architecture files.
- Frontend `npx tsc -b` passed.
- Backend `npm run build` passed.

---

### Session 38 - Smoke Checklist And Roadmap Completion

Added a lightweight smoke checklist to close the current finish roadmap without introducing premature automation.

**Purpose:**  
Document the minimum verification flow for the current app while leaving full automated smoke tests for a later, larger phase.

#### Approach:
1. Created a smoke checklist under frontend docs.
2. Listed backend and frontend build checks.
3. Listed core API checks for health, login, leads, and users.
4. Listed frontend checks for auth guard, logout, CRUD feedback, and confirmation modals.
5. Kept this as documentation rather than a script because the app is still small and changing quickly.

#### Deliverables:
- `front-end/docs/smoke-checklist.md`
- Manual verification checklist for builds, API behavior, auth, and CRUD UI.
- Current finish roadmap completed through Step 13.

> **Note:**  
> Automated smoke tests remain a strong candidate for the next roadmap once the app grows beyond the current CRM foundation.

---

### Session 39 - Phase 2 Roadmap And Lead Ownership

Started Phase 2 by clarifying the next product direction and implementing lead ownership across the stack.

**Purpose:**  
Move leads from standalone records toward a real multi-user CRM model where leads can belong to team members while still supporting an intentional unassigned state.

#### Approach:
1. Reviewed `PROCESS.md` and the Phase 2 roadmap to identify the next active step.
2. Renamed the Phase 2 roadmap file to `front-end/docs/phase-2-roadmap.md`.
3. Added a dedicated demo seed data step to the roadmap after role-aware access.
4. Updated the roadmap so nullable `ownerId` is a deliberate product choice, not temporary migration debt.
5. Added `ownerId` and an optional owner relation to the backend Prisma `Lead` model.
6. Added the reverse `User.leads` relation.
7. Generated and applied a local Prisma migration for lead ownership.
8. Updated lead creation so the backend assigns `ownerId` from the authenticated JWT user.
9. Included safe owner data in lead API responses.
10. Updated the frontend `Lead` domain type with nullable `ownerId` and owner data.
11. Added an Owner column to the Leads table with an `Unassigned` fallback.
12. Aligned the Supabase database with the new migration and verified ownership behavior in development and production.

#### Deliverables:
- Shorter Phase 2 roadmap filename.
- Phase 2 roadmap updated with demo seeding and nullable ownership decisions.
- Nullable `Lead.ownerId` relation added to Prisma.
- Local migration for lead ownership.
- Lead creation assigns ownership from the JWT.
- Lead API responses include safe owner info.
- Frontend lead type includes `ownerId` and nullable owner data.
- Leads table displays owner email or `Unassigned`.
- Backend build passed.
- Frontend TypeScript check passed.
- Lead ownership verified in development and production.

> **Note:**  
> Lead ownership remains nullable by design. If a user account is removed, their leads should remain in the CRM as unassigned records rather than being deleted.

---

### Session 40 - Role-Aware Backend And Frontend Access

Implemented the first role-aware permission layer for users and leads, then reflected those permissions in the frontend navigation.

**Purpose:**  
Make the existing `admin`, `salesAgent`, and `viewer` roles meaningful by enforcing backend authorization and reducing frontend access to pages/actions the current role cannot use.

#### Approach:
1. Clarified the permission matrix for Phase 2:
   - Admin has full user and lead access.
   - Sales agents can read, create, and edit their own leads, but cannot delete leads.
   - Viewers are dashboard-only and cannot access users or leads.
2. Updated the roadmap with the agreed permission matrix.
3. Added `role` to the JWT payload returned from login.
4. Updated auth middleware to validate role-bearing tokens.
5. Added an admin-only router guard for `/users`.
6. Added a viewer-blocking router guard for `/leads`.
7. Filtered `GET /leads` so sales agents only receive their own leads.
8. Protected `GET /leads/:id` and `PATCH /leads/:id` so sales agents cannot access or edit someone else's lead.
9. Restricted `DELETE /leads/:id` to admins only.
10. Extracted lead authorization logic to `leads.permissions.ts`.
11. Added role-specific demo login buttons to the login page.
12. Added a small demo-account separator to the login form.
13. Added frontend JWT role decoding for role-aware navigation.
14. Hid Users navigation for non-admins and Leads navigation for viewers.
15. Redirected viewers to the dashboard after login.
16. Updated the users API client so forbidden responses throw instead of being treated as table data.

#### Deliverables:
- Role included in JWT login response.
- Auth middleware validates `admin`, `salesAgent`, and `viewer` roles.
- `/users` protected as admin-only.
- `/leads` protected from viewer access.
- Sales agents can only list, view, and edit their own leads.
- Lead deletion restricted to admins.
- Lead permission helper extracted to `back-end/src/modules/leads/leads.permissions.ts`.
- Login page includes role-specific demo account buttons.
- Frontend navigation now reflects the current user's role.
- Viewer login lands on the dashboard.
- Forbidden users API responses no longer crash the Users table.
- Backend build passed.
- Frontend TypeScript check passed.

> **Note:**  
> Backend authorization is the source of truth. Frontend role-aware navigation improves user experience, but protected API routes still enforce the actual security boundary.
