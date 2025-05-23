"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Phone, Mail, Instagram, Smartphone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { Logo } from "../components/logo"
import { Navigation } from "../components/navigation"
import { TopBar } from "../components/top-bar"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <header className="container mx-auto py-6 px-4 flex items-center justify-between border-b">
        <Logo />
        <Navigation />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-black to-gray-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Contact
              <span className="block bg-gradient-to-r from-brand-yellow to-yellow-300 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get in touch for professional plumbing and heating services. We're here to help with fast responses.
            </p>
            <a href="tel:07712599254" className="btn-primary text-lg px-8 py-4 rounded-md">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 07712 599254
            </a>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold gradient-text mb-8">Get In Touch</h2>

                <div className="space-y-6">
                  <div className="flex items-start p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-brand-yellow to-yellow-400 p-3 mr-4">
                      <Phone className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Phone</h3>
                      <a
                        href="tel:07712599254"
                        className="text-lg font-medium hover:text-brand-yellow transition-colors"
                      >
                        07712 599254
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Available 24/7 for emergencies</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 mr-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Email</h3>
                      <a
                        href="mailto:info@hhplumbing.com"
                        className="text-lg font-medium hover:text-blue-600 transition-colors"
                      >
                        info@hhplumbing.com
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 mr-4">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                      <a
                        href="https://wa.me/447712599254"
                        className="text-lg font-medium hover:text-green-600 transition-colors"
                      >
                        Message Us
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Quick messages and photos</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Address</h3>
                      <address className="not-italic text-lg font-medium">
                        2 Broomfield Road
                        <br />
                        London W13 9AP
                      </address>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>Emergency Only</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/hhplumbingandgas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 text-white hover:shadow-lg transition-all duration-300 rounded-md"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@hussain_hachem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-gray-800 to-black p-3 text-white hover:shadow-lg transition-all duration-300 rounded-md"
                    >
                      <Smartphone className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Send Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-brand-yellow focus:outline-none transition-colors duration-300 rounded-md"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-brand-yellow focus:outline-none transition-colors duration-300 rounded-md"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-brand-yellow focus:outline-none transition-colors duration-300 rounded-md"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-brand-yellow focus:outline-none transition-colors duration-300 resize-none rounded-md"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full text-lg py-4 rounded-md">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
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
