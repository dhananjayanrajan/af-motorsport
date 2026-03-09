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
  buttonText = 'Add a new address',
  modalTitle = 'Add a new address',
  callback,
  skipSubmission,
  disabled,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (state: boolean) => {
    setOpen(state)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleCallback = (data: Partial<Address>) => {
    closeModal()

    if (callback) {
      callback(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        <Button
          variant={'outline'}
          className="rounded-none border-zinc-800 bg-black text-[10px] font-black uppercase tracking-widest h-12 px-10 hover:bg-[#00FF41] hover:text-black transition-all"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black border-zinc-900 rounded-none max-w-2xl">
        <DialogHeader className="border-b border-zinc-900 pb-6 mb-6">
          <DialogTitle className="text-[11px] font-black uppercase tracking-[0.5em] text-white italic">{modalTitle}</DialogTitle>
          <DialogDescription className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">This address will be connected to your account.</DialogDescription>
        </DialogHeader>

        <AddressForm
          addressID={addressID}
          initialData={initialData}
          callback={handleCallback}
          skipSubmission={skipSubmission}
        />
      </DialogContent>
    </Dialog>
  )
}