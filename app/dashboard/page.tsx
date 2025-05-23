"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { TransactionCard } from "@/components/transaction-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import {
  ArrowRight,
  Wallet,
  Send,
  QrCode,
  CreditCard,
  Zap,
  Smartphone,
  Gift,
  TrendingUp,
  Landmark,
  Coins,
  Banknote,
  Percent,
  ShoppingBag,
  Ticket,
  Sparkles,
  Scan,
  Repeat,
  Clock,
  Layers,
  Gem,
  Megaphone,
  Briefcase,
  Gauge,
  Lightbulb,
  Rocket,
  Flame,
  Wifi,
  Coffee,
  Star,
  Award,
  Plane,
  Droplets,
  LayoutPanelTopIcon as LayoutPanel,
  SplitIcon as LayoutSplit,
  SplitIcon as LayoutSplit,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  AlignJustifyIcon as LayoutJustify,
  LayoutTemplateIcon as LayoutWrap,
  LayoutTemplateIcon as LayoutDirection,
  LayoutTemplateIcon as LayoutDirection,
  LayoutGridIcon as LayoutGap,
  LayoutGridIcon as LayoutGap,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutPanelLeftIcon as LayoutMargin,
  LayoutPanelLeftIcon as LayoutMargin,
  LayoutPanelLeftIcon as LayoutMargin,
  LayoutPanelLeftIcon as LayoutMargin,
  LayoutPanelLeftIcon as LayoutMargin,
  LayoutPanelLeftIcon as LayoutMargin,
  LayoutPanelLeftIcon as LayoutMargin,
  LayoutPanelLeftIcon as LayoutMargin,
  LayoutGridIcon as LayoutPadding,
  LayoutGridIcon as LayoutPadding,
  LayoutGridIcon as LayoutPadding,
  LayoutGridIcon as LayoutPadding,
  LayoutGridIcon as LayoutPadding,
  LayoutGridIcon as LayoutPadding,
  LayoutGridIcon as LayoutPadding,
  LayoutGridIcon as LayoutPadding,
  LayoutListIcon as LayoutPosition,
  LayoutListIcon as LayoutPosition,
  LayoutListIcon as LayoutPosition,
  LayoutListIcon as LayoutPosition,
  LayoutListIcon as LayoutPosition,
  LayoutDashboardIcon as LayoutOverflow,
  LayoutDashboardIcon as LayoutOverflow,
  LayoutDashboardIcon as LayoutOverflow,
  LayoutDashboardIcon as LayoutOverflow,
  LayoutDashboardIcon as LayoutOverflow,
  LayoutDashboardIcon as LayoutOverflow,
  LayoutDashboardIcon as LayoutDisplay,
  LayoutDashboardIcon as LayoutDisplay,
  LayoutDashboardIcon as LayoutDisplay,
  LayoutDashboardIcon as LayoutDisplay,
  LayoutDashboardIcon as LayoutDisplay,
  LayoutDashboardIcon as LayoutDisplay,
  LayoutDashboardIcon as LayoutDisplay,
  LayoutDashboardIcon as LayoutDisplay,
  LayoutDashboardIcon as LayoutVisibility,
  LayoutDashboardIcon as LayoutVisibility,
  LayoutDashboardIcon as LayoutVisibility,
  LayoutTemplateIcon as LayoutTransform,
  LayoutTemplateIcon as LayoutTransform,
  LayoutTemplateIcon as LayoutTransform,
  LayoutTemplateIcon as LayoutTransform,
  LayoutTemplateIcon as LayoutTransform,
  LayoutTemplateIcon as LayoutTransform,
  LayoutTemplateIcon as LayoutTransform,
  LayoutTemplateIcon as LayoutTransform,
  FlipVerticalIcon as LayoutTransition,
  FlipVerticalIcon as LayoutTransition,
  FlipVerticalIcon as LayoutTransition,
  FlipVerticalIcon as LayoutTransition,
  LayoutTemplateIcon as LayoutAnimation,
  LayoutTemplateIcon as LayoutAnimation,
  LayoutTemplateIcon as LayoutAnimation,
  LayoutTemplateIcon as LayoutAnimation,
  LayoutTemplateIcon as LayoutAnimation,
  LayoutTemplateIcon as LayoutAnimation,
  LayoutTemplateIcon as LayoutAnimation,
  LayoutTemplateIcon as LayoutAnimation,
  LayoutTemplateIcon as LayoutClip,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutMask,
  LayoutTemplateIcon as LayoutFont,
  LayoutTemplateIcon as LayoutFont,
  LayoutTemplateIcon as LayoutFont,
  LayoutTemplateIcon as LayoutFont,
  LayoutTemplateIcon as LayoutFont,
  LayoutTemplateIcon as LayoutFont,
  LayoutListIcon as LayoutTextEmphasis,
  LayoutListIcon as LayoutTextEmphasis,
  LayoutListIcon as LayoutTextEmphasis,
  LayoutTemplateIcon as LayoutTextDecoration,
  LayoutTemplateIcon as LayoutTextDecoration,
  LayoutTemplateIcon as LayoutTextDecoration,
  LayoutTemplateIcon as LayoutTextDecoration,
  LayoutTemplateIcon as LayoutTextDecoration,
  LayoutTemplateIcon as LayoutTextDecoration,
  LayoutDashboardIcon as LayoutOverflow,
  LayoutListIcon as LayoutListStyle,
  LayoutListIcon as LayoutListStyle,
  LayoutListIcon as LayoutListStyle,
  LayoutGridIcon as LayoutBorder,
  LayoutGridIcon as LayoutBorder,
  LayoutListIcon as LayoutContent,
  LayoutTemplateIcon as LayoutPage,
  LayoutTemplateIcon as LayoutPage,
  LayoutTemplateIcon as LayoutPage,
  LayoutGridIcon as LayoutColumnRule,
  LayoutGridIcon as LayoutColumnRule,
  LayoutGridIcon as LayoutColumnRule,
  LayoutListIcon as LayoutOutline,
  LayoutListIcon as LayoutOutline,
  LayoutListIcon as LayoutOutline,
  LayoutListIcon as LayoutOutline,
  LayoutDashboardIcon as LayoutCue,
  LayoutDashboardIcon as LayoutCue,
  PauseIcon as LayoutPause,
  PauseIcon as LayoutPause,
  LayoutDashboardIcon as LayoutRest,
  LayoutDashboardIcon as LayoutRest,
  LayoutTemplateIcon as LayoutMark,
  LayoutTemplateIcon as LayoutMark,
  LayoutDashboardIcon as LayoutRest,
  LayoutDashboardIcon as LayoutRest,
  LayoutDashboardIcon as LayoutRest,
  AudioLinesIcon as LayoutVoiceBalance,
  LayoutDashboardIcon as LayoutVoiceDuration,
  LayoutTemplateIcon as LayoutVoiceFamily,
  AudioLinesIcon as LayoutVoicePitch,
  LayoutListIcon as LayoutVoiceRange,
  LayoutDashboardIcon as LayoutVoiceRate,
  VoicemailIcon as LayoutVoiceStress,
  VolumeIcon as LayoutVoiceVolume,
  LayoutDashboardIcon as LayoutMarquee,
  LayoutDashboardIcon as LayoutMarquee,
  LayoutDashboardIcon as LayoutMarquee,
  LayoutDashboardIcon as LayoutMarquee,
  LayoutDashboardIcon as LayoutNavigation,
  LayoutDashboardIcon as LayoutNavigation,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollMargin,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  LayoutGridIcon as LayoutScrollPadding,
  ScrollIcon as LayoutScrollbar,
  ScrollIcon as LayoutScrollbar,
  ScrollIcon as LayoutScrollbar,
  ScrollIcon as LayoutOverscrollBehavior,
  ScrollIcon as LayoutOverscrollBehavior,
  ScrollIcon as LayoutOverscrollBehavior,
  ScrollIcon as LayoutOverscrollBehavior,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  ActivityIcon as LayoutTouchAction,
  Bitcoin,
  LandmarkIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { FinancialHealthScore } from "@/components/financial-health-score"
import { SpendingChart } from "@/components/spending-chart"
import { SavingsGoals } from "@/components/savings-goals"
import { CryptoPortfolio } from "@/components/crypto-portfolio"
import { StockPortfolio } from "@/components/stock-portfolio"
import { RewardPoints } from "@/components/reward-points"
import { BudgetOverview } from "@/components/budget-overview"
import { UpcomingBills } from "@/components/upcoming-bills"
import { QuickTransfer } from "@/components/quick-transfer"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Mock data - in a real app this would come from the API
const mockUser = {
  id: "user123",
  fullName: "Ahmed Benali",
  email: "ahmed@example.com",
  wallet: {
    balance: 25000,
    monthlyIncome: 45000,
    monthlyExpenses: 32000,
    savingsGoal: 100000,
    currentSavings: 67000,
    rewardPoints: 1250,
    tier: "Gold",
  },
  financialHealth: {
    score: 78,
    factors: {
      savings: 85,
      spending: 72,
      bills: 90,
      investments: 65,
    },
  },
  investments: {
    stocks: {
      totalValue: 120000,
      dailyChange: 2.3,
      holdings: [
        { symbol: "AAPL", name: "Apple Inc.", value: 45000, change: 1.2 },
        { symbol: "MSFT", name: "Microsoft Corp.", value: 38000, change: 0.8 },
        { symbol: "AMZN", name: "Amazon.com Inc.", value: 37000, change: -0.5 },
      ],
    },
    crypto: {
      totalValue: 35000,
      dailyChange: 5.7,
      holdings: [
        { symbol: "BTC", name: "Bitcoin", value: 20000, change: 4.2 },
        { symbol: "ETH", name: "Ethereum", value: 10000, change: 7.5 },
        { symbol: "SOL", name: "Solana", value: 5000, change: 3.1 },
      ],
    },
  },
}

const mockTransactions = [
  {
    id: "tx1",
    type: "incoming",
    amount: 5000,
    date: new Date().toISOString(),
    from: "Karim",
    to: "Ahmed",
    method: "NFC",
    category: "transfer",
  },
  {
    id: "tx2",
    type: "outgoing",
    amount: 2500,
    date: new Date(Date.now() - 86400000).toISOString(),
    from: "Ahmed",
    to: "Samira",
    method: "QR",
    category: "transfer",
  },
  {
    id: "tx3",
    type: "topup",
    amount: 10000,
    date: new Date(Date.now() - 172800000).toISOString(),
    from: "BaridiMob",
    to: "Ahmed",
    category: "topup",
  },
]

export default function Dashboard() {
  const { t } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(mockUser)
  const [transactions, setTransactions] = useState(mockTransactions)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const quickActions = [
    {
      icon: Send,
      label: t("send"),
      action: () => router.push("/wallet?action=send"),
      color: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
    },
    {
      icon: QrCode,
      label: t("receive"),
      action: () => router.push("/wallet?action=receive"),
      color: "bg-gradient-to-br from-green-400 to-green-600 text-white",
    },
    {
      icon: CreditCard,
      label: t("addFunds"),
      action: () => router.push("/wallet?action=add-funds"),
      color: "bg-gradient-to-br from-purple-400 to-purple-600 text-white",
    },
    {
      icon: Scan,
      label: "Scan & Pay",
      action: () => router.push("/scan"),
      color: "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white",
    },
    {
      icon: Repeat,
      label: "Recurring",
      action: () => router.push("/recurring"),
      color: "bg-gradient-to-br from-amber-400 to-amber-600 text-white",
    },
    {
      icon: Clock,
      label: "Scheduled",
      action: () => router.push("/scheduled"),
      color: "bg-gradient-to-br from-pink-400 to-pink-600 text-white",
    },
  ]

  const serviceCategories = [
    {
      title: "Banking",
      icon: Landmark,
      color: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
      services: [
        { icon: CreditCard, name: "Cards" },
        { icon: Banknote, name: "Loans" },
        { icon: Coins, name: "Savings" },
        { icon: Percent, name: "Interest" },
      ],
    },
    {
      title: "Payments",
      icon: Zap,
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white",
      services: [
        { icon: Smartphone, name: "Mobile" },
        { icon: Wifi, name: "Internet" },
        { icon: Droplets, name: "Water" },
        { icon: Flame, name: "Gas" },
      ],
    },
    {
      title: "Investments",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-green-400 to-green-600 text-white",
      services: [
        { icon: Layers, name: "Stocks" },
        { icon: Bitcoin, name: "Crypto" },
        { icon: LandmarkIcon, name: "Bonds" },
        { icon: Gem, name: "Metals" },
      ],
    },
    {
      title: "Lifestyle",
      icon: ShoppingBag,
      color: "bg-gradient-to-br from-purple-400 to-purple-600 text-white",
      services: [
        { icon: Ticket, name: "Events" },
        { icon: Plane, name: "Travel" },
        { icon: Gift, name: "Gifts" },
        { icon: Coffee, name: "Dining" },
      ],
    },
    {
      title: "Rewards",
      icon: Sparkles,
      color: "bg-gradient-to-br from-pink-400 to-pink-600 text-white",
      services: [
        { icon: Star, name: "Points" },
        { icon: Percent, name: "Cashback" },
        { icon: Gift, name: "Offers" },
        { icon: Award, name: "Loyalty" },
      ],
    },
    {
      title: "Business",
      icon: Briefcase,
      color: "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white",
      services: [
        { icon: Gauge, name: "Analytics" },
        { icon: Megaphone, name: "Marketing" },
        { icon: Lightbulb, name: "Solutions" },
        { icon: Rocket, name: "Growth" },
      ],
    },
  ]

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
        <Header title="home" />

        <main className="flex-1 p-4 space-y-6">
          {/* Welcome Section */}
          <motion.section variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {t("welcomeBack")},{" "}
                  {loading ? <Skeleton className="h-8 w-32 bg-gray-700" /> : user.fullName.split(" ")[0]}
                </h2>
                <div className="flex items-center mt-1">
                  <p className="text-gray-400">{new Date().toLocaleDateString()}</p>
                  <Badge
                    variant="outline"
                    className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-500 border-0 text-black"
                  >
                    {user.wallet.tier} Member
                  </Badge>
                </div>
              </div>
              <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden flex items-center justify-center">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <span className="text-lg font-bold">{user.fullName.charAt(0)}</span>
                )}
              </div>
            </motion.div>
          </motion.section>

          {/* Balance Card */}
          <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-r from-blue-600 to-purple-700 border-0 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-black opacity-10 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/wave-pattern.svg')] bg-no-repeat bg-cover opacity-20"></div>
              </div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm opacity-80">{t("balance")}</p>
                    {loading ? (
                      <Skeleton className="h-8 w-32 bg-white/20" />
                    ) : (
                      <motion.h3
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="text-2xl font-bold"
                      >
                        {formatCurrency(user.wallet.balance, t("dinarSymbol"))}
                      </motion.h3>
                    )}
                  </div>
                  <motion.div
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white/20 p-3 rounded-full"
                  >
                    <Wallet className="h-6 w-6" />
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-xs opacity-80">Monthly Income</p>
                    <p className="font-semibold">{formatCurrency(user.wallet.monthlyIncome, t("dinarSymbol"))}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-xs opacity-80">Monthly Expenses</p>
                    <p className="font-semibold">{formatCurrency(user.wallet.monthlyExpenses, t("dinarSymbol"))}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {quickActions.slice(0, 3).map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
                      onClick={action.action}
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Transfer */}
          <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
            <QuickTransfer />
          </motion.div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full bg-gray-800 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="investments" className="data-[state=active]:bg-green-600">
                Investments
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-purple-600">
                Rewards
              </TabsTrigger>
              <TabsTrigger value="budget" className="data-[state=active]:bg-amber-600">
                Budget
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Financial Health Score */}
              <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.4 }}>
                <FinancialHealthScore score={user.financialHealth.score} factors={user.financialHealth.factors} />
              </motion.div>

              {/* Savings Goals */}
              <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.5 }}>
                <SavingsGoals currentSavings={user.wallet.currentSavings} savingsGoal={user.wallet.savingsGoal} />
              </motion.div>

              {/* Upcoming Bills */}
              <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.6 }}>
                <UpcomingBills />
              </motion.div>
            </TabsContent>

            <TabsContent value="investments" className="space-y-6">
              {/* Stock Portfolio */}
              <motion.div variants={item} initial="hidden" animate="show">
                <StockPortfolio portfolio={user.investments.stocks} />
              </motion.div>

              {/* Crypto Portfolio */}
              <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
                <CryptoPortfolio portfolio={user.investments.crypto} />
              </motion.div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              {/* Reward Points */}
              <motion.div variants={item} initial="hidden" animate="show">
                <RewardPoints points={user.wallet.rewardPoints} tier={user.wallet.tier} />
              </motion.div>
            </TabsContent>

            <TabsContent value="budget" className="space-y-6">
              {/* Budget Overview */}
              <motion.div variants={item} initial="hidden" animate="show">
                <BudgetOverview />
              </motion.div>

              {/* Spending Chart */}
              <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
                <SpendingChart />
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Service Categories */}
          <motion.section variants={container} initial="hidden" animate="show" transition={{ delay: 0.7 }}>
            <motion.div variants={item} className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <Button variant="ghost" size="sm" onClick={() => router.push("/services")} className="text-blue-400">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-3 gap-4">
              {serviceCategories.slice(0, 6).map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center justify-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/services/${category.title.toLowerCase()}`)}
                >
                  <div className={`p-3 rounded-full mb-2 ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-center">{category.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Recent Transactions */}
          <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.8 }}>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">{t("recentTransactions")}</CardTitle>
                <Link href="/history">
                  <Button variant="ghost" size="sm" className="text-blue-400">
                    {t("viewAll")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
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
                ) : transactions.length > 0 ? (
                  <motion.div variants={container} initial="hidden" animate="show">
                    {transactions.map((tx, index) => (
                      <motion.div key={tx.id} variants={item} transition={{ delay: 0.1 * index }}>
                        <TransactionCard {...tx} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="py-8 text-center text-gray-400">
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
