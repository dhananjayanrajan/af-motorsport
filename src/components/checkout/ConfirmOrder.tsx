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
    const id = searchParams.get('payment_intent')
    const email = searchParams.get('email')

    if (id && !isConfirming.current) {
      isConfirming.current = true
      confirmOrder('stripe', { additionalData: { paymentIntentID: id } }).then((res) => {
        if (res && typeof res === 'object' && 'orderID' in res) {
          router.push(`/shop/order/${res.orderID}?email=${email}`)
        }
      })
    }
  }, [cart, searchParams, router, confirmOrder])

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-20 bg-white-pure">
      <div className="max-w-md w-full border border-black-pure">
        <div className="h-12 bg-black-pure flex items-center px-6">
          <span className="text-[10px] font-mono font-black text-white-pure uppercase tracking-[0.3em]">Processing</span>
        </div>
        <div className="p-12 flex flex-col items-center gap-10">
          <div className="relative size-16 flex items-center justify-center">
            <LoadingSpinner className="size-full opacity-10" />
            <div className="absolute size-4 bg-primary rotate-45 animate-spin" />
          </div>
          <div className="space-y-2 text-center">
            <span className="block text-xs font-mono font-black uppercase tracking-widest">Confirming details</span>
            <span className="block text-[10px] font-mono font-black uppercase opacity-20">Please wait...</span>
          </div>
        </div>
      </div>
    </div>
  )
}