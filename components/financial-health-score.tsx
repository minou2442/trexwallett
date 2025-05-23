"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { motion } from "framer-motion"

interface FinancialHealthScoreProps {
  score: number
  factors: {
    savings: number
    spending: number
    bills: number
    investments: number
  }
}

export function FinancialHealthScore({ score, factors }: FinancialHealthScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-5 w-5 text-green-500" />
    if (score >= 60) return <Minus className="h-5 w-5 text-yellow-500" />
    return <TrendingDown className="h-5 w-5 text-red-500" />
  }

  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-500"
    if (value >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span>Financial Health Score</span>
          {getScoreIcon(score)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`text-4xl font-bold ${getScoreColor(score)}`}
          >
            {score}
          </motion.div>
          <span className="text-2xl text-gray-400 ml-1">/100</span>
        </div>

        <div className="space-y-4">
          {Object.entries(factors).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-sm font-medium capitalize text-gray-300">{key}</span>
              <div className="flex items-center space-x-2">
                <Progress value={value} className="w-20 bg-gray-700" indicatorClassName={getProgressColor(value)} />
                <span className="text-sm text-gray-400 w-8">{value}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
