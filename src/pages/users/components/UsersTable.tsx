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
import CreateUserModal from "@/features/users/components/CreateUserModal"
import { TrashIcon, PencilIcon } from "lucide-react";

type UsersTableProps = {
	users: User[],
}

const UsersTable = ({ users }: UsersTableProps) => {
	const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)

	return (
		<div className="w-full flex flex-col">
			<div className="mt-6 rounded-md border">
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
									<Button disabled className="cursor-pointer hover:border hover:border-gray-300 border-transparent border" size="sm" variant="secondary">
										<PencilIcon />
									</Button>
									<Button disabled className="cursor-pointer" size="sm" variant="destructive">
										<TrashIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>

				</Table>
			</div>
			<div className="mt-2 ml-auto">
				<Button className="cursor-pointer" size="sm" onClick={() => setIsCreateOpen(true)}>+ Add User</Button>
				<CreateUserModal open={isCreateOpen} setOpen={setIsCreateOpen}/>
			</div>
		</div>
	)
}

export default UsersTable
