import { type NextRequest, NextResponse } from "next/server"
import { QuoteDatabase } from "@/app/lib/database"

// GET: Return all quotes
export async function GET(request: NextRequest) {
  try {
    const quotes = await QuoteDatabase.getAllQuotes()
    return NextResponse.json({
      success: true,
      quotes,
    })
  } catch (error) {
    console.error("❌ Failed to fetch quotes:", error)
    return NextResponse.json(
      { success: false, error: "Failed to load quotes" },
      { status: 500 }
    )
  }
}
