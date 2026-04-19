import { CheckoutPage } from '@/components/checkout/CheckoutPage'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Metadata } from 'next'
import { Fragment } from 'react'

export default function Checkout() {
  return (
    <div className="min-h-screen bg-white-pure flex flex-col">
      {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
        <div className="w-full border-b border-black-pure bg-primary p-10">
          <p className="text-base font-mono font-black uppercase tracking-widest text-black-pure leading-relaxed">
            <Fragment>
              {'To enable checkout, you must '}
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                rel="noopener noreferrer"
                target="_blank"
                className="underline underline-offset-4 hover:text-secondary transition-colors"
              >
                obtain your keys
              </a>
              {' then set them as environment variables. See the '}
              <a
                href="https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe"
                rel="noopener noreferrer"
                target="_blank"
                className="underline underline-offset-4 hover:text-secondary transition-colors"
              >
                documentation
              </a>
              {' for more details.'}
            </Fragment>
          </p>
        </div>
      )}

      <div className="w-full border-b border-black-pure p-10 md:p-20 flex flex-col gap-8">
        <div className="flex gap-4">
          <div className="size-4 bg-secondary" />
          <div className="size-4 bg-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-mono font-black uppercase tracking-tighter text-black-pure leading-none">
          Checkout
        </h1>
      </div>

      <div className="w-full">
        <CheckoutPage />
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