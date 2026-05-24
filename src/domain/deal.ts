/*
 * Frontend Deal domain contract.
 * Mirrors the fields returned by the backend Deal API.
 */

export type DealStage =
	| "discovery"
	| "proposal"
	| "negotiation"
	| "closedWon"
	| "closedLost"

export type DealLead = {
	id: string
	name: string
	email: string
	ownerId: string | null
	owner: {
		id: string
		fullName: string
		email: string
		role: "admin" | "salesAgent" | "viewer"
	} | null
}

export type Deal = {
	id: string
	leadId: string
	lead: DealLead
	title: string
	amount: number | null
	stage: DealStage
	createdAt: string
	updatedAt: string
}
