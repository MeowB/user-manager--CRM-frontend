/*
 * Lead creation form schema.
 * Validates browser form data and normalizes empty company values to null.
 */

import { z } from "zod"

export const createLeadSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),
	email: z.email("Enter a valid email").trim(),
	company: z
		.string()
		.trim()
		.transform((value) => value || null),
	status: z.enum(["new", "contacted", "qualified", "unqualified", "converted"]),
	priority: z.enum(["low", "medium", "high"]),
	budget: z.preprocess((value) => {
		if (value === "" || value === null || value === undefined) {
			return null
		}

		const parsed = Number(value)

		if (Number.isNaN(parsed)) {
			return value
		}

		return Math.round(parsed * 100)
	}, z.number().int().nonnegative("Budget must be 0 or more").nullable()),
})

export type CreateLeadFormValues = z.infer<typeof createLeadSchema>
