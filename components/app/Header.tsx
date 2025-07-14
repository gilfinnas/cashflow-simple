"use client"

import { useAuth } from "@/hooks/useAuth"

interface HeaderProps {
  currentYear: number
  onYearChange: (year: number) => void
  clientName: string
  onShowSettings: () => void
  onScrollToToday: () => void
}

export function Header({ currentYear, onYearChange, clientName, onShowSettings, onScrollToToday }: HeaderProps) {
  const { signOut } = useAuth()
  const today = new Date().getDate()

  return (
    <header className="mb-8 text-center no-print flex justify-between items-center">
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={signOut} className="bg-red-500 text-white py-2 px-3 rounded-lg text-xs sm:text-sm">
          התנתק
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs sm:text-sm">
          שמור
        </button>
        <button onClick={onShowSettings} className="bg-gray-500 text-white py-2 px-3 rounded-lg text-xs sm:text-sm">
          הגדרות
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-xs sm:text-sm">
          דשבורד ניהולי
        </button>
      </div>

      <div className="flex-grow">
        <div className="year-nav justify-center flex items-center gap-4 mb-2">
          <button
            onClick={() => onYearChange(currentYear - 1)}
            className="nav-button bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
          >
            ←
          </button>
          <h2 className="text-xl font-bold">{currentYear}</h2>
          <button
            onClick={() => onYearChange(currentYear + 1)}
            className="nav-button bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
          >
            →
          </button>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-blue-800">תזרים מזומנים יומי</h1>
        <input
          type="text"
          defaultValue={clientName}
          placeholder="הקלד שם לקוח כאן"
          className="mt-2 text-center w-full max-w-md px-4 py-2 border rounded-lg"
        />
      </div>

      <button
        onClick={onScrollToToday}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
      >
        📅 היום ({today})
      </button>
    </header>
  )
}
