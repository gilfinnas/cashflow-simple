"use client"

export function ScrollNavigation() {
  const scrollTable = (direction: "up" | "down" | "left" | "right") => {
    const container = document.getElementById("table-container")
    if (!container) return

    const scrollAmount = 100
    switch (direction) {
      case "up":
        container.scrollTop -= scrollAmount
        break
      case "down":
        container.scrollTop += scrollAmount
        break
      case "left":
        container.scrollLeft -= scrollAmount
        break
      case "right":
        container.scrollLeft += scrollAmount
        break
    }
  }

  return (
    <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2">
      <button
        onClick={() => scrollTable("up")}
        className="w-12 h-12 rounded-full bg-blue-600 bg-opacity-90 text-white border-none cursor-pointer flex items-center justify-center text-lg transition-all hover:bg-blue-700 hover:scale-110"
        title="גלול למעלה"
      >
        ↑
      </button>
      <button
        onClick={() => scrollTable("down")}
        className="w-12 h-12 rounded-full bg-blue-600 bg-opacity-90 text-white border-none cursor-pointer flex items-center justify-center text-lg transition-all hover:bg-blue-700 hover:scale-110"
        title="גלול למטה"
      >
        ↓
      </button>
      <button
        onClick={() => scrollTable("left")}
        className="w-12 h-12 rounded-full bg-blue-600 bg-opacity-90 text-white border-none cursor-pointer flex items-center justify-center text-lg transition-all hover:bg-blue-700 hover:scale-110"
        title="גלול שמאלה"
      >
        ←
      </button>
      <button
        onClick={() => scrollTable("right")}
        className="w-12 h-12 rounded-full bg-blue-600 bg-opacity-90 text-white border-none cursor-pointer flex items-center justify-center text-lg transition-all hover:bg-blue-700 hover:scale-110"
        title="גלול ימינה"
      >
        →
      </button>
    </div>
  )
}
