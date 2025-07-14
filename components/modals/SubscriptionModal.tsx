"use client"

export function SubscriptionModal() {
  const handleUpgrade = () => {
    window.open("offer.html", "_blank")
  }

  const handleLogout = () => {
    // Implement logout
    console.log("Logging out...")
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h3 className="text-2xl font-bold mb-4 text-red-600">המנוי שלך פג</h3>
        <p className="mb-6">הגישה שלך לאפליקציה הסתיימה. כדי להמשיך ליהנות מהשירות, אנא שדרג את המנוי שלך.</p>
        <button
          onClick={handleUpgrade}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold text-lg mb-3"
        >
          🚀 שדרג עכשיו
        </button>
        <button onClick={handleLogout} className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
          התנתק
        </button>
      </div>
    </div>
  )
}
