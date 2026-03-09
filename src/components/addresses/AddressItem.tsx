'use client'

import { AddressForm } from '@/components/forms/AddressForm'
import type { Address } from '@/payload-types'
import { ChevronRight, Edit2, Hash, MapPin, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  address: Partial<Omit<Address, 'country'>> & { country?: string }
}

export const AddressItem: React.FC<Props> = ({ address }) => {
  const [isEditing, setIsEditing] = useState(false)

  if (!address) return null

  if (isEditing) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Hash className="h-3 w-3 text-[#00FF41] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FF41] leading-none">
                Recalibration Mode
              </span>
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">
              Modify <span className="text-zinc-800">/ {address.title || 'Entry'}</span>
            </h3>
          </div>
          <button
            onClick={() => setIsEditing(false)}
            className="group relative h-10 px-6 overflow-hidden transition-all active:scale-95 bg-zinc-950 border border-zinc-800"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
          >
            <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-[9px] font-black uppercase tracking-widest text-white italic flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              <X className="h-3 w-3" /> Abort
            </span>
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
    <div className="group relative flex flex-col md:flex-row items-stretch gap-0 w-full">
      <div
        className="flex-1 flex flex-col md:flex-row items-center justify-between h-auto md:h-24 px-10 py-6 md:py-0 bg-zinc-900/20 transition-all duration-300 group-hover:bg-zinc-900/40"
        style={{
          clipPath: 'polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full relative z-10">
          <div className="flex items-center gap-5">
            <MapPin className="h-4 w-4 text-zinc-700 group-hover:text-[#00FF41] transition-colors" />
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white italic leading-none">
                {address.title || 'UNNAMED_LOC'}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-tighter text-zinc-700 mt-2">
                REF: {address.id?.toString().substring(0, 8).toUpperCase() || 'LOG-00'}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center border-l border-zinc-900/50 pl-8">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-1">Vector</span>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">
              {address.addressLine1}, {address.city}
            </p>
          </div>

          <div className="flex flex-col justify-center border-l border-zinc-900/50 pl-8">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-1">Designee</span>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              {address.firstName} {address.lastName}
            </p>
          </div>
        </div>

        <ChevronRight className="hidden md:block h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00FF41] ml-4" />
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="group/btn relative flex items-center justify-center w-full md:w-48 h-14 md:h-24 bg-zinc-900 border border-zinc-800 transition-all duration-300 active:scale-95 md:-ml-6 overflow-hidden"
        style={{
          clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
        }}
      >
        <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        <div className="flex items-center gap-3 relative z-10 text-white group-hover/btn:text-black transition-colors duration-300">
          <Edit2 className="h-3 w-3" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Modify</span>
        </div>
      </button>
    </div>
  )
}