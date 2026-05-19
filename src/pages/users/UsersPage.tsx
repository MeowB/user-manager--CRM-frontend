import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../api/users"
import UsersTable from "./components/UsersTable"
import { Button } from "@/components/ui/button"
import CreateUserModal from "@/features/users/components/CreateUserModal"
import { useState } from "react"
import { TableSkeleton } from "@/components/TableSkeleton"

const UsersPage = () => {
	const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
	const {
		data: usersResponse,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['users'],
		queryFn: getUsers
	})

	if (isError) {
		return <p>Error: {(error as Error).message}</p>
	}

	return (
		<div className="w-full max-w-6xl mx-auto px-6 py-6">
			<div className="mb-6 flex items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Users</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Manage registered users, roles, and account status.
					</p>
				</div>

				<Button className="cursor-pointer" size="sm" onClick={() => setIsCreateOpen(true)}>
					+ Add User
				</Button>
			</div>

			{isLoading || !usersResponse ? (
				<TableSkeleton columns={4} />
			) : (
				<UsersTable users={usersResponse} />
			)}
			<CreateUserModal open={isCreateOpen} setOpen={setIsCreateOpen} />
		</div>
	)
}

export default UsersPage
