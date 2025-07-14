"use client"

import { useState, useEffect } from "react"

export function SupportButton() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      setIsVisible(false)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <a
      href="mailto:support@gilfinnas.com?subject=בעיה באפליקציית תזרים מזומנים&body=שלום, נתקלתי בבעיה הבאה:"
      className={`fixed bottom-5 right-5 bg-red-500 text-white px-5 py-3 rounded-full shadow-lg z-50 text-decoration-none font-semibold transition-all duration-300 hover:bg-red-600 no-print ${
        isVisible ? "opacity-90" : "opacity-0 pointer-events-none"
      }`}
    >
      🆘 נתקלתם בבעיה? דברו איתנו
    </a>
  )
}
