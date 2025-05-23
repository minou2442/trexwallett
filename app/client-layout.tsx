"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Toaster } from "@/components/ui/toaster"
import { AnimatePresence } from "framer-motion"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <LanguageProvider>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  )
}
