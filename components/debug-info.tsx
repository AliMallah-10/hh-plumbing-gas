"use client"

import { useState, useEffect } from "react"

export function DebugInfo() {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setMounted(true)
      console.log("Debug: Component mounted successfully")

      // Test if we can access environment variables
      const hasSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL
      console.log("Debug: Supabase config available:", hasSupabase)
    } catch (err) {
      console.error("Debug: Error in useEffect:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }, [])

  if (process.env.NODE_ENV === "production") {
    return null // Don't show debug info in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
      <div>Mounted: {mounted ? "✅" : "❌"}</div>
      {error && <div className="text-red-300">Error: {error}</div>}
    </div>
  )
}
