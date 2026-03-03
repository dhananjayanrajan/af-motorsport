import { LoginForm } from '@/components/forms/LoginForm'
import { RenderParams } from '@/components/RenderParams'
import configPromise from '@payload-config'
import { ChevronRight, LogOut, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { getPayload } from 'payload'

export default async function Login() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 pb-32">
        <div
          className="w-full max-w-lg overflow-hidden border border-zinc-800 bg-zinc-950 p-12 backdrop-blur-3xl relative shadow-2xl"
          style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent opacity-50 pointer-events-none" />

          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            <div className="relative">
              <ShieldCheck className="h-12 w-12 text-red-600 animate-pulse" />
              <div className="absolute -inset-4 bg-red-600/10 blur-xl rounded-full" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-col items-center gap-2">
                <div className="h-[1px] w-12 bg-red-600 mb-1" />
                <span className="text-[10px] uppercase tracking-[0.6em] font-black text-red-600 leading-none">
                  Session Active
                </span>
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">
                Identity Verified
              </h1>
            </div>

            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold max-w-[280px] leading-relaxed">
              Active credentials detected. Access to account sectors is currently authorized.
            </p>

            <div className="pt-8 w-full space-y-4">
              <Link
                href="/account"
                className="relative group flex items-center justify-center w-full h-14 bg-white text-black overflow-hidden transition-all active:scale-95"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] italic flex items-center gap-2 group-hover:text-white transition-colors">
                  Go to Dashboard <ChevronRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/logout"
                className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-red-600 transition-colors py-2"
              >
                <LogOut className="h-3 w-3" /> Terminate Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 pb-32">
      <div className="w-full max-w-lg">
        <RenderParams />
        <LoginForm />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Login or create an account to get started.',
  openGraph: {
    title: 'Login',
    url: '/login',
  },
  title: 'Login',
}