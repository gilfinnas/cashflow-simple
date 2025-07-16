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

  // Calculate daily income for a specific day
  const getDailyIncome = (dayIndex: number) => {
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

        if (catDetails.type === "income" || catDetails.type === "exempt_income") {
          const dailyData = monthData[catKey] || []
          const value = Number.parseFloat(String(dailyData[dayIndex] || "0").replace(/,/g, "")) || 0
          total += value
        }
      })
    })

    return total
  }

  // Calculate daily expenses for a specific day
  const getDailyExpenses = (dayIndex: number) => {
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

        if (catDetails.type.startsWith("expense") || 
            catDetails.type === "employee_cost" ||
            catDetails.type.startsWith("partial_vat_expense") ||
            catDetails.type === "expense_no_vat") {
          const dailyData = monthData[catKey] || []
          const value = Number.parseFloat(String(dailyData[dayIndex] || "0").replace(/,/g, "")) || 0
          total += value
        }
      })
    })

    return total
  }

  // Calculate daily balance (income - expenses)
  const getDailyBalance = (dayIndex: number) => {
    return getDailyIncome(dayIndex) - getDailyExpenses(dayIndex)
  }

  // Calculate running balance up to a specific day
  const getRunningBalance = (dayIndex: number) => {
    let runningBalance = getMonthlyOpeningBalance()
    
    for (let i = 0; i <= dayIndex; i++) {
      runningBalance += getDailyBalance(i)
    }
    
    return runningBalance
  }

  const getMonthlyOpeningBalance = () => {
    // Calculate opening balance for the current month
    const openingBalance = Number.parseFloat(String(cashflowData?.openingBalance || "0").replace(/,/g, ""))
    
    // Add logic to calculate cumulative balance from previous months/years
    // For now, just return the base opening balance
    // TODO: Add calculation for previous months' net effects
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
          const sum = (monthData[catKey] || []).reduce((a: number, b: any) => a + (Number.parseFloat(String(b || "0").replace(/,/g, "")) || 0), 0)
          total += sum
        } else if (
          type === "expense" &&
          (catDetails.type.startsWith("expense") ||
            catDetails.type === "employee_cost" ||
            catDetails.type.startsWith("partial_vat_expense") ||
            catDetails.type === "expense_no_vat")
        ) {
          const sum = (monthData[catKey] || []).reduce((a: number, b: any) => a + (Number.parseFloat(String(b || "0").replace(/,/g, "")) || 0), 0)
          total += sum
        }
      })
    })

    return total
  }

  // Calculate VAT for a specific day
  const getDailyVAT = (dayIndex: number) => {
    if (!cashflowData?.years?.[currentYear]?.[currentMonthIndex] || !userCategories) {
      return 0
    }

    const monthData = cashflowData.years[currentYear][currentMonthIndex].categories
    const businessType = cashflowData.vatSettings?.businessType
    
    if (businessType === "exempt") {
      return 0
    }

    let vatIncome = 0
    let vatExpenses = 0

    Object.values(userCategories).forEach((group: any) => {
      Object.entries(group.items).forEach(([catKey, catDetails]: [string, any]) => {
        if (catDetails.businessTypes && !catDetails.businessTypes.includes(businessType)) {
          return
        }

        const dailyData = monthData[catKey] || []
        const value = Number.parseFloat(String(dailyData[dayIndex] || "0").replace(/,/g, "")) || 0

        if (catDetails.type === "income") {
          vatIncome += value
        } else if (catDetails.type === "expense") {
          vatExpenses += value
        }
      })
    })

    return (vatIncome - vatExpenses) * VAT_RATE
  }

  const updateCalculations = () => {
    // This function can be used to trigger recalculations
    // For now, calculations are done on-demand
    console.log("Updating calculations for:", currentYear, currentMonthIndex)
  }

  return {
    updateCalculations,
    getMonthlyOpeningBalance,
    getMonthlyTotal,
    formatCurrency,
    getDaysInMonth,
    getDailyIncome,
    getDailyExpenses,
    getDailyBalance,
    getRunningBalance,
    getDailyVAT,
  }
}
