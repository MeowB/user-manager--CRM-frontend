/*

 * Application router configuration using TanStack Router (code-based routing).
 * This file defines the route tree and connects routes to the root route and layout.
 * Keeping routing logic centralized makes navigation explicit and scalable.

*/

import { createRouter } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { indexRoute } from "./routes/index";
import { layoutRoute } from "./layout";
import { loginRoute } from "./routes/login";
import { dashboardRoute } from "./routes/dashboard";
import { usersRoute } from "./routes/users";
import { leadsRoute } from "./routes/leads";

const routeTree = rootRoute.addChildren([
	indexRoute,
	loginRoute,
	layoutRoute.addChildren([
		dashboardRoute,
		usersRoute,
		leadsRoute
	])
])

export const router = createRouter({
	routeTree
})