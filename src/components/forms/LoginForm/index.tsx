'use client'

import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { useAuth } from '@/providers/Auth'
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
      className="w-full max-w-lg overflow-hidden border border-zinc-800 bg-zinc-950 p-8 md:p-12 backdrop-blur-3xl relative shadow-2xl"
      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="mb-12 space-y-4 text-center relative z-10">
        <div className="flex flex-col items-center gap-2">
          <div className="h-[1px] w-12 bg-red-600 mb-1" />
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-red-600">
            Secure Access
          </span>
        </div>
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
          Identity Protocol
        </h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
          Enter your credentials to synchronize
        </p>
      </div>

      <Message className="mb-8 bg-red-950/10 border border-red-900/30 text-red-500 text-[10px] uppercase tracking-wider p-4" error={error} />

      <form className="space-y-8 relative z-10" onSubmit={handleSubmit(onSubmit)}>
        <FormItem className="space-y-3">
          <div className="flex justify-between items-end px-2">
            <label htmlFor="email" className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-500">Email Address</label>
            <span className="text-[8px] font-mono text-zinc-800">USR_ID</span>
          </div>
          <ClippedInput
            id="email"
            type="email"
            placeholder="USER@AFMOTORSPORT.COM"
            autoComplete="email"
            {...register('email', { required: 'Email address required.' })}
          />
          {errors.email && <FormError message={errors.email.message} className="text-red-600 text-[9px] font-bold uppercase tracking-widest px-4" />}
        </FormItem>

        <FormItem className="space-y-3">
          <div className="flex justify-between items-end px-2">
            <label htmlFor="password" className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-500">Password</label>
            <span className="text-[8px] font-mono text-zinc-800">SEC_KEY</span>
          </div>
          <ClippedInput
            id="password"
            type="password"
            placeholder="••••••••••••"
            autoComplete="current-password"
            {...register('password', { required: 'Security key required.' })}
          />
          {errors.password && <FormError message={errors.password.message} className="text-red-600 text-[9px] font-bold uppercase tracking-widest px-4" />}
        </FormItem>

        <div className="flex flex-col gap-6 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="relative group flex items-center justify-center w-full h-14 bg-white text-black overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
          >
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] italic flex items-center gap-2 group-hover:text-white transition-colors">
              {isLoading ? 'Processing...' : 'Authorize Access'} <ChevronRight className="h-4 w-4" />
            </span>
          </button>

          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest px-2">
            <Link
              href={`/recover-password${allParams}`}
              className="text-zinc-600 hover:text-red-600 transition-colors"
            >
              Forgot Password?
            </Link>
            <Link
              href={`/create-account${allParams}`}
              className="text-red-600 hover:text-white transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </form>
    </motion.div>
  )
}