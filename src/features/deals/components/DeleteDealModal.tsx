import { deleteDeal } from "@/api/deals"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import type { Deal } from "@/domain/deal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

type DeleteDealModalProps = {
	open: boolean
	setOpen: (open: boolean) => void
	deal?: Deal
}

const DeleteDealModal = ({ open, setOpen, deal }: DeleteDealModalProps) => {
	const queryClient = useQueryClient()
	const deleteDealMutation = useMutation({
		mutationFn: () => {
			if (!deal) {
				throw new Error("No deal selected")
			}

			return deleteDeal(deal.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["deals"] })
			queryClient.invalidateQueries({ queryKey: ["deals", "lead", deal?.leadId] })
			queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] })
			setOpen(false)
			toast.success("Deal deleted")
		},
		onError: (error) => {
			toast.error((error as Error).message)
		},
	})

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Delete Deal</DialogTitle>
					<DialogDescription>
						This action will permanently delete {deal?.title ?? "this deal"}.
					</DialogDescription>
				</DialogHeader>

				{deleteDealMutation.isError && (
					<p className="text-sm text-destructive">
						{(deleteDealMutation.error as Error).message}
					</p>
				)}

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" type="button">
							Cancel
						</Button>
					</DialogClose>
					<Button
						type="button"
						variant="destructive"
						disabled={!deal || deleteDealMutation.isPending}
						onClick={() => deleteDealMutation.mutate()}
					>
						{deleteDealMutation.isPending ? "Deleting..." : "Delete deal"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DeleteDealModal
