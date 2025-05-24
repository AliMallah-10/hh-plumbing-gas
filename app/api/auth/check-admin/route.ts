import { supabase } from "@/app/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ isAdmin: false })
    }

    const { data, error } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    if (error) {
      console.error("Error fetching profile:", error)
      return NextResponse.json({ isAdmin: false })
    }

    if (!data) {
      return NextResponse.json({ isAdmin: false })
    }

    return NextResponse.json({ isAdmin: data.is_admin || false })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ isAdmin: false })
  }
}
