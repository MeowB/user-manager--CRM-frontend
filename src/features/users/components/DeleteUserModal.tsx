import { deleteUser } from "@/api/users"
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
import type { User } from "@/domain/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

type DeleteUserModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  user: User | null
}

export function DeleteUserModal({ open, setOpen, user }: DeleteUserModalProps) {
  const queryClient = useQueryClient()

  const deleteUserMutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error("No user selected")
      }

      return deleteUser(user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setOpen(false)
      toast.success("User deleted")
    },
    onError: (error) => {
      toast.error((error as Error).message)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            This action will permanently delete {user?.email ?? "this user"}.
          </DialogDescription>
        </DialogHeader>

        {deleteUserMutation.isError && (
          <p className="text-sm text-destructive">
            {(deleteUserMutation.error as Error).message}
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
            disabled={!user || deleteUserMutation.isPending}
            onClick={() => deleteUserMutation.mutate()}
          >
            {deleteUserMutation.isPending ? "Deleting..." : "Delete user"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteUserModal
