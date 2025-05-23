"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Gift, Award, Star, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface RewardPointsProps {
  points: number
  tier: string
}

export function RewardPoints({ points, tier }: RewardPointsProps) {
  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "platinum":
        return "from-slate-400 to-slate-600"
      case "gold":
        return "from-amber-400 to-amber-600"
      case "silver":
        return "from-gray-300 to-gray-500"
      default:
        return "from-blue-400 to-blue-600"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "platinum":
        return <Award className="h-6 w-6" />
      case "gold":
        return <Star className="h-6 w-6" />
      case "silver":
        return <Award className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  const nextTier = tier.toLowerCase() === "gold" ? "Platinum" : tier.toLowerCase() === "silver" ? "Gold" : "Diamond"
  const pointsToNextTier =
    tier.toLowerCase() === "gold" ? 2000 - points : tier.toLowerCase() === "silver" ? 1000 - points : 3000 - points
  const progressToNextTier =
    tier.toLowerCase() === "gold"
      ? (points / 2000) * 100
      : tier.toLowerCase() === "silver"
        ? (points / 1000) * 100
        : (points / 3000) * 100

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-white">
          <Gift className="mr-2 h-5 w-5 text-purple-500" />
          Reward Points
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className={`p-4 rounded-full bg-gradient-to-br ${getTierColor(tier)} mb-3`}>{getTierIcon(tier)}</div>
          <h3 className="text-xl font-bold text-white">{tier} Member</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">{points}</p>
          <p className="text-sm text-gray-400">Available Points</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Progress to {nextTier}</span>
            <span className="text-sm font-medium text-gray-300">{pointsToNextTier} points needed</span>
          </div>

          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }}>
            <Progress value={progressToNextTier} className="h-3 bg-gray-700" indicatorClassName="bg-purple-500" />
          </motion.div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
              <Gift className="mr-2 h-4 w-4" />
              Redeem
            </Button>
            <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
              <Star className="mr-2 h-4 w-4" />
              Benefits
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
