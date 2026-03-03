'use client'

import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
import { ChevronRight } from 'lucide-react'
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
    formState: { errors, isLoading, isSubmitting, isDirty },
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
      <div className="flex gap-1 mb-12">
        <button
          onClick={() => setChangePassword(false)}
          className={cn(
            "px-8 py-4 text-[10px] font-black uppercase tracking-[0.4em] transition-all",
            !changePassword ? "bg-red-600 text-white" : "bg-zinc-900 text-zinc-500 hover:text-white"
          )}
        >
          01. Identity
        </button>
        <button
          onClick={() => setChangePassword(true)}
          className={cn(
            "px-8 py-4 text-[10px] font-black uppercase tracking-[0.4em] transition-all",
            changePassword ? "bg-red-600 text-white" : "bg-zinc-900 text-zinc-500 hover:text-white"
          )}
        >
          02. Security
        </button>
      </div>

      <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
        {!changePassword ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <FormItem className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-600 px-1">Pilot Designation</label>
              <ClippedInput
                id="name"
                placeholder="NAME"
                {...register('name', { required: 'Required' })}
              />
              {errors.name && <FormError message={errors.name.message} className="text-red-600 text-[9px] font-bold uppercase tracking-[0.2em] mt-2 px-1" />}
            </FormItem>

            <FormItem className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-600 px-1">Comm Channel</label>
              <ClippedInput
                id="email"
                type="email"
                placeholder="EMAIL"
                {...register('email', { required: 'Required' })}
              />
              {errors.email && <FormError message={errors.email.message} className="text-red-600 text-[9px] font-bold uppercase tracking-[0.2em] mt-2 px-1" />}
            </FormItem>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <FormItem className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-600 px-1">New Secret Key</label>
              <ClippedInput
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', { required: 'Required' })}
              />
              {errors.password && <FormError message={errors.password.message} className="text-red-600 text-[9px] font-bold uppercase tracking-[0.2em] mt-2 px-1" />}
            </FormItem>

            <FormItem className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-600 px-1">Verify Key</label>
              <ClippedInput
                id="passwordConfirm"
                type="password"
                placeholder="••••••••"
                {...register('passwordConfirm', {
                  required: 'Required',
                  validate: (value) => value === password.current || 'Mismatch',
                })}
              />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} className="text-red-600 text-[9px] font-bold uppercase tracking-[0.2em] mt-2 px-1" />}
            </FormItem>
          </div>
        )}

        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-zinc-900">
          <div className="flex items-center gap-6">
            <div className={cn("h-1 w-12", isDirty ? "bg-red-600 animate-pulse" : "bg-zinc-800")} />
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest leading-none mb-1">Status</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                {isDirty ? 'Pending Changes' : 'Data Verified'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting || !isDirty}
            className="group relative w-full md:w-auto h-14 px-16 bg-white text-black overflow-hidden transition-all active:scale-95 disabled:opacity-5"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
          >
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] italic flex items-center justify-center gap-3 group-hover:text-white transition-colors">
              {isLoading || isSubmitting ? 'Syncing...' : 'Sync Profile'} <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}