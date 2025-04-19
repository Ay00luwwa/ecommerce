"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, ChevronRight, Heart, Package, Star, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// Interest categories with icons
const interestCategories = [
  {
    id: "tech",
    name: "Technology",
    icon: "/placeholder.svg?height=40&width=40&text=💻",
    description: "Gadgets, electronics, and smart devices",
  },
  {
    id: "home",
    name: "Home & Living",
    icon: "/placeholder.svg?height=40&width=40&text=🏠",
    description: "Furniture, decor, and home improvement",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: "/placeholder.svg?height=40&width=40&text=🍳",
    description: "Cookware, appliances, and dining",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "/placeholder.svg?height=40&width=40&text=👕",
    description: "Clothing, shoes, and accessories",
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    icon: "/placeholder.svg?height=40&width=40&text=💄",
    description: "Skincare, makeup, and grooming",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: "/placeholder.svg?height=40&width=40&text=🏃",
    description: "Fitness, camping, and outdoor gear",
  },
  {
    id: "tools",
    name: "Tools & DIY",
    icon: "/placeholder.svg?height=40&width=40&text=🔨",
    description: "Power tools, hardware, and DIY supplies",
  },
  {
    id: "books",
    name: "Books & Stationery",
    icon: "/placeholder.svg?height=40&width=40&text=📚",
    description: "Books, journals, and office supplies",
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: "/placeholder.svg?height=40&width=40&text=🎮",
    description: "Toys, board games, and video games",
  },
  {
    id: "health",
    name: "Health & Wellness",
    icon: "/placeholder.svg?height=40&width=40&text=🧘",
    description: "Supplements, fitness equipment, and wellness products",
  },
]

// Personalization options
const personalizationOptions = [
  {
    id: "recommendations",
    title: "Personalized Recommendations",
    description: "Get product suggestions based on your interests and browsing history",
    icon: <Heart className="h-5 w-5 text-primary" />,
  },
  {
    id: "deals",
    title: "Deals & Discounts",
    description: "Receive notifications about sales and special offers on items you might like",
    icon: <Zap className="h-5 w-5 text-primary" />,
  },
  {
    id: "trending",
    title: "Trending Products",
    description: "Stay updated with popular and trending products in your interest categories",
    icon: <Star className="h-5 w-5 text-primary" />,
  },
  {
    id: "newArrivals",
    title: "New Arrivals",
    description: "Be the first to know when new products in your interest categories arrive",
    icon: <Package className="h-5 w-5 text-primary" />,
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [personalization, setPersonalization] = useState<string[]>(["recommendations", "deals"])
  const [communicationPrefs, setCommunicationPrefs] = useState({
    email: true,
    sms: false,
    push: true,
  })
  const router = useRouter()
  const { toast } = useToast()

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId],
    )
  }

  const handlePersonalizationToggle = (optionId: string) => {
    setPersonalization((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  const handleCommunicationToggle = (type: keyof typeof communicationPrefs) => {
    setCommunicationPrefs((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Save preferences and redirect
      savePreferences()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    // Save minimal preferences and redirect
    toast({
      title: "Preferences saved",
      description: "You can always update your preferences in your account settings.",
      duration: 3000,
    })
    router.push("/")
  }

  const savePreferences = () => {
    // In a real app, you would save these preferences to a database
    // For now, we'll just show a toast and redirect
    toast({
      title: "Onboarding complete!",
      description: "Your preferences have been saved. Enjoy your personalized shopping experience!",
      duration: 3000,
    })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <div className="container max-w-5xl px-4 py-8 md:py-12 mx-auto flex-1 flex flex-col">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to EcoShop</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's personalize your shopping experience. Tell us a bit about yourself to get started.
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-secondary" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Getting Started</span>
            <span>
              Step {step} of {totalSteps}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Step 1: Interests */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">What are you interested in?</h2>
                <p className="text-muted-foreground mb-6">
                  Select the categories that interest you the most. We'll use this to personalize your shopping
                  experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {interestCategories.map((category) => (
                  <Card
                    key={category.id}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedInterests.includes(category.id)
                        ? "border-coral-500 bg-coral-50 ring-1 ring-coral-500"
                        : "hover:border-coral-300"
                    }`}
                    onClick={() => handleInterestToggle(category.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={category.icon || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground">{category.name}</h3>
                          {selectedInterests.includes(category.id) && <Check className="h-5 w-5 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Selected: {selectedInterests.length} of {interestCategories.length}
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Personalization */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Personalize Your Experience</h2>
                <p className="text-muted-foreground mb-6">
                  Choose how you'd like us to personalize your shopping experience.
                </p>
              </div>

              <div className="space-y-4">
                {personalizationOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      personalization.includes(option.id) ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => handlePersonalizationToggle(option.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          personalization.includes(option.id) ? "bg-primary/10" : "bg-secondary"
                        }`}
                      >
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground">{option.title}</h3>
                          {personalization.includes(option.id) && (
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Communication Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Communication Preferences</h2>
                <p className="text-muted-foreground mb-6">
                  How would you like to hear from us? You can change these settings anytime.
                </p>
              </div>

              <div className="space-y-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    communicationPrefs.email ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => handleCommunicationToggle("email")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          communicationPrefs.email ? "bg-primary/10" : "bg-secondary"
                        }`}
                      >
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
                          className="h-5 w-5 text-primary"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive order updates, personalized recommendations, and promotions
                        </p>
                      </div>
                    </div>
                    {communicationPrefs.email && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    communicationPrefs.sms ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => handleCommunicationToggle("sms")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          communicationPrefs.sms ? "bg-primary/10" : "bg-secondary"
                        }`}
                      >
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
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">SMS Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive order and delivery updates via text message
                        </p>
                      </div>
                    </div>
                    {communicationPrefs.sms && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    communicationPrefs.push ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => handleCommunicationToggle("push")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          communicationPrefs.push ? "bg-primary/10" : "bg-secondary"
                        }`}
                      >
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
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Push Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts about deals, order updates, and more
                        </p>
                      </div>
                    </div>
                    {communicationPrefs.push && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  By proceeding, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                  . You can change your communication preferences anytime in your account settings.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={handleSkip}>
              Skip for now
            </Button>
          )}
          <Button onClick={handleNext} className="bg-coral-600 hover:bg-coral-700 text-white">
            {step === totalSteps ? "Complete Setup" : "Continue"}
            {step !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

