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
	useMutation,
	useQueryClient
} from "@tanstack/react-query"
import { useState } from "react"
import type { Lead } from "@/domain/lead";
import { Button } from "@/components/ui/button";
import { TrashIcon, PencilIcon } from "lucide-react";
import CreateNewLeadModal from "./CreateNewLeadModal"
import EditLeadModal from "./EditLeadModal";
import { deleteLead, getLeads } from "@/api/leads";


const LeadsTable = () => {
	const [newLeadModalOpen, setNewLeadModalOpen] = useState<boolean>(false)
	const [editLeadModalOpen, setEditLeadModalOpen] = useState<boolean>(false)
	const [currentLead, setCurrentLead] = useState<Lead>()
	const queryClient = useQueryClient()
	const {
		data: leads = [],
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["leads"],
		queryFn: getLeads,
	})
	const deleteLeadMutation = useMutation({
		mutationFn: deleteLead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] })
		}
	})

	if(isLoading) {
		return <p>Loading Leads...</p>
	}

	if (isError) {
		return <p>Error: {(error as Error).message}</p>
	}

	
	return (
		<>
			<div className="w-full flex flex-col">

				<EditLeadModal open={editLeadModalOpen} setOpen={setEditLeadModalOpen} lead={currentLead} />
				<CreateNewLeadModal open={newLeadModalOpen} setOpen={setNewLeadModalOpen} />

				<div className="mt-6 rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-25">Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Company</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{leads.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={4}
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
									<TableCell>
										<Button
											onClick={() => {
												setEditLeadModalOpen(true)
												setCurrentLead(lead)
											}}
											className="bg-blue-400 hover:bg-blue-600 cursor-pointer mr-1" size={"sm"}
										>
											<PencilIcon color="white" />
										</Button>

										<Button
											onClick={() => deleteLeadMutation.mutate(lead.id)}
											disabled={deleteLeadMutation.isPending}
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

				<div className="mt-2 ml-auto">
					<Button className="cursor-pointer" size="sm" onClick={() => setNewLeadModalOpen(true)}>+ Add Lead</Button>
				</div>
				{deleteLeadMutation.isError && (
					<p className="mt-2 text-sm text-destructive">
						{(deleteLeadMutation.error as Error).message}
					</p>
				)}
			</div>
		</>
	)
}

export default LeadsTable
