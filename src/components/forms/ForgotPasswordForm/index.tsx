'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
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

  return (
    <div className="w-full bg-white px-8 md:px-12 py-12">
      {!success ? (
        <div className="flex flex-col">
          <div className="mb-12 flex flex-col gap-2">
            <div className="h-4 w-32 bg-red-600" />
            <div className="h-4 w-10 bg-yellow-400" />
            <div className="h-4 w-20 bg-black" />
          </div>

          <header className="mb-10 space-y-4">
            <div className="flex items-center gap-4">
              <ShieldAlert className="size-8 text-black" strokeWidth={3} />
              <h1 className="text-3xl font-bold uppercase tracking-tighter text-black">
                Recovery
              </h1>
            </div>
            <p className="text-sm font-bold uppercase tracking-tight text-black max-w-sm">
              Enter your email address to receive a secure link to reset your account access.
            </p>
          </header>

          {error && (
            <Message
              className="mb-8 border-2 border-black bg-red-600 p-4 text-xs font-bold uppercase text-white"
              error={error}
            />
          )}

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <FormItem className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-tight text-black">Email Address</label>
              <ClippedInput
                id="email"
                type="email"
                placeholder="REQUIRED"
                autoComplete="email"
                className="w-full border-2 border-black h-14 px-4 bg-white outline-none rounded-none text-black font-bold uppercase"
                {...register('email', { required: 'Required' })}
              />
              {errors.email && <FormError message={errors.email.message} className="text-[10px] font-bold text-red-600 mt-2 uppercase" />}
            </FormItem>

            <div className="space-y-6 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group flex items-center justify-between w-full h-16 px-6 bg-black text-white hover:bg-zinc-100 hover:text-black border-2 border-black transition-colors disabled:opacity-50"
              >
                <span className="text-sm font-bold uppercase tracking-widest">
                  {isLoading ? 'Processing' : 'Send Reset Link'}
                </span>
                <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
              </button>

              <div className="pt-8 border-t-2 border-black">
                <Link
                  href="/login"
                  className="inline-block text-xs font-bold uppercase tracking-widest text-black bg-yellow-400 px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-all text-center"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <div className="flex gap-3 mb-12">
            <div className="size-8 rounded-full bg-red-600" />
            <div className="size-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-yellow-400" />
            <div className="size-8 bg-black" />
          </div>

          <div className="border-t-4 border-black pt-12 w-full">
            <div className="flex flex-col items-start gap-8 mb-10">
              <div className="size-20 border-2 border-black flex items-center justify-center bg-zinc-50">
                <MailCheck className="size-10 text-black" strokeWidth={3} />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-black">
                  Dispatched
                </h1>
                <p className="text-sm font-bold uppercase tracking-tight text-black max-w-sm">
                  Check your inbox. A secure password reset link has been sent to your registered address.
                </p>
              </div>
            </div>

            <Link
              href="/login"
              className="group flex items-center justify-between w-full h-16 px-6 bg-black text-white hover:bg-yellow-400 hover:text-black border-2 border-black transition-colors"
            >
              <span className="text-sm font-bold uppercase tracking-tight">Back to Login</span>
              <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}