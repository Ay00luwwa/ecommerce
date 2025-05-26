"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { 
  CreditCard, 
  Package, 
  Truck, 
  CheckCircle2,
  ArrowLeft,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const steps = [
  { id: "shipping", name: "Shipping", icon: Truck },
  { id: "payment", name: "Payment", icon: CreditCard },
  { id: "review", name: "Review", icon: CheckCircle2 },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("shipping")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
      duration: 5000,
    })

    router.push("/dashboard")
  }

  return (
    <div className="container max-w-5xl px-4 py-8 md:py-12">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Checkout Steps */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep === step.id
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-full h-0.5 bg-emerald-100 mx-2" />
                  )}
                </div>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === "shipping" && "Shipping Information"}
                {currentStep === "payment" && "Payment Details"}
                {currentStep === "review" && "Order Review"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === "shipping" && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          defaultValue={session?.user?.firstName}
                          required
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          defaultValue={session?.user?.lastName}
                          required
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        required
                        className="border-emerald-200 focus-visible:ring-emerald-500"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          required
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          required
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="border-emerald-200 focus-visible:ring-emerald-500"
                      />
                    </div>
                    <Button
                      type="button"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setCurrentStep("payment")}
                    >
                      Continue to Payment
                    </Button>
                  </>
                )}

                {currentStep === "payment" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="border-emerald-200 focus-visible:ring-emerald-500"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-emerald-200"
                        onClick={() => setCurrentStep("shipping")}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setCurrentStep("review")}
                      >
                        Review Order
                      </Button>
                    </div>
                  </>
                )}

                {currentStep === "review" && (
                  <>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <p className="text-sm text-muted-foreground">
                          John Doe
                          <br />
                          123 Main Street
                          <br />
                          New York, NY 10001
                          <br />
                          United States
                          <br />
                          (555) 123-4567
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <p className="text-sm text-muted-foreground">
                          Visa ending in 4242
                          <br />
                          Expires 04/2025
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Order Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>$99.99</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$5.99</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>$8.50</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-medium">
                            <span>Total</span>
                            <span>$114.48</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-emerald-200"
                        onClick={() => setCurrentStep("payment")}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Place Order"
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample items - replace with real cart data */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-emerald-100 rounded flex items-center justify-center">
                      <Package className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Product Name {item}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${29.99}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$99.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$5.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$8.50</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>$114.48</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 