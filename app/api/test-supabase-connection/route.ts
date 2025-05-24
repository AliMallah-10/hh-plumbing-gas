import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    console.log("🧪 Testing Supabase connection...")

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    console.log("Creating Supabase client...")
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    console.log("Testing database connection...")

    // Try to query the quotes table
    const { data, error, count } = await supabase.from("quotes").select("*", { count: "exact" }).limit(1)

    if (error) {
      console.error("❌ Supabase query error:", error)
      return NextResponse.json({
        success: false,
        error: "Database query failed",
        details: error.message,
        code: error.code,
      })
    }

    console.log("✅ Supabase connection successful!")
    console.log("Data sample:", data)
    console.log("Total count:", count)

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful!",
      tableExists: true,
      recordCount: count,
      sampleData: data,
    })
  } catch (error) {
    console.error("❌ Connection test failed:", error)
    return NextResponse.json({
      success: false,
      error: "Connection test failed",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
