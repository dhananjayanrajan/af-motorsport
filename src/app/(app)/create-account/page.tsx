import { CreateAccountForm } from '@/components/forms/CreateAccountForm'
import { RenderParams } from '@/components/RenderParams'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { ChevronRight, LogOut, UserPlus } from 'lucide-react'
import type { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { getPayload } from 'payload'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md flex flex-col">
          <div className="flex items-end gap-3 mb-16">
            <div className="size-10 rounded-full bg-red-600" />
            <div className="size-10 bg-black" />
            <div className="size-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[34px] border-b-yellow-400" />
          </div>

          <div className="border-t-4 border-black pt-12">
            <div className="flex items-start justify-between mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-black leading-none">
                  Existing Profile
                </h1>
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                  Active Session Detected
                </p>
              </div>
              <UserPlus className="text-black size-12" strokeWidth={3} />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Link
                href="/account"
                className="group flex items-center justify-between w-full h-20 px-8 bg-black text-white hover:bg-zinc-100 hover:text-black border-2 border-black transition-colors"
              >
                <span className="text-base font-bold uppercase tracking-tight">Return to Dashboard</span>
                <ChevronRight className="size-6 transition-transform group-hover:translate-x-2" strokeWidth={3} />
              </Link>

              <Link
                href="/logout"
                className="flex items-center justify-center gap-4 w-full h-20 border-2 border-black text-black hover:bg-red-600 hover:text-white transition-colors"
              >
                <LogOut className="size-5" strokeWidth={3} />
                <span className="text-base font-bold uppercase tracking-tight">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-16 flex flex-col gap-2">
          <div className="h-4 w-32 bg-red-600" />
          <div className="h-4 w-10 bg-yellow-400" />
          <div className="h-4 w-20 bg-black" />
        </div>

        <div className="border-t-4 border-black pt-12">
          <RenderParams />
          <CreateAccountForm />
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Create an account to manage your orders.',
  openGraph: mergeOpenGraph({
    title: 'Create Account',
    url: '/create-account',
  }),
  title: 'Create Account',
}