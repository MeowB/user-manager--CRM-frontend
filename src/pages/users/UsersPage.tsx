import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../api/users.mock"
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
		<UsersTable users={usersResponse.data} />
	)
}

export default UsersPage