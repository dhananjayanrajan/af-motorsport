'use client'

import { AddressForm } from '@/components/forms/AddressForm'
import { cn } from '@/utilities/cn'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { ChevronRight, Plus, X } from 'lucide-react'
import React, { useState } from 'react'

export const CheckoutAddresses: React.FC<{ setAddress: any }> = ({ setAddress }) => {
  const { addresses } = useAddresses()
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between border-b border-black-pure pb-4">
        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-black-pure/40">Saved locations</span>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={cn(
            "h-8 px-4 flex items-center gap-2 border border-black-pure text-[9px] font-mono font-black uppercase transition-all",
            showAddForm ? "bg-black-pure text-white-pure" : "bg-primary hover:bg-black-pure hover:text-white-pure"
          )}
        >
          {showAddForm ? <X size={10} /> : <Plus size={10} />}
          {showAddForm ? 'Cancel' : 'New address'}
        </button>
      </div>

      {showAddForm && (
        <div className="p-8 border border-black-pure bg-white-pure animate-in fade-in slide-in-from-top-4 duration-300">
          <AddressForm callback={(addr) => { setAddress(addr); setShowAddForm(false); }} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {addresses?.map((addr) => (
          <button
            key={addr.id}
            onClick={() => setAddress(addr)}
            className="flex items-center justify-between h-16 px-6 border border-black-pure bg-white-pure hover:bg-primary transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="size-2 bg-black-pure group-hover:scale-150 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-black uppercase tracking-tight">{addr.title}</span>
                <span className="text-[9px] font-mono font-black uppercase opacity-40">{addr.city}, {addr.country}</span>
              </div>
            </div>
            <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  )
}