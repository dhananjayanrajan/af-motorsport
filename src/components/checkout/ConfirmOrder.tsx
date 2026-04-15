'use client'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
    <div className="grow flex flex-col items-center justify-center bg-zinc-50 min-h-screen p-6">
      <div className="w-full max-w-md bg-white border border-zinc-200 p-12 shadow-2xl flex flex-col items-center gap-8 relative overflow-hidden">
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 w-full h-1.5"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
        />

        <div className="relative">
          <LoadingSpinner className="size-10" />
        </div>

        <div className="space-y-3 text-center">
          <h1 className="text-[14px] font-black uppercase tracking-widest text-black italic">
            Securing Transaction
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] animate-pulse">
            Confirming Payment with Bank
          </p>
        </div>

        <div className="w-full pt-8 border-t border-zinc-100">
          <p className="text-[9px] font-black uppercase text-zinc-300 text-center tracking-widest">
            Please do not refresh or close this window
          </p>
        </div>
      </div>
    </div>
  )
}