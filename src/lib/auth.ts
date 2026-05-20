export type UserRole = "admin" | "salesAgent" | "viewer"

type TokenPayload = {
	role?: unknown
}

const isUserRole = (role: unknown): role is UserRole => {
	return role === "admin" || role === "salesAgent" || role === "viewer"
}

export const getCurrentUserRole = (): UserRole | null => {
	const token = localStorage.getItem("token")

	if (!token) return null

	try {
		const payload = JSON.parse(atob(token.split(".")[1])) as TokenPayload
		return isUserRole(payload.role) ? payload.role : null
	} catch {
		return null
	}
}
