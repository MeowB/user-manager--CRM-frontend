import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import type { Lead } from "@/domain/lead";

const LeadsTable = () => {

	const [leads, setLeads] = useState<Lead[]>()

	const fetchLeads = async () => {
		const res = await fetch("http://localhost:3000/leads")
		console.log(leads)
		return res.json();
	}

	useEffect(() => {
		fetchLeads().then(setLeads)
	}, [])

	return (<>
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-25">Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Company</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{leads?.map((lead) => (
					<TableRow key={lead.id}>
						<TableCell className="font-medium">{lead.name}</TableCell>
						<TableCell>{lead.email}</TableCell>
						<TableCell>{lead.company}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</>
	)
}

export default LeadsTable
