"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/products"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map((product) => product.category)))

  // Add some additional categories for a more complete page
  const allCategories = [
    ...categories,
    "Clothing",
    "Shoes",
    "Jewelry",
    "Beauty",
    "Sports",
    "Outdoor",
    "Books",
    "Toys",
    "Automotive",
  ]

  // Filter categories based on search query
  const filteredCategories = allCategories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get a sample product image for each category
  const getCategoryImage = (category: string) => {
    const productInCategory = products.find((p) => p.category === category)
    return productInCategory?.image || `/placeholder.svg?height=300&width=300&text=${category}`
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-900">
            Shop by Category
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse our wide range of products across different categories
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-emerald-200 focus-visible:ring-emerald-500"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <Link
            key={category}
            href={`/products?category=${category}`}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/90 group-hover:to-emerald-800/90 transition-all duration-300" />
            <Image
              src={getCategoryImage(category) || "/placeholder.svg"}
              alt={category}
              width={300}
              height={300}
              className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-lg">{category}</h3>
              <p className="text-sm text-emerald-100 flex items-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop now <ArrowRight className="ml-1 h-4 w-4" />
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-xl aspect-[16/9] group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent group-hover:from-purple-800/80 transition-all duration-300" />
            <Image
              src="/placeholder.svg?height=400&width=800&text=Summer+Collection"
              alt="Summer Collection"
              width={800}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Summer Collection</h3>
              <p className="text-white/80 max-w-xs mb-4">
                Discover our latest summer styles and accessories for the season.
              </p>
              <Button asChild className="w-fit bg-white text-purple-900 hover:bg-purple-50">
                <Link href="/products?collection=summer">Explore Collection</Link>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl aspect-[16/9] group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-transparent group-hover:from-amber-800/80 transition-all duration-300" />
            <Image
              src="/placeholder.svg?height=400&width=800&text=New+Arrivals"
              alt="New Arrivals"
              width={800}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
              <p className="text-white/80 max-w-xs mb-4">Check out our newest products just added to our inventory.</p>
              <Button asChild className="w-fit bg-white text-amber-900 hover:bg-amber-50">
                <Link href="/products?sort=newest">Shop New Arrivals</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Benefits */}
      <div className="mt-16 bg-emerald-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Why Shop by Category?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the benefits of our category-based shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 mx-auto">
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
                className="h-6 w-6 text-emerald-600"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-center text-emerald-900 mb-2">Easy Navigation</h3>
            <p className="text-center text-muted-foreground">
              Find exactly what you're looking for with our intuitive category system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 mx-auto">
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
                className="h-6 w-6 text-emerald-600"
              >
                <path d="M12 2v8" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m16 6-4 4-4-4" />
                <path d="M16 18a4 4 0 0 0-8 0" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-center text-emerald-900 mb-2">Discover New Products</h3>
            <p className="text-center text-muted-foreground">
              Explore related items and discover new products you'll love.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 mx-auto">
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
                className="h-6 w-6 text-emerald-600"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-center text-emerald-900 mb-2">Curated Selection</h3>
            <p className="text-center text-muted-foreground">
              Each category features hand-picked items chosen for quality and value.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

