import type { ReactNode } from 'react'

import { AccountNav } from '@/components/AccountNav'
import { RenderParams } from '@/components/RenderParams'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  return (
    <div className="min-h-screen bg-white-pure">
      <div className="w-full border-b-4 border-black-pure bg-white-pure sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="size-10 bg-primary-500 border-4 border-black-pure flex items-center justify-center">
              <div className="size-3 bg-black-pure" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-black-pure">
              USER DASHBOARD
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="h-6 w-1.5 bg-primary-500" />
            <div className="h-6 w-1.5 bg-secondary-500" />
            <div className="h-6 w-1.5 bg-tertiary-500" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <RenderParams className="mb-8" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pb-32 flex flex-col md:flex-row gap-20">
        {user && (
          <aside className="md:w-80 flex-shrink-0">
            <div className="sticky top-40 space-y-10">
              <AccountNav className="flex flex-col items-start gap-5" />
            </div>
          </aside>
        )}

        <main className="grow flex flex-col gap-24 relative">
          <div className="absolute -left-10 top-0 bottom-0 w-1 bg-black-pure/10 hidden md:block" />
          {children}
        </main>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-3 flex">
        <div className="flex-1 bg-primary-500" />
        <div className="flex-1 bg-secondary-500" />
        <div className="flex-1 bg-tertiary-500" />
        <div className="flex-1 bg-black-pure" />
      </div>
    </div>
  )
}