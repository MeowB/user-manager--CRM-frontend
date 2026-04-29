export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token")

  const headers = new Headers(options.headers)

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })
}
