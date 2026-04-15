import { LoginForm } from '@/components/forms/LoginForm'
import { RenderParams } from '@/components/RenderParams'
import { DESIGN_SYSTEM } from '@/lib/constants'
import configPromise from '@payload-config'
import { ChevronRight, LogOut, UserCheck } from 'lucide-react'
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
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md bg-white border border-zinc-200 shadow-2xl p-10 md:p-12 relative">
          <div
            className="absolute top-0 left-0 w-full h-1.5"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          />

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-black flex items-center justify-center mb-8 shadow-xl">
              <UserCheck className="text-white h-8 w-8" strokeWidth={1.5} />
            </div>

            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-black mb-2">
              Account Active
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-10">
              Logged in
            </p>

            <div className="w-full space-y-4">
              <Link
                href="/account"
                className="group relative flex items-center justify-center w-full h-14 bg-black text-white transition-all active:scale-[0.98] overflow-hidden"
              >
                <div
                  className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
                  style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                />
                <span className="relative z-10 text-[12px] font-black uppercase italic flex items-center gap-2 group-hover:text-black transition-colors">
                  Go to Dashboard <ChevronRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/logout"
                className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-tight text-zinc-400 hover:text-black transition-colors py-2"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <RenderParams />
        <LoginForm />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account.',
}