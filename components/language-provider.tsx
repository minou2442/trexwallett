"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

type Translations = {
  [key: string]: {
    en: string
    ar: string
  }
}

const translations: Translations = {
  home: {
    en: "Home",
    ar: "الرئيسية",
  },
  wallet: {
    en: "Wallet",
    ar: "المحفظة",
  },
  history: {
    en: "History",
    ar: "السجل",
  },
  profile: {
    en: "Profile",
    ar: "الملف الشخصي",
  },
  analytics: {
    en: "Analytics",
    ar: "التحليلات",
  },
  services: {
    en: "Services",
    ar: "الخدمات",
  },
  settings: {
    en: "Settings",
    ar: "الإعدادات",
  },
  send: {
    en: "Send",
    ar: "إرسال",
  },
  receive: {
    en: "Receive",
    ar: "استلام",
  },
  addFunds: {
    en: "Add Funds",
    ar: "إضافة رصيد",
  },
  balance: {
    en: "Balance",
    ar: "الرصيد",
  },
  transactions: {
    en: "Transactions",
    ar: "المعاملات",
  },
  logout: {
    en: "Logout",
    ar: "تسجيل الخروج",
  },
  login: {
    en: "Login",
    ar: "تسجيل الدخول",
  },
  register: {
    en: "Register",
    ar: "إنشاء حساب",
  },
  createAccount: {
    en: "Create an account",
    ar: "إنشاء حساب جديد",
  },
  fullName: {
    en: "Full Name",
    ar: "الاسم الكامل",
  },
  email: {
    en: "Email",
    ar: "البريد الإلكتروني",
  },
  password: {
    en: "Password",
    ar: "كلمة المرور",
  },
  confirmPassword: {
    en: "Confirm Password",
    ar: "تأكيد كلمة المرور",
  },
  uploadID: {
    en: "Upload ID",
    ar: "تحميل الهوية",
  },
  submit: {
    en: "Submit",
    ar: "إرسال",
  },
  amount: {
    en: "Amount",
    ar: "المبلغ",
  },
  recipient: {
    en: "Recipient",
    ar: "المستلم",
  },
  transferMethod: {
    en: "Transfer Method",
    ar: "طريقة التحويل",
  },
  nfc: {
    en: "NFC",
    ar: "NFC",
  },
  qrCode: {
    en: "QR Code",
    ar: "رمز QR",
  },
  manual: {
    en: "Manual",
    ar: "يدوي",
  },
  ripNumber: {
    en: "RIP Number",
    ar: "رقم RIP",
  },
  transactionId: {
    en: "Transaction ID",
    ar: "رقم المعاملة",
  },
  uploadConfirmation: {
    en: "Upload Confirmation",
    ar: "تحميل التأكيد",
  },
  date: {
    en: "Date",
    ar: "التاريخ",
  },
  from: {
    en: "From",
    ar: "من",
  },
  to: {
    en: "To",
    ar: "إلى",
  },
  status: {
    en: "Status",
    ar: "الحالة",
  },
  completed: {
    en: "Completed",
    ar: "مكتمل",
  },
  pending: {
    en: "Pending",
    ar: "قيد الانتظار",
  },
  failed: {
    en: "Failed",
    ar: "فشل",
  },
  cardDetails: {
    en: "Card Details",
    ar: "تفاصيل البطاقة",
  },
  cardNumber: {
    en: "Card Number",
    ar: "رقم البطاقة",
  },
  expiryDate: {
    en: "Expiry Date",
    ar: "تاريخ الانتهاء",
  },
  psvCode: {
    en: "PSV Code",
    ar: "رمز PSV",
  },
  tapToFlip: {
    en: "Tap to flip",
    ar: "انقر للقلب",
  },
  welcomeBack: {
    en: "Welcome Back",
    ar: "مرحبًا بعودتك",
  },
  recentTransactions: {
    en: "Recent Transactions",
    ar: "المعاملات الأخيرة",
  },
  viewAll: {
    en: "View All",
    ar: "عرض الكل",
  },
  quickActions: {
    en: "Quick Actions",
    ar: "إجراءات سريعة",
  },
  scanQR: {
    en: "Scan QR",
    ar: "مسح رمز QR",
  },
  transferMoney: {
    en: "Transfer Money",
    ar: "تحويل الأموال",
  },
  addFundsViaBaridiMob: {
    en: "Add Funds via BaridiMob",
    ar: "إضافة رصيد عبر بريدي موب",
  },
  dinarSymbol: {
    en: "DZD",
    ar: "د.ج",
  },
  search: {
    en: "Search",
    ar: "بحث",
  },
  all: {
    en: "All",
    ar: "الكل",
  },
  incoming: {
    en: "Incoming",
    ar: "واردة",
  },
  outgoing: {
    en: "Outgoing",
    ar: "صادرة",
  },
  noTransactions: {
    en: "No transactions found",
    ar: "لا توجد معاملات",
  },
  personalInfo: {
    en: "Personal Information",
    ar: "المعلومات الشخصية",
  },
  phone: {
    en: "Phone",
    ar: "الهاتف",
  },
  address: {
    en: "Address",
    ar: "العنوان",
  },
  memberSince: {
    en: "Member Since",
    ar: "عضو منذ",
  },
  share: {
    en: "Share",
    ar: "مشاركة",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    // Set RTL direction for Arabic
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }

  const value = {
    language,
    setLanguage: (lang: Language) => {
      setLanguage(lang)
      localStorage.setItem("language", lang)
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    },
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
