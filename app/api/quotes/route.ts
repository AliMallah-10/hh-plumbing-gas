import { NextResponse } from "next/server"
import { supabase } from "@/app/lib/supabase"

export async function GET() {
  try {
    console.log("GET /api/quotes called")

    const { data: quotes, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    console.log("Raw quotes from Supabase:", quotes)
    console.log("First quote structure:", quotes?.[0])

    return NextResponse.json({
      success: true,
      quotes: quotes || [],
    })
  } catch (error) {
    console.error("Error fetching quotes:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch quotes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("POST /api/quotes called with:", body)

    // Generate quote reference
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    const quote_reference = `QR-${date}-${random}`

    const { data, error } = await supabase
      .from("quotes")
      .insert([
        {
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
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error creating quote:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    console.log("Quote created successfully:", data.quote_reference)
    return NextResponse.json({ success: true, quote: data })
  } catch (error) {
    console.error("Error creating quote:", error)
    return NextResponse.json({ success: false, error: "Failed to create quote" }, { status: 500 })
  }
}
