"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "./language-provider"
import Image from "next/image"
import { Wifi } from "lucide-react"

interface WalletCardProps {
  fullName: string
  cardNumber: string
  expDate: string
  psv: string
  bankName?: string
  cardType?: "visa" | "mastercard" | "amex" | "discover" | "trexbyte"
}

export function WalletCard({
  fullName,
  cardNumber,
  expDate,
  psv,
  bankName = "TrexByte",
  cardType = "trexbyte",
}: WalletCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})/g, "$1 ").trim()
  }

  // Get card logo based on card type
  const getCardLogo = () => {
    switch (cardType) {
      case "visa":
        return <div className="text-white font-bold italic text-2xl tracking-tighter">VISA</div>
      case "mastercard":
        return (
          <div className="flex">
            <div className="w-8 h-8 bg-red-500 rounded-full opacity-80 -mr-3"></div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-80"></div>
          </div>
        )
      case "amex":
        return (
          <div className="text-white font-bold text-sm">
            AMERICAN
            <br />
            EXPRESS
          </div>
        )
      case "discover":
        return <div className="text-white font-bold text-xl">Discover</div>
      default:
        return (
          <div className="relative h-10 w-10">
            <Image src="/trexbyte-logo.png" alt="TrexByte Logo" fill className="object-contain" />
          </div>
        )
    }
  }

  // Get card background based on card type
  const getCardBackground = () => {
    switch (cardType) {
      case "visa":
        return "from-blue-700 via-blue-800 to-blue-900"
      case "mastercard":
        return "from-orange-600 via-red-600 to-red-700"
      case "amex":
        return "from-green-600 via-green-700 to-green-800"
      case "discover":
        return "from-orange-500 via-orange-600 to-orange-700"
      default:
        return "from-indigo-600 via-purple-600 to-blue-700"
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative w-full h-56 cursor-pointer perspective" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl p-6 shadow-xl bg-gradient-to-br ${getCardBackground()} overflow-hidden`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 z-0">
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
                backgroundSize: "200% 200%",
              }}
            />
            <div className="absolute inset-0 bg-[url('/card-pattern.svg')] bg-no-repeat bg-cover opacity-5"></div>
          </div>

          {/* Card chip and contactless */}
          <div className="flex justify-between items-start relative z-10 mb-6">
            <div className="flex flex-col">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {getCardLogo()}
              </motion.div>
              <p className="text-xs text-gray-200 mt-1">{bankName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-6 bg-yellow-500 bg-opacity-80 rounded-md flex items-center justify-center">
                <div className="w-6 h-4 bg-yellow-600 bg-opacity-80 rounded-sm flex flex-col justify-between p-0.5">
                  <div className="w-full h-0.5 bg-yellow-300 bg-opacity-80"></div>
                  <div className="w-full h-0.5 bg-yellow-300 bg-opacity-80"></div>
                </div>
              </div>
              <Wifi className="h-5 w-5 text-white opacity-80" />
            </div>
          </div>

          {/* Card number */}
          <div className="mt-4 relative z-10">
            <motion.p
              className="text-white text-xl font-mono tracking-wider"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {formatCardNumber(cardNumber)}
            </motion.p>
          </div>

          {/* Card holder and expiry */}
          <div className="mt-6 flex justify-between relative z-10">
            <div>
              <p className="text-gray-300 text-xs mb-1">{t("fullName")}</p>
              <motion.p
                className="text-white font-medium"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {fullName}
              </motion.p>
            </div>
            <div>
              <p className="text-gray-300 text-xs mb-1">{t("expiryDate")}</p>
              <motion.p
                className="text-white"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {expDate}
              </motion.p>
            </div>
          </div>

          <motion.p
            className="absolute bottom-4 right-6 text-xs text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t("tapToFlip")}
          </motion.p>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-2xl p-6 shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 rotateY-180 overflow-hidden`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 z-0">
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
                backgroundSize: "200% 200%",
              }}
            />
          </div>

          {/* Magnetic stripe */}
          <div className="w-full h-12 bg-black mt-4 relative z-10"></div>

          {/* Signature strip */}
          <div className="mt-8 flex justify-end relative z-10">
            <motion.div
              className="bg-white p-3 rounded w-3/4"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <p className="text-black text-xs">{t("psvCode")}</p>
                <p className="text-black font-mono font-bold">{psv}</p>
              </div>
            </motion.div>
          </div>

          {/* Card issuer info */}
          <div className="mt-12 flex flex-col items-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative h-10 w-10 mb-2"
            >
              <Image src="/trexbyte-logo.png" alt="TrexByte Logo" fill className="object-contain" />
            </motion.div>
            <motion.p
              className="text-xs text-gray-300 text-center max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              This card is property of {bankName}. If found, please return to the nearest {bankName} office.
            </motion.p>
          </div>

          <motion.p
            className="absolute bottom-4 right-6 text-xs text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t("tapToFlip")}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
