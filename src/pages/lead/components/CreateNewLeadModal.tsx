import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const CreateNewLeadModal = () => {

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('submit')

		const formData = new FormData(e.currentTarget)

		const newLead = {
			name: formData.get("name"),
			email: formData.get("email"),
			company: formData.get("company")
		}

		if (!newLead.name || !newLead.email || !newLead.company) {
			alert("All fields are required");
			return;
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
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">New lead +</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Add Lead</DialogTitle>
					</DialogHeader>
					<FieldGroup>
						<Field>
							<Input id="name" name="name" placeholder="Name" />
						</Field>
						<Field>
							<Input id="email" name="email" placeholder="email" />
						</Field>
						<Field>
							<Input id="company" name="company" placeholder="company" />
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Add lead</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog >
	)
}

export default CreateNewLeadModal