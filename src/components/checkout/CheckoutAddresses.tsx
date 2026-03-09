'use client'

import { AddressForm } from '@/components/forms/AddressForm'
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
  description = 'Please select or add your shipping and billing addresses.',
}) => {
  const { addresses } = useAddresses()
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-12">
      <div className="border-l-2 border-[#00FF41] pl-6 mb-12 shadow-[0_0_15px_rgba(0,255,65,0.1)]">
        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-white italic mb-1">{heading}</h3>
        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{description}</p>
      </div>

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
              <><X className="h-3 w-3" /> Cancel_Entry</>
            ) : (
              <><Plus className="h-3 w-3 text-[#00FF41]" /> Add_Coordinate</>
            )}
          </span>
        </button>
      </div>

      {showAddForm && (
        <div className="border-l border-[#00FF41] pl-8 md:pl-16 py-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-[inset_10px_0_20px_-15px_rgba(0,255,65,0.2)]">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
              Initialize_Manual_Input
            </span>
          </div>
          <AddressForm callback={(newAddress) => {
            setAddress(newAddress)
            setShowAddForm(false)
          }} />
        </div>
      )}

      <div className="space-y-4">
        {!addresses || addresses.length === 0 ? (
          <div className="py-20 border-t border-zinc-900">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-800 italic">
              No_Coordinates_Registered
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-900 border-t border-zinc-900">
            {addresses.map((address) => (
              <div key={address.id} className="py-8">
                <div className="group relative flex flex-col md:flex-row items-stretch gap-0 w-full">
                  <div
                    className="flex-1 flex flex-col md:flex-row items-center justify-between h-auto md:h-24 px-10 py-6 md:py-0 bg-zinc-900/10 transition-all duration-300 group-hover:bg-zinc-900/30"
                    style={{
                      clipPath: 'polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%)',
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full relative z-10">
                      <div className="flex items-center gap-5">
                        <MapPin className="h-4 w-4 text-zinc-700 group-hover:text-[#00FF41] transition-colors drop-shadow-[0_0_5px_rgba(0,255,65,0.3)]" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white italic leading-none truncate">
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
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setAddress(address)
                    }}
                    className="group/btn relative flex items-center justify-center w-full md:w-48 h-14 md:h-24 bg-zinc-900 border border-zinc-800 transition-all duration-300 active:scale-95 md:-ml-6 overflow-hidden"
                    style={{
                      clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    }}
                  >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    <div className="flex items-center gap-3 relative z-10 text-white group-hover/btn:text-black transition-colors duration-300">
                      <ChevronRight className="h-3 w-3 group-hover/btn:drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Select_Node</span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}