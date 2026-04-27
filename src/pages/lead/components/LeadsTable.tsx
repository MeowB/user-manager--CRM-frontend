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
import { TrashIcon, PencilIcon } from "lucide-react";
import CreateNewLeadModal from "./CreateNewLeadModal"
import EditLeadModal from "./EditLeadModal";
import { API_URL } from "@/api/api";
import { useNavigate } from "@tanstack/react-router";


const LeadsTable = () => {
	const [newLeadModalOpen, setNewLeadModalOpen] = useState<boolean>(false)
	const [editLeadModalOpen, setEditLeadModalOpen] = useState<boolean>(false)
	const [currentLead, setCurrentLead] = useState<Lead>()
	const [leads, setLeads] = useState<Lead[]>()

	const navigate = useNavigate()

	const fetchLeads = async () => {
		const token = localStorage.getItem("token")
		if (!token) {
			localStorage.removeItem("token")
			navigate({ to: '/login'})
		}
		const res = await fetch(`${API_URL}/leads`, {
			headers: {
				authorization: `Bearer ${token}`
			}
		}
		)
		const data = await res.json()
		console.log(data)
		return data
	}

	const handleDelete = async (id: String) => {
		await fetch(`${API_URL}/leads/${id}`, {
			method: "DELETE",
		})

		fetchLeads().then(setLeads)
	}

	useEffect(() => {
		fetchLeads().then(setLeads)
	}, [newLeadModalOpen, editLeadModalOpen])

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
							{leads?.map((lead) => (
								<TableRow key={lead.id} className="odd:bg-muted/50 hover:bg-muted">
									<TableCell className="font-medium">{lead.name}</TableCell>
									<TableCell>{lead.email}</TableCell>
									<TableCell>{lead.company}</TableCell>
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
				</div>
			</div>
		</>
	)
}

export default LeadsTable
