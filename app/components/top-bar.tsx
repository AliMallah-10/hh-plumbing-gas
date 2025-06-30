import { Phone, Mail, Instagram } from "lucide-react";
import { TikTokIcon } from "./icons/tiktok-icon";

export function TopBar() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-2 sm:py-3 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center gap-2">
        {/* contact info */}
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-xs sm:text-sm">
          <a href="tel:07712599254" className="flex items-center group">
            <div className="bg-brand-yellow/20 rounded-full p-1.5 mr-2 group-hover:bg-brand-yellow/30 transition-all duration-300">
              <Phone className="h-3 w-3 text-brand-yellow" />
            </div>
            <span className="group-hover:text-brand-yellow transition-colors duration-300">
              07712 599254
            </span>
          </a>
          <a
            href="mailto:info@hhplumbing.com"
            className="flex items-center group"
          >
            <div className="bg-brand-yellow/20 rounded-full p-1.5 mr-2 group-hover:bg-brand-yellow/30 transition-all duration-300">
              <Mail className="h-3 w-3 text-brand-yellow" />
            </div>
            <span className="group-hover:text-brand-yellow transition-colors duration-300">
              info@hhplumbing.com
            </span>
          </a>
        </div>

        {/* social icons */}
        <div className="flex items-center gap-3 mt-1 sm:mt-0">
          <a
            href="https://www.instagram.com/hhplumbingandgas"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-brand-yellow"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://www.tiktok.com/@hussainhachem1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:text-brand-yellow"
            aria-label="Follow us on TikTok"
          >
            <TikTokIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
