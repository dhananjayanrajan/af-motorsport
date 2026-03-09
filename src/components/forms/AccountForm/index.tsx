'use client'

import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
            "px-10 py-4 text-[9px] font-black uppercase transition-all relative overflow-hidden",
            DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT,
            DESIGN_SYSTEM.ANIMATION.DURATION_BASE,
            !changePassword ? "text-black" : "bg-zinc-900 text-zinc-600 hover:text-zinc-400"
          )}
          style={{
            clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP,
            backgroundColor: !changePassword ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined,
            boxShadow: !changePassword ? `0 0 20px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` : 'none'
          }}
        >
          01. Identity
        </button>
        <button
          type="button"
          onClick={() => setChangePassword(true)}
          className={cn(
            "px-10 py-4 text-[9px] font-black uppercase transition-all relative overflow-hidden",
            DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT,
            DESIGN_SYSTEM.ANIMATION.DURATION_BASE,
            changePassword ? "text-black" : "bg-zinc-900 text-zinc-600 hover:text-zinc-400"
          )}
          style={{
            clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP,
            backgroundColor: changePassword ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined,
            boxShadow: changePassword ? `0 0 20px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` : 'none'
          }}
        >
          02. Security
        </button>
      </div>

      <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
        {!changePassword ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <FormItem className="space-y-3">
              <label className={cn("text-[9px] uppercase font-black text-zinc-500 px-1 flex items-center gap-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
                <span
                  className={cn("w-1 h-1 transition-colors", DESIGN_SYSTEM.ANIMATION.DURATION_BASE, dirtyFields.name ? "" : "bg-zinc-800")}
                  style={{ backgroundColor: dirtyFields.name ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined }}
                /> Pilot Designation
              </label>
              <ClippedInput
                id="name"
                placeholder="PILOT_ID"
                error={!!errors.name}
                valid={!!dirtyFields.name && !errors.name}
                {...register('name', { required: 'REQUIRED_FIELD' })}
              />
              {errors.name && (
                <FormError
                  message={errors.name.message}
                  className={cn("px-1 text-[8px] uppercase font-bold mt-2 italic", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
                />
              )}
            </FormItem>

            <FormItem className="space-y-3">
              <label className={cn("text-[9px] uppercase font-black text-zinc-500 px-1 flex items-center gap-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
                <span
                  className={cn("w-1 h-1 transition-colors", DESIGN_SYSTEM.ANIMATION.DURATION_BASE, dirtyFields.email ? "" : "bg-zinc-800")}
                  style={{ backgroundColor: dirtyFields.email ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined }}
                /> Comm Channel
              </label>
              <ClippedInput
                id="email"
                type="email"
                placeholder="EMAIL_ADDR"
                error={!!errors.email}
                valid={!!dirtyFields.email && !errors.email}
                {...register('email', { required: 'REQUIRED_FIELD' })}
              />
              {errors.email && (
                <FormError
                  message={errors.email.message}
                  className={cn("px-1 text-[8px] uppercase font-bold mt-2 italic", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
                />
              )}
            </FormItem>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <FormItem className="space-y-3">
              <label className={cn("text-[9px] uppercase font-black text-zinc-500 px-1 flex items-center gap-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
                <span
                  className={cn("w-1 h-1 transition-colors", DESIGN_SYSTEM.ANIMATION.DURATION_BASE, dirtyFields.password ? "" : "bg-zinc-800")}
                  style={{ backgroundColor: dirtyFields.password ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined }}
                /> New Secret Key
              </label>
              <ClippedInput
                id="password"
                type="password"
                placeholder="••••••••"
                error={!!errors.password}
                valid={!!dirtyFields.password && !errors.password}
                {...register('password', { required: 'REQUIRED_FIELD' })}
              />
              {errors.password && (
                <FormError
                  message={errors.password.message}
                  className={cn("px-1 text-[8px] uppercase font-bold mt-2 italic", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
                />
              )}
            </FormItem>

            <FormItem className="space-y-3">
              <label className={cn("text-[9px] uppercase font-black text-zinc-500 px-1 flex items-center gap-2", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}>
                <span
                  className={cn("w-1 h-1 transition-colors", DESIGN_SYSTEM.ANIMATION.DURATION_BASE, dirtyFields.passwordConfirm ? "" : "bg-zinc-800")}
                  style={{ backgroundColor: dirtyFields.passwordConfirm ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined }}
                /> Verify Key
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
              {errors.passwordConfirm && (
                <FormError
                  message={errors.passwordConfirm.message}
                  className={cn("px-1 text-[8px] uppercase font-bold mt-2 italic", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}
                />
              )}
            </FormItem>
          </div>
        )}

        <div className="pt-12 flex items-center justify-between border-t border-zinc-900">
          <div className="flex items-center gap-6">
            <div
              className={cn("h-1 w-12 transition-all", DESIGN_SYSTEM.ANIMATION.DURATION_GLOW, isDirty ? "animate-pulse" : "bg-zinc-800")}
              style={{
                backgroundColor: isDirty ? DESIGN_SYSTEM.COLORS.PRIMARY : undefined,
                boxShadow: isDirty ? `0 0 12px ${DESIGN_SYSTEM.COLORS.PRIMARY_GLOW}` : 'none'
              }}
            />
            <div className="flex flex-col">
              <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-widest leading-none mb-1">Database Buffer</span>
              <div className="flex items-center gap-2">
                <span
                  className={cn("text-[9px] font-black uppercase transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT)}
                  style={{ color: isDirty ? DESIGN_SYSTEM.COLORS.PRIMARY : DESIGN_SYSTEM.COLORS.NEUTRAL_600 }}
                >
                  {isDirty ? 'UNCOMMITTED_CHANGES' : 'LOCAL_SYNC_STABLE'}
                </span>
                {isDirty && <AlertCircle className="h-2.5 w-2.5 animate-pulse" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting || !isDirty}
            className={cn(
              "group relative h-14 px-20 overflow-hidden transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed",
              DESIGN_SYSTEM.ANIMATION.DURATION_BASE,
              isDirty ? "bg-white text-black" : "bg-zinc-900 text-zinc-500"
            )}
            style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
          >
            <div
              className={cn("absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform", DESIGN_SYSTEM.ANIMATION.DURATION_SLOW)}
              style={{
                backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY,
                transitionTimingFunction: DESIGN_SYSTEM.ANIMATION.EASING_CUBIC
              }}
            />
            <span className={cn("relative z-10 text-[10px] font-black uppercase italic flex items-center gap-4 group-hover:text-black transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
              {isLoading || isSubmitting ? 'UPLOADING...' : 'COMMIT_IDENTITY'} <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}