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
    <div className="grow flex flex-col items-center justify-center bg-zinc-100 min-h-screen p-8">
      <div className="w-full max-w-lg bg-white border-4 border-black p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

        <div className="relative">
          <LoadingSpinner className="size-16" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-4 bg-black animate-ping" />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-tighter text-black">
            Syncing Transaction
          </h1>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.4em] animate-pulse">
            Verifying Data with Registry
          </p>
        </div>

        <div className="w-full pt-10 border-t-2 border-black">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
              Protocol: Secure
            </span>
            <div className="flex gap-1">
              <div className="size-2 bg-black" />
              <div className="size-2 bg-black opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}