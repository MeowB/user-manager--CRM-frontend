import LeadsTable from "@/features/leads/components/LeadsTable"
import { Button } from "@/components/ui/button"
import CreateNewLeadModal from "@/features/leads/components/CreateNewLeadModal"
import { useState } from "react"

const LeadPage = () => {
	const [newLeadModalOpen, setNewLeadModalOpen] = useState<boolean>(false)

	return (
		<div className="w-full px-4 py-6 sm:px-5 lg:px-6">
			<div className="mb-6 flex items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Leads</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Manage prospects and contact information.
					</p>
				</div>

				<Button className="cursor-pointer" size="sm" onClick={() => setNewLeadModalOpen(true)}>
					+ Add Lead
				</Button>
			</div>

			<LeadsTable />
			<CreateNewLeadModal open={newLeadModalOpen} setOpen={setNewLeadModalOpen} />
		</div>
	)
}

export default LeadPage
