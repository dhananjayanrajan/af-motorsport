'use client'

import { Price } from '@/components/Price'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { DeleteItemButton } from './DeleteItemButton'
import { EditItemQuantityButton } from './EditItemQuantityButton'
import { OpenCartButton } from './OpenCart'

export function CartModal() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setIsOpen(false) }, [pathname])

  const totalQuantity = useMemo(() => {
    if (!cart || !cart.items || !cart.items.length) return undefined
    return cart.items.reduce((quantity, item) => (item?.quantity || 0) + quantity, 0)
  }, [cart])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-white-pure border-l border-black-pure p-0 w-full sm:max-w-md">
        <SheetHeader className="p-8 border-b border-black-pure">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <SheetTitle className="text-2xl font-mono font-black uppercase text-black-pure">
                Cart
              </SheetTitle>
              <SheetDescription className="text-xs font-mono font-black uppercase text-black-pure opacity-40">
                Items {totalQuantity || 0}
              </SheetDescription>
            </div>
            <div className="flex gap-1.5">
              <div className="size-2 bg-primary" />
              <div className="size-2 bg-secondary" />
            </div>
          </div>
        </SheetHeader>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="grow flex flex-col items-center justify-center p-12">
            <p className="text-xs font-mono font-black uppercase tracking-widest text-black-pure opacity-20">Empty</p>
          </div>
        ) : (
          <div className="grow flex flex-col overflow-hidden">
            <ul className="grow overflow-auto divide-y divide-black-pure/10">
              {cart.items.map((item, i) => {
                if (!item || !item.product || typeof item.product !== 'object') return null
                const product = item.product
                const variant = item.variant && typeof item.variant === 'object' ? item.variant : null
                const image = product.gallery?.[0]?.image || product.meta?.image

                return (
                  <li key={`${product.id}-${i}`} className="flex h-32 group">
                    <div className="relative w-24 bg-white-50 border-r border-black-pure/10 shrink-0">
                      {image && typeof image === 'object' && image.url && (
                        <Image alt={product.title} className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all" fill src={image.url} />
                      )}
                    </div>

                    <div className="flex flex-col grow p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-mono font-black uppercase text-black-pure leading-tight">
                          {product.title}
                        </h4>
                        <DeleteItemButton item={item} />
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        <Price amount={product.priceInUSD || 0} className="text-xs font-mono font-black text-black-pure" />
                        <div className="flex items-center border border-black-pure">
                          <EditItemQuantityButton item={item} type="minus" />
                          <span className="w-10 text-center text-xs font-mono font-black text-black-pure border-x border-black-pure">
                            {item.quantity}
                          </span>
                          <EditItemQuantityButton item={item} type="plus" />
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="p-8 border-t border-black-pure bg-white-50 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black uppercase text-black-pure opacity-40">Subtotal</span>
                <Price amount={cart.subtotal || 0} className="text-2xl font-mono font-black text-black-pure" />
              </div>

              <button
                onClick={() => { setIsOpen(false); window.location.href = '/checkout' }}
                className="w-full h-12 bg-black-pure text-white-pure text-xs font-mono font-black uppercase tracking-widest hover:bg-secondary transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}