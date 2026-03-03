'use client'

import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import ShinyText from '@/components/Reactbits/shiny-text'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, MailCheck, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
}

export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg overflow-hidden border border-zinc-800 bg-zinc-950 p-8 md:p-12 backdrop-blur-3xl relative shadow-2xl mx-auto"
      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      {!success ? (
        <div className="relative z-10">
          <div className="mb-12 space-y-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-600 mb-1" />
              <span className="text-[10px] uppercase tracking-[0.6em] font-black text-red-600">
                Recovery Protocol
              </span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
              <ShinyText
                text="Reset Access"
                speed={2}
                delay={0}
                color="#27272a"
                shineColor="#ffffff"
                spread={150}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Enter email to initialize credential override
            </p>
          </div>

          <Message className="mb-8 bg-red-950/10 border border-red-900/30 text-red-500 text-[10px] uppercase tracking-wider p-4" error={error} />

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <FormItem className="space-y-3">
              <div className="flex justify-between items-end px-2">
                <label htmlFor="email" className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-500">Channel Address</label>
                <span className="text-[8px] font-mono text-zinc-800">REC_ADDR</span>
              </div>
              <ClippedInput
                id="email"
                type="email"
                placeholder="USER@AFMOTORSPORT.COM"
                autoComplete="email"
                {...register('email', { required: 'Please provide your email.' })}
              />
              {errors.email && <FormError message={errors.email.message} className="text-red-600 text-[9px] font-bold uppercase tracking-widest px-4 mt-2" />}
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
                  {isLoading ? 'Sending...' : 'Request Override'} <ChevronRight className="h-4 w-4" />
                </span>
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                >
                  Return to Access Terminal
                </Link>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="relative z-10 text-center py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="h-16 w-16 rounded-full border border-zinc-800 flex items-center justify-center">
              <MailCheck className="h-8 w-8 text-red-600" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none text-white">
                Request Submitted
              </h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold leading-relaxed max-w-[280px] mx-auto">
                Security link dispatched. Check your transmission channel to securely reset your key.
              </p>
            </div>
            <div className="w-full h-[1px] bg-zinc-900 mt-4" />
            <Link
              href="/login"
              className="text-[10px] font-black uppercase tracking-[0.5em] italic text-red-600 hover:text-white transition-colors flex items-center gap-2"
            >
              Back to Login <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  )
}