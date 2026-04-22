import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Lead } from "@/domain/lead"

type NewLeadModalProps = {
	open: boolean,
	setOpen: (open: boolean) => void,
	lead?: Lead
}

const EditLeadModal = ({ open, setOpen, lead }: NewLeadModalProps) => {
	console.log(lead)

	if(!lead) {
		return null
	}


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

		await fetch(`http://localhost:3000/leads/${lead.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newLead)
		})

		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-sm">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Edit Lead</DialogTitle>
					</DialogHeader>
					<FieldGroup className="mt-4">
						<Field>
							<Input id="name" name="name" defaultValue={lead.name} />
						</Field>
						<Field>
							<Input id="email" name="email" defaultValue={lead.email} />
						</Field>
						<Field>
							<Input id="company" name="company" defaultValue={lead.company} />
						</Field>
					</FieldGroup>
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Edit lead</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog >
	)
}

export default EditLeadModal