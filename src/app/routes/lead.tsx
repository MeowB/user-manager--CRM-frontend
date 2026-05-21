import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../layout";
import LeadDetailPage from "@/pages/leads/LeadDetailPage";

export const leadRoute = createRoute({
	getParentRoute: () => layoutRoute,
	path: 'leads/$leadId',
	component: LeadDetailPage
})
