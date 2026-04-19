'use client'

import { AddressForm } from '@/components/forms/AddressForm'
import type { Address } from '@/payload-types'
import { Edit2, MapPin, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  address: Partial<Omit<Address, 'country'>> & { country?: string }
  hideActions?: boolean
}

export const AddressItem: React.FC<Props> = ({ address, hideActions }) => {
  const [isEditing, setIsEditing] = useState(false)

  if (!address) return null

  return isEditing ? (
    <div className="bg-white-pure border-4 border-black-pure p-10 lg:p-16">
      <div className="flex justify-between items-start mb-12">
        <div className="space-y-2">
          <div className="flex gap-1">
            <div className="size-3 bg-primary-500 border-2 border-black-pure" />
            <div className="size-3 bg-secondary-500 border-2 border-black-pure" />
            <div className="size-3 bg-tertiary-500 border-2 border-black-pure" />
          </div>
          <h3 className="text-4xl font-black uppercase tracking-tighter text-black-pure leading-none">
            REVISE LOCATION
          </h3>
        </div>
        <button
          onClick={() => setIsEditing(false)}
          className="flex items-center gap-3 px-6 py-3 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-300"
        >
          <X className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-widest">DISCARD</span>
        </button>
      </div>
      <AddressForm
        addressID={address.id}
        initialData={address}
        callback={() => setIsEditing(false)}
      />
    </div>
  ) : (
    <div className="group relative bg-white-pure border-4 border-black-pure p-10 flex flex-col md:flex-row md:items-center justify-between gap-10 overflow-hidden">
      <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out bg-primary-500 -z-10" />

      <div className="flex gap-8 items-start relative z-10">
        <div className="size-14 bg-black-pure flex items-center justify-center group-hover:bg-white-pure transition-colors duration-500 border-2 border-black-pure">
          <MapPin className="h-6 w-6 text-white-pure group-hover:text-black-pure transition-colors duration-500" />
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-tertiary-500 group-hover:text-black-pure transition-colors duration-500">
              {address.title || 'SHIPPING DESTINATION'}
            </span>
            <h4 className="text-3xl font-black uppercase tracking-tighter text-black-pure leading-none">
              {address.firstName} {address.lastName}
            </h4>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-tight text-black-pure leading-tight max-w-xs">
              {address.addressLine1}
              {address.addressLine2 && <span className="block">{address.addressLine2}</span>}
              <span className="block">{address.city}, {address.state} {address.postalCode}</span>
            </p>
          </div>
        </div>
      </div>

      {!hideActions && (
        <button
          onClick={() => setIsEditing(true)}
          className="relative z-10 flex items-center justify-center gap-4 h-16 px-10 bg-black-pure text-white-pure group-hover:bg-secondary-500 group-hover:text-black-pure border-2 border-black-pure transition-all duration-500"
        >
          <Edit2 className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-widest">MODIFY DATA</span>
        </button>
      )}
    </div>
  )
}