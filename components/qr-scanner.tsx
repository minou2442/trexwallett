"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"
import { X } from "lucide-react"

interface QrScannerProps {
  onResult: (result: string) => void
  onCancel: () => void
}

export function QrScanner({ onResult, onCancel }: QrScannerProps) {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        // Simulate QR code detection after 3 seconds
        setTimeout(() => {
          onResult("qr-user-456")
        }, 3000)
      } catch (err) {
        setError("Failed to access camera. Please check permissions.")
        console.error(err)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [onResult])

  return (
    <div className="relative">
      <div className="relative rounded-lg overflow-hidden bg-black aspect-square">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white p-4 text-center">{error}</div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-2 border-white/50 rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 border-2 border-red-500 rounded-lg">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500 rounded-tl" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500 rounded-tr" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500 rounded-bl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500 rounded-br" />
              </div>
            </div>
          </>
        )}
      </div>

      <p className="text-center text-sm mt-2">{t("scanQR")}</p>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-black/50 text-white rounded-full"
        onClick={onCancel}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
