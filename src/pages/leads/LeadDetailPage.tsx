import { getLead } from "@/api/leads"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import DeleteLeadModal from "@/features/leads/components/DeleteLeadModal"
import EditLeadModal from "@/features/leads/components/EditLeadModal"
import { getCurrentUserRole } from "@/lib/auth"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { ArrowLeft, PencilIcon, TrashIcon } from "lucide-react"
import { useState } from "react"

const formatDateTime = (value: string) =>
	new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value))

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
	const [editLeadModalOpen, setEditLeadModalOpen] = useState(false)
	const [deleteLeadModalOpen, setDeleteLeadModalOpen] = useState(false)

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
					</dl>
				</section>

				<aside className="rounded-md border bg-background p-4">
					<h2 className="text-sm font-semibold mb-3">Lead Details</h2>
					<dl className="grid gap-3 text-sm">
						<div>
							<dt className="text-muted-foreground">Owner</dt>
							<dd>{lead.owner?.email ?? "Unassigned"}</dd>
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
					<p className="text-sm text-muted-foreground">
						Deals linked to this lead will appear here.
					</p>
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
