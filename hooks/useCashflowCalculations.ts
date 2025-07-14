"use client"

export function useCashflowCalculations(
  cashflowData: any,
  userCategories: any,
  currentYear: number,
  currentMonthIndex: number,
) {
  const VAT_RATE = 0.18

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getMonthlyOpeningBalance = () => {
    // Calculate opening balance for the current month
    const openingBalance = Number.parseFloat(String(cashflowData?.openingBalance || "0").replace(/,/g, ""))
    // Add logic to calculate cumulative balance from previous months/years
    return openingBalance
  }

  const getMonthlyTotal = (type: "income" | "expense") => {
    if (!cashflowData?.years?.[currentYear]?.[currentMonthIndex] || !userCategories) {
      return 0
    }

    const monthData = cashflowData.years[currentYear][currentMonthIndex].categories
    const businessType = cashflowData.vatSettings?.businessType
    let total = 0

    Object.values(userCategories).forEach((group: any) => {
      Object.entries(group.items).forEach(([catKey, catDetails]: [string, any]) => {
        if (catDetails.businessTypes && !catDetails.businessTypes.includes(businessType)) {
          return
        }

        if (type === "income" && (catDetails.type === "income" || catDetails.type === "exempt_income")) {
          const sum = (monthData[catKey] || []).reduce((a: number, b: any) => a + (Number.parseFloat(b) || 0), 0)
          total += sum
        } else if (
          type === "expense" &&
          (catDetails.type.startsWith("expense") ||
            catDetails.type === "employee_cost" ||
            catDetails.type.startsWith("partial_vat_expense") ||
            catDetails.type === "expense_no_vat")
        ) {
          const sum = (monthData[catKey] || []).reduce((a: number, b: any) => a + (Number.parseFloat(b) || 0), 0)
          total += sum
        }
      })
    })

    return total
  }

  const updateCalculations = () => {
    // Implement VAT calculations, running balance, etc.
    console.log("Updating calculations for:", currentYear, currentMonthIndex)
  }

  return {
    updateCalculations,
    getMonthlyOpeningBalance,
    getMonthlyTotal,
    formatCurrency,
    getDaysInMonth,
  }
}
