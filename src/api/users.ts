import { apiFetch } from "./api"
import type { User } from "@/domain/user"

export type CreateUserInput = {
  email: string
  password: string
  role: User["role"]
  status: User["status"]
}

export type UpdateUserInput = {
  role: User["role"]
  status: User["status"]
}

export const getUsers = async (): Promise<User[]> => {
  const res = await apiFetch("/users")

  if (!res) {
    return []
  }

  return res.json()
}

export const updateUser = async (
  id: string,
  input: UpdateUserInput
): Promise<User> => {
  const res = await apiFetch(`/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  })

  if (!res) {
    throw new Error("Failed to update user")
  }

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to update user")
  }

  return res.json()
}

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const res = await apiFetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  })

  if (!res) {
    throw new Error("Failed to create user")
  }

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to create user")
  }

  return res.json()
}
