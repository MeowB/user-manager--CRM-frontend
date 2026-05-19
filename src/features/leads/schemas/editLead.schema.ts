import { z } from "zod"
import { createLeadSchema } from "./createLead.schema"

export const editLeadSchema = createLeadSchema

export type EditLeadFormValues = z.infer<typeof editLeadSchema>
