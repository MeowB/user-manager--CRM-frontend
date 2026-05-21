/*
 * Leads API client.
 * Keeps lead request/response handling out of UI components.
 */

import { apiFetch } from "@/api/api"
import type { Lead } from "@/domain/lead"

export type LeadInput = {
	name: string
	email: string
	company: string | null
}

export const getLeads = async (): Promise<Lead[]> => {
	const res = await apiFetch("/leads")
	if (!res) {
		return []
	}

	return res.json()
}

export const getLead = async (id: string): Promise<Lead> => {
	const res = await apiFetch(`/leads/${id}`)

	if (!res) {
		throw new Error("Failed to fetch lead")
	}

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.message || "Failed to fetch lead")
	}

	return res.json()
}

export const createLead = async (input: LeadInput): Promise<Lead> => {
	const res = await apiFetch("/leads", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(input),
	})

	if (!res) {
		throw new Error("Failed to create lead")
	}

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.message || "Failed to create lead")
	}

	return res.json()
}

export const updateLead = async (id: string, input: LeadInput): Promise<Lead> => {
	const res = await apiFetch(`/leads/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(input),
	})

	if (!res) {
		throw new Error("Failed to update lead")
	}

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.message || "Failed to update lead")
	}

	return res.json()
}

export const deleteLead = async (id: string): Promise<void> => {
	const res = await apiFetch(`/leads/${id}`, {
		method: "DELETE"
	})

	if (!res) {
		return
	}

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.message || "Failed to delete lead")
	}
}
