// Create a new component for the employee tab
"use client"

import { useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"

export function EmployeeTab() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-0 right-8 z-10">
      <Link
        href="/admin/login"
        className={`flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium py-1.5 px-3 rounded-t-md transition-all duration-300 shadow-md ${isHovered ? "pr-5" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <User className="h-3.5 w-3.5" />
        {isHovered && <span>Employee Access</span>}
      </Link>
    </div>
  )
}
