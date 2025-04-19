"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Star, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import { FeaturedProducts } from "@/components/featured-products"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Home() {
  const featuredProducts = products.filter((_, index) => index < 4)
  const trendingProducts = products.filter((_, index) => index >= 4 && index < 8)

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate a subscription process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert(`Subscribed with email: ${email}`)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-500 to-teal-500" />
          <div className="relative mx-auto px-4 py-32 sm:px-6 sm:py-40 lg:px-8">
            <div className="max-w-2xl text-center sm:mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Summer Collection 2024
              </h1>
              <p className="mt-6 max-w-xl text-xl text-cyan-100 sm:mx-auto">
                Discover our latest products with premium quality and affordable prices.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-navy-500 hover:bg-cyan-50">
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-navy-500 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-cyan-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-coral-100 text-coral-800 hover:bg-coral-200">Collections</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy-500">
                  Shop by Category
                </h2>
                <p className="max-w-[900px] text-navy-500/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our wide range of products across different categories.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {["Electronics", "Home Office", "Accessories", "Kitchen"].map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category}`}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-500/90 group-hover:to-teal-500/90 transition-all duration-300" />
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=${category}`}
                    alt={category}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg">{category}</h3>
                    <p className="text-sm text-cyan-100 flex items-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop now <ArrowRight className="ml-1 h-4 w-4" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Featured</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy-500">Featured Products</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our handpicked selection of premium products.
                </p>
              </div>
            </div>
            <FeaturedProducts products={featuredProducts} />
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-16 bg-gradient-to-r from-coral-50 to-cyan-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-coral-100 text-coral-800 hover:bg-coral-200">Trending</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-coral-500">
                  Trending Now <TrendingUp className="inline-block ml-2 h-6 w-6" />
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what's popular with our customers this week.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {trendingProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden group border-coral-100 hover:border-coral-300 transition-colors"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-coral-500 hover:bg-coral-600 text-white">Trending</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-navy-500">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="font-semibold text-coral-500">{formatPrice(product.price)}</div>
                    </div>
                    <div className="flex items-center mt-2 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">(42)</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-coral-500 to-teal-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Newsletter</h2>
                <p className="text-cyan-50 md:text-xl/relaxed">
                  Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-coral-300"
                />
                <Button type="submit" disabled={isLoading} className="bg-white text-coral-500 hover:bg-cyan-50">
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-cyan-50">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-500">Free Shipping</h3>
                <p className="mt-2 text-sm text-muted-foreground">Free shipping on all orders over $50</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-yellow-50">
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
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
                    className="h-6 w-6 text-yellow-600"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy-500">Satisfaction Guarantee</h3>
                <p className="mt-2 text-sm text-muted-foreground">30-day money-back guarantee</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-coral-50">
                <div className="h-12 w-12 rounded-full bg-coral-100 flex items-center justify-center mb-4">
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
                    className="h-6 w-6 text-coral-600"
                  >
                    <path d="M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy-500">Secure Payments</h3>
                <p className="mt-2 text-sm text-muted-foreground">We use SSL / Secure encryption</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

