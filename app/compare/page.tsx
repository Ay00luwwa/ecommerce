"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, ChevronDown, ChevronUp, Minus, ShoppingCart, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/use-cart"
import { useToast } from "@/hooks/use-toast"

export default function ComparePage() {
  // For demo purposes, pre-select some products
  const [selectedProducts, setSelectedProducts] = useState(products.slice(0, 3))
  const [expandedSection, setExpandedSection] = useState<string | null>("all")
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addItem(product)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        duration: 2000,
      })
    }
  }

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const handleAddProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product && !selectedProducts.some((p) => p.id === productId)) {
      setSelectedProducts((prev) => [...prev, product])
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const isSectionExpanded = (section: string) => {
    return expandedSection === section || expandedSection === "all"
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Compare Products</h1>
        <p className="text-muted-foreground">Compare features, specifications, and prices to make the best choice.</p>
      </div>

      {selectedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-emerald-100">
          <div className="mx-auto w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
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
              className="h-12 w-12 text-emerald-600"
            >
              <path d="M16 16v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M15 2H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
              <path d="M21 8H8a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z" />
              <path d="M12 12v4" />
              <path d="M16 12v4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-emerald-900 mb-2">No Products to Compare</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Add products to compare their features, specifications, and prices side by side.
          </p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            <Select onValueChange={handleAddProduct}>
              <SelectTrigger className="w-full sm:w-[250px] border-emerald-200">
                <SelectValue placeholder="Add product to compare" />
              </SelectTrigger>
              <SelectContent>
                {products
                  .filter((p) => !selectedProducts.some((sp) => sp.id === p.id))
                  .map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-teal-200 text-teal-800 hover:bg-teal-50"
              onClick={() => setExpandedSection("all")}
            >
              Expand All
            </Button>
            <Button
              variant="outline"
              className="border-teal-200 text-teal-800 hover:bg-teal-50"
              onClick={() => setExpandedSection(null)}
            >
              Collapse All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-1/4 min-w-[200px] bg-emerald-50 p-4 text-left font-medium text-emerald-900 border border-emerald-100">
                    Product
                  </th>
                  {selectedProducts.map((product) => (
                    <th
                      key={product.id}
                      className="w-1/4 min-w-[200px] p-4 text-center border border-emerald-100 relative"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-red-500"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                      <div className="flex flex-col items-center">
                        <div className="relative h-32 w-32 mb-4">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="font-medium text-emerald-900">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                        <p className="font-semibold text-emerald-800 mt-2">{formatPrice(product.price)}</p>
                        <Button
                          className="mt-4 bg-coral-600 hover:bg-coral-700 text-white"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Basic Info Section */}
                <tr>
                  <td
                    className="bg-emerald-50 p-4 font-medium text-emerald-900 border border-emerald-100 cursor-pointer"
                    onClick={() => toggleSection("basic")}
                  >
                    <div className="flex items-center justify-between">
                      <span>Basic Information</span>
                      {isSectionExpanded("basic") ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </td>
                  {selectedProducts.map((product) => (
                    <td key={`basic-${product.id}`} className="p-0 border border-emerald-100">
                      {isSectionExpanded("basic") && (
                        <div className="p-4">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-emerald-900">Description</p>
                              <p className="text-sm text-muted-foreground">{product.description}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-emerald-900">Category</p>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-emerald-900">Price</p>
                              <p className="text-sm font-semibold text-emerald-800">{formatPrice(product.price)}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Features Section */}
                <tr>
                  <td
                    className="bg-emerald-50 p-4 font-medium text-emerald-900 border border-emerald-100 cursor-pointer"
                    onClick={() => toggleSection("features")}
                  >
                    <div className="flex items-center justify-between">
                      <span>Features</span>
                      {isSectionExpanded("features") ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </td>
                  {selectedProducts.map((product, index) => (
                    <td key={`features-${product.id}`} className="p-0 border border-emerald-100">
                      {isSectionExpanded("features") && (
                        <div className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              {index === 0 ? (
                                <Check className="h-4 w-4 text-emerald-600 mr-2" />
                              ) : index === 1 ? (
                                <Check className="h-4 w-4 text-emerald-600 mr-2" />
                              ) : (
                                <Minus className="h-4 w-4 text-muted-foreground mr-2" />
                              )}
                              <span className="text-sm">Feature 1</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-emerald-600 mr-2" />
                              <span className="text-sm">Feature 2</span>
                            </div>
                            <div className="flex items-center">
                              {index === 2 ? (
                                <Minus className="h-4 w-4 text-muted-foreground mr-2" />
                              ) : (
                                <Check className="h-4 w-4 text-emerald-600 mr-2" />
                              )}
                              <span className="text-sm">Feature 3</span>
                            </div>
                            <div className="flex items-center">
                              {index === 1 ? (
                                <Minus className="h-4 w-4 text-muted-foreground mr-2" />
                              ) : (
                                <Check className="h-4 w-4 text-emerald-600 mr-2" />
                              )}
                              <span className="text-sm">Feature 4</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Specifications Section */}
                <tr>
                  <td
                    className="bg-emerald-50 p-4 font-medium text-emerald-900 border border-emerald-100 cursor-pointer"
                    onClick={() => toggleSection("specs")}
                  >
                    <div className="flex items-center justify-between">
                      <span>Specifications</span>
                      {isSectionExpanded("specs") ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </td>
                  {selectedProducts.map((product, index) => (
                    <td key={`specs-${product.id}`} className="p-0 border border-emerald-100">
                      {isSectionExpanded("specs") && (
                        <div className="p-4">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-emerald-900">Dimensions</p>
                              <p className="text-sm text-muted-foreground">
                                {index === 0
                                  ? "10 x 5 x 2 inches"
                                  : index === 1
                                    ? "12 x 6 x 2 inches"
                                    : "8 x 4 x 1.5 inches"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-emerald-900">Weight</p>
                              <p className="text-sm text-muted-foreground">
                                {index === 0 ? "0.5 kg" : index === 1 ? "0.7 kg" : "0.3 kg"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-emerald-900">Material</p>
                              <p className="text-sm text-muted-foreground">
                                {index === 0 ? "Aluminum" : index === 1 ? "Stainless Steel" : "Plastic"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-emerald-900">Warranty</p>
                              <p className="text-sm text-muted-foreground">
                                {index === 0 ? "1 Year" : index === 1 ? "2 Years" : "1 Year"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Reviews Section */}
                <tr>
                  <td
                    className="bg-emerald-50 p-4 font-medium text-emerald-900 border border-emerald-100 cursor-pointer"
                    onClick={() => toggleSection("reviews")}
                  >
                    <div className="flex items-center justify-between">
                      <span>Reviews</span>
                      {isSectionExpanded("reviews") ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </td>
                  {selectedProducts.map((product, index) => (
                    <td key={`reviews-${product.id}`} className="p-0 border border-emerald-100">
                      {isSectionExpanded("reviews") && (
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill={i < (index === 0 ? 4 : index === 1 ? 5 : 3) ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {index === 0 ? "4.0" : index === 1 ? "5.0" : "3.0"}(
                              {index === 0 ? "24" : index === 1 ? "18" : "12"} reviews)
                            </span>
                          </div>
                          <Button variant="link" className="p-0 h-auto text-emerald-600 hover:text-emerald-800" asChild>
                            <Link href={`/products/${product.id}`}>Read all reviews</Link>
                          </Button>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

