import configPromise from '@payload-config'
import localFont from 'next/font/local'
import { getPayload } from 'payload'
import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { UtilityStack } from '@/components/Section/Components/UtilityStack'
import './globals.css'

const brunoAce = localFont({
  src: '../../fonts/BrunoAce-Regular.ttf',
  variable: '--font-bruno',
})

const interBold = localFont({
  src: '../../fonts/Inter-Bold.ttf',
  variable: '--font-inter-bold',
})

const raceSport = localFont({
  src: '../../fonts/Race-Sport.ttf',
  variable: '--font-race',
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  const payload = await getPayload({ config: configPromise })
  const forms = await payload.find({
    collection: 'forms',
    where: {
      title: {
        equals: 'Contact',
      },
    },
  })

  const contactForm = forms.docs[0]

  return (
    <html
      className={[
        GeistSans.variable,
        GeistMono.variable,
        brunoAce.variable,
        interBold.variable,
        raceSport.variable,
      ]
        .filter(Boolean)
        .join(' ')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
        <Providers>
          <AdminBar />
          <LivePreviewListener />

          <Header />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />

          {contactForm && <UtilityStack form={contactForm} />}

        </Providers>
      </body>
    </html>
  )
}