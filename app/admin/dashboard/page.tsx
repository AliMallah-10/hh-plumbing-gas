"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  RefreshCw,
  LogOut,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Bug,
  Home,
} from "lucide-react"

// Custom SVG icons for service types
const BoilerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 0010.5 3.375h-1.5A3.375 3.375 0 005.625 6.75v1.5a1.125 1.125 0 01-1.125 1.125h-1.5A3.375 3.375 0 002.25 11.625v2.625a3.375 3.375 0 003.375 3.375h1.5a1.125 1.125 0 011.125 1.125v1.5A3.375 3.375 0 0013.5 20.625h1.5a3.375 3.375 0 003.375-3.375v-1.5a1.125 1.125 0 011.125-1.125h1.5a3.375 3.375 0 003.375-3.375z"
    />
  </svg>
)

const HeatPumpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 9.75v6.75m1.5-4.5h-3m-1.5 0a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM3 17.25V7.5a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v9.75a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25z"
    />
  </svg>
)

const UnderfloorHeatingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.75a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5zM12 6.75h.008v.008H12V6.75zm0 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V9.75zm-3.75 0a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V9.75zm7.5 0a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V9.75zm-3.75 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm0 3a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm0-9.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
    />
  </svg>
)

const CylinderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-7.5 3.75h.008a.375.375 0 01.375.375v.008a.375.375 0 01-.375.375H8.25a.375.375 0 01-.375-.375v-.008a.375.375 0 01.375-.375zm3 0h.008a.375.375 0 01.375.375v.008a.375.375 0 01-.375.375H11.25a.375.375 0 01-.375-.375v-.008a.375.375 0 01.375-.375zm3 0h.008a.375.375 0 01.375.375v.008a.375.375 0 01-.375.375H14.25a.375.375 0 01-.375-.375v-.008a.375.375 0 01.375-.375z"
    />
    <path d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
  </svg>
)

// Mock data for dashboard stats
const MOCK_MONTHLY_DATA = [
  { month: "Jan", quotes: 12, conversions: 5 },
  { month: "Feb", quotes: 15, conversions: 7 },
  { month: "Mar", quotes: 18, conversions: 9 },
  { month: "Apr", quotes: 22, conversions: 12 },
  { month: "May", quotes: 28, conversions: 15 },
  { month: "Jun", quotes: 32, conversions: 18 },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = "bg-gray-100 text-gray-800"
  let icon = <Clock className="h-3 w-3 mr-1" />

  switch (status) {
    case "New":
      bgColor = "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      icon = <AlertCircle className="h-3 w-3 mr-1" />
      break
    case "Contacted":
      bgColor = "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      icon = <MessageSquare className="h-3 w-3 mr-1" />
      break
    case "Quoted":
      bgColor = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      icon = <Clock className="h-3 w-3 mr-1" />
      break
    case "Scheduled":
      bgColor = "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300"
      icon = <Calendar className="h-3 w-3 mr-1" />
      break
    case "Completed":
      bgColor = "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      icon = <CheckCircle2 className="h-3 w-3 mr-1" />
      break
    case "Cancelled":
      bgColor = "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      icon = <XCircle className="h-3 w-3 mr-1" />
      break
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
      {icon}
      {status}
    </span>
  )
}

// Chart component
const SimpleBarChart = ({ data }: { data: any[] }) => {
  const maxValue = Math.max(...data.map((item) => Math.max(item.quotes, item.conversions))) * 1.2
  return (
    <div className="w-full h-64">
      <div className="flex h-full items-end">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
            <div className="flex flex-col items-center w-full space-y-1">
              <div
                className="w-full max-w-[30px] bg-blue-500 rounded-t"
                style={{ height: `${(item.quotes / maxValue) * 100}%` }}
              ></div>
              <div
                className="w-full max-w-[30px] bg-brand-yellow rounded-t"
                style={{ height: `${(item.conversions / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{item.month}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Quotes</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-brand-yellow rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Conversions</span>
        </div>
      </div>
    </div>
  )
}

// Donut chart component
const SimpleDonutChart = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const angle = (item.value / total) * 360
            const startAngle = currentAngle
            currentAngle += angle

            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
            const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180)
            const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180)

            const largeArcFlag = angle > 180 ? 1 : 0

            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color}
              />
            )
          })}
          <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
        </svg>
      </div>
      <div className="flex flex-wrap justify-center mt-4 gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded mr-1" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {item.label}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [quoteRequests, setQuoteRequests] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [serviceFilter, setServiceFilter] = useState("All")
  const [selectedQuote, setSelectedQuote] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" }>({
    key: "date",
    direction: "descending",
  })
  const [activeTab, setActiveTab] = useState("quotes")
  const [lastActivity, setLastActivity] = useState<Date | null>(null)
  const [showSecurityAlert, setShowSecurityAlert] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Move this function up, before any useEffect hooks that use it
  const handleLogout = useCallback(() => {
    localStorage.removeItem("hh-plumbing-auth")
    router.push("/admin/login")
  }, [router])

  // Add this function to the component
  const debugStorage = useCallback(() => {
    try {
      const allStorageKeys = Object.keys(localStorage)
      console.log("All localStorage keys:", allStorageKeys)

      const quoteData = localStorage.getItem("hh-plumbing-quotes")
      console.log("Quote data in localStorage:", quoteData ? JSON.parse(quoteData) : "None")

      alert("Storage debug info logged to console")
    } catch (error) {
      console.error("Error debugging storage:", error)
      alert("Error accessing localStorage")
    }
  }, [])

  // Replace the loadQuotes function with this:
  const loadQuotes = useCallback(async () => {
    try {
      console.log("🔄 Starting to load quotes from API...")
      console.log("🌐 API URL:", "/api/quotes")

      const response = await fetch("/api/quotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("📡 Response status:", response.status)
      console.log("📡 Response ok:", response.ok)

      if (!response.ok) {
        console.error("❌ HTTP error! status:", response.status)
        const errorText = await response.text()
        console.error("❌ Error response:", errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("📦 Raw API result:", result)
      console.log("✅ Result success:", result.success)
      console.log("📊 Quotes array:", result.quotes)
      console.log("📊 Quotes length:", result.quotes?.length)

      if (result.success && Array.isArray(result.quotes)) {
        console.log("✅ Setting quotes in state:", result.quotes.length, "quotes")
        setQuoteRequests(result.quotes)
      } else if (Array.isArray(result.quotes)) {
        // Handle case where success might not be set but quotes exist
        console.log("⚠️ No success flag but quotes found, setting anyway")
        setQuoteRequests(result.quotes)
      } else {
        console.log("⚠️ No quotes found in API response")
        setQuoteRequests([])
      }
    } catch (error) {
      console.error("❌ Error loading quotes from API:", error)
      setQuoteRequests([])
    }
  }, [])

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("hh-plumbing-auth")
      if (!auth) {
        router.push("/admin/login")
        return
      }

      try {
        const authData = JSON.parse(auth)
        const isValid = authData.authenticated && authData.expires && Date.now() < authData.expires

        if (!isValid) {
          localStorage.removeItem("hh-plumbing-auth")
          router.push("/admin/login")
          return
        }

        // Set last activity time
        setLastActivity(new Date())
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem("hh-plumbing-auth")
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Load quotes from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      loadQuotes()
    }
    setIsClient(true)
  }, [isAuthenticated, loadQuotes])

  // Session timeout monitoring
  useEffect(() => {
    if (!isAuthenticated) return

    // Check for inactivity every minute
    const inactivityCheck = setInterval(() => {
      if (lastActivity) {
        const inactiveTime = new Date().getTime() - lastActivity.getTime()
        // Show warning after 25 minutes of inactivity
        if (inactiveTime > 25 * 60 * 1000 && !showSecurityAlert) {
          setShowSecurityAlert(true)
        }
        // Log out after 30 minutes of inactivity
        if (inactiveTime > 30 * 60 * 1000) {
          handleLogout()
          alert("Session expired due to inactivity")
        }
      }
    }, 60000)

    // Update activity on user interaction
    const updateActivity = () => {
      setLastActivity(new Date())
      if (showSecurityAlert) {
        setShowSecurityAlert(false)
      }
    }

    // Add event listeners for user activity
    window.addEventListener("mousemove", updateActivity)
    window.addEventListener("keydown", updateActivity)
    window.addEventListener("click", updateActivity)
    window.addEventListener("scroll", updateActivity)

    return () => {
      clearInterval(inactivityCheck)
      window.removeEventListener("mousemove", updateActivity)
      window.removeEventListener("keydown", updateActivity)
      window.removeEventListener("click", updateActivity)
      window.removeEventListener("scroll", updateActivity)
    }
  }, [isAuthenticated, lastActivity, showSecurityAlert, handleLogout])

  // Replace the refreshData function with this:
  const refreshData = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await loadQuotes()
      alert("Data refreshed successfully")
    } catch (error) {
      console.error("Error refreshing data:", error)
      alert("Failed to refresh data")
    } finally {
      setIsRefreshing(false)
    }
  }, [loadQuotes])

  // Sort function
  const requestSort = useCallback(
    (key: string) => {
      let direction: "ascending" | "descending" = "ascending"
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending"
      }
      setSortConfig({ key, direction })
    },
    [sortConfig],
  )

  // Apply sorting and filtering
  const filteredAndSortedRequests = useMemo(() => {
    // First filter the requests
    const filtered = quoteRequests.filter((request) => {
      const matchesSearch =
        request.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.quote_reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.customer_postcode?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "All" || request.status === statusFilter
      const matchesService = serviceFilter === "All" || request.service_type === serviceFilter

      return matchesSearch && matchesStatus && matchesService
    })

    // Then sort the filtered requests
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue

        // Handle nested properties
        if (sortConfig.key === "customer.name") {
          aValue = a.customer.name
          bValue = b.customer.name
        } else {
          aValue = a[sortConfig.key as keyof typeof a]
          bValue = b[sortConfig.key as keyof typeof b]
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [quoteRequests, searchTerm, statusFilter, serviceFilter, sortConfig])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAndSortedRequests.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredAndSortedRequests.length / itemsPerPage)

  // Activity logging - moved up before it's used
  const logActivity = useCallback((action: string) => {
    // In a real app, this would send the activity to a server
    console.log(`[${new Date().toISOString()}] User action: ${action}`)
    // Update last activity time
    setLastActivity(new Date())
  }, [])

  const handleQuoteClick = useCallback(
    (quote: any) => {
      console.log("Selected quote data:", quote)

      // Show quote data in alert for debugging
      alert(`Quote Data Structure:\n\n${JSON.stringify(quote, null, 2)}`)

      // Comment out these lines temporarily for debugging
      // setSelectedQuote(quote)
      // setIsDetailOpen(true)

      // Log activity
      logActivity(`Viewed quote ${quote.id}`)
    },
    [logActivity],
  )

  const closeDetail = useCallback(() => {
    setIsDetailOpen(false)
  }, [])

  // Replace the handleDeleteQuote function with this:
  const handleDeleteQuote = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this quote? This action cannot be undone.")) {
        try {
          const response = await fetch(`/api/quotes/${id}`, {
            method: "DELETE",
          })

          const result = await response.json()

          if (result.success) {
            // Update the UI
            setQuoteRequests((prev) => prev.filter((quote) => quote.id !== id))

            if (selectedQuote && selectedQuote.id === id) {
              setIsDetailOpen(false)
              setSelectedQuote(null)
            }

            // Show success message
            alert(`Quote ${id} deleted successfully`)

            // Log activity
            logActivity(`Deleted quote ${id}`)
          } else {
            alert(`Error deleting quote: ${result.error}`)
          }
        } catch (error) {
          console.error("Error deleting quote:", error)
          alert("Failed to delete quote")
        }
      }
    },
    [selectedQuote, logActivity],
  )

  // Replace the updateQuoteStatusHandler function with this:
  const updateQuoteStatusHandler = useCallback(
    async (id: string, newStatus: string) => {
      try {
        const response = await fetch(`/api/quotes/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        })

        const result = await response.json()

        if (result.success) {
          // Update in state
          setQuoteRequests((prev) => prev.map((quote) => (quote.id === id ? { ...quote, status: newStatus } : quote)))

          if (selectedQuote && selectedQuote.id === id) {
            setSelectedQuote({ ...selectedQuote, status: newStatus })
          }

          // Show success message
          alert(`Quote ${id} status updated to ${newStatus}`)

          // Log activity
          logActivity(`Updated quote ${id} status to ${newStatus}`)
        } else {
          alert(`Error updating quote: ${result.error}`)
        }
      } catch (error) {
        console.error("Error updating quote status:", error)
        alert("Failed to update quote status")
      }
    },
    [selectedQuote, logActivity],
  )

  // Export quote to CSV
  const exportQuoteCSV = useCallback(
    (quote: any) => {
      const headers = [
        "Quote ID",
        "Date",
        "Customer Name",
        "Email",
        "Phone",
        "Address",
        "Service",
        "Type",
        "Brand",
        "Model",
        "Price",
        "Status",
      ]

      const data = [
        quote.quote_reference,
        new Date(quote.created_at).toLocaleString(),
        quote.customer_name,
        quote.customer_email,
        quote.customer_phone,
        `${quote.customer_address_line1}, ${quote.customer_city}, ${quote.customer_postcode}`,
        quote.service_type,
        quote.service_subtype,
        quote.brand,
        quote.model,
        quote.starting_price ? `£${(quote.starting_price / 100).toFixed(2)}` : "TBC",
        quote.status,
      ]

      const csvContent = [headers.join(","), data.join(",")].join("\n")
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `quote_${quote.quote_reference}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Log activity
      logActivity(`Exported quote ${quote.quote_reference} to CSV`)
    },
    [logActivity],
  )

  // Get service icon
  const getServiceIcon = useCallback((service: string) => {
    if (service.toLowerCase().includes("boiler")) {
      return <BoilerIcon />
    } else if (service.toLowerCase().includes("heat pump")) {
      return <HeatPumpIcon />
    } else if (service.toLowerCase().includes("underfloor")) {
      return <UnderfloorHeatingIcon />
    } else if (service.toLowerCase().includes("cylinder")) {
      return <CylinderIcon />
    }
    return null
  }, [])

  // Format date
  const formatDate = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }, [])

  // Get service distribution for chart
  const serviceDistribution = useMemo(() => {
    const services: Record<string, number> = {}
    quoteRequests.forEach((quote) => {
      const service = quote.service_type
      services[service] = (services[service] || 0) + 1
    })

    const colors = ["#FFD700", "#4F46E5", "#10B981", "#F97316", "#8B5CF6"]
    return Object.entries(services).map(([label, value], index) => ({
      label,
      value,
      color: colors[index % colors.length],
    }))
  }, [quoteRequests])

  // Get status distribution for chart
  const statusDistribution = useMemo(() => {
    const statuses: Record<string, number> = {}
    quoteRequests.forEach((quote) => {
      const status = quote.status
      statuses[status] = (statuses[status] || 0) + 1
    })

    return [
      { label: "New", value: statuses["New"] || 0, color: "#3B82F6" },
      { label: "Contacted", value: statuses["Contacted"] || 0, color: "#8B5CF6" },
      { label: "Quoted", value: statuses["Quoted"] || 0, color: "#FFD700" },
      { label: "Scheduled", value: statuses["Scheduled"] || 0, color: "#6366F1" },
      { label: "Completed", value: statuses["Completed"] || 0, color: "#10B981" },
      { label: "Cancelled", value: statuses["Cancelled"] || 0, color: "#EF4444" },
    ].filter((item) => item.value > 0)
  }, [quoteRequests])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">HH Plumbing Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                console.log("Current quotes state:", quoteRequests)
                console.log("Quote requests length:", quoteRequests.length)
                alert(`Current quotes in state: ${quoteRequests.length}\n\nCheck console for full data`)
              }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              title="Check quotes state"
            >
              <AlertCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={refreshData}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              disabled={isRefreshing}
              title="Refresh data"
            >
              <RefreshCw className={`h-5 w-5 text-gray-600 dark:text-gray-300 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={debugStorage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              title="Debug Storage"
            >
              <Bug className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <a
              href="/"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-yellow dark:hover:text-brand-yellow"
              title="Back to Home"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-yellow dark:hover:text-brand-yellow"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Security Alert */}
      {showSecurityAlert && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 fixed bottom-4 right-4 max-w-md shadow-lg z-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                Your session will expire soon due to inactivity. Please interact with the page to stay logged in.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("quotes")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "quotes"
                  ? "border-brand-yellow text-brand-yellow"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Quote Requests
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "analytics"
                  ? "border-brand-yellow text-brand-yellow"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {activeTab === "quotes" && (
          <div>
            {/* Filters */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, ID or postcode"
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full focus:ring-brand-yellow focus:border-brand-yellow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full focus:ring-brand-yellow focus:border-brand-yellow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full focus:ring-brand-yellow focus:border-brand-yellow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                >
                  <option value="All">All Services</option>
                  <option value="Boiler Installation">Boiler Installation</option>
                  <option value="Heat Pump Installation">Heat Pump Installation</option>
                  <option value="Underfloor Heating Installation">Underfloor Heating</option>
                  <option value="Cylinder Installation">Cylinder Installation</option>
                  <option value="Emergency Repairs">Emergency Repairs</option>
                  <option value="Bathroom Installation">Bathroom Installation</option>
                  <option value="service1">Test Data - Service 1</option>
                  <option value="service2">Test Data - Service 2</option>
                  <option value="service3">Test Data - Service 3</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quote Requests Table */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("id")}
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("date")}
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("customer.name")}
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("service")}
                      >
                        Service
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("status")}
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {currentItems.length > 0 ? (
                      currentItems.map((quote) => (
                        <tr
                          key={quote.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleQuoteClick(quote)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {quote.quote_reference}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {formatDate(quote.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {quote.customer_name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{quote.customer_email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-6 w-6 text-gray-500 dark:text-gray-400 mr-2">
                                {getServiceIcon(quote.service_type || quote.service || "Unknown")}
                              </div>
                              <div className="text-sm text-gray-900 dark:text-white">
                                {(() => {
                                  const serviceType =
                                    quote.service_type || quote.service || quote.service_name || quote.serviceType

                                  // Handle test data with proper service names
                                  const serviceMap: Record<string, string> = {
                                    service1: "Boiler Installation",
                                    service2: "Heat Pump Installation",
                                    service3: "Underfloor Heating Installation",
                                    service4: "Cylinder Installation",
                                    service5: "Emergency Repairs",
                                    service6: "Bathroom Installation",
                                  }

                                  return serviceMap[serviceType] || serviceType || "Unknown Service"
                                })()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={quote.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
                              <button
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                aria-label="Actions"
                              >
                                <MoreHorizontal className="h-5 w-5" />
                              </button>
                              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 hidden group-hover:block">
                                <div
                                  className="py-1"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="options-menu"
                                >
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => updateQuoteStatusHandler(quote.id, "Contacted")}
                                  >
                                    Mark as Contacted
                                  </button>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => updateQuoteStatusHandler(quote.id, "Quoted")}
                                  >
                                    Mark as Quoted
                                  </button>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => updateQuoteStatusHandler(quote.id, "Scheduled")}
                                  >
                                    Mark as Scheduled
                                  </button>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => updateQuoteStatusHandler(quote.id, "Completed")}
                                  >
                                    Mark as Completed
                                  </button>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => updateQuoteStatusHandler(quote.id, "Cancelled")}
                                  >
                                    Mark as Cancelled
                                  </button>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => exportQuoteCSV(quote)}
                                  >
                                    Export to CSV
                                  </button>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => handleDeleteQuote(quote.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          {isClient ? (
                            <>
                              <div>Debug Info:</div>
                              <div>Total quotes in state: {quoteRequests.length}</div>
                              <div>Filtered quotes: {filteredAndSortedRequests.length}</div>
                              <div>Current page items: {currentItems.length}</div>
                              <div>Search term: "{searchTerm}"</div>
                              <div>Status filter: {statusFilter}</div>
                              <div>Service filter: {serviceFilter}</div>
                              {searchTerm || statusFilter !== "All" || serviceFilter !== "All"
                                ? "No quotes match your filters."
                                : "No quote requests found."}
                            </>
                          ) : (
                            "Loading quotes..."
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {filteredAndSortedRequests.length > itemsPerPage && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(indexOfLastItem, filteredAndSortedRequests.length)}</span> of{" "}
                  <span className="font-medium">{filteredAndSortedRequests.length}</span> results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Quote Detail Modal */}
            {isDetailOpen && selectedQuote && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quote Request Details</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: {selectedQuote.id}</p>
                      </div>
                      <button
                        onClick={closeDetail}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        aria-label="Close"
                      >
                        <XCircle className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Customer Information</h3>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedQuote.customer_name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{selectedQuote.customer_email}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{selectedQuote.customer_phone}</p>
                          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {selectedQuote.customer_address_line1}
                              {selectedQuote.customer_address_line2 && <>, {selectedQuote.customer_address_line2}</>}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {selectedQuote.customer_city}, {selectedQuote.customer_postcode}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Quote Details</h3>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="flex-shrink-0 h-6 w-6 text-gray-500 dark:text-gray-400 mr-2">
                                {getServiceIcon(selectedQuote.service_type || selectedQuote.service || "Unknown")}
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {(() => {
                                  const serviceType = selectedQuote.service_type || selectedQuote.service
                                  const serviceMap: Record<string, string> = {
                                    service1: "Boiler Installation",
                                    service2: "Heat Pump Installation",
                                    service3: "Underfloor Heating Installation",
                                    service4: "Cylinder Installation",
                                    service5: "Emergency Repairs",
                                    service6: "Bathroom Installation",
                                  }
                                  return serviceMap[serviceType] || serviceType || "Unknown Service"
                                })()}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Type: {selectedQuote.service_subtype || selectedQuote.subtype || "Not specified"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Brand: {selectedQuote.brand || selectedQuote.preferred_brand || "Not specified"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Model: {selectedQuote.model || selectedQuote.preferred_model || "Not specified"}
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">
                              Starting from £
                              {selectedQuote.starting_price ? (selectedQuote.starting_price / 100).toFixed(2) : "TBC"}
                            </p>
                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Submitted on: {formatDate(selectedQuote.created_at)}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Reference: {selectedQuote.quote_reference || selectedQuote.id}
                              </p>
                              <div className="mt-2">
                                <StatusBadge status={selectedQuote.status} />
                              </div>

                              {/* Debug info - remove this after fixing */}
                              <div className="mt-6 p-4 bg-yellow-200 dark:bg-yellow-800 border-2 border-yellow-400 rounded-lg">
                                <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                                  🐛 DEBUG INFO - QUOTE DATA STRUCTURE
                                </h4>
                                <div className="bg-white dark:bg-gray-900 p-3 rounded border max-h-64 overflow-y-auto">
                                  <pre className="text-xs text-black dark:text-white whitespace-pre-wrap">
                                    {JSON.stringify(selectedQuote, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* LARGE DEBUG SECTION - MOVED UP FOR VISIBILITY */}
                    <div className="mt-6 p-6 bg-red-500 border-4 border-red-700 rounded-lg">
                      <h4 className="text-2xl font-bold text-white mb-4">🚨 DEBUG INFO - QUOTE DATA STRUCTURE 🚨</h4>
                      <div className="bg-white p-4 rounded border max-h-96 overflow-y-auto">
                        <pre className="text-sm text-black whitespace-pre-wrap">
                          {JSON.stringify(selectedQuote, null, 2)}
                        </pre>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Actions</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateQuoteStatusHandler(selectedQuote.id, "Contacted")}
                          className="px-3 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 rounded-md text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/30"
                        >
                          Mark as Contacted
                        </button>
                        <button
                          onClick={() => updateQuoteStatusHandler(selectedQuote.id, "Quoted")}
                          className="px-3 py-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-md text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/30"
                        >
                          Mark as Quoted
                        </button>
                        <button
                          onClick={() => updateQuoteStatusHandler(selectedQuote.id, "Scheduled")}
                          className="px-3 py-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300 rounded-md text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/30"
                        >
                          Mark as Scheduled
                        </button>
                        <button
                          onClick={() => updateQuoteStatusHandler(selectedQuote.id, "Completed")}
                          className="px-3 py-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-md text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/30"
                        >
                          Mark as Completed
                        </button>
                        <button
                          onClick={() => updateQuoteStatusHandler(selectedQuote.id, "Cancelled")}
                          className="px-3 py-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-md text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/30"
                        >
                          Mark as Cancelled
                        </button>
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => exportQuoteCSV(selectedQuote)}
                          className="px-3 py-2 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Export to CSV
                        </button>
                        <button
                          onClick={() => handleDeleteQuote(selectedQuote.id)}
                          className="px-3 py-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-md text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/30"
                        >
                          Delete Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quote Requests</h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{quoteRequests.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total quote requests</div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">New Requests</h3>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {quoteRequests.filter((q) => q.status === "New").length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Awaiting response</div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Conversion Rate</h3>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {quoteRequests.filter((q) => q.status === "Completed").length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Completed jobs</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Monthly Performance</h3>
                <SimpleBarChart data={MOCK_MONTHLY_DATA} />
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quote Status Distribution</h3>
                <SimpleDonutChart data={statusDistribution} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Service Distribution</h3>
                <SimpleDonutChart data={serviceDistribution} />
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {quoteRequests
                    .slice(0, 5)
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map((quote) => (
                      <div key={quote.id} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-1">
                          {getServiceIcon(quote.service_type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {quote.customer_name} - {quote.service_type}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(quote.created_at)} - <StatusBadge status={quote.status} />
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
