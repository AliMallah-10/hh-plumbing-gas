"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, RefreshCw, Trash2, Calendar, Users, FileText, TrendingUp } from "lucide-react"

// Define the base URL directly
const BASE_URL = "https://v0-fork-of-hh-plumbing-website.vercel.app"

interface Quote {
  id: string
  quote_reference: string
  created_at: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_postcode: string
  service_type: string
  service_subtype?: string
  brand?: string
  status: "New" | "Contacted" | "Quoted" | "Scheduled" | "Completed" | "Cancelled"
}

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    quoted: 0,
    completed: 0,
  })

  // Load quotes from API
  const loadQuotes = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Loading quotes from:", `${BASE_URL}/api/quotes`)

      const response = await fetch(`${BASE_URL}/api/quotes`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("📦 Received data:", data)

      if (data.success && data.quotes) {
        setQuotes(data.quotes)

        // Calculate stats
        const newStats = {
          total: data.quotes.length,
          new: data.quotes.filter((q: Quote) => q.status === "New").length,
          contacted: data.quotes.filter((q: Quote) => q.status === "Contacted").length,
          quoted: data.quotes.filter((q: Quote) => q.status === "Quoted").length,
          completed: data.quotes.filter((q: Quote) => q.status === "Completed").length,
        }
        setStats(newStats)

        console.log("✅ Quotes loaded successfully:", data.quotes.length)
      } else {
        throw new Error(data.error || "Failed to load quotes")
      }
    } catch (err) {
      console.error("❌ Error loading quotes:", err)
      setError(err instanceof Error ? err.message : "Failed to load quotes")
    } finally {
      setLoading(false)
    }
  }

  // Update quote status
  const updateQuoteStatus = async (id: string, newStatus: Quote["status"]) => {
    try {
      console.log("🔄 Updating quote status:", { id, newStatus })

      const response = await fetch(`${BASE_URL}/api/quotes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        // Update local state
        setQuotes((prev) => prev.map((quote) => (quote.id === id ? { ...quote, status: newStatus } : quote)))
        console.log("✅ Quote status updated successfully")
      } else {
        throw new Error(data.error || "Failed to update status")
      }
    } catch (err) {
      console.error("❌ Error updating quote status:", err)
      setError(err instanceof Error ? err.message : "Failed to update quote status")
    }
  }

  // Delete quote
  const deleteQuote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) {
      return
    }

    try {
      console.log("🗑️ Deleting quote:", id)

      const response = await fetch(`${BASE_URL}/api/quotes/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        // Remove from local state
        setQuotes((prev) => prev.filter((quote) => quote.id !== id))
        console.log("✅ Quote deleted successfully")
      } else {
        throw new Error(data.error || "Failed to delete quote")
      }
    } catch (err) {
      console.error("❌ Error deleting quote:", err)
      setError(err instanceof Error ? err.message : "Failed to delete quote")
    }
  }

  // Load quotes on component mount
  useEffect(() => {
    loadQuotes()
  }, [])

  // Filter quotes based on search and status
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer_phone.includes(searchTerm) ||
      quote.quote_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer_postcode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || quote.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get status badge color
  const getStatusBadgeVariant = (status: Quote["status"]) => {
    switch (status) {
      case "New":
        return "default"
      case "Contacted":
        return "secondary"
      case "Quoted":
        return "outline"
      case "Scheduled":
        return "default"
      case "Completed":
        return "default"
      case "Cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>Loading dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage quote requests and customer inquiries</p>
        </div>
        <Button onClick={loadQuotes} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <span className="font-medium">Error:</span>
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contacted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quoted</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quoted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
          <CardDescription>Manage and track all customer quote requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Quoted">Quoted</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quotes Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {quotes.length === 0 ? "No quotes found" : "No quotes match your search criteria"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.quote_reference}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{quote.customer_name}</div>
                          <div className="text-sm text-muted-foreground">{quote.customer_email}</div>
                          <div className="text-sm text-muted-foreground">{quote.customer_phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{quote.service_type}</div>
                          {quote.service_subtype && (
                            <div className="text-sm text-muted-foreground">{quote.service_subtype}</div>
                          )}
                          {quote.brand && <div className="text-sm text-muted-foreground">{quote.brand}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(quote.status)}>{quote.status}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(quote.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "Contacted")}>
                              Mark as Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "Quoted")}>
                              Mark as Quoted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "Scheduled")}>
                              Mark as Scheduled
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "Completed")}>
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateQuoteStatus(quote.id, "Cancelled")}>
                              Mark as Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteQuote(quote.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
