import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Leaf, Zap, Thermometer, Home, Shield } from "lucide-react"
import { Header } from "../../components/header"
import { TopBar } from "../../components/top-bar"

export default function HeatPumpInstallationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=1200&text=Heat+Pump+Installations"
            alt="Heat Pump Installations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Heat Pump Installations</h1>
              <p className="text-xl text-white max-w-2xl">
                Expert installation of energy-efficient heat pump systems for sustainable heating and cooling.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Heat Pump Installation Services</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                At HH Plumbing and Gas, we specialize in the professional installation of heat pump systems that provide
                efficient, sustainable heating and cooling for your property. Our team of experienced engineers is fully
                qualified to install both air source and ground source heat pumps.
              </p>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Heat pumps are an environmentally friendly alternative to traditional heating systems, extracting heat
                from the air or ground to warm your home efficiently, even in colder temperatures.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Why Choose Us for Heat Pump Installation?</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Experienced and qualified heat pump installers",
                  "Extensive experience with leading heat pump brands",
                  "Comprehensive system design and planning",
                  "Expert advice on the most suitable system for your property",
                  "Full installation, commissioning, and aftercare",
                  "Assistance with available grants and incentives",
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
                <h3 className="text-xl font-semibold mb-4">Air Source Heat Pumps</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Air source heat pumps extract heat from the outside air and transfer it to your home's heating system.
                  They can operate efficiently even when outdoor temperatures are as low as -15°C.
                </p>
                <h4 className="font-medium mb-2">Benefits:</h4>
                <ul className="space-y-2 mb-4">
                  {[
                    "Lower installation costs compared to ground source heat pumps",
                    "Easier and less disruptive installation process",
                    "Can provide both heating and cooling",
                    "Reduced carbon emissions compared to gas or oil heating",
                    "Lower running costs than traditional heating systems",
                    "Minimal maintenance requirements",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 bg-brand-yellow rounded-full mt-2 mr-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Brands We Install</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We are approved installers for leading heat pump manufacturers, ensuring you get the highest quality
                  equipment with proper installation.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <Image
                      src="/images/vaillant-logo.png"
                      alt="Vaillant"
                      width={100}
                      height={50}
                      className="object-contain h-12"
                    />
                  </div>
                  <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <Image
                      src="/images/mitsubishi-electric-logo.png"
                      alt="Mitsubishi Electric"
                      width={180}
                      height={50}
                      className="object-contain h-10"
                    />
                  </div>
                  <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <Image
                      src="/images/daikin-logo.png"
                      alt="Daikin"
                      width={100}
                      height={50}
                      className="object-contain h-12"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Benefits of Heat Pump Systems</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Leaf className="h-8 w-8 text-brand-yellow" />,
                  title: "Environmentally Friendly",
                  description:
                    "Heat pumps produce significantly lower carbon emissions than traditional heating systems, helping reduce your carbon footprint.",
                },
                {
                  icon: <Zap className="h-8 w-8 text-brand-yellow" />,
                  title: "Energy Efficiency",
                  description:
                    "Heat pumps can be 300-400% efficient, meaning they can produce 3-4 units of heat for every unit of electricity used.",
                },
                {
                  icon: <Thermometer className="h-8 w-8 text-brand-yellow" />,
                  title: "Year-Round Comfort",
                  description:
                    "Many heat pump systems can provide both heating in winter and cooling in summer, offering year-round climate control.",
                },
                {
                  icon: <Home className="h-8 w-8 text-brand-yellow" />,
                  title: "Long Lifespan",
                  description:
                    "Heat pumps typically last 15-20 years, longer than many traditional heating systems, providing excellent long-term value.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-brand-yellow" />,
                  title: "Low Maintenance",
                  description:
                    "Heat pumps require minimal maintenance compared to combustion-based heating systems, with just annual check-ups recommended.",
                },
                {
                  icon: <Check className="h-8 w-8 text-brand-yellow" />,
                  title: "Government Incentives",
                  description:
                    "Various government schemes and incentives are available to help offset the cost of installing heat pump systems.",
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
          <h2 className="text-3xl font-bold mb-12 text-center">Our Heat Pump Installation Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Initial Assessment",
                description:
                  "We assess your property, current heating system, and energy requirements to determine the most suitable heat pump solution.",
              },
              {
                step: "2",
                title: "System Design",
                description:
                  "Our experts design a bespoke heat pump system tailored to your property's specific needs and your heating requirements.",
              },
              {
                step: "3",
                title: "Professional Installation",
                description:
                  "Our qualified engineers install your heat pump system with minimal disruption to your property.",
              },
              {
                step: "4",
                title: "Commissioning & Handover",
                description:
                  "We thoroughly test and commission the system, provide comprehensive guidance on operation, and ensure everything works perfectly.",
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
