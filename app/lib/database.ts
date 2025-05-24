import { promises as fs } from "fs"
import path from "path"

// Database file path
const DB_PATH = path.join(process.cwd(), "data", "quotes.json")

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Ensure data directory exists
async function ensureDataDirectory() {
  if (isBrowser) return // Skip in browser

  const dataDir = path.dirname(DB_PATH)
  try {
    await fs.access(dataDir)
    console.log("✅ Data directory exists:", dataDir)
  } catch {
    console.log("📁 Creating data directory:", dataDir)
    try {
      await fs.mkdir(dataDir, { recursive: true })
      console.log("✅ Data directory created successfully")
    } catch (error) {
      console.error("❌ Failed to create data directory:", error)
      throw error
    }
  }
}

// Initialize database file if it doesn't exist
async function initializeDatabase() {
  if (isBrowser) return // Skip in browser

  try {
    await fs.access(DB_PATH)
    console.log("✅ Database file exists:", DB_PATH)
  } catch {
    console.log("📄 Creating database file:", DB_PATH)
    try {
      await ensureDataDirectory()
      const initialData = {
        quotes: [],
        version: "1.0",
        created: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      }
      await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2))
      console.log("✅ Database file created successfully")
    } catch (error) {
      console.error("❌ Failed to create database file:", error)
      throw error
    }
  }
}

// Read database with better error handling
async function readDatabase() {
  if (isBrowser) {
    // Browser fallback - read from localStorage
    try {
      const data = localStorage.getItem("hh-plumbing-quotes")
      if (data) {
        const parsed = JSON.parse(data)
        console.log("📱 Database read from localStorage, quotes count:", parsed.quotes?.length || 0)
        return parsed
      }
    } catch (error) {
      console.error("❌ Error reading from localStorage:", error)
    }
    // Return default if localStorage fails
    return { quotes: [], version: "1.0", created: new Date().toISOString() }
  }

  try {
    await initializeDatabase()
    const data = await fs.readFile(DB_PATH, "utf-8")
    const parsed = JSON.parse(data)
    console.log("💾 Database read from file system, quotes count:", parsed.quotes?.length || 0)
    return parsed
  } catch (error) {
    console.error("❌ Error reading database from file system:", error)
    // Return default structure if read fails
    return { quotes: [], version: "1.0", created: new Date().toISOString() }
  }
}

// Write database with better error handling and fallback
async function writeDatabase(data: any) {
  let fileSystemSuccess = false
  let localStorageSuccess = false

  // Try file system first (server-side)
  if (!isBrowser) {
    try {
      await ensureDataDirectory()
      data.lastModified = new Date().toISOString()
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
      console.log("✅ Database written to file system successfully")
      fileSystemSuccess = true
    } catch (error) {
      console.error("❌ Error writing database to file system:", error)
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        code: (error as any)?.code,
        path: DB_PATH,
      })
    }
  }

  // Try localStorage as fallback (browser-side or if file system fails)
  if (isBrowser || !fileSystemSuccess) {
    try {
      data.lastModified = new Date().toISOString()
      localStorage.setItem("hh-plumbing-quotes", JSON.stringify(data))
      console.log("✅ Database written to localStorage successfully")
      localStorageSuccess = true
    } catch (error) {
      console.error("❌ Error writing database to localStorage:", error)
    }
  }

  const success = fileSystemSuccess || localStorageSuccess
  if (!success) {
    console.error("❌ Failed to write database to both file system and localStorage")
  }

  return success
}

// Quote interface
export interface DatabaseQuote {
  id: string
  date: string
  customer: {
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
  service: string
  type: string
  option: string
  price: string
  status: "New" | "Contacted" | "Quoted" | "Scheduled" | "Completed" | "Cancelled"
  createdAt: string
  updatedAt: string
}

// Generate unique ID
function generateQuoteId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `QR-${timestamp}-${randomStr}`.toUpperCase()
}

// Database operations
export class QuoteDatabase {
  // Create a new quote
  static async createQuote(
    quoteData: Omit<DatabaseQuote, "id" | "createdAt" | "updatedAt">,
  ): Promise<DatabaseQuote | null> {
    try {
      console.log("🔄 Creating new quote with data:", quoteData)

      const db = await readDatabase()
      console.log("📊 Current database state:", {
        quotesCount: db.quotes?.length || 0,
        hasQuotesArray: Array.isArray(db.quotes),
      })

      const newQuote: DatabaseQuote = {
        ...quoteData,
        id: generateQuoteId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log("🆕 Generated new quote:", {
        id: newQuote.id,
        service: newQuote.service,
        customerName: newQuote.customer.name,
      })

      // Ensure quotes array exists
      if (!db.quotes || !Array.isArray(db.quotes)) {
        console.log("🔧 Initializing quotes array")
        db.quotes = []
      }

      db.quotes.unshift(newQuote) // Add to beginning

      console.log("💾 Attempting to save database with", db.quotes.length, "quotes")
      const success = await writeDatabase(db)

      if (success) {
        console.log("✅ Quote created successfully:", newQuote.id)
        return newQuote
      } else {
        console.error("❌ Failed to write quote to database")
        return null
      }
    } catch (error) {
      console.error("❌ Error creating quote:", error)
      console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")
      return null
    }
  }

  // Get all quotes
  static async getAllQuotes(): Promise<DatabaseQuote[]> {
    try {
      const db = await readDatabase()
      const quotes = db.quotes || []
      console.log("📋 Retrieved", quotes.length, "quotes from database")
      return quotes
    } catch (error) {
      console.error("❌ Error getting quotes:", error)
      return []
    }
  }

  // Get quote by ID
  static async getQuoteById(id: string): Promise<DatabaseQuote | null> {
    try {
      const db = await readDatabase()
      const quote = db.quotes?.find((q: DatabaseQuote) => q.id === id)
      return quote || null
    } catch (error) {
      console.error("❌ Error getting quote by ID:", error)
      return null
    }
  }

  // Update quote status
  static async updateQuoteStatus(id: string, status: DatabaseQuote["status"]): Promise<boolean> {
    try {
      const db = await readDatabase()
      const quoteIndex = db.quotes?.findIndex((q: DatabaseQuote) => q.id === id) ?? -1

      if (quoteIndex === -1) {
        console.error("❌ Quote not found:", id)
        return false
      }

      db.quotes[quoteIndex].status = status
      db.quotes[quoteIndex].updatedAt = new Date().toISOString()

      const success = await writeDatabase(db)
      if (success) {
        console.log(`✅ Quote ${id} status updated to ${status}`)
      }
      return success
    } catch (error) {
      console.error("❌ Error updating quote status:", error)
      return false
    }
  }

  // Delete quote
  static async deleteQuote(id: string): Promise<boolean> {
    try {
      const db = await readDatabase()
      const initialLength = db.quotes?.length || 0
      db.quotes = db.quotes?.filter((q: DatabaseQuote) => q.id !== id) || []

      if (db.quotes.length === initialLength) {
        console.error("❌ Quote not found for deletion:", id)
        return false
      }

      const success = await writeDatabase(db)
      if (success) {
        console.log(`✅ Quote ${id} deleted successfully`)
      }
      return success
    } catch (error) {
      console.error("❌ Error deleting quote:", error)
      return false
    }
  }

  // Get quotes by status
  static async getQuotesByStatus(status: DatabaseQuote["status"]): Promise<DatabaseQuote[]> {
    try {
      const quotes = await this.getAllQuotes()
      return quotes.filter((quote) => quote.status === status)
    } catch (error) {
      console.error("❌ Error getting quotes by status:", error)
      return []
    }
  }

  // Get quotes by date range
  static async getQuotesByDateRange(startDate: string, endDate: string): Promise<DatabaseQuote[]> {
    try {
      const quotes = await this.getAllQuotes()
      return quotes.filter((quote) => {
        const quoteDate = new Date(quote.date)
        return quoteDate >= new Date(startDate) && quoteDate <= new Date(endDate)
      })
    } catch (error) {
      console.error("❌ Error getting quotes by date range:", error)
      return []
    }
  }

  // Search quotes
  static async searchQuotes(searchTerm: string): Promise<DatabaseQuote[]> {
    try {
      const quotes = await this.getAllQuotes()
      const term = searchTerm.toLowerCase()

      return quotes.filter(
        (quote) =>
          quote.customer.name.toLowerCase().includes(term) ||
          quote.customer.email.toLowerCase().includes(term) ||
          quote.customer.phone.includes(term) ||
          quote.customer.address.postcode.toLowerCase().includes(term) ||
          quote.id.toLowerCase().includes(term) ||
          quote.service.toLowerCase().includes(term),
      )
    } catch (error) {
      console.error("❌ Error searching quotes:", error)
      return []
    }
  }

  // Get database statistics
  static async getStatistics() {
    try {
      const quotes = await this.getAllQuotes()

      const stats = {
        total: quotes.length,
        byStatus: {
          New: quotes.filter((q) => q.status === "New").length,
          Contacted: quotes.filter((q) => q.status === "Contacted").length,
          Quoted: quotes.filter((q) => q.status === "Quoted").length,
          Scheduled: quotes.filter((q) => q.status === "Scheduled").length,
          Completed: quotes.filter((q) => q.status === "Completed").length,
          Cancelled: quotes.filter((q) => q.status === "Cancelled").length,
        },
        byService: {} as Record<string, number>,
        recentQuotes: quotes.slice(0, 5),
      }

      // Count by service
      quotes.forEach((quote) => {
        stats.byService[quote.service] = (stats.byService[quote.service] || 0) + 1
      })

      return stats
    } catch (error) {
      console.error("❌ Error getting statistics:", error)
      return null
    }
  }

  // Test database connection
  static async testConnection(): Promise<{
    success: boolean
    message: string
    path?: string
    environment?: string
    capabilities?: {
      fileSystem: boolean
      localStorage: boolean
    }
  }> {
    try {
      const environment = isBrowser ? "browser" : "server"
      console.log("🧪 Testing database connection in", environment, "environment")

      let fileSystemWorks = false
      let localStorageWorks = false

      // Test file system (server-side only)
      if (!isBrowser) {
        try {
          await initializeDatabase()
          fileSystemWorks = true
          console.log("✅ File system access working")
        } catch (error) {
          console.log("❌ File system access failed:", error)
        }
      }

      // Test localStorage (browser-side)
      if (isBrowser) {
        try {
          const testKey = "hh-plumbing-test"
          localStorage.setItem(testKey, "test")
          localStorage.removeItem(testKey)
          localStorageWorks = true
          console.log("✅ localStorage access working")
        } catch (error) {
          console.log("❌ localStorage access failed:", error)
        }
      }

      const db = await readDatabase()
      const quotesCount = db.quotes?.length || 0

      return {
        success: true,
        message: `Database connection successful in ${environment} environment. Found ${quotesCount} quotes.`,
        path: DB_PATH,
        environment,
        capabilities: {
          fileSystem: fileSystemWorks,
          localStorage: localStorageWorks,
        },
      }
    } catch (error) {
      return {
        success: false,
        message: `Database connection failed: ${error}`,
        path: DB_PATH,
        environment: isBrowser ? "browser" : "server",
      }
    }
  }

  // Clear all data (for testing)
  static async clearAllQuotes(): Promise<boolean> {
    try {
      const emptyDb = {
        quotes: [],
        version: "1.0",
        created: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      }
      const success = await writeDatabase(emptyDb)
      if (success) {
        console.log("✅ All quotes cleared successfully")
      }
      return success
    } catch (error) {
      console.error("❌ Error clearing quotes:", error)
      return false
    }
  }
}
