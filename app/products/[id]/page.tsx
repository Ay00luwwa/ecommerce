"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/lib/use-cart"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }

    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity > 1 ? "items" : "item"} added to your cart`,
      duration: 2000,
    })
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)

    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: isFavorite
        ? "This item has been removed from your wishlist"
        : "This item has been added to your wishlist",
      duration: 2000,
    })
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-emerald-100">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full object-cover aspect-square"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-emerald-100 cursor-pointer hover:border-emerald-300 transition-colors"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  width={150}
                  height={150}
                  className="w-full object-cover aspect-square"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Link
              href={`/products?category=${product.category}`}
              className="text-sm text-emerald-600 hover:text-emerald-800"
            >
              {product.category}
            </Link>
            <h1 className="text-3xl font-bold text-emerald-900 mt-2">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-current" : ""}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">4.0 (24 reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-emerald-900">{formatPrice(product.price)}</div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-input rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-r-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="rounded-l-none">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {product.id === "1" || product.id === "5" ? "Only 3 left in stock" : "In stock"}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-coral-600 hover:bg-coral-700 text-white flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-teal-200 text-teal-800 hover:bg-teal-50"
              onClick={toggleFavorite}
            >
              <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-coral-500 text-coral-500" : ""}`} />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            <Button size="icon" variant="outline" className="border-emerald-200">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center text-emerald-800">
              <Truck className="h-5 w-5 mr-2" />
              <span className="font-medium">Free shipping</span>
              <span className="ml-1 text-muted-foreground">on orders over $50</span>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="description">
            <TabsList className="w-full border-b">
              <TabsTrigger
                value="description"
                className="flex-1 text-navy-500 data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="flex-1 text-navy-500 data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex-1 text-navy-500 data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">
                {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-muted-foreground mt-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <div className="font-medium">Material</div>
                  <div className="text-muted-foreground">Premium Quality</div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <div className="font-medium">Dimensions</div>
                  <div className="text-muted-foreground">10 x 5 x 2 inches</div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <div className="font-medium">Weight</div>
                  <div className="text-muted-foreground">0.5 kg</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Warranty</div>
                  <div className="text-muted-foreground">1 Year</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="font-medium">John Doe</div>
                      <div className="text-muted-foreground ml-2 text-sm">2 months ago</div>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">Great product! Exactly as described and arrived quickly.</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-muted-foreground ml-2 text-sm">1 month ago</div>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <Star className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Good quality but slightly smaller than I expected. Overall happy with the purchase.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="overflow-hidden rounded-xl border border-emerald-100 bg-white">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-emerald-900 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                  <div className="mt-2 font-semibold text-emerald-800">{formatPrice(product.price)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

