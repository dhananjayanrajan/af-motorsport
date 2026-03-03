'use client'

import { useAuth } from '@/providers/Auth'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, LogOut, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const LogoutPage: React.FC = () => {
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('SESSION_TERMINATED')
      } catch (_) {
        setError('NO_ACTIVE_SESSION')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg border border-zinc-900 bg-zinc-950 p-12 relative overflow-hidden"
        style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10 text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border border-zinc-800 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.6em] font-black text-red-600 block">
                Security Protocol
              </span>
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                {error || success || 'DE-AUTHENTICATING...'}
              </h1>
            </div>
          </div>

          <div className="w-full h-[1px] bg-zinc-900" />

          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/login"
              className="relative group flex items-center justify-center w-full h-14 bg-white text-black overflow-hidden transition-all active:scale-95"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em] italic flex items-center gap-3 group-hover:text-white transition-colors">
                RE-AUTHORIZE <ChevronRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/search"
              className="relative group flex items-center justify-center w-full h-14 bg-zinc-900 text-zinc-400 overflow-hidden transition-all active:scale-95 border border-zinc-800 hover:border-zinc-700 hover:text-white"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em] italic flex items-center gap-3 transition-colors">
                RETURN_TO_STORE <ShoppingBag className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex items-center gap-4 text-zinc-900">
        <span className="text-[8px] font-bold uppercase tracking-[0.5em] italic">Connection Status: OFFLINE</span>
      </div>
    </div>
  )
}