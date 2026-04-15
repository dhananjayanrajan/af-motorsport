'use client'

import { ClippedInput } from '@/components/Clipped/ClippedInput'
import {
  ClippedSelect,
  ClippedSelectContent,
  ClippedSelectItem,
  ClippedSelectTrigger,
  ClippedSelectValue,
} from '@/components/Clipped/ClippedSelect'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Address, Config } from '@/payload-types'
import {
  defaultCountries as supportedCountries,
  useAddresses,
} from '@payloadcms/plugin-ecommerce/client/react'
import { ChevronRight } from 'lucide-react'
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
    formState: { errors, isSubmitting, isLoading },
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

  const labelClasses = "text-[11px] font-black uppercase italic text-black flex items-center gap-2 mb-2"
  const inputClasses = "bg-white border-zinc-300 h-14 px-5 text-black placeholder:text-zinc-500 focus:border-black focus:ring-0 transition-all rounded-none w-full"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">

        <FormItem className="md:col-span-4 space-y-1">
          <label className={labelClasses}>Title</label>
          <ClippedSelect
            onValueChange={(value) => setValue('title', value, { shouldDirty: true, shouldValidate: true })}
            defaultValue={initialData?.title || ''}
          >
            <ClippedSelectTrigger
              id="title"
              className={inputClasses}
            >
              <ClippedSelectValue placeholder="Select Title" />
            </ClippedSelectTrigger>
            <ClippedSelectContent>
              {titles.map((title) => (
                <ClippedSelectItem key={title} value={title}>
                  {title}
                </ClippedSelectItem>
              ))}
            </ClippedSelectContent>
          </ClippedSelect>
          {errors.title && <FormError message={errors.title.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <label className={labelClasses}>First Name*</label>
          <ClippedInput
            id="firstName"
            autoComplete="given-name"
            placeholder="e.g. John"
            className={inputClasses}
            {...register('firstName', { required: 'Required' })}
          />
          {errors.firstName && <FormError message={errors.firstName.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <label className={labelClasses}>Last Name*</label>
          <ClippedInput
            id="lastName"
            autoComplete="family-name"
            placeholder="e.g. Doe"
            className={inputClasses}
            {...register('lastName', { required: 'Required' })}
          />
          {errors.lastName && <FormError message={errors.lastName.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>

        <FormItem className="md:col-span-6 space-y-1">
          <label className={labelClasses}>Phone Number</label>
          <ClippedInput
            type="tel"
            id="phone"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            className={inputClasses}
            {...register('phone')}
          />
        </FormItem>

        <FormItem className="md:col-span-6 space-y-1">
          <label className={labelClasses}>Company</label>
          <ClippedInput
            id="company"
            autoComplete="organization"
            placeholder="Company Name (Optional)"
            className={inputClasses}
            {...register('company')}
          />
        </FormItem>

        <FormItem className="md:col-span-8 space-y-1">
          <label className={labelClasses}>Address Line 1*</label>
          <ClippedInput
            id="addressLine1"
            autoComplete="address-line1"
            placeholder="123 Motorsport Way"
            className={inputClasses}
            {...register('addressLine1', { required: 'Required' })}
          />
          {errors.addressLine1 && <FormError message={errors.addressLine1.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <label className={labelClasses}>Address Line 2</label>
          <ClippedInput
            id="addressLine2"
            autoComplete="address-line2"
            placeholder="Suite, Floor, etc."
            className={inputClasses}
            {...register('addressLine2')}
          />
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <label className={labelClasses}>City*</label>
          <ClippedInput
            id="city"
            autoComplete="address-level2"
            placeholder="City"
            className={inputClasses}
            {...register('city', { required: 'Required' })}
          />
          {errors.city && <FormError message={errors.city.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <label className={labelClasses}>State / Province</label>
          <ClippedInput
            id="state"
            autoComplete="address-level1"
            placeholder="State"
            className={inputClasses}
            {...register('state')}
          />
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <label className={labelClasses}>Zip / Postal Code*</label>
          <ClippedInput
            id="postalCode"
            placeholder="Postal Code"
            className={inputClasses}
            {...register('postalCode', { required: 'Required' })}
          />
          {errors.postalCode && <FormError message={errors.postalCode.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>

        <FormItem className="md:col-span-12 space-y-1">
          <label className={labelClasses}>Country*</label>
          <ClippedSelect
            onValueChange={(value) => setValue('country', value, { shouldDirty: true, shouldValidate: true })}
            defaultValue={initialData?.country || ''}
          >
            <ClippedSelectTrigger
              id="country"
              className={inputClasses}
            >
              <ClippedSelectValue placeholder="Select Country" />
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
          {errors.country && <FormError message={errors.country.message} className="text-[10px] font-bold text-red-600 mt-1 uppercase" />}
        </FormItem>
      </div>

      <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-200">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          * Required Information
        </p>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="group relative h-16 w-full md:w-auto md:px-20 bg-black text-white transition-all active:scale-[0.98] disabled:opacity-50 overflow-hidden"
        >
          <div
            className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          />
          <span className="relative z-10 text-[12px] font-black uppercase italic flex items-center justify-center gap-3 group-hover:text-black transition-colors">
            {isSubmitting ? 'Saving...' : 'Save Address'} <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </form>
  )
}