/*

 * Mock users API.
 * Simulates a real backend endpoint using a typed contract and async behavior.
 * This allows front-end development to progress independently of the backend
 * and makes swapping to a real API straightforward later.
 
*/

import type { User } from "../domain/user"

export type UserResponse = {
	data: User[]
}

export async function getUsers(): Promise<UserResponse> {
	await new Promise(r => setTimeout(r, 500))

	if (Math.random() < 0.2) {
		throw new Error("Network error")
	}

	return {
		data: [
			{ id: '1', email: 'admin@test.com', role: 'admin', status: 'active' },
			{ id: '2', email: 'salesAgent@test.com', role: 'salesAgent', status: 'active' },
			{ id: '3', email: 'viewer@test.com', role: 'viewer', status: 'active' }
		]
	}
}