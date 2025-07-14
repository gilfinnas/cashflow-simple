"use client"

import { useState } from "react"

interface VATSetupModalProps {
  onClose: () => void
  currentSettings?: any
}

export function VATSetupModal({ onClose, currentSettings }: VATSetupModalProps) {
  const [businessType, setBusinessType] = useState(currentSettings?.businessType || "company")
  const [frequency, setFrequency] = useState(currentSettings?.frequency || "monthly")
  const [paymentDay, setPaymentDay] = useState(currentSettings?.paymentDay || 15)
  const [hasExemptIncome, setHasExemptIncome] = useState(currentSettings?.hasExemptIncome || false)

  const handleSave = () => {
    // Implement save VAT settings
    console.log("Saving VAT settings:", { businessType, frequency, paymentDay, hasExemptIncome })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">הגדרת מע"מ ועסק</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">סוג העסק:</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="company">חברה בע"מ</option>
              <option value="authorized">עוסק מורשה</option>
              <option value="exempt">עוסק פטור</option>
            </select>
          </div>

          {businessType !== "exempt" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">תדירות דיווח מע"מ:</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="monthly">חד חודשי</option>
                  <option value="bimonthly">דו חודשי</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">באיזה יום בחודש אתה משלם מע"מ?</label>
                <input
                  type="number"
                  value={paymentDay}
                  onChange={(e) => setPaymentDay(Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="1"
                  max="31"
                  placeholder="15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">האם בעסק שלך יש הכנסות פטורות ממע"מ?</label>
                <select
                  value={hasExemptIncome ? "yes" : "no"}
                  onChange={(e) => setHasExemptIncome(e.target.value === "yes")}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="no">לא</option>
                  <option value="yes">כן</option>
                </select>
              </div>
            </>
          )}

          <button onClick={handleSave} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            שמור הגדרות
          </button>
        </div>
      </div>
    </div>
  )
}
