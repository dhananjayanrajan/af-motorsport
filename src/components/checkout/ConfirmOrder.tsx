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
    <div className="grow flex flex-col items-center justify-center bg-black">
      <div className="p-12 border border-zinc-900 bg-zinc-950 flex flex-col items-center gap-8 min-w-[320px]">
        <div className="relative h-12 w-12">
          <LoadingSpinner className="text-[#00FF41]" />
          <div className="absolute inset-0 bg-[#00FF41]/10 blur-xl animate-pulse" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-xs font-black uppercase tracking-[0.5em] text-white">Finalizing_Order</h1>
          <p className="text-[8px] font-mono text-zinc-600 animate-pulse">WRITING_TO_BLOCKCHAIN_LEDGER...</p>
        </div>
      </div>
    </div>
  )
}