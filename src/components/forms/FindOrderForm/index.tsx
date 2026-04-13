'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import ShinyText from '@/components/Reactbits/shiny-text'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { useAuth } from '@/providers/Auth'
import { motion, useReducedMotion } from 'framer-motion'
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
  const shouldReduceMotion = useReducedMotion()

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

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full max-w-lg overflow-hidden border bg-zinc-950 p-8 md:p-12 backdrop-blur-3xl relative shadow-2xl mx-auto border-zinc-800 transition-all duration-300 hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/30`}
      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
    >
      <div className={`absolute inset-0 via-transparent to-transparent opacity-50 pointer-events-none bg-gradient-to-br from-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/5`} />

      <div className="mb-12 space-y-4 text-center relative z-10">
        <div className="flex flex-col items-center gap-2">
          <div className={`h-[1px] w-12 mb-1 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />
          <span className={`text-[10px] uppercase tracking-[0.6em] font-black text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`}>
            Archive Retrieval
          </span>
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
          <ShinyText
            text="Find Order"
            speed={2}
            delay={0}
            color="#27272a"
            shineColor={DESIGN_SYSTEM.COLORS.PRIMARY}
            spread={150}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
          Locate specific transaction data
        </p>
      </div>

      <form className="space-y-8 relative z-10" onSubmit={handleSubmit(onSubmit)}>
        <FormItem className="space-y-3">
          <div className="flex justify-between items-end px-2">
            <label htmlFor="email" className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-500">Channel Address</label>
            <span className="text-[8px] font-mono text-zinc-800">USR_MAIL</span>
          </div>
          <ClippedInput
            id="email"
            type="email"
            placeholder="USER@AFMOTORSPORT.COM"
            autoComplete="email"
            {...register('email', { required: 'Email address is required.' })}
          />
          {errors.email && <FormError message={errors.email.message} className={`text-[9px] font-bold uppercase tracking-widest px-4 mt-2 text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />}
        </FormItem>

        <FormItem className="space-y-3">
          <div className="flex justify-between items-end px-2">
            <label htmlFor="orderID" className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-500">Transaction ID</label>
            <span className="text-[8px] font-mono text-zinc-800">HEX_CODE</span>
          </div>
          <ClippedInput
            id="orderID"
            type="text"
            placeholder="ORDER_ID_CODE"
            {...register('orderID', {
              required: 'Order ID is required.',
            })}
          />
          {errors.orderID && <FormError message={errors.orderID.message} className={`text-[9px] font-bold uppercase tracking-widest px-4 mt-2 text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />}
        </FormItem>

        <div className="flex flex-col gap-6 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="relative group flex items-center justify-center w-full h-14 bg-white text-black overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
          >
            <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] italic flex items-center gap-3 group-hover:text-black transition-colors">
              {isLoading ? 'Scanning...' : 'Fetch Transaction'} <Search className="h-4 w-4" />
            </span>
          </button>

          <div className="text-center">
            <p className="text-[8px] text-zinc-600 uppercase tracking-widest font-black italic">
              *ID can be found in your original transmission receipt
            </p>
          </div>
        </div>
      </form>
    </motion.div>
  )
}