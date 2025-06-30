import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Clock, Shield, PenToolIcon as Tool, AlertTriangle, PhoneCall } from "lucide-react"
import { Header } from "../../components/header"
import { TopBar } from "../../components/top-bar"

export default function EmergencyRepairsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="relative h-[300px] md:h-[450px] overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=1200&text=Emergency+Plumbing+Repairs"
            alt="Emergency Plumbing Repairs"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Emergency Repairs</h1>
              <p className="text-xl text-white max-w-2xl">
                Fast, reliable emergency plumbing and heating repairs available 24/7.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Emergency Repair Services</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                At HH Plumbing and Gas, we understand that plumbing and heating emergencies can happen at any time.
                That's why we offer a comprehensive emergency repair service to quickly resolve issues and minimize
                damage to your property.
              </p>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Our team of experienced engineers is available 24/7 to respond to emergencies, equipped with the tools
                and expertise to handle a wide range of plumbing and heating issues.
              </p>

              <div className="bg-brand-yellow/10 border-l-4 border-brand-yellow p-4 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-brand-yellow mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Emergency Hotline</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      For immediate assistance with plumbing or heating emergencies, call our 24/7 emergency number:
                    </p>
                    <a
                      href="tel:07712599254"
                      className="text-xl font-bold mt-2 inline-block hover:text-brand-yellow transition-colors"
                    >
                      07712 599254
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">Why Choose Us for Emergency Repairs?</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "24/7 emergency response service",
                  "Fast arrival times",
                  "Experienced and Gas Safe registered engineers",
                  "Fully equipped vans to handle most repairs on the spot",
                  "Transparent pricing with no hidden charges",
                  "Temporary solutions when immediate full repairs aren't possible",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-brand-yellow text-black hover:bg-opacity-90 transition-colors"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Plumbing Emergencies We Handle</h3>
                <ul className="space-y-2 mb-4">
                  {[
                    "Burst or leaking pipes",
                    "Blocked toilets, sinks, and drains",
                    "Water heater failures",
                    "Leaking taps and fixtures",
                    "Flooding issues",
                    "Frozen pipes in winter",
                    "Sewer line backups",
                    "Water pump failures",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 bg-brand-yellow rounded-full mt-2 mr-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Heating Emergencies We Handle</h3>
                <ul className="space-y-2 mb-4">
                  {[
                    "Boiler breakdowns",
                    "Central heating failures",
                    "Gas leaks (requiring immediate attention)",
                    "Carbon monoxide concerns",
                    "Radiator leaks",
                    "Thermostat malfunctions",
                    "Pump failures",
                    "No hot water",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 bg-brand-yellow rounded-full mt-2 mr-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Emergency Response Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: <PhoneCall className="h-8 w-8 text-brand-yellow" />,
                  title: "Call Our Emergency Line",
                  description:
                    "Contact our 24/7 emergency number. Our team will ask about your emergency to prepare appropriately.",
                },
                {
                  icon: <Clock className="h-8 w-8 text-brand-yellow" />,
                  title: "Rapid Response",
                  description: "We'll dispatch the nearest available engineer to your location as quickly as possible.",
                },
                {
                  icon: <Tool className="h-8 w-8 text-brand-yellow" />,
                  title: "Assessment & Repair",
                  description:
                    "Our engineer will assess the situation, explain what's needed, and carry out the necessary repairs.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-brand-yellow" />,
                  title: "Follow-up & Prevention",
                  description:
                    "After resolving the emergency, we'll advise on preventing similar issues in the future.",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Emergency Prevention Tips</h2>
            <p className="text-lg mb-8 text-center text-gray-700 dark:text-gray-300">
              While we're always ready to help with emergencies, here are some tips to help prevent common plumbing and
              heating issues:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Plumbing Prevention</h3>
                <ul className="space-y-3">
                  {[
                    "Know where your main water shut-off valve is located",
                    "Don't pour fats, oils, or grease down drains",
                    "Use drain guards to catch hair and debris",
                    "Avoid flushing anything other than toilet paper",
                    "Check for leaks regularly and fix them promptly",
                    "Insulate pipes in cold areas to prevent freezing",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Heating Prevention</h3>
                <ul className="space-y-3">
                  {[
                    "Schedule annual boiler and heating system maintenance",
                    "Bleed radiators regularly to remove air pockets",
                    "Maintain proper pressure in your heating system",
                    "Install carbon monoxide detectors and check them regularly",
                    "Keep boiler and heating areas clear of obstructions",
                    "Consider a smart thermostat to monitor your system",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12 dark:bg-gray-900">
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
