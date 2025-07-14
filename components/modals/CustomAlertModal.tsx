"use client"

import { useState, useEffect } from "react"

let showAlertFunction: ((message: string) => void) | null = null

export function showCustomAlert(message: string) {
  if (showAlertFunction) {
    showAlertFunction(message)
  }
}

export function CustomAlertModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    showAlertFunction = (msg: string) => {
      setMessage(msg)
      setIsVisible(true)
    }

    return () => {
      showAlertFunction = null
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-right">
        <h3 className="text-lg font-bold mb-4">הודעה</h3>
        <div className="mb-6 text-gray-700" dangerouslySetInnerHTML={{ __html: message }} />
        <div className="flex justify-start">
          <button onClick={handleClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            אישור
          </button>
        </div>
      </div>
    </div>
  )
}
