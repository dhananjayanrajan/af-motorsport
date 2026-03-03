'use client'

import { AddressForm } from '@/components/forms/AddressForm'
import type { Address } from '@/payload-types'
import { Edit2, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  address: Partial<Omit<Address, 'country'>> & { country?: string }
}

export const AddressItem: React.FC<Props> = ({ address }) => {
  const [isEditing, setIsEditing] = useState(false)

  if (!address) return null

  if (isEditing) {
    return (
      <div className="space-y-8 pl-4 border-l border-white">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">Edit Coordinate</span>
          <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <AddressForm
          addressID={address.id}
          initialData={address}
          callback={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 grow">
        <div className="space-y-1">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 block mb-2">Designation</span>
          <p className="text-sm font-black uppercase tracking-widest text-white">
            {address.title || 'UNNAMED'}
          </p>
          <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
            {address.firstName} {address.lastName}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 block mb-2">Location</span>
          <p className="text-[11px] text-zinc-300 uppercase tracking-widest leading-relaxed">
            {address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}<br />
            {address.city}, {address.state} {address.postalCode}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 block mb-2">Region</span>
          <p className="text-[11px] text-zinc-300 uppercase tracking-widest">{address.country}</p>
          {address.phone && <p className="text-[10px] text-zinc-600 font-mono mt-2">{address.phone}</p>}
        </div>
      </div>

      <div className="shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 hover:text-red-600 transition-colors"
        >
          <Edit2 className="h-3 w-3" /> Edit
        </button>
      </div>
    </div>
  )
}