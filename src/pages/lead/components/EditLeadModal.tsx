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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { LeadInput } from "@/api/leads"

type NewLeadModalProps = {
	open: boolean,
	setOpen: (open: boolean) => void,
	lead?: Lead
}

const EditLeadModal = ({ open, setOpen, lead }: NewLeadModalProps) => {
	const queryClient = useQueryClient()
	const updateLeadMutation = useMutation({
		mutationFn: (input: LeadInput) => {
			if (!lead) {
				throw new Error("No lead selected")
			}

			return updateLead(lead.id, input)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] })
			setOpen(false)
		}
	})

	if (!lead) {
		return null
	}

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
			alert("All field are required")
			return
		}


		updateLeadMutation.mutate({ name, email, company })
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
					{updateLeadMutation.isError && (
						<p className="mt-4 text-sm text-destructive">
							{(updateLeadMutation.error as Error).message}
						</p>
					)}
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit" disabled={updateLeadMutation.isPending}>
							{updateLeadMutation.isPending ? "Saving..." : "Edit lead"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog >
	)
}

export default EditLeadModal
