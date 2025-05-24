import { type NextRequest, NextResponse } from "next/server"
import { QuoteDatabase } from "@/app/lib/database"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

let supabase: any = null

try {
  if (supabaseUrl && supabaseServiceKey) {
    supabase = createClient(supabaseUrl, supabaseServiceKey)
  }
} catch (error) {
  console.log("Supabase not configured, using local database only")
}

// GET - Fetch single quote
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Try Supabase first if available
    if (supabase) {
      const { data: supabaseQuote, error } = await supabase.from("quotes").select("*").eq("id", params.id).single()

      if (supabaseQuote && !error) {
        return NextResponse.json({ success: true, quote: supabaseQuote })
      }
    }

    // Fallback to local database
    const localQuote = await QuoteDatabase.getQuoteById(params.id)
    if (localQuote) {
      return NextResponse.json({ success: true, quote: localQuote })
    }

    return NextResponse.json({ success: false, error: "Quote not found" }, { status: 404 })
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

    // Try updating in Supabase first (if it's a UUID format and Supabase is available)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.id)

    if (isUUID && supabase) {
      console.log("🔍 ID looks like UUID, trying Supabase...")

      try {
        const { data, error } = await supabase
          .from("quotes")
          .update({
            status: status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", params.id)
          .select()

        if (!error && data && data.length > 0) {
          console.log("✅ Quote updated successfully in Supabase")
          return NextResponse.json({
            success: true,
            message: `Quote status updated to ${status}`,
          })
        } else {
          console.log("⚠️ Supabase update failed or no rows affected:", error)
        }
      } catch (supabaseError) {
        console.log("⚠️ Supabase error:", supabaseError)
      }
    }

    // Fallback to local database
    console.log("🔍 Trying local database...")
    const success = await QuoteDatabase.updateQuoteStatus(params.id, status)
    console.log("📊 Local database update result:", success)

    if (success) {
      console.log("✅ Quote status updated successfully in local database")
      return NextResponse.json({
        success: true,
        message: `Quote status updated to ${status}`,
      })
    } else {
      console.error("❌ Failed to update quote status in both databases")
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
    console.log("🗑️ DELETE request received for quote ID:", params.id)

    // Try deleting from Supabase first (if it's a UUID format and Supabase is available)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.id)

    if (isUUID && supabase) {
      console.log("🔍 ID looks like UUID, trying Supabase...")

      try {
        const { error } = await supabase.from("quotes").delete().eq("id", params.id)

        if (!error) {
          console.log("✅ Quote deleted successfully from Supabase")
          return NextResponse.json({
            success: true,
            message: "Quote deleted successfully",
          })
        } else {
          console.log("⚠️ Supabase delete failed:", error)
        }
      } catch (supabaseError) {
        console.log("⚠️ Supabase error:", supabaseError)
      }
    }

    // Fallback to local database
    const success = await QuoteDatabase.deleteQuote(params.id)

    if (success) {
      console.log("✅ Quote deleted successfully from local database")
      return NextResponse.json({
        success: true,
        message: "Quote deleted successfully",
      })
    } else {
      console.error("❌ Failed to delete quote from both databases")
      return NextResponse.json({ success: false, error: "Failed to delete quote" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error deleting quote:", error)
    return NextResponse.json({ success: false, error: "Failed to delete quote" }, { status: 500 })
  }
}
