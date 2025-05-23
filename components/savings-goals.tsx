"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Target, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

interface SavingsGoalsProps {
  currentSavings: number
  savingsGoal: number
}

export function SavingsGoals({ currentSavings, savingsGoal }: SavingsGoalsProps) {
  const progressPercentage = (currentSavings / savingsGoal) * 100

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-white">
          <Target className="mr-2 h-5 w-5 text-green-500" />
          Savings Goal
        </CardTitle>
        <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
          <Plus className="h-4 w-4 mr-1" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Emergency Fund</span>
            <span className="text-sm font-medium text-gray-300">
              {formatCurrency(currentSavings, "DZD")} / {formatCurrency(savingsGoal, "DZD")}
            </span>
          </div>

          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }}>
            <Progress value={progressPercentage} className="h-3 bg-gray-700" indicatorClassName="bg-green-500" />
          </motion.div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{Math.round(progressPercentage)}% completed</span>
            <span className="text-green-500 font-medium">
              {formatCurrency(savingsGoal - currentSavings, "DZD")} remaining
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
