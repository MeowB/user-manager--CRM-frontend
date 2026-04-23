import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import type React from "react"


const LoginForm = () => {
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log('submit')
		e.preventDefault()

		localStorage.setItem("isLoggedIn", "true")

		navigate({ to: "/leads" })
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
							name="username"
							id="username"
							type="text"
							placeholder="Username"
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
				<p className="text-gray-500 text-xs mt-4">
					Demo CRM — Leads management
				</p>
			</form>
		</div>
	)
}

export default LoginForm
