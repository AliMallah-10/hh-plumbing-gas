import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { supabase } from "./lib/supabase"

export async function middleware(request: NextRequest) {
  // Only apply middleware to admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Allow access to login page
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  try {
    // Get token from cookies or authorization header
    const token =
      request.cookies.get("sb-access-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Verify token with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Check if user is admin
    const isAdmin = await checkIfUserIsAdmin(user.email)

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/admin/login?error=unauthorized", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

async function checkIfUserIsAdmin(email: string | undefined): Promise<boolean> {
  if (!email) return false

  // Check against server-side admin email
  const adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail && email === adminEmail) {
    return true
  }

  // Check user role in the user_roles table
  try {
    const { data, error } = await supabase.from("user_roles").select("role").eq("email", email).single()

    if (!error && data?.role === "admin") {
      return true
    }
  } catch (error) {
    console.error("Error checking user role:", error)
  }

  return false
}

export const config = {
  matcher: "/admin/:path*",
}
