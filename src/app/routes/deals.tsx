import { getCurrentUserRole } from "@/lib/auth";
import DealsPage from "@/pages/deals/DealsPage";
import { createRoute, redirect } from "@tanstack/react-router";
import { layoutRoute } from "../layout";

export const dealsRoute = createRoute({
	getParentRoute: () => layoutRoute,
	path: 'deals',
	beforeLoad: () => {
		if (getCurrentUserRole() === "viewer") {
			throw redirect({
				to: "/dashboard"
			})
		}
	},
	component: DealsPage
})
