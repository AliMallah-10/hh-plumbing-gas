import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🧪 Testing basic connection...")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Environment check:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "missing",
    })

    return NextResponse.json({
      success: true,
      message: "Basic test successful!",
      environment: {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey,
        urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "missing",
      },
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
