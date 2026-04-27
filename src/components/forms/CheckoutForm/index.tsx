'use client'

import { Message } from '@/components/Message'
import { Address } from '@/payload-types'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ArrowRight, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback } from 'react'

type Props = {
  customerEmail?: string
  billingAddress?: Partial<Address>
  setProcessingPayment: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckoutForm: React.FC<Props> = ({ customerEmail, billingAddress, setProcessingPayment }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = React.useState<null | string>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { clearCart } = useCart()
  const { confirmOrder } = usePayments()

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!stripe || !elements) return

    if (!customerEmail) {
      setError('Email is required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      setError('Please provide a valid email address')
      return
    }

    if (!billingAddress?.addressLine1 || !billingAddress?.city || !billingAddress?.postalCode || !billingAddress?.country) {
      setError('Please complete all billing address fields')
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || 'Validation error')
      return
    }

    setIsLoading(true)
    setProcessingPayment(true)

    const returnUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/confirm-order${customerEmail ? `?email=${customerEmail}` : ''}`

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        confirmParams: {
          return_url: returnUrl,
          payment_method_data: {
            billing_details: {
              email: customerEmail,
              address: {
                line1: billingAddress?.addressLine1,
                city: billingAddress?.city,
                postal_code: billingAddress?.postalCode,
                country: billingAddress?.country,
              },
            },
          },
        },
        elements,
        redirect: 'if_required',
      })

      if (paymentIntent?.status === 'succeeded') {
        const result = await confirmOrder('stripe', {
          additionalData: { paymentIntentID: paymentIntent.id, customerEmail },
        })

        if (result && typeof result === 'object' && 'orderID' in result) {
          clearCart()
          router.push(`/orders/${result.orderID}${customerEmail ? `?email=${customerEmail}` : ''}`)
        }
      }

      if (stripeError) {
        setError(stripeError.message || 'Payment error')
      }
    } catch (e) {
      setError('Transaction failed')
    } finally {
      setIsLoading(false)
      setProcessingPayment(false)
    }
  }, [stripe, elements, customerEmail, billingAddress, confirmOrder, clearCart, router, setProcessingPayment])

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="border border-black-pure p-6 bg-white-pure">
        <PaymentElement />
      </div>

      {error && (
        <Message className="border border-secondary p-4 text-[10px] font-mono font-black uppercase text-secondary bg-secondary/5" error={error} />
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full h-14 bg-black-pure text-white-pure flex items-center justify-between px-8 hover:bg-secondary hover:text-white-pure transition-all group disabled:opacity-20"
      >
        <div className="flex items-center gap-4">
          <Lock size={14} />
          <span className="text-xs font-mono font-black uppercase tracking-widest">
            {isLoading ? 'Processing...' : 'Confirm purchase'}
          </span>
        </div>
        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
      </button>

      <div className="flex items-center justify-between border-t border-black-pure pt-6">
        <span className="text-[9px] font-mono font-black uppercase opacity-20 tracking-widest">Safe and secure</span>
        <div className="flex gap-2">
          <div className="size-3 bg-primary" />
          <div className="size-3 bg-secondary" />
          <div className="size-3 bg-black-pure" />
        </div>
      </div>
    </form>
  )
}