import { CheckoutPage } from '@/components/checkout/CheckoutPage'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Metadata } from 'next'
import { Fragment } from 'react'

export default function Checkout() {
  return (
    <div className="w-full min-h-screen bg-white">
      {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
        <div className="p-6 bg-amber-50 border-b border-amber-200 text-[10px] font-bold uppercase tracking-widest text-amber-800">
          <Fragment>
            {'To enable checkout, you must '}
            <a
              href="https://dashboard.stripe.com/test/apikeys"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              obtain your Stripe API Keys
            </a>
            {' then set them as environment variables. See the '}
            <a
              href="https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              README
            </a>
            {' for more details.'}
          </Fragment>
        </div>
      )}

      <h1 className="sr-only">Checkout</h1>

      <CheckoutPage />
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