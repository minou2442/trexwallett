"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

const mockSpendingData = [
  { category: "Food", amount: 8500, color: "bg-red-500", percentage: 35 },
  { category: "Transport", amount: 4200, color: "bg-blue-500", percentage: 17 },
  { category: "Shopping", amount: 3600, color: "bg-green-500", percentage: 15 },
  { category: "Bills", amount: 6000, color: "bg-yellow-500", percentage: 25 },
  { category: "Others", amount: 2000, color: "bg-purple-500", percentage: 8 },
]

export function SpendingChart() {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Monthly Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSpendingData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />
                <span className="font-medium text-gray-300">{item.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{formatCurrency(item.amount, "DZD")}</span>
                <span className="text-sm font-medium text-gray-300">{item.percentage}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex rounded-full overflow-hidden h-3">
            {mockSpendingData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={item.color}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
