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
import { DESIGN_SYSTEM } from '@/lib/constants'
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
  buttonText = 'Add Address',
  modalTitle = 'New Shipping Address',
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
          className="rounded-none border-zinc-200 bg-white text-[11px] font-black uppercase italic tracking-widest h-14 px-10 hover:bg-black hover:text-white transition-all shadow-sm"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-zinc-200 rounded-none max-w-2xl p-0 overflow-hidden shadow-2xl">
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
        />
        <div className="p-8 md:p-12">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-2xl font-black uppercase italic text-black tracking-tighter">
              {modalTitle}
            </DialogTitle>
            <DialogDescription className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold mt-2">
              Save this address to your account for faster checkout.
            </DialogDescription>
          </DialogHeader>

          <AddressForm
            addressID={addressID}
            initialData={initialData}
            callback={handleCallback}
            skipSubmission={skipSubmission}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}