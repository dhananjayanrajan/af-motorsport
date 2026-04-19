'use client'

import { Message } from '@/components/Message'
import { Address } from '@/payload-types'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ChevronRight, Lock, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback } from 'react'

type Props = {
  customerEmail?: string
  billingAddress?: Partial<Address>
  shippingAddress?: Partial<Address>
  setProcessingPayment: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckoutForm: React.FC<Props> = ({
  customerEmail,
  billingAddress,
  setProcessingPayment,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = React.useState<null | string>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { clearCart } = useCart()
  const { confirmOrder } = usePayments()

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setProcessingPayment(true)

      if (stripe && elements) {
        try {
          const returnUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/confirm-order${customerEmail ? `?email=${customerEmail}` : ''}`

          const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            confirmParams: {
              return_url: returnUrl,
              payment_method_data: {
                billing_details: {
                  email: customerEmail,
                  phone: billingAddress?.phone,
                  address: {
                    line1: billingAddress?.addressLine1,
                    line2: billingAddress?.addressLine2,
                    city: billingAddress?.city,
                    state: billingAddress?.state,
                    postal_code: billingAddress?.postalCode,
                    country: billingAddress?.country,
                  },
                },
              },
            },
            elements,
            redirect: 'if_required',
          })

          if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
              const confirmResult = await confirmOrder('stripe', {
                additionalData: {
                  paymentIntentID: paymentIntent.id,
                  ...(customerEmail ? { customerEmail } : {}),
                },
              })

              if (
                confirmResult &&
                typeof confirmResult === 'object' &&
                'orderID' in confirmResult &&
                confirmResult.orderID
              ) {
                const redirectUrl = `/orders/${confirmResult.orderID}${customerEmail ? `?email=${customerEmail}` : ''}`
                clearCart()
                router.push(redirectUrl)
              }
            } catch (err) {
              const msg = err instanceof Error ? err.message : 'Something went wrong.'
              setError(`Order confirmation failed: ${msg}`)
              setIsLoading(false)
            }
          }
          if (stripeError?.message) {
            setError(stripeError.message)
            setIsLoading(false)
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Something went wrong.'
          setError(`Payment submission failed: ${msg}`)
          setIsLoading(false)
          setProcessingPayment(false)
        }
      }
    },
    [
      setProcessingPayment,
      stripe,
      elements,
      customerEmail,
      billingAddress?.phone,
      billingAddress?.addressLine1,
      billingAddress?.addressLine2,
      billingAddress?.city,
      billingAddress?.state,
      billingAddress?.postalCode,
      billingAddress?.country,
      confirmOrder,
      clearCart,
      router,
    ],
  )

  return (
    <div className="w-full bg-white px-8 md:px-12 py-12">
      <div className="mb-12 flex flex-col gap-2">
        <div className="h-4 w-32 bg-red-600" />
        <div className="h-4 w-10 bg-yellow-400" />
        <div className="h-4 w-20 bg-black" />
      </div>

      <header className="mb-10 space-y-4">
        <div className="flex items-center gap-4">
          <Lock className="size-8 text-black" strokeWidth={3} />
          <h1 className="text-3xl font-bold uppercase tracking-tighter text-black">
            Secure Payment
          </h1>
        </div>
        <p className="text-sm font-bold uppercase tracking-tight text-black max-w-sm">
          All transactions are encrypted. Access to financial data is restricted to payment protocols.
        </p>
      </header>

      {error && (
        <Message
          className="mb-8 border-2 border-black bg-red-600 p-4 text-xs font-bold uppercase text-white"
          error={error}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-4 border-black p-6 bg-zinc-50">
          <PaymentElement />
        </div>

        <div className="space-y-6 pt-4">
          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="group flex items-center justify-between w-full h-20 px-8 bg-black text-white hover:bg-zinc-100 hover:text-black border-2 border-black transition-colors disabled:opacity-50"
          >
            <span className="text-base font-bold uppercase tracking-widest">
              {isLoading ? 'Processing' : 'Complete Purchase'}
            </span>
            <ChevronRight className="size-6 transition-transform group-hover:translate-x-2" strokeWidth={3} />
          </button>

          <div className="pt-10 border-t-2 border-black flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-black" strokeWidth={3} />
              <span className="text-xs font-bold uppercase tracking-widest text-black">
                Verified Security
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-red-600" />
              <div className="size-2 rounded-full bg-black" />
              <div className="size-2 rounded-full bg-yellow-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 ml-2">
                Stripe Protocol
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}