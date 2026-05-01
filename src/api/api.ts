export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token")

  const headers = new Headers(options.headers)

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if(response.status === 401) {
    localStorage.removeItem("token")

    window.location.href = "/login"
  }

  if(response.status === 204) {
    return null
  }

  return response
}
