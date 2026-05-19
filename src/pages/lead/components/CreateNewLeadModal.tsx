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
import { useMutation, useQueryClient } from "@tanstack/react-query"

type NewLeadModalProps = {
	open: boolean,
	setOpen: (open: boolean) => void
}

const CreateNewLeadModal = ({ open, setOpen }: NewLeadModalProps) => {
	const queryClient = useQueryClient()

	const createLeadMutation = useMutation({
		mutationFn: createLead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] })
			setOpen(false)
		}
	})


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const name = formData.get("name")
		const email = formData.get("email")
		const company = formData.get("company")

		if (
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof company !== "string"
		) {
			alert("All fields are required")
			return
		}

		const newLead = {
			name,
			email,
			company
		}

		createLeadMutation.mutate(newLead)
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
					{createLeadMutation.isError && (
						<p className="mt-4 text-sm text-destructive">
							{(createLeadMutation.error as Error).message}
						</p>
					)}
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit" disabled={createLeadMutation.isPending}>
							{createLeadMutation.isPending ? "Adding..." : "Add Lead"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog >
	)
}

export default CreateNewLeadModal
