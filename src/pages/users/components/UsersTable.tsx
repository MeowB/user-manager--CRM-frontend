import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { User } from "@/domain/user"
import { useState } from "react"
import EditUserModal from "@/features/users/components/EditUserModal"
import DeleteUserModal from "@/features/users/components/DeleteUserModal"
import { TrashIcon, PencilIcon } from "lucide-react";
import { getCurrentUserId } from "@/lib/auth"

type UsersTableProps = {
	users: User[],
}

const UsersTable = ({ users }: UsersTableProps) => {
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const currentUserId = getCurrentUserId()

	return (
		<div className="w-full flex flex-col">
			<div className="rounded-md border bg-background">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead className="w-[1%] text-center">Status</TableHead>
							<TableHead className="w-[1%] text-center">Actions</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{users.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={4}
									className="px-4 py-6 text-center text-sm text-muted-foreground"
								>
									No users found
								</TableCell>
							</TableRow>
						)}
						{users.map((user) => (
							<TableRow key={user.id} className="odd:bg-muted/50 hover:bg-muted">
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<span className={`
									inline-flex items-center justify-center
									min-w-18 rounded-full px-2 py-0.5 text-xs font-medium
									${user.status === "active"
											? "bg-green-100 text-green-700"
											: "bg-gray-200 text-gray-600"
										}
									`}>
										{user.status}
									</span>
								</TableCell>
								<TableCell className="flex gap-2">
									<Button
										className="bg-blue-400 hover:bg-blue-600 cursor-pointer mr-1"
										size="sm"
										onClick={() => {
											setSelectedUser(user)
											setIsEditOpen(true)
										}}
									>
										<PencilIcon color="white" />
									</Button>
									{user.id !== currentUserId && (
										<Button
											className="cursor-pointer"
											size="sm"
											variant="destructive"
											onClick={() => {
												setSelectedUser(user)
												setIsDeleteOpen(true)
											}}
										>
											<TrashIcon />
										</Button>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>

				</Table>
			</div>
			<div>
				<EditUserModal
					open={isEditOpen}
					setOpen={setIsEditOpen}
					user={selectedUser}
				/>
				<DeleteUserModal
					open={isDeleteOpen}
					setOpen={setIsDeleteOpen}
					user={selectedUser}
				/>
			</div>
		</div>
	)
}

export default UsersTable
