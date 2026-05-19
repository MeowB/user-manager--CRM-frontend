import { deleteLead } from "@/api/leads"
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
import type { Lead } from "@/domain/lead"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

type DeleteLeadModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  lead: Lead | undefined
}

export function DeleteLeadModal({ open, setOpen, lead }: DeleteLeadModalProps) {
  const queryClient = useQueryClient()

  const deleteLeadMutation = useMutation({
    mutationFn: () => {
      if (!lead) {
        throw new Error("No lead selected")
      }

      return deleteLead(lead.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] })
      setOpen(false)
      toast.success("Lead deleted")
    },
    onError: (error) => {
      toast.error((error as Error).message)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Lead</DialogTitle>
          <DialogDescription>
            This action will permanently delete {lead?.name ?? "this lead"}.
          </DialogDescription>
        </DialogHeader>

        {deleteLeadMutation.isError && (
          <p className="text-sm text-destructive">
            {(deleteLeadMutation.error as Error).message}
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
            disabled={!lead || deleteLeadMutation.isPending}
            onClick={() => deleteLeadMutation.mutate()}
          >
            {deleteLeadMutation.isPending ? "Deleting..." : "Delete lead"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteLeadModal
