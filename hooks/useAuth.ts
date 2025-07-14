"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError("אימייל או סיסמה שגויים");
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("האימייל הזה כבר נמצא בשימוש.");
      } else {
        setError("אירעה שגיאה במהלך ההרשמה.");
      }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("קישור לאיפוס סיסמה נשלח לאימייל שלך.");
    } catch (err: any) {
      setError("שגיאה בשליחת אימייל לאיפוס סיסמה.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push('/');
  }

  return { signIn, signUp, resetPassword, signOut, loading, error }
}