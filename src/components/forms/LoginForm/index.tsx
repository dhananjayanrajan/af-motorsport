'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { useAuth } from '@/providers/Auth'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, Lock } from 'lucide-react'
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
        setError('Login failed. Please check your credentials.')
      }
    },
    [login, router],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border border-zinc-200 shadow-2xl relative"
    >
      {/* Brand Accent Line */}
      <div
        className="absolute top-0 left-0 w-full h-1.5"
        style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
      />

      <div className="p-8 md:p-12">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black mb-6 shadow-lg">
            <Lock className="text-white w-5 h-5" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-black leading-none">
            Sign In
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mt-4">
            Enter your details to continue
          </p>
        </header>

        {error && (
          <Message
            className="mb-8 border-l-4 border-red-500 bg-red-50 p-4 text-[10px] uppercase font-black text-red-600"
            error={error}
          />
        )}

        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <FormItem className="space-y-2">
            <label className="text-[11px] font-black uppercase text-black italic ml-1">
              Email Address
            </label>
            <ClippedInput
              id="email"
              type="email"
              placeholder="name@email.com"
              autoComplete="email"
              {...register('email', { required: 'Required' })}
              className="bg-zinc-50 border-zinc-200 text-black h-14 px-5 placeholder:text-zinc-400 focus:bg-white focus:border-black transition-all"
            />
            {errors.email && <FormError message={errors.email.message} className="text-[10px] font-bold text-red-500 mt-1 uppercase" />}
          </FormItem>

          <FormItem className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black uppercase text-black italic">
                Password
              </label>
              <Link
                href={`/forgot-password${allParams}`}
                className="text-[9px] font-bold uppercase text-zinc-400 hover:text-black transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <ClippedInput
              id="password"
              type="password"
              placeholder="••••••••••••"
              autoComplete="current-password"
              {...register('password', { required: 'Required' })}
              className="bg-zinc-50 border-zinc-200 text-black h-14 px-5 placeholder:text-zinc-400 focus:bg-white focus:border-black transition-all"
            />
            {errors.password && <FormError message={errors.password.message} className="text-[10px] font-bold text-red-500 mt-1 uppercase" />}
          </FormItem>

          <div className="pt-4 space-y-6">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full h-16 bg-black text-white transition-all active:scale-[0.98] overflow-hidden"
            >
              <div
                className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
                style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
              />
              <span className="relative z-10 text-[12px] font-black uppercase italic flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                {isLoading ? 'Authenticating...' : 'Sign In'} <ChevronRight className="w-4 h-4" />
              </span>
            </button>

            <div className="text-center pt-4 border-t border-zinc-100">
              <span className="text-[11px] font-bold uppercase text-zinc-400">
                New to the platform?{' '}
              </span>
              <Link
                href={`/create-account${allParams}`}
                className="text-[11px] font-black uppercase italic text-black border-b-2 hover:opacity-70 transition-all"
                style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
              >
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  )
}