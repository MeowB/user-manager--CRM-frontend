/*
 * Deals API client.
 * Keeps deal request/response handling out of UI components.
 */

import { apiFetch } from "@/api/api"
import type { Deal, DealStage } from "@/domain/deal"

export type DealInput = {
	leadId: string
	title: string
	amount?: number | null
	stage?: DealStage
}

export type UpdateDealInput = {
	title?: string
	amount?: number | null
	stage?: DealStage
}

const readErrorMessage = async (res: Response, fallback: string) => {
	const error = await res.json().catch(() => null)

	return error?.message || fallback
}

export const getDeals = async (): Promise<Deal[]> => {
	const res = await apiFetch("/deals")

	if (!res) {
		return []
	}

	if (!res.ok) {
		throw new Error(await readErrorMessage(res, "Failed to fetch deals"))
	}

	return res.json()
}

export const getDealsForLead = async (leadId: string): Promise<Deal[]> => {
	const res = await apiFetch(`/leads/${leadId}/deals`)

	if (!res) {
		return []
	}

	if (!res.ok) {
		throw new Error(await readErrorMessage(res, "Failed to fetch linked deals"))
	}

	return res.json()
}

export const getDeal = async (id: string): Promise<Deal> => {
	const res = await apiFetch(`/deals/${id}`)

	if (!res) {
		throw new Error("Failed to fetch deal")
	}

	if (!res.ok) {
		throw new Error(await readErrorMessage(res, "Failed to fetch deal"))
	}

	return res.json()
}

export const createDeal = async (input: DealInput): Promise<Deal> => {
	const res = await apiFetch("/deals", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	})

	if (!res) {
		throw new Error("Failed to create deal")
	}

	if (!res.ok) {
		throw new Error(await readErrorMessage(res, "Failed to create deal"))
	}

	return res.json()
}

export const updateDeal = async (id: string, input: UpdateDealInput): Promise<Deal> => {
	const res = await apiFetch(`/deals/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	})

	if (!res) {
		throw new Error("Failed to update deal")
	}

	if (!res.ok) {
		throw new Error(await readErrorMessage(res, "Failed to update deal"))
	}

	return res.json()
}

export const deleteDeal = async (id: string): Promise<void> => {
	const res = await apiFetch(`/deals/${id}`, {
		method: "DELETE",
	})

	if (!res) {
		return
	}

	if (!res.ok) {
		throw new Error(await readErrorMessage(res, "Failed to delete deal"))
	}
}
