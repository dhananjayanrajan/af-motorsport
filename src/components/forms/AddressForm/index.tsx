'use client'
import { ClippedInput } from '@/components/Custom/ui/ClippedInput'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Address, Config } from '@/payload-types'
import { defaultCountries as supportedCountries, useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { ChevronRight } from 'lucide-react'
import { deepMergeSimple } from 'payload/shared'
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
  } = useForm<AddressFormValues>({
    defaultValues: initialData,
  })

  const { createAddress, updateAddress } = useAddresses()

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
        <FormItem className="md:col-span-2 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">Title</label>
          <Select
            onValueChange={(value) => setValue('title', value, { shouldValidate: true })}
            defaultValue={initialData?.title || ''}
          >
            <SelectTrigger id="title" className="h-12 bg-zinc-950 border-zinc-800 rounded-none focus:ring-0 focus:ring-offset-0 text-[11px] uppercase tracking-widest">
              <SelectValue placeholder="TITLE" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-800 rounded-none text-white">
              {titles.map((title) => (
                <SelectItem key={title} value={title} className="focus:bg-red-600 focus:text-white uppercase text-[10px] tracking-widest">
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.title && <FormError message={errors.title.message} className="px-1 text-red-600 text-[9px] uppercase font-bold mt-2" />}
        </FormItem>

        <FormItem className="md:col-span-5 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">First Name*</label>
          <ClippedInput
            id="firstName"
            autoComplete="given-name"
            placeholder="FIRST NAME"
            {...register('firstName', { required: 'Required' })}
          />
          {errors.firstName && <FormError message={errors.firstName.message} className="px-1 text-red-600 text-[9px] uppercase font-bold mt-2" />}
        </FormItem>

        <FormItem className="md:col-span-5 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">Last Name*</label>
          <ClippedInput
            id="lastName"
            autoComplete="family-name"
            placeholder="LAST NAME"
            {...register('lastName', { required: 'Required' })}
          />
          {errors.lastName && <FormError message={errors.lastName.message} className="px-1 text-red-600 text-[9px] uppercase font-bold mt-2" />}
        </FormItem>

        <FormItem className="md:col-span-6 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">Comm Link (Phone)</label>
          <ClippedInput type="tel" id="phone" autoComplete="tel" placeholder="PHONE" {...register('phone')} />
        </FormItem>

        <FormItem className="md:col-span-6 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">Company</label>
          <ClippedInput id="company" autoComplete="organization" placeholder="COMPANY (OPTIONAL)" {...register('company')} />
        </FormItem>

        <FormItem className="md:col-span-8 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">Address Line 1*</label>
          <ClippedInput
            id="addressLine1"
            autoComplete="address-line1"
            placeholder="STREET ADDRESS"
            {...register('addressLine1', { required: 'Required' })}
          />
          {errors.addressLine1 && <FormError message={errors.addressLine1.message} className="px-1 text-red-600 text-[9px] uppercase font-bold mt-2" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">Address Line 2</label>
          <ClippedInput id="addressLine2" autoComplete="address-line2" placeholder="SUITE / APT" {...register('addressLine2')} />
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">City*</label>
          <ClippedInput
            id="city"
            autoComplete="address-level2"
            placeholder="CITY"
            {...register('city', { required: 'Required' })}
          />
          {errors.city && <FormError message={errors.city.message} className="px-1 text-red-600 text-[9px] uppercase font-bold mt-2" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">State / Province</label>
          <ClippedInput id="state" autoComplete="address-level1" placeholder="STATE" {...register('state')} />
        </FormItem>

        <FormItem className="md:col-span-4 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">Zip Code*</label>
          <ClippedInput
            id="postalCode"
            placeholder="POSTAL CODE"
            {...register('postalCode', { required: 'Required' })}
          />
          {errors.postalCode && <FormError message={errors.postalCode.message} className="px-1 text-red-600 text-[9px] uppercase font-bold mt-2" />}
        </FormItem>

        <FormItem className="md:col-span-12 space-y-3">
          <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-600 px-1">Country*</label>
          <Select
            onValueChange={(value) => setValue('country', value, { shouldValidate: true })}
            defaultValue={initialData?.country || ''}
          >
            <SelectTrigger id="country" className="h-12 bg-zinc-950 border-zinc-800 rounded-none focus:ring-0 focus:ring-offset-0 text-[11px] uppercase tracking-widest">
              <SelectValue placeholder="SELECT COUNTRY" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-800 rounded-none text-white max-h-80">
              {supportedCountries.map((country) => {
                const value = typeof country === 'string' ? country : country.value
                const label = typeof country === 'string' ? country : (typeof country.label === 'string' ? country.label : value)
                return (
                  <SelectItem key={value} value={value} className="focus:bg-red-600 focus:text-white uppercase text-[10px] tracking-widest">
                    {label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          {errors.country && <FormError message={errors.country.message} className="px-1 text-red-600 text-[9px] uppercase font-bold mt-2" />}
        </FormItem>
      </div>

      <div className="pt-10 flex justify-end">
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="group relative h-14 px-16 bg-white text-black overflow-hidden transition-all active:scale-95 disabled:opacity-5"
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
        >
          <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] italic flex items-center gap-3 group-hover:text-white transition-colors">
            {isSubmitting ? 'Syncing...' : 'Save Coordinate'} <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </form>
  )
}