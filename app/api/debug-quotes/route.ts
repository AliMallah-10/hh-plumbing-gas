import { NextResponse } from "next/server"
import { QuoteDatabase } from "@/app/lib/database"

export async function GET() {
  try {
    const quotes = await QuoteDatabase.getAllQuotes()

    const debugInfo = {
      totalQuotes: quotes.length,
      quotes: quotes.map((quote) => ({
        id: quote.id,
        customerName: quote.customer?.name || "Unknown",
        service: quote.service || "Unknown",
        status: quote.status || "Unknown",
        createdAt: quote.createdAt || "Unknown",
        // Show all properties to see the structure
        allProperties: Object.keys(quote),
      })),
    }

    return NextResponse.json({
      success: true,
      debug: debugInfo,
      rawQuotes: quotes.slice(0, 2), // Show first 2 quotes in full detail
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack",
    })
  }
}
