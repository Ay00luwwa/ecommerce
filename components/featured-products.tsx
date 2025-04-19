"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))

    toast({
      title: favorites.includes(id) ? "Removed from wishlist" : "Added to wishlist",
      description: favorites.includes(id)
        ? "This item has been removed from your wishlist"
        : "This item has been added to your wishlist",
      duration: 2000,
    })
  }

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative overflow-hidden rounded-xl border border-cyan-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="aspect-square overflow-hidden relative">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-coral-500 text-coral-500" : "text-gray-600"}`}
              />
            </button>
            <div className="absolute inset-x-0 bottom-0 flex-col items-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-navy-900/80 to-transparent">
              <Button
                onClick={() => handleAddToCart(product)}
                size="sm"
                className="w-full bg-white text-navy-800 hover:bg-cyan-50"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="p-4">
            <Link href={`/products/${product.id}`} className="block">
              <h3 className="font-medium text-navy-500 group-hover:text-teal-600 transition-colors">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
              <div className="mt-2 font-semibold text-coral-600">{formatPrice(product.price)}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

