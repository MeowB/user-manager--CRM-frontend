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
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, TrashIcon, PencilIcon } from "lucide-react";
import { getCurrentUserId } from "@/lib/auth"

type UsersTableProps = {
	users: User[],
}

type SortDirection = "asc" | "desc"
type UserSortKey = "fullName" | "email" | "role" | "status"

const protectedDemoEmails = new Set([
	"admin@demo.account",
	"sales@demo.account",
	"viewer@demo.account"
])

const compareText = (first: string, second: string) =>
	first.localeCompare(second, undefined, { sensitivity: "base" })

const SortHeader = ({
	label,
	sortKey,
	activeSortKey,
	sortDirection,
	onSort,
	className = "",
}: {
	label: string
	sortKey: UserSortKey
	activeSortKey: UserSortKey
	sortDirection: SortDirection
	onSort: (sortKey: UserSortKey) => void
	className?: string
}) => {
	const isActive = activeSortKey === sortKey
	const Icon = isActive
		? sortDirection === "asc"
			? ArrowUpIcon
			: ArrowDownIcon
		: ArrowUpDownIcon

	return (
		<TableHead className={className}>
			<button
				type="button"
				onClick={() => onSort(sortKey)}
				className="inline-flex cursor-pointer items-center gap-1 text-left hover:text-primary"
			>
				{label}
				<Icon className="size-3.5 text-muted-foreground" />
			</button>
		</TableHead>
	)
}

const UsersTable = ({ users }: UsersTableProps) => {
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const [sortKey, setSortKey] = useState<UserSortKey>("fullName")
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
	const currentUserId = getCurrentUserId()
	const isProtectedDemoUser = (user: User) => protectedDemoEmails.has(user.email)
	const canEditUser = (user: User) => !isProtectedDemoUser(user)
	const canDeleteUser = (user: User) =>
		user.id !== currentUserId && !isProtectedDemoUser(user)
	const handleSort = (nextSortKey: UserSortKey) => {
		if (nextSortKey === sortKey) {
			setSortDirection((currentDirection) =>
				currentDirection === "asc" ? "desc" : "asc"
			)
			return
		}

		setSortKey(nextSortKey)
		setSortDirection("asc")
	}
	const sortedUsers = [...users].sort((firstUser, secondUser) => {
		const result = compareText(firstUser[sortKey], secondUser[sortKey])

		return sortDirection === "asc" ? result : -result
	})

	return (
		<div className="w-full flex flex-col">
			<div className="rounded-md border bg-background">
				<Table>
					<TableHeader>
						<TableRow>
							<SortHeader
								label="User"
								sortKey="fullName"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortHeader
								label="Email"
								sortKey="email"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortHeader
								label="Role"
								sortKey="role"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortHeader
								label="Status"
								sortKey="status"
								activeSortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
								className="w-[1%] text-center"
							/>
							<TableHead className="w-[1%] text-center">Actions</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{users.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={5}
									className="px-4 py-6 text-center text-sm text-muted-foreground"
								>
									No users found
								</TableCell>
							</TableRow>
						)}
						{sortedUsers.map((user) => (
							<TableRow key={user.id} className="odd:bg-muted/50 hover:bg-muted">
								<TableCell className="font-medium">{user.fullName}</TableCell>
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
								<TableCell className="px-1 text-right">
									<div className="flex justify-end gap-2">
										{canEditUser(user) && (
											<Button
												className="bg-blue-400 hover:bg-blue-600 cursor-pointer"
												size="sm"
												onClick={() => {
													setSelectedUser(user)
													setIsEditOpen(true)
												}}
											>
												<PencilIcon color="white" />
											</Button>
										)}
										{canDeleteUser(user) && (
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
									</div>
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
