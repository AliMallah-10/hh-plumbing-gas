import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Droplet, PenToolIcon as Tool, Clock, Shield, Star } from "lucide-react"
import { Header } from "../../components/header"
import { TopBar } from "../../components/top-bar"

export default function BathroomInstallationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src="/images/modern-bathroom.jpeg"
            alt="Bathroom Installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bathroom Installation</h1>
              <p className="text-xl text-white max-w-2xl">
                Transform your bathroom with our professional design and installation services.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Bathroom Installation Services</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                At HH Plumbing and Gas, we offer comprehensive bathroom installation services that transform your ideas
                into reality. From small updates to complete renovations, our skilled team handles every aspect of your
                bathroom project with precision and care.
              </p>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                We work with you from the initial design consultation through to the final installation, ensuring your
                new bathroom meets your exact specifications and is completed to the highest standards.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Why Choose Us for Your Bathroom Installation?</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Experienced bathroom installation specialists",
                  "Comprehensive design and planning services",
                  "High-quality fixtures and fittings",
                  "Fully qualified plumbers and electricians",
                  "Tiling, flooring, and decoration services",
                  "Project management from start to finish",
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
                <h3 className="text-xl font-semibold mb-4">Complete Bathroom Renovations</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our complete bathroom renovation service covers everything from removing your old bathroom to
                  installing your new one, including all plumbing, electrical work, tiling, and decoration.
                </p>
                <h4 className="font-medium mb-2">What's included:</h4>
                <ul className="space-y-2 mb-4">
                  {[
                    "Initial design consultation and planning",
                    "Removal and disposal of existing bathroom",
                    "Installation of new bathroom suite",
                    "All plumbing and electrical work",
                    "Tiling, flooring, and decoration",
                    "Final inspection and handover",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 bg-brand-yellow rounded-full mt-2 mr-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Bathroom Updates</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you're looking to refresh your bathroom rather than completely renovate, our bathroom update
                  service is perfect. We can replace individual items or make specific improvements to transform your
                  space.
                </p>
                <h4 className="font-medium mb-2">Popular updates:</h4>
                <ul className="space-y-2 mb-4">
                  {[
                    "New shower installation or replacement",
                    "Bath replacement or conversion to shower",
                    "Vanity unit and basin replacement",
                    "Toilet replacement",
                    "Tiling and flooring updates",
                    "Heating solutions including underfloor heating",
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
            <h2 className="text-3xl font-bold mb-12 text-center">
              The Benefits of a Professional Bathroom Installation
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Droplet className="h-8 w-8 text-brand-yellow" />,
                  title: "Improved Functionality",
                  description:
                    "A professionally designed bathroom maximizes space and improves functionality, making your daily routine more efficient and enjoyable.",
                },
                {
                  icon: <Tool className="h-8 w-8 text-brand-yellow" />,
                  title: "Quality Workmanship",
                  description:
                    "Our skilled installers ensure every aspect of your bathroom is fitted to the highest standards, preventing future issues and ensuring longevity.",
                },
                {
                  icon: <Clock className="h-8 w-8 text-brand-yellow" />,
                  title: "Time-Efficient Installation",
                  description:
                    "With our experienced team, your bathroom installation is completed efficiently, minimizing disruption to your home life.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-brand-yellow" />,
                  title: "Warranty Protection",
                  description:
                    "All our bathroom installations come with comprehensive warranties on both products and workmanship for your peace of mind.",
                },
                {
                  icon: <Star className="h-8 w-8 text-brand-yellow" />,
                  title: "Increased Property Value",
                  description:
                    "A modern, well-designed bathroom can significantly increase your property's value and appeal to potential buyers.",
                },
                {
                  icon: <Check className="h-8 w-8 text-brand-yellow" />,
                  title: "Complete Project Management",
                  description:
                    "We handle every aspect of your bathroom installation, from design to completion, ensuring a stress-free experience.",
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
          <h2 className="text-3xl font-bold mb-12 text-center">Our Bathroom Installation Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description:
                  "We discuss your ideas, requirements, and budget to understand your vision for your new bathroom.",
              },
              {
                step: "2",
                title: "Design & Planning",
                description:
                  "Our designers create a detailed plan for your bathroom, including product selection and layout.",
              },
              {
                step: "3",
                title: "Professional Installation",
                description:
                  "Our skilled team installs your new bathroom with attention to detail and minimal disruption.",
              },
              {
                step: "4",
                title: "Final Inspection & Handover",
                description:
                  "We thoroughly inspect the completed bathroom and provide you with all necessary information and warranties.",
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
