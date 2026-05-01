import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../api/users"
import UsersTable from "./components/UsersTable"

const UsersPage = () => {
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

	if (isLoading || !usersResponse) {
		return <p>Loading users...</p>
	}


	return (
		<div className="mx-auto">
			<h1 className="text-2xl font-semibold">Users</h1>
			<p className="text-sm text-muted-foreground mt-1">
				List of registered users and their current status.
			</p>

			<UsersTable users={usersResponse} />
		</div>
	)
}

export default UsersPage
