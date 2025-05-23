"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { QrCode, Smartphone, Copy, Check, Share2, Download } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export function ReceiveMoney({ userId }: { userId: string }) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("qr")
  const [copied, setCopied] = useState(false)
  const [qrLoaded, setQrLoaded] = useState(false)

  // Generate a more realistic QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    JSON.stringify({ userId, app: "TrexByte", timestamp: Date.now() }),
  )}`

  useEffect(() => {
    // Simulate QR code loading
    const timer = setTimeout(() => {
      setQrLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(userId)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Your wallet ID has been copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNfcShare = () => {
    // This would be implemented with actual NFC API in a real app
    toast({
      title: "NFC sharing initiated",
      description: "Please keep your device ready for NFC transfer",
    })
  }

  const handleDownloadQR = () => {
    // Create a temporary link to download the QR code
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = "trexbyte-wallet-qr.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "QR Code Downloaded",
      description: "Your QR code has been downloaded successfully",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "TrexByte Wallet ID",
          text: `Send money to my TrexByte Wallet: ${userId}`,
          url: `https://trexbyte.com/pay?id=${userId}`,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your device doesn't support the Web Share API",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardContent className="pt-6">
        <Tabs defaultValue="qr" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4 bg-gray-700">
            <TabsTrigger value="qr" className="data-[state=active]:bg-blue-600">
              <QrCode className="mr-2 h-4 w-4" />
              {t("qrCode")}
            </TabsTrigger>
            <TabsTrigger value="nfc" className="data-[state=active]:bg-blue-600">
              <Smartphone className="mr-2 h-4 w-4" />
              {t("nfc")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qr" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg mb-4 border-2 border-gray-700 relative overflow-hidden">
              {!qrLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: qrLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="w-48 h-48 relative"
              >
                <img
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                  onLoad={() => setQrLoaded(true)}
                />
              </motion.div>
            </div>
            <p className="text-sm text-gray-300 mb-2">{t("scanQR")}</p>
            <div className="flex items-center justify-between w-full mt-2 p-2 bg-gray-700 rounded">
              <span className="text-sm font-mono truncate max-w-[180px] text-gray-300">{userId}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="ml-2 text-gray-300 hover:text-white hover:bg-gray-600"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                onClick={handleDownloadQR}
              >
                <Download className="mr-2 h-4 w-4" />
                Download QR
              </Button>
              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="nfc" className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-full mb-4 relative"
            >
              <Smartphone className="h-16 w-16 text-white" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="absolute inset-0 bg-blue-500 rounded-full -z-10"
              />
            </motion.div>
            <p className="text-sm text-gray-300 mb-4 text-center">
              Tap another device to share your payment information via NFC
            </p>
            <Button
              onClick={handleNfcShare}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            >
              {t("share")} NFC
            </Button>

            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg text-sm text-gray-300">
              <p className="mb-2 font-medium">How to use NFC:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Enable NFC on both devices</li>
                <li>Press the Share NFC button</li>
                <li>Hold devices back-to-back</li>
                <li>Wait for confirmation sound</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
