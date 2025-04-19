"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 3000,
      })
    }, 1500)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Fill out the form below and our team will get back
            to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-emerald-50 p-6 rounded-xl">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-emerald-900">Our Location</h3>
                    <p className="text-muted-foreground mt-1">
                      123 Commerce Street
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-emerald-900">Email Us</h3>
                    <p className="text-muted-foreground mt-1">
                      support@example.com
                      <br />
                      sales@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-emerald-900">Call Us</h3>
                    <p className="text-muted-foreground mt-1">
                      +1 (555) 123-4567
                      <br />
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="font-medium text-purple-900 mb-3">Business Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-6 rounded-xl border border-emerald-100 shadow-sm"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-emerald-900">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border-emerald-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-emerald-900">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-emerald-200 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-emerald-900">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="border-emerald-200 focus-visible:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-emerald-900">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="border-emerald-200 focus-visible:ring-emerald-500"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-coral-600 hover:bg-coral-700 text-white"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 rounded-xl overflow-hidden h-[400px] border border-emerald-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619528477183!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

