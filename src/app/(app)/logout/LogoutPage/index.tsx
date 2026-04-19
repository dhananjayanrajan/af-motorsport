'use client'

import { useAuth } from '@/providers/Auth'
import { ChevronRight, LogOut, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const LogoutPage: React.FC = () => {
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Session Closed')
      } catch (_) {
        setError('No Session Found')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-16 flex flex-col gap-2">
          <div className="h-4 w-32 bg-red-600" />
          <div className="h-4 w-10 bg-yellow-400" />
          <div className="h-4 w-20 bg-black" />
        </div>

        <div className="border-t-4 border-black pt-12">
          <header className="flex items-start justify-between mb-16">
            <div className="space-y-4">
              <div className="size-16 border-4 border-black flex items-center justify-center bg-white">
                <LogOut className="size-8 text-black" strokeWidth={3} />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-black leading-none">
                  {error || success || 'Processing...'}
                </h1>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Authentication Terminated
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="size-6 rounded-full bg-red-600" />
              <div className="size-6 bg-black" />
              <div className="size-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-yellow-400" />
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/login"
              className="group flex items-center justify-between w-full h-20 px-8 bg-black text-white hover:bg-zinc-100 hover:text-black border-2 border-black transition-colors"
            >
              <span className="text-base font-bold uppercase tracking-tight">Return to Login</span>
              <ChevronRight className="size-6 transition-transform group-hover:translate-x-2" strokeWidth={3} />
            </Link>

            <Link
              href="/search"
              className="group flex items-center justify-between w-full h-20 px-8 border-2 border-black bg-white text-black hover:bg-yellow-400 transition-colors"
            >
              <span className="text-base font-bold uppercase tracking-tight">View Catalog</span>
              <ShoppingBag className="size-6" strokeWidth={3} />
            </Link>
          </div>

          <div className="mt-20 pt-8 border-t-2 border-zinc-100 flex justify-between items-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300">
              System State: Neutral
            </p>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="size-1 bg-zinc-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}