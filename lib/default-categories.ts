// lib/default-categories.ts

// Default categories structure for new users.
// This object is used to initialize the database for a new user.
export const defaultCategories = {
  "הכנסות": {
    color: "header-income",
    hex: "#c6f6d5",
    items: {
      sales_cash: { name: "מכירות (מזומן/אפליקציה)", type: "income", fixed: true },
      sales_credit: { name: "מכירות (אשראי)", type: "income", fixed: true },
      sales_cheques: { name: "שיקים", type: "income", fixed: true },
      sales_transfer: { name: "מכירות (העברה בנקאית)", type: "income", fixed: true },
      sales_other: { name: "הכנסות נוספות", type: "income", fixed: true },
    },
  },
  "הכנסות פטורות ממע'מ": {
    color: "header-income",
    hex: "#c6f6d5",
    items: {
      exempt_sales_cash: { name: "מכירות פטורות (מזומן/אפליקציה)", type: "exempt_income", fixed: true },
      exempt_sales_credit: { name: "מכירות פטורות (אשראי)", type: "exempt_income", fixed: true },
      exempt_sales_cheques: { name: "שיקים פטורים", type: "exempt_income", fixed: true },
      exempt_sales_transfer: { name: "מכירות פטורות (העברה בנקאית)", type: "exempt_income", fixed: true },
      exempt_sales_other: { name: "הכנסות פטורות נוספות", type: "exempt_income", fixed: true },
    },
    hidden: true,
  },
  "ספקים": {
    color: "header-suppliers",
    hex: "#FEEBC8",
    items: {
      supplier_1: { name: "", type: "expense", placeholder: "ספק 1" },
      supplier_2: { name: "", type: "expense", placeholder: "ספק 2" },
      supplier_3: { name: "", type: "expense", placeholder: "ספק 3" },
      supplier_4: { name: "", type: "expense", placeholder: "ספק 4" },
      supplier_5: { name: "", type: "expense", placeholder: "ספק 5" },
    },
  },
  "הוצאות משתנות": {
    color: "header-expense-var",
    hex: "#fed7d7",
    items: {
      electricity: { name: "חשמל", type: "expense", fixed: true },
      water: { name: "מים", type: "expense", fixed: true },
      marketing: { name: "שיווק ופרסום", type: "expense", fixed: true },
      custom_var_1: { name: "", type: "expense", placeholder: "הוצאה משתנה 1" },
    },
  },
  "הוצאות עם הכרה חלקית במע'מ": {
    color: "header-expense-var",
    hex: "#fed7d7",
    items: {
      car_expenses: { name: "הוצאות רכב", type: "partial_vat_expense", vatRate: 0.67, fixed: true },
      phone_expenses: { name: "טלפון נייד", type: "partial_vat_expense", vatRate: 0.5, fixed: true },
    },
  },
  "הלוואות": {
    color: "header-loans",
    hex: "#BEE3F8",
    items: {
      loan_1: { name: "", type: "expense_no_vat", placeholder: "שם הלוואה 1" },
      loan_2: { name: "", type: "expense_no_vat", placeholder: "שם הלוואה 2" },
    },
  },
  "הוצאות קבועות": {
    color: "header-expense-fixed",
    hex: "#E9D8FD",
    items: {
      rent: { name: "שכירות", type: "expense", fixed: true },
      salaries: { name: "משכורות", type: "employee_cost", fixed: true },
      accounting: { name: "הנהלת חשבונות", type: "expense", fixed: true },
      owner_withdrawal: {
        name: "משיכת בעלים (עוסק מורשה/פטור)",
        type: "expense_no_vat",
        fixed: true,
        businessTypes: ["authorized", "exempt"],
      },
      controlling_salary: {
        name: 'שכר בעלי שליטה (חברה בע"מ)',
        type: "employee_cost",
        fixed: true,
        businessTypes: ["company"],
      },
    },
  },
  "תשלומים ומיסים": {
    color: "header-taxes",
    hex: "#c3dafe",
    items: {
      social_security: { name: "מקדמות ביטוח לאומי", type: "employee_cost", fixed: true },
      income_tax: { name: "מקדמות מס הכנסה", type: "expense", fixed: true },
      vat_payment: { name: 'תשלום מע"מ מחודש קודם', type: "expense_calculated", fixed: true },
      vat_field: { name: 'מע"מ (חישוב)', type: "expense_calculated", fixed: true },
    },
    vatRelated: true,
  },
  "הוצאות בלתי צפויות": {
    color: "header-unexpected",
    hex: "#e2e8f0",
    items: { misc: { name: 'שונות / בלת"מ', type: "expense", fixed: true } },
  },
};
