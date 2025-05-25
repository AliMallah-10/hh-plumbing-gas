import Link from "next/link"
import { Phone, Mail, Instagram, Smartphone, MapPin, ArrowRight } from "lucide-react"
import { Logo } from "../components/logo"
import { Navigation } from "../components/navigation"
import { TopBar } from "../components/top-bar"

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <header className="container mx-auto py-6 px-4 flex items-center justify-between border-b">
        <Logo />
        <Navigation />
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center gradient-text">Contact Us</h1>
            <p className="text-lg text-gray-700 mb-12 text-center">
              Get in touch with our team for any inquiries or to schedule a service.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start card-hover p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="bg-gradient-to-br from-brand-yellow to-yellow-400 p-4 rounded-2xl mr-6 shadow-lg">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Phone</h3>
                    <p className="text-gray-600 mb-1">Call us for immediate assistance</p>
                    <a href="tel:07712599254" className="text-lg font-medium hover:text-brand-yellow transition-colors">
                      07712 599254
                    </a>
                  </div>
                </div>

                <div className="flex items-start card-hover p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="bg-gradient-to-br from-brand-yellow to-yellow-400 p-4 rounded-2xl mr-6 shadow-lg">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="text-gray-600 mb-1">Send us an email anytime</p>
                    <a
                      href="mailto:info@hhplumbing.com"
                      className="text-lg font-medium hover:text-brand-yellow transition-colors"
                    >
                      info@hhplumbing.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start card-hover p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="bg-gradient-to-br from-brand-yellow to-yellow-400 p-4 rounded-2xl mr-6 shadow-lg">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Address</h3>
                    <p className="text-gray-600 mb-1">Our office location</p>
                    <address className="not-italic text-lg font-medium">
                      2 Broomfield Road
                      <br />
                      LONDON
                      <br />
                      London
                      <br />
                      W13 9AP
                    </address>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between border-b pb-2">
                      <span className="font-medium">Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/hhplumbingandgas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-gray-100 hover:bg-brand-yellow p-3 rounded-full transition-colors"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@hussain_hachem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-gray-100 hover:bg-brand-yellow p-3 rounded-full transition-colors"
                    >
                      <Smartphone className="h-6 w-6" />
                    </a>
                  </div>
                  <p className="mt-4 text-gray-600">
                    Follow us on social media for tips, project showcases, and special offers.
                  </p>
                </div>

                <div className="pt-4">
                  <Link href="/get-a-quote" className="btn-primary w-full text-lg">
                    Get a Quote
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
