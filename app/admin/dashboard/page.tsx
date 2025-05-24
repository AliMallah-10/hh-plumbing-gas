"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { useCallback } from "react"

async function getQuoteCount() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quotes/count`, { cache: "no-store" })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

async function refreshQuotes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh-quotes`, { cache: "no-store" })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to refresh quotes")
  }

  return res.json()
}

export default async function DashboardPage() {
  const { count } = await getQuoteCount()

  // Add this function to debug the database contents
  const debugDatabase = useCallback(async () => {
    try {
      console.log("🔍 Debugging database contents...")

      // Check what's in the API
      const response = await fetch("/api/quotes")
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
            <Button
              onClick={async () => {
                await refreshQuotes()
                alert("Quotes refreshed!")
              }}
              className="mb-4"
            >
              Refresh Quotes
            </Button>
            <Button
              onClick={async () => {
                try {
                  const response = await fetch("/api/debug-quotes")
                  const data = await response.json()
                  console.log("🔍 Database Debug Info:", data)
                  alert(`Found ${data.debug?.totalQuotes || 0} quotes. Check console for details.`)
                } catch (error) {
                  console.error("Debug error:", error)
                  alert("Debug failed - check console")
                }
              }}
              variant="outline"
              className="mb-4"
            >
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
