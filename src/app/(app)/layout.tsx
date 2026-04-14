import localFont from 'next/font/local'
import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Mail } from 'lucide-react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
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

          <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-center gap-4">
            <a
              href="mailto:contact@afmotorsport.com"
              className="flex items-center justify-center size-12 bg-zinc-950 border border-zinc-800 rounded-full shadow-2xl hover:scale-110 hover:border-white transition-all duration-300 group"
              aria-label="Send Email"
            >
              <Mail
                size={20}
                strokeWidth={1.5}
                className="text-zinc-400 group-hover:text-white transition-colors"
              />
            </a>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-12 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:bg-[#20ba5a] transition-all duration-300 group"
              aria-label="Contact on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-7 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .006 5.408 0 12.045c0 2.121.554 4.191 1.605 6.01L0 24l6.132-1.61a11.816 11.816 0 005.915 1.587h.005c6.635 0 12.043-5.409 12.048-12.047a11.77 11.77 0 00-3.489-8.452" />
              </svg>
            </a>
          </div>
        </Providers>
      </body>
    </html>
  )
}