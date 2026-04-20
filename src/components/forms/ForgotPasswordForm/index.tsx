'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { ArrowRight } from 'lucide-react'
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
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError('Request failed.')
    }
  }, [])

  if (success) {
    return (
      <div className="max-w-sm">
        <div className="h-12 border-b border-black-pure flex items-center bg-primary px-8 mb-8">
          <span className="text-[10px] font-mono font-black uppercase text-black-pure">Success</span>
        </div>
        <p className="text-[10px] font-mono font-black uppercase text-black-pure/40 leading-relaxed">
          The link has been issued. Check the inbox to continue.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="h-12 border-b border-black-pure flex items-center bg-black-pure px-8 mb-12">
        <span className="text-[10px] font-mono font-black text-white-pure uppercase tracking-widest">Recovery</span>
      </div>

      {error && (
        <Message
          className="mb-8 border border-secondary p-4 bg-secondary/5 text-[10px] font-mono font-black uppercase text-secondary"
          error={error}
        />
      )}

      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <span className="block text-[10px] font-mono font-black uppercase text-black-pure/40 mb-2 px-1 tracking-widest">Email Address</span>
          <ClippedInput
            label="Email"
            id="email"
            type="email"
            autoComplete="email"
            error={Boolean(errors.email)}
            {...register('email', { required: 'Required' })}
          />
          {errors.email && <FormError message={errors.email.message} className="text-[9px] font-mono font-black text-secondary px-4 mt-1 uppercase" />}
        </FormItem>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-black-pure text-white-pure flex items-center justify-between px-8 hover:bg-primary hover:text-black-pure transition-all duration-300 group disabled:opacity-20"
        >
          <span className="text-xs font-mono font-black uppercase tracking-[0.2em]">
            {isLoading ? 'Processing' : 'Issue Link'}
          </span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </form>
    </div>
  )
}