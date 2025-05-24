import { NextResponse } from "next/server"

import { supabase } from "@/app/lib/supabase"

export async function GET(request: Request) {
  try {
    const { data: users, error } = await supabase.from("users").select("*")

    if (error) {
      console.error("Error fetching users:", error)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
