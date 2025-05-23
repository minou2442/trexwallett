"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { QrCode, Smartphone, UserRound, Clock, Users, Search, ChevronRight } from "lucide-react"
import { QrScanner } from "./qr-scanner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Mock frequent contacts
const mockContacts = [
  { id: "contact1", name: "Karim", image: "/placeholder.svg?height=40&width=40", initial: "K" },
  { id: "contact2", name: "Samira", image: "/placeholder.svg?height=40&width=40", initial: "S" },
  { id: "contact3", name: "Youcef", image: "/placeholder.svg?height=40&width=40", initial: "Y" },
  { id: "contact4", name: "Fatima", image: "/placeholder.svg?height=40&width=40", initial: "F" },
]

export function TransferForm({ userId, balance }: { userId: string; balance: number }) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState<"manual" | "qr" | "nfc" | "contacts">("manual")
  const [transferType, setTransferType] = useState<"instant" | "scheduled" | "recurring">("instant")
  const [showQrScanner, setShowQrScanner] = useState(false)
  const [formData, setFormData] = useState({
    receiverId: "",
    amount: "",
    note: "",
    scheduleDate: "",
    scheduleTime: "",
    frequency: "weekly",
  })
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMethodChange = (value: string) => {
    setMethod(value as "manual" | "qr" | "nfc" | "contacts")

    if (value === "qr") {
      setShowQrScanner(true)
    } else {
      setShowQrScanner(false)
    }

    // Reset receiver ID when changing methods
    if (value !== "contacts") {
      setSelectedContact(null)
    }
  }

  const handleQrResult = (result: string) => {
    try {
      const data = JSON.parse(result)
      setFormData((prev) => ({ ...prev, receiverId: data.userId || result }))
    } catch (e) {
      setFormData((prev) => ({ ...prev, receiverId: result }))
    }
    setShowQrScanner(false)
  }

  const handleNfcScan = async () => {
    toast({
      title: "NFC Scanning",
      description: "Please bring your device close to the recipient's device",
    })

    // Simulate NFC scanning
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, receiverId: "nfc-user-123" }))
      toast({
        title: "NFC Detected",
        description: "Recipient found via NFC",
      })
    }, 2000)
  }

  const handleContactSelect = (contactId: string) => {
    setSelectedContact(contactId)
    const contact = mockContacts.find((c) => c.id === contactId)
    if (contact) {
      setFormData((prev) => ({ ...prev, receiverId: contact.id }))
    }
  }

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (Number(formData.amount) > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds for this transfer",
        variant: "destructive",
      })
      return
    }

    if (!formData.receiverId) {
      toast({
        title: "Recipient Required",
        description: "Please select or enter a recipient",
        variant: "destructive",
      })
      return
    }

    if (transferType === "scheduled" && (!formData.scheduleDate || !formData.scheduleTime)) {
      toast({
        title: "Schedule Required",
        description: "Please select a date and time for your scheduled transfer",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let successMessage = "Transfer completed successfully"

      if (transferType === "scheduled") {
        successMessage = `Transfer scheduled for ${formData.scheduleDate} at ${formData.scheduleTime}`
      } else if (transferType === "recurring") {
        successMessage = `Recurring transfer set up ${formData.frequency}`
      }

      toast({
        title: "Success",
        description: successMessage,
      })

      // Reset form
      setFormData({
        receiverId: "",
        amount: "",
        note: "",
        scheduleDate: "",
        scheduleTime: "",
        frequency: "weekly",
      })
      setSelectedContact(null)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to complete transfer",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardContent className="pt-6">
        <Tabs defaultValue="instant" onValueChange={(value) => setTransferType(value as any)}>
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-700">
            <TabsTrigger value="instant" className="data-[state=active]:bg-blue-600">
              Instant
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-blue-600">
              <Clock className="mr-2 h-4 w-4" />
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="recurring" className="data-[state=active]:bg-blue-600">
              <Users className="mr-2 h-4 w-4" />
              Recurring
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">{t("transferMethod")}</Label>
              <RadioGroup
                defaultValue="manual"
                value={method}
                onValueChange={handleMethodChange}
                className="grid grid-cols-4 gap-2"
              >
                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="manual" id="manual" className="sr-only" />
                  <Label
                    htmlFor="manual"
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-3 hover:bg-gray-700 ${
                      method === "manual" ? "border-blue-500 bg-blue-500/20" : "border-gray-700"
                    }`}
                  >
                    <UserRound className="mb-1 h-5 w-5" />
                    <span className="text-xs">{t("manual")}</span>
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="qr" id="qr" className="sr-only" />
                  <Label
                    htmlFor="qr"
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-3 hover:bg-gray-700 ${
                      method === "qr" ? "border-blue-500 bg-blue-500/20" : "border-gray-700"
                    }`}
                  >
                    <QrCode className="mb-1 h-5 w-5" />
                    <span className="text-xs">{t("qrCode")}</span>
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="nfc" id="nfc" className="sr-only" />
                  <Label
                    htmlFor="nfc"
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-3 hover:bg-gray-700 ${
                      method === "nfc" ? "border-blue-500 bg-blue-500/20" : "border-gray-700"
                    }`}
                  >
                    <Smartphone className="mb-1 h-5 w-5" />
                    <span className="text-xs">{t("nfc")}</span>
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value="contacts" id="contacts" className="sr-only" />
                  <Label
                    htmlFor="contacts"
                    className={`flex flex-col items-center justify-between rounded-md border-2 p-3 hover:bg-gray-700 ${
                      method === "contacts" ? "border-blue-500 bg-blue-500/20" : "border-gray-700"
                    }`}
                  >
                    <Users className="mb-1 h-5 w-5" />
                    <span className="text-xs">Contacts</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {showQrScanner ? (
              <div className="space-y-2">
                <QrScanner onResult={handleQrResult} onCancel={() => setShowQrScanner(false)} />
              </div>
            ) : method === "nfc" ? (
              <div className="space-y-2 flex flex-col items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNfcScan}
                  className="w-full bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Scan NFC
                </Button>
                {formData.receiverId && (
                  <p className="text-sm text-green-500 mt-2">✓ Recipient detected: {formData.receiverId}</p>
                )}
              </div>
            ) : method === "contacts" ? (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {filteredContacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      whileHover={{ scale: 1.03 }}
                      className={`flex items-center p-2 rounded-lg cursor-pointer ${
                        selectedContact === contact.id
                          ? "bg-blue-500/20 border border-blue-500"
                          : "bg-gray-700 border border-gray-700 hover:bg-gray-600"
                      }`}
                      onClick={() => handleContactSelect(contact.id)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={contact.image || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback className="bg-blue-500 text-white">{contact.initial}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-300">{contact.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="receiverId" className="text-gray-300">
                  {t("recipient")} ID
                </Label>
                <Input
                  id="receiverId"
                  name="receiverId"
                  value={formData.receiverId}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-300">
                {t("amount")} ({t("dinarSymbol")})
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
              />
              <p className="text-sm text-gray-400">
                {t("balance")}: {balance} {t("dinarSymbol")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-gray-300">
                Note (Optional)
              </Label>
              <Input
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="What's this for?"
                className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
              />
            </div>

            <TabsContent value="scheduled" className="space-y-4 mt-4 p-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate" className="text-gray-300">
                    Date
                  </Label>
                  <Input
                    id="scheduleDate"
                    name="scheduleDate"
                    type="date"
                    value={formData.scheduleDate}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleTime" className="text-gray-300">
                    Time
                  </Label>
                  <Input
                    id="scheduleTime"
                    name="scheduleTime"
                    type="time"
                    value={formData.scheduleTime}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-gray-300"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recurring" className="space-y-4 mt-4 p-0">
              <div className="space-y-2">
                <Label className="text-gray-300">Frequency</Label>
                <RadioGroup
                  defaultValue="weekly"
                  value={formData.frequency}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, frequency: value }))}
                  className="grid grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="text-gray-300">
                      Weekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="biweekly" id="biweekly" />
                    <Label htmlFor="biweekly" className="text-gray-300">
                      Bi-weekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="text-gray-300">
                      Monthly
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <>
                    {t("send")}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  )
}
