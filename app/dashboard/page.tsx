import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, Home, Menu, User } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-navy-900">Masrvi</h1>
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Login Successful!</h2>
          <p className="text-gray-600 mb-8">You have successfully logged into your Masrvi account.</p>
          <Link href="/">
            <Button className="bg-emerald-400 hover:bg-emerald-500">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Login
            </Button>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t py-2">
        <div className="container mx-auto">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <User className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
