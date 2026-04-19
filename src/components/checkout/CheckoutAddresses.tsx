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
    <div className="w-full">
      <div className="mb-10 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="size-2 bg-black-pure" />
          <h3 className="text-sm font-mono font-black uppercase tracking-widest text-black-pure">
            {heading}
          </h3>
        </div>
        <p className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure opacity-40">
          {description}
        </p>
      </div>

      <div className="mb-12">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={cn(
            'group flex items-center gap-4 px-6 h-12 border border-black-pure transition-colors duration-200',
            showAddForm
              ? 'bg-black-pure text-white-pure'
              : 'bg-white-pure text-black-pure hover:bg-primary',
          )}
        >
          {showAddForm ? (
            <X size={14} className="shrink-0" />
          ) : (
            <Plus size={14} className="shrink-0" />
          )}
          <span className="text-[10px] font-mono font-black uppercase tracking-widest">
            {showAddForm ? 'Cancel Entry' : 'Create New Record'}
          </span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-12 p-8 border border-black-pure bg-white-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="mb-8 flex items-center justify-between border-b border-black-pure pb-4">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest">
              Form Parameters
            </span>
            <div className="size-2 bg-secondary" />
          </div>
          <AddressForm
            callback={(newAddress) => {
              setAddress(newAddress)
              setShowAddForm(false)
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {!addresses || addresses.length === 0 ? (
          <div className="py-16 border border-black-pure border-dashed flex flex-col items-center justify-center opacity-30">
            <MapPin size={24} className="mb-4" />
            <p className="text-[10px] font-mono font-black uppercase tracking-widest">
              Registry Empty
            </p>
          </div>
        ) : (
          addresses.map((address) => (
            <button
              key={address.id}
              onClick={(e) => {
                e.preventDefault()
                setAddress(address)
              }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white-pure border border-black-pure hover:bg-white-50 transition-colors text-left"
            >
              <div className="flex items-start gap-5">
                <div className="mt-1 size-2 bg-black-pure opacity-20 group-hover:bg-primary group-hover:opacity-100 transition-all" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-mono font-black uppercase tracking-tight">
                    {address.title || 'Undefined'}
                  </span>
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-40">
                    {address.addressLine1}, {address.city}
                  </span>
                </div>
              </div>

              <div className="mt-6 sm:mt-0 flex items-center gap-4">
                <span className="text-[9px] font-mono font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Select
                </span>
                <div className="size-8 border border-black-pure flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-colors">
                  <ChevronRight size={14} />
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}