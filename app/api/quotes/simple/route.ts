import { type NextRequest, NextResponse } from "next/server"

// Simple localStorage-based quote storage for testing
export async function POST(request: NextRequest) {
  try {
    console.log("📝 Simple quote submission test")

    const body = await request.json()
    console.log("📦 Received data:", body)

    // Generate a simple ID
    const quoteId = `TEST-${Date.now()}`

    const quote = {
      id: quoteId,
      ...body,
      status: "New",
      createdAt: new Date().toISOString(),
    }

    console.log("✅ Quote processed:", quote)

    return NextResponse.json({
      success: true,
      quote,
      message: "Test quote created successfully",
    })
  } catch (error) {
    console.error("❌ Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
