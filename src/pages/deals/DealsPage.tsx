import DealsTable from "@/features/deals/components/DealsTable"

const DealsPage = () => {
	return (
		<div className="w-full px-4 py-6 sm:px-5 lg:px-6">
			<div className="mb-6 flex items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Deals</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Review active opportunities and their pipeline stage.
					</p>
				</div>
			</div>

			<DealsTable />
		</div>
	)
}

export default DealsPage
