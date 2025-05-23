"use client"

import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Target, PieChart, BarChart3, LineChart } from "lucide-react"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { formatCurrency } from "@/lib/utils"

const mockAnalytics = {
  monthlySpending: {
    current: 32000,
    previous: 28500,
    change: 12.3,
  },
  categoryBreakdown: [
    { name: "Food & Dining", amount: 12000, percentage: 37.5, color: "bg-red-500" },
    { name: "Transportation", amount: 8000, percentage: 25, color: "bg-blue-500" },
    { name: "Shopping", amount: 6000, percentage: 18.75, color: "bg-green-500" },
    { name: "Bills & Utilities", amount: 4000, percentage: 12.5, color: "bg-yellow-500" },
    { name: "Entertainment", amount: 2000, percentage: 6.25, color: "bg-purple-500" },
  ],
  monthlyTrends: [
    { month: "Jan", income: 45000, expenses: 32000 },
    { month: "Feb", income: 47000, expenses: 31000 },
    { month: "Mar", income: 45000, expenses: 33000 },
    { month: "Apr", income: 48000, expenses: 32000 },
    { month: "May", income: 45000, expenses: 30000 },
    { month: "Jun", income: 46000, expenses: 32000 },
  ],
  savingsRate: 28.9,
  budgetComparison: [
    { category: "Food", budgeted: 10000, actual: 12000, percentage: 120 },
    { category: "Transport", budgeted: 8000, actual: 8000, percentage: 100 },
    { category: "Shopping", budgeted: 5000, actual: 6000, percentage: 120 },
    { category: "Bills", budgeted: 4000, actual: 4000, percentage: 100 },
  ],
}

export default function AnalyticsPage() {
  const { t } = useLanguage()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen pb-16">
        <Header title="analytics" />

        <main className="flex-1 p-4">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="spending">Spending</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <motion.div variants={container} initial="hidden" animate="show">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div variants={item}>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Monthly Spending</p>
                            <p className="text-2xl font-bold">
                              {formatCurrency(mockAnalytics.monthlySpending.current, "DZD")}
                            </p>
                            <div className="flex items-center mt-1">
                              <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-sm text-red-500">+{mockAnalytics.monthlySpending.change}%</span>
                            </div>
                          </div>
                          <DollarSign className="h-8 w-8 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={item}>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Savings Rate</p>
                            <p className="text-2xl font-bold">{mockAnalytics.savingsRate}%</p>
                            <div className="flex items-center mt-1">
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-sm text-green-500">Good</span>
                            </div>
                          </div>
                          <Target className="h-8 w-8 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Category Breakdown */}
                <motion.div variants={item}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="mr-2 h-5 w-5" />
                        Spending by Category
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalytics.categoryBreakdown.map((category, index) => (
                          <motion.div
                            key={category.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${category.color}`} />
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">{formatCurrency(category.amount, "DZD")}</span>
                              <span className="text-sm font-medium">{category.percentage}%</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="spending" className="space-y-6">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Spending Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {mockAnalytics.categoryBreakdown.map((category, index) => (
                          <div key={category.name} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{category.name}</span>
                              <span className="text-sm text-gray-500">{formatCurrency(category.amount, "DZD")}</span>
                            </div>
                            <Progress value={category.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LineChart className="mr-2 h-5 w-5" />
                        Income vs Expenses Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalytics.monthlyTrends.map((month, index) => (
                          <motion.div
                            key={month.month}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="font-medium">{month.month}</span>
                            <div className="flex space-x-4">
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Income</p>
                                <p className="font-medium text-green-600">{formatCurrency(month.income, "DZD")}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Expenses</p>
                                <p className="font-medium text-red-600">{formatCurrency(month.expenses, "DZD")}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="budget" className="space-y-6">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        Budget vs Actual Spending
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {mockAnalytics.budgetComparison.map((item, index) => (
                          <motion.div
                            key={item.category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{item.category}</span>
                              <span
                                className={`text-sm font-medium ${
                                  item.percentage > 100 ? "text-red-600" : "text-green-600"
                                }`}
                              >
                                {item.percentage}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Budget: {formatCurrency(item.budgeted, "DZD")}</span>
                              <span>Actual: {formatCurrency(item.actual, "DZD")}</span>
                            </div>
                            <Progress
                              value={Math.min(item.percentage, 100)}
                              className={`h-2 ${item.percentage > 100 ? "bg-red-100" : "bg-green-100"}`}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>

        <MainNav />
      </div>
    </PageTransition>
  )
}
