"use client"

import { useState, useEffect } from "react"
import { Header } from "./Header"
import { SummaryCards } from "./SummaryCards"
import { MonthTabs } from "./MonthTabs"
import { MainTable } from "./MainTable"
import { MobileView } from "./MobileView"
import { ActionButtons } from "./ActionButtons"
import { ContactFooter } from "./ContactFooter"
import { useCashflowCalculations } from "@/hooks/useCashflowCalculations"

interface AppContainerProps {
  cashflowData: any
  userCategories: any
  onShowSettings: () => void
  onShowVATSetup: () => void
}

export function AppContainer({ cashflowData, userCategories, onShowSettings, onShowVATSetup }: AppContainerProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState(new Date().getDate() - 1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { updateCalculations, getMonthlyOpeningBalance, getMonthlyTotal, formatCurrency } = useCashflowCalculations(
    cashflowData,
    userCategories,
    currentYear,
    currentMonthIndex,
  )

  useEffect(() => {
    updateCalculations()
  }, [currentYear, currentMonthIndex, cashflowData, userCategories])

  const scrollToToday = () => {
    const today = new Date()
    setCurrentYear(today.getFullYear())
    setCurrentMonthIndex(today.getMonth())
    setSelectedDay(today.getDate() - 1)
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Header
        currentYear={currentYear}
        onYearChange={setCurrentYear}
        clientName={cashflowData?.clientName || ""}
        onShowSettings={onShowSettings}
        onScrollToToday={scrollToToday}
      />

      <SummaryCards
        cashflowData={cashflowData}
        userCategories={userCategories}
        currentYear={currentYear}
        currentMonthIndex={currentMonthIndex}
      />

      <MonthTabs currentMonthIndex={currentMonthIndex} onMonthChange={setCurrentMonthIndex} currentYear={currentYear} />

      <div
        className={`hidden lg:block bg-white rounded-lg shadow-md overflow-hidden main-table-container relative no-print ${isFullscreen ? "fullscreen" : ""}`}
      >
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-2 left-2 z-20 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          title={isFullscreen ? "צא ממסך מלא" : "הצג מסך מלא"}
        >
          {isFullscreen ? (
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l-5 5m0 0v-4m0 4h4m1-11l5-5m0 0v4m0-4h-4m-1 11l5 5m0 0v-4m0 4h-4m-7-1l-5-5m0 0v4m0-4h4"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5"
              />
            </svg>
          )}
        </button>

        <MainTable
          cashflowData={cashflowData}
          userCategories={userCategories}
          currentYear={currentYear}
          currentMonthIndex={currentMonthIndex}
        />
      </div>

      <div className="block lg:hidden">
        <MobileView
          cashflowData={cashflowData}
          userCategories={userCategories}
          currentYear={currentYear}
          currentMonthIndex={currentMonthIndex}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
        />
      </div>

      <ActionButtons
        currentYear={currentYear}
        currentMonthIndex={currentMonthIndex}
        cashflowData={cashflowData}
        userCategories={userCategories}
        onScrollToToday={scrollToToday}
      />

      <ContactFooter />
    </div>
  )
}
