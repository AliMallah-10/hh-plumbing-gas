import Link from "next/link"
import { Phone, Mail, Instagram, Clock, ArrowRight } from "lucide-react"
import { Header } from "../components/header"
import { TopBar } from "../components/top-bar"

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Contact Us</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Get in touch with our expert team for all your plumbing and heating needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Main Contact - Full Width */}
              <div className="bg-gradient-to-r from-brand-yellow to-yellow-400 p-12 text-black text-center mb-8">
                <Phone className="h-16 w-16 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Call Us Now</h2>
                <a href="tel:07712599254" className="text-4xl font-bold hover:opacity-80 transition-opacity block mb-4">
                  07712 599254
                </a>
                <p className="text-lg opacity-90">Available 24/7 for emergencies</p>
              </div>

              {/* Secondary Info - 3 Column */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Email */}
                <div className="bg-white dark:bg-gray-800 p-6 text-center shadow-lg">
                  <Mail className="h-10 w-10 mx-auto mb-4 text-brand-yellow" />
                  <h3 className="text-lg font-bold mb-3">Email Us</h3>
                  <a
                    href="mailto:info@hhplumbing.com"
                    className="text-brand-yellow hover:opacity-80 transition-opacity font-medium"
                  >
                    info@hhplumbing.com
                  </a>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Response within 24hrs</p>
                </div>

                {/* Business Hours */}
                <div className="bg-white dark:bg-gray-800 p-6 shadow-lg">
                  <div className="text-center mb-4">
                    <Clock className="h-10 w-10 mx-auto mb-3 text-brand-yellow" />
                    <h3 className="text-lg font-bold">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mon - Fri</span>
                      <span>8AM - 6PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9AM - 4PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Emergency Only</span>
                    </div>
                  </div>
                </div>

                {/* Social & Quote */}
                <div className="bg-white dark:bg-gray-800 p-6 text-center shadow-lg">
                  <h3 className="text-lg font-bold mb-4">Connect & Quote</h3>

                  <div className="flex justify-center space-x-4 mb-6">
                    <a
                      href="https://www.instagram.com/hhplumbingandgas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl text-white hover:scale-110 transition-transform"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@hussain_hachem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 p-3 rounded-xl text-white hover:scale-110 transition-transform"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                  </div>

                  <Link href="/get-a-quote" className="btn-primary w-full">
                    Get Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">HH Plumbing and Gas</h3>
              <p className="text-sm text-gray-300 max-w-xs">
                Professional plumbing and gas services with a commitment to quality and customer satisfaction.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/services/boiler-installations" className="text-gray-300 hover:text-brand-yellow">
                    Boiler Installations
                  </Link>
                </li>
                <li>
                  <Link href="/services/heat-pump-installations" className="text-gray-300 hover:text-brand-yellow">
                    Heat Pump Installations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/underfloor-heating-installation"
                    className="text-gray-300 hover:text-brand-yellow"
                  >
                    Underfloor Heating Installation
                  </Link>
                </li>
                <li>
                  <Link href="/services/cylinder-installation" className="text-gray-300 hover:text-brand-yellow">
                    Cylinder Installation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about-us" className="text-gray-300 hover:text-brand-yellow">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/get-a-quote" className="text-gray-300 hover:text-brand-yellow">
                    Get a Quote
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-gray-300 hover:text-brand-yellow">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <address className="not-italic text-sm text-gray-300 space-y-2">
                <p>2 Broomfield Road</p>
                <p>LONDON</p>
                <p>London</p>
                <p>W13 9AP</p>
                <p className="pt-2">
                  <a href="tel:07712599254" className="hover:text-brand-yellow">
                    07712 599254
                  </a>
                </p>
                <p>
                  <a href="mailto:info@hhplumbing.com" className="hover:text-brand-yellow">
                    info@hhplumbing.com
                  </a>
                </p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} HH Plumbing and Gas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
