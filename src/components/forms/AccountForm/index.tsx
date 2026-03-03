'use client'

import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
import { AlertCircle, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormData = {
  email: string
  name: User['name']
  password: string
  passwordConfirm: string
}

export const AccountForm: React.FC = () => {
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)
  const router = useRouter()

  const {
    formState: { errors, isLoading, isSubmitting, isDirty, dirtyFields },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          toast.success('IDENTITY SYNCHRONIZED')
          setChangePassword(false)
          reset({
            name: json.doc.name,
            email: json.doc.email,
            password: '',
            passwordConfirm: '',
          })
        } else {
          toast.error('SYNC ERROR')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(`/login?redirect=${encodeURIComponent('/account')}`)
    }
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset])

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-16">
        <button
          type="button"
          onClick={() => setChangePassword(false)}
          className={cn(
            "px-10 py-4 text-[9px] font-black uppercase tracking-[0.4em] transition-all relative overflow-hidden",
            !changePassword ? "text-white bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]" : "bg-zinc-900 text-zinc-600 hover:text-zinc-400"
          )}
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
        >
          01. Identity
        </button>
        <button
          type="button"
          onClick={() => setChangePassword(true)}
          className={cn(
            "px-10 py-4 text-[9px] font-black uppercase tracking-[0.4em] transition-all relative overflow-hidden",
            changePassword ? "text-white bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]" : "bg-zinc-900 text-zinc-600 hover:text-zinc-400"
          )}
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
        >
          02. Security
        </button>
      </div>

      <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
        {!changePassword ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <FormItem className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-500 px-1 flex items-center gap-2">
                <span className={cn("w-1 h-1 transition-colors", dirtyFields.name ? "bg-red-600" : "bg-zinc-800")} /> Pilot Designation
              </label>
              <ClippedInput
                id="name"
                placeholder="PILOT_ID"
                error={!!errors.name}
                valid={!!dirtyFields.name && !errors.name}
                {...register('name', { required: 'REQUIRED_FIELD' })}
              />
              {errors.name && <FormError message={errors.name.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
            </FormItem>

            <FormItem className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-500 px-1 flex items-center gap-2">
                <span className={cn("w-1 h-1 transition-colors", dirtyFields.email ? "bg-red-600" : "bg-zinc-800")} /> Comm Channel
              </label>
              <ClippedInput
                id="email"
                type="email"
                placeholder="EMAIL_ADDR"
                error={!!errors.email}
                valid={!!dirtyFields.email && !errors.email}
                {...register('email', { required: 'REQUIRED_FIELD' })}
              />
              {errors.email && <FormError message={errors.email.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
            </FormItem>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <FormItem className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-500 px-1 flex items-center gap-2">
                <span className={cn("w-1 h-1 transition-colors", dirtyFields.password ? "bg-red-600" : "bg-zinc-800")} /> New Secret Key
              </label>
              <ClippedInput
                id="password"
                type="password"
                placeholder="••••••••"
                error={!!errors.password}
                valid={!!dirtyFields.password && !errors.password}
                {...register('password', { required: 'REQUIRED_FIELD' })}
              />
              {errors.password && <FormError message={errors.password.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
            </FormItem>

            <FormItem className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-500 px-1 flex items-center gap-2">
                <span className={cn("w-1 h-1 transition-colors", dirtyFields.passwordConfirm ? "bg-red-600" : "bg-zinc-800")} /> Verify Key
              </label>
              <ClippedInput
                id="passwordConfirm"
                type="password"
                placeholder="••••••••"
                error={!!errors.passwordConfirm}
                valid={!!dirtyFields.passwordConfirm && !errors.passwordConfirm}
                {...register('passwordConfirm', {
                  required: 'REQUIRED_FIELD',
                  validate: (value) => value === password.current || 'MISMATCH_DETECTED',
                })}
              />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
            </FormItem>
          </div>
        )}

        <div className="pt-12 flex items-center justify-between border-t border-zinc-900">
          <div className="flex items-center gap-6">
            <div className={cn("h-1 w-12 transition-all duration-500", isDirty ? "bg-red-600 animate-pulse shadow-[0_0_12px_rgba(220,38,38,0.5)]" : "bg-zinc-800")} />
            <div className="flex flex-col">
              <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest leading-none mb-1">Database Buffer</span>
              <div className="flex items-center gap-2">
                <span className={cn("text-[9px] font-black uppercase tracking-[0.3em] transition-colors", isDirty ? "text-red-500" : "text-zinc-600")}>
                  {isDirty ? 'UNCOMMITTED_CHANGES' : 'LOCAL_SYNC_STABLE'}
                </span>
                {isDirty && <AlertCircle className="h-2.5 w-2.5 text-red-500 animate-pulse" />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting || !isDirty}
            className={cn(
              "group relative h-14 px-20 overflow-hidden transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed",
              isDirty ? "bg-white text-black" : "bg-zinc-900 text-zinc-500"
            )}
            style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
          >
            <div className="absolute inset-0 bg-red-600 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em] italic flex items-center gap-4 group-hover:text-white transition-colors">
              {isLoading || isSubmitting ? 'UPLOADING...' : 'COMMIT_IDENTITY'} <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}