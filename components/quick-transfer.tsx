"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Send, Plus, Search } from "lucide-react"
import { motion } from "framer-motion"

const mockContacts = [
  { id: 1, name: "Karim", image: "/placeholder.svg?height=40&width=40", initial: "K" },
  { id: 2, name: "Samira", image: "/placeholder.svg?height=40&width=40", initial: "S" },
  { id: 3, name: "Youcef", image: "/placeholder.svg?height=40&width=40", initial: "Y" },
  { id: 4, name: "Fatima", image: "/placeholder.svg?height=40&width=40", initial: "F" },
]

export function QuickTransfer() {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center text-white">
          <Send className="mr-2 h-5 w-5 text-blue-500" />
          Quick Transfer
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide">
          {mockContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center space-y-2 min-w-[60px]"
            >
              <Avatar className="h-12 w-12 border-2 border-blue-500">
                <AvatarImage src={contact.image || "/placeholder.svg"} alt={contact.name} />
                <AvatarFallback className="bg-blue-500 text-white">{contact.initial}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-300">{contact.name}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mockContacts.length * 0.1 }}
            className="flex flex-col items-center space-y-2 min-w-[60px]"
          >
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <span className="text-xs text-gray-300">New</span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
