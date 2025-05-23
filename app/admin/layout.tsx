"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check authentication for all admin routes except login
    if (mounted && !pathname.includes("/admin/login")) {
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
        }
      } catch (error) {
        localStorage.removeItem("hh-plumbing-auth")
        router.push("/admin/login")
      }
    }
  }, [mounted, pathname, router])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}
