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
import { TrashIcon, PencilIcon } from "lucide-react";
import EditLeadModal from "./EditLeadModal";
import DeleteLeadModal from "./DeleteLeadModal";
import { getLeads } from "@/api/leads";
import { TableSkeleton } from "@/components/TableSkeleton";


const LeadsTable = () => {
	const [editLeadModalOpen, setEditLeadModalOpen] = useState<boolean>(false)
	const [deleteLeadModalOpen, setDeleteLeadModalOpen] = useState<boolean>(false)
	const [currentLead, setCurrentLead] = useState<Lead>()
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
		return <TableSkeleton columns={5} />
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
								<TableHead>Owner</TableHead>
								<TableHead className="w-[1%] text-center">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{leads.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={5}
										className="px-4 py-6 text-center text-sm text-muted-foreground"
									>
										No leads found
									</TableCell>
								</TableRow>
							)}
							{leads.map((lead) => (
								<TableRow key={lead.id} className="odd:bg-muted/50 hover:bg-muted">
									<TableCell className="font-medium">{lead.name}</TableCell>
									<TableCell>{lead.email}</TableCell>
									<TableCell>{lead.company ?? "-"}</TableCell>
									<TableCell>{lead.owner?.email ?? "Unassigned"}</TableCell>
									<TableCell className="flex justify-end gap-2">
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

										<Button
											onClick={() => {
												setCurrentLead(lead)
												setDeleteLeadModalOpen(true)
											}}
											variant="destructive"
											className="bg-red-400 cursor-pointer"
											size={"sm"}
										>
											<TrashIcon color="white" />
										</Button>
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
