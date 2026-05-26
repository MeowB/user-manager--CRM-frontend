import { getCurrentUserRole } from "@/lib/auth"
import PipelinePage from "@/pages/pipeline/PipelinePage"
import { createRoute, redirect } from "@tanstack/react-router"
import { layoutRoute } from "../layout"

export const pipelineRoute = createRoute({
	getParentRoute: () => layoutRoute,
	path: "pipeline",
	beforeLoad: () => {
		if (getCurrentUserRole() === "viewer") {
			throw redirect({
				to: "/dashboard",
			})
		}
	},
	component: PipelinePage,
})
