import { getDeals } from "@/api/deals"
import { TableSkeleton } from "@/components/TableSkeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { Deal } from "@/domain/deal"
import { getCurrentUserRole } from "@/lib/auth"
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"

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

const getDealStageLabel = (stage: Deal["stage"]) =>
	dealStageLabels[stage] ?? formatFallbackLabel(stage)

const getDealStageClassName = (stage: Deal["stage"]) =>
	dealStageClassNames[stage] ?? "bg-slate-100 text-slate-700"

const formatAmount = (amount: number | null) =>
	amount === null
		? "-"
		: new Intl.NumberFormat("en", {
			style: "currency",
			currency: "EUR",
		}).format(amount / 100)

const formatDateTime = (value: string) =>
	new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value))

const formatOwnerLabel = (owner: Deal["lead"]["owner"]) =>
	owner ? `${owner.fullName} (${owner.email})` : "Unassigned"

const DealsTable = () => {
	const role = getCurrentUserRole()
	const showOwnerColumn = role === "admin"
	const columnCount = showOwnerColumn ? 6 : 5
	const {
		data: deals = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["deals"],
		queryFn: getDeals,
	})

	if (isLoading) {
		return <TableSkeleton columns={columnCount} />
	}

	if (isError) {
		return <p className="text-sm text-destructive">{(error as Error).message}</p>
	}

	return (
		<div className="rounded-md border bg-background">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Lead</TableHead>
						{showOwnerColumn && <TableHead>Owner</TableHead>}
						<TableHead>Amount</TableHead>
						<TableHead>Stage</TableHead>
						<TableHead>Last updated</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{deals.length === 0 && (
						<TableRow>
							<TableCell
								colSpan={columnCount}
								className="px-4 py-6 text-center text-sm text-muted-foreground"
							>
								No deals found
							</TableCell>
						</TableRow>
					)}
					{deals.map((deal) => (
						<TableRow key={deal.id} className="odd:bg-muted/50 hover:bg-muted">
							<TableCell className="font-medium">{deal.title}</TableCell>
							<TableCell>
								<Link
									to="/leads/$leadId"
									params={{ leadId: deal.leadId }}
									className="text-primary hover:underline"
								>
									{deal.lead.name}
								</Link>
							</TableCell>
							{showOwnerColumn && (
								<TableCell>{formatOwnerLabel(deal.lead.owner)}</TableCell>
							)}
							<TableCell>{formatAmount(deal.amount)}</TableCell>
							<TableCell>
								<span className={`${badgeClassName} ${getDealStageClassName(deal.stage)}`}>
									{getDealStageLabel(deal.stage)}
								</span>
							</TableCell>
							<TableCell>{formatDateTime(deal.updatedAt)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default DealsTable
