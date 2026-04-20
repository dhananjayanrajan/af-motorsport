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

  const inputClasses = "bg-white-pure border-2 border-black-pure h-16 px-6 text-black-pure placeholder:text-black-pure/30 focus:bg-white-pure transition-colors duration-300 rounded-none w-full font-black uppercase text-sm tracking-tight"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">

        <FormItem className="md:col-span-4 space-y-1">
          <ClippedSelect
            onValueChange={(value) => setValue('title', value, { shouldDirty: true, shouldValidate: true })}
            defaultValue={initialData?.title || ''}
          >
            <ClippedSelectTrigger
              label="Title"
              id="title"
              className={inputClasses}
            >
              <ClippedSelectValue placeholder="CHOOSE" />
            </ClippedSelectTrigger>
            <ClippedSelectContent className="bg-white-pure border-2 border-black-pure rounded-none">
              {titles.map((title) => (
                <ClippedSelectItem key={title} value={title} className="font-black uppercase text-xs focus:bg-black-pure focus:text-white-pure">
                  {title}
                </ClippedSelectItem>
              ))}
            </ClippedSelectContent>
          </ClippedSelect>
          {errors.title && <FormError message={errors.title.message} className="text-xs font-black text-black-pure mt-2 uppercase tracking-tighter" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <ClippedInput
            label="NAME"
            id="firstName"
            autoComplete="given-name"
            placeholder="FIRST"
            className={inputClasses}
            {...register('firstName', { required: 'REQUIRED' })}
          />
          {errors.firstName && <FormError message={errors.firstName.message} className="text-xs font-black text-black-pure mt-2 uppercase tracking-tighter" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <ClippedInput
            label="SURNAME"
            id="lastName"
            autoComplete="family-name"
            placeholder="LAST"
            className={inputClasses}
            {...register('lastName', { required: 'REQUIRED' })}
          />
          {errors.lastName && <FormError message={errors.lastName.message} className="text-xs font-black text-black-pure mt-2 uppercase tracking-tighter" />}
        </FormItem>

        <FormItem className="md:col-span-6 space-y-1">
          <ClippedInput
            label="PHONE"
            type="tel"
            id="phone"
            autoComplete="tel"
            placeholder="NUMBER"
            className={inputClasses}
            {...register('phone')}
          />
        </FormItem>

        <FormItem className="md:col-span-6 space-y-1">
          <ClippedInput
            label="OFFICE"
            id="company"
            autoComplete="organization"
            placeholder="COMPANY"
            className={inputClasses}
            {...register('company')}
          />
        </FormItem>

        <FormItem className="md:col-span-8 space-y-1">
          <ClippedInput
            label="ADDRESS"
            id="addressLine1"
            autoComplete="address-line1"
            placeholder="STREET"
            className={inputClasses}
            {...register('addressLine1', { required: 'REQUIRED' })}
          />
          {errors.addressLine1 && <FormError message={errors.addressLine1.message} className="text-xs font-black text-black-pure mt-2 uppercase tracking-tighter" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <ClippedInput
            label="SUITE"
            id="addressLine2"
            autoComplete="address-line2"
            placeholder="UNIT"
            className={inputClasses}
            {...register('addressLine2')}
          />
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <ClippedInput
            label="CITY"
            id="city"
            autoComplete="address-level2"
            placeholder="TOWN"
            className={inputClasses}
            {...register('city', { required: 'REQUIRED' })}
          />
          {errors.city && <FormError message={errors.city.message} className="text-xs font-black text-black-pure mt-2 uppercase tracking-tighter" />}
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <ClippedInput
            label="REGION"
            id="state"
            autoComplete="address-level1"
            placeholder="STATE"
            className={inputClasses}
            {...register('state')}
          />
        </FormItem>

        <FormItem className="md:col-span-4 space-y-1">
          <ClippedInput
            label="POSTAL CODE"
            id="postalCode"
            placeholder="ZIP"
            className={inputClasses}
            {...register('postalCode', { required: 'REQUIRED' })}
          />
          {errors.postalCode && <FormError message={errors.postalCode.message} className="text-xs font-black text-black-pure mt-2 uppercase tracking-tighter" />}
        </FormItem>

        <FormItem className="md:col-span-12 space-y-1">
          <ClippedSelect
            onValueChange={(value) => setValue('country', value, { shouldDirty: true, shouldValidate: true })}
            defaultValue={initialData?.country || ''}
          >
            <ClippedSelectTrigger
              label="Country"
              id="country"
              className={inputClasses}
            >
              <ClippedSelectValue placeholder="SELECT" />
            </ClippedSelectTrigger>
            <ClippedSelectContent className="max-h-[400px] bg-white-pure border-2 border-black-pure rounded-none">
              {supportedCountries.map((country) => {
                const value = typeof country === 'string' ? country : country.value
                const label = typeof country === 'string' ? country : (typeof country.label === 'string' ? country.label : value)
                return (
                  <ClippedSelectItem key={value} value={value} className="font-black uppercase text-xs focus:bg-black-pure focus:text-white-pure">
                    {label}
                  </ClippedSelectItem>
                )
              })}
            </ClippedSelectContent>
          </ClippedSelect>
          {errors.country && <FormError message={errors.country.message} className="text-xs font-black text-black-pure mt-2 uppercase tracking-tighter" />}
        </FormItem>
      </div>

      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-black-pure">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black-pure/40">
          CONFIRM DETAILS
        </p>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="group relative h-20 w-full md:w-auto md:px-24 bg-black-pure text-white-pure disabled:opacity-50 overflow-hidden transition-all duration-300"
        >
          <div
            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-white-pure"
          />
          <span className="relative z-10 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-4 group-hover:text-black-pure transition-colors duration-500">
            {isSubmitting ? 'SAVING' : 'SAVE ADDRESS'} <ChevronRight className="h-5 w-5" />
          </span>
        </button>
      </div>
    </form>
  )
}