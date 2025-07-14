"use client"

import { useState } from "react"

interface CategoryEditorModalProps {
  onClose: () => void
  userCategories: any
}

export function CategoryEditorModal({ onClose, userCategories }: CategoryEditorModalProps) {
  const [categories, setCategories] = useState(userCategories)

  const handleSave = async () => {
    const confirmed = confirm("האם אתה בטוח שברצונך לשמור את השינויים בקטגוריות?")
    if (!confirmed) return

    // Implement save categories
    console.log("Saving category changes:", categories)
    onClose()
  }

  const handleDeleteCategory = async (groupName: string, catKey: string) => {
    const confirmed = confirm("האם אתה בטוח שברצונך למחוק את השורה? פעולה זו תמחק את כל הנתונים הקשורים לשורה זו.")
    if (!confirmed) return

    const newCategories = { ...categories }
    delete newCategories[groupName].items[catKey]
    setCategories(newCategories)
  }

  const handleAddCategory = (groupName: string) => {
    const newCategories = { ...categories }
    const newKey = `new_${Date.now()}`

    newCategories[groupName].items[newKey] = {
      name: "",
      type: "expense",
      placeholder: "קטגוריה חדשה",
    }

    setCategories(newCategories)
  }

  const handleUpdateCategoryName = (groupName: string, catKey: string, newName: string) => {
    const newCategories = { ...categories }
    newCategories[groupName].items[catKey].name = newName
    setCategories(newCategories)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">עריכת קטגוריות</h3>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(categories).map(([groupName, groupDetails]: [string, any]) => (
            <div key={groupName} className="border p-3 rounded-lg bg-gray-50">
              <h5 className="font-bold text-md mb-3">{groupName}</h5>
              <div className="space-y-2">
                {Object.entries(groupDetails.items).map(([catKey, catDetails]: [string, any]) => (
                  <div key={catKey} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={catDetails.name || ""}
                      onChange={(e) => handleUpdateCategoryName(groupName, catKey, e.target.value)}
                      placeholder={catDetails.placeholder || "שם קטגוריה"}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                    <button
                      onClick={() => handleDeleteCategory(groupName, catKey)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddCategory(groupName)}
                  className="w-full mt-3 bg-blue-500 text-white py-1 rounded text-sm"
                >
                  + הוסף שורה חדשה
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            ביטול
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            שמור שינויים
          </button>
        </div>
      </div>
    </div>
  )
}
