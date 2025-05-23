import Link from "next/link"
import Image from "next/image"
import { Check, Award, Shield, ThumbsUp, Zap, Wrench, ArrowRight } from "lucide-react"
import { Header } from "../components/header"
import { TopBar } from "../components/top-bar"

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=1200&text=About+HH+Plumbing+and+Gas"
            alt="About HH Plumbing and Gas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
              <p className="text-xl text-white max-w-2xl">
                Professional plumbing and heating specialists committed to quality and customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                HH Plumbing and Gas is a trusted provider of professional plumbing and heating services across London.
                With years of experience in the industry, we've built our reputation on delivering exceptional
                workmanship, reliable service, and competitive pricing.
              </p>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Our team of skilled engineers is committed to providing the highest standards of service, ensuring that
                every installation, repair, or maintenance job is completed to perfection. We take pride in our work and
                strive to exceed our customers' expectations on every project.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-6 w-6 text-brand-yellow mr-2" />
                  Our Certifications
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Gas Safe Registered</strong> - Ensuring all gas work is performed safely and legally
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300"></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Approved Installer</strong> - Recognized by leading manufacturers including Vaillant,
                      Worcester Bosch, and Baxi
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Professional+Team"
                  alt="HH Plumbing and Gas Professional Team"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center p-4">
                  <Image
                    src="/images/gas-safe-logo.png"
                    alt="Gas Safe Registered"
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="h-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center p-4"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 py-20 mt-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="h-8 w-8 text-brand-yellow" />,
                  title: "Certified Professionals",
                  description:
                    "Our team consists of Gas Safe registered engineers and MCS certified professionals, ensuring all work meets the highest safety and quality standards.",
                },
                {
                  icon: <ThumbsUp className="h-8 w-8 text-brand-yellow" />,
                  title: "Approved by Leading Brands",
                  description:
                    "We're proud to be approved installers for industry-leading brands including Vaillant, Worcester Bosch, Baxi, and more.",
                },
                {
                  icon: <Zap className="h-8 w-8 text-brand-yellow" />,
                  title: "Competitive Pricing",
                  description:
                    "We offer some of the most competitive prices in the industry without compromising on quality or service.",
                },
                {
                  icon: <Wrench className="h-8 w-8 text-brand-yellow" />,
                  title: "Comprehensive Services",
                  description:
                    "From boiler installations to complete bathroom renovations, we provide a wide range of plumbing and heating services.",
                },
                {
                  icon: <Shield className="h-8 w-8 text-brand-yellow" />,
                  title: "Guaranteed Workmanship",
                  description:
                    "All our installations come with workmanship guarantees, giving you peace of mind in the quality of our service.",
                },
                {
                  icon: <Check className="h-8 w-8 text-brand-yellow" />,
                  title: "Customer Satisfaction",
                  description:
                    "We prioritize customer satisfaction and strive to exceed expectations on every project we undertake.",
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

        <div className="container mx-auto px-4">
          <div className="border-b border-gray-200 dark:border-gray-700 my-4"></div>
        </div>

        <section className="container mx-auto px-4 py-20 mb-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              We offer a comprehensive range of plumbing and heating services at competitive prices. Our team
              specializes in boiler installations, heat pump systems, underfloor heating, and more.
            </p>
            <div className="mt-8">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-brand-yellow text-black hover:bg-opacity-90 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
