import { updateDeal } from "@/api/deals"
import type { UpdateDealInput } from "@/api/deals"
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
import type { Deal } from "@/domain/deal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { editDealSchema } from "../schemas/editDeal.schema"

type EditDealModalProps = {
	open: boolean
	setOpen: (open: boolean) => void
	deal?: Deal
}

const EditDealModal = ({ open, setOpen, deal }: EditDealModalProps) => {
	const queryClient = useQueryClient()
	const [formError, setFormError] = useState<string | null>(null)
	const updateDealMutation = useMutation({
		mutationFn: (input: UpdateDealInput) => {
			if (!deal) {
				throw new Error("No deal selected")
			}

			return updateDeal(deal.id, input)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["deals"] })
			queryClient.invalidateQueries({ queryKey: ["deals", "lead", deal?.leadId] })
			queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] })
			setFormError(null)
			setOpen(false)
			toast.success("Deal updated")
		},
		onError: (error) => {
			toast.error((error as Error).message)
		},
	})

	if (!deal) {
		return null
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setFormError(null)

		const formData = new FormData(event.currentTarget)
		const result = editDealSchema.safeParse({
			title: formData.get("title"),
			amount: formData.get("amount"),
			stage: formData.get("stage"),
		})

		if (!result.success) {
			setFormError(result.error.issues[0]?.message ?? "Invalid deal details")
			return
		}

		updateDealMutation.mutate(result.data)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-sm">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Edit Deal</DialogTitle>
					</DialogHeader>
					<FieldGroup className="mt-4">
						<Field>
							<Label htmlFor="title">Title</Label>
							<Input id="title" name="title" defaultValue={deal.title} />
						</Field>
						<Field>
							<Label htmlFor="amount">Amount</Label>
							<Input
								id="amount"
								name="amount"
								type="number"
								min="0"
								step="0.01"
								defaultValue={deal.amount === null ? "" : deal.amount / 100}
							/>
						</Field>
						<Field>
							<Label>Stage</Label>
							<Select name="stage" defaultValue={deal.stage}>
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
						<p className="mt-4 text-sm text-destructive">{formError}</p>
					)}
					{updateDealMutation.isError && (
						<p className="mt-4 text-sm text-destructive">
							{(updateDealMutation.error as Error).message}
						</p>
					)}
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline" type="button">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" disabled={updateDealMutation.isPending}>
							{updateDealMutation.isPending ? "Saving..." : "Edit deal"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default EditDealModal
