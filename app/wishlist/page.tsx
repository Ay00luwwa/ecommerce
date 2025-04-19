"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/use-cart"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { products } from "@/lib/products"

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  // For demo purposes, initialize with some products
  useEffect(() => {
    setIsMounted(true)
    // Simulate loading wishlist from localStorage or API
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist:", error)
        // For demo, add some sample products if parsing fails
        setWishlist(products.filter((_, index) => index % 3 === 0))
      }
    } else {
      // For demo, add some sample products
      setWishlist(products.filter((_, index) => index % 3 === 0))
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
  }, [wishlist, isMounted])

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId))
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist",
      duration: 2000,
    })
  }

  const addToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    })
  }

  const clearWishlist = () => {
    setWishlist([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
      duration: 2000,
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-1">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
        {wishlist.length > 0 && (
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="relative h-40 w-40 text-muted-foreground">
            <Heart className="h-full w-full stroke-1" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-emerald-900">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground max-w-md">
            Save items you love to your wishlist. Review them anytime and easily move them to your cart.
          </p>
          <Button asChild className="mt-8 bg-coral-600 hover:bg-coral-700 text-white">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromWishlist(product.id)}
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Remove from wishlist</span>
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
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <Button onClick={() => addToCart(product)} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {wishlist.length > 0 && (
        <div className="mt-12 bg-emerald-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-emerald-900 mb-4">Wishlist Tips</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
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
                  className="h-4 w-4 text-emerald-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-emerald-900">Save for Later</h3>
                <p className="text-sm text-muted-foreground">
                  Add items to your wishlist to save them for future purchases.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
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
                  className="h-4 w-4 text-emerald-600"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-emerald-900">Price Drop Alerts</h3>
                <p className="text-sm text-muted-foreground">Get notified when items in your wishlist go on sale.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
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
                  className="h-4 w-4 text-emerald-600"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-emerald-900">Share Your Wishlist</h3>
                <p className="text-sm text-muted-foreground">
                  Share your wishlist with friends and family for gift ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

