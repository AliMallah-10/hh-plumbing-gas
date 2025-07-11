"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Hydration guard for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const toggleServices = () => setIsServicesExpanded((prev) => !prev);

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const serviceLinks = [
    { href: "/services/boiler-installations", label: "Boiler Installation" },
    {
      href: "/services/heat-pump-installations",
      label: "Heat Pump Installation",
    },
    {
      href: "/services/underfloor-heating-installation",
      label: "Underfloor Heating",
    },
    { href: "/services/cylinder-installation", label: "Cylinder Installation" },
  ];

  // Render only toggle on server or before mount
  if (!mounted) {
    return (
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 text-foreground hover:text-brand-yellow transition-colors rounded-xl"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    );
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-foreground hover:text-brand-yellow transition-colors rounded-xl"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-end mb-8">
                <button
                  onClick={closeMenu}
                  className="p-2 text-foreground hover:text-brand-yellow transition-colors rounded-xl"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "text-xl font-medium py-2 border-b border-border/30 transition-colors",
                      {
                        "text-brand-yellow border-brand-yellow":
                          pathname === link.href,
                        "hover:text-brand-yellow hover:border-brand-yellow/50":
                          pathname !== link.href,
                      }
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Services Dropdown */}
                <div className="space-y-4">
                  <button
                    onClick={toggleServices}
                    className="flex items-center justify-between w-full text-xl font-medium py-2 border-b border-border/30 hover:text-brand-yellow transition-colors"
                  >
                    Services
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isServicesExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isServicesExpanded && (
                    <div className="space-y-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={closeMenu}
                          className="flex items-center text-lg font-medium hover:text-brand-yellow transition-colors px-4 py-2"
                        >
                          <ChevronRight className="h-4 w-4 mr-2" />
                          {service.label}
                        </Link>
                      ))}
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mx-4">
                        <Link
                          href="/services"
                          onClick={closeMenu}
                          className="flex items-center text-lg font-medium hover:text-brand-yellow px-0 py-2"
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/get-a-quote"
                  onClick={closeMenu}
                  className={cn(
                    "text-xl font-medium py-3 px-4 bg-brand-yellow text-black rounded-xl shadow-md hover:bg-brand-yellow/90 hover:shadow-lg transition-all text-center mt-4",
                    {
                      "bg-brand-yellow/90 shadow-lg":
                        pathname === "/get-a-quote",
                    }
                  )}
                >
                  Get a Quote
                </Link>

                <div className="pt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Toggle theme
                  </span>
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
