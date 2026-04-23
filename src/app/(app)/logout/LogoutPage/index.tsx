'use client'

import SectionFooter from '@/components/Section/Components/SectionFooter'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import { useAuth } from '@/providers/Auth'
import { ArrowRight, ChevronRight, LogOut } from 'lucide-react'
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
        setSuccess('Logged out')
      } catch (_) {
        setError('No session')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <div className="min-h-screen bg-white-pure flex flex-col">
      <SectionHeader title="Account" subtitle="Closed" variant={1} />

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <header className="mb-12 space-y-6 text-center">
            <div className="inline-flex size-20 border border-black-pure items-center justify-center bg-white-pure mx-auto">
              <LogOut size={32} className="text-black-pure" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-mono font-black uppercase tracking-tighter text-black-pure">
                {error || success || 'Processing'}
              </h1>
              <p className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-black-pure opacity-40">
                Access restricted
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/login"
              className="group flex items-center justify-between w-full h-16 px-8 bg-black-pure text-white-pure hover:bg-primary hover:text-black-pure transition-all"
            >
              <span className="text-xs font-mono font-black uppercase tracking-widest">Sign in</span>
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-2" />
            </Link>

            <Link
              href="/shop"
              className="group flex items-center justify-between w-full h-16 px-8 border border-black-pure bg-white-pure text-black-pure hover:bg-secondary hover:text-white-pure transition-all"
            >
              <span className="text-xs font-mono font-black uppercase tracking-widest">Shop</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-16 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="size-1.5 bg-black-pure opacity-10" />
            ))}
          </div>
        </div>
      </main>

      <SectionFooter variant={1} />
    </div>
  )
}