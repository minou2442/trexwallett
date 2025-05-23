"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

interface StockHolding {
  symbol: string
  name: string
  value: number
  change: number
}

interface StockPortfolioProps {
  portfolio: {
    totalValue: number
    dailyChange: number
    holdings: StockHolding[]
  }
}

export function StockPortfolio({ portfolio }: StockPortfolioProps) {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-white">
          <BarChart className="mr-2 h-5 w-5 text-blue-500" />
          Stock Portfolio
        </CardTitle>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-300">{formatCurrency(portfolio.totalValue, "DZD")}</span>
          <div className={`ml-2 flex items-center ${portfolio.dailyChange >= 0 ? "text-green-500" : "text-red-500"}`}>
            {portfolio.dailyChange >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span className="text-xs font-medium">{portfolio.dailyChange}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {portfolio.holdings.map((holding, index) => (
            <motion.div
              key={holding.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-500/20 rounded-md flex items-center justify-center text-blue-500 font-bold">
                  {holding.symbol.substring(0, 2)}
                </div>
                <div>
                  <span className="font-medium text-gray-300">{holding.name}</span>
                  <p className="text-xs text-gray-400">{holding.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-300">{formatCurrency(holding.value, "DZD")}</div>
                <div className={`text-xs ${holding.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {holding.change >= 0 ? "+" : ""}
                  {holding.change}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
