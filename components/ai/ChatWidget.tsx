"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface ChatWidgetProps {
  isVisible: boolean
  onClose: () => void
}

interface Message {
  text: string
  sender: "user" | "assistant"
}

export function ChatWidget({ isVisible, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "שלום! אני העוזר הדיגיטלי שלך. איך אפשר לעזור היום?", sender: "assistant" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }])
    setIsLoading(true)

    try {
      // Add typing indicator
      setMessages((prev) => [...prev, { text: "...", sender: "assistant" }])

      // Simulate AI response (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const aiResponse = "תודה על השאלה! זוהי תשובה לדוגמה. במערכת האמיתית, כאן יהיה מחובר ה-AI של גוגל."

      setMessages((prev) => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = { text: aiResponse, sender: "assistant" }
        return newMessages
      })
    } catch (error) {
      setMessages((prev) => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = {
          text: "מצטער, נתקלתי בשגיאה. אנא נסה שוב מאוחר יותר.",
          sender: "assistant",
        }
        return newMessages
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-20 left-5 w-80 max-w-[90vw] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-xl z-40 flex flex-col overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">עוזר AI</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
              message.sender === "user"
                ? "bg-blue-100 text-indigo-800 self-start rounded-bl-sm"
                : "bg-gray-100 text-gray-800 self-end rounded-br-sm ml-auto"
            }`}
          >
            {message.text === "..." ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            ) : (
              message.text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="שאל אותי משהו..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
