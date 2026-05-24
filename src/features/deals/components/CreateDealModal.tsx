import { createDeal } from "@/api/deals"
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
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import type { Lead } from "@/domain/lead"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { createDealSchema } from "../schemas/createDeal.schema"

type CreateDealModalProps = {
	open: boolean
	setOpen: (open: boolean) => void
	lead: Lead
}

const CreateDealModal = ({ open, setOpen, lead }: CreateDealModalProps) => {
	const queryClient = useQueryClient()
	const [formError, setFormError] = useState<string | null>(null)

	const createDealMutation = useMutation({
		mutationFn: createDeal,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["deals"] })
			queryClient.invalidateQueries({ queryKey: ["deals", "lead", lead.id] })
			queryClient.invalidateQueries({ queryKey: ["lead", lead.id] })
			setFormError(null)
			setOpen(false)
			toast.success("Deal created")
		},
		onError: (error) => {
			toast.error((error as Error).message)
		},
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFormError(null)
		const formData = new FormData(e.currentTarget)

		const result = createDealSchema.safeParse({
			leadId: lead.id,
			title: formData.get("title"),
			amount: formData.get("amount"),
			stage: formData.get("stage"),
		})

		if (!result.success) {
			setFormError(result.error.issues[0]?.message ?? "Invalid deal details")
			return
		}

		createDealMutation.mutate(result.data)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-sm">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Create Deal</DialogTitle>
					</DialogHeader>
					<FieldGroup className="mt-4">
						<Field>
							<Label htmlFor="title">Title</Label>
							<Input id="title" name="title" placeholder="Title" />
						</Field>
						<Field>
							<Label htmlFor="amount">Amount</Label>
							<Input
								id="amount"
								name="amount"
								type="number"
								min="0"
								step="0.01"
								placeholder="amount"
								defaultValue={lead.budget === null ? "" : lead.budget / 100}
							/>
						</Field>
						<Field>
							<Label>Stage</Label>
							<Select name="stage" defaultValue="discovery">
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select stage" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="discovery">Discovery</SelectItem>
									<SelectItem value="proposal">Proposal</SelectItem>
									<SelectItem value="negotiation">Negotiation</SelectItem>
									<SelectItem value="closedWon">Closed Won</SelectItem>
									<SelectItem value="closedLost">Closed Lost</SelectItem>
								</SelectContent>
							</Select>
						</Field>
					</FieldGroup>
					{formError && (
						<p className="mt-4 text-sm text-destructive">
							{formError}
						</p>
					)}
					{createDealMutation.isError && (
						<p className="mt-4 text-sm text-destructive">
							{(createDealMutation.error as Error).message}
						</p>
					)}
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit" disabled={createDealMutation.isPending}>
							{createDealMutation.isPending ? "Creating..." : "Create Deal"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateDealModal
