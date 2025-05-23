"use client"

import { ArrowDownLeft, ArrowUpRight, CreditCard } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useLanguage } from "./language-provider"

interface TransactionProps {
  id: string
  type: "incoming" | "outgoing" | "topup"
  amount: number
  date: string
  from: string
  to: string
  method?: string
  category?: string
}

export function TransactionCard({ type, amount, date, from, to, method, category }: TransactionProps) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="flex items-center">
        <div
          className={`p-3 rounded-full mr-3 ${
            type === "incoming"
              ? "bg-green-500/20 text-green-500"
              : type === "outgoing"
                ? "bg-red-500/20 text-red-500"
                : "bg-blue-500/20 text-blue-500"
          }`}
        >
          {type === "incoming" ? (
            <ArrowDownLeft className="h-5 w-5" />
          ) : type === "outgoing" ? (
            <ArrowUpRight className="h-5 w-5" />
          ) : (
            <CreditCard className="h-5 w-5" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-300">
            {type === "incoming"
              ? `${t("from")} ${from}`
              : type === "outgoing"
                ? `${t("to")} ${to}`
                : `${t("addFundsViaBaridiMob")}`}
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(date)} {method && `• ${method}`}
          </p>
        </div>
      </div>
      <div className={`font-semibold ${type === "incoming" || type === "topup" ? "text-green-500" : "text-red-500"}`}>
        {type === "incoming" || type === "topup" ? "+" : "-"}
        {amount} {t("dinarSymbol")}
      </div>
    </div>
  )
}
