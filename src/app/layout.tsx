/*

 * Application layout wrapper.
 * Defines the persistent UI structure shared across routes
 * and serves as a natural place for app-wide providers if needed.
 * Route content is rendered via an Outlet to keep layout and page concerns separate.
 
*/


import { createRoute, Link, Outlet } from "@tanstack/react-router";
import rootRoute from "./rootRoute";


function Layout() {
	return (
		<>
			<div className="min-h-screen flex text-sm">
				<header className="w-38 border-r bg-muted/30">
					<nav className="flex flex-col p-5 gap-1">
						<Link
							to='/dashboard'
							activeProps={{ className: "text-foreground font-medium" }}
							className="px-2 py-1 text-muted-foreground">
							Dashboard
						</Link>
						<Link
							to='/users'
							activeProps={{ className: "text-foreground font-medium" }}
							className="px-2 py-1 text-muted-foreground">
							Users
						</Link>
						<Link
							to='/leads'
							activeProps={{ className: "text-foreground font-medium" }}
							className="px-2 py-1 text-muted-foreground">
							Leads
						</Link>
					</nav>
				</header>
				<main className="p-2">
					<Outlet />
				</main>
			</div>
		</>
	)
}

export const layoutRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'layout',
	component: Layout
})