import type React from "react"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "תזרים מזומנים",
  description: "מערכת לניהול תזרים מזומנים יומי",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${rubik.className} bg-gray-100 text-gray-800`}>{children}</body>
    </html>
  )
}
