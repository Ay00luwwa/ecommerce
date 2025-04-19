"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Product } from "@/lib/types"

interface RecentlyViewedContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  clearItems: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
})

const MAX_RECENTLY_VIEWED = 10

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedItems = localStorage.getItem("recentlyViewed")
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems))
      } catch (error) {
        console.error("Failed to parse recently viewed from localStorage:", error)
        localStorage.removeItem("recentlyViewed")
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("recentlyViewed", JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      // Remove the product if it already exists
      const filteredItems = prevItems.filter((item) => item.id !== product.id)

      // Add the product to the beginning of the array
      const newItems = [product, ...filteredItems]

      // Limit the number of items
      return newItems.slice(0, MAX_RECENTLY_VIEWED)
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearItems = () => {
    setItems([])
  }

  return (
    <RecentlyViewedContext.Provider value={{ items, addItem, removeItem, clearItems }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext)
}

