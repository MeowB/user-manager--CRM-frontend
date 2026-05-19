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
import { useState } from "react"
import { createLeadSchema } from "../schemas/createLead.schema"

type NewLeadModalProps = {
	open: boolean,
	setOpen: (open: boolean) => void
}

const CreateNewLeadModal = ({ open, setOpen }: NewLeadModalProps) => {
	const queryClient = useQueryClient()
	const [formError, setFormError] = useState<string | null>(null)

	const createLeadMutation = useMutation({
		mutationFn: createLead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] })
			setFormError(null)
			setOpen(false)
		}
	})


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFormError(null)
		const formData = new FormData(e.currentTarget)

		const result = createLeadSchema.safeParse({
			name: formData.get("name"),
			email: formData.get("email"),
			company: formData.get("company"),
		})

		if (!result.success) {
			setFormError(result.error.issues[0]?.message ?? "Invalid lead details")
			return
		}

		createLeadMutation.mutate(result.data)
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
					{formError && (
						<p className="mt-4 text-sm text-destructive">
							{formError}
						</p>
					)}
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
