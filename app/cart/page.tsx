"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/use-cart"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, removeItem, updateItemQuantity, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 10000 ? 0 : 999 // Free shipping over $100
  const total = subtotal + shipping - discount

  const handleApplyPromo = () => {
    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "discount20") {
        setDiscount(Math.round(subtotal * 0.2)) // 20% discount
      } else {
        setDiscount(0)
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-emerald-900 mb-6">Your Cart</h1>
          <div className="bg-white rounded-xl border border-emerald-100 p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative h-40 w-40">
                <Image
                  src="/placeholder.svg?height=160&width=160&text=Empty+Cart"
                  alt="Empty cart"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl font-semibold text-emerald-900">Your cart is empty</h2>
              <p className="text-muted-foreground max-w-md">
                Looks like you haven't added anything to your cart yet. Browse our products and find something you'll
                love.
              </p>
              <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700 text-white">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-emerald-900 mb-6">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-emerald-100 overflow-hidden">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-emerald-900">
                              <h3>
                                <Link href={`/products/${item.id}`}>{item.name}</Link>
                              </h3>
                              <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <span className="text-gray-500 w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>

                            <div className="flex">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <div className="flex justify-between">
                  <Button variant="link" asChild className="text-emerald-600 hover:text-emerald-800">
                    <Link href="/products">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-emerald-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-emerald-900 mb-4">Order Summary</h2>

                <div className="flow-root">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p className="font-medium text-emerald-900">{formatPrice(subtotal)}</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Shipping</p>
                      <p className="font-medium text-emerald-900">{shipping === 0 ? "Free" : formatPrice(shipping)}</p>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <p>Discount</p>
                        <p>-{formatPrice(discount)}</p>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between">
                      <p className="font-semibold text-emerald-900">Total</p>
                      <p className="font-semibold text-emerald-900">{formatPrice(total)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="border-emerald-200 focus-visible:ring-emerald-500"
                    />
                    <Button
                      onClick={handleApplyPromo}
                      disabled={!promoCode || isApplyingPromo}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Apply
                    </Button>
                  </div>

                  <Button className="w-full bg-coral-600 hover:bg-coral-700 text-white">Checkout</Button>

                  <div className="mt-4 text-center text-xs text-muted-foreground">
                    <p>Taxes calculated at checkout</p>
                    <p className="mt-1">Secure payment processing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

