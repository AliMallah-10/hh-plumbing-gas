import { NextResponse } from "next/server"
import { QuoteDatabase } from "@/app/lib/database"

// GET - Fetch database statistics
export async function GET() {
  try {
    const stats = await QuoteDatabase.getStatistics()

    if (stats) {
      return NextResponse.json({ success: true, stats })
    } else {
      return NextResponse.json({ success: false, error: "Failed to fetch statistics" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch statistics" }, { status: 500 })
  }
}
