import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { EmployeeTab } from "./components/employee-tab"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "HH Plumbing and Gas | Professional Plumbing Services",
  description:
    "HH Plumbing and Gas provides professional plumbing, heating and gas services including boiler installations, heat pump installations, bathroom installations and emergency repairs.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <EmployeeTab />
        </ThemeProvider>
      </body>
    </html>
  )
}
