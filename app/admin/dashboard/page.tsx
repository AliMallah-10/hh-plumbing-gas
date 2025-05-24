"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

// Define the base URL - this is the only fix needed
const BASE_URL = "https://v0-fork-of-hh-plumbing-website.vercel.app"

export default function DashboardPage() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Fetch quote count
  const getQuoteCount = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/quotes/count`, { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setCount(data.count || 0)
      }
    } catch (error) {
      console.error("Error fetching quote count:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refresh quotes
  const refreshQuotes = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/refresh-quotes`, { cache: "no-store" })
      if (res.ok) {
        alert("Quotes refreshed!")
        // Refresh the count
        getQuoteCount()
      } else {
        alert("Failed to refresh quotes")
      }
    } catch (error) {
      console.error("Error refreshing quotes:", error)
      alert("Failed to refresh quotes")
    }
  }, [getQuoteCount])

  // Debug database
  const debugDatabase = useCallback(async () => {
    try {
      console.log("🔍 Debugging database contents...")

      // Check what's in the API
      const response = await fetch(`${BASE_URL}/api/quotes`)
      const data = await response.json()

      console.log("📊 API Response:", data)
      console.log("📊 Quotes count:", data.quotes?.length || 0)

      if (data.quotes && data.quotes.length > 0) {
        console.log("📋 First quote structure:", data.quotes[0])
        console.log(
          "📋 Quote IDs in database:",
          data.quotes.map((q) => ({
            id: q.id,
            quote_reference: q.quote_reference,
            customer_name: q.customer_name,
          })),
        )
      }

      alert(`Found ${data.quotes?.length || 0} quotes in database. Check console for details.`)
    } catch (error) {
      console.error("❌ Debug error:", error)
      alert("Debug failed - check console")
    }
  }, [])

  // Debug database via debug endpoint
  const debugDatabaseEndpoint = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/debug-quotes`)
      const data = await response.json()
      console.log("🔍 Database Debug Info:", data)
      alert(`Found ${data.debug?.totalQuotes || 0} quotes. Check console for details.`)
    } catch (error) {
      console.error("Debug error:", error)
      alert("Debug failed - check console")
    }
  }, [])

  // Load data on mount
  useEffect(() => {
    getQuoteCount()
  }, [getQuoteCount])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Manage your quote database.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Quotes:</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
            <Button onClick={refreshQuotes} className="mb-4">
              Refresh Quotes
            </Button>
            <Button onClick={debugDatabaseEndpoint} variant="outline" className="mb-4">
              🔍 Debug Database
            </Button>
            <button
              onClick={debugDatabase}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              title="Debug Database Contents"
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
