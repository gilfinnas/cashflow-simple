"use client"

import { useMemo, useState, useCallback } from "react"
import { useCashflowCalculations } from "@/hooks/useCashflowCalculations"

interface MainTableProps {
  cashflowData: any
  userCategories: any
  currentYear: number
  currentMonthIndex: number
}

export function MainTable({ cashflowData, userCategories, currentYear, currentMonthIndex }: MainTableProps) {
  const [localData, setLocalData] = useState(cashflowData)
  
  const {
    getDaysInMonth,
    formatCurrency,
    getMonthlyOpeningBalance,
    getDailyBalance,
    getRunningBalance,
    getDailyVAT,
  } = useCashflowCalculations(localData, userCategories, currentYear, currentMonthIndex)

  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex)
  const today = new Date()
  const isCurrentMonthView = today.getFullYear() === currentYear && today.getMonth() === currentMonthIndex

  // Handle input changes
  const handleInputChange = useCallback((catKey: string, dayIndex: number, value: string) => {
    setLocalData((prev: any) => {
      const newData = { ...prev }
      if (!newData.years) newData.years = {}
      if (!newData.years[currentYear]) newData.years[currentYear] = {}
      if (!newData.years[currentYear][currentMonthIndex]) newData.years[currentYear][currentMonthIndex] = { categories: {}, customNames: {} }
      if (!newData.years[currentYear][currentMonthIndex].categories[catKey]) {
        newData.years[currentYear][currentMonthIndex].categories[catKey] = Array(daysInMonth).fill(0)
      }
      
      const cleanValue = value.replace(/,/g, "")
      const numValue = Number.parseFloat(cleanValue) || 0
      newData.years[currentYear][currentMonthIndex].categories[catKey][dayIndex] = numValue
      
      return newData
    })
  }, [currentYear, currentMonthIndex, daysInMonth])

  // Handle category name changes
  const handleCategoryNameChange = useCallback((catKey: string, name: string) => {
    setLocalData((prev: any) => {
      const newData = { ...prev }
      if (!newData.years) newData.years = {}
      if (!newData.years[currentYear]) newData.years[currentYear] = {}
      if (!newData.years[currentYear][currentMonthIndex]) newData.years[currentYear][currentMonthIndex] = { categories: {}, customNames: {} }
      if (!newData.years[currentYear][currentMonthIndex].customNames) newData.years[currentYear][currentMonthIndex].customNames = {}
      
      newData.years[currentYear][currentMonthIndex].customNames[catKey] = name
      
      return newData
    })
  }, [currentYear, currentMonthIndex])

  const tableData = useMemo(() => {
    if (!localData?.years?.[currentYear]?.[currentMonthIndex] || !userCategories) {
      return { headers: [], rows: [] }
    }

    const monthData = localData.years[currentYear][currentMonthIndex]
    const businessType = localData.vatSettings?.businessType

    // Generate headers
    const headers = ["קטגוריה"]
    for (let day = 1; day <= daysInMonth; day++) {
      headers.push(day.toString())
    }
    headers.push('סה"כ')

    // Generate rows
    const rows: any[] = []

    Object.entries(userCategories).forEach(([groupName, groupDetails]: [string, any]) => {
      // Skip certain categories based on business type
      if (groupName === "הכנסות פטורות ממע'מ" && !localData.vatSettings?.hasExemptIncome) return
      if (groupDetails.vatRelated && businessType === "exempt") return

      // Add group header row
      rows.push({
        type: "group-header",
        groupName,
        color: groupDetails.color,
        colspan: daysInMonth + 2,
      })

      let groupSum = 0

      // Add category rows
      Object.entries(groupDetails.items).forEach(([catKey, catDetails]: [string, any]) => {
        if (catDetails.businessTypes && !catDetails.businessTypes.includes(businessType)) {
          return
        }

        const isCustom = !catDetails.fixed
        const displayName = monthData.customNames?.[catKey] || catDetails.name || catDetails.placeholder || ""
        const isCalculated = catDetails.type === "expense_calculated"
        const dailyData = monthData.categories[catKey] || Array(daysInMonth).fill(0)
        
        // Calculate monthly sum
        const monthlySum = dailyData.reduce((acc: number, val: any) => {
          const numVal = Number.parseFloat(String(val || "0").replace(/,/g, "")) || 0
          return acc + numVal
        }, 0)

        // Add to group sum
        groupSum += monthlySum

        // For VAT calculations, use the calculated VAT values
        if (catDetails.type === "expense_calculated" && catKey === "vat_payment") {
          const vatDailyData = Array(daysInMonth).fill(0).map((_, i) => getDailyVAT(i))
          const vatMonthlySum = vatDailyData.reduce((acc: number, val: number) => acc + val, 0)
          
          rows.push({
            type: "category",
            catKey,
            displayName,
            isCustom,
            isCalculated,
            dailyData: vatDailyData,
            monthlySum: vatMonthlySum,
            placeholderText: catDetails.placeholder || "הקלד שם...",
          })
          
          groupSum = groupSum - monthlySum + vatMonthlySum
        } else {
          rows.push({
            type: "category",
            catKey,
            displayName,
            isCustom,
            isCalculated,
            dailyData,
            monthlySum,
            placeholderText: catDetails.placeholder || "הקלד שם...",
          })
        }
      })

      // Add group summary row
      rows.push({
        type: "group-summary",
        groupName,
        groupSum,
      })
    })

    return { headers, rows }
  }, [localData, userCategories, currentYear, currentMonthIndex, daysInMonth, getDailyVAT])

  const formatWithCommas = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <div className="table-container overflow-auto h-[70vh] border border-gray-200 rounded-lg bg-white">
      <table className="w-full text-sm text-center border-collapse">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            {tableData.headers.map((header, index) => (
              <th
                key={index}
                className={`px-4 py-3 font-semibold border-b-2 border-gray-200 ${
                  index === 0
                    ? "category-header sticky right-0 bg-gray-100 z-20 min-w-[250px]"
                    : isCurrentMonthView && Number.parseInt(header) === today.getDate()
                      ? "today-header bg-yellow-100"
                      : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.rows.map((row, rowIndex) => {
            if (row.type === "group-header") {
              return (
                <tr key={rowIndex} className={`${row.color} font-bold group-header-row`}>
                  <td className="category-cell px-4 py-3 sticky right-0 z-10 bg-inherit border-l border-gray-200">
                    {row.groupName}
                  </td>
                  <td colSpan={row.colspan}></td>
                </tr>
              )
            }

            if (row.type === "group-summary") {
              return (
                <tr key={rowIndex} className="group-summary-row bg-gray-50">
                  <td className="category-cell px-4 py-2 font-bold sticky right-0 z-10 bg-gray-50 border-l border-gray-200">
                    סיכום {row.groupName}
                  </td>
                  <td colSpan={daysInMonth}></td>
                  <td className="px-4 py-2 font-bold">{formatCurrency(row.groupSum)}</td>
                </tr>
              )
            }

            if (row.type === "category") {
              return (
                <tr key={rowIndex} className="border-b hover:bg-blue-50">
                  <td className="category-cell p-1 sticky right-0 z-10 bg-white border-l border-gray-200">
                    {row.isCustom ? (
                      <input
                        type="text"
                        className="category-name-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-right"
                        placeholder={row.placeholderText}
                        value={row.displayName}
                        onChange={(e) => handleCategoryNameChange(row.catKey, e.target.value)}
                      />
                    ) : (
                      <div className="category-cell-static px-3 py-2 border-2 border-gray-200 rounded-lg bg-gray-50">
                        {row.displayName}
                      </div>
                    )}
                  </td>

                  {row.dailyData.map((value: any, dayIndex: number) => {
                    const numValue = Number.parseFloat(String(value || "0").replace(/,/g, "")) || 0
                    const formattedValue = numValue !== 0 ? formatWithCommas(numValue) : ""
                    return (
                      <td key={dayIndex} className="p-1">
                        <input
                          type="text"
                          className="table-cell-input w-[140px] px-3 py-2 border-2 border-gray-200 rounded-lg text-center font-bold"
                          value={formattedValue}
                          placeholder="0"
                          disabled={row.isCalculated}
                          onChange={(e) => handleInputChange(row.catKey, dayIndex, e.target.value)}
                        />
                      </td>
                    )
                  })}

                  <td className="font-bold px-4 py-2">{formatCurrency(row.monthlySum)}</td>
                </tr>
              )
            }

            return null
          })}
        </tbody>

        <tfoot className="sticky bottom-0 bg-gray-100 z-10">
          <tr className="border-b bg-gray-100">
            <td className="category-cell px-4 py-2 text-right font-bold sticky right-0 z-20 bg-gray-100">
              יתרת פתיחה לחודש
            </td>
            <td className="font-bold px-4 py-2" colSpan={daysInMonth + 1}>
              {formatCurrency(getMonthlyOpeningBalance())}
            </td>
          </tr>
          <tr className="border-b balance-row">
            <td className="category-cell px-4 py-2 text-right sticky right-0 z-20 bg-gray-100">מאזן יומי</td>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <td key={i} className="font-bold px-4 py-2 daily-balance">
                {formatCurrency(getDailyBalance(i))}
              </td>
            ))}
            <td className="font-bold px-4 py-2"></td>
          </tr>
          <tr className="border-b balance-row">
            <td className="category-cell px-4 py-2 text-right sticky right-0 z-20 bg-gray-100">מאזן יומי מתגלגל</td>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <td key={i} className="font-bold px-4 py-2 running-balance">
                {formatCurrency(getRunningBalance(i))}
              </td>
            ))}
            <td className="font-bold px-4 py-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
