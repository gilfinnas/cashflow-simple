"use client"

import { useState } from "react"

interface SettingsModalProps {
  onClose: () => void
  onShowCategoryEditor: () => void
  onShowVATSetup: () => void
  userData: any
}

export function SettingsModal({ onClose, onShowCategoryEditor, onShowVATSetup, userData }: SettingsModalProps) {
  const [autoSave, setAutoSave] = useState(userData?.settings?.autoSave || false)
  const [autoAlerts, setAutoAlerts] = useState(userData?.settings?.autoAlerts ?? true)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      alert("הסיסמה חייבת להכיל לפחות 6 תווים.")
      return
    }
    if (newPassword !== confirmPassword) {
      alert("הסיסמאות אינן תואמות.")
      return
    }

    // Implement password change
    console.log("Changing password...")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold">הגדרות</h3>

        {/* Auto Save Toggle */}
        <div className="mt-4 border-b pb-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="sr-only"
              />
              <div className={`block w-14 h-8 rounded-full ${autoSave ? "bg-green-500" : "bg-gray-600"}`}></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${autoSave ? "transform translate-x-full" : ""}`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">שמירת נתונים אוטומטית</div>
          </label>
          <p className="text-xs text-gray-500 mt-1 mr-4">השינויים יישמרו אוטומטית 2 שניות לאחר ההקלדה.</p>
        </div>

        {/* Auto Alerts Toggle */}
        <div className="mt-4 border-b pb-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={autoAlerts}
                onChange={(e) => setAutoAlerts(e.target.checked)}
                className="sr-only"
              />
              <div className={`block w-14 h-8 rounded-full ${autoAlerts ? "bg-green-500" : "bg-gray-600"}`}></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${autoAlerts ? "transform translate-x-full" : ""}`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">התראות תזרים אוטומטיות</div>
          </label>
          <p className="text-xs text-gray-500 mt-1 mr-4">הצג סימן אזהרה בימים עם חריגה צפויה.</p>
        </div>

        {/* Change Password */}
        <div className="mt-4 border-b pb-4">
          <p className="text-sm font-semibold mb-2">שינוי סיסמה</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="סיסמה חדשה"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-2 px-3 py-2 border rounded"
            placeholder="אשר סיסמה חדשה"
          />
          <button onClick={handleChangePassword} className="w-full mt-2 bg-blue-500 text-white py-2 rounded">
            שנה סיסמה
          </button>
        </div>

        {/* VAT Settings */}
        <div className="mt-4 border-b pb-4">
          <p className="text-sm font-semibold mb-2">הגדרות מע"מ</p>
          <button
            onClick={() => {
              onClose()
              onShowVATSetup()
            }}
            className="w-full bg-yellow-500 text-white py-2 rounded"
          >
            ערוך הגדרות מע"מ
          </button>
        </div>

        {/* Category Management */}
        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-semibold mb-2">ניהול קטגוריות</h4>
          <button
            onClick={() => {
              onClose()
              onShowCategoryEditor()
            }}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            ערוך קטגוריות
          </button>
        </div>

        <div className="mt-4 text-center">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            סגור
          </button>
        </div>
      </div>
    </div>
  )
}
