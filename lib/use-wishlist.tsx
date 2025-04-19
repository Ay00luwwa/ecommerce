"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Product } from "@/lib/types"

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearWishlist: () => {},
  isInWishlist: () => false,
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
        localStorage.removeItem("wishlist")
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("wishlist", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems
      }
      return [...prevItems, product]
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setItems([])
  }

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, clearWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}

