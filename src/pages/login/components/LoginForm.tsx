import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import type React from "react"
import { API_URL } from "@/api/api"


const LoginForm = () => {
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log('submit')
		e.preventDefault()

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
			console.log(res)
			alert("Invalid credentials")
		}

		const data = await res.json()
		localStorage.setItem("token", data.token)

		if (data.token) {
			navigate({ to: "/leads" })
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
				<Button
					type="button"
					size="sm"
					onClick={() => {
						(document.getElementById("email") as HTMLInputElement).value = "admin@test.com",
						(document.getElementById("password") as HTMLInputElement).value = "password123"
					}}
					className="w-full mt-4"
				>
					Use demo account
				</Button>
				<p className="text-gray-500 text-xs mt-4">
					Demo CRM — Leads management
				</p>
			</form>
		</div>
	)
}

export default LoginForm
