import { getDeals, updateDeal } from "@/api/deals"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import type { Deal, DealStage } from "@/domain/deal"
import { getCurrentUserRole } from "@/lib/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { toast } from "sonner"

const pipelineStages: Array<{
	value: DealStage
	label: string
	description: string
	className: string
}> = [
	{
		value: "discovery",
		label: "Discovery",
		description: "New opportunities being qualified.",
		className: "border-slate-200 bg-slate-50",
	},
	{
		value: "proposal",
		label: "Proposal",
		description: "Offers sent and awaiting review.",
		className: "border-blue-200 bg-blue-50",
	},
	{
		value: "negotiation",
		label: "Negotiation",
		description: "Terms, timing, and scope in progress.",
		className: "border-amber-200 bg-amber-50",
	},
	{
		value: "closedWon",
		label: "Closed Won",
		description: "Successful deals.",
		className: "border-green-200 bg-green-50",
	},
	{
		value: "closedLost",
		label: "Closed Lost",
		description: "Closed opportunities that did not convert.",
		className: "border-gray-200 bg-gray-50",
	},
]

const formatAmount = (amount: number | null) =>
	amount === null
		? "-"
		: new Intl.NumberFormat("en", {
			style: "currency",
			currency: "EUR",
		}).format(amount / 100)

const formatDate = (value: string) =>
	new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
	}).format(new Date(value))

const formatOwnerLabel = (owner: Deal["lead"]["owner"]) =>
	owner ? owner.fullName : "Unassigned"

const groupDealsByStage = (deals: Deal[]) =>
	pipelineStages.reduce<Record<DealStage, Deal[]>>(
		(groupedDeals, stage) => ({
			...groupedDeals,
			[stage.value]: deals.filter((deal) => deal.stage === stage.value),
		}),
		{
			discovery: [],
			proposal: [],
			negotiation: [],
			closedWon: [],
			closedLost: [],
		}
	)

const getStageTotal = (deals: Deal[]) =>
	deals.reduce((total, deal) => total + (deal.amount ?? 0), 0)

const PipelineLoadingState = () => (
	<div className="grid gap-4 lg:grid-cols-5">
		{pipelineStages.map((stage) => (
			<div key={stage.value} className="rounded-md border bg-background p-3">
				<Skeleton className="mb-2 h-5 w-24" />
				<Skeleton className="mb-4 h-4 w-full" />
				<div className="space-y-3">
					<Skeleton className="h-28 w-full" />
					<Skeleton className="h-28 w-full" />
				</div>
			</div>
		))}
	</div>
)

const DealCard = ({
	deal,
	showOwner,
	isUpdating,
	onStageChange,
}: {
	deal: Deal
	showOwner: boolean
	isUpdating: boolean
	onStageChange: (deal: Deal, stage: DealStage) => void
}) => (
	<article className="rounded-md border bg-background p-3 shadow-sm">
		<div className="space-y-1">
			<h3 className="text-sm font-medium leading-5">{deal.title}</h3>
			<Link
				to="/leads/$leadId"
				params={{ leadId: deal.leadId }}
				className="text-xs text-primary hover:underline"
			>
				{deal.lead.name}
			</Link>
		</div>

		<div className="mt-4 space-y-2 text-xs text-muted-foreground">
			<div className="flex items-center justify-between gap-3">
				<span>Amount</span>
				<span className="font-medium text-foreground">{formatAmount(deal.amount)}</span>
			</div>
			{showOwner && (
				<div className="flex items-center justify-between gap-3">
					<span>Owner</span>
					<span className="max-w-32 truncate text-right font-medium text-foreground">
						{formatOwnerLabel(deal.lead.owner)}
					</span>
				</div>
			)}
			<div className="flex items-center justify-between gap-3">
				<span>Updated</span>
				<span className="font-medium text-foreground">{formatDate(deal.updatedAt)}</span>
			</div>
		</div>

		<div className="mt-4">
			<Select
				value={deal.stage}
				disabled={isUpdating}
				onValueChange={(stage) => onStageChange(deal, stage as DealStage)}
			>
				<SelectTrigger className="w-full" size="sm">
					<SelectValue placeholder="Move stage" />
				</SelectTrigger>
				<SelectContent>
					{pipelineStages.map((stage) => (
						<SelectItem key={stage.value} value={stage.value}>
							{stage.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	</article>
)

const PipelinePage = () => {
	const queryClient = useQueryClient()
	const role = getCurrentUserRole()
	const showOwner = role === "admin"
	const {
		data: deals = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["deals"],
		queryFn: getDeals,
	})
	const updateDealStageMutation = useMutation({
		mutationFn: ({ deal, stage }: { deal: Deal; stage: DealStage }) =>
			updateDeal(deal.id, { stage }),
		onSuccess: (_updatedDeal, variables) => {
			queryClient.invalidateQueries({ queryKey: ["deals"] })
			queryClient.invalidateQueries({ queryKey: ["deals", "lead", variables.deal.leadId] })
			toast.success("Deal stage updated")
		},
		onError: (error) => {
			toast.error((error as Error).message)
		},
	})
	const dealsByStage = groupDealsByStage(deals)
	const updatingDealId = updateDealStageMutation.isPending
		? updateDealStageMutation.variables?.deal.id
		: null

	const handleStageChange = (deal: Deal, stage: DealStage) => {
		if (deal.stage === stage) {
			return
		}

		updateDealStageMutation.mutate({ deal, stage })
	}

	return (
		<div className="w-full px-6 py-6">
			<div className="mb-6 flex items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Pipeline</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Review deals grouped by sales stage.
					</p>
				</div>
			</div>

			{isLoading && <PipelineLoadingState />}

			{isError && (
				<p className="text-sm text-destructive">{(error as Error).message}</p>
			)}

			{!isLoading && !isError && (
				<div className="grid gap-4 lg:grid-cols-5">
					{pipelineStages.map((stage) => {
						const stageDeals = dealsByStage[stage.value]
						const stageTotal = getStageTotal(stageDeals)

						return (
							<section
								key={stage.value}
								className={`min-h-[28rem] rounded-md border p-3 ${stage.className}`}
							>
								<div className="mb-4">
									<div className="flex items-center justify-between gap-3">
										<h2 className="text-sm font-semibold">{stage.label}</h2>
										<span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium">
											{stageDeals.length}
										</span>
									</div>
									<p className="mt-1 min-h-8 text-xs text-muted-foreground">
										{stage.description}
									</p>
									<p className="mt-2 text-xs font-medium">
										{formatAmount(stageTotal)}
									</p>
								</div>

								<div className="space-y-3">
									{stageDeals.length === 0 && (
										<div className="rounded-md border border-dashed bg-background/70 p-4 text-center text-xs text-muted-foreground">
											No deals in this stage
										</div>
									)}
									{stageDeals.map((deal) => (
										<DealCard
											key={deal.id}
											deal={deal}
											showOwner={showOwner}
											isUpdating={updatingDealId === deal.id}
											onStageChange={handleStageChange}
										/>
									))}
								</div>
							</section>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default PipelinePage
