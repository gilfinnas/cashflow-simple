"use client"

interface ActionButtonsProps {
  currentYear: number
  currentMonthIndex: number
  cashflowData: any
  userCategories: any
  onScrollToToday: () => void
}

export function ActionButtons({
  currentYear,
  currentMonthIndex,
  cashflowData,
  userCategories,
  onScrollToToday,
}: ActionButtonsProps) {
  const handleSave = () => {
    // Implement save functionality
    console.log("Saving data...")
  }

  const handleCopyFixed = () => {
    // Implement copy fixed expenses functionality
    console.log("Copying fixed expenses...")
  }

  const handleCopyTaxes = () => {
    // Implement copy taxes functionality
    console.log("Copying taxes...")
  }

  const handleCopyTitles = () => {
    // Implement copy titles functionality
    console.log("Copying titles...")
  }

  const handlePrint = () => {
    // Implement print/PDF functionality
    console.log("Generating print summary...")
  }

  const handleReset = async () => {
    const confirmed = confirm(`האם אתה בטוח שברצונך לאפס את כל הנתונים לחודש זה? הפעולה אינה הפיכה.`)
    if (confirmed) {
      console.log("Resetting month data...")
    }
  }

  const handleCashflowGap = () => {
    // Implement cashflow gap analysis
    console.log("Analyzing cashflow gaps...")
  }

  return (
    <div className="mt-8 flex flex-wrap justify-center items-center gap-2 md:gap-4 no-print">
      <button
        onClick={handleSave}
        className="action-button bg-green-600 hover:bg-green-700 text-white inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        שמור
      </button>

      <button
        onClick={onScrollToToday}
        className="action-button bg-gray-600 hover:bg-gray-700 text-white inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18"
          />
        </svg>
        היום
      </button>

      <button
        onClick={handleCopyFixed}
        className="action-button bg-indigo-600 hover:bg-indigo-700 text-white inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124"
          />
        </svg>
        העתק קבועות
      </button>

      <button
        onClick={handleCopyTaxes}
        className="action-button bg-purple-600 hover:bg-purple-700 text-white inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.816-2.08 1.962-2.333l7.5-1.667c.97-.215 1.995.563 2.24 1.534z"
          />
        </svg>
        העתק מיסים
      </button>

      <button
        onClick={handleCopyTitles}
        className="action-button bg-orange-600 hover:bg-orange-700 text-white inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
        העתק כותרות
      </button>

      <button
        onClick={handlePrint}
        className="action-button bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6 18.25"
          />
        </svg>
        הדפס / PDF
      </button>

      <button
        onClick={handleReset}
        className="action-button bg-red-600 hover:bg-red-700 text-white inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183"
          />
        </svg>
        אפס חודש
      </button>

      <button
        onClick={handleCashflowGap}
        className="action-button bg-yellow-600 hover:bg-yellow-700 text-white inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
          />
        </svg>
        בדיקת פער תזרימי
      </button>
    </div>
  )
}
