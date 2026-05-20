/*
 * Frontend Lead domain contract.
 * Mirrors the fields returned by the backend Lead API.
 */


export type LeadOwner = {
	id: string
	email: string
	role: "admin" | "salesAgent" | "viewer"
}

export type Lead = {
	id: string
	name: string
	email: string
	company: string | null
	ownerId: string | null
	owner: LeadOwner | null
	createdAt: string
	updatedAt: string
}
