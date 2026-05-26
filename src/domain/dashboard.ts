import type { Deal, DealStage } from "@/domain/deal"
import type { Lead } from "@/domain/lead"

export type DashboardSummary = {
	metrics: {
		totalLeads: number
		activeDeals: number
		wonValue: number
		pipelineValue: number
	}
	recentLeads: Lead[]
	recentDeals: Deal[]
	pipelineSnapshot: Array<{
		stage: DealStage
		count: number
		value: number
	}>
}
