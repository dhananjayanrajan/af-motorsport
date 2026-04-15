'use client'

import { AddressItem } from '@/components/addresses/AddressItem'
import { AddressForm } from '@/components/forms/AddressForm'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
          className="group relative h-12 px-8 transition-all active:scale-[0.98] bg-black overflow-hidden"
        >
          <div
            className={cn(
              "absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out",
              showAddForm && "translate-x-0"
            )}
            style={{ backgroundColor: showAddForm ? '#ef4444' : DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          />
          <span className={cn(
            "relative z-10 text-[11px] font-black uppercase italic flex items-center gap-2 transition-colors",
            showAddForm || "text-white group-hover:text-black"
          )}>
            {showAddForm ? (
              <><X className="h-4 w-4" /> Cancel</>
            ) : (
              <><Plus className="h-4 w-4" /> Add New Address</>
            )}
          </span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-zinc-50 border border-zinc-200 p-8 md:p-12 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-4 w-1 bg-black" />
            <span className="text-[11px] font-black uppercase italic tracking-widest text-black">
              Enter Address Details
            </span>
          </div>
          <AddressForm callback={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-6">
        {!addresses || addresses.length === 0 ? (
          <div className="py-20 border-t border-zinc-100 flex flex-col items-center">
            <p className="text-[11px] font-black uppercase tracking-widest text-zinc-300 italic">
              No addresses saved to your profile
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {addresses.map((address) => (
              <AddressItem key={address.id} address={address} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}