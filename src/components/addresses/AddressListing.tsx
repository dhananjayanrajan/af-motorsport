'use client'

import { AddressItem } from '@/components/addresses/AddressItem'
import { AddressForm } from '@/components/forms/AddressForm'
import { cn } from '@/utilities/cn'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'

export const AddressListing: React.FC = () => {
  const { addresses } = useAddresses()
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-12">
      <div className="flex justify-start">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="group relative h-12 px-10 overflow-hidden transition-all active:scale-95 bg-zinc-950 border border-zinc-800"
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
        >
          <div className={cn(
            "absolute inset-0 bg-white transition-transform duration-300",
            showAddForm ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
          )} />
          <span className={cn(
            "relative z-10 text-[10px] font-black uppercase tracking-[0.4em] italic flex items-center gap-2 transition-colors duration-300",
            showAddForm ? "text-black" : "text-white group-hover:text-black"
          )}>
            {showAddForm ? (
              <><X className="h-3 w-3" /> Cancel Entry</>
            ) : (
              <><Plus className="h-3 w-3 text-[#00FF41]" /> Add Coordinate</>
            )}
          </span>
        </button>
      </div>

      {showAddForm && (
        <div className="border-l border-[#00FF41] pl-8 md:pl-16 py-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
              Initialize Manual Input
            </span>
          </div>
          <AddressForm callback={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-4">
        {!addresses || addresses.length === 0 ? (
          <div className="py-20 border-t border-zinc-900">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-800 italic">
              No coordinates registered in registry
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-900 border-t border-zinc-900">
            {addresses.map((address) => (
              <div key={address.id} className="py-8">
                <AddressItem address={address} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}