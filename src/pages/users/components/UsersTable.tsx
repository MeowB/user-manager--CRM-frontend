import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../components/ui/table"

import type { User } from "../../../domain/user"

type UsersTableProps = {
	users: User[]
}

const UsersTable = ({ users }: UsersTableProps) => {
	return (
		<div className="mt-6 max-w-4xl mx-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{users.map((user) => (
						<TableRow>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell>{user.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default UsersTable
