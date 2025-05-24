import type { DatabaseQuote } from "@/app/lib/database"

// API client for quote operations
export class QuoteAPI {
  private static baseUrl = "/api/quotes"

  // Create a new quote
  static async createQuote(quoteData: any): Promise<{ success: boolean; quote?: DatabaseQuote; error?: string }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error creating quote:", error)
      return { success: false, error: "Network error" }
    }
  }

  // Get all quotes with optional filters
  static async getQuotes(filters?: {
    search?: string
    status?: string
    startDate?: string
    endDate?: string
  }): Promise<{ success: boolean; quotes?: DatabaseQuote[]; error?: string }> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append("search", filters.search)
      if (filters?.status) params.append("status", filters.status)
      if (filters?.startDate) params.append("startDate", filters.startDate)
      if (filters?.endDate) params.append("endDate", filters.endDate)

      const url = params.toString() ? `${this.baseUrl}?${params}` : this.baseUrl
      const response = await fetch(url)
      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error fetching quotes:", error)
      return { success: false, error: "Network error" }
    }
  }

  // Get single quote by ID
  static async getQuote(id: string): Promise<{ success: boolean; quote?: DatabaseQuote; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`)
      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error fetching quote:", error)
      return { success: false, error: "Network error" }
    }
  }

  // Update quote status
  static async updateQuoteStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error updating quote status:", error)
      return { success: false, error: "Network error" }
    }
  }

  // Delete quote
  static async deleteQuote(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error deleting quote:", error)
      return { success: false, error: "Network error" }
    }
  }

  // Get statistics
  static async getStatistics(): Promise<{ success: boolean; stats?: any; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`)
      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error fetching statistics:", error)
      return { success: false, error: "Network error" }
    }
  }
}
