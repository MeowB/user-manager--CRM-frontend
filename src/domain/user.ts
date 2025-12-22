export type User = {
	id: string
	email: string
	role: "admin" | "salesAgent" | "viewer"
	status: "active" | "disabled"
}