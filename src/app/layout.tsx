/*

 * Application layout wrapper.
 * Defines the persistent UI structure shared across routes
 * and serves as a natural place for app-wide providers if needed.
 * Route content is rendered via an Outlet to keep layout and page concerns separate.
 
*/


import { createRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { Button } from "@/components/ui/button"


function Layout() {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("token")

		navigate({ to: "/login" })
	}

	return (
		<>
			<div className="min-h-screen flex text-sm">
				<header className="w-38 border-r bg-muted/30">
					<nav className="flex h-full flex-col p-5 gap-1">
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

						<div className="mt-auto w-full">
							<Button
								onClick={handleLogout}
								className="w-full px-3"
							>
								Logout
							</Button>
						</div>
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
