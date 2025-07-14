"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "שגיאה בהתחברות")
      }

      // אם ההתחברות הצליחה, נעביר את המשתמש לדף הראשי
      router.push('/dashboard') // שנה את '/dashboard' לדף שאליו אתה רוצה להעביר אחרי התחברות

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "שגיאה בהרשמה");
      }
      
      // אחרי הרשמה מוצלחת, אפשר להתחבר או להעביר לדף אחר
      await signIn(email, password);

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // השארתי את הפונקציות האחרות כסימולציה, תוכל לממש אותן באותו אופן
  const resetPassword = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("קישור לאיפוס סיסמה נשלח לאימייל שלך (סימולציה).")
      console.log("Resetting password for:", email)
    } catch (err) {
      setError("שגיאה באיפוס סיסמה")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    console.log("Signing out...")
    router.push('/') // העברה לדף הבית ביציאה
  }

  return { signIn, signUp, resetPassword, signOut, loading, error }
}
