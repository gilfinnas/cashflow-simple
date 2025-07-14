"use client"

import { useState, useEffect } from "react"

// Mock Firebase auth hook - replace with actual Firebase implementation
export function useFirebaseAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate Firebase auth state change
    const timer = setTimeout(() => {
      // For demo purposes, set a mock user
      setUser({ uid: "demo-user", email: "demo@example.com" })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { user, loading }
}
