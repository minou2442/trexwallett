"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { LogOut, Edit, Shield, Bell, HelpCircle, Languages } from "lucide-react"
import Image from "next/image"

// Mock data - in a real app this would come from the API
const mockUser = {
  id: "user123",
  fullName: "Ahmed Benali",
  email: "ahmed@example.com",
  phone: "+213 555 123 456",
  address: "123 Rue Didouche Mourad, Algiers",
  joinDate: "2023-05-15",
}

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(mockUser)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const menuItems = [
    {
      icon: Edit,
      label: "Edit Profile",
      action: () => console.log("Edit profile"),
    },
    {
      icon: Shield,
      label: "Security",
      action: () => console.log("Security"),
    },
    {
      icon: Bell,
      label: "Notifications",
      action: () => console.log("Notifications"),
    },
    {
      icon: Languages,
      label: "Language",
      action: () => setLanguage(language === "en" ? "ar" : "en"),
      value: language === "en" ? "English" : "العربية",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      action: () => console.log("Help"),
    },
    {
      icon: LogOut,
      label: "Logout",
      action: () => console.log("Logout"),
      danger: true,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header title="profile" />

      <main className="flex-1 p-4">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              {loading ? (
                <Skeleton className="h-24 w-24 rounded-full" />
              ) : (
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.fullName} />
                  <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>
              )}

              <div className="mt-4 text-center">
                {loading ? (
                  <>
                    <Skeleton className="h-6 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-48 mx-auto" />
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold">{user.fullName}</h2>
                    <p className="text-gray-500">{user.email}</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("personalInfo")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))
            ) : (
              <>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t("email")}</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t("phone")}</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t("address")}</span>
                  <span>{user.address}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">{t("memberSince")}</span>
                  <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <Card>
          <CardHeader>
            <CardTitle>{t("settings")}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-3" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))
              : menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`flex items-center justify-between w-full p-4 text-left ${
                      index < menuItems.length - 1 ? "border-b border-gray-100" : ""
                    } ${item.danger ? "text-red-600" : ""}`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${item.danger ? "bg-red-100" : "bg-gray-100"}`}>
                        <item.icon className={`h-5 w-5 ${item.danger ? "text-red-600" : "text-gray-600"}`} />
                      </div>
                      <span>{t(item.label.toLowerCase().replace(" & ", ""))}</span>
                    </div>
                    {item.value && <span className="text-sm text-gray-500">{item.value}</span>}
                  </button>
                ))}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">TrexByte Wallet v1.0.0</p>
          <div className="mt-2 flex justify-center">
            <Image src="/trexbyte-logo.png" alt="TrexByte Logo" width={40} height={40} className="opacity-50" />
          </div>
        </div>
      </main>

      <MainNav />
    </div>
  )
}
