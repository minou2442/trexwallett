"use server"

import { createServerClient } from "./supabase"
import { getCurrentUser } from "./auth"

export async function getWalletData() {
  const supabase = createServerClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  try {
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError) {
      throw new Error(profileError.message)
    }

    // Get wallet data
    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (walletError) {
      throw new Error(walletError.message)
    }

    // Get cards
    const { data: cards, error: cardsError } = await supabase.from("cards").select("*").eq("wallet_id", wallet.id)

    if (cardsError) {
      throw new Error(cardsError.message)
    }

    // Get recent transactions
    const { data: transactions, error: transactionsError } = await supabase
      .from("transactions")
      .select("*")
      .eq("wallet_id", wallet.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (transactionsError) {
      throw new Error(transactionsError.message)
    }

    return {
      profile,
      wallet,
      cards: cards || [],
      transactions: transactions || [],
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch wallet data")
  }
}

export async function updateWalletBalance(amount: number, type: "add" | "subtract") {
  const supabase = createServerClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  try {
    // Get current wallet
    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user.id)
      .single()

    if (walletError) {
      throw new Error(walletError.message)
    }

    const newBalance = type === "add" ? Number(wallet.balance) + amount : Number(wallet.balance) - amount

    if (newBalance < 0) {
      throw new Error("Insufficient funds")
    }

    // Update wallet balance
    const { error: updateError } = await supabase
      .from("wallets")
      .update({
        balance: newBalance,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)

    if (updateError) {
      throw new Error(updateError.message)
    }

    return { success: true, newBalance }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update balance",
    }
  }
}

export async function createTransaction(transactionData: {
  type: string
  amount: number
  toUserId?: string
  fromUserId?: string
  method?: string
  category?: string
  merchant?: string
  location?: string
  note?: string
}) {
  const supabase = createServerClient()
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  try {
    // Get wallet ID
    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (walletError) {
      throw new Error(walletError.message)
    }

    // Create transaction
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        wallet_id: wallet.id,
        type: transactionData.type,
        amount: transactionData.amount,
        from_user_id: transactionData.fromUserId || user.id,
        to_user_id: transactionData.toUserId,
        method: transactionData.method,
        category: transactionData.category,
        merchant: transactionData.merchant,
        location: transactionData.location,
        note: transactionData.note,
        status: "completed",
      })
      .select()
      .single()

    if (transactionError) {
      throw new Error(transactionError.message)
    }

    return { success: true, transaction }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create transaction",
    }
  }
}
