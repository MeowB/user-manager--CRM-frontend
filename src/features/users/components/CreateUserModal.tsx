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
import { Select } from "@/components/ui/select"
import {
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from "@hookform/resolvers/zod"
import { createUserSchema } from "../schemas/createUser.schema"
import type { CreateUserFormValues } from "../schemas/createUser.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser } from "@/api/users"
import { toast } from "sonner"


import { useEffect } from "react"

type CreateUserModalProps = {
	open: boolean,
	setOpen: (open: boolean) => void
}

export function CreateUserModal({ open, setOpen }: CreateUserModalProps) {

	const queryClient = useQueryClient()

	const createUserMutation = useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] })
			setOpen(false)
			toast.success("User created")
		},
		onError: (error) => {
			toast.error((error as Error).message)
		},
	})

	const form = useForm<CreateUserFormValues>({
		resolver: zodResolver(createUserSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
			role: "viewer",
			status: "active"
		},
	})


	useEffect(() => {
		if (!open) {
			form.reset()
		} else {
			form.clearErrors()
		}
	}, [open, form])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-106.25">
				<form
					onSubmit={form.handleSubmit((values) => {
						createUserMutation.mutate(values)
					})}
				>
					<DialogHeader>
						<DialogTitle>Create User</DialogTitle>
					</DialogHeader>

					{/* FORM BODY */}
					<div className="grid gap-4 mt-6">
						{/* Email */}
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								type="email"
								id="email"
								placeholder="user@exemple.com"
								{...form.register("email")}
								className={`mt-2 ${form.formState.errors.email && "border-red-400"}`}
							/>
							{form.formState.errors.email && (
								<p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
							)}
						</div>
						{/* Password */}
						<div>
							<label htmlFor="password">Password</label>
							<Input
								type="password"
								id="password"
								{...form.register("password")}
								className={`mt-2 ${form.formState.errors.password && "border-red-400"}`}
							/>
						</div>
						{/* Role */}
						<div className="w-full">
							<Label>Role</Label>

							<Select
								value={form.watch("role")}
								onValueChange={(value) => form.setValue("role", value as CreateUserFormValues["role"])}
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
							{form.formState.errors.role && (
								<p className="text-sm text-destructive">{form.formState.errors.role.message}</p>
							)}
						</div>
						{/* Status */}
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
											<RadioGroupItem value="active" id="active" />
											<Label htmlFor="active">Active</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem value="disabled" id="disabled" />
											<Label htmlFor="disabled">Disabled</Label>
										</div>
									</RadioGroup>
								)}
							/>

						</div>
					</div>
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							type="submit"
							disabled={!form.formState.isValid || createUserMutation.isPending}>
							{createUserMutation.isPending ? "Creating..." : "Create user"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateUserModal
