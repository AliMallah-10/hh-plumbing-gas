"use client"

import { useState, useEffect, useCallback } from "react"
import type { DatabaseQuote } from "@/app/lib/database"

export function useQuotes() {
  const [quotes, setQuotes] = useState<DatabaseQuote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load quotes from API
  const loadQuotes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/quotes")
      const result = await response.json()

      if (result.success) {
        setQuotes(result.quotes || [])
      } else {
        setError(result.error || "Failed to load quotes")
      }
    } catch (err) {
      console.error("Error loading quotes:", err)
      setError("Network error while loading quotes")
    } finally {
      setLoading(false)
    }
  }, [])

  // Update quote status
  const updateQuoteStatus = useCallback(async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      const result = await response.json()

      if (result.success) {
        // Update local state
        setQuotes((prev) =>
          prev.map((quote) => (quote.id === id ? { ...quote, status: status as DatabaseQuote["status"] } : quote)),
        )
        return true
      } else {
        setError(result.error || "Failed to update quote status")
        return false
      }
    } catch (err) {
      console.error("Error updating quote status:", err)
      setError("Network error while updating quote")
      return false
    }
  }, [])

  // Delete quote
  const deleteQuote = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        // Update local state
        setQuotes((prev) => prev.filter((quote) => quote.id !== id))
        return true
      } else {
        setError(result.error || "Failed to delete quote")
        return false
      }
    } catch (err) {
      console.error("Error deleting quote:", err)
      setError("Network error while deleting quote")
      return false
    }
  }, [])

  // Load quotes on mount
  useEffect(() => {
    loadQuotes()
  }, [loadQuotes])

  return {
    quotes,
    loading,
    error,
    loadQuotes,
    updateQuoteStatus,
    deleteQuote,
  }
}
