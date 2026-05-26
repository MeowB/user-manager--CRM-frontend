import { getDashboardSummary } from "@/api/dashboard"
import { getUsers } from "@/api/users"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import type { DashboardSummary } from "@/domain/dashboard"
import type { Deal, DealStage } from "@/domain/deal"
import type { Lead } from "@/domain/lead"
import { getCurrentUserRole } from "@/lib/auth"
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
	ArrowUpRightIcon,
	BriefcaseBusinessIcon,
	CircleDollarSign,
	HandshakeIcon,
	TargetIcon,
	UsersIcon,
} from "lucide-react"
import { useState } from "react"

const allOwnersValue = "all"

const dealStageLabels: Record<DealStage, string> = {
	discovery: "Discovery",
	proposal: "Proposal",
	negotiation: "Negotiation",
	closedWon: "Closed Won",
	closedLost: "Closed Lost",
}

const leadStatusLabels: Record<Lead["status"], string> = {
	new: "New",
	contacted: "Contacted",
	qualified: "Qualified",
	unqualified: "Unqualified",
	converted: "Converted",
}

const leadStatusClassNames: Record<Lead["status"], string> = {
	new: "bg-muted text-muted-foreground",
	contacted: "bg-muted text-muted-foreground",
	qualified: "bg-muted text-muted-foreground",
	unqualified: "bg-gray-200 text-gray-700",
	converted: "bg-muted text-muted-foreground",
}

const dealStageClassNames: Record<DealStage, string> = {
	discovery: "bg-blue-100 text-blue-700",
	proposal: "bg-blue-100 text-blue-700",
	negotiation: "bg-amber-100 text-amber-700",
	closedWon: "bg-green-100 text-green-700",
	closedLost: "bg-gray-200 text-gray-700",
}

const mutedDealStageClassNames: Record<DealStage, string> = {
	discovery: "bg-muted text-muted-foreground",
	proposal: "bg-muted text-muted-foreground",
	negotiation: "bg-muted text-muted-foreground",
	closedWon: "bg-muted text-muted-foreground",
	closedLost: "bg-gray-200 text-gray-700",
}

const stageAccentClassNames: Record<DealStage, string> = {
	discovery: "bg-blue-500",
	proposal: "bg-blue-500",
	negotiation: "bg-amber-500",
	closedWon: "bg-green-500",
	closedLost: "bg-gray-500",
}

const formatAmount = (amount: number) =>
	new Intl.NumberFormat("en", {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 0,
	}).format(amount / 100)

const formatDate = (value: string) =>
	new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
	}).format(new Date(value))

const formatOwnerLabel = (owner: Lead["owner"] | Deal["lead"]["owner"]) =>
	owner ? owner.fullName : "Unassigned"

const formatPercent = (value: number) =>
	new Intl.NumberFormat("en", {
		style: "percent",
		maximumFractionDigits: 0,
	}).format(value)

const getWonDealsRate = (snapshot: DashboardSummary["pipelineSnapshot"]) => {
	const totalDeals = snapshot.reduce((total, stage) => total + stage.count, 0)
	const wonDeals = snapshot.find((stage) => stage.stage === "closedWon")?.count ?? 0

	return totalDeals === 0 ? 0 : wonDeals / totalDeals
}

const MetricCard = ({
	label,
	value,
	detail,
	icon,
}: {
	label: string
	value: string
	detail: string
	icon: React.ReactNode
}) => (
	<div className="rounded-md border bg-background p-4 shadow-sm">
		<div className="mb-4 flex items-center justify-between gap-3">
			<p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
			<div className="rounded-md bg-muted p-2 text-muted-foreground">{icon}</div>
		</div>
		<p className="text-2xl font-semibold">{value}</p>
		<p className="mt-1 text-xs text-muted-foreground">{detail}</p>
	</div>
)

const DashboardLoadingState = () => (
	<div className="space-y-6">
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<Skeleton key={index} className="h-28 rounded-md" />
			))}
		</div>
		<div className="grid gap-4 xl:grid-cols-[1fr_1fr_0.9fr]">
			<Skeleton className="h-80 rounded-md" />
			<Skeleton className="h-80 rounded-md" />
			<Skeleton className="h-80 rounded-md" />
		</div>
	</div>
)

const PanelHeader = ({
	title,
	description,
	icon,
}: {
	title: string
	description: string
	icon: React.ReactNode
}) => (
	<div className="flex items-start justify-between gap-3 border-b pb-3">
		<div>
			<h2 className="text-sm font-semibold">{title}</h2>
			<p className="mt-1 text-xs text-muted-foreground">{description}</p>
		</div>
		<div className="rounded-md bg-muted p-2 text-muted-foreground">{icon}</div>
	</div>
)

const RecentLeads = ({ leads }: { leads: Lead[] }) => (
	<section className="rounded-md border bg-background p-4 shadow-sm">
		<PanelHeader
			title="Recent Leads"
			description="Newest lead updates by owner and status."
			icon={<UsersIcon className="size-4" />}
		/>
		<div className="mt-4 space-y-3">
			{leads.length === 0 && (
				<p className="text-sm text-muted-foreground">No recent leads to show.</p>
			)}
			{leads.map((lead) => (
				<div key={lead.id} className="rounded-md border bg-muted/30 p-3">
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0">
							<Link
								to="/leads/$leadId"
								params={{ leadId: lead.id }}
								className="font-medium text-primary hover:underline"
							>
								{lead.name}
							</Link>
							<p className="truncate text-xs text-muted-foreground">
								{lead.company ?? "No company"} - {formatOwnerLabel(lead.owner)}
							</p>
						</div>
						<span className={`rounded-full px-2 py-0.5 text-xs font-medium ${leadStatusClassNames[lead.status]}`}>
							{leadStatusLabels[lead.status]}
						</span>
					</div>
					<p className="mt-3 text-xs text-muted-foreground">
						Updated {formatDate(lead.updatedAt)}
					</p>
				</div>
			))}
		</div>
	</section>
)

const RecentDeals = ({ deals }: { deals: Deal[] }) => (
	<section className="rounded-md border bg-background p-4 shadow-sm">
		<PanelHeader
			title="Recent Deals"
			description="Latest opportunity movement across the pipeline."
			icon={<BriefcaseBusinessIcon className="size-4" />}
		/>
		<div className="mt-4 space-y-3">
			{deals.length === 0 && (
				<p className="text-sm text-muted-foreground">No recent deals to show.</p>
			)}
			{deals.map((deal) => (
				<div key={deal.id} className="rounded-md border bg-muted/30 p-3">
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0">
							<p className="font-medium">{deal.title}</p>
							<Link
								to="/leads/$leadId"
								params={{ leadId: deal.leadId }}
								className="text-xs text-primary hover:underline"
							>
								{deal.lead.name}
							</Link>
						</div>
						<span className="text-sm font-medium">{formatAmount(deal.amount ?? 0)}</span>
					</div>
					<div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
						<span className={`rounded-full px-2 py-0.5 font-medium ${mutedDealStageClassNames[deal.stage]}`}>
							{dealStageLabels[deal.stage]}
						</span>
						<span>{formatDate(deal.updatedAt)}</span>
					</div>
				</div>
			))}
		</div>
	</section>
)

const PipelineSnapshot = ({
	snapshot,
}: {
	snapshot: DashboardSummary["pipelineSnapshot"]
}) => {
	const maxValue = Math.max(...snapshot.map((stage) => stage.value), 1)
	const totalValue = snapshot.reduce((total, stage) => total + stage.value, 0)

	return (
		<section className="rounded-md border bg-background p-4 shadow-sm">
			<PanelHeader
				title="Pipeline Snapshot"
				description="Stage distribution by deal count and value."
				icon={<ArrowUpRightIcon className="size-4" />}
			/>
			<div className="mt-4 space-y-5">
				{snapshot.map((stage) => (
					<div key={stage.stage}>
						<div className="mb-2 flex items-center justify-between gap-3">
							<div>
								<span className={`rounded-full px-2 py-0.5 text-xs font-medium ${dealStageClassNames[stage.stage]}`}>
									{dealStageLabels[stage.stage]}
								</span>
								<p className="mt-1 text-xs text-muted-foreground">
									{stage.count} {stage.count === 1 ? "deal" : "deals"}
								</p>
							</div>
							<div className="text-right">
								<p className="text-sm font-medium">{formatAmount(stage.value)}</p>
								<p className="text-xs text-muted-foreground">
									{formatPercent(totalValue === 0 ? 0 : stage.value / totalValue)}
								</p>
							</div>
						</div>
						<div className="h-2 rounded-full bg-muted">
							<div
								className={`h-2 rounded-full ${stageAccentClassNames[stage.stage]}`}
								style={{ width: `${Math.max((stage.value / maxValue) * 100, stage.count > 0 ? 8 : 0)}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

const DashboardPage = () => {
	const role = getCurrentUserRole()
	const isAdmin = role === "admin"
	const [ownerFilter, setOwnerFilter] = useState(allOwnersValue)
	const selectedOwnerId = ownerFilter === allOwnersValue ? undefined : ownerFilter
	const {
		data: summary,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["dashboard-summary", selectedOwnerId ?? allOwnersValue],
		queryFn: () => getDashboardSummary(selectedOwnerId),
	})
	const {
		data: users = [],
		isLoading: usersLoading,
	} = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
		enabled: isAdmin,
	})
	const dashboardUsers = users.filter((user) =>
		user.role === "admin" || user.role === "salesAgent"
	)

	return (
		<div className="w-full px-4 py-6 sm:px-5 lg:px-6">
			<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Dashboard</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Track lead volume, pipeline health, and recent CRM movement.
					</p>
				</div>

				{isAdmin && (
					<Select
						value={ownerFilter}
						onValueChange={setOwnerFilter}
						disabled={usersLoading}
					>
						<SelectTrigger className="w-64">
							<SelectValue placeholder="Filter by owner" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={allOwnersValue}>All users</SelectItem>
							{dashboardUsers.map((user) => (
								<SelectItem key={user.id} value={user.id}>
									{user.fullName}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			</div>

			{isLoading && <DashboardLoadingState />}

			{isError && (
				<p className="text-sm text-destructive">{(error as Error).message}</p>
			)}

			{summary && !isLoading && !isError && (
				<div className="space-y-6">
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
						<MetricCard
							label="Total Leads"
							value={String(summary.metrics.totalLeads)}
							detail="Accessible leads in scope"
							icon={<UsersIcon className="size-4" />}
						/>
						<MetricCard
							label="Active Deals"
							value={String(summary.metrics.activeDeals)}
							detail="Discovery to negotiation"
							icon={<HandshakeIcon className="size-4" />}
						/>
						<MetricCard
							label="Won Value"
							value={formatAmount(summary.metrics.wonValue)}
							detail="Closed-won revenue"
							icon={<TargetIcon className="size-4" />}
						/>
						<MetricCard
							label="Pipeline Value"
							value={formatAmount(summary.metrics.pipelineValue)}
							detail="Open deal value"
							icon={<CircleDollarSign className="size-4" />}
						/>
						<MetricCard
							label="Won Deals"
							value={formatPercent(getWonDealsRate(summary.pipelineSnapshot))}
							detail="Share of all deals won"
							icon={<ArrowUpRightIcon className="size-4" />}
						/>
					</div>

					<div className="grid gap-4 xl:grid-cols-[1fr_1fr_0.9fr]">
						<RecentLeads leads={summary.recentLeads} />
						<RecentDeals deals={summary.recentDeals} />
						<PipelineSnapshot snapshot={summary.pipelineSnapshot} />
					</div>
				</div>
			)}
		</div>
	)
}

export default DashboardPage
