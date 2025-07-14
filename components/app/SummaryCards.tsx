"use client"

import { useMemo } from "react"

interface SummaryCardsProps {
  cashflowData: any
  userCategories: any
  currentYear: number
  currentMonthIndex: number
}

export function SummaryCards({ cashflowData, userCategories, currentYear, currentMonthIndex }: SummaryCardsProps) {
  const summaryData = useMemo(() => {
    if (!cashflowData?.years?.[currentYear]?.[currentMonthIndex] || !userCategories) {
      return {
        totalIncome: 0,
        totalExpense: 0,
        monthlyBalance: 0,
        employeeWages: 0,
        ownerWages: 0,
        totalWages: 0,
        totalLoans: 0,
        paidLoans: 0,
        remainingLoans: 0,
      }
    }

    const monthData = cashflowData.years[currentYear][currentMonthIndex].categories
    const businessType = cashflowData.vatSettings?.businessType
    const today = new Date()
    const currentDayIndex =
      today.getFullYear() === currentYear && today.getMonth() === currentMonthIndex ? today.getDate() - 1 : -1

    let totalIncome = 0
    let totalExpense = 0
    let employeeWages = 0
    let ownerWages = 0
    let totalLoans = 0
    let paidLoans = 0

    Object.values(userCategories).forEach((group: any) => {
      Object.entries(group.items).forEach(([catKey, catDetails]: [string, any]) => {
        if (catDetails.businessTypes && !catDetails.businessTypes.includes(businessType)) {
          return
        }

        const dailyValues = monthData[catKey] || []
        const monthlySum = dailyValues.reduce((acc: number, val: any) => acc + (Number.parseFloat(val) || 0), 0)

        if (catDetails.type === "income" || catDetails.type === "exempt_income") {
          totalIncome += monthlySum
        } else if (
          catDetails.type.startsWith("expense") ||
          catDetails.type === "employee_cost" ||
          catDetails.type.startsWith("partial_vat_expense")
        ) {
          totalExpense += monthlySum
        }

        if (catKey === "salaries") {
          employeeWages += monthlySum
        }
        if (catKey === "controlling_salary" || catKey === "owner_withdrawal" || catKey === "dividend_withdrawal") {
          ownerWages += monthlySum
        }

        if (group.hex === "#BEE3F8") {
          // Loans group
          totalLoans += monthlySum
          if (currentDayIndex !== -1) {
            for (let day = 0; day <= currentDayIndex; day++) {
              paidLoans += Number.parseFloat(dailyValues[day] || 0)
            }
          } else {
            paidLoans += monthlySum
          }
        }
      })
    })

    if (monthData["vat_payment"]) {
      totalExpense += monthData["vat_payment"].reduce((a: number, b: any) => a + (Number.parseFloat(b) || 0), 0)
    }

    return {
      totalIncome,
      totalExpense,
      monthlyBalance: totalIncome - totalExpense,
      employeeWages,
      ownerWages,
      totalWages: employeeWages + ownerWages,
      totalLoans,
      paidLoans,
      remainingLoans: totalLoans - paidLoans,
    }
  }, [cashflowData, userCategories, currentYear, currentMonthIndex])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const businessType = cashflowData?.vatSettings?.businessType
  const ownerCostLabel = businessType === "company" ? "שכר בעלי שליטה (חודשי)" : "משיכת בעלים (חודשי)"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 no-print">
      {/* Card 1: Monthly Balance */}
      <div className="summary-card flex flex-col justify-between p-0 overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500">הכנסות (חודשי)</h4>
          <p className="text-2xl lg:text-3xl font-bold text-green-600">{formatCurrency(summaryData.totalIncome)}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500">הוצאות (חודשי)</h4>
          <p className="text-2xl lg:text-3xl font-bold text-red-600">{formatCurrency(summaryData.totalExpense)}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3">
          <h4 className="text-sm font-semibold text-gray-500">מאזן (חודשי)</h4>
          <p
            className={`text-2xl lg:text-3xl font-bold ${summaryData.monthlyBalance >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {formatCurrency(summaryData.monthlyBalance)}
          </p>
        </div>
      </div>

      {/* Card 2: Salaries */}
      <div className="summary-card flex flex-col justify-between p-0 overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500">עלות שכר עבודה (חודשי)</h4>
          <p className="text-2xl lg:text-3xl font-bold text-red-600">{formatCurrency(summaryData.employeeWages)}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500">{ownerCostLabel}</h4>
          <p className="text-2xl lg:text-3xl font-bold text-red-600">{formatCurrency(summaryData.ownerWages)}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3">
          <h4 className="text-sm font-semibold text-gray-500">עלות משכורות כוללת</h4>
          <p className="text-2xl lg:text-3xl font-bold text-red-600">{formatCurrency(summaryData.totalWages)}</p>
        </div>
      </div>

      {/* Card 3: Loans */}
      <div className="summary-card flex flex-col justify-between p-0 overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500">עלות הלוואות (חודשי)</h4>
          <p className="text-2xl lg:text-3xl font-bold text-red-600">{formatCurrency(summaryData.totalLoans)}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500">הלוואות ששולמו</h4>
          <p className="text-2xl lg:text-3xl font-bold text-green-600">{formatCurrency(summaryData.paidLoans)}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center p-3">
          <h4 className="text-sm font-semibold text-gray-500">נותר לשלם (עד סוף חודש)</h4>
          <p className="text-2xl lg:text-3xl font-bold text-red-600">{formatCurrency(summaryData.remainingLoans)}</p>
        </div>
      </div>

      {/* Card 4: Opening Balance */}
      <div className="summary-card bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-gray-500 text-sm text-center">יתרת פתיחה שנתית</h3>
        <div className="mt-2">
          <input
            type="text"
            defaultValue="10,000"
            className="w-full text-lg font-bold text-gray-800 text-center px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mt-2">
          <label className="text-xs text-gray-500 text-center block">מסגרת בנק (אופציונלי):</label>
          <div className="mt-1">
            <input type="text" placeholder="0" className="w-full text-sm text-center px-4 py-2 border rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
