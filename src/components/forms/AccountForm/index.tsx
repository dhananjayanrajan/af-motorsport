'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { cn } from '@/utilities/cn'
import { ChevronRight, Lock, User as UserIcon } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')
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
          toast.success('Account updated successfully')
          setActiveTab('profile')
          reset({
            name: json.doc.name,
            email: json.doc.email,
            password: '',
            passwordConfirm: '',
          })
        } else {
          toast.error('Failed to update account')
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

  const labelClasses = "text-[11px] font-black uppercase italic text-black flex items-center gap-2 mb-2"
  const inputClasses = "bg-white border-zinc-200 h-14 px-5 text-black placeholder:text-zinc-400 focus:border-black focus:ring-0 transition-all rounded-none w-full"

  return (
    <div className="w-full">
      <div className="flex border-b border-zinc-100 mb-16">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={cn(
            "px-10 py-5 text-[11px] font-black uppercase italic transition-all relative flex items-center gap-3",
            activeTab === 'profile' ? "text-black border-b-2 border-black" : "text-zinc-300 hover:text-zinc-500"
          )}
        >
          <UserIcon className="size-4" /> Profile Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={cn(
            "px-10 py-5 text-[11px] font-black uppercase italic transition-all relative flex items-center gap-3",
            activeTab === 'security' ? "text-black border-b-2 border-black" : "text-zinc-300 hover:text-zinc-500"
          )}
        >
          <Lock className="size-4" /> Security
        </button>
      </div>

      <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <FormItem className="space-y-1">
              <label className={labelClasses}>Full Name</label>
              <ClippedInput
                id="name"
                placeholder="Enter your name"
                className={inputClasses}
                {...register('name', { required: 'Required' })}
              />
              {errors.name && <FormError message={errors.name.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
            </FormItem>

            <FormItem className="space-y-1">
              <label className={labelClasses}>Email Address</label>
              <ClippedInput
                id="email"
                type="email"
                placeholder="email@example.com"
                className={inputClasses}
                {...register('email', { required: 'Required' })}
              />
              {errors.email && <FormError message={errors.email.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
            </FormItem>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <FormItem className="space-y-1">
              <label className={labelClasses}>New Password</label>
              <ClippedInput
                id="password"
                type="password"
                placeholder="••••••••"
                className={inputClasses}
                {...register('password', { required: 'Required' })}
              />
              {errors.password && <FormError message={errors.password.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
            </FormItem>

            <FormItem className="space-y-1">
              <label className={labelClasses}>Confirm New Password</label>
              <ClippedInput
                id="passwordConfirm"
                type="password"
                placeholder="••••••••"
                className={inputClasses}
                {...register('passwordConfirm', {
                  required: 'Required',
                  validate: (value) => value === password.current || 'Passwords do not match',
                })}
              />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
            </FormItem>
          </div>
        )}

        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-zinc-100">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className={cn("size-2 rounded-full", isDirty ? "bg-orange-500 animate-pulse" : "bg-zinc-200")} />
                <span className="text-[10px] font-black uppercase italic tracking-widest text-zinc-400">
                  {isDirty ? 'Unsaved changes detected' : 'Account in sync'}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting || !isDirty}
            className="group relative h-16 w-full md:w-auto md:px-20 bg-black text-white transition-all active:scale-[0.98] disabled:opacity-10 overflow-hidden"
          >
            <div
              className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
            />
            <span className="relative z-10 text-[12px] font-black uppercase italic flex items-center justify-center gap-4 group-hover:text-black transition-colors">
              {isLoading || isSubmitting ? 'Saving...' : 'Update Settings'} <ChevronRight className="size-4" />
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}