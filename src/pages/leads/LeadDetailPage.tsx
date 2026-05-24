import { getDealsForLead } from "@/api/deals"
import { getLead } from "@/api/leads"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { Deal } from "@/domain/deal"
import CreateDealModal from "@/features/deals/components/CreateDealModal"
import DeleteLeadModal from "@/features/leads/components/DeleteLeadModal"
import EditLeadModal from "@/features/leads/components/EditLeadModal"
import { getCurrentUserRole } from "@/lib/auth"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { ArrowLeft, HandshakeIcon, PencilIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import type { Lead } from "@/domain/lead"

const leadStatusLabels: Record<Lead["status"], string> = {
	new: "New",
	contacted: "Contacted",
	qualified: "Qualified",
	unqualified: "Unqualified",
	converted: "Converted",
}

const leadPriorityLabels: Record<Lead["priority"], string> = {
	low: "Low",
	medium: "Medium",
	high: "High",
}

const leadStatusClassNames: Record<Lead["status"], string> = {
	new: "bg-slate-100 text-slate-700",
	contacted: "bg-blue-100 text-blue-700",
	qualified: "bg-green-100 text-green-700",
	unqualified: "bg-gray-200 text-gray-700",
	converted: "bg-purple-100 text-purple-700",
}

const leadPriorityClassNames: Record<Lead["priority"], string> = {
	low: "bg-slate-100 text-slate-700",
	medium: "bg-blue-100 text-blue-700",
	high: "bg-red-100 text-red-700",
}

const dealStageLabels: Record<Deal["stage"], string> = {
	discovery: "Discovery",
	proposal: "Proposal",
	negotiation: "Negotiation",
	closedWon: "Closed Won",
	closedLost: "Closed Lost",
}

const dealStageClassNames: Record<Deal["stage"], string> = {
	discovery: "bg-slate-100 text-slate-700",
	proposal: "bg-blue-100 text-blue-700",
	negotiation: "bg-amber-100 text-amber-700",
	closedWon: "bg-green-100 text-green-700",
	closedLost: "bg-gray-200 text-gray-700",
}

const badgeClassName = "inline-flex min-w-[5rem] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium"

const formatFallbackLabel = (value: string | undefined) =>
	value ? value.charAt(0).toUpperCase() + value.slice(1) : "-"

const getLeadStatusLabel = (status: Lead["status"]) =>
	leadStatusLabels[status] ?? formatFallbackLabel(status)

const getLeadPriorityLabel = (priority: Lead["priority"]) =>
	leadPriorityLabels[priority] ?? formatFallbackLabel(priority)

const getLeadStatusClassName = (status: Lead["status"]) =>
	leadStatusClassNames[status] ?? "bg-slate-100 text-slate-700"

const getLeadPriorityClassName = (priority: Lead["priority"]) =>
	leadPriorityClassNames[priority] ?? "bg-slate-100 text-slate-700"

const getDealStageLabel = (stage: Deal["stage"]) =>
	dealStageLabels[stage] ?? formatFallbackLabel(stage)

const getDealStageClassName = (stage: Deal["stage"]) =>
	dealStageClassNames[stage] ?? "bg-slate-100 text-slate-700"

const formatDateTime = (value: string) =>
	new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value))

const formatBudget = (budget: number | null) =>
	budget === null
		? "-"
		: new Intl.NumberFormat("en", {
			style: "currency",
			currency: "EUR",
		}).format(budget / 100)

const formatAmount = (amount: number | null) =>
	amount === null
		? "-"
		: new Intl.NumberFormat("en", {
			style: "currency",
			currency: "EUR",
		}).format(amount / 100)

const formatOwnerLabel = (owner: Lead["owner"]) =>
	owner ? `${owner.fullName} (${owner.email})` : "Unassigned"

const LeadDetailSkeleton = () => (
	<div className="w-full max-w-6xl mx-auto px-6 py-6">
		<div className="mb-6">
			<Skeleton className="mb-4 h-9 w-28" />
			<Skeleton className="h-8 w-56" />
			<Skeleton className="mt-2 h-4 w-80 max-w-full" />
		</div>

		<div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
			<Skeleton className="h-44 rounded-md" />
			<Skeleton className="h-44 rounded-md" />
			<Skeleton className="h-28 rounded-md lg:col-span-2" />
			<Skeleton className="h-28 rounded-md lg:col-span-2" />
		</div>
	</div>
)

const LeadDetailPage = () => {
	const { leadId } = useParams({ strict: false })
	const navigate = useNavigate()
	const role = getCurrentUserRole()
	const canDeleteLead = role === "admin"
	const canCreateDeal = role !== "viewer"
	const [editLeadModalOpen, setEditLeadModalOpen] = useState(false)
	const [deleteLeadModalOpen, setDeleteLeadModalOpen] = useState(false)
	const [createDealModalOpen, setCreateDealModalOpen] = useState(false)

	const {
		data: lead,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["lead", leadId],
		queryFn: () => getLead(leadId),
		enabled: Boolean(leadId)
	})

	const {
		data: linkedDeals = [],
		isLoading: linkedDealsLoading,
		isError: linkedDealsError,
		error: linkedDealsQueryError
	} = useQuery({
		queryKey: ["deals", "lead", leadId],
		queryFn: () => getDealsForLead(leadId),
		enabled: Boolean(leadId)
	})

	if (!leadId) {
		return <p className="p-6 text-sm text-muted-foreground">Missing lead id.</p>
	}

	if (isLoading) {
		return <LeadDetailSkeleton />
	}

	if (isError) {
		return <p className="p-6 text-sm text-destructive">{(error as Error).message}</p>
	}

	if (!lead) {
		return <p className="p-6 text-sm text-muted-foreground">Lead not found.</p>
	}

	return (
		<div className="w-full max-w-6xl mx-auto px-6 py-6">
			<CreateDealModal
				open={createDealModalOpen}
				setOpen={setCreateDealModalOpen}
				lead={lead}
			/>
			<EditLeadModal open={editLeadModalOpen} setOpen={setEditLeadModalOpen} lead={lead} />
			<DeleteLeadModal
				open={deleteLeadModalOpen}
				setOpen={setDeleteLeadModalOpen}
				lead={lead}
				onDeleted={() => navigate({ to: "/leads" })}
			/>

			<div className="mb-6">
				<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
					<Button asChild variant="outline" size="sm">
						<Link to="/leads">
							<ArrowLeft className="size-4" />
							Back to leads
						</Link>
					</Button>

					<div className="flex items-center gap-2">
						{canCreateDeal && (
							<Button
								size="sm"
								variant="outline"
								onClick={() => setCreateDealModalOpen(true)}
							>
								<HandshakeIcon className="size-4" />
								Create Deal
							</Button>
						)}

						<Button
							size="sm"
							className="bg-blue-400 hover:bg-blue-600"
							onClick={() => setEditLeadModalOpen(true)}
						>
							<PencilIcon className="size-4" />
							Edit Lead
						</Button>

						{canDeleteLead && (
							<Button
								size="sm"
								variant="destructive"
								className="bg-red-400 hover:bg-red-600"
								onClick={() => setDeleteLeadModalOpen(true)}
							>
								<TrashIcon className="size-4" />
								Delete Lead
							</Button>
						)}
					</div>
				</div>

				<h1 className="text-2xl font-semibold">{lead.name}</h1>
				<p className="text-sm text-muted-foreground mt-1">
					{lead.company ?? "No company"} - {lead.email}
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
				<section className="rounded-md border bg-background p-4">
					<h2 className="text-sm font-semibold mb-3">Lead Summary</h2>
					<dl className="grid gap-3 text-sm">
						<div>
							<dt className="text-muted-foreground">Email</dt>
							<dd>{lead.email}</dd>
						</div>
						<div>
							<dt className="text-muted-foreground">Company</dt>
							<dd>{lead.company ?? "-"}</dd>
						</div>
						<div className="mt-2 grid gap-3 border-t pt-3 sm:grid-cols-3">
							<div>
								<dt className="text-muted-foreground">Status</dt>
								<dd className="mt-1">
									<span className={`${badgeClassName} ${getLeadStatusClassName(lead.status)}`}>
										{getLeadStatusLabel(lead.status)}
									</span>
								</dd>
							</div>
							<div>
								<dt className="text-muted-foreground">Priority</dt>
								<dd className="mt-1">
									<span className={`${badgeClassName} ${getLeadPriorityClassName(lead.priority)}`}>
										{getLeadPriorityLabel(lead.priority)}
									</span>
								</dd>
							</div>
							<div>
								<dt className="text-muted-foreground">Budget</dt>
								<dd className="mt-1">{formatBudget(lead.budget)}</dd>
							</div>
						</div>
					</dl>
				</section>

				<aside className="rounded-md border bg-background p-4">
					<h2 className="text-sm font-semibold mb-3">Lead Details</h2>
					<dl className="grid gap-3 text-sm">
						<div>
							<dt className="text-muted-foreground">Owner</dt>
							<dd>{formatOwnerLabel(lead.owner)}</dd>
						</div>
						<div>
							<dt className="text-muted-foreground">Created</dt>
							<dd>{formatDateTime(lead.createdAt)}</dd>
						</div>
						<div>
							<dt className="text-muted-foreground">Updated</dt>
							<dd>{formatDateTime(lead.updatedAt)}</dd>
						</div>
					</dl>
				</aside>

				<section className="rounded-md border bg-background p-4 lg:col-span-2">
					<h2 className="text-sm font-semibold mb-2">Linked Deals</h2>
					{linkedDealsLoading && (
						<div className="grid gap-2">
							<Skeleton className="h-10 rounded-md" />
							<Skeleton className="h-10 rounded-md" />
						</div>
					)}

					{linkedDealsError && (
						<p className="text-sm text-destructive">
							{(linkedDealsQueryError as Error).message}
						</p>
					)}

					{!linkedDealsLoading && !linkedDealsError && linkedDeals.length === 0 && (
						<p className="text-sm text-muted-foreground">
							No deals linked to this lead yet.
						</p>
					)}

					{!linkedDealsLoading && !linkedDealsError && linkedDeals.length > 0 && (
						<div className="grid gap-2">
							{linkedDeals.map((deal) => (
								<div
									key={deal.id}
									className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-muted/30 px-3 py-2 text-sm"
								>
									<div>
										<p className="font-medium">{deal.title}</p>
										<p className="text-muted-foreground">{formatAmount(deal.amount)}</p>
									</div>
									<span className={`${badgeClassName} ${getDealStageClassName(deal.stage)}`}>
										{getDealStageLabel(deal.stage)}
									</span>
								</div>
							))}
						</div>
					)}
				</section>

				<section className="rounded-md border bg-background p-4 lg:col-span-2">
					<h2 className="text-sm font-semibold mb-2">Activity Timeline</h2>
					<p className="text-sm text-muted-foreground">
						Activities will appear here once notes, calls, tasks, and system events are added.
					</p>
				</section>
			</div>
		</div>
	)
}

export default LeadDetailPage
