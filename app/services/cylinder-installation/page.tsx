import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Header } from "../../components/header"
import { TopBar } from "../../components/top-bar"

export default function CylinderInstallationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=1200&text=Cylinder+Installation"
            alt="Cylinder Installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cylinder Installation</h1>
              <p className="text-xl text-white max-w-2xl">
                Professional installation of direct and indirect hot water cylinders for efficient water heating.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Cylinder Installation Services</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                At HH Plumbing and Gas, we specialize in the professional installation of hot water cylinders to ensure
                your home has a reliable and efficient hot water supply. We offer both direct and indirect cylinder
                options to suit your specific needs and property requirements.
              </p>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Our team of experienced engineers will help you choose the right cylinder type and size for your
                property, ensuring optimal performance and energy efficiency.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Why Choose Us for Cylinder Installation?</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Experienced and Gas Safe registered engineers",
                  "Installation of leading cylinder brands",
                  "Comprehensive system testing and commissioning",
                  "Full compliance with building regulations",
                  "Competitive pricing and transparent quotes",
                  "Excellent aftercare and warranty support",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-brand-yellow text-black hover:bg-opacity-90 transition-colors"
              >
                Get a quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Direct Cylinders</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Direct cylinders heat water using an immersion heater that's fitted inside the cylinder. The immersion
                  heater works like a kettle element, using electricity to heat the water.
                </p>
                <h4 className="font-medium mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-4">
                  {[
                    "Simpler installation process",
                    "No need for a separate boiler",
                    "Can be used with economy 7 electricity tariffs",
                    "Good option for properties without gas supply",
                    "Lower initial installation cost",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 bg-brand-yellow rounded-full mt-2 mr-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Indirect Cylinders</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Indirect cylinders are heated by your central heating boiler through a coil inside the cylinder. The
                  hot water from your boiler passes through this coil, which then heats the water in the cylinder.
                </p>
                <h4 className="font-medium mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-4">
                  {[
                    "More energy-efficient when used with a modern boiler",
                    "Faster water heating times",
                    "Can be more economical to run than direct cylinders",
                    "Ideal for properties with existing central heating systems",
                    "Can be integrated with solar thermal systems for greater efficiency",
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Cylinder Installation Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Initial Consultation",
                  description:
                    "We assess your hot water needs, property layout, and existing systems to recommend the best cylinder solution.",
                },
                {
                  step: "2",
                  title: "Detailed Quote",
                  description:
                    "We provide a comprehensive quote outlining all costs, cylinder specifications, and installation timeline.",
                },
                {
                  step: "3",
                  title: "Professional Installation",
                  description:
                    "Our Gas Safe registered engineers install your new cylinder with minimal disruption to your home.",
                },
                {
                  step: "4",
                  title: "Testing & Handover",
                  description:
                    "We thoroughly test the system, explain how to use it efficiently, and provide all necessary documentation.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-brand-yellow text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
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
