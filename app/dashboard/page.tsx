"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { 
  User, 
  ShoppingBag, 
  Heart, 
  CreditCard, 
  Settings, 
  LogOut,
  Package,
  History
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
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

  const handleLogout = async () => {
    await signOut({ redirect: false })
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
                  <CardTitle>{session?.user?.firstName} {session?.user?.lastName}</CardTitle>
                  <CardDescription>{session?.user?.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className={
                    activeTab === "overview" ? "bg-emerald-600 hover:bg-emerald-700 justify-start" : "justify-start"
                  }
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className={
                    activeTab === "orders" ? "bg-emerald-600 hover:bg-emerald-700 justify-start" : "justify-start"
                  }
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="mr-2 h-4 w-4" />
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
          {activeTab === "overview" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Sample order - replace with real data */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-emerald-100 p-2 rounded">
                          <ShoppingBag className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium">Order #12345</p>
                          <p className="text-sm text-muted-foreground">Placed on March 15, 2024</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$99.99</p>
                        <p className="text-sm text-emerald-600">Delivered</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Full Name</h3>
                      <p className="text-muted-foreground">{session?.user?.firstName} {session?.user?.lastName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Email</h3>
                      <p className="text-muted-foreground">{session?.user?.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Member Since</h3>
                      <p className="text-muted-foreground">March 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample orders - replace with real data */}
                  {[1, 2, 3].map((order) => (
                    <div key={order} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-emerald-100 p-2 rounded">
                          <History className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium">Order #{12345 + order}</p>
                          <p className="text-sm text-muted-foreground">Placed on March {15 - order}, 2024</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${99.99 - order * 10}</p>
                        <p className="text-sm text-emerald-600">Delivered</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add other tab contents here */}
        </div>
      </div>
    </div>
  )
}

