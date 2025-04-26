"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/verify")
      
    }, 4000);
  }

  return (
    <div className="flex flex-col max-h-screen bg-gray-50">
      {/* Header with logo */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-md mx-auto flex justify-center">
          <Image src="/loggo.avif" alt="Masrvi Logo" width={260} height={150} className="h-auto" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenue</h1>
            <p className="text-gray-600">Connectez-vous à votre compte Masrvi</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Numéro de téléphone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id="phone"
                  type="password"
                  className="h-12 pl-4 pr-10 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Vérification...</span>
                </div>
              ) : (
                "Me connecter"
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Mot de passe oublié?
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Vous n&apos;avez pas de compte?</p>
          <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
            Créer un compte
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white py-4 border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-gray-500">
          <p>© 2023 Masrvi by BMCI. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <button className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-400 hover:bg-emerald-500 text-white shadow-lg transition-all">
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  )
}
