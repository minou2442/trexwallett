"use client"

import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Zap,
  Smartphone,
  Car,
  Home,
  GraduationCap,
  Heart,
  Plane,
  ShoppingBag,
  Coffee,
  Gamepad2,
  Music,
  Dumbbell,
  Baby,
  PawPrint,
  Wrench,
  Paintbrush,
  Search,
  CreditCard,
  Banknote,
  TrendingUp,
  Shield,
  Gift,
  Users,
  MapPin,
  Calendar,
  Clock,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { useState } from "react"

const allServices = [
  // Utilities & Bills
  { icon: Zap, name: "Electricity", category: "Bills", color: "bg-yellow-100 text-yellow-600" },
  { icon: Home, name: "Water", category: "Bills", color: "bg-blue-100 text-blue-600" },
  { icon: Smartphone, name: "Internet", category: "Bills", color: "bg-purple-100 text-purple-600" },
  { icon: Car, name: "Gas", category: "Bills", color: "bg-red-100 text-red-600" },

  // Mobile & Communication
  { icon: Smartphone, name: "Mobile Recharge", category: "Communication", color: "bg-green-100 text-green-600" },
  { icon: Smartphone, name: "Data Plans", category: "Communication", color: "bg-indigo-100 text-indigo-600" },

  // Transportation
  { icon: Car, name: "Taxi", category: "Transport", color: "bg-orange-100 text-orange-600" },
  { icon: Plane, name: "Flight Booking", category: "Transport", color: "bg-sky-100 text-sky-600" },
  { icon: Car, name: "Car Rental", category: "Transport", color: "bg-gray-100 text-gray-600" },

  // Education
  { icon: GraduationCap, name: "School Fees", category: "Education", color: "bg-teal-100 text-teal-600" },
  { icon: GraduationCap, name: "Online Courses", category: "Education", color: "bg-emerald-100 text-emerald-600" },

  // Healthcare
  { icon: Heart, name: "Health Insurance", category: "Health", color: "bg-pink-100 text-pink-600" },
  { icon: Heart, name: "Medical Bills", category: "Health", color: "bg-rose-100 text-rose-600" },

  // Entertainment
  { icon: Music, name: "Music Streaming", category: "Entertainment", color: "bg-violet-100 text-violet-600" },
  { icon: Gamepad2, name: "Gaming", category: "Entertainment", color: "bg-cyan-100 text-cyan-600" },
  { icon: Coffee, name: "Food Delivery", category: "Entertainment", color: "bg-amber-100 text-amber-600" },

  // Shopping
  { icon: ShoppingBag, name: "Online Shopping", category: "Shopping", color: "bg-lime-100 text-lime-600" },
  { icon: Gift, name: "Gift Cards", category: "Shopping", color: "bg-fuchsia-100 text-fuchsia-600" },

  // Lifestyle
  { icon: Dumbbell, name: "Gym Membership", category: "Lifestyle", color: "bg-stone-100 text-stone-600" },
  { icon: Baby, name: "Childcare", category: "Lifestyle", color: "bg-pink-100 text-pink-600" },
  { icon: PawPrint, name: "Pet Care", category: "Lifestyle", color: "bg-orange-100 text-orange-600" },

  // Home Services
  { icon: Wrench, name: "Maintenance", category: "Home", color: "bg-slate-100 text-slate-600" },
  { icon: Paintbrush, name: "Cleaning", category: "Home", color: "bg-blue-100 text-blue-600" },

  // Financial Services
  { icon: CreditCard, name: "Credit Cards", category: "Financial", color: "bg-red-100 text-red-600" },
  { icon: TrendingUp, name: "Investments", category: "Financial", color: "bg-green-100 text-green-600" },
  { icon: Shield, name: "Insurance", category: "Financial", color: "bg-blue-100 text-blue-600" },
  { icon: Banknote, name: "Loans", category: "Financial", color: "bg-yellow-100 text-yellow-600" },

  // Social
  { icon: Users, name: "Split Bills", category: "Social", color: "bg-purple-100 text-purple-600" },
  { icon: Gift, name: "Send Gifts", category: "Social", color: "bg-pink-100 text-pink-600" },

  // Location Services
  { icon: MapPin, name: "Location Services", category: "Location", color: "bg-red-100 text-red-600" },

  // Time-based Services
  { icon: Calendar, name: "Appointments", category: "Time", color: "bg-indigo-100 text-indigo-600" },
  { icon: Clock, name: "Reminders", category: "Time", color: "bg-gray-100 text-gray-600" },

  // Premium Services
  { icon: Star, name: "Premium Features", category: "Premium", color: "bg-yellow-100 text-yellow-600" },
]

const categories = [
  "All",
  "Bills",
  "Communication",
  "Transport",
  "Education",
  "Health",
  "Entertainment",
  "Shopping",
  "Lifestyle",
  "Home",
  "Financial",
  "Social",
  "Location",
  "Time",
  "Premium",
]

export default function ServicesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredServices = allServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    return matchesSearch && matchesCategory
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
        <Header title="services" />

        <main className="flex-1 p-4">
          {/* Search Bar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search services..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-3 gap-4">
            {filteredServices.map((service, index) => (
              <motion.div key={`${service.name}-${index}`} variants={item}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full mb-3 ${service.color}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-sm">{service.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{service.category}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredServices.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-500">No services found matching your criteria.</p>
            </motion.div>
          )}
        </main>

        <MainNav />
      </div>
    </PageTransition>
  )
}
