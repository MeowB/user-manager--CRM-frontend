import { apiFetch } from "@/api/api"
import type { Lead } from "@/domain/lead"

export type LeadInput = {
  name: FormDataEntryValue
  email: FormDataEntryValue
  company: FormDataEntryValue
}

export const getLeads = async ():Promise<Lead[]> => {
  const res = await apiFetch("/leads")

  return res.json()
}

export const createLead = (input: LeadInput) => {
  return apiFetch("/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input),
  })
}

export const updateLead = (id: string, input: LeadInput) => {
  return apiFetch(`/leads/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input),
  })
}

export const deleteLead = (id:string) => {
  return apiFetch(`/leads/${id}`, {
    method: "DELETE"
  })
}
