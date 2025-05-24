"use client"

import { RefreshCw } from "lucide-react"
import { useState } from "react"

interface QuoteRefreshButtonProps {
  onRefresh: () => Promise<void>
}

export function QuoteRefreshButton({ onRefresh }: QuoteRefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none disabled:opacity-50"
      title="Refresh quotes"
    >
      <RefreshCw className={`h-5 w-5 text-gray-600 dark:text-gray-300 ${isRefreshing ? "animate-spin" : ""}`} />
    </button>
  )
}
