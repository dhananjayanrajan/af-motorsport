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
    <div className="space-y-16">
      <div className="flex justify-start">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="group relative h-16 px-10 bg-black-pure border-2 border-black-pure overflow-hidden transition-all duration-300"
        >
          <div
            className={cn(
              "absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out",
              showAddForm ? "translate-y-0 bg-primary-500" : "bg-secondary-500"
            )}
          />
          <span className={cn(
            "relative z-10 text-xs font-black uppercase tracking-widest flex items-center gap-4 transition-colors duration-300",
            showAddForm ? "text-black-pure" : "text-white-pure group-hover:text-black-pure"
          )}>
            {showAddForm ? (
              <><X className="h-5 w-5" /> DISCARD ENTRY</>
            ) : (
              <><Plus className="h-5 w-5" /> CREATE NEW LOCATION</>
            )}
          </span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white-pure border-4 border-black-pure p-10 lg:p-16 relative">
          <div className="absolute top-0 right-0 p-4 flex gap-1">
            <div className="size-3 bg-primary-500 border-2 border-black-pure" />
            <div className="size-3 bg-secondary-500 border-2 border-black-pure" />
            <div className="size-3 bg-tertiary-500 border-2 border-black-pure" />
          </div>
          <div className="mb-12 space-y-2">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-black-pure leading-none">
              NEW ADDRESS DATA
            </h3>
            <div className="h-1.5 w-24 bg-black-pure" />
          </div>
          <AddressForm callback={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-8">
        {!addresses || addresses.length === 0 ? (
          <div className="py-24 border-t-4 border-black-pure flex flex-col items-center justify-center bg-white-pure">
            <div className="size-16 bg-white-pure border-4 border-black-pure flex items-center justify-center mb-6">
              <X className="h-8 w-8 text-black-pure" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-black-pure/30">
              DATABASE EMPTY
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {addresses.map((address) => (
              <AddressItem key={address.id} address={address} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}