"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { WalletCard } from "@/components/wallet-card"
import { TransferForm } from "@/components/transfer-form"
import { ReceiveMoney } from "@/components/receive-money"
import { AddFundsForm } from "@/components/add-funds-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import {
  Send,
  QrCode,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Wallet,
  CreditCardIcon as CardIcon,
  ArrowDownLeft,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

// Mock data - in a real app this would come from the API
const mockUser = {
  id: "user123",
  fullName: "Ahmed Benali",
  email: "ahmed@example.com",
  wallet: {
    balance: 25000,
    cards: [
      {
        id: "card1",
        type: "trexbyte",
        cardNumber: "4512345678901234",
        expDate: "12/29",
        psv: "123",
        isLocked: false,
        isVirtual: false,
        limits: {
          daily: 10000,
          monthly: 100000,
          online: 5000,
          atm: 5000,
        },
      },
      {
        id: "card2",
        type: "visa",
        cardNumber: "4111111111111111",
        expDate: "10/28",
        psv: "456",
        isLocked: true,
        isVirtual: true,
        limits: {
          daily: 5000,
          monthly: 50000,
          online: 3000,
          atm: 0,
        },
      },
    ],
    recentTransactions: [
      {
        id: "tx1",
        type: "payment",
        amount: 1200,
        date: new Date().toISOString(),
        merchant: "Amazon",
        category: "Shopping",
      },
      {
        id: "tx2",
        type: "refund",
        amount: 500,
        date: new Date(Date.now() - 86400000).toISOString(),
        merchant: "Zara",
        category: "Shopping",
      },
      {
        id: "tx3",
        type: "withdrawal",
        amount: 2000,
        date: new Date(Date.now() - 172800000).toISOString(),
        location: "ATM #123",
        category: "Cash",
      },
    ],
  },
}

export default function WalletPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const action = searchParams.get("action")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(mockUser)
  const [activeTab, setActiveTab] = useState<string>(
    action === "send"
      ? "send"
      : action === "receive"
        ? "receive"
        : action === "add-funds"
          ? "add-funds"
          : action === "scan"
            ? "send"
            : "cards",
  )
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [showPsv, setShowPsv] = useState(false)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLockCard = (cardId: string) => {
    setUser((prev) => ({
      ...prev,
      wallet: {
        ...prev.wallet,
        cards: prev.wallet.cards.map((card) => (card.id === cardId ? { ...card, isLocked: !card.isLocked } : card)),
      },
    }))

    const card = user.wallet.cards.find((c) => c.id === cardId)
    toast({
      title: card?.isLocked ? "Card Unlocked" : "Card Locked",
      description: card?.isLocked
        ? "Your card has been successfully unlocked."
        : "Your card has been locked for security. No transactions will be processed.",
      variant: card?.isLocked ? "default" : "destructive",
    })
  }

  const handleUpdateLimit = (cardId: string, limitType: "daily" | "monthly" | "online" | "atm", value: number) => {
    setUser((prev) => ({
      ...prev,
      wallet: {
        ...prev.wallet,
        cards: prev.wallet.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                limits: {
                  ...card.limits,
                  [limitType]: value,
                },
              }
            : card,
        ),
      },
    }))

    toast({
      title: "Limit Updated",
      description: `Your ${limitType} limit has been updated to ${formatCurrency(value, t("dinarSymbol"))}`,
    })
  }

  const selectedCard = user.wallet.cards[selectedCardIndex]

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
      <div className="flex flex-col min-h-screen pb-16 bg-gradient-to-b from-gray-900 to-black text-white">
        <Header title="wallet" />

        <main className="flex-1 p-4">
          {/* Balance Section */}
          <motion.section variants={container} initial="hidden" animate="show" className="mb-6">
            <motion.div variants={item}>
              <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-400">{t("balance")}</p>
                      {loading ? (
                        <Skeleton className="h-8 w-32 bg-gray-700" />
                      ) : (
                        <motion.h3
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="text-2xl font-bold text-white"
                        >
                          {formatCurrency(user.wallet.balance, t("dinarSymbol"))}
                        </motion.h3>
                      )}
                    </div>
                    <motion.div
                      initial={{ rotate: -10, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full"
                    >
                      <Wallet className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          {/* Wallet Tabs */}
          <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4 bg-gray-800 p-1">
                <TabsTrigger value="cards" className="data-[state=active]:bg-blue-600">
                  <CardIcon className="mr-2 h-4 w-4" />
                  {t("cards")}
                </TabsTrigger>
                <TabsTrigger value="send" className="data-[state=active]:bg-blue-600">
                  <Send className="mr-2 h-4 w-4" />
                  {t("send")}
                </TabsTrigger>
                <TabsTrigger value="receive" className="data-[state=active]:bg-blue-600">
                  <QrCode className="mr-2 h-4 w-4" />
                  {t("receive")}
                </TabsTrigger>
                <TabsTrigger value="add-funds" className="data-[state=active]:bg-blue-600">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t("addFunds")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cards">
                {loading ? (
                  <Skeleton className="h-56 w-full rounded-xl bg-gray-800" />
                ) : (
                  <div className="space-y-6">
                    {/* Card selector */}
                    {user.wallet.cards.length > 1 && (
                      <div className="flex justify-center space-x-2">
                        {user.wallet.cards.map((card, index) => (
                          <button
                            key={card.id}
                            onClick={() => setSelectedCardIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              selectedCardIndex === index ? "bg-blue-500 scale-125" : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Card display */}
                    <WalletCard
                      fullName={user.fullName}
                      cardNumber={
                        showCardNumber ? selectedCard.cardNumber : "•••• •••• •••• " + selectedCard.cardNumber.slice(-4)
                      }
                      expDate={selectedCard.expDate}
                      psv={showPsv ? selectedCard.psv : "•••"}
                      cardType={selectedCard.type as any}
                    />

                    {/* Card actions */}
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                        onClick={() => setShowCardNumber(!showCardNumber)}
                      >
                        {showCardNumber ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                        {showCardNumber ? "Hide" : "Show"} Number
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                        onClick={() => setShowPsv(!showPsv)}
                      >
                        {showPsv ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                        {showPsv ? "Hide" : "Show"} PSV
                      </Button>
                      <Button
                        variant={selectedCard.isLocked ? "outline" : "destructive"}
                        className={
                          selectedCard.isLocked ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" : ""
                        }
                        onClick={() => handleLockCard(selectedCard.id)}
                      >
                        {selectedCard.isLocked ? (
                          <Unlock className="mr-2 h-4 w-4" />
                        ) : (
                          <Lock className="mr-2 h-4 w-4" />
                        )}
                        {selectedCard.isLocked ? "Unlock" : "Lock"} Card
                      </Button>
                    </div>

                    {/* Card status */}
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center">
                        {selectedCard.isLocked ? (
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        )}
                        <span className="text-gray-300">Card Status</span>
                      </div>
                      <Badge
                        variant={selectedCard.isLocked ? "destructive" : "success"}
                        className="bg-opacity-20 border-0"
                      >
                        {selectedCard.isLocked ? "Locked" : "Active"}
                      </Badge>
                    </div>

                    {/* Card type */}
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="text-gray-300">Card Type</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/20 border-blue-500/50 text-blue-400">
                        {selectedCard.isVirtual ? "Virtual" : "Physical"}
                      </Badge>
                    </div>

                    {/* Card limits */}
                    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Card Limits</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="daily-limit" className="text-gray-300">
                              Daily Limit
                            </Label>
                            <span className="text-gray-300">
                              {formatCurrency(selectedCard.limits.daily, t("dinarSymbol"))}
                            </span>
                          </div>
                          <Slider
                            id="daily-limit"
                            min={1000}
                            max={50000}
                            step={1000}
                            value={[selectedCard.limits.daily]}
                            onValueChange={(value) => handleUpdateLimit(selectedCard.id, "daily", value[0])}
                            className="bg-gray-700"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="online-limit" className="text-gray-300">
                              Online Limit
                            </Label>
                            <span className="text-gray-300">
                              {formatCurrency(selectedCard.limits.online, t("dinarSymbol"))}
                            </span>
                          </div>
                          <Slider
                            id="online-limit"
                            min={0}
                            max={20000}
                            step={1000}
                            value={[selectedCard.limits.online]}
                            onValueChange={(value) => handleUpdateLimit(selectedCard.id, "online", value[0])}
                            className="bg-gray-700"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="atm-limit" className="text-gray-300">
                              ATM Withdrawal Limit
                            </Label>
                            <span className="text-gray-300">
                              {formatCurrency(selectedCard.limits.atm, t("dinarSymbol"))}
                            </span>
                          </div>
                          <Slider
                            id="atm-limit"
                            min={0}
                            max={10000}
                            step={1000}
                            value={[selectedCard.limits.atm]}
                            onValueChange={(value) => handleUpdateLimit(selectedCard.id, "atm", value[0])}
                            className="bg-gray-700"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Add new card button */}
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Card
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="send">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-800" />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TransferForm userId={user.id} balance={user.wallet.balance} />
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="receive">
                {loading ? (
                  <Skeleton className="h-64 w-full rounded-xl bg-gray-800" />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ReceiveMoney userId={user.id} />
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="add-funds">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-800" />
                    <Skeleton className="h-10 w-full bg-gray-800" />
                    <Skeleton className="h-40 w-full bg-gray-800" />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AddFundsForm userId={user.id} />
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white">Recent Card Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-400">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border-b border-gray-700">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full mr-3 bg-gray-700" />
                          <div>
                            <Skeleton className="h-4 w-32 mb-2 bg-gray-700" />
                            <Skeleton className="h-3 w-24 bg-gray-700" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-16 bg-gray-700" />
                      </div>
                    ))
                ) : user.wallet.recentTransactions.length > 0 ? (
                  <div className="space-y-3">
                    {user.wallet.recentTransactions.map((tx, index) => (
                      <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border-b border-gray-700"
                      >
                        <div className="flex items-center">
                          <div
                            className={`p-2 rounded-full mr-3 ${
                              tx.type === "payment"
                                ? "bg-red-500/20 text-red-500"
                                : tx.type === "refund"
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-blue-500/20 text-blue-500"
                            }`}
                          >
                            {tx.type === "payment" ? (
                              <Send className="h-4 w-4" />
                            ) : tx.type === "refund" ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <CreditCard className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-300">{tx.merchant || tx.location}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(tx.date).toLocaleDateString()} • {tx.category}
                            </p>
                          </div>
                        </div>
                        <div className={`font-semibold ${tx.type === "payment" ? "text-red-500" : "text-green-500"}`}>
                          {tx.type === "payment" ? "-" : "+"}
                          {formatCurrency(tx.amount, t("dinarSymbol"))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-400">
                    <p>No recent transactions</p>
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
