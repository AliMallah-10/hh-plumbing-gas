import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    console.log("🧪 Testing Supabase connection...")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Environment check:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "missing",
    })

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: "Missing Supabase environment variables",
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey,
        },
      })
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test connection
    const { data, error } = await supabase.from("quotes").select("count", { count: "exact", head: true })

    if (error) {
      console.error("❌ Connection test failed:", error)
      return NextResponse.json({
        success: false,
        error: "Database connection failed",
        details: error,
      })
    }

    console.log("✅ Connection test passed")

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful!",
      quoteCount: data,
    })
  } catch (error) {
    console.error("❌ Test failed:", error)
    return NextResponse.json({
      success: false,
      error: "Test failed with exception",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
