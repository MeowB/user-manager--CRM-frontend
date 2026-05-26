import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	useQuery,
} from "@tanstack/react-query"
import { useState } from "react"
import type { Lead } from "@/domain/lead";
import { Button } from "@/components/ui/button";
import { TrashIcon, PencilIcon, ChevronRightIcon } from "lucide-react";
import EditLeadModal from "./EditLeadModal";
import DeleteLeadModal from "./DeleteLeadModal";
import { getLeads } from "@/api/leads";
import { TableSkeleton } from "@/components/TableSkeleton";
import { getCurrentUserRole } from "@/lib/auth";
import { Link } from "@tanstack/react-router";

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

const formatOwnerLabel = (owner: Lead["owner"]) =>
	owner ? `${owner.fullName} (${owner.email})` : "Unassigned"

const LeadsTable = () => {
	const [editLeadModalOpen, setEditLeadModalOpen] = useState<boolean>(false)
	const [deleteLeadModalOpen, setDeleteLeadModalOpen] = useState<boolean>(false)
	const [currentLead, setCurrentLead] = useState<Lead>()
	const role = getCurrentUserRole()
	const showOwnerColumn = role === "admin"
	const showDeleteAction = role === "admin"
	const columnCount = showOwnerColumn ? 7 : 6
	const {
		data: leads = [],
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["leads"],
		queryFn: getLeads,
	})

	if(isLoading) {
		return <TableSkeleton columns={columnCount} />
	}

	if (isError) {
		return <p>Error: {(error as Error).message}</p>
	}

	
	return (
		<>
			<div className="w-full flex flex-col">

				<EditLeadModal open={editLeadModalOpen} setOpen={setEditLeadModalOpen} lead={currentLead} />
				<DeleteLeadModal open={deleteLeadModalOpen} setOpen={setDeleteLeadModalOpen} lead={currentLead} />

				<div className="rounded-md border bg-background">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-25">Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Company</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Priority</TableHead>
								{showOwnerColumn && <TableHead>Owner</TableHead>}
								<TableHead className="w-24 px-1 text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{leads.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={columnCount}
										className="px-4 py-6 text-center text-sm text-muted-foreground"
									>
										No leads found
									</TableCell>
								</TableRow>
							)}
							{leads.map((lead) => (
								<TableRow key={lead.id} className="group odd:bg-muted/50 hover:bg-muted">
									<TableCell className="font-medium">
										<Link
											to={"/leads/$leadId"}
											params={{ leadId: lead.id }}
											className="inline-flex items-center gap-1 text-primary hover:underline"
										>
											{lead.name}
											<ChevronRightIcon className="size-3 text-muted-foreground opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
										</Link>
									</TableCell>
									<TableCell>{lead.email}</TableCell>
									<TableCell>{lead.company ?? "-"}</TableCell>
									<TableCell>
										<span className={`${badgeClassName} ${getLeadStatusClassName(lead.status)}`}>
											{getLeadStatusLabel(lead.status)}
										</span>
									</TableCell>
									<TableCell>
										<span className={`${badgeClassName} ${getLeadPriorityClassName(lead.priority)}`}>
											{getLeadPriorityLabel(lead.priority)}
										</span>
									</TableCell>
									{showOwnerColumn && <TableCell>{formatOwnerLabel(lead.owner)}</TableCell>}
									<TableCell className="px-1 text-right">
										<div className="flex justify-end gap-2">
											<Button
												onClick={() => {
													setEditLeadModalOpen(true)
													setCurrentLead(lead)
												}}
												className="bg-blue-400 hover:bg-blue-600 cursor-pointer"
												size={"sm"}
											>
												<PencilIcon color="white" />
											</Button>

											{showDeleteAction && (
												<Button
													onClick={() => {
														setCurrentLead(lead)
														setDeleteLeadModalOpen(true)
													}}
													variant="destructive"
													className="bg-red-400 hover:bg-red-600 cursor-pointer"
													size={"sm"}
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
			</div>
		</>
	)
}

export default LeadsTable
