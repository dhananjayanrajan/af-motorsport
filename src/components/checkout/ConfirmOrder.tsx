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
    <div className="grow flex flex-col items-center justify-center bg-zinc-50 min-h-[60vh] p-4">
      <div className="p-8 md:p-12 border border-zinc-200 bg-white flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="relative h-8 w-8">
          <LoadingSpinner />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-xs font-black uppercase tracking-widest text-zinc-900 italic">Confirming Payment</h1>
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest animate-pulse">Processing Transaction</p>
        </div>
      </div>
    </div>
  )
}