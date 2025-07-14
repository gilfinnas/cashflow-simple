"use client"

import { useState } from "react"
import { ChatWidget } from "./ChatWidget"

export function AIAssistant() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-5 left-5 w-15 h-15 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full border-none flex items-center justify-center cursor-pointer shadow-lg z-50 hover:scale-110 transition-transform"
        title="עזרה מ-AI"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
      </button>

      <ChatWidget isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </>
  )
}
