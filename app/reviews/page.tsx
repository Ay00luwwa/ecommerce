"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, ThumbsDown, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products } from "@/lib/products"

// Mock review data
const mockReviews = [
  {
    id: "1",
    productId: "1",
    rating: 5,
    title: "Excellent product!",
    content:
      "This is exactly what I was looking for. The quality is outstanding and it works perfectly. Highly recommend!",
    author: "John D.",
    date: "2024-03-15",
    helpful: 12,
    unhelpful: 2,
    verified: true,
  },
  {
    id: "2",
    productId: "2",
    rating: 4,
    title: "Great value for money",
    content:
      "I'm very satisfied with this purchase. It's well-made and does the job perfectly. The only minor issue is that the setup instructions could be clearer.",
    author: "Sarah M.",
    date: "2024-03-10",
    helpful: 8,
    unhelpful: 1,
    verified: true,
  },
  {
    id: "3",
    productId: "3",
    rating: 3,
    title: "Good but not great",
    content:
      "The product is decent for the price, but I expected a bit more. It works as advertised but feels a bit flimsy. Might be good for occasional use but not for daily heavy use.",
    author: "Michael T.",
    date: "2024-02-28",
    helpful: 5,
    unhelpful: 3,
    verified: true,
  },
  {
    id: "4",
    productId: "4",
    rating: 5,
    title: "Exceeded my expectations!",
    content:
      "I was skeptical at first, but this product has completely exceeded my expectations. The build quality is excellent, and it performs even better than advertised. Customer service was also very helpful when I had questions.",
    author: "Emily R.",
    date: "2024-02-20",
    helpful: 15,
    unhelpful: 0,
    verified: true,
  },
  {
    id: "5",
    productId: "1",
    rating: 2,
    title: "Disappointed with quality",
    content:
      "Unfortunately, this didn't meet my expectations. The materials feel cheap and it stopped working properly after just a few weeks of use. I wouldn't recommend it for the price.",
    author: "Robert K.",
    date: "2024-02-15",
    helpful: 7,
    unhelpful: 4,
    verified: false,
  },
  {
    id: "6",
    productId: "5",
    rating: 4,
    title: "Very good product",
    content:
      "I've been using this for a month now and I'm quite satisfied. It does everything it claims to do and the quality seems good. The only reason I'm not giving 5 stars is that the battery life could be better.",
    author: "Lisa J.",
    date: "2024-02-10",
    helpful: 9,
    unhelpful: 2,
    verified: true,
  },
]

export default function ReviewsPage() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")
  const [helpfulClicks, setHelpfulClicks] = useState<Record<string, "helpful" | "unhelpful" | null>>({})

  // Filter and sort reviews
  const filteredReviews = mockReviews.filter((review) => {
    if (filter === "all") return true
    if (filter === "positive") return review.rating >= 4
    if (filter === "critical") return review.rating <= 2
    if (filter === "verified") return review.verified
    return true
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
    if (sort === "highest") return b.rating - a.rating
    if (sort === "lowest") return a.rating - b.rating
    if (sort === "most-helpful") return b.helpful - a.helpful
    return 0
  })

  const handleHelpfulClick = (reviewId: string, type: "helpful" | "unhelpful") => {
    setHelpfulClicks((prev) => {
      // If already clicked the same button, remove the vote
      if (prev[reviewId] === type) {
        const newState = { ...prev }
        delete newState[reviewId]
        return newState
      }
      // Otherwise set the new vote
      return { ...prev, [reviewId]: type }
    })
  }

  const getProductById = (productId: string) => {
    return products.find((p) => p.id === productId) || products[0]
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Customer Reviews</h1>
        <p className="text-muted-foreground">See what our customers are saying about our products.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-xl border border-emerald-100 sticky top-24">
            <h2 className="text-lg font-semibold text-emerald-900 mb-4">Filter Reviews</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">By Rating</h3>
                <div className="space-y-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    className={`w-full justify-start ${filter === "all" ? "bg-coral-600 hover:bg-coral-700 text-white" : "border-teal-200"}`}
                    onClick={() => setFilter("all")}
                  >
                    All Ratings
                  </Button>
                  <Button
                    variant={filter === "positive" ? "default" : "outline"}
                    size="sm"
                    className={`w-full justify-start ${filter === "positive" ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200"}`}
                    onClick={() => setFilter("positive")}
                  >
                    <div className="flex items-center text-amber-500 mr-2">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                      <Star className="h-3 w-3" />
                    </div>
                    & Up
                  </Button>
                  <Button
                    variant={filter === "critical" ? "default" : "outline"}
                    size="sm"
                    className={`w-full justify-start ${filter === "critical" ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200"}`}
                    onClick={() => setFilter("critical")}
                  >
                    <div className="flex items-center text-amber-500 mr-2">
                      {[...Array(2)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-3 w-3" />
                      ))}
                    </div>
                    & Down
                  </Button>
                  <Button
                    variant={filter === "verified" ? "default" : "outline"}
                    size="sm"
                    className={`w-full justify-start ${filter === "verified" ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200"}`}
                    onClick={() => setFilter("verified")}
                  >
                    Verified Purchases Only
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Sort By</h3>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-full border-emerald-200">
                    <SelectValue placeholder="Sort reviews" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                    <SelectItem value="most-helpful">Most Helpful</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="bg-white p-6 rounded-xl border border-emerald-100 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-emerald-900">
                {filteredReviews.length} {filteredReviews.length === 1 ? "Review" : "Reviews"}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Average Rating:</span>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => {
                    const averageRating =
                      filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length
                    return <Star key={i} className={`h-4 w-4 ${i < Math.round(averageRating) ? "fill-current" : ""}`} />
                  })}
                </div>
                <span className="text-sm font-medium">
                  {(filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length).toFixed(
                    1,
                  )}
                </span>
              </div>
            </div>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-emerald-100 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-emerald-900 mb-2">No reviews found</h3>
              <p className="text-muted-foreground mb-4">There are no reviews matching your current filter criteria.</p>
              <Button
                variant="outline"
                className="border-teal-200 text-teal-800 hover:bg-teal-50"
                onClick={() => setFilter("all")}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedReviews.map((review) => {
                const product = getProductById(review.productId)
                return (
                  <div key={review.id} className="bg-white p-6 rounded-xl border border-emerald-100">
                    <div className="flex items-start gap-4">
                      <Link href={`/products/${product.id}`} className="hidden sm:block">
                        <div className="relative h-16 w-16 overflow-hidden rounded border">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="font-medium text-emerald-900 hover:text-emerald-700"
                          >
                            {product.name}
                          </Link>
                          <div className="flex items-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : ""}`} />
                            ))}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{review.title}</h3>
                        <p className="text-muted-foreground mb-3">{review.content}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">By:</span>
                            <span>{review.author}</span>
                            {review.verified && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="font-medium mr-1">On:</span>
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-4 ml-auto">
                            <span className="text-sm text-muted-foreground">Was this review helpful?</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`h-8 ${helpfulClicks[review.id] === "helpful" ? "bg-emerald-100 border-emerald-200" : "border-gray-200"}`}
                              onClick={() => handleHelpfulClick(review.id, "helpful")}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{review.helpful + (helpfulClicks[review.id] === "helpful" ? 1 : 0)}</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`h-8 ${helpfulClicks[review.id] === "unhelpful" ? "bg-red-50 border-red-200" : "border-gray-200"}`}
                              onClick={() => handleHelpfulClick(review.id, "unhelpful")}
                            >
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              <span>{review.unhelpful + (helpfulClicks[review.id] === "unhelpful" ? 1 : 0)}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

