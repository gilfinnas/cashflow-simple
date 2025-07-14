"use client"

interface MonthTabsProps {
  currentMonthIndex: number
  onMonthChange: (index: number) => void
  currentYear: number
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

export function MonthTabs({ currentMonthIndex, onMonthChange, currentYear }: MonthTabsProps) {
  const handleMonthClick = (index: number) => {
    onMonthChange(index)
  }

  return (
    <div className="mb-6 bg-white p-2 rounded-lg shadow-sm overflow-x-auto no-print">
      <nav className="flex space-x-1 md:space-x-2 space-x-reverse justify-center">
        {months.map((month, index) => (
          <button
            key={index}
            onClick={() => handleMonthClick(index)}
            className={`month-tab px-3 md:px-4 py-2 text-xs md:text-sm font-medium border rounded-md ${
              index === currentMonthIndex ? "active bg-blue-600 text-white border-blue-600" : "hover:bg-gray-200"
            }`}
          >
            {month}
          </button>
        ))}
      </nav>
    </div>
  )
}
