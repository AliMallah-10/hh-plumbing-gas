import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Quote {
  id: string
  quote_reference: string
  created_at: string
  updated_at: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address_line1: string
  customer_address_line2?: string
  customer_city: string
  customer_postcode: string
  service_type: string
  service_subtype?: string
  brand?: string
  model?: string
  starting_price?: number
  status: "New" | "Contacted" | "Quoted" | "Scheduled" | "Completed" | "Cancelled"
  notes?: string
  quote_amount?: number
  scheduled_date?: string
  completion_date?: string
}

// Database operations
export class QuoteService {
  // Generate unique quote reference
  static generateQuoteReference(): string {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `QR-${date}-${random}`
  }

  // Create a new quote
  static async createQuote(quoteData: {
    customer_name: string
    customer_email: string
    customer_phone: string
    customer_address_line1: string
    customer_address_line2?: string
    customer_city?: string
    customer_postcode: string
    service_type: string
    service_subtype?: string
    brand?: string
    model?: string
    starting_price?: number
  }): Promise<{ success: boolean; quote?: Quote; error?: string }> {
    try {
      const quote_reference = this.generateQuoteReference()

      const { data, error } = await supabase
        .from("quotes")
        .insert([
          {
            quote_reference,
            customer_name: quoteData.customer_name,
            customer_email: quoteData.customer_email,
            customer_phone: quoteData.customer_phone,
            customer_address_line1: quoteData.customer_address_line1,
            customer_address_line2: quoteData.customer_address_line2 || null,
            customer_city: quoteData.customer_city || "London",
            customer_postcode: quoteData.customer_postcode,
            service_type: quoteData.service_type,
            service_subtype: quoteData.service_subtype || null,
            brand: quoteData.brand || null,
            model: quoteData.model || null,
            starting_price: quoteData.starting_price || null,
            status: "New",
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("❌ Supabase error creating quote:", error)
        return { success: false, error: error.message }
      }

      console.log("✅ Quote created successfully:", data.quote_reference)
      return { success: true, quote: data }
    } catch (error) {
      console.error("❌ Error creating quote:", error)
      return { success: false, error: "Failed to create quote" }
    }
  }

  // Get all quotes
  static async getAllQuotes(): Promise<{ success: boolean; quotes?: Quote[]; error?: string }> {
    try {
      const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("❌ Supabase error fetching quotes:", error)
        return { success: false, error: error.message }
      }

      console.log("✅ Fetched", data.length, "quotes from Supabase")
      return { success: true, quotes: data }
    } catch (error) {
      console.error("❌ Error fetching quotes:", error)
      return { success: false, error: "Failed to fetch quotes" }
    }
  }

  // Update quote status
  static async updateQuoteStatus(id: string, status: Quote["status"]): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from("quotes").update({ status }).eq("id", id)

      if (error) {
        console.error("❌ Supabase error updating quote status:", error)
        return { success: false, error: error.message }
      }

      console.log("✅ Quote status updated successfully:", id, status)
      return { success: true }
    } catch (error) {
      console.error("❌ Error updating quote status:", error)
      return { success: false, error: "Failed to update quote status" }
    }
  }

  // Delete quote
  static async deleteQuote(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from("quotes").delete().eq("id", id)

      if (error) {
        console.error("❌ Supabase error deleting quote:", error)
        return { success: false, error: error.message }
      }

      console.log("✅ Quote deleted successfully:", id)
      return { success: true }
    } catch (error) {
      console.error("❌ Error deleting quote:", error)
      return { success: false, error: "Failed to delete quote" }
    }
  }

  // Search quotes
  static async searchQuotes(searchTerm: string): Promise<{ success: boolean; quotes?: Quote[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .or(
          `customer_name.ilike.%${searchTerm}%,customer_email.ilike.%${searchTerm}%,customer_phone.ilike.%${searchTerm}%,quote_reference.ilike.%${searchTerm}%,customer_postcode.ilike.%${searchTerm}%`,
        )
        .order("created_at", { ascending: false })

      if (error) {
        console.error("❌ Supabase error searching quotes:", error)
        return { success: false, error: error.message }
      }

      console.log("✅ Found", data.length, "quotes matching search term")
      return { success: true, quotes: data }
    } catch (error) {
      console.error("❌ Error searching quotes:", error)
      return { success: false, error: "Failed to search quotes" }
    }
  }

  // Get quotes by status
  static async getQuotesByStatus(
    status: Quote["status"],
  ): Promise<{ success: boolean; quotes?: Quote[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .eq("status", status)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("❌ Supabase error fetching quotes by status:", error)
        return { success: false, error: error.message }
      }

      console.log("✅ Found", data.length, "quotes with status:", status)
      return { success: true, quotes: data }
    } catch (error) {
      console.error("❌ Error fetching quotes by status:", error)
      return { success: false, error: "Failed to fetch quotes by status" }
    }
  }

  // Get statistics
  static async getStatistics(): Promise<{ success: boolean; stats?: any; error?: string }> {
    try {
      const { data: allQuotes, error } = await supabase.from("quotes").select("status, service_type, created_at")

      if (error) {
        console.error("❌ Supabase error fetching statistics:", error)
        return { success: false, error: error.message }
      }

      const stats = {
        total: allQuotes.length,
        byStatus: {
          New: allQuotes.filter((q) => q.status === "New").length,
          Contacted: allQuotes.filter((q) => q.status === "Contacted").length,
          Quoted: allQuotes.filter((q) => q.status === "Quoted").length,
          Scheduled: allQuotes.filter((q) => q.status === "Scheduled").length,
          Completed: allQuotes.filter((q) => q.status === "Completed").length,
          Cancelled: allQuotes.filter((q) => q.status === "Cancelled").length,
        },
        byService: {} as Record<string, number>,
        recentQuotes: allQuotes.slice(0, 5),
      }

      // Count by service
      allQuotes.forEach((quote) => {
        stats.byService[quote.service_type] = (stats.byService[quote.service_type] || 0) + 1
      })

      console.log("✅ Statistics calculated successfully")
      return { success: true, stats }
    } catch (error) {
      console.error("❌ Error calculating statistics:", error)
      return { success: false, error: "Failed to calculate statistics" }
    }
  }
}
