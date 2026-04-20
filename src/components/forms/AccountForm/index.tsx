'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
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

type Props = {
  infoTabLabel?: string
  passwordTabLabel?: string
  nameLabel?: string
  namePlaceholder?: string
  emailLabel?: string
  emailPlaceholder?: string
  newPasswordLabel?: string
  passwordPlaceholder?: string
  confirmPasswordLabel?: string
  savedLabel?: string
  unsavedLabel?: string
  saveButtonLabel?: string
  savingLabel?: string
  updateSuccessMessage?: string
  updateErrorMessage?: string
  requiredErrorMessage?: string
  passwordMismatchMessage?: string
}

export const AccountForm: React.FC<Props> = ({
  infoTabLabel = "INFO",
  passwordTabLabel = "PASSWORD",
  nameLabel = "NAME",
  namePlaceholder = "YOUR NAME",
  emailLabel = "EMAIL",
  emailPlaceholder = "YOUR EMAIL",
  newPasswordLabel = "NEW PASSWORD",
  passwordPlaceholder = "••••••••",
  confirmPasswordLabel = "REPEAT PASSWORD",
  savedLabel = "SAVED",
  unsavedLabel = "UNSAVED",
  saveButtonLabel = "SAVE CHANGES",
  savingLabel = "SAVING",
  updateSuccessMessage = "PROFILE UPDATED",
  updateErrorMessage = "SAVE FAILED",
  requiredErrorMessage = "REQUIRED",
  passwordMismatchMessage = "NOT THE SAME",
}) => {
  const { setUser, user } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')
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
          toast.success(updateSuccessMessage)
          setActiveTab('profile')
          reset({
            name: json.doc.name,
            email: json.doc.email,
            password: '',
            passwordConfirm: '',
          })
        } else {
          toast.error(updateErrorMessage)
        }
      }
    },
    [user, setUser, reset, updateSuccessMessage, updateErrorMessage],
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

  const labelClasses = "text-xs font-black uppercase text-black-pure flex items-center gap-3 mb-3"
  const inputClasses = "bg-white-pure border-2 border-black-pure h-14 sm:h-16 px-4 sm:px-6 text-black-pure placeholder:text-black-pure/30 focus:bg-primary-500 transition-colors duration-300 rounded-none w-full font-black uppercase text-sm"

  return (
    <div className="w-full">
      <div className="flex border-b-4 border-black-pure mb-20">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={cn(
            "flex-1 md:flex-none px-12 py-6 text-xs font-black uppercase transition-all relative flex items-center justify-center gap-4",
            activeTab === 'profile' ? "bg-black-pure text-white-pure" : "bg-white-pure text-black-pure hover:bg-black-pure hover:text-white-pure"
          )}
        >
          <UserIcon className="size-4" /> {infoTabLabel}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={cn(
            "flex-1 md:flex-none px-12 py-6 text-xs font-black uppercase transition-all relative flex items-center justify-center gap-4",
            activeTab === 'security' ? "bg-black-pure text-white-pure" : "bg-white-pure text-black-pure hover:bg-black-pure hover:text-white-pure"
          )}
        >
          <Lock className="size-4" /> {passwordTabLabel}
        </button>
      </div>

      <form className="space-y-20" onSubmit={handleSubmit(onSubmit)}>
        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <FormItem className="space-y-1">
              <label className={labelClasses}>{nameLabel}</label>
              <ClippedInput
                label={nameLabel}
                id="name"
                placeholder={namePlaceholder}
                className={inputClasses}
                {...register('name', { required: requiredErrorMessage })}
              />
              {errors.name && <FormError message={errors.name.message} className="text-xs font-black text-error mt-2 uppercase" />}
            </FormItem>

            <FormItem className="space-y-1">
              <label className={labelClasses}>{emailLabel}</label>
              <ClippedInput
                label={nameLabel}
                id="email"
                type="email"
                placeholder={emailPlaceholder}
                className={inputClasses}
                {...register('email', { required: requiredErrorMessage })}
              />
              {errors.email && <FormError message={errors.email.message} className="text-xs font-black text-error mt-2 uppercase" />}
            </FormItem>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <FormItem className="space-y-1">
              <label className={labelClasses}>{newPasswordLabel}</label>
              <ClippedInput
                label={nameLabel}
                id="password"
                type="password"
                placeholder={passwordPlaceholder}
                className={inputClasses}
                {...register('password', { required: requiredErrorMessage })}
              />
              {errors.password && <FormError message={errors.password.message} className="text-xs font-black text-error mt-2 uppercase" />}
            </FormItem>

            <FormItem className="space-y-1">
              <label className={labelClasses}>{confirmPasswordLabel}</label>
              <ClippedInput
                label={nameLabel}
                id="passwordConfirm"
                type="password"
                placeholder={passwordPlaceholder}
                className={inputClasses}
                {...register('passwordConfirm', {
                  required: requiredErrorMessage,
                  validate: (value) => value === password.current || passwordMismatchMessage,
                })}
              />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} className="text-xs font-black text-error mt-2 uppercase" />}
            </FormItem>
          </div>
        )}

        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-10 border-t-4 border-black-pure">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-2 border-black-pure px-6 py-3">
              <div className={cn("size-3", isDirty ? "bg-secondary-500 animate-pulse" : "bg-primary-500")} />
              <span className="text-xs font-black uppercase text-black-pure">
                {isDirty ? unsavedLabel : savedLabel}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting || !isDirty}
            className="group relative h-20 w-full md:w-auto md:px-24 bg-black-pure text-white-pure disabled:opacity-50 disabled:pointer-events-none overflow-hidden transition-all duration-300"
          >
            <div
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-primary-500"
            />
            <span className="relative z-10 text-sm font-black uppercase flex items-center justify-center gap-4 group-hover:text-black-pure transition-colors duration-500">
              {isLoading || isSubmitting ? savingLabel : saveButtonLabel} <ChevronRight className="size-5" />
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}