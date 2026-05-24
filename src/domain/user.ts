
/*
 * Frontend User domain contract.
 * Matches password-safe user responses returned by the backend API.
 */

export type User = {
	id: string
	fullName: string
	email: string
	role: "admin" | "salesAgent" | "viewer"
	status: "active" | "disabled"
}
