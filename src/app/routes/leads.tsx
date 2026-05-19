import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../layout";
import LeadsPage from "@/pages/leads/LeadsPage";

export const leadsRoute = createRoute({
	getParentRoute: () => layoutRoute,
	path: 'leads',
	component: LeadsPage
})
