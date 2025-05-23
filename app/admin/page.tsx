"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("hh-plumbing-auth")
    if (auth) {
      try {
        const authData = JSON.parse(auth)
        const isValid = authData.authenticated && Date.now() - authData.timestamp < 8 * 60 * 60 * 1000 // 8 hour session

        if (isValid) {
          router.push("/admin/dashboard")
          return
        }
      } catch (error) {
        // Invalid auth data
      }
    }

    // Not authenticated, redirect to login
    router.push("/admin/dashboard")
  }, [router])

  return null
}
