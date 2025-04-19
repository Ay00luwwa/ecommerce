"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Clock, CreditCard, FileText, Heart, LogOut, Package, Settings, ShoppingBag, Truck, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const recentOrders = [
  {
    id: "ORD-12345",
    date: "2024-04-01",
    status: "Delivered",
    total: 12999,
    items: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "ORD-12346",
    date: "2024-03-28",
    status: "Processing",
    total: 24999,
    items: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "ORD-12347",
    date: "2024-03-15",
    status: "Shipped",
    total: 8998,
    items: 3,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // Simulate logout
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    })
    router.push("/auth/signin")
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 rounded-full p-2">
                  <User className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>john.doe@example.com</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-1">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className={
                    activeTab === "overview"
                      ? "bg-coral-600 hover:bg-coral-700 text-white justify-start"
                      : "justify-start"
                  }
                  onClick={() => setActiveTab("overview")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className={
                    activeTab === "orders" ? "bg-emerald-600 hover:bg-emerald-700 justify-start" : "justify-start"
                  }
                  onClick={() => setActiveTab("orders")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === "wishlist" ? "default" : "ghost"}
                  className={
                    activeTab === "wishlist" ? "bg-emerald-600 hover:bg-emerald-700 justify-start" : "justify-start"
                  }
                  onClick={() => setActiveTab("wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button
                  variant={activeTab === "addresses" ? "default" : "ghost"}
                  className={
                    activeTab === "addresses" ? "bg-emerald-600 hover:bg-emerald-700 justify-start" : "justify-start"
                  }
                  onClick={() => setActiveTab("addresses")}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Addresses
                </Button>
                <Button
                  variant={activeTab === "payment" ? "default" : "ghost"}
                  className={
                    activeTab === "payment" ? "bg-emerald-600 hover:bg-emerald-700 justify-start" : "justify-start"
                  }
                  onClick={() => setActiveTab("payment")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className={
                    activeTab === "settings" ? "bg-emerald-600 hover:bg-emerald-700 justify-start" : "justify-start"
                  }
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">+3 new items added</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">250</div>
                    <p className="text-xs text-muted-foreground">Earn 2x points on next order</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your last 3 orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded border">
                            <Image
                              src={order.image || "/placeholder.svg"}
                              alt={`Order ${order.id}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center mt-1">
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "Shipped"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                <Package className="mr-1 h-3 w-3" />
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(order.total)}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-emerald-600 hover:text-emerald-800 p-0 h-auto mt-1"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                  >
                    View All Orders
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track all your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentOrders.concat(recentOrders).map((order, index) => (
                      <div key={`${order.id}-${index}`} className="border rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded border">
                            <Image
                              src={order.image || "/placeholder.svg"}
                              alt={`Order ${order.id}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{order.items} items</p>
                            <p className="text-sm text-muted-foreground">Total: {formatPrice(order.total)}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                            >
                              Track
                            </Button>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Wishlist</CardTitle>
                  <CardDescription>Items you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex border rounded-lg p-3">
                        <div className="relative h-24 w-24 overflow-hidden rounded">
                          <Image
                            src={`/placeholder.svg?height=96&width=96&text=Item+${item}`}
                            alt={`Wishlist item ${item}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium">Product Name {item}</h4>
                          <p className="text-sm text-muted-foreground">Category</p>
                          <p className="mt-1 font-semibold text-emerald-800">{formatPrice(item * 4999)}</p>
                          <div className="mt-2 flex space-x-2">
                            <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700">
                              <ShoppingBag className="mr-1 h-3 w-3" />
                              Add to Cart
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                            >
                              <Heart className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/wishlist">View Full Wishlist</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your shipping and billing addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4 relative">
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                          Default
                        </span>
                      </div>
                      <h3 className="font-medium">Home</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        John Doe
                        <br />
                        123 Main Street
                        <br />
                        Apt 4B
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                        <br />
                        (555) 123-4567
                      </p>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium">Work</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        John Doe
                        <br />
                        456 Business Ave
                        <br />
                        Suite 200
                        <br />
                        New York, NY 10002
                        <br />
                        United States
                        <br />
                        (555) 987-6543
                      </p>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                        >
                          Set as Default
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-48">
                      <Button variant="ghost" className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50">
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
                          className="h-6 w-6 mb-2"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                        <span>Add New Address</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 relative">
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                          Default
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-10 w-16 bg-blue-100 rounded flex items-center justify-center mr-4">
                          <span className="font-bold text-blue-800">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 04/2025</p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-16 bg-red-100 rounded flex items-center justify-center mr-4">
                          <span className="font-bold text-red-800">MC</span>
                        </div>
                        <div>
                          <p className="font-medium">Mastercard ending in 5678</p>
                          <p className="text-sm text-muted-foreground">Expires 08/2026</p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                        >
                          Set as Default
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-32">
                      <Button variant="ghost" className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50">
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
                          className="h-6 w-6 mb-2"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                        <span>Add New Payment Method</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            defaultValue="John"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            defaultValue="Doe"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            defaultValue="(555) 123-4567"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Password</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="currentPassword" className="text-sm font-medium">
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="newPassword" className="text-sm font-medium">
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input
                            id="emailNotifications"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <label htmlFor="emailNotifications" className="text-sm font-medium">
                            Receive email notifications about orders and promotions
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            id="smsNotifications"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <label htmlFor="smsNotifications" className="text-sm font-medium">
                            Receive SMS notifications about order status updates
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            id="newsletter"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <label htmlFor="newsletter" className="text-sm font-medium">
                            Subscribe to our newsletter for exclusive offers
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" className="border-emerald-200">
                        Cancel
                      </Button>
                      <Button className="bg-coral-600 hover:bg-coral-700 text-white">Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

