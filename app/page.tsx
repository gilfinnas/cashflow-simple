"use client"

import { useState } from "react"
import { AppContainer } from "@/components/app/AppContainer"
import { VATSetupModal } from "@/components/modals/VATSetupModal"
import { SettingsModal } from "@/components/modals/SettingsModal"
import { CategoryEditorModal } from "@/components/modals/CategoryEditorModal"
import { CustomAlertModal } from "@/components/modals/CustomAlertModal"
import { CustomConfirmModal } from "@/components/modals/CustomConfirmModal"
import { AIAssistant } from "@/components/ai/AIAssistant"
import { SupportButton } from "@/components/ui/SupportButton"
import { SubscriptionBanner } from "@/components/ui/SubscriptionBanner"
import { ScrollNavigation } from "@/components/ui/ScrollNavigation"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  // השורות הבאות מנוטרלות זמנית כדי להציג את האפליקציה הראשית ישירות
  // const { user, loading: authLoading } = useFirebaseAuth()
  // const { cashflowData, userCategories, loading: dataLoading, subscriptionExpired } = useCashflowData(user)

  // נתוני דמה קבועים לצורך הצגה מיידית של האפליקציה
  const mockCashflowData = {
    clientName: "לקוח לדוגמה",
    openingBalance: 10000,
    bankLimit: 50000,
    years: {
      [new Date().getFullYear()]: {
        [new Date().getMonth()]: {
          categories: {
            sales_cash: Array(31)
              .fill(0)
              .map((_, i) => (i % 5 === 0 ? 1500 : 0)),
            sales_credit: Array(31)
              .fill(0)
              .map((_, i) => (i % 7 === 0 ? 2000 : 0)),
            supplier_1: Array(31)
              .fill(0)
              .map((_, i) => (i % 3 === 0 ? 500 : 0)),
            supplier_2: Array(31)
              .fill(0)
              .map((_, i) => (i % 4 === 0 ? 300 : 0)),
          },
          customNames: {
            supplier_1: "שכר דירה",
            supplier_2: "חשבון חשמל",
          },
        },
      },
    },
    settings: { autoSave: false, autoAlerts: true },
    subscriptionEndDate: { toDate: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    subscriptionType: "trial",
    vatSettings: {
      businessType: "company",
      frequency: "monthly",
      paymentDay: 15,
      hasExemptIncome: false,
    },
  }

  const mockUserCategories = {
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
    הלוואות: {
      color: "bg-blue-100",
      hex: "#BEE3F8",
      items: {
        loan_repayment: { name: "החזר הלוואה", type: "expense", fixed: true },
      },
    },
    "הוצאות משתנות": {
      color: "bg-red-100",
      hex: "#FED7D7",
      items: {
        marketing: { name: "שיווק ופרסום", type: "expense", fixed: false },
      },
    },
    "הוצאות קבועות": {
      color: "bg-purple-100",
      hex: "#E9D8FD",
      items: {
        rent: { name: "שכר דירה", type: "expense", fixed: true },
      },
    },
    מיסים: {
      color: "bg-blue-100",
      hex: "#C3DAFE",
      items: {
        vat_payment: { name: "תשלום מע''מ", type: "expense_calculated", fixed: true },
      },
    },
    "הוצאות בלתי צפויות": {
      color: "bg-gray-100",
      hex: "#E2E8F0",
      items: {
        unexpected: { name: "הוצאה בלתי צפויה", type: "expense", fixed: false },
      },
    },
  }

  const [showVATSetup, setShowVATSetup] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showCategoryEditor, setShowCategoryEditor] = useState(false)

  // כרגע אין טעינה או בדיקת משתמש/מנוי, האפליקציה מוצגת ישירות
  // const loading = authLoading || dataLoading
  // if (loading) { return <Loader /> }
  // if (!user) { return <AuthContainer /> }
  // if (subscriptionExpired) { return <SubscriptionModal /> }

  return (
    <>
      <SubscriptionBanner userData={mockCashflowData} />
      <ScrollNavigation />
      <SupportButton />
      <AIAssistant />
      <AppContainer
        cashflowData={mockCashflowData}
        userCategories={mockUserCategories}
        onShowSettings={() => setShowSettings(true)}
        onShowVATSetup={() => setShowVATSetup(true)}
      />
      {showVATSetup && (
        <VATSetupModal onClose={() => setShowVATSetup(false)} currentSettings={mockCashflowData?.vatSettings} />
      )}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onShowCategoryEditor={() => setShowCategoryEditor(true)}
          onShowVATSetup={() => setShowVATSetup(true)}
          userData={mockCashflowData}
        />
      )}
      {showCategoryEditor && (
        <CategoryEditorModal onClose={() => setShowCategoryEditor(false)} userCategories={mockUserCategories} />
      )}
      <CustomAlertModal />
      <CustomConfirmModal />
      <Toaster />
    </>
  )
}
