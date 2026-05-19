/*
 * User editing form schema.
 * Limits frontend updates to role and status changes.
 */

import { z } from "zod"

export const editUserSchema = z.object({
  role: z.enum(["admin", "salesAgent", "viewer"]),
  status: z.enum(["active", "disabled"])
})

export type EditUserFormValues = z.infer<typeof editUserSchema>
