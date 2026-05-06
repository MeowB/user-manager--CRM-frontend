import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateUser, type UpdateUserInput } from "@/api/users"
import type { User } from "@/domain/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

type EditUserModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  selectedUser: User | null
  onUpdated?: () => void
}

const EditUserModal = ({
  open,
  setOpen,
  selectedUser,
  onUpdated,
}: EditUserModalProps) => {
  const queryClient = useQueryClient()

  const form = useForm<UpdateUserInput>({
    defaultValues: {
      role: "viewer",
      status: "active",
    },
  })

  const updateUserMutation = useMutation({
    mutationFn: (values: UpdateUserInput) => {
      if (!selectedUser) {
        throw new Error("No user selected")
      }

      return updateUser(selectedUser.id, values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setOpen(false)
      onUpdated?.()
    },
  })

  useEffect(() => {
    if (selectedUser && open) {
      form.reset({
        role: selectedUser.role,
        status: selectedUser.status,
      })
    }
  }, [selectedUser, open, form])

  if (!selectedUser) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-106.25">
        <form
          onSubmit={form.handleSubmit((values) => {
            updateUserMutation.mutate(values)
          })}
        >
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-6">
            <div className="w-full">
              <Label>Role</Label>
              <Select
                value={form.watch("role")}
                onValueChange={(value) =>
                  form.setValue("role", value as UpdateUserInput["role"])
                }
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  className="w-[--radix-select-trigger-width]"
                >
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="salesAgent">Sales Agent</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label>Status</Label>
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="edit-active" />
                      <Label htmlFor="edit-active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="disabled" id="edit-disabled" />
                      <Label htmlFor="edit-disabled">Disabled</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {updateUserMutation.isError && (
              <p className="text-sm text-destructive">
                {(updateUserMutation.error as Error).message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserModal
