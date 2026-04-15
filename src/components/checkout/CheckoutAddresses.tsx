'use client'

import { AddressForm } from '@/components/forms/AddressForm'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Address } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { ChevronRight, MapPin, Plus, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  selectedAddress?: Address
  setAddress: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  heading?: string
  description?: string
  setSubmit?: React.Dispatch<React.SetStateAction<() => void | Promise<void>>>
}

export const CheckoutAddresses: React.FC<Props> = ({
  setAddress,
  heading = 'Addresses',
  description = 'Select a saved address or add a new one.',
}) => {
  const { addresses } = useAddresses()
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-10">
      <div className="space-y-2 border-l-4 border-black pl-6">
        <h3 className="text-[14px] font-black uppercase italic tracking-widest text-black leading-none">
          {heading}
        </h3>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          {description}
        </p>
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="group relative h-12 px-8 bg-black transition-all active:scale-[0.98] overflow-hidden"
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
            showAddForm ? "text-white" : "text-white group-hover:text-black"
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
              Address Details
            </span>
          </div>
          <AddressForm callback={(newAddress) => {
            setAddress(newAddress)
            setShowAddForm(false)
          }} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {!addresses || addresses.length === 0 ? (
          <div className="py-16 border border-dashed border-zinc-200 flex items-center justify-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 italic">
              No saved addresses found
            </p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="group flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-zinc-200 hover:border-black transition-all"
            >
              <div className="flex gap-5 items-center">
                <div className="p-3 bg-zinc-50 text-zinc-300 group-hover:text-black transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[12px] font-black uppercase italic text-black leading-none">
                    {address.title || 'Untitled Address'}
                  </span>
                  <p className="text-[11px] font-medium text-zinc-500 uppercase">
                    {address.addressLine1}, {address.city}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  setAddress(address)
                }}
                className="mt-6 md:mt-0 w-full md:w-auto h-12 px-8 border border-zinc-200 text-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <span className="text-[11px] font-black uppercase italic">Select Address</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}