import { apiFetch } from "@/api/api"
import type { DashboardSummary } from "@/domain/dashboard"

const readErrorMessage = async (res: Response, fallback: string) => {
	const error = await res.json().catch(() => null)

	return error?.message || fallback
}

export const getDashboardSummary = async (
	ownerId?: string
): Promise<DashboardSummary> => {
	const params = new URLSearchParams()

	if (ownerId) {
		params.set("ownerId", ownerId)
	}

	const query = params.toString()
	const res = await apiFetch(`/dashboard/summary${query ? `?${query}` : ""}`)

	if (!res) {
		throw new Error("Failed to fetch dashboard summary")
	}

	if (!res.ok) {
		throw new Error(await readErrorMessage(res, "Failed to fetch dashboard summary"))
	}

	return res.json()
}
