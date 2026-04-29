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
import { createLead } from "@/api/leads"

type NewLeadModalProps = {
	open: boolean,
	setOpen: (open: boolean) => void
}

const CreateNewLeadModal = ({ open, setOpen }: NewLeadModalProps) => {


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
    const formData= new FormData(e.currentTarget)

    const name = formData.get("name")
    const email= formData.get("email")
    const company = formData.get("company")

    if(!name || !email || !company) {
      alert("All fields are required")
      return
    }

  const newLead = {
      name,
      email,
      company
    }

    await createLead(newLead)

		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-sm">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Add Lead</DialogTitle>
					</DialogHeader>
					<FieldGroup className="mt-4">
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
					<DialogFooter className="mt-4">
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
