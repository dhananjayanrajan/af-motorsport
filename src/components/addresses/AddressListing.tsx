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
          className={cn(
            "group relative h-12 px-10 overflow-hidden transition-all active:scale-95",
            showAddForm ? "bg-zinc-900 text-white" : "bg-white text-black"
          )}
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
        >
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] italic flex items-center gap-2">
            {showAddForm ? <><X className="h-3 w-3" /> Cancel</> : <><Plus className="h-3 w-3" /> Add Coordinate</>}
          </span>
        </button>
      </div>

      {showAddForm && (
        <div className="border-l-2 border-red-600 pl-8 md:pl-16 py-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">New Deployment Location</span>
          </div>
          <AddressForm callback={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-2">
        {!addresses || addresses.length === 0 ? (
          <div className="py-20 border-t border-zinc-900">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-800 italic">No coordinates registered</p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-900 border-t border-zinc-900">
            {addresses.map((address) => (
              <li key={address.id} className="py-10 group hover:bg-zinc-950/50 transition-colors">
                <AddressItem address={address} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}