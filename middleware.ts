import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  const isOnCheckout = req.nextUrl.pathname.startsWith('/checkout')
  const isOnProfile = req.nextUrl.pathname.startsWith('/profile')
  const isOnOrders = req.nextUrl.pathname.startsWith('/orders')
  const isOnSettings = req.nextUrl.pathname.startsWith('/settings')
  const isOnHome = req.nextUrl.pathname === '/'

  if ((isOnDashboard || isOnCheckout || isOnProfile || isOnOrders || isOnSettings || isOnHome) && !isLoggedIn) {
    return Response.redirect(new URL('/auth/signin', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/settings/:path*",
    "/" // Protect home page
  ]
} 