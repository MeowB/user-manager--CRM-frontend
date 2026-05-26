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
import { CircleDollarSign, HandshakeIcon, TargetIcon, UsersIcon } from "lucide-react"
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

const MetricCard = ({
	label,
	value,
	icon,
}: {
	label: string
	value: string
	icon: React.ReactNode
}) => (
	<div className="rounded-md border bg-background p-4">
		<div className="mb-4 flex items-center justify-between gap-3">
			<p className="text-sm text-muted-foreground">{label}</p>
			<div className="rounded-md bg-muted p-2 text-muted-foreground">{icon}</div>
		</div>
		<p className="text-2xl font-semibold">{value}</p>
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

const RecentLeads = ({ leads }: { leads: Lead[] }) => (
	<section className="rounded-md border bg-background p-4">
		<h2 className="text-sm font-semibold">Recent Leads</h2>
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
						<span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium">
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
	<section className="rounded-md border bg-background p-4">
		<h2 className="text-sm font-semibold">Recent Deals</h2>
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
						<span>{dealStageLabels[deal.stage]}</span>
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

	return (
		<section className="rounded-md border bg-background p-4">
			<h2 className="text-sm font-semibold">Pipeline Snapshot</h2>
			<div className="mt-4 space-y-4">
				{snapshot.map((stage) => (
					<div key={stage.stage}>
						<div className="mb-1 flex items-center justify-between gap-3 text-xs">
							<span className="font-medium">{dealStageLabels[stage.stage]}</span>
							<span className="text-muted-foreground">
								{stage.count} - {formatAmount(stage.value)}
							</span>
						</div>
						<div className="h-2 rounded-full bg-muted">
							<div
								className="h-2 rounded-full bg-primary"
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
		<div className="w-full max-w-7xl mx-auto px-6 py-6">
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
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
						<MetricCard
							label="Total Leads"
							value={String(summary.metrics.totalLeads)}
							icon={<UsersIcon className="size-4" />}
						/>
						<MetricCard
							label="Active Deals"
							value={String(summary.metrics.activeDeals)}
							icon={<HandshakeIcon className="size-4" />}
						/>
						<MetricCard
							label="Won Value"
							value={formatAmount(summary.metrics.wonValue)}
							icon={<TargetIcon className="size-4" />}
						/>
						<MetricCard
							label="Pipeline Value"
							value={formatAmount(summary.metrics.pipelineValue)}
							icon={<CircleDollarSign className="size-4" />}
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
