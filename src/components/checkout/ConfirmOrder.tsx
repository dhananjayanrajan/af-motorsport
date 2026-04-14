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
    <div className="grow flex flex-col items-center justify-center bg-black min-h-[60vh]">
      <div className="p-12 border border-zinc-900 bg-zinc-950 flex flex-col items-center gap-8 min-w-[320px]">
        <div className="relative h-10 w-10">
          <LoadingSpinner />
        </div>
        <div className="space-y-1 text-center">
          <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-white italic">Confirming Settlement</h1>
          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest animate-pulse">Synchronizing Ledger</p>
        </div>
      </div>
    </div>
  )
}