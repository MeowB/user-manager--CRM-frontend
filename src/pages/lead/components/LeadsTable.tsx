import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import type { Lead } from "@/domain/lead";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import CreateNewLeadModal from "./CreateNewLeadModal"


const LeadsTable = () => {
	const [newLeadModalOpen, setNewLeadModalOpen] = useState<boolean>(false)
	const [leads, setLeads] = useState<Lead[]>()

	const fetchLeads = async () => {
		const res = await fetch("http://localhost:3000/leads")
		return res.json();
	}

	const handleDelete = async (id: String) => {
		await fetch(`http://localhost:3000/leads/${id}`, {
			method: "DELETE",
		})

		fetchLeads()
	}

	useEffect(() => {
		fetchLeads().then(setLeads)
	}, [handleDelete])

	return (
		<>
			<div className="w-full flex flex-col">
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
							{leads?.map((lead) => (
								<TableRow key={lead.id}>
									<TableCell className="font-medium">{lead.name}</TableCell>
									<TableCell>{lead.email}</TableCell>
									<TableCell>{lead.company}</TableCell>
									<TableCell>
										<Button onClick={() => handleDelete(lead.id)} variant="destructive" className="bg-red-400 cursor-pointer" size={"sm"}>
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
					<CreateNewLeadModal open={newLeadModalOpen} setOpen={setNewLeadModalOpen}/>
				</div>
			</div>
		</>
	)
}

export default LeadsTable
