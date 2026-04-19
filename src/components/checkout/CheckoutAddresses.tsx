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
  description = 'Select a saved address or add a new one.',
}) => {
  const { addresses } = useAddresses()
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-12">
      <div className="space-y-3 border-l-8 border-black pl-8">
        <h3 className="text-xl font-bold uppercase tracking-tighter text-black leading-none">
          {heading}
        </h3>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          {description}
        </p>
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={cn(
            'group relative h-14 px-10 border-2 border-black transition-all active:scale-95',
            showAddForm ? 'bg-error text-white' : 'bg-black text-white hover:bg-primary hover:text-black',
          )}
        >
          <span className="relative z-10 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
            {showAddForm ? (
              <>
                <X className="h-4 w-4" strokeWidth={3} /> Abort Action
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" strokeWidth={3} /> Create New Entry
              </>
            )}
          </span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-10 flex items-center gap-4 border-b-2 border-black pb-4">
            <div className="size-4 bg-primary border-2 border-black" />
            <span className="text-sm font-bold uppercase tracking-widest text-black">
              Address Parameters
            </span>
          </div>
          <AddressForm
            callback={(newAddress) => {
              setAddress(newAddress)
              setShowAddForm(false)
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {!addresses || addresses.length === 0 ? (
          <div className="py-20 border-4 border-dashed border-zinc-200 flex items-center justify-center bg-zinc-50">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">
              Database Empty: No Records
            </p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="group flex flex-col md:flex-row items-center justify-between p-8 bg-white border-2 border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <div className="flex gap-8 items-center">
                <div className="p-4 bg-zinc-100 border-2 border-black text-black group-hover:bg-primary transition-colors">
                  <MapPin className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <span className="text-base font-bold uppercase tracking-tight text-black leading-none">
                    {address.title || 'Untitled Entry'}
                  </span>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    {address.addressLine1}, {address.city}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  setAddress(address)
                }}
                className="mt-8 md:mt-0 w-full md:w-auto h-14 px-10 border-2 border-black bg-white text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4"
              >
                <span>Select</span>
                <ChevronRight className="h-5 w-5" strokeWidth={3} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}