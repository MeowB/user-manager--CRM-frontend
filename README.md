# User Management CRM
This CRM application is being built incrementally to demonstrate a realistic
user management workflow and modern front-end architecture. It focuses on clean
data flow, server-state management, and front-end/back-end integration patterns
that will later support lead management and deal tracking features.

The project evolves step by step, with features added only once they are fully
implemented and documented.

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- TanStack Router
- TanStack Query
- Express
- PostgreSQL
- Prisma

## Features
- User management
- Server-state management
- Typed API contracts

> **note:** Additional features such as lead and deal management are planned and built incrementally using the same architectural patterns.

## Architecture Overview
The application is structured around a clear separation of concerns between routing,
data fetching, UI presentation, and business logic.

Routing is handled using TanStack Router with code-based routes, allowing navigation
logic and layouts to be defined explicitly and kept independent from page components.

Server-state is managed with TanStack Query. All data-fetching logic is isolated in a
dedicated API layer, while pages consume data through queries and render UI based on
loading, error, and success states. This makes it easy to swap mocked data sources
with a real backend without changing UI logic.

UI components are split between pages and reusable components. Pages are responsible
for data orchestration, while presentational components focus purely on rendering.

The backend (planned) will expose a REST API built with Express and PostgreSQL, using
Prisma as the ORM. The frontend is designed to consume this API through stable,
typed contracts, enabling incremental backend integration without major refactors.

## Development Process
👉 See [PROCESS.md](./docs/PROCESS.md) for a detailed, step-by-step breakdown.
