/*
 * Lead editing form schema.
 * Reuses the create contract because the edit modal submits the full editable lead form.
 */

import { z } from "zod"
import { createLeadSchema } from "./createLead.schema"

export const editLeadSchema = createLeadSchema

export type EditLeadFormValues = z.infer<typeof editLeadSchema>
