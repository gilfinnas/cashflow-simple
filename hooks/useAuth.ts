"use client"

import { useState } from "react"

// Mock auth hook - replace with actual Firebase auth implementation
export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Signing in:", email)
    } catch (err) {
      setError("שגיאה בהתחברות")
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Signing up:", email)
    } catch (err) {
      setError("שגיאה בהרשמה")
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Resetting password for:", email)
    } catch (err) {
      setError("שגיאה באיפוס סיסמה")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    console.log("Signing out...")
  }

  return { signIn, signUp, resetPassword, signOut, loading, error }
}
