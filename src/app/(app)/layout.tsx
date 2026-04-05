import localFont from 'next/font/local'
import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

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
      data-theme="light"
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />

          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}