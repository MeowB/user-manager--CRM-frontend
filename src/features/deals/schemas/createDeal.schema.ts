/*
 * Deal creation form schema.
 * Validates browser form data and stores entered currency as integer cents.
 */

import { z } from "zod"

export const dealStageSchema = z.enum([
	"discovery",
	"proposal",
	"negotiation",
	"closedWon",
	"closedLost",
])

export const dealAmountSchema = z.preprocess((value) => {
	if (value === "" || value === null || value === undefined) {
		return null
	}

	const parsed = Number(value)

	if (Number.isNaN(parsed)) {
		return value
	}

	return Math.round(parsed * 100)
}, z.number().int().nonnegative("Amount must be 0 or more").nullable())

export const createDealSchema = z.object({
	leadId: z.string().min(1, "Lead is required"),
	title: z.string().trim().min(1, "Title is required"),
	amount: dealAmountSchema,
	stage: dealStageSchema,
})

export type CreateDealFormValues = z.infer<typeof createDealSchema>
