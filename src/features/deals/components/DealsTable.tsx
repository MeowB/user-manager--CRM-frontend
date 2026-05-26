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
import { Button } from "@/components/ui/button"
import type { Deal } from "@/domain/deal"
import { getCurrentUserRole } from "@/lib/auth"
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
	ArrowDownIcon,
	ArrowUpDownIcon,
	ArrowUpIcon,
	PencilIcon,
	TrashIcon,
} from "lucide-react"
import { useState } from "react"
import DeleteDealModal from "./DeleteDealModal"
import EditDealModal from "./EditDealModal"

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

type SortDirection = "asc" | "desc"
type DealSortKey = "title" | "lead" | "owner" | "amount" | "stage" | "updatedAt"

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

const getOwnerSortValue = (owner: Deal["lead"]["owner"]) =>
	owner ? owner.fullName : "Unassigned"

const compareText = (first: string, second: string) =>
	first.localeCompare(second, undefined, { sensitivity: "base" })

const SortHeader = ({
	label,
	sortKey,
	activeSortKey,
	sortDirection,
	onSort,
	className = "",
}: {
	label: string
	sortKey: DealSortKey
	activeSortKey: DealSortKey
	sortDirection: SortDirection
	onSort: (sortKey: DealSortKey) => void
	className?: string
}) => {
	const isActive = activeSortKey === sortKey
	const Icon = isActive
		? sortDirection === "asc"
			? ArrowUpIcon
			: ArrowDownIcon
		: ArrowUpDownIcon

	return (
		<TableHead className={className}>
			<button
				type="button"
				onClick={() => onSort(sortKey)}
				className="inline-flex cursor-pointer items-center gap-1 text-left hover:text-primary"
			>
				{label}
				<Icon className="size-3.5 text-muted-foreground" />
			</button>
		</TableHead>
	)
}

const DealsTable = () => {
	const [editDealModalOpen, setEditDealModalOpen] = useState(false)
	const [deleteDealModalOpen, setDeleteDealModalOpen] = useState(false)
	const [selectedDeal, setSelectedDeal] = useState<Deal>()
	const [sortKey, setSortKey] = useState<DealSortKey>("updatedAt")
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
	const role = getCurrentUserRole()
	const showOwnerColumn = role === "admin"
	const showDeleteAction = role === "admin"
	const columnCount = showOwnerColumn ? 7 : 6
	const {
		data: deals = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["deals"],
		queryFn: getDeals,
	})
	const handleSort = (nextSortKey: DealSortKey) => {
		if (nextSortKey === sortKey) {
			setSortDirection((currentDirection) =>
				currentDirection === "asc" ? "desc" : "asc"
			)
			return
		}

		setSortKey(nextSortKey)
		setSortDirection(nextSortKey === "updatedAt" ? "desc" : "asc")
	}
	const sortedDeals = [...deals].sort((firstDeal, secondDeal) => {
		let result = 0

		switch (sortKey) {
			case "lead":
				result = compareText(firstDeal.lead.name, secondDeal.lead.name)
				break
			case "owner":
				result = compareText(
					getOwnerSortValue(firstDeal.lead.owner),
					getOwnerSortValue(secondDeal.lead.owner)
				)
				break
			case "amount":
				result = (firstDeal.amount ?? 0) - (secondDeal.amount ?? 0)
				break
			case "updatedAt":
				result = new Date(firstDeal.updatedAt).getTime() - new Date(secondDeal.updatedAt).getTime()
				break
			default:
				result = compareText(firstDeal[sortKey], secondDeal[sortKey])
		}

		return sortDirection === "asc" ? result : -result
	})

	if (isLoading) {
		return <TableSkeleton columns={columnCount} />
	}

	if (isError) {
		return <p className="text-sm text-destructive">{(error as Error).message}</p>
	}

	return (
		<>
			<EditDealModal
				open={editDealModalOpen}
				setOpen={setEditDealModalOpen}
				deal={selectedDeal}
			/>
			<DeleteDealModal
				open={deleteDealModalOpen}
				setOpen={setDeleteDealModalOpen}
				deal={selectedDeal}
			/>

			<div className="rounded-md border bg-background">
				<Table>
					<TableHeader>
						<TableRow>
							<SortHeader
								label="Title"
								sortKey="title"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortHeader
								label="Lead"
								sortKey="lead"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							{showOwnerColumn && (
								<SortHeader
									label="Owner"
									sortKey="owner"
									activeSortKey={sortKey}
									sortDirection={sortDirection}
									onSort={handleSort}
								/>
							)}
							<SortHeader
								label="Amount"
								sortKey="amount"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortHeader
								label="Stage"
								sortKey="stage"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortHeader
								label="Last updated"
								sortKey="updatedAt"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<TableHead className="w-24 px-1 text-right">Actions</TableHead>
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
						{sortedDeals.map((deal) => (
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
								<TableCell className="px-1 text-right">
									<div className="flex justify-end gap-2">
										<Button
											onClick={() => {
												setSelectedDeal(deal)
												setEditDealModalOpen(true)
											}}
											className="bg-blue-400 hover:bg-blue-600 cursor-pointer"
											size="sm"
										>
											<PencilIcon color="white" />
										</Button>

										{showDeleteAction && (
											<Button
												onClick={() => {
													setSelectedDeal(deal)
													setDeleteDealModalOpen(true)
												}}
												variant="destructive"
												className="bg-red-400 hover:bg-red-600 cursor-pointer"
												size="sm"
											>
												<TrashIcon color="white" />
											</Button>
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	)
}

export default DealsTable
