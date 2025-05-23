"use client"

import { Logo } from "./logo"
import { Navigation } from "./navigation"
import { MobileMenu } from "./mobile-menu"
import { useEffect, useState } from "react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`w-full py-5 px-4 flex items-center justify-between border-b sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md border-gray-200/20 dark:border-gray-700/20"
          : "bg-white dark:bg-gray-900 border-gray-200/50 dark:border-gray-800/50"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <Navigation />
        <MobileMenu />
      </div>
    </header>
  )
}
