'use client'

import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import ShinyText from '@/components/Reactbits/shiny-text'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)
  const shouldReduceMotion = useReducedMotion()

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        setError(null)
        await login(data)
        if (redirect?.current) router.push(redirect.current)
        else router.push('/account')
      } catch (_) {
        setError('Authentication failure. Check credentials and try again.')
      }
    },
    [login, router],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "w-full max-w-lg overflow-hidden border bg-zinc-950 p-8 md:p-12 backdrop-blur-3xl relative shadow-2xl transition-all duration-300",
        "border-zinc-800",
        `hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/30`
      )}
      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
    >
      <div className={cn("absolute inset-0 via-transparent to-transparent opacity-50 pointer-events-none bg-gradient-to-br", `from-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/5`)} />

      <div className="mb-12 space-y-4 text-center relative z-10">
        <div className="flex flex-col items-center gap-2">
          <div className={cn("h-[1px] w-12 mb-1", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
          <span className={cn("text-[10px] uppercase font-black", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL, `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}>
            Secure Access
          </span>
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
          <ShinyText
            text="Identity Protocol"
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
        <p className={cn("text-[10px] text-zinc-500 uppercase font-bold", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
          Enter your credentials to synchronize
        </p>
      </div>

      <Message
        className={cn(
          "mb-8 border text-[10px] uppercase tracking-wider p-4 bg-zinc-950/10",
          `border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/30 text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`
        )}
        error={error}
      />

      <form className="space-y-8 relative z-10" onSubmit={handleSubmit(onSubmit)}>
        <FormItem className="space-y-3">
          <div className="flex justify-between items-end px-2">
            <label htmlFor="email" className={cn("text-[9px] uppercase font-black text-zinc-500", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>Email Address</label>
            <span className="text-[8px] font-mono text-zinc-800">USR_ID</span>
          </div>
          <ClippedInput
            id="email"
            type="email"
            placeholder="USER@AFMOTORSPORT.COM"
            autoComplete="email"
            {...register('email', { required: 'Email address required.' })}
          />
          {errors.email && <FormError message={errors.email.message} className={cn("text-[9px] font-bold uppercase px-4 mt-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT, `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />}
        </FormItem>

        <FormItem className="space-y-3">
          <div className="flex justify-between items-end px-2">
            <label htmlFor="password" className={cn("text-[9px] uppercase font-black text-zinc-500", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>Password</label>
            <span className="text-[8px] font-mono text-zinc-800">SEC_KEY</span>
          </div>
          <ClippedInput
            id="password"
            type="password"
            placeholder="••••••••••••"
            autoComplete="current-password"
            {...register('password', { required: 'Security key required.' })}
          />
          {errors.password && <FormError message={errors.password.message} className={cn("text-[9px] font-bold uppercase px-4 mt-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT, `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />}
        </FormItem>

        <div className="flex flex-col gap-6 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="relative group flex items-center justify-center w-full h-14 bg-white text-black overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
          >
            <div className={cn("absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
            <span className={cn("relative z-10 text-[11px] font-black uppercase italic flex items-center gap-2 transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL, "group-hover:text-black")}>
              {isLoading ? 'Processing...' : 'Authorize Access'} <ChevronRight className="h-4 w-4" />
            </span>
          </button>

          <div className={cn("flex items-center justify-between text-[10px] font-bold uppercase px-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
            <Link
              href={`/forgot-password${allParams}`}
              className="text-zinc-600 hover:text-white transition-colors"
            >
              Forgot Password?
            </Link>
            <Link
              href={`/create-account${allParams}`}
              className={cn("hover:text-white transition-colors", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
            >
              Create Account
            </Link>
          </div>
        </div>
      </form>
    </motion.div>
  )
}