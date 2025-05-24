import { type NextRequest, NextResponse } from "next/server"
import { QuoteDatabase } from "@/app/lib/database"

// GET - Fetch single quote
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quote = await QuoteDatabase.getQuoteById(params.id)

    if (quote) {
      return NextResponse.json({ success: true, quote })
    } else {
      return NextResponse.json({ success: false, error: "Quote not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching quote:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch quote" }, { status: 500 })
  }
}

// PATCH - Update quote status
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("🔄 PATCH request received for quote ID:", params.id)

    const body = await request.json()
    console.log("📦 Request body:", body)

    const { status } = body

    if (!status) {
      console.error("❌ No status provided in request")
      return NextResponse.json({ success: false, error: "Status is required" }, { status: 400 })
    }

    const validStatuses = ["New", "Contacted", "Quoted", "Scheduled", "Completed", "Cancelled"]
    if (!validStatuses.includes(status)) {
      console.error("❌ Invalid status:", status)
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 })
    }

    console.log("✅ Valid status provided:", status)
    console.log("🔍 Attempting to update quote with ID:", params.id)

    const success = await QuoteDatabase.updateQuoteStatus(params.id, status)
    console.log("📊 Update result:", success)

    if (success) {
      console.log("✅ Quote status updated successfully")
      return NextResponse.json({
        success: true,
        message: `Quote status updated to ${status}`,
      })
    } else {
      console.error("❌ Failed to update quote status - quote not found or update failed")
      return NextResponse.json({ success: false, error: "Quote not found or update failed" }, { status: 404 })
    }
  } catch (error) {
    console.error("❌ Error updating quote:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    })
    return NextResponse.json({ success: false, error: "Failed to update quote" }, { status: 500 })
  }
}

// DELETE - Delete quote
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await QuoteDatabase.deleteQuote(params.id)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Quote deleted successfully",
      })
    } else {
      return NextResponse.json({ success: false, error: "Failed to delete quote" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error deleting quote:", error)
    return NextResponse.json({ success: false, error: "Failed to delete quote" }, { status: 500 })
  }
}
