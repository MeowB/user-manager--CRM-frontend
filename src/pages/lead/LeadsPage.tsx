import LeadsTable from "./components/LeadsTable"

const LeadPage = () => {

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault

		const form = e.currentTarget

		const newLead = {
			name: (form.elements.namedItem("name") as HTMLInputElement).value,
			email: (form.elements.namedItem("email") as HTMLInputElement).value,
			company: (form.elements.namedItem("company") as HTMLInputElement).value
		}

		await fetch("http://localhost:3000/leads", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newLead)
		})
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input name="name" placeholder="Name" />
				<input name="email" placeholder="Email" />
				<input name="company" placeholder="Company" />
				<button type="submit">Add Lead</button>
			</form>
			<LeadsTable />
		</>
	)
}

export default LeadPage
