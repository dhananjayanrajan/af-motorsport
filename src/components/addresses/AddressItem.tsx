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
    <div className="bg-white border border-black p-8 md:p-12 shadow-2xl animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-10 border-b border-zinc-100 pb-6">
        <h3 className="text-xl font-black uppercase italic text-black">
          Edit <span className="text-zinc-300">{address.title || 'Address'}</span>
        </h3>
        <button
          onClick={() => setIsEditing(false)}
          className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400 hover:text-red-500 transition-colors"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
      </div>
      <AddressForm
        addressID={address.id}
        initialData={address}
        callback={() => setIsEditing(false)}
      />
    </div>
  ) : (
    <div className="group bg-white border border-zinc-200 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all hover:border-black hover:shadow-md">
      <div className="flex gap-6 items-start">
        <div className="mt-1">
          <MapPin className="h-5 w-5 text-zinc-300 group-hover:text-black transition-colors" />
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-[12px] font-black uppercase italic text-black tracking-tight">
              {address.title || 'Shipping Address'}
            </span>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
              ID: {address.id?.toString().substring(0, 8).toUpperCase() || 'UNSET'}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-zinc-800 uppercase tracking-tight">
              {address.firstName} {address.lastName}
            </p>
            <p className="text-[11px] text-zinc-500 font-medium uppercase leading-relaxed">
              {address.addressLine1}
              {address.addressLine2 && `, ${address.addressLine2}`}
              <br />
              {address.city}, {address.state} {address.postalCode}
            </p>
          </div>
        </div>
      </div>

      {!hideActions && (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-center gap-3 h-12 px-6 border border-zinc-200 text-black hover:bg-black hover:text-white transition-all active:scale-[0.98]"
        >
          <Edit2 className="h-3.5 w-3.5" />
          <span className="text-[11px] font-black uppercase italic">Edit Details</span>
        </button>
      )}
    </div>
  )
}