"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Loader2, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"

export default function VerifySmsPage() {
  const [timer, setTimer] = useState(59)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [code, setCode] = useState(["", "", "", "", "", ""])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call with 4 second delay
    setTimeout(() => {
      setIsLoading(false)
      setError("Code incorrect. Veuillez réessayer.")
    }, 4000)
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with logo */}
      <header className="w-full bg-white py-6 px-4 shadow-sm">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/verify" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="max-w-md mx-auto flex justify-center">
        </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-8">
          {/* Phone Illustration */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
            <img src="/kosomhoamda.png" alt="Masrvi Logo" width={100} height={150} className="h-auto" />

            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Confirmation</h1>
            <p className="text-gray-600 mb-1">Veuillez entrer le code reçu par SMS</p>
            <p className="text-sm text-gray-500">Entrer le code à six chiffres que vous avez reçu</p>
          </div>

          {/* SMS Verification Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 6-digit code input */}
            <div className="flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-10 h-12 text-center text-xl font-medium border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="inline-block bg-gray-100 rounded-full px-4 py-2">
                <span className="text-lg font-semibold text-gray-800">00:{timer < 10 ? `0${timer}` : timer}</span>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <Alert variant="destructive" className="animate-in fade-in-50 duration-300">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Vérification...</span>
                </div>
              ) : (
                "Confirmer"
              )}
            </Button>
          </form>

          {timer === 0 && (
            <div className="text-center">
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Renvoyer le code</button>
            </div>
          )}
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
