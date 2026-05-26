/*

 * Application layout wrapper.
 * Defines the persistent UI structure shared across routes
 * and serves as a natural place for app-wide providers if needed.
 * Route content is rendered via an Outlet to keep layout and page concerns separate.
 
*/


import { createRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { Button } from "@/components/ui/button"
import { getCurrentUserRole } from "@/lib/auth";


function Layout() {
	const navigate = useNavigate()
	const role = getCurrentUserRole()

	const handleLogout = () => {
		localStorage.removeItem("token")

		navigate({ to: "/login" })
	}

	return (
		<>
			<div className="flex h-dvh text-sm">
				<header className="sticky top-0 h-dvh w-38 border-r bg-muted/30">
					<nav className="flex h-full flex-col gap-1 overflow-y-auto p-5">
						<Link
							to='/dashboard'
							activeProps={{ className: "text-foreground font-medium" }}
							className="px-2 py-1 text-muted-foreground">
							Dashboard
						</Link>
						{role === "admin" && (
							<Link
								to='/users'
								activeProps={{ className: "text-foreground font-medium" }}
								className="px-2 py-1 text-muted-foreground">
								Users
							</Link>
						)}
						{role !== "viewer" && (
							<>
								<Link
									to='/leads'
									activeProps={{ className: "text-foreground font-medium" }}
									className="px-2 py-1 text-muted-foreground">
									Leads
								</Link>
								<Link
									to='/deals'
									activeProps={{ className: "text-foreground font-medium" }}
									className="px-2 py-1 text-muted-foreground">
									Deals
								</Link>
								<Link
									to='/pipeline'
									activeProps={{ className: "text-foreground font-medium" }}
									className="px-2 py-1 text-muted-foreground">
									Pipeline
								</Link>
							</>
						)}

						<div className="sticky bottom-0 mt-auto w-full bg-muted/30 pt-4">
							<Button
								onClick={handleLogout}
								className="w-full px-3"
							>
								Logout
							</Button>
						</div>
					</nav>
				</header>
				<main className="flex-1 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</>
	)
}

export const layoutRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'layout',
	beforeLoad: () => {
		const token = localStorage.getItem("token")

		if (!token) {
			throw redirect({
				to: "/login"
			})
		}
	},
	component: Layout
})
