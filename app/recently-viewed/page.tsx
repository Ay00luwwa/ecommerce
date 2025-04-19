"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"
import { products } from "@/lib/products"
import type { Product } from "@/lib/types"

export default function RecentlyViewedPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    setIsMounted(true)
    // Simulate loading recently viewed products from localStorage
    const storedItems = localStorage.getItem("recentlyViewed")
    if (storedItems) {
      try {
        setRecentlyViewed(JSON.parse(storedItems))
      } catch (error) {
        console.error("Failed to parse recently viewed items:", error)
        // For demo, add some sample products if parsing fails
        setRecentlyViewed(products.slice(0, 5))
      }
    } else {
      // For demo, add some sample products
      setRecentlyViewed(products.slice(0, 5))
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    })
  }

  const handleRemoveItem = (productId: string) => {
    setRecentlyViewed((prev) => prev.filter((item) => item.id !== productId))
    toast({
      title: "Removed",
      description: "Item removed from recently viewed",
      duration: 2000,
    })
  }

  const clearAllItems = () => {
    setRecentlyViewed([])
    localStorage.removeItem("recentlyViewed")
    toast({
      title: "Cleared",
      description: "All items have been cleared from recently viewed",
      duration: 2000,
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">Recently Viewed</h1>
          <p className="text-muted-foreground">
            Products you've viewed recently. We keep track of these to help you find them again.
          </p>
        </div>
        {recentlyViewed.length > 0 && (
          <Button
            variant="outline"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200 self-start"
            onClick={clearAllItems}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {recentlyViewed.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-emerald-100 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-semibold text-emerald-900 mb-2">No recently viewed products</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You haven't viewed any products yet. Browse our catalog to discover great products.
          </p>
          <Button asChild className="bg-coral-600 hover:bg-coral-700 text-white">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentlyViewed.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(product.id)}
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
              <Link href={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-emerald-900 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-semibold text-emerald-800">{formatPrice(product.price)}</div>
                    <div className="text-xs text-muted-foreground">
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      Viewed recently
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-emerald-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-emerald-900 mb-4">Recommended For You</h2>
        <p className="text-muted-foreground mb-6">
          Based on your browsing history, you might also like these products:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(5, 9).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block bg-white rounded-lg overflow-hidden border border-emerald-100 hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-emerald-900 line-clamp-1">{product.name}</h3>
                <p className="text-sm font-semibold text-emerald-800 mt-1">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

