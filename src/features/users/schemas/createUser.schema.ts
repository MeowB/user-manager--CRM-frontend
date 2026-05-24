/*
 * User creation form schema.
 * Defines valid role/status values and required credentials for new users.
 */

import { z } from "zod"

export const createUserSchema = z.object({
	fullName: z.string().trim().min(1, "Full name is required"),
	email: z.email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
	role: z.enum(["admin", "salesAgent", "viewer"]),
	status: z.enum(["active", "disabled"])
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>
