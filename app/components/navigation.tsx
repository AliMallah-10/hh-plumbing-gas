"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
  ]

  const serviceLinks = [
    { href: "/services/boiler-installations", label: "Boiler Installation" },
    { href: "/services/heat-pump-installations", label: "Heat Pump Installation" },
    { href: "/services/underfloor-heating-installation", label: "Underfloor Heating" },
    { href: "/services/cylinder-installation", label: "Cylinder Installation" },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {mainLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:text-brand-yellow",
            {
              "text-brand-yellow": pathname === link.href,
              "text-foreground": pathname !== link.href,
            },
          )}
        >
          {link.label}
          {pathname === link.href && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-brand-yellow rounded-full" />
          )}
        </Link>
      ))}

      {/* Services Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsServicesOpen(!isServicesOpen)}
          className={cn(
            "flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:text-brand-yellow focus:outline-none",
            {
              "text-brand-yellow": pathname.startsWith("/services"),
              "text-foreground": !pathname.startsWith("/services"),
            },
          )}
          aria-expanded={isServicesOpen}
          aria-haspopup="true"
        >
          Services
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
          />
          {pathname.startsWith("/services") && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-brand-yellow rounded-full" />
          )}
        </button>

        {isServicesOpen && (
          <div className="absolute left-0 mt-2 w-64 shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="py-2" role="menu" aria-orientation="vertical">
              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-brand-yellow/10 dark:hover:bg-brand-yellow/20 hover:text-brand-yellow transition-all duration-200 mx-2 my-1"
                  role="menuitem"
                  onClick={() => setIsServicesOpen(false)}
                >
                  {service.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              <Link
                href="/services"
                className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-brand-yellow/10 dark:hover:bg-brand-yellow/20 hover:text-brand-yellow transition-all duration-200 mx-2 my-1 font-medium"
                role="menuitem"
                onClick={() => setIsServicesOpen(false)}
              >
                View All Services
              </Link>
            </div>
          </div>
        )}
      </div>

      <Link
        href="/get-a-quote"
        className={cn(
          "ml-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-brand-yellow text-black hover:bg-opacity-90 shadow-sm hover:shadow",
          {
            "bg-opacity-90 shadow": pathname === "/get-a-quote",
          },
        )}
      >
        Get a Quote
      </Link>

      <div className="ml-4 pl-4 border-l border-border">
        <ThemeToggle />
      </div>
    </nav>
  )
}
