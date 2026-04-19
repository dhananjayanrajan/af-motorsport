'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
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

  const labelClasses = "text-xs font-black uppercase tracking-widest text-black-pure flex items-center gap-3 mb-3"
  const inputClasses = "bg-white-pure border-2 border-black-pure h-16 px-6 text-black-pure placeholder:text-black-pure/30 focus:bg-primary-500 transition-colors duration-300 rounded-none w-full font-black uppercase text-sm tracking-tight"

  return (
    <div className="w-full max-w-xl mx-auto bg-white-pure border-4 border-black-pure p-10 lg:p-16 relative">
      <div className="absolute top-0 right-0 flex">
        <div className="size-6 bg-primary-500 border-b-4 border-l-4 border-black-pure" />
      </div>

      <div className="mb-14 space-y-6">
        <div className="flex items-center gap-4">
          <Search className="size-6 text-black-pure" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-black-pure">
            ORDER LOOKUP
          </h2>
        </div>
        <p className="text-xs text-black-pure uppercase font-black tracking-tight leading-tight max-w-sm">
          ENTER YOUR EMAIL AND ORDER ID TO VIEW YOUR CURRENT STATUS AND TRACKING DATA.
        </p>
      </div>

      <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
        <FormItem className="space-y-1">
          <label htmlFor="email" className={labelClasses}>EMAIL</label>
          <ClippedInput
            id="email"
            type="email"
            placeholder="REQUIRED"
            autoComplete="email"
            className={inputClasses}
            {...register('email', { required: 'REQUIRED' })}
          />
          {errors.email && <FormError message={errors.email.message} className="text-xs font-black text-error mt-2 uppercase tracking-tighter" />}
        </FormItem>

        <FormItem className="space-y-1">
          <label htmlFor="orderID" className={labelClasses}>ORDER ID</label>
          <ClippedInput
            id="orderID"
            type="text"
            placeholder="REQUIRED"
            className={inputClasses}
            {...register('orderID', {
              required: 'REQUIRED',
            })}
          />
          {errors.orderID && <FormError message={errors.orderID.message} className="text-xs font-black text-error mt-2 uppercase tracking-tighter" />}
        </FormItem>

        <div className="space-y-8 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex items-center justify-center w-full h-20 bg-black-pure text-white-pure transition-all overflow-hidden"
          >
            <div
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-primary-500"
            />
            <span className="relative z-10 text-sm font-black uppercase tracking-widest flex items-center gap-4 group-hover:text-black-pure transition-colors duration-500">
              {isLoading ? 'SEARCHING' : 'FIND ORDER'} <Search className="size-5" />
            </span>
          </button>

          <div className="flex items-center gap-4 border-l-4 border-black-pure pl-6 py-2">
            <p className="text-[10px] text-black-pure/40 uppercase tracking-widest font-black leading-tight">
              IDs ARE LOCATED IN YOUR EMAIL.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}