import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative h-12 w-auto">
        <Image src="/images/logo.svg" alt="HH Plumbing and Gas" width={100} height={50} className="h-12 w-auto" />
      </div>
    </Link>
  )
}
