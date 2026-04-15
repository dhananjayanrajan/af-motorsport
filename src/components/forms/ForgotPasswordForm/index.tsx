'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
        'There was a problem sending the reset email. Please try again.',
      )
    }
  }, [])

  const labelClasses = "text-[11px] font-black uppercase italic text-black flex items-center gap-2 mb-2"
  const inputClasses = "bg-white border-zinc-200 h-14 px-5 text-black placeholder:text-zinc-400 focus:border-black focus:ring-0 transition-all rounded-none w-full"

  return (
    <div className="w-full max-w-lg mx-auto bg-white border border-zinc-200 p-8 md:p-12 shadow-2xl">
      {!success ? (
        <div className="relative">
          <div className="mb-12 space-y-3">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-5 text-black" />
              <span className="text-[11px] font-black uppercase italic tracking-widest text-black">
                Password Recovery
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest leading-relaxed">
              Enter your email address to receive a secure link to reset your account access.
            </p>
          </div>

          {error && (
            <Message
              className="mb-8 border-l-4 border-red-600 bg-red-50 p-4 text-[10px] font-bold uppercase tracking-wider text-red-600"
              error={error}
            />
          )}

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
                  {isLoading ? 'Sending Request...' : 'Send Reset Link'} <ChevronRight className="size-5" />
                </span>
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors italic border-b border-transparent hover:border-black pb-1"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="flex flex-col items-center gap-8">
            <div className="size-20 bg-zinc-50 border border-zinc-100 flex items-center justify-center">
              <MailCheck className="size-10 text-black" />
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-black italic uppercase tracking-tighter text-black">
                Email Dispatched
              </h1>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold leading-relaxed max-w-[280px] mx-auto">
                Check your inbox. A secure password reset link has been sent to your registered address.
              </p>
            </div>
            <div className="w-full h-px bg-zinc-100 mt-4" />
            <Link
              href="/login"
              className="text-[11px] font-black uppercase italic tracking-widest transition-all flex items-center gap-3 text-black hover:gap-5"
            >
              Back to Login <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}