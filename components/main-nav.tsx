"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Wallet, History, User, BarChart3, Layers, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { motion } from "framer-motion"

export function MainNav() {
  const pathname = usePathname()
  const { t, language, setLanguage } = useLanguage()

  const routes = [
    {
      href: "/dashboard",
      label: t("home"),
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/wallet",
      label: t("wallet"),
      icon: Wallet,
      active: pathname === "/wallet",
    },
    {
      href: "/analytics",
      label: t("analytics"),
      icon: BarChart3,
      active: pathname === "/analytics",
    },
    {
      href: "/services",
      label: t("services"),
      icon: Layers,
      active: pathname === "/services",
    },
    {
      href: "/history",
      label: t("history"),
      icon: History,
      active: pathname === "/history",
    },
    {
      href: "/profile",
      label: t("profile"),
      icon: User,
      active: pathname === "/profile",
    },
    {
      href: "/settings",
      label: t("settings"),
      icon: Settings,
      active: pathname === "/settings",
    },
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center w-full bg-gray-900/80 backdrop-blur-lg text-white p-2 fixed bottom-0 left-0 z-50 border-t border-gray-800 overflow-x-auto"
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex flex-col items-center justify-center text-xs font-medium transition-colors px-2 py-1 rounded-lg",
            route.active
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800",
          )}
        >
          <route.icon className="h-5 w-5 mb-1" />
          <span>{route.label}</span>
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
          <DropdownMenuItem onClick={() => setLanguage("en")} className="hover:bg-gray-700">
            🇬🇧 English {language === "en" && "✓"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("ar")} className="hover:bg-gray-700">
            🇩🇿 العربية {language === "ar" && "✓"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
