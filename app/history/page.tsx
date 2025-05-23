"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { TransactionCard } from "@/components/transaction-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"

// Mock data - in a real app this would come from the API
const mockTransactions = [
  {
    id: "tx1",
    type: "incoming",
    amount: 5000,
    date: new Date().toISOString(),
    from: "Karim",
    to: "Ahmed",
    method: "NFC",
  },
  {
    id: "tx2",
    type: "outgoing",
    amount: 2500,
    date: new Date(Date.now() - 86400000).toISOString(),
    from: "Ahmed",
    to: "Samira",
    method: "QR",
  },
  {
    id: "tx3",
    type: "topup",
    amount: 10000,
    date: new Date(Date.now() - 172800000).toISOString(),
    from: "BaridiMob",
    to: "Ahmed",
  },
  {
    id: "tx4",
    type: "incoming",
    amount: 3000,
    date: new Date(Date.now() - 259200000).toISOString(),
    from: "Youcef",
    to: "Ahmed",
    method: "Manual",
  },
  {
    id: "tx5",
    type: "outgoing",
    amount: 1500,
    date: new Date(Date.now() - 345600000).toISOString(),
    from: "Ahmed",
    to: "Fatima",
    method: "NFC",
  },
  {
    id: "tx6",
    type: "topup",
    amount: 5000,
    date: new Date(Date.now() - 432000000).toISOString(),
    from: "BaridiMob",
    to: "Ahmed",
  },
]

export default function HistoryPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState(mockTransactions)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredTransactions = transactions.filter((tx) => {
    // Apply type filter
    if (filter !== "all" && tx.type !== filter) {
      return false
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        tx.from.toLowerCase().includes(query) ||
        tx.to.toLowerCase().includes(query) ||
        tx.amount.toString().includes(query) ||
        (tx.method && tx.method.toLowerCase().includes(query))
      )
    }

    return true
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        <Header title="history" />

        <main className="flex-1 p-4">
          {/* Search and Filter */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4 flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder={t("search")}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">{t("all")}</TabsTrigger>
                <TabsTrigger value="incoming">{t("incoming")}</TabsTrigger>
                <TabsTrigger value="outgoing">{t("outgoing")}</TabsTrigger>
                <TabsTrigger value="topup">{t("addFunds")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Transactions List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("transactions")}</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full mr-3" />
                          <div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))
                ) : filteredTransactions.length > 0 ? (
                  <motion.div variants={container} initial="hidden" animate="show">
                    {filteredTransactions.map((tx) => (
                      <motion.div key={tx.id} variants={item}>
                        <TransactionCard {...tx} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>{t("noTransactions")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <MainNav />
      </div>
    </PageTransition>
  )
}
