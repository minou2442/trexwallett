"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Moon,
  Sun,
  Bell,
  Shield,
  Fingerprint,
  Eye,
  Palette,
  Type,
  Volume2,
  Vibrate,
  Globe,
  CreditCard,
  Users,
  HelpCircle,
  FileText,
  Download,
  Upload,
  Trash2,
  RefreshCw,
} from "lucide-react"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    biometric: true,
    faceId: false,
    soundEffects: true,
    vibration: true,
    autoBackup: true,
    fontSize: [16],
    theme: "red",
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Settings Updated",
      description: `${key} has been updated successfully.`,
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const settingsGroups = [
    {
      title: "Appearance",
      icon: Palette,
      items: [
        {
          icon: settings.darkMode ? Moon : Sun,
          title: "Dark Mode",
          description: "Switch between light and dark themes",
          type: "switch",
          value: settings.darkMode,
          onChange: (value: boolean) => updateSetting("darkMode", value),
        },
        {
          icon: Type,
          title: "Font Size",
          description: "Adjust text size for better readability",
          type: "slider",
          value: settings.fontSize,
          onChange: (value: number[]) => updateSetting("fontSize", value),
        },
        {
          icon: Palette,
          title: "Theme Color",
          description: "Choose your preferred color scheme",
          type: "color",
          value: settings.theme,
          onChange: (value: string) => updateSetting("theme", value),
        },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      items: [
        {
          icon: Fingerprint,
          title: "Biometric Authentication",
          description: "Use fingerprint to unlock the app",
          type: "switch",
          value: settings.biometric,
          onChange: (value: boolean) => updateSetting("biometric", value),
        },
        {
          icon: Eye,
          title: "Face ID",
          description: "Use face recognition for authentication",
          type: "switch",
          value: settings.faceId,
          onChange: (value: boolean) => updateSetting("faceId", value),
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          icon: Bell,
          title: "Push Notifications",
          description: "Receive transaction and security alerts",
          type: "switch",
          value: settings.notifications,
          onChange: (value: boolean) => updateSetting("notifications", value),
        },
        {
          icon: Volume2,
          title: "Sound Effects",
          description: "Play sounds for app interactions",
          type: "switch",
          value: settings.soundEffects,
          onChange: (value: boolean) => updateSetting("soundEffects", value),
        },
        {
          icon: Vibrate,
          title: "Vibration",
          description: "Vibrate for notifications and feedback",
          type: "switch",
          value: settings.vibration,
          onChange: (value: boolean) => updateSetting("vibration", value),
        },
      ],
    },
    {
      title: "Data & Privacy",
      icon: Shield,
      items: [
        {
          icon: Upload,
          title: "Auto Backup",
          description: "Automatically backup your data",
          type: "switch",
          value: settings.autoBackup,
          onChange: (value: boolean) => updateSetting("autoBackup", value),
        },
        {
          icon: Download,
          title: "Export Data",
          description: "Download your transaction history",
          type: "button",
          action: () => toast({ title: "Export Started", description: "Your data export will be ready shortly." }),
        },
        {
          icon: Trash2,
          title: "Clear Cache",
          description: "Free up storage space",
          type: "button",
          action: () => toast({ title: "Cache Cleared", description: "App cache has been cleared successfully." }),
        },
      ],
    },
    {
      title: "Language & Region",
      icon: Globe,
      items: [
        {
          icon: Globe,
          title: "Language",
          description: "Choose your preferred language",
          type: "language",
          value: language,
          onChange: (value: string) => setLanguage(value as "en" | "ar"),
        },
      ],
    },
    {
      title: "Account",
      icon: Users,
      items: [
        {
          icon: CreditCard,
          title: "Payment Methods",
          description: "Manage your cards and payment options",
          type: "button",
          action: () =>
            toast({ title: "Coming Soon", description: "Payment methods management will be available soon." }),
        },
        {
          icon: RefreshCw,
          title: "Sync Account",
          description: "Synchronize your account data",
          type: "button",
          action: () => toast({ title: "Syncing", description: "Account synchronization in progress..." }),
        },
      ],
    },
    {
      title: "Support",
      icon: HelpCircle,
      items: [
        {
          icon: HelpCircle,
          title: "Help Center",
          description: "Get help and support",
          type: "button",
          action: () => toast({ title: "Help Center", description: "Opening help center..." }),
        },
        {
          icon: FileText,
          title: "Terms & Privacy",
          description: "Read our terms and privacy policy",
          type: "button",
          action: () => toast({ title: "Legal Documents", description: "Opening legal documents..." }),
        },
      ],
    },
  ]

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen pb-16">
        <Header title="settings" />

        <main className="flex-1 p-4">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {settingsGroups.map((group, groupIndex) => (
              <motion.div key={group.title} variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <group.icon className="mr-2 h-5 w-5 text-red-600" />
                      {group.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {group.items.map((setting, index) => (
                      <motion.div
                        key={setting.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <setting.icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium">{setting.title}</h4>
                            <p className="text-sm text-gray-500">{setting.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {setting.type === "switch" && (
                            <Switch checked={setting.value} onCheckedChange={setting.onChange} />
                          )}

                          {setting.type === "slider" && (
                            <div className="w-24">
                              <Slider
                                value={setting.value}
                                onValueChange={setting.onChange}
                                max={24}
                                min={12}
                                step={1}
                              />
                            </div>
                          )}

                          {setting.type === "color" && (
                            <div className="flex space-x-2">
                              {["red", "blue", "green", "purple"].map((color) => (
                                <button
                                  key={color}
                                  onClick={() => setting.onChange(color)}
                                  className={`w-6 h-6 rounded-full bg-${color}-500 ${
                                    setting.value === color ? "ring-2 ring-offset-2 ring-gray-400" : ""
                                  }`}
                                />
                              ))}
                            </div>
                          )}

                          {setting.type === "language" && (
                            <div className="flex space-x-2">
                              <Button
                                variant={setting.value === "en" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setting.onChange("en")}
                              >
                                EN
                              </Button>
                              <Button
                                variant={setting.value === "ar" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setting.onChange("ar")}
                              >
                                AR
                              </Button>
                            </div>
                          )}

                          {setting.type === "button" && (
                            <Button variant="outline" size="sm" onClick={setting.action}>
                              Open
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>

        <MainNav />
      </div>
    </PageTransition>
  )
}
