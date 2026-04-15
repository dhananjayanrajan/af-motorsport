'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { useAuth } from '@/providers/Auth'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  orderID: string
}

type Props = {
  initialEmail?: string
}

export const FindOrderForm: React.FC<Props> = ({ initialEmail }) => {
  const router = useRouter()
  const { user } = useAuth()

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>({
    defaultValues: {
      email: initialEmail || user?.email,
    },
  })

  const onSubmit = useCallback(
    async (data: FormData) => {
      router.push(`/orders/${data.orderID}?email=${data.email}`)
    },
    [router],
  )

  const labelClasses = "text-[11px] font-black uppercase italic text-black flex items-center gap-2 mb-2"
  const inputClasses = "bg-white border-zinc-200 h-14 px-5 text-black placeholder:text-zinc-400 focus:border-black focus:ring-0 transition-all rounded-none w-full"

  return (
    <div className="w-full max-w-lg mx-auto bg-white border border-zinc-200 p-8 md:p-12 shadow-2xl">
      <div className="mb-12 space-y-3">
        <div className="flex items-center gap-3">
          <Search className="size-5 text-black" />
          <span className="text-[11px] font-black uppercase italic tracking-widest text-black">
            Order Lookup
          </span>
        </div>
        <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest leading-relaxed">
          Enter your order details to view status, tracking information, and receipt data.
        </p>
      </div>

      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <FormItem className="space-y-1">
          <label htmlFor="email" className={labelClasses}>Email Address</label>
          <ClippedInput
            id="email"
            type="email"
            placeholder="email@example.com"
            autoComplete="email"
            className={inputClasses}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <FormError message={errors.email.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>

        <FormItem className="space-y-1">
          <label htmlFor="orderID" className={labelClasses}>Order Number</label>
          <ClippedInput
            id="orderID"
            type="text"
            placeholder="Enter Order ID"
            className={inputClasses}
            {...register('orderID', {
              required: 'Order ID is required',
            })}
          />
          {errors.orderID && <FormError message={errors.orderID.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>

        <div className="space-y-6 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex items-center justify-center w-full h-16 bg-black text-white transition-all active:scale-[0.98] disabled:opacity-10 overflow-hidden"
          >
            <div
              className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
            />
            <span className="relative z-10 text-[12px] font-black uppercase italic tracking-widest flex items-center gap-4 group-hover:text-black transition-colors">
              {isLoading ? 'Searching...' : 'Locate Order'} <Search className="size-5" />
            </span>
          </button>

          <div className="text-center">
            <p className="text-[9px] text-zinc-300 uppercase tracking-[0.2em] font-bold italic">
              Order numbers can be found in your confirmation email.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}