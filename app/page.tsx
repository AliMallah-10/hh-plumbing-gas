import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Header } from "./components/header"
import { TopBar } from "./components/top-bar"
import { EmployeeTab } from "./components/employee-tab"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-12">
            <div className="mb-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight gradient-text pb-6 leading-tight">
                HH Plumbing &amp; Gas
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-lg leading-relaxed font-light mt-8 text-balance">
                Professional plumbing and gas services with
                <span className="font-medium text-brand-yellow"> timeless reliability</span>,
                <span className="font-medium text-brand-yellow"> exceptional quality</span>, and
                <span className="font-medium text-brand-yellow"> unmatched expertise</span>.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/get-a-quote" className="btn-primary text-lg px-10 py-4 mt-8">
                Get a quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-3">Approved installer for leading brands:</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center">
                <div className="h-16 w-full relative bg-white dark:bg-gray-800 rounded-xl p-3 card-hover border border-gray-200 dark:border-gray-700">
                  <Image
                    src="/images/vaillant-logo-new.png"
                    alt="Vaillant Approved Installer"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-full relative bg-white dark:bg-gray-800 rounded-xl p-3 card-hover border border-gray-200 dark:border-gray-700">
                  <Image
                    src="/images/worcester-bosch-new.png"
                    alt="Worcester Bosch Approved Installer"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-full relative bg-white dark:bg-gray-800 rounded-xl p-3 card-hover border border-gray-200 dark:border-gray-700">
                  <Image
                    src="/images/glow-worm-logo.png"
                    alt="Glow-worm Approved Installer"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-full relative bg-white dark:bg-gray-800 rounded-xl p-3 card-hover border border-gray-200 dark:border-gray-700">
                  <Image
                    src="/images/megaflo-logo.png"
                    alt="Megaflo Approved Installer"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="h-16 w-full relative bg-white dark:bg-gray-800 rounded-xl p-3 card-hover border border-gray-200 dark:border-gray-700">
                  <Image src="/images/baxi-logo.png" alt="Baxi Approved Installer" fill className="object-contain" />
                </div>
                <div className="h-16 w-full relative bg-white dark:bg-gray-800 rounded-xl p-3 card-hover border border-gray-200 dark:border-gray-700">
                  <Image
                    src="/images/main-heating-logo.png"
                    alt="Main Heating Approved Installer"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-all duration-700 card-hover border-4 border-white dark:border-gray-800">
            <Image
              src="/images/modern-bathroom.jpeg"
              alt="Modern bathroom installation with dark tiles and LED lighting"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="bg-black text-white py-16 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Quality Services</h2>
                <p className="text-lg">
                  HH Plumbing and Gas provides exceptional plumbing and gas services for residential and commercial
                  properties. With attention to detail and commitment to quality, we ensure every project meets the
                  highest standards.
                </p>
                <ul className="space-y-3">
                  {[
                    "Boiler Installations",
                    "Heat Pump Installations",
                    "Underfloor Heating Installation",
                    "Cylinder Installation",
                    "Gas Line Installation & Repair",
                  ].map((service, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 bg-brand-yellow rounded-full mt-2 mr-2"></div>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-base font-medium border-b border-brand-yellow pb-1 text-brand-yellow hover:border-white hover:text-white transition-colors"
                  >
                    View all services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center h-[400px]">
                <div className="relative w-full max-w-[350px] h-[350px] mx-auto">
                  <Image
                    src="/images/gas-safe-register.png"
                    alt="Gas Safe Registered - Register Number: 630695"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-white text-center mt-4 font-medium">Fully certified and Gas Safe registered</p>
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

      <EmployeeTab />
    </div>
  )
}
