'use client'

import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import {
  ClippedSelect,
  ClippedSelectContent,
  ClippedSelectItem,
  ClippedSelectTrigger,
  ClippedSelectValue,
} from '@/components/Custom/ui/ClippedSelect'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Address, Config } from '@/payload-types'
import {
  defaultCountries as supportedCountries,
  useAddresses,
} from '@payloadcms/plugin-ecommerce/client/react'
import { ChevronRight, Cpu } from 'lucide-react'
import { deepMergeSimple } from 'payload/shared'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { titles } from './constants'

type AddressFormValues = {
  title?: string | null
  firstName?: string | null
  lastName?: string | null
  company?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  country?: string | null
  phone?: string | null
}

type Props = {
  addressID?: Config['db']['defaultIDType']
  initialData?: Omit<Address, 'country' | 'id' | 'updatedAt' | 'createdAt'> & { country?: string }
  callback?: (data: Partial<Address>) => void
  skipSubmission?: boolean
}

export const AddressForm: React.FC<Props> = ({
  addressID,
  initialData,
  callback,
  skipSubmission,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, dirtyFields },
    setValue,
    watch,
  } = useForm<AddressFormValues>({
    defaultValues: initialData,
  })

  const { createAddress, updateAddress } = useAddresses()
  const watchAllFields = watch()

  const onSubmit = useCallback(
    async (data: AddressFormValues) => {
      const newData = deepMergeSimple(initialData || {}, data)

      if (!skipSubmission) {
        if (addressID) {
          await updateAddress(addressID, newData)
        } else {
          await createAddress(newData)
        }
      }

      if (callback) {
        callback(newData)
      }
    },
    [initialData, skipSubmission, callback, addressID, updateAddress, createAddress],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-600" /> Title
          </label>
          <ClippedSelect
            onValueChange={(value) => setValue('title', value, { shouldDirty: true, shouldValidate: true })}
            defaultValue={initialData?.title || ''}
          >
            <ClippedSelectTrigger
              id="title"
              error={!!errors.title}
              valid={!!dirtyFields.title && !errors.title}
              filled={!!watchAllFields.title}
              className="max-w-full"
            >
              <ClippedSelectValue placeholder="DESIGNATION" />
            </ClippedSelectTrigger>
            <ClippedSelectContent>
              {titles.map((title) => (
                <ClippedSelectItem key={title} value={title}>
                  {title}
                </ClippedSelectItem>
              ))}
            </ClippedSelectContent>
          </ClippedSelect>
          {errors.title && <FormError message={errors.title.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-600" /> First Name*
          </label>
          <ClippedInput
            id="firstName"
            autoComplete="given-name"
            placeholder="ALPHA_NAME"
            error={!!errors.firstName}
            valid={!!dirtyFields.firstName && !errors.firstName}
            {...register('firstName', { required: 'REQUIRED_FIELD' })}
          />
          {errors.firstName && <FormError message={errors.firstName.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-600" /> Last Name*
          </label>
          <ClippedInput
            id="lastName"
            autoComplete="family-name"
            placeholder="OMEGA_NAME"
            error={!!errors.lastName}
            valid={!!dirtyFields.lastName && !errors.lastName}
            {...register('lastName', { required: 'REQUIRED_FIELD' })}
          />
          {errors.lastName && <FormError message={errors.lastName.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
        </FormItem>

        <FormItem className="md:col-span-6 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-zinc-800" /> Comm Link (Phone)
          </label>
          <ClippedInput
            type="tel"
            id="phone"
            autoComplete="tel"
            placeholder="+00 000 000 000"
            error={!!errors.phone}
            valid={!!dirtyFields.phone && !errors.phone}
            {...register('phone')}
          />
        </FormItem>

        <FormItem className="md:col-span-6 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-zinc-800" /> Organization
          </label>
          <ClippedInput
            id="company"
            autoComplete="organization"
            placeholder="CORP_ENTITY"
            error={!!errors.company}
            valid={!!dirtyFields.company && !errors.company}
            {...register('company')}
          />
        </FormItem>

        <FormItem className="md:col-span-8 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-600" /> Primary Vector*
          </label>
          <ClippedInput
            id="addressLine1"
            autoComplete="address-line1"
            placeholder="STREET_DATA"
            error={!!errors.addressLine1}
            valid={!!dirtyFields.addressLine1 && !errors.addressLine1}
            {...register('addressLine1', { required: 'REQUIRED_FIELD' })}
          />
          {errors.addressLine1 && <FormError message={errors.addressLine1.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-zinc-800" /> Secondary Vector
          </label>
          <ClippedInput
            id="addressLine2"
            autoComplete="address-line2"
            placeholder="UNIT_SUITE"
            error={!!errors.addressLine2}
            valid={!!dirtyFields.addressLine2 && !errors.addressLine2}
            {...register('addressLine2')}
          />
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-600" /> Node / City*
          </label>
          <ClippedInput
            id="city"
            autoComplete="address-level2"
            placeholder="CITY_LOCAL"
            error={!!errors.city}
            valid={!!dirtyFields.city && !errors.city}
            {...register('city', { required: 'REQUIRED_FIELD' })}
          />
          {errors.city && <FormError message={errors.city.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-zinc-800" /> Sector / State
          </label>
          <ClippedInput
            id="state"
            autoComplete="address-level1"
            placeholder="STATE_REGION"
            error={!!errors.state}
            valid={!!dirtyFields.state && !errors.state}
            {...register('state')}
          />
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-600" /> Postal Index*
          </label>
          <ClippedInput
            id="postalCode"
            placeholder="ZIP_CODE"
            error={!!errors.postalCode}
            valid={!!dirtyFields.postalCode && !errors.postalCode}
            {...register('postalCode', { required: 'REQUIRED_FIELD' })}
          />
          {errors.postalCode && <FormError message={errors.postalCode.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
        </FormItem>

        <FormItem className="md:col-span-12 space-y-3">
          <label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-700 px-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-600" /> Geopolitical Zone*
          </label>
          <ClippedSelect
            onValueChange={(value) => setValue('country', value, { shouldDirty: true, shouldValidate: true })}
            defaultValue={initialData?.country || ''}
          >
            <ClippedSelectTrigger
              id="country"
              error={!!errors.country}
              valid={!!dirtyFields.country && !errors.country}
              filled={!!watchAllFields.country}
              className="max-w-full"
            >
              <ClippedSelectValue placeholder="SELECT_COUNTRY_ORIGIN" />
            </ClippedSelectTrigger>
            <ClippedSelectContent className="max-h-[300px]">
              {supportedCountries.map((country) => {
                const value = typeof country === 'string' ? country : country.value
                const label = typeof country === 'string' ? country : (typeof country.label === 'string' ? country.label : value)
                return (
                  <ClippedSelectItem key={value} value={value}>
                    {label}
                  </ClippedSelectItem>
                )
              })}
            </ClippedSelectContent>
          </ClippedSelect>
          {errors.country && <FormError message={errors.country.message} className="px-1 text-red-600 text-[8px] uppercase font-bold mt-2 italic" />}
        </FormItem>
      </div>

      <div className="pt-12 flex items-center justify-between border-t border-zinc-900/50">
        <div className="hidden md:flex items-center gap-4 text-zinc-800">
          <Cpu className="h-4 w-4" />
          <span className="text-[8px] font-bold uppercase tracking-widest italic">Encrypted Registry Protocol v2.0</span>
        </div>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="group relative h-14 px-20 bg-zinc-900 text-white overflow-hidden transition-all active:scale-95 disabled:opacity-20"
          style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
        >
          <div className="absolute inset-0 bg-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em] italic flex items-center gap-4 group-hover:text-white transition-colors">
            {isSubmitting ? 'UPLOADING...' : 'COMMIT_COORDINATES'} <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </form>
  )
}