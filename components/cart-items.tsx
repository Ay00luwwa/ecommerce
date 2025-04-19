"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"
import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export function CartItems() {
  const { items, removeItem, updateItemQuantity, clearCart } = useCart()
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const itemCount = items.length

  if (itemCount === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">Your cart is empty</h3>
          <p className="text-sm text-muted-foreground">Add items to your cart to see them here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-5 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-5 pr-6">
          {items.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="absolute object-cover"
                    />
                  </div>
                  <div className="flex flex-col self-start">
                    <span className="line-clamp-1 text-sm font-medium">{item.name}</span>
                    <span className="line-clamp-1 text-xs text-muted-foreground">{formatPrice(item.price)}</span>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-teal-200"
                        onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Remove one</span>
                      </Button>
                      <span className="text-xs">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-teal-200"
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Add one</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="line-clamp-1 text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 self-end border-red-200 text-red-500 hover:bg-red-50"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="space-y-4 pr-6">
        <Separator />
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full bg-coral-600 hover:bg-coral-700 text-white">Checkout</Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

