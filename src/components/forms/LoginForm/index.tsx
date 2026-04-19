'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { useAuth } from '@/providers/Auth'
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
        setError('Login failed.')
      }
    },
    [login, router],
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
            Login
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Authorization Required
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

        <FormItem className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-tight text-black">
              Password
            </label>
            <Link
              href={`/forgot-password${allParams}`}
              className="text-[10px] font-bold uppercase text-zinc-400 hover:text-black transition-colors"
            >
              Reset
            </Link>
          </div>
          <ClippedInput
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: 'Required' })}
            className="w-full border-2 border-black h-14 px-4 bg-white outline-none rounded-none text-black font-bold"
          />
          {errors.password && <FormError message={errors.password.message} className="text-[10px] font-bold text-error uppercase" />}
        </FormItem>

        <div className="pt-4 space-y-6">
          <button
            type="submit"
            disabled={isLoading}
            className="group flex items-center justify-between w-full h-16 px-6 bg-black text-white hover:bg-primary transition-colors border-2 border-black disabled:opacity-50"
          >
            <span className="text-sm font-bold uppercase tracking-widest">
              {isLoading ? 'Processing' : 'Sign In'}
            </span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="pt-8 border-t-2 border-black flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-tight text-zinc-400">
              No account?
            </p>
            <Link
              href={`/create-account${allParams}`}
              className="inline-block text-xs font-bold uppercase tracking-widest text-black bg-accent px-4 py-3 border-2 border-black hover:bg-black hover:text-white transition-all text-center"
            >
              Register Now
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}