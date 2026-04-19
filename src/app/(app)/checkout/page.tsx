import { CheckoutPage } from '@/components/checkout/CheckoutPage'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Metadata } from 'next'
import { Fragment } from 'react'

export default function Checkout() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
        <div className="w-full max-w-4xl mb-12 border-2 border-black bg-yellow-400 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-black leading-relaxed">
            <Fragment>
              {'To enable checkout, you must '}
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                rel="noopener noreferrer"
                target="_blank"
                className="underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors"
              >
                obtain your Stripe API Keys
              </a>
              {' then set them as environment variables. See the '}
              <a
                href="https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe"
                rel="noopener noreferrer"
                target="_blank"
                className="underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors"
              >
                README
              </a>
              {' for more details.'}
            </Fragment>
          </p>
        </div>
      )}

      <div className="w-full max-w-4xl">
        <div className="mb-16 flex flex-col gap-2">
          <div className="h-4 w-32 bg-red-600" />
          <div className="h-4 w-10 bg-yellow-400" />
          <div className="h-4 w-20 bg-black" />
        </div>

        <div className="border-t-4 border-black pt-12">
          <header className="mb-12 flex flex-col items-start gap-4">
            <h1 className="text-4xl font-bold uppercase tracking-tighter text-black leading-none">
              Checkout
            </h1>
            <div className="h-2 w-16 bg-black" />
          </header>

          <CheckoutPage />
        </div>

        <footer className="mt-20 pt-8 border-t-2 border-zinc-100 flex justify-between items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300">
            Secure Transaction Protocol
          </p>
          <div className="flex gap-1">
            <div className="size-2 bg-red-600" />
            <div className="size-2 bg-black" />
            <div className="size-2 bg-yellow-400" />
          </div>
        </footer>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Checkout.',
  openGraph: mergeOpenGraph({
    title: 'Checkout',
    url: '/checkout',
  }),
  title: 'Checkout',
}