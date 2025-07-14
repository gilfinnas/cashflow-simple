"use client"

interface MobileViewProps {
  cashflowData: any
  userCategories: any
  currentYear: number
  currentMonthIndex: number
  selectedDay: number
  onDayChange: (day: number) => void
}

const months = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
]

export function MobileView({
  cashflowData,
  userCategories,
  currentYear,
  currentMonthIndex,
  selectedDay,
  onDayChange,
}: MobileViewProps) {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex)
  const today = new Date()
  const isToday =
    today.getFullYear() === currentYear && today.getMonth() === currentMonthIndex && today.getDate() - 1 === selectedDay

  const changeDay = (direction: number) => {
    let newDay = selectedDay + direction
    if (newDay < 0) newDay = daysInMonth - 1
    if (newDay >= daysInMonth) newDay = 0
    onDayChange(newDay)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (!cashflowData?.years?.[currentYear]?.[currentMonthIndex] || !userCategories) {
    return <div className="p-4">טוען נתונים...</div>
  }

  const monthData = cashflowData.years[currentYear][currentMonthIndex]
  const businessType = cashflowData.vatSettings?.businessType

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className={`day-selector-header p-4 bg-gray-100 flex justify-between items-center ${isToday ? "bg-yellow-100" : ""}`}
      >
        <button
          onClick={() => changeDay(-1)}
          className="nav-button bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
        >
          ←
        </button>
        <h2 className="text-lg font-bold">
          יום {selectedDay + 1} / {months[currentMonthIndex]}
        </h2>
        <button
          onClick={() => changeDay(1)}
          className="nav-button bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
        >
          →
        </button>
      </div>

      <div className="p-4 space-y-4">
        {Object.entries(userCategories).map(([groupName, groupDetails]: [string, any]) => {
          // Skip certain categories based on business type
          if (groupName === "הכנסות פטורות ממע'מ" && !cashflowData.vatSettings?.hasExemptIncome) return null
          if (groupDetails.vatRelated && businessType === "exempt") return null

          return (
            <div key={groupName}>
              <h3 className={`font-bold text-lg mb-2 p-2 ${groupDetails.color} rounded`}>{groupName}</h3>
              <div className="space-y-2">
                {Object.entries(groupDetails.items).map(([catKey, catDetails]: [string, any]) => {
                  if (catDetails.businessTypes && !catDetails.businessTypes.includes(businessType)) {
                    return null
                  }

                  const isCustom = !catDetails.fixed
                  const displayName = monthData.customNames?.[catKey] || catDetails.name || catDetails.placeholder || ""
                  const isCalculated = catDetails.type === "expense_calculated"
                  const value = monthData.categories[catKey]?.[selectedDay] || 0
                  const formattedValue = value !== 0 ? value.toLocaleString("en-US") : ""

                  return (
                    <div key={catKey} className="flex items-center justify-between p-2 border-b">
                      {isCustom ? (
                        <input
                          type="text"
                          className="w-2/3 px-2 py-1 border rounded"
                          placeholder={catDetails.placeholder || "הקלד שם..."}
                          defaultValue={displayName}
                        />
                      ) : (
                        <label className="w-2/3">{displayName}</label>
                      )}
                      <input
                        type="text"
                        className="w-1/3 px-2 py-1 border rounded text-center"
                        defaultValue={formattedValue}
                        placeholder="0"
                        disabled={isCalculated}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between font-bold text-lg">
            <p>מאזן יומי:</p>
            <p>{formatCurrency(0)}</p>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <p>מאזן מתגלגל:</p>
            <p>{formatCurrency(0)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
