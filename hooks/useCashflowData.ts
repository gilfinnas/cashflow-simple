"use client"

import { useState, useEffect } from "react"

// Mock data hook - replace with actual Firebase Firestore implementation
export function useCashflowData(user: any) {
  const [cashflowData, setCashflowData] = useState<any>(null)
  const [userCategories, setUserCategories] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [subscriptionExpired, setSubscriptionExpired] = useState(false)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    // Simulate data loading
    const timer = setTimeout(() => {
      // Mock data structure
      setCashflowData({
        clientName: "לקוח לדוגמה",
        openingBalance: 10000,
        bankLimit: 50000,
        years: {},
        settings: { autoSave: false, autoAlerts: true },
        subscriptionEndDate: { toDate: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
        subscriptionType: "trial",
        vatSettings: {
          businessType: "company",
          frequency: "monthly",
          paymentDay: 15,
          hasExemptIncome: false,
        },
      })

      // Mock categories
      setUserCategories({
        הכנסות: {
          color: "bg-green-100",
          hex: "#c6f6d5",
          items: {
            sales_cash: { name: "מכירות (מזומן/אפליקציה)", type: "income", fixed: true },
            sales_credit: { name: "מכירות (אשראי)", type: "income", fixed: true },
          },
        },
        ספקים: {
          color: "bg-orange-100",
          hex: "#FEEBC8",
          items: {
            supplier_1: { name: "", type: "expense", placeholder: "ספק 1" },
            supplier_2: { name: "", type: "expense", placeholder: "ספק 2" },
          },
        },
      })

      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [user])

  return { cashflowData, userCategories, loading, subscriptionExpired }
}
