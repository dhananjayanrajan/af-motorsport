'use client'

import { Message } from '@/components/Message'
import ShinyText from '@/components/Reactbits/shiny-text'
import { Address } from '@/payload-types'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, CreditCard, ShieldCheck } from 'lucide-react'
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
  const shouldReduceMotion = useReducedMotion()

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
              setError(`Error while confirming order: ${msg}`)
              setIsLoading(false)
            }
          }
          if (stripeError?.message) {
            setError(stripeError.message)
            setIsLoading(false)
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Something went wrong.'
          setError(`Error while submitting payment: ${msg}`)
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
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-8 md:p-12 backdrop-blur-3xl relative shadow-2xl mx-auto"
      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="mb-12 space-y-4 text-center relative z-10">
        <div className="flex flex-col items-center gap-2">
          <CreditCard className="h-5 w-5 text-red-600 mb-1" />
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-red-600">
            Payment Terminal
          </span>
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
          <ShinyText
            text="Secure Checkout"
            speed={1}
            delay={0}
            color="#27272a"
            shineColor="#ffffff"
            spread={150}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
          Encrypted Financial Authorization
        </p>
      </div>

      <Message className="mb-8 bg-red-950/10 border border-red-900/30 text-red-500 text-[10px] uppercase tracking-wider p-4" error={error} />

      <form onSubmit={handleSubmit} className="relative z-10">
        <PaymentElement />

        <div className="flex flex-col gap-6 pt-8">
          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="relative group flex items-center justify-center w-full h-14 bg-white text-black overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
          >
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] italic flex items-center gap-3 group-hover:text-white transition-colors">
              {isLoading ? 'Processing...' : 'Authorize Transaction'} <ChevronRight className="h-4 w-4" />
            </span>
          </button>

          <div className="flex items-center justify-center gap-3 py-2">
            <ShieldCheck className="h-3 w-3 text-zinc-700" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">
              SSL Encrypted Tunnel Active
            </span>
          </div>
        </div>
      </form>
    </motion.div>
  )
}