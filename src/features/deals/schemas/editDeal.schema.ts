/*
 * Deal editing form schema.
 * Reuses the editable deal fields without allowing the linked lead to change.
 */

import { z } from "zod"
import { dealAmountSchema, dealStageSchema } from "./createDeal.schema"

export const editDealSchema = z.object({
	title: z.string().trim().min(1, "Title is required"),
	amount: dealAmountSchema,
	stage: dealStageSchema,
})

export type EditDealFormValues = z.infer<typeof editDealSchema>
