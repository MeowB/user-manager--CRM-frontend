export type UserRole = "admin" | "salesAgent" | "viewer"

type TokenPayload = {
	userId?: unknown
	role?: unknown
}

const isUserRole = (role: unknown): role is UserRole => {
	return role === "admin" || role === "salesAgent" || role === "viewer"
}

const getCurrentTokenPayload = (): TokenPayload | null => {
	const token = localStorage.getItem("token")

	if (!token) return null

	try {
		return JSON.parse(atob(token.split(".")[1])) as TokenPayload
	} catch {
		return null
	}
}

export const getCurrentUserRole = (): UserRole | null => {
	const payload = getCurrentTokenPayload()

	return isUserRole(payload?.role) ? payload.role : null
}

export const getCurrentUserId = (): string | null => {
	const payload = getCurrentTokenPayload()

	return typeof payload?.userId === "string" ? payload.userId : null
}
