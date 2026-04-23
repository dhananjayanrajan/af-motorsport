'use client'

import { CheckoutPage } from '@/components/checkout/CheckoutPage'
import SectionFooter from '@/components/Section/Components/SectionFooter'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import { Fragment } from 'react'

export default function Checkout() {
  return (
    <main className="min-h-screen bg-white-pure flex flex-col">
      <SectionHeader title="Checkout" subtitle="Finalize" variant={1} />

      {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
        <div className="w-full border-b border-black-pure bg-primary h-12 flex items-center px-8">
          <p className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure">
            <Fragment>
              {'Setup required // '}
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                rel="noopener noreferrer"
                target="_blank"
                className="underline underline-offset-4 hover:text-white-pure"
              >
                Keys
              </a>
              {' // '}
              <a
                href="https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe"
                rel="noopener noreferrer"
                target="_blank"
                className="underline underline-offset-4 hover:text-white-pure"
              >
                Manual
              </a>
            </Fragment>
          </p>
        </div>
      )}

      <div className="flex-1">
        <CheckoutPage />
      </div>

      <SectionFooter variant={3} />
    </main>
  )
}