"use client"

import { useMemo } from "react"

interface MainTableProps {
  cashflowData: any
  userCategories: any
  currentYear: number
  currentMonthIndex: number
}

export function MainTable({ cashflowData, userCategories, currentYear, currentMonthIndex }: MainTableProps) {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex)
  const today = new Date()
  const isCurrentMonthView = today.getFullYear() === currentYear && today.getMonth() === currentMonthIndex

  const tableData = useMemo(() => {
    if (!cashflowData?.years?.[currentYear]?.[currentMonthIndex] || !userCategories) {
      return { headers: [], rows: [] }
    }

    const monthData = cashflowData.years[currentYear][currentMonthIndex]
    const businessType = cashflowData.vatSettings?.businessType

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
      if (groupName === "הכנסות פטורות ממע'מ" && !cashflowData.vatSettings?.hasExemptIncome) return
      if (groupDetails.vatRelated && businessType === "exempt") return

      // Add group header row
      rows.push({
        type: "group-header",
        groupName,
        color: groupDetails.color,
        colspan: daysInMonth + 2,
      })

      // Add category rows
      Object.entries(groupDetails.items).forEach(([catKey, catDetails]: [string, any]) => {
        if (catDetails.businessTypes && !catDetails.businessTypes.includes(businessType)) {
          return
        }

        const isCustom = !catDetails.fixed
        const displayName = monthData.customNames?.[catKey] || catDetails.name || catDetails.placeholder || ""
        const isCalculated = catDetails.type === "expense_calculated"
        const dailyData = monthData.categories[catKey] || Array(daysInMonth).fill(0)
        const monthlySum = dailyData.reduce((acc: number, val: any) => acc + (Number.parseFloat(val) || 0), 0)

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
      })

      // Add group summary row
      const groupSum = rows
        .filter((row) => row.type === "category" && row.catKey)
        .reduce((sum, row) => sum + row.monthlySum, 0)

      rows.push({
        type: "group-summary",
        groupName,
        groupSum,
      })
    })

    return { headers, rows }
  }, [cashflowData, userCategories, currentYear, currentMonthIndex, daysInMonth])

  const formatWithCommas = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
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
                        defaultValue={row.displayName}
                      />
                    ) : (
                      <div className="category-cell-static px-3 py-2 border-2 border-gray-200 rounded-lg bg-gray-50">
                        {row.displayName}
                      </div>
                    )}
                  </td>

                  {row.dailyData.map((value: any, dayIndex: number) => {
                    const formattedValue = value !== 0 ? formatWithCommas(value) : ""
                    return (
                      <td key={dayIndex} className="p-1">
                        <input
                          type="text"
                          className="table-cell-input w-[140px] px-3 py-2 border-2 border-gray-200 rounded-lg text-center font-bold"
                          defaultValue={formattedValue}
                          placeholder="0"
                          disabled={row.isCalculated}
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
              {formatCurrency(0)} {/* This should be calculated */}
            </td>
          </tr>
          <tr className="border-b balance-row">
            <td className="category-cell px-4 py-2 text-right sticky right-0 z-20 bg-gray-100">מאזן יומי</td>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <td key={i} className="font-bold px-4 py-2 daily-balance">
                {formatCurrency(0)} {/* This should be calculated */}
              </td>
            ))}
            <td className="font-bold px-4 py-2"></td>
          </tr>
          <tr className="border-b balance-row">
            <td className="category-cell px-4 py-2 text-right sticky right-0 z-20 bg-gray-100">מאזן יומי מתגלגל</td>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <td key={i} className="font-bold px-4 py-2 running-balance">
                {formatCurrency(0)} {/* This should be calculated */}
              </td>
            ))}
            <td className="font-bold px-4 py-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
