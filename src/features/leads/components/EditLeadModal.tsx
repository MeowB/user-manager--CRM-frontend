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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import type { Lead } from "@/domain/lead"
import { updateLead } from "@/api/leads"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { LeadInput } from "@/api/leads"
import { useState } from "react"
import { editLeadSchema } from "../schemas/editLead.schema"
import { toast } from "sonner"

type NewLeadModalProps = {
	open: boolean,
	setOpen: (open: boolean) => void,
	lead?: Lead
}

const EditLeadModal = ({ open, setOpen, lead }: NewLeadModalProps) => {
	const queryClient = useQueryClient()
	const [formError, setFormError] = useState<string | null>(null)
	const updateLeadMutation = useMutation({
		mutationFn: (input: LeadInput) => {
			if (!lead) {
				throw new Error("No lead selected")
			}

			return updateLead(lead.id, input)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["leads"] })
			queryClient.invalidateQueries({ queryKey: ["lead", lead?.id] })
			setFormError(null)
			setOpen(false)
			toast.success("Lead updated")
		},
		onError: (error) => {
			toast.error((error as Error).message)
		}
	})

	if (!lead) {
		return null
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFormError(null)

		const formData = new FormData(e.currentTarget)

		const result = editLeadSchema.safeParse({
			name: formData.get("name"),
			email: formData.get("email"),
			company: formData.get("company"),
			status: formData.get("status"),
			priority: formData.get("priority"),
			budget: formData.get("budget"),
		})

		if (!result.success) {
			setFormError(result.error.issues[0]?.message ?? "Invalid lead details")
			return
		}


		updateLeadMutation.mutate(result.data)
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
							<Input id="company" name="company" defaultValue={lead.company ?? ""} />
						</Field>
						<Field>
							<Select name="status" defaultValue={lead.status}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="new">New</SelectItem>
									<SelectItem value="contacted">Contacted</SelectItem>
									<SelectItem value="qualified">Qualified</SelectItem>
									<SelectItem value="unqualified">Unqualified</SelectItem>
									<SelectItem value="converted">Converted</SelectItem>
								</SelectContent>
							</Select>
						</Field>
						<Field>
							<Select name="priority" defaultValue={lead.priority}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select priority" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="low">Low</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="high">High</SelectItem>
								</SelectContent>
							</Select>
						</Field>
						<Field>
							<Input
								id="budget"
								name="budget"
								type="number"
								min="0"
								step="0.01"
								defaultValue={lead.budget === null ? "" : lead.budget / 100}
							/>
						</Field>
					</FieldGroup>
					{formError && (
						<p className="mt-4 text-sm text-destructive">
							{formError}
						</p>
					)}
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
