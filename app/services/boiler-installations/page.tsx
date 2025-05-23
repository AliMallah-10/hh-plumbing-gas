import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Flame, Zap, Leaf, Clock, Shield } from "lucide-react"
import { Header } from "../../components/header"
import { TopBar } from "../../components/top-bar"

export default function BoilerInstallationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=1200&text=Boiler+Installations"
            alt="Boiler Installations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Boiler Installations</h1>
              <p className="text-xl text-white max-w-2xl">
                Professional installation of high-efficiency boilers from leading manufacturers.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Boiler Installation Services</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                At HH Plumbing and Gas, we specialize in the professional installation of high-efficiency boilers for
                both residential and commercial properties. Our team of Gas Safe registered engineers has extensive
                experience installing boilers from all leading manufacturers.
              </p>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                We provide a comprehensive service from initial consultation and system design through to installation,
                commissioning, and aftercare, ensuring your new boiler operates at peak efficiency for years to come.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Why Choose Us for Your Boiler Installation?</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Gas Safe registered engineers with extensive experience",
                  "Installation of all major boiler brands",
                  "Comprehensive system design and planning",
                  "Transparent, competitive pricing",
                  "Extended warranties on parts and labor",
                  "Excellent aftercare service",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-brand-yellow text-black hover:bg-opacity-90 transition-colors rounded-md"
              >
                Get a quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Brands We Install</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We are approved installers for all major boiler manufacturers, allowing us to offer you the best
                  options for your specific needs and budget.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <Image
                      src="/images/vaillant-logo-new.png"
                      alt="Vaillant"
                      width={100}
                      height={50}
                      className="object-contain h-12"
                    />
                  </div>
                  <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <Image
                      src="/images/worcester-bosch-new.png"
                      alt="Worcester Bosch"
                      width={100}
                      height={50}
                      className="object-contain h-12"
                    />
                  </div>
                  <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <Image
                      src="/images/baxi-logo.png"
                      alt="Baxi"
                      width={100}
                      height={50}
                      className="object-contain h-12"
                    />
                  </div>
                  <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-700 rounded-lg">
                    <Image
                      src="/images/glow-worm-logo.png"
                      alt="Glow Worm"
                      width={100}
                      height={50}
                      className="object-contain h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Types of Boilers We Install</h3>
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-medium">Combi Boilers</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Provide both heating and hot water on demand without the need for separate water tanks or
                      cylinders. Ideal for smaller properties with limited space.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-medium">System Boilers</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Work with a hot water cylinder to provide heating and stored hot water. Perfect for properties
                      with multiple bathrooms or high hot water demand.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-medium">Regular Boilers</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Also known as conventional or heat-only boilers, these work with both a hot water cylinder and a
                      cold water storage tank. Suitable for older heating systems or properties with low water pressure.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Benefits of a New Boiler Installation</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-8 w-8 text-brand-yellow" />,
                  title: "Energy Efficiency",
                  description:
                    "Modern boilers are significantly more energy-efficient than older models, potentially reducing your heating bills by up to 30%.",
                },
                {
                  icon: <Flame className="h-8 w-8 text-brand-yellow" />,
                  title: "Improved Heating",
                  description:
                    "Enjoy more consistent heating throughout your property with better temperature control and faster warm-up times.",
                },
                {
                  icon: <Leaf className="h-8 w-8 text-brand-yellow" />,
                  title: "Reduced Carbon Footprint",
                  description:
                    "High-efficiency boilers produce fewer carbon emissions, helping you reduce your environmental impact.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-brand-yellow" />,
                  title: "Reliability & Peace of Mind",
                  description:
                    "New boilers are less likely to break down and come with manufacturer warranties for added peace of mind.",
                },
                {
                  icon: <Clock className="h-8 w-8 text-brand-yellow" />,
                  title: "Space Saving",
                  description:
                    "Modern boilers, especially combi models, are more compact than older systems, freeing up valuable space in your home.",
                },
                {
                  icon: <Check className="h-8 w-8 text-brand-yellow" />,
                  title: "Added Property Value",
                  description:
                    "A new, efficient boiler can increase your property's value and appeal to potential buyers or tenants.",
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
          <h2 className="text-3xl font-bold mb-12 text-center">Our Boiler Installation Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description:
                  "We assess your heating needs, property size, and hot water requirements to recommend the most suitable boiler options.",
              },
              {
                step: "2",
                title: "Detailed Quote",
                description:
                  "We provide a comprehensive quote outlining all costs, boiler specifications, and installation timeline.",
              },
              {
                step: "3",
                title: "Professional Installation",
                description:
                  "Our Gas Safe registered engineers install your new boiler with minimal disruption to your home.",
              },
              {
                step: "4",
                title: "Testing & Handover",
                description:
                  "We thoroughly test the system, explain how to use it efficiently, and provide all necessary documentation and warranties.",
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
