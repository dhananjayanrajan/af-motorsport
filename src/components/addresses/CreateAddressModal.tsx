'use client'

import { AddressForm } from '@/components/forms/AddressForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Address } from '@/payload-types'
import { DefaultDocumentIDType } from 'payload'
import React, { useState } from 'react'

type Props = {
  addressID?: DefaultDocumentIDType
  initialData?: Partial<Omit<Address, 'country'>> & { country?: string }
  buttonText?: string
  modalTitle?: string
  callback?: (address: Partial<Address>) => void
  skipSubmission?: boolean
  disabled?: boolean
}

export const CreateAddressModal: React.FC<Props> = ({
  addressID,
  initialData,
  buttonText = 'ADD ADDRESS',
  modalTitle = 'NEW SHIPPING ADDRESS',
  callback,
  skipSubmission,
  disabled,
}) => {
  const [open, setOpen] = useState(false)

  const handleCallback = (data: Partial<Address>) => {
    setOpen(false)
    if (callback) callback(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        <Button
          variant={'outline'}
          className="group relative rounded-none border-4 border-black-pure bg-white-pure text-xs font-black uppercase tracking-widest h-16 px-10 overflow-hidden transition-all duration-300"
        >
          <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-primary-500 transition-transform duration-500 ease-in-out -z-10" />
          <span className="relative z-10 text-black-pure">
            {buttonText}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white-pure border-4 border-black-pure rounded-none max-w-2xl p-0 overflow-hidden shadow-none ring-0 focus:ring-0 outline-hidden">
        <div className="flex w-full h-3 border-b-4 border-black-pure">
          <div className="flex-1 bg-primary-500" />
          <div className="flex-1 bg-secondary-500" />
          <div className="flex-1 bg-tertiary-500" />
        </div>

        <div className="p-10 lg:p-14">
          <DialogHeader className="mb-12 text-left space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-tertiary-500">
                DATA ENTRY REQUIRED
              </span>
              <DialogTitle className="text-4xl font-black uppercase tracking-tighter text-black-pure leading-none">
                {modalTitle}
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs font-black uppercase tracking-tight text-black-pure leading-tight max-w-sm">
              SAVE THIS LOCATION TO THE DATABASE FOR ACCELERATED TRANSACTION PROCESSING AND LOGISTICS ACCURACY.
            </DialogDescription>
          </DialogHeader>

          <AddressForm
            addressID={addressID}
            initialData={initialData}
            callback={handleCallback}
            skipSubmission={skipSubmission}
          />
        </div>

        <div className="h-4 bg-black-pure w-full" />
      </DialogContent>
    </Dialog>
  )
}