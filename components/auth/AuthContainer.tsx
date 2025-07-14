"use client"
import { AuthForm } from "./AuthForm"

export function AuthContainer() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  )
}
