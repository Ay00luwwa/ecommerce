"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"
import { useWishlist } from "@/lib/use-wishlist"
import { useRecentlyViewed } from "@/lib/use-recently-viewed"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { addItem: addToRecentlyViewed } = useRecentlyViewed()
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(isInWishlist(product.id))
  }, [isInWishlist, product.id])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    })
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: "This item has been removed from your wishlist",
        duration: 2000,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: "This item has been added to your wishlist",
        duration: 2000,
      })
    }

    setIsFavorite(!isFavorite)
  }

  const handleProductClick = () => {
    // Add to recently viewed when clicking on a product
    addToRecentlyViewed(product)
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-cyan-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/products/${product.id}`} className="block" onClick={handleProductClick}>
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-coral-500 text-coral-500" : "text-gray-600"}`} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-navy-500 group-hover:text-teal-600 transition-colors">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="font-semibold text-purple-600">{formatPrice(product.price)}</div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-teal-600 hover:bg-teal-700 text-white"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}

