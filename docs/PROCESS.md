
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

### Next Step
Improve the usability and clarity of the Users page by adding basic UX refinements, without introducing new data-fetching logic or CRUD functionality.

Key tasks include:
- Handle the empty users state with clear message
- Improve the visual representation of user status 
- apply minimal table-level polish for readability (striped rows, hover effects)
- Keep tanStack Query and shadcn/ui integration intact

### UX & Visual Enhancements Checklist

- [ ] Page title above the table  
- [ ] Optional short description under the title  
- [ ] Empty state message when no users are available  
- [ ] Visual status indicator for user status (active / disabled)  
- [ ] Improved table spacing and alignment for readability  
- [ ] Subtle visual boundary around the table container  

**Goal:** By the end of this session, the Users page clearly communicates all relevant user states and feels complete from a UX standpoint.