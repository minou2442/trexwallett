"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, CreditCard, Landmark, Wallet, Smartphone } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function AddFundsForm({ userId }: { userId: string }) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [fundingMethod, setFundingMethod] = useState<"baridimob" | "bank" | "card" | "cash">("baridimob")
  const [formData, setFormData] = useState({
    fullName: "",
    rip: "",
    amount: "",
    transactionId: "",
    accountNumber: "",
    bankName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cashLocation: "",
  })
  const [confirmationImage, setConfirmationImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setConfirmationImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (fundingMethod === "baridimob" && !confirmationImage) {
      toast({
        title: "Error",
        description: "Please upload a confirmation image",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Success",
        description: "Funds added successfully",
      })

      // Reset form
      setFormData({
        fullName: "",
        rip: "",
        amount: "",
        transactionId: "",
        accountNumber: "",
        bankName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvv: "",
        cashLocation: "",
      })
      setConfirmationImage(null)
      setPreviewUrl(null)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add funds",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-300">Funding Method</Label>
            <RadioGroup
              defaultValue="baridimob"
              value={fundingMethod}
              onValueChange={(value) => setFundingMethod(value as any)}
              className="grid grid-cols-4 gap-2"
            >
              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem value="baridimob" id="baridimob" className="sr-only" />
                <Label
                  htmlFor="baridimob"
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-3 hover:bg-gray-700 ${
                    fundingMethod === "baridimob" ? "border-blue-500 bg-blue-500/20" : "border-gray-700"
                  }`}
                >
                  <Smartphone className="mb-1 h-5 w-5" />
                  <span className="text-xs">BaridiMob</span>
                </Label>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem value="bank" id="bank" className="sr-only" />
                <Label
                  htmlFor="bank"
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-3 hover:bg-gray-700 ${
                    fundingMethod === "bank" ? "border-blue-500 bg-blue-500/20" : "border-gray-700"
                  }`}
                >
                  <Landmark className="mb-1 h-5 w-5" />
                  <span className="text-xs">Bank</span>
                </Label>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem value="card" id="card" className="sr-only" />
                <Label
                  htmlFor="card"
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-3 hover:bg-gray-700 ${
                    fundingMethod === "card" ? "border-blue-500 bg-blue-500/20" : "border-gray-700"
                  }`}
                >
                  <CreditCard className="mb-1 h-5 w-5" />
                  <span className="text-xs">Card</span>
                </Label>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem value="cash" id="cash" className="sr-only" />
                <Label
                  htmlFor="cash"
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-3 hover:bg-gray-700 ${
                    fundingMethod === "cash" ? "border-blue-500 bg-blue-500/20" : "border-gray-700"
                  }`}
                >
                  <Wallet className="mb-1 h-5 w-5" />
                  <span className="text-xs">Cash</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fundingMethod === "baridimob" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-300">
                    {t("fullName")}
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rip" className="text-gray-300">
                    {t("ripNumber")}
                  </Label>
                  <Input
                    id="rip"
                    name="rip"
                    value={formData.rip}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transactionId" className="text-gray-300">
                    {t("transactionId")}
                  </Label>
                  <Input
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmationImage" className="text-gray-300">
                    {t("uploadConfirmation")}
                  </Label>
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 bg-gray-700/30">
                    <input
                      id="confirmationImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {previewUrl ? (
                      <div className="relative w-full h-48">
                        <Image
                          src={previewUrl || "/placeholder.svg"}
                          alt="Confirmation"
                          fill
                          className="object-contain"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute bottom-2 right-2 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                          onClick={() => {
                            setConfirmationImage(null)
                            setPreviewUrl(null)
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="confirmationImage"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-400">Click to upload BaridiMob confirmation</span>
                      </label>
                    )}
                  </div>
                </div>
              </>
            )}

            {fundingMethod === "bank" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bankName" className="text-gray-300">
                    Bank Name
                  </Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="text-gray-300">
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

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
                </div>
              </>
            )}

            {fundingMethod === "card" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-gray-300">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry" className="text-gray-300">
                      Expiry Date
                    </Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      required
                      placeholder="MM/YY"
                      className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv" className="text-gray-300">
                      CVV
                    </Label>
                    <Input
                      id="cardCvv"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      required
                      placeholder="123"
                      className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                    />
                  </div>
                </div>

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
                </div>
              </>
            )}

            {fundingMethod === "cash" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-300">
                    {t("fullName")}
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cashLocation" className="text-gray-300">
                    Cash Deposit Location
                  </Label>
                  <Input
                    id="cashLocation"
                    name="cashLocation"
                    value={formData.cashLocation}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-gray-300 placeholder:text-gray-500"
                  />
                </div>

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
                </div>
              </>
            )}

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
                  t("submit")
                )}
              </Button>
            </div>

            {fundingMethod === "baridimob" && (
              <div className="flex items-center justify-center mt-4">
                <Image src="/baridimob-logo.png" alt="BaridiMob Logo" width={120} height={40} className="opacity-70" />
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
