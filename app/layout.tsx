import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { CartProvider } from "@/lib/use-cart"
import { WishlistProvider } from "@/lib/use-wishlist"
import { RecentlyViewedProvider } from "@/lib/use-recently-viewed"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoShop - Modern E-commerce Store",
  description: "A modern e-commerce store built with Next.js",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                  <footer className="border-t py-6 md:py-8">
                    <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium text-emerald-900">About Us</h3>
                        <ul className="space-y-2">
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Our Story
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Careers
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Press
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Blog
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium text-emerald-900">Customer Service</h3>
                        <ul className="space-y-2">
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Help Center
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Returns & Exchanges
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Shipping Information
                            </a>
                          </li>
                          <li>
                            <a href="/contact" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Contact Us
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium text-emerald-900">Policies</h3>
                        <ul className="space-y-2">
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Terms of Service
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Privacy Policy
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Accessibility
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-emerald-600">
                              Cookie Policy
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium text-emerald-900">Connect With Us</h3>
                        <div className="flex space-x-4">
                          <a href="#" className="text-muted-foreground hover:text-emerald-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                          </a>
                          <a href="#" className="text-muted-foreground hover:text-emerald-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                          </a>
                          <a href="#" className="text-muted-foreground hover:text-emerald-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                          </a>
                          <a href="#" className="text-muted-foreground hover:text-emerald-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Subscribe to our newsletter for updates on new products and special offers.
                        </p>
                      </div>
                    </div>
                    <div className="container mt-8 border-t pt-6">
                      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-center text-sm text-muted-foreground md:text-left">
                          © 2024 EcoShop. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4">
                          <img src="/placeholder.svg?height=32&width=32&text=Visa" alt="Visa" className="h-8" />
                          <img src="/placeholder.svg?height=32&width=32&text=MC" alt="Mastercard" className="h-8" />
                          <img
                            src="/placeholder.svg?height=32&width=32&text=Amex"
                            alt="American Express"
                            className="h-8"
                          />
                          <img src="/placeholder.svg?height=32&width=32&text=PayPal" alt="PayPal" className="h-8" />
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
                <Toaster />
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'