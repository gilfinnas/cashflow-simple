"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // ייבוא מהקובץ שיצרנו

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // העברה לדאשבורד אחרי התחברות
    } catch (err: any) {
      setError("אימייל או סיסמה שגויים");
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // העברה לדאשבורד אחרי הרשמה
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("האימייל הזה כבר נמצא בשימוש.");
      } else {
        setError("אירעה שגיאה במהלך ההרשמה.");
      }
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      await sendPasswordResetEmail(auth, email);
      alert("קישור לאיפוס סיסמה נשלח לאימייל שלך.");
    } catch (err: any) {
      setError("שגיאה בשליחת אימייל לאיפוס סיסמה.");
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/'); // חזרה לדף הבית אחרי יציאה
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  }

  return { signIn, signUp, resetPassword, signOut, loading, error }
}

