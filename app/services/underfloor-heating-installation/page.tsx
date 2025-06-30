import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Thermometer, Zap, Droplet, Home, Ban } from "lucide-react"
import { Header } from "../../components/header"
import { TopBar } from "../../components/top-bar"

export default function UnderfloorHeatingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="relative h-[300px] md:h-[450px] overflow-hidden">
          <Image
            src="/images/underfloor2.jpg?height=400&width=1200&text=Underfloor+Heating+Installation"
            alt="Underfloor Heating Installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Underfloor Heating Installation</h1>
              <p className="text-xl text-white max-w-2xl">
                Luxurious and efficient heating solutions for optimal comfort and energy savings.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Underfloor Heating Services</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                At HH Plumbing and Gas, we specialize in the installation of high-quality underfloor heating systems
                that provide efficient, comfortable warmth throughout your home. Our expert team delivers tailored
                solutions for both wet (water-based) and electric underfloor heating systems.
              </p>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Whether you're renovating your property or building a new home, our underfloor heating installations
                offer an energy-efficient alternative to traditional radiators, providing even heat distribution and
                freeing up valuable wall space.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Why Choose Us for Underfloor Heating?</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Experienced and certified installation specialists",
                  "Comprehensive system design and planning",
                  "Integration with existing or new heating systems",
                  "Energy-efficient solutions that reduce heating costs",
                  "Compatible with various floor finishes",
                  "Full testing and commissioning",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-brand-yellow text-black hover:bg-opacity-90 transition-colors rounded-xl"
              >
                Get a quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Wet Underfloor Heating</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Wet underfloor heating systems circulate warm water through a network of pipes installed beneath your
                  floor. These systems connect to your boiler or heat pump and are ideal for new builds or major
                  renovations.
                </p>
                <h4 className="font-medium mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-4">
                  {[
                    "More energy-efficient than electric systems for larger areas",
                    "Lower running costs over time",
                    "Compatible with various heat sources including boilers and heat pumps",
                    "Ideal for new construction projects",
                    "Even heat distribution across the entire floor area",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 bg-brand-yellow rounded-full mt-2 mr-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Electric Underfloor Heating</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Electric underfloor heating uses heating mats or cables installed beneath your floor covering. These
                  systems are easier to install and ideal for retrofitting in existing rooms, particularly bathrooms and
                  kitchens.
                </p>
                <h4 className="font-medium mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-4">
                  {[
                    "Easier and less disruptive to install than wet systems",
                    "Lower installation costs",
                    "Ideal for retrofitting in existing properties",
                    "Perfect for smaller areas like bathrooms",
                    "Quick heat-up times",
                    "Minimal maintenance required",
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
            <h2 className="text-3xl font-bold mb-12 text-center">Benefits of Underfloor Heating</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Thermometer className="h-8 w-8 text-brand-yellow" />,
                  title: "Even Heat Distribution",
                  description:
                    "Underfloor heating provides consistent warmth across the entire floor area, eliminating cold spots found with traditional radiators.",
                },
                {
                  icon: <Zap className="h-8 w-8 text-brand-yellow" />,
                  title: "Energy Efficiency",
                  description:
                    "Operates at lower temperatures than radiators while providing the same level of comfort, reducing energy consumption and costs.",
                },
                {
                  icon: <Home className="h-8 w-8 text-brand-yellow" />,
                  title: "Space Saving",
                  description:
                    "Hidden beneath your floor, underfloor heating frees up wall space that would otherwise be occupied by radiators.",
                },
                {
                  icon: <Droplet className="h-8 w-8 text-brand-yellow" />,
                  title: "Healthier Environment",
                  description:
                    "Reduces dust circulation compared to radiators and creates a more comfortable living environment.",
                },
                {
                  icon: <Ban className="h-8 w-8 text-brand-yellow" />,
                  title: "Minimal Maintenance",
                  description:
                    "Once properly installed, underfloor heating systems require very little maintenance and have a long lifespan.",
                },
                {
                  icon: <Check className="h-8 w-8 text-brand-yellow" />,
                  title: "Compatible with All Floor Types",
                  description: "Works with various floor finishes including tile, stone, wood, laminate, and carpet.",
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
          <h2 className="text-3xl font-bold mb-12 text-center">Our Installation Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description:
                  "We assess your property, discuss your requirements, and recommend the most suitable underfloor heating system.",
              },
              {
                step: "2",
                title: "System Design",
                description:
                  "Our experts design a bespoke underfloor heating system tailored to your property's specific needs.",
              },
              {
                step: "3",
                title: "Professional Installation",
                description:
                  "Our skilled technicians install your underfloor heating system with minimal disruption to your home.",
              },
              {
                step: "4",
                title: "Testing & Handover",
                description:
                  "We thoroughly test the system, provide comprehensive guidance on operation, and ensure everything works perfectly.",
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
