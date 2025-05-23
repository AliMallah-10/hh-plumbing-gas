// Type definitions
interface Customer {
  name: string
  email: string
  phone: string
  address: string
  postcode: string
}

interface QuoteRequest {
  id: string
  date: string
  customer: {
    name: string
    email: string
    phone: string
    address: {
      line1: string
      line2: string
      city: string
      postcode: string
    }
  }
  service: string
  type: string
  option: string
  price: string
  status: string
}

// Define the Quote interface to match the dashboard's expected format
export interface QuoteCustomer {
  name: string
  email: string
  phone: string
  address: {
    line1: string
    line2?: string
    city: string
    postcode: string
  }
}

export interface Quote {
  id: string
  date: string
  customer: QuoteCustomer
  service: string
  type: string
  option: string
  price: string
  status: string
}

// Generate a unique ID for quotes
const generateQuoteId = (): string => {
  const timestamp = new Date().getTime().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `QR-${timestamp}-${randomStr}`.toUpperCase()
}

// Function to save a quote to localStorage
export function saveQuote(quote: Quote): void {
  // Get existing quotes
  const existingQuotes = getQuotes()

  // Add the new quote
  existingQuotes.unshift(quote) // Add to the beginning of the array

  // Save back to localStorage
  localStorage.setItem("hh-plumbing-quotes", JSON.stringify(existingQuotes))
}

// Get all quotes
export const getQuotes = (): QuoteRequest[] => {
  try {
    const quotes = localStorage.getItem("hh-plumbing-quotes")
    const parsedQuotes = quotes ? JSON.parse(quotes) : []
    console.log("Retrieved quotes:", parsedQuotes)
    return parsedQuotes
  } catch (error) {
    console.error("Error getting quotes:", error)
    return []
  }
}

// Function to update a quote's status
// Update quote status
export const updateQuoteStatus = (id: string, newStatus: string): boolean => {
  try {
    const quotes = getQuotes()
    const updatedQuotes = quotes.map((quote) => (quote.id === id ? { ...quote, status: newStatus } : quote))

    localStorage.setItem("hh-plumbing-quotes", JSON.stringify(updatedQuotes))
    return true
  } catch (error) {
    console.error("Error updating quote status:", error)
    return false
  }
}

// Delete a quote
export const deleteQuote = (id: string): boolean => {
  try {
    const quotes = getQuotes()
    const filteredQuotes = quotes.filter((quote) => quote.id !== id)

    localStorage.setItem("hh-plumbing-quotes", JSON.stringify(filteredQuotes))
    return true
  } catch (error) {
    console.error("Error deleting quote:", error)
    return false
  }
}

// Save a new quote request
export const saveQuoteRequest = (data: any): QuoteRequest | null => {
  try {
    // Format the data for storage
    const quoteRequest: QuoteRequest = {
      id: generateQuoteId(),
      date: new Date().toISOString(),
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: {
          line1: data.address,
          line2: "",
          city: "London", // Default city
          postcode: data.postcode,
        },
      },
      service: data.serviceType,
      type: data.boilerType || data.type || "",
      option: data.brand || data.model || "",
      price: `Starting from £${data.startingPrice}`,
      status: "New",
    }

    // Get existing quotes
    let existingQuotes = []
    try {
      const storedQuotes = localStorage.getItem("hh-plumbing-quotes")
      existingQuotes = storedQuotes ? JSON.parse(storedQuotes) : []
    } catch (error) {
      console.error("Error parsing stored quotes:", error)
      existingQuotes = []
    }

    // Add new quote
    existingQuotes.unshift(quoteRequest)

    // Save to localStorage
    localStorage.setItem("hh-plumbing-quotes", JSON.stringify(existingQuotes))

    console.log("Quote saved successfully:", quoteRequest)
    return quoteRequest
  } catch (error) {
    console.error("Error saving quote request:", error)
    return null
  }
}

// Save a quote request to localStorage
export const saveQuoteRequestOld = (quoteRequest: Omit<QuoteRequest, "id" | "date" | "status">) => {
  // Only run on client
  if (typeof window === "undefined") return null

  try {
    // Get existing quotes
    const existingQuotes = getQuoteRequests()

    // Create new quote with ID, date and status
    const newQuote: QuoteRequest = {
      ...quoteRequest,
      id: generateId(),
      date: new Date().toISOString(),
      status: "new",
    }

    // Add to existing quotes
    const updatedQuotes = [newQuote, ...existingQuotes]

    // Save to localStorage
    localStorage.setItem("quoteRequests", JSON.stringify(updatedQuotes))

    return newQuote
  } catch (error) {
    console.error("Error saving quote request:", error)
    return null
  }
}

// Get all quote requests from localStorage
export const getQuoteRequests = (): QuoteRequest[] => {
  // Only run on client
  if (typeof window === "undefined") return []

  try {
    const quotes = localStorage.getItem("quoteRequests")
    return quotes ? JSON.parse(quotes) : []
  } catch (error) {
    console.error("Error getting quote requests:", error)
    return []
  }
}

// Update a quote request status
export const updateQuoteRequestStatus = (id: string, status: QuoteRequest["status"]) => {
  // Only run on client
  if (typeof window === "undefined") return false

  try {
    const quotes = getQuoteRequests()
    const updatedQuote = quotes.map((quote) => (quote.id === id ? { ...quote, status } : quote))

    localStorage.setItem("quoteRequests", JSON.stringify(updatedQuote))
    return true
  } catch (error) {
    console.error("Error updating quote status:", error)
    return false
  }
}

// Delete a quote request
export const deleteQuoteRequest = (id: string) => {
  // Only run on client
  if (typeof window === "undefined") return false

  try {
    const quotes = getQuoteRequests()
    const updatedQuotes = quotes.filter((quote) => quote.id !== id)

    localStorage.setItem("quoteRequests", JSON.stringify(updatedQuotes))
    return true
  } catch (error) {
    console.error("Error deleting quote request:", error)
    return false
  }
}

// Generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
