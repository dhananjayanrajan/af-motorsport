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
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <RenderParams className="mb-8" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 flex flex-col md:flex-row gap-12">
        {user && (
          <aside className="md:w-64 flex-shrink-0">
            <AccountNav className="flex flex-col items-start gap-1 sticky top-12" />
          </aside>
        )}

        <main className="grow flex flex-col gap-16">{children}</main>
      </div>
    </div>
  )
}