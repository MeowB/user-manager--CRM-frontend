import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import type React from "react"
import { API_URL } from "@/api/api"
import { useState } from "react"
import { toast } from "sonner"


const LoginForm = () => {
	const navigate = useNavigate()
	const [loginError, setLoginError] = useState<string | null>(null)
	const demoAccounts = [
		{ label: "Admin", email: "admin@demo.account", password: "CrmDemo!2026" },
		{ label: "Sales Agent", email: "sales@demo.account", password: "CrmDemo!2026" },
		{ label: "Viewer", email: "viewer@demo.account", password: "CrmDemo!2026" },
	]

	const fillDemoAccount = (email: string, password: string) => {
		const emailInput = document.getElementById("email") as HTMLInputElement | null
		const passwordInput = document.getElementById("password") as HTMLInputElement | null

		if (!emailInput || !passwordInput) return

		emailInput.value = email
		passwordInput.value = password
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoginError(null)

		const form = e.currentTarget

		const email = (form.elements.namedItem("email") as HTMLInputElement).value
		const password = (form.elements.namedItem("password") as HTMLInputElement).value

		const res = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password })
		})

		if (!res.ok) {
			setLoginError("Invalid credentials")
			toast.error("Invalid credentials")
			return
		}

		const data = await res.json()
		localStorage.setItem("token", data.token)

		if (data.token) {
			navigate({ to: "/dashboard" })
		}
	}

	return (
		<div className="w-full max-w-xs">
			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<FieldGroup>
					<Field>
						<label className="block text-gray-700 text-sm font-bold" htmlFor="username">
							Username
						</label>
						<Input
							name="email"
							id="email"
							type="text"
							placeholder="Email"
							className="w-full"
						/>
					</Field>

					<Field>
						<label className="block text-gray-700 text-sm font-bold" htmlFor="password">
							Password
						</label>
						<Input
							name="password"
							id="password"
							type="password"
							placeholder="******************"
							className="w-full"
						/>
					</Field>
				</FieldGroup>

				<div className="flex items-center justify-between mt-4 gap-4">
					<Button type="submit" size={"sm"} className="cursor-pointer">
						Sign In
					</Button>
					<Link
						to="#"
						className="inline-block align-baseline font-bold text-[12px] text-blue-500 hover:text-blue-800"
					>
						Forgot Password?
					</Link>
				</div>
				{loginError && (
					<p className="mt-4 text-sm text-destructive">
						{loginError}
					</p>
				)}
				<div className="relative mt-5">
					<div className="absolute inset-0 flex items-center" aria-hidden="true">
						<div className="w-full border-t border-gray-200" />
					</div>
					<div className="relative flex justify-center">
						<span className="bg-white px-2 text-[11px] font-medium text-gray-500">
							Demo accounts
						</span>
					</div>
				</div>
				<div className="mt-4 grid grid-cols-3 gap-2">
					{demoAccounts.map((account) => (
						<Button
							key={account.email}
							type="button"
							size="sm"
							variant="outline"
							onClick={() => fillDemoAccount(account.email, account.password)}
						>
							{account.label}
						</Button>
					))}
				</div>
				<p className="text-gray-500 text-xs mt-4">
					Demo CRM — Leads management
				</p>
			</form>
		</div>
	)
}

export default LoginForm
