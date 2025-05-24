import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Creating new quote...")

    const body = await request.json()
    console.log("📦 Received data:", body)

    // Generate quote reference
    const today = new Date()
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "")
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
    const quoteReference = `QR-${dateStr}-${randomStr}`

    // Prepare quote data
    const quoteData = {
      quote_reference: quoteReference,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      customer_address_line1: body.customer_address_line1,
      customer_postcode: body.customer_postcode,
      service_type: body.service_type,
      service_subtype: body.service_subtype,
      brand: body.brand,
      model: body.model,
      starting_price: body.starting_price,
      status: "New",
    }

    console.log("💾 Inserting quote:", quoteData)

    // Insert into Supabase
    const { data, error } = await supabase.from("quotes").insert([quoteData]).select().single()

    if (error) {
      console.error("❌ Database error:", error)
      return NextResponse.json({
        success: false,
        error: `Database error: ${error.message}`,
        details: error,
      })
    }

    console.log("✅ Quote created successfully:", data.quote_reference)

    return NextResponse.json({
      success: true,
      quote: data,
      message: "Quote created successfully",
    })
  } catch (error) {
    console.error("❌ API Error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

export async function GET() {
  try {
    console.log("📋 Fetching quotes...")

    const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Error fetching quotes:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
      })
    }

    return NextResponse.json({
      success: true,
      quotes: data || [],
    })
  } catch (error) {
    console.error("❌ API Error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
