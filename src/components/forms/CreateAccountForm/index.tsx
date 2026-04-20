'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { useAuth } from '@/providers/Auth'
import { ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>()

  const password = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      setError(null)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        setError('Creation failed.')
        return
      }

      setLoading(true)

      try {
        await login({ email: data.email, password: data.password })
        const redirect = searchParams.get('redirect')
        if (redirect) router.push(redirect)
        else router.push('/account')
      } catch (_) {
        setLoading(false)
        setError('Login failed.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <div className="w-full max-w-lg">
      {error && (
        <Message
          className="mb-10 border border-secondary p-4 bg-secondary/5 text-[10px] font-mono font-black uppercase text-secondary"
          error={error}
        />
      )}

      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <span className="block text-[10px] font-mono font-black uppercase text-black-pure/40 mb-2 px-1 tracking-widest">01 // Identity</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormItem>
            <span className="block text-[10px] font-mono font-black uppercase text-black-pure/40 mb-2 px-1 tracking-widest">02 // Credentials</span>
            <ClippedInput
              label="Password"
              id="password"
              type="password"
              autoComplete="new-password"
              error={Boolean(errors.password)}
              {...register('password', { required: 'Required', minLength: 8 })}
            />
            {errors.password && <FormError message="Min 8 characters" className="text-[9px] font-mono font-black text-secondary px-4 mt-1 uppercase" />}
          </FormItem>

          <FormItem>
            <span className="block text-[10px] font-mono font-black uppercase text-black-pure/40 mb-2 px-1 tracking-widest">03 // Verification</span>
            <ClippedInput
              label="Confirm"
              id="passwordConfirm"
              type="password"
              autoComplete="new-password"
              error={Boolean(errors.passwordConfirm)}
              {...register('passwordConfirm', {
                required: 'Required',
                validate: (val) => val === password || 'No match',
              })}
            />
            {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} className="text-[9px] font-mono font-black text-secondary px-4 mt-1 uppercase" />}
          </FormItem>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-black-pure text-white-pure flex items-center justify-between px-8 hover:bg-primary hover:text-black-pure transition-all duration-300 group disabled:opacity-20"
        >
          <span className="text-xs font-mono font-black uppercase tracking-[0.2em]">
            {loading ? 'Processing' : 'Register Profile'}
          </span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </form>
    </div>
  )
}