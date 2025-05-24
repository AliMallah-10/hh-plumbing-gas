import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("🔍 Environment check:")
    console.log("Supabase URL:", supabaseUrl ? "✅ Set" : "❌ Missing")
    console.log("Supabase Key:", supabaseAnonKey ? "✅ Set" : "❌ Missing")

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
        details: {
          url: !!supabaseUrl,
          key: !!supabaseAnonKey,
        },
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data, error, count } = await supabase.from("quotes").select("*", { count: "exact" }).limit(5)

    return NextResponse.json({
      success: true,
      message: "Connection successful",
      count,
      sampleQuotes: data?.slice(0, 2) || [],
      error: error?.message || null,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
