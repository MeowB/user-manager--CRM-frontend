/*
 * Lead creation form schema.
 * Validates browser form data and normalizes empty company values to null.
 */

import { z } from "zod"

export const createLeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  company: z
    .string()
    .trim()
    .transform((value) => value || null),
})

export type CreateLeadFormValues = z.infer<typeof createLeadSchema>
