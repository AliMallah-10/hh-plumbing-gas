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
