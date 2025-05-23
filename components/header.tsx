"use client"

import { useLanguage } from "./language-provider"
import { Bell, Settings, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

export function Header({ title }: { title: string }) {
  const { t } = useLanguage()
  const [showSearch, setShowSearch] = useState(false)

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white"
    >
      {showSearch ? (
        <div className="flex-1 flex items-center">
          <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => setShowSearch(false)}>
            <motion.div initial={{ rotate: 0 }} animate={{ rotate: 45 }} transition={{ duration: 0.2 }}>
              <Search className="h-5 w-5" />
            </motion.div>
          </Button>
          <Input
            placeholder="Search..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
            autoFocus
          />
        </div>
      ) : (
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-10 w-10 mr-2"
          >
            <Image src="/trexbyte-logo.png" alt="TrexByte Logo" fill className="object-contain" />
          </motion.div>
          <h1 className="text-xl font-bold">{t(title)}</h1>
        </div>
      )}
      <div className="flex items-center space-x-2">
        {!showSearch && (
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setShowSearch(true)}>
            <Search className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="text-white">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  )
}
