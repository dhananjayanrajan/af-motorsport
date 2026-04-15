'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
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
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 bg-zinc-50/50">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg border border-zinc-200 bg-white p-12 relative overflow-hidden shadow-2xl"
        style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
      >
        <div
          className="absolute top-0 left-0 w-full h-[2px] z-20"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
        />

        <div className="relative z-10 text-center space-y-10">
          <div className="flex flex-col items-center gap-5">
            <div className="h-14 w-14 border-2 border-zinc-100 flex items-center justify-center bg-zinc-50">
              <LogOut className="h-6 w-6" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
            </div>
            <div className="space-y-3">
              <span className={cn("text-[10px] uppercase font-black block tracking-[0.4em] italic text-zinc-400")}>
                System Access Protocol
              </span>
              <h1 className="text-4xl font-black text-black italic uppercase tracking-tighter leading-none">
                {error || success || 'DE-AUTHENTICATING...'}
              </h1>
            </div>
          </div>

          <div className="w-full h-[1px] bg-zinc-100" />

          <div className="grid grid-cols-1 gap-5">
            <Link
              href="/login"
              className="relative group flex items-center justify-center w-full h-16 bg-black text-white overflow-hidden transition-all active:scale-95"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
              />
              <span className={cn("relative z-10 text-[11px] font-black uppercase italic flex items-center gap-4 group-hover:text-black transition-colors tracking-[0.2em]")}>
                RE-AUTHORIZE <ChevronRight className="h-5 w-5" />
              </span>
            </Link>

            <Link
              href="/search"
              className="relative group flex items-center justify-center w-full h-16 bg-white text-black overflow-hidden transition-all active:scale-95 border border-zinc-200 hover:border-black"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <span className={cn("relative z-10 text-[11px] font-black uppercase italic flex items-center gap-4 transition-colors tracking-[0.2em]")}>
                RETURN_TO_CATALOG <ShoppingBag className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 flex items-center gap-4 text-zinc-300">
        <div className="h-2 w-2 bg-zinc-200" />
        <span className="text-[9px] font-black uppercase tracking-[0.6em] italic">Status: Link_Severed</span>
        <div className="h-2 w-2 bg-zinc-200" />
      </div>
    </div>
  )
}