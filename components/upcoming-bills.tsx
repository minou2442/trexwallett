"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, AlertCircle, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

const mockUpcomingBills = [
  { id: 1, name: "Electricity Bill", amount: 3200, dueDate: "2024-01-15", daysLeft: 3 },
  { id: 2, name: "Internet Bill", amount: 2800, dueDate: "2024-01-18", daysLeft: 6 },
  { id: 3, name: "Water Bill", amount: 1100, dueDate: "2024-01-20", daysLeft: 8 },
]

export function UpcomingBills() {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-white">
          <Clock className="mr-2 h-5 w-5 text-orange-500" />
          Upcoming Bills
        </CardTitle>
        <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          Schedule
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockUpcomingBills.map((bill, index) => (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 text-orange-500 rounded-full">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-300">{bill.name}</h4>
                  <p className="text-xs text-gray-400">Due: {bill.dueDate}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-gray-300">{formatCurrency(bill.amount, "DZD")}</span>
                <span className="text-xs text-orange-500">{bill.daysLeft} days left</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
