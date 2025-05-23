"use server"

import { createServerClient } from "./supabase"
import { redirect } from "next/navigation"

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = createServerClient()

  try {
    // Create user in auth.users
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error("Failed to create user")
    }

    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      full_name: fullName,
      email,
    })

    if (profileError) {
      throw new Error(profileError.message)
    }

    // Create wallet for the user
    const { error: walletError } = await supabase.from("wallets").insert({
      user_id: authData.user.id,
      balance: 0,
      currency: "DZD",
    })

    if (walletError) {
      throw new Error(walletError.message)
    }

    return { success: true, user: authData.user }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    }
  }
}

export async function signIn(email: string, password: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, user: data.user }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    }
  }
}

export async function signOut() {
  const supabase = createServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  redirect("/login")
}

export async function getCurrentUser() {
  const supabase = createServerClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    return null
  }

  return user
}
