import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/app/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Direct quote submission starting...")

    const body = await request.json()
    console.log("📦 Received data:", {
      name: body.customer_name,
      email: body.customer_email,
      service: body.service_type,
    })

    // Generate quote reference
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    const quote_reference = `QR-${date}-${random}`

    console.log("🏷️ Generated reference:", quote_reference)

    // Prepare data for insertion
    const quoteData = {
      quote_reference,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      customer_address_line1: body.customer_address_line1,
      customer_address_line2: body.customer_address_line2 || null,
      customer_city: body.customer_city || "London",
      customer_postcode: body.customer_postcode,
      service_type: body.service_type,
      service_subtype: body.service_subtype || null,
      brand: body.brand || null,
      model: body.model || null,
      starting_price: body.starting_price || null,
      status: "New",
    }

    console.log("💾 Inserting quote data...")

    // Insert directly into Supabase
    const { data, error } = await supabase.from("quotes").insert([quoteData]).select().single()

    if (error) {
      console.error("❌ Supabase insert error:", error)
      return NextResponse.json({
        success: false,
        error: "Database insert failed",
        details: error.message,
        code: error.code,
      })
    }

    console.log("✅ Quote created successfully:", data.id)

    return NextResponse.json({
      success: true,
      quote: data,
      message: "Quote created successfully",
    })
  } catch (error) {
    console.error("❌ Direct submission error:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to create quote",
      details: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
