import LeadsTable from "./components/LeadsTable"

const LeadPage = () => {

	return (
		<>
			<div className="mx-auto">
				<h1 className="text-2xl font-semibold">Leads</h1>
				<p className="text-sm text-muted-foreground mt-1">
					List of leads.
				</p>

				<LeadsTable />

			</div>
		</>
	)
}

export default LeadPage
