"use client"

import { useState, useEffect, useCallback } from "react"
import { QuoteService, type Quote } from "@/app/lib/supabase"

export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load quotes from Supabase
  const loadQuotes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await QuoteService.getAllQuotes()

      if (result.success && result.quotes) {
        setQuotes(result.quotes)
        console.log("✅ Loaded", result.quotes.length, "quotes from Supabase")
      } else {
        setError(result.error || "Failed to load quotes")
        console.error("❌ Error loading quotes:", result.error)
      }
    } catch (err) {
      console.error("❌ Error loading quotes:", err)
      setError("Network error while loading quotes")
    } finally {
      setLoading(false)
    }
  }, [])

  // Update quote status
  const updateQuoteStatus = useCallback(async (id: string, status: Quote["status"]) => {
    try {
      const result = await QuoteService.updateQuoteStatus(id, status)

      if (result.success) {
        // Update local state
        setQuotes((prev) =>
          prev.map((quote) => (quote.id === id ? { ...quote, status, updated_at: new Date().toISOString() } : quote)),
        )
        console.log(`✅ Updated quote ${id} status to ${status}`)
        return true
      } else {
        setError(result.error || "Failed to update quote status")
        console.error("❌ Error updating quote status:", result.error)
        return false
      }
    } catch (err) {
      console.error("❌ Error updating quote status:", err)
      setError("Network error while updating quote")
      return false
    }
  }, [])

  // Delete quote
  const deleteQuote = useCallback(async (id: string) => {
    try {
      const result = await QuoteService.deleteQuote(id)

      if (result.success) {
        // Update local state
        setQuotes((prev) => prev.filter((quote) => quote.id !== id))
        console.log(`✅ Deleted quote ${id}`)
        return true
      } else {
        setError(result.error || "Failed to delete quote")
        console.error("❌ Error deleting quote:", result.error)
        return false
      }
    } catch (err) {
      console.error("❌ Error deleting quote:", err)
      setError("Network error while deleting quote")
      return false
    }
  }, [])

  // Refresh quotes
  const refreshQuotes = useCallback(() => {
    loadQuotes()
  }, [loadQuotes])

  // Load quotes on mount
  useEffect(() => {
    loadQuotes()
  }, [loadQuotes])

  return {
    quotes,
    loading,
    error,
    updateQuoteStatus,
    deleteQuote,
    refreshQuotes,
  }
}
