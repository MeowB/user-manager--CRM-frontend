import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateUser } from "@/api/users"
import type { User } from "@/domain/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { editUserSchema } from "../schemas/editUser.schema"
import type { EditUserFormValues } from "../schemas/editUser.schema"
import { toast } from "sonner"

type EditUserModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  user: User | null
}

export function EditUserModal({ open, setOpen, user }: EditUserModalProps) {
  const queryClient = useQueryClient()

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      role: "viewer",
      status: "active"
    },
  })

  const {
    mutate: updateSelectedUser,
    isPending,
    isError,
    error,
    reset: resetUpdateUserMutation,
  } = useMutation({
    mutationFn: (values: EditUserFormValues) => {
      if (!user) {
        throw new Error("No user selected")
      }

      return updateUser(user.id, values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setOpen(false)
      toast.success("User updated")
    },
    onError: (error) => {
      toast.error((error as Error).message)
    },
  })

  useEffect(() => {
    if (open && user) {
      form.reset({
        fullName: user.fullName,
        role: user.role,
        status: user.status
      })
      resetUpdateUserMutation()
    }

    if (!open) {
      form.reset()
      resetUpdateUserMutation()
    }
  }, [open, user, form, resetUpdateUserMutation])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-106.25">
        <form
          onSubmit={form.handleSubmit((values) => {
            updateSelectedUser(values)
          })}
        >
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-6">
            <div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <div>
              <Label htmlFor="edit-fullName">Full name</Label>
              <Input
                id="edit-fullName"
                className={`mt-2 ${form.formState.errors.fullName && "border-red-400"}`}
                {...form.register("fullName")}
              />
              {form.formState.errors.fullName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <Label>Role</Label>
              <Select
                value={form.watch("role")}
                onValueChange={(value) =>
                  form.setValue("role", value as EditUserFormValues["role"], {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
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

            {isError && (
              <p className="text-sm text-destructive">
                {(error as Error).message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!user || isPending}
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserModal
