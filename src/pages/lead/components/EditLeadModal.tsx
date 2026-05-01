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
import { updateLead } from "@/api/leads"

type NewLeadModalProps = {
	open: boolean,
	setOpen: (open: boolean) => void,
	lead?: Lead
}

const EditLeadModal = ({ open, setOpen, lead }: NewLeadModalProps) => {
	console.log(lead)

	if (!lead) {
		return null
	}


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('submit')

		const formData = new FormData(e.currentTarget)

   const name = formData.get("name")
   const email = formData.get("email")
   const company = formData.get("company")

  if(
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof company !== "string"
    ) {
      alert("All field are required")
      return
    }


    await updateLead(lead.id, { name, email, company })

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
