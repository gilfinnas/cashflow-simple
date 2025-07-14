"use client"

interface SubscriptionBannerProps {
  userData: any
}

export function SubscriptionBanner({ userData }: SubscriptionBannerProps) {
  if (!userData?.subscriptionEndDate) return null

  const now = new Date()
  const endDate = userData.subscriptionEndDate.toDate
    ? userData.subscriptionEndDate.toDate()
    : new Date(userData.subscriptionEndDate)
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  const handleUpgrade = () => {
    window.open("offer.html", "_blank")
  }

  if (userData.subscriptionType === "trial" && daysLeft > 0) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 text-center font-semibold shadow-lg">
        <span>נשארו לך {daysLeft} ימי ניסיון</span>
        <button
          onClick={handleUpgrade}
          className="ml-4 bg-white text-purple-600 px-4 py-1 rounded-full font-bold hover:bg-gray-100 transition-colors"
        >
          לשדרוג לחץ כאן
        </button>
      </div>
    )
  }

  if (userData.subscriptionType !== "trial") {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 text-center font-semibold shadow-lg">
        <span>
          מנוי פעיל: {userData.subscriptionPlan || "עסק קטן"} (עד {endDate.toLocaleDateString("he-IL")})
        </span>
      </div>
    )
  }

  return null
}
