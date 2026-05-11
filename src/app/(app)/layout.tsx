import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { ReactNode } from 'react'
import { Suspense } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { UtilityStack } from '@/components/Section/Components/UtilityStack'
import LayoutContent from './LayoutContent'
import './globals.css'

async function AsyncUtilityStack() {
  const payload = await getPayload({ config: configPromise })
  const forms = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact' } },
  })
  const contactForm = forms.docs[0]
  return contactForm ? <UtilityStack form={contactForm} /> : null
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden">
        <Providers>
          <LayoutContent>
            <AdminBar />
            <LivePreviewListener />
            <Header />
            <main className="flex-grow w-full relative">
              <Suspense>{children}</Suspense>
            </main>
            <Footer />
            <Suspense fallback={null}>
              <AsyncUtilityStack />
            </Suspense>
          </LayoutContent>
        </Providers>
      </body>
    </html>
  )
}