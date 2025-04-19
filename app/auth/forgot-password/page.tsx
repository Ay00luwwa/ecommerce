"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate password reset request
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "If an account exists with that email, you'll receive a password reset link.",
        duration: 5000,
      })
    }, 1500)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto grid w-full max-w-md gap-6">
        <Link
          href="/auth/signin"
          className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>

        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold text-emerald-900">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <Mail className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-emerald-900">Check your email</h2>
            <p className="text-muted-foreground max-w-xs">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
            <div className="space-y-2 pt-4">
              <p className="text-sm text-muted-foreground">Didn't receive the email?</p>
              <Button
                variant="outline"
                className="w-full border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                onClick={() => setIsSubmitted(false)}
              >
                Try again
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-emerald-200 focus-visible:ring-emerald-500"
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

