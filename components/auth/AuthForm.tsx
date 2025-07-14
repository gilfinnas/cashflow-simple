"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

type AuthMode = "login" | "signup" | "resetPassword"

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { signIn, signUp, resetPassword, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "login") {
      await signIn(email, password)
    } else if (mode === "signup") {
      if (!termsAccepted) {
        alert("יש לאשר את תנאי השימוש ומדיניות הפרטיות.")
        return
      }
      await signUp(email, password)
    } else if (mode === "resetPassword") {
      await resetPassword(email)
      setMode("login")
    }
  }

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "התחברות"
      case "signup":
        return "הרשמה"
      case "resetPassword":
        return "איפוס סיסמה"
    }
  }

  const getSubmitText = () => {
    switch (mode) {
      case "login":
        return "התחבר"
      case "signup":
        return "הירשם"
      case "resetPassword":
        return "שלח קישור לאיפוס"
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">{getTitle()}</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          placeholder="אימייל"
          required
        />

        {mode !== "resetPassword" && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4"
            placeholder="סיסמה"
            required
          />
        )}

        {mode === "signup" && (
          <div className="mt-4">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="ml-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">
                קראתי ואני מסכים ל
                <a href="#" target="_blank" className="text-blue-600 hover:underline mx-1" rel="noreferrer">
                  תנאי השימוש
                </a>
                ול
                <a href="#" target="_blank" className="text-blue-600 hover:underline mx-1" rel="noreferrer">
                  מדיניות הפרטיות
                </a>
                .
              </span>
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (mode === "signup" && !termsAccepted)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "טוען..." : getSubmitText()}
        </button>
      </form>

      <div className="text-center mt-4 text-sm flex justify-between">
        <button
          onClick={() => setMode(mode === "resetPassword" ? "login" : "resetPassword")}
          className="text-gray-600 hover:underline"
        >
          {mode === "resetPassword" ? "חזור להתחברות" : "שכחת סיסמה?"}
        </button>

        {mode !== "resetPassword" && (
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-blue-600 hover:underline"
          >
            {mode === "login" ? "אין לך חשבון? הירשם כאן" : "יש לך חשבון? התחבר כאן"}
          </button>
        )}
      </div>
    </>
  )
}
