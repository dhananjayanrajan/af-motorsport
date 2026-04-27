'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { useAuth } from '@/providers/Auth'
import { ArrowRight } from 'lucide-react'
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
    formState: { errors, isSubmitting },
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
        setError('Invalid credentials.')
      }
    },
    [login, router],
  )

  return (
    <div className="w-full max-w-sm">
      {error && (
        <Message
          className="mb-8 border border-secondary p-4 bg-secondary/5 text-[10px] font-mono font-black uppercase text-secondary"
          error={error}
        />
      )}

      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[10px] font-mono font-black uppercase text-black-pure/40 tracking-widest">01 // Access</span>
          </div>
          <ClippedInput
            label="Email"
            id="email"
            type="email"
            autoComplete="email"
            error={Boolean(errors.email)}
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format'
              }
            })}
          />
          {errors.email && (
            <FormError
              message={errors.email.message}
              className="text-[9px] font-mono font-black text-secondary uppercase px-4 mt-1"
            />
          )}
        </FormItem>

        <FormItem>
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[10px] font-mono font-black uppercase text-black-pure/40 tracking-widest">02 // Security</span>
            <Link
              href={`/forgot-password${allParams}`}
              className="text-[9px] font-mono font-black uppercase text-primary hover:text-black-pure transition-colors"
            >
              [ Reset ]
            </Link>
          </div>
          <ClippedInput
            label="Password"
            id="password"
            type="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            {...register('password', {
              required: 'Required',
              minLength: {
                value: 8,
                message: 'Min 8 characters'
              }
            })}
          />
          {errors.password && (
            <FormError
              message={errors.password.message}
              className="text-[9px] font-mono font-black text-secondary uppercase px-4 mt-1"
            />
          )}
        </FormItem>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-black-pure text-white-pure flex items-center justify-between px-8 hover:bg-primary hover:text-black-pure transition-all duration-300 group disabled:opacity-20"
        >
          <span className="text-xs font-mono font-black uppercase tracking-[0.2em]">
            {isSubmitting ? 'Processing' : 'Authenticate'}
          </span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </form>
    </div>
  )
}