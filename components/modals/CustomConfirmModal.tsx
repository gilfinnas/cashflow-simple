"use client"

import { useState, useEffect } from "react"

let showConfirmFunction: ((message: string) => Promise<boolean>) | null = null

export function showCustomConfirm(message: string): Promise<boolean> {
  if (showConfirmFunction) {
    return showConfirmFunction(message)
  }
  return Promise.resolve(false)
}

export function CustomConfirmModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null)

  useEffect(() => {
    showConfirmFunction = (msg: string) => {
      return new Promise<boolean>((resolve) => {
        setMessage(msg)
        setIsVisible(true)
        setResolvePromise(() => resolve)
      })
    }

    return () => {
      showConfirmFunction = null
    }
  }, [])

  const handleConfirm = () => {
    setIsVisible(false)
    if (resolvePromise) {
      resolvePromise(true)
      setResolvePromise(null)
    }
  }

  const handleCancel = () => {
    setIsVisible(false)
    if (resolvePromise) {
      resolvePromise(false)
      setResolvePromise(null)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-right">
        <h3 className="text-lg font-bold mb-4">אישור פעולה</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-start gap-3">
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            ביטול
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            אישור
          </button>
        </div>
      </div>
    </div>
  )
}
