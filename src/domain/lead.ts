/*
 * Frontend Lead domain contract.
 * Mirrors the fields returned by the backend Lead API.
 */

export type Lead = {
	id: string
	name: string
	email: string
	company: string | null
	createdAt: string
	updatedAt: string
}
