"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

interface CryptoHolding {
  symbol: string
  name: string
  value: number
  change: number
}

interface CryptoPortfolioProps {
  portfolio: {
    totalValue: number
    dailyChange: number
    holdings: CryptoHolding[]
  }
}

export function CryptoPortfolio({ portfolio }: CryptoPortfolioProps) {
  const getCryptoIcon = (symbol: string) => {
    switch (symbol) {
      case "BTC":
        return <Bitcoin className="h-5 w-5 text-yellow-500" />
      case "ETH":
        return (
          <div className="h-5 w-5 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white">
            E
          </div>
        )
      case "SOL":
        return (
          <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">S</div>
        )
      default:
        return (
          <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">C</div>
        )
    }
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-white">
          <Bitcoin className="mr-2 h-5 w-5 text-yellow-500" />
          Crypto Portfolio
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
                {getCryptoIcon(holding.symbol)}
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
