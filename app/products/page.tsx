"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { formatPrice } from "@/lib/utils"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCategory = searchParams.get("category") || ""
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [priceRange, setPriceRange] = useState([0, 30000]) // $0 to $300
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [filteredProducts, setFilteredProducts] = useState(products)

  const categories = Array.from(new Set(products.map((product) => product.category)))

  useEffect(() => {
    // Apply filters
    let filtered = products

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    setFilteredProducts(filtered)
  }, [searchQuery, priceRange, selectedCategories])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(
      `/products?q=${encodeURIComponent(searchQuery)}${
        selectedCategories.length > 0 ? `&category=${encodeURIComponent(selectedCategories.join(","))}` : ""
      }`,
    )
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 30000])
    setSelectedCategories([])
    setSearchQuery("")
    router.push("/products")
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4 w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="py-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-emerald-900">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-emerald-900">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={priceRange}
                    max={30000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                  <div className="flex items-center justify-between">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                Clear Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-1/4 bg-white p-6 rounded-xl border border-emerald-100 shadow-sm sticky top-24">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-900">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-900">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={priceRange}
                  max={30000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Products</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products found</p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-emerald-200 focus-visible:ring-emerald-500"
            />
            <Button type="submit" className="absolute right-1 top-1 bg-coral-600 hover:bg-coral-700 text-white">
              Search
            </Button>
          </form>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="mt-4 border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

