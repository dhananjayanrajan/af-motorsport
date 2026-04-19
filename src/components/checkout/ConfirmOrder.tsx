'use client'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const ConfirmOrder: React.FC = () => {
  const { confirmOrder } = usePayments()
  const { cart } = useCart()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isConfirming = useRef(false)

  useEffect(() => {
    if (!cart?.items?.length) return
    const paymentIntentID = searchParams.get('payment_intent')
    const email = searchParams.get('email')

    if (paymentIntentID && !isConfirming.current) {
      isConfirming.current = true
      confirmOrder('stripe', { additionalData: { paymentIntentID } }).then((result) => {
        if (result && typeof result === 'object' && 'orderID' in result) {
          router.push(`/shop/order/${result.orderID}?email=${email}`)
        }
      })
    } else if (!paymentIntentID) {
      router.push('/')
    }
  }, [cart, searchParams, router, confirmOrder])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-pure px-6">
      <div className="w-full max-w-xl py-20 border-t border-black-pure">
        <div className="flex flex-col items-center gap-12">
          <div className="relative flex items-center justify-center size-24">
            <LoadingSpinner className="size-full opacity-10" />
            <div className="absolute size-4 bg-secondary rotate-45 animate-pulse" />
          </div>

          <div className="flex flex-col items-center text-center gap-6">
            <h1 className="text-4xl font-mono font-black uppercase tracking-tighter text-black-pure">
              Processing
            </h1>

            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-black-pure opacity-20" />
              <p className="text-sm font-mono font-black uppercase tracking-widest text-black-pure">
                Finalizing order details
              </p>
              <div className="h-px w-8 bg-black-pure opacity-20" />
            </div>
          </div>

          <div className="w-full pt-12 mt-4 border-t border-black-pure flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="size-2 bg-primary" />
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure opacity-40">
                Secure Status Active
              </span>
            </div>

            <div className="flex gap-2">
              <div className="size-1.5 bg-black-pure opacity-10" />
              <div className="size-1.5 bg-black-pure opacity-20" />
              <div className="size-1.5 bg-black-pure opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}