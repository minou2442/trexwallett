"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Droplets, Wifi, Car, Phone, Home, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/lib/utils"

const billCategories = [
  { icon: Zap, name: "Electricity", color: "bg-yellow-100 text-yellow-600", avgAmount: 3500 },
  { icon: Droplets, name: "Water", color: "bg-blue-100 text-blue-600", avgAmount: 1200 },
  { icon: Wifi, name: "Internet", color: "bg-purple-100 text-purple-600", avgAmount: 2800 },
  { icon: Car, name: "Gas", color: "bg-red-100 text-red-600", avgAmount: 4500 },
  { icon: Phone, name: "Mobile", color: "bg-green-100 text-green-600", avgAmount: 1800 },
  { icon: Home, name: "Rent", color: "bg-orange-100 text-orange-600", avgAmount: 25000 },
]

const upcomingBills = [
  { id: 1, name: "Electricity Bill", amount: 3200, dueDate: "2024-01-15", status: "pending" },
  { id: 2, name: "Internet Bill", amount: 2800, dueDate: "2024-01-18", status: "pending" },
  { id: 3, name: "Water Bill", amount: 1100, dueDate: "2024-01-20", status: "pending" },
]

const paidBills = [
  { id: 4, name: "Mobile Bill", amount: 1800, paidDate: "2024-01-05", status: "paid" },
  { id: 5, name: "Gas Bill", amount: 4200, paidDate: "2024-01-03", status: "paid" },
]

export default function BillsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [selectedBill, setSelectedBill] = useState<any>(null)
  const [paymentAmount, setPaymentAmount] = useState("")

  const handlePayBill = (bill: any) => {
    setSelectedBill(bill)
    setPaymentAmount(bill.amount.toString())
  }

  const confirmPayment = () => {
    toast({
      title: "Payment Successful",
      description: `${selectedBill.name} has been paid successfully.`,
    })
    setSelectedBill(null)
    setPaymentAmount("")
  }

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
        <Header title="Bills & Utilities" />

        <main className="flex-1 p-4">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            {/* Bill Categories */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Bill Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {billCategories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className={`p-3 rounded-full mb-2 ${category.color}`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-medium text-center">{category.name}</span>
                        <span className="text-xs text-gray-500 mt-1">
                          Avg: {formatCurrency(category.avgAmount, "DZD")}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Bills */}
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-orange-600" />
                    Upcoming Bills
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingBills.map((bill, index) => (
                      <motion.div
                        key={bill.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 text-orange-600 rounded-full">
                            <AlertCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium">{bill.name}</h4>
                            <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">{formatCurrency(bill.amount, "DZD")}</span>
                          <Button size="sm" onClick={() => handlePayBill(bill)}>
                            Pay Now
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Paid Bills */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                    Recently Paid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paidBills.map((bill, index) => (
                      <motion.div
                        key={bill.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg bg-green-50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 text-green-600 rounded-full">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium">{bill.name}</h4>
                            <p className="text-sm text-gray-500">Paid: {bill.paidDate}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-green-600">{formatCurrency(bill.amount, "DZD")}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Modal */}
            {selectedBill && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-lg p-6 w-full max-w-md"
                >
                  <h3 className="text-lg font-semibold mb-4">Pay {selectedBill.name}</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Amount (DZD)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Due Date:</span>
                      <span>{selectedBill.dueDate}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button variant="outline" onClick={() => setSelectedBill(null)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={confirmPayment} className="flex-1 bg-red-600 hover:bg-red-700">
                      Pay {formatCurrency(Number(paymentAmount), "DZD")}
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </main>

        <MainNav />
      </div>
    </PageTransition>
  )
}
