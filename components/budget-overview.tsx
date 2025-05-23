"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PieChart, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

const mockBudgetData = [
  { category: "Food", budgeted: 10000, spent: 8500, percentage: 85 },
  { category: "Transport", budgeted: 5000, spent: 4200, percentage: 84 },
  { category: "Shopping", budgeted: 5000, spent: 3600, percentage: 72 },
  { category: "Bills", budgeted: 8000, spent: 6000, percentage: 75 },
]

export function BudgetOverview() {
  const getProgressColor = (percentage: number) => {
    if (percentage < 70) return "bg-green-500"
    if (percentage < 90) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-white">
          <PieChart className="mr-2 h-5 w-5 text-amber-500" />
          Budget Overview
        </CardTitle>
        <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
          <Plus className="h-4 w-4 mr-1" />
          New Budget
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {mockBudgetData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-300">{item.category}</span>
                <span className="text-sm text-gray-400">
                  {formatCurrency(item.spent, "DZD")} / {formatCurrency(item.budgeted, "DZD")}
                </span>
              </div>
              <Progress
                value={item.percentage}
                className="h-2 bg-gray-700"
                indicatorClassName={getProgressColor(item.percentage)}
              />
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">{item.percentage}% used</span>
                <span
                  className={`font-medium ${item.percentage < 70 ? "text-green-500" : item.percentage < 90 ? "text-yellow-500" : "text-red-500"}`}
                >
                  {formatCurrency(item.budgeted - item.spent, "DZD")} remaining
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
