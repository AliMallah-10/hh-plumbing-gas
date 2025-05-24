import { NextResponse } from "next/server"
import { QuoteDatabase } from "@/app/lib/database"

export async function GET() {
  try {
    console.log("Testing database connection...")

    const testResult = await QuoteDatabase.testConnection()

    console.log("Database test result:", testResult)

    return NextResponse.json({
      success: testResult.success,
      message: testResult.message,
      path: testResult.path,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Database test failed: ${error}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
