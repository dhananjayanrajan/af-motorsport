'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { useAuth } from '@/providers/Auth'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
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
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
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
        const message = response.statusText || 'Account creation failed.'
        setError(message)
        return
      }

      setLoading(true)

      try {
        await login({
          email: data.email,
          password: data.password,
        })
        const redirect = searchParams.get('redirect')
        if (redirect) router.push(redirect)
        else router.push(`/account?success=${encodeURIComponent('Success')}`)
      } catch (_) {
        setLoading(false)
        setError('Login failed after registration.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <div className="w-full flex flex-col items-center bg-white px-8 md:px-12 py-12">
      <div className="w-full mb-12">
        <div className="flex gap-2 mb-8">
          <div className="size-6 rounded-full bg-primary" />
          <div className="size-6 bg-secondary" />
          <div className="size-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-accent" />
        </div>

        <header className="space-y-2">
          <h1 className="text-3xl font-bold uppercase tracking-tighter text-black">
            Register
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Account Creation Protocol
          </p>
        </header>
      </div>

      {error && (
        <Message
          className="w-full mb-8 border-2 border-black bg-error p-4 text-xs font-bold uppercase text-white"
          error={error}
        />
      )}

      <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <FormItem className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-tight text-black">
            Email
          </label>
          <ClippedInput
            id="email"
            type="email"
            autoComplete="email"
            {...register('email', { required: 'Required' })}
            className="w-full border-2 border-black h-14 px-4 bg-white outline-none rounded-none text-black font-bold"
          />
          {errors.email && <FormError message={errors.email.message} className="text-[10px] font-bold text-error uppercase" />}
        </FormItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormItem className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-tight text-black">
              Password
            </label>
            <ClippedInput
              id="password"
              type="password"
              autoComplete="new-password"
              {...register('password', { required: 'Required', minLength: 8 })}
              className="w-full border-2 border-black h-14 px-4 bg-white outline-none rounded-none text-black font-bold"
            />
            {errors.password && <FormError message="Min 8 chars" className="text-[10px] font-bold text-error uppercase" />}
          </FormItem>

          <FormItem className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-tight text-black">
              Confirm
            </label>
            <ClippedInput
              id="passwordConfirm"
              type="password"
              autoComplete="new-password"
              {...register('passwordConfirm', {
                required: 'Required',
                validate: (value) => value === password || 'No match',
              })}
              className="w-full border-2 border-black h-14 px-4 bg-white outline-none rounded-none text-black font-bold"
            />
            {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} className="text-[10px] font-bold text-error uppercase" />}
          </FormItem>
        </div>

        <div className="pt-4 space-y-6">
          <button
            type="submit"
            disabled={loading}
            className="group flex items-center justify-between w-full h-16 px-6 bg-black text-white hover:bg-primary transition-colors border-2 border-black disabled:opacity-50"
          >
            <span className="text-sm font-bold uppercase tracking-widest">
              {loading ? 'Processing' : 'Create Profile'}
            </span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
          </button>

          <div className="pt-8 border-t-2 border-black flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-tight text-zinc-400">
              Existing Account?
            </p>
            <Link
              href={`/login${allParams}`}
              className="inline-block text-xs font-bold uppercase tracking-widest text-black bg-accent px-4 py-3 border-2 border-black hover:bg-black hover:text-white transition-all text-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}