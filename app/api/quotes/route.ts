import { type NextRequest, NextResponse } from "next/server"
import { QuoteDatabase, type DatabaseQuote } from "@/app/lib/database"

// GET - Fetch all quotes or search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    let quotes: DatabaseQuote[]

    if (search) {
      quotes = await QuoteDatabase.searchQuotes(search)
    } else if (status && status !== "All") {
      quotes = await QuoteDatabase.getQuotesByStatus(status as DatabaseQuote["status"])
    } else if (startDate && endDate) {
      quotes = await QuoteDatabase.getQuotesByDateRange(startDate, endDate)
    } else {
      quotes = await QuoteDatabase.getAllQuotes()
    }

    return NextResponse.json({
      success: true,
      quotes,
      count: quotes.length,
    })
  } catch (error) {
    console.error("Error fetching quotes:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch quotes" }, { status: 500 })
  }
}

// POST - Create new quote
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "address", "postcode", "serviceType"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Format quote data
    const quoteData = {
      date: new Date().toISOString(),
      customer: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: {
          line1: body.address,
          line2: body.address2 || "",
          city: body.city || "London",
          postcode: body.postcode,
        },
      },
      service: body.serviceType,
      type: body.type || "",
      option: body.brand || body.model || "",
      price: body.startingPrice ? `Starting from £${body.startingPrice}` : "TBD",
      status: "New" as const,
    }

    const newQuote = await QuoteDatabase.createQuote(quoteData)

    if (newQuote) {
      return NextResponse.json({
        success: true,
        quote: newQuote,
        message: "Quote created successfully",
      })
    } else {
      return NextResponse.json({ success: false, error: "Failed to create quote" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error creating quote:", error)
    return NextResponse.json({ success: false, error: "Failed to create quote" }, { status: 500 })
  }
}
