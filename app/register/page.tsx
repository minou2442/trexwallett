"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"

export default function RegisterPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [idImage, setIdImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setIdImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        })
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        })
        return
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        })
        return
      }
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!idImage) {
      toast({
        title: "Error",
        description: "Please upload an ID image",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("fullName", formData.fullName)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)
      formDataToSend.append("idImage", idImage)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful registration
      toast({
        title: "Success",
        description: "Registration successful",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative h-20 w-20">
              <Image src="/trexbyte-logo.png" alt="TrexByte Logo" fill className="object-contain" />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-gray-800 bg-gray-900 text-white">
              <CardHeader className="border-b border-gray-800 pb-7">
                <CardTitle className="text-red-500 text-2xl">{t("register")}</CardTitle>
                <CardDescription className="text-gray-400">Create your TrexByte wallet account</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {step === 1 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
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
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          {t("email")}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300">
                          {t("password")}
                        </Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-300">
                          {t("confirmPassword")}
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="idImage" className="text-gray-300">
                          {t("uploadID")}
                        </Label>
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-6 bg-gray-800/50">
                          <input
                            id="idImage"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          {previewUrl ? (
                            <div className="relative w-full h-48">
                              <Image src={previewUrl || "/placeholder.svg"} alt="ID" fill className="object-contain" />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="absolute bottom-2 right-2 bg-gray-800 border-gray-700 text-white"
                                onClick={() => {
                                  setIdImage(null)
                                  setPreviewUrl(null)
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          ) : (
                            <label
                              htmlFor="idImage"
                              className="flex flex-col items-center justify-center cursor-pointer"
                            >
                              <Upload className="h-10 w-10 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-400">Click to upload ID document</span>
                            </label>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between pt-4">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                        className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                      >
                        Back
                      </Button>
                    )}

                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="ml-auto bg-red-600 hover:bg-red-700 text-white"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="ml-auto bg-red-600 hover:bg-red-700 text-white"
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
                          t("register")
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Button variant="link" className="p-0 h-auto text-red-500" onClick={() => router.push("/login")}>
                    Return to login
                  </Button>
                </p>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <div className="flex items-center space-x-4">
              <div className="relative h-8 w-20">
                <Image src="/baridimob-logo.png" alt="BaridiMob Logo" fill className="object-contain opacity-50" />
              </div>
              <div className="h-6 border-l border-gray-700"></div>
              <div className="relative h-8 w-8">
                <Image src="/trexbyte-logo.png" alt="TrexByte Logo" fill className="object-contain opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
