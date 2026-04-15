'use client'

import { Message } from '@/components/Message'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
    <div className="w-full bg-white transition-all duration-300">
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-3">
          <Lock className="size-4 text-black" />
          <span className="text-[11px] font-black uppercase italic tracking-widest text-black">
            Secure Payment
          </span>
        </div>
        <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">
          All transactions are encrypted and secure.
        </p>
      </div>

      {error && (
        <Message
          className="mb-8 border-l-4 border-red-600 bg-red-50 p-4 text-[10px] font-bold uppercase tracking-wider text-red-600"
          error={error}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="p-4 border border-zinc-100 bg-zinc-50/50">
          <PaymentElement />
        </div>

        <div className="space-y-6">
          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="group relative flex items-center justify-center w-full h-16 bg-black text-white transition-all active:scale-[0.98] disabled:opacity-10 overflow-hidden"
          >
            <div
              className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
            />
            <span className="relative z-10 text-[12px] font-black uppercase italic tracking-widest flex items-center gap-4 group-hover:text-black transition-colors">
              {isLoading ? 'Processing...' : 'Complete Purchase'} <ChevronRight className="size-5" />
            </span>
          </button>

          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-3 text-zinc-300" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 italic">
                Verified Security
              </span>
            </div>
            <div className="size-1 rounded-full bg-zinc-200" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 italic">
              Powered by Stripe
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}