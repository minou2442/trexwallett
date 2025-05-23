"use client"

import type { LucideIcon } from "lucide-react"

interface QuickActionButtonProps {
  icon: LucideIcon
  label: string
  onClick: () => void
}

export function QuickActionButton({ icon: Icon, label, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
    >
      <div className="p-3 bg-red-100 text-red-600 rounded-full mb-2">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
