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

      <SheetContent className="flex flex-col bg-white border-l-[12px] border-black p-0 w-full sm:max-w-md">
        <SheetHeader className="p-10 bg-white">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex gap-1">
                <div className="size-4 bg-primary" />
                <div className="size-4 bg-secondary" />
                <div className="size-4 bg-accent" />
              </div>
              <SheetTitle className="text-3xl font-bold uppercase tracking-tight text-black leading-none">
                Cart
              </SheetTitle>
              <SheetDescription className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Quantity: {totalQuantity || 0}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="grow flex flex-col items-center justify-center p-12">
            <div className="size-1 bg-black w-12 mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Empty</p>
          </div>
        ) : (
          <div className="grow flex flex-col overflow-hidden">
            <ul className="grow overflow-auto px-10 space-y-12">
              {cart.items.map((item, i) => {
                if (!item || !item.product || typeof item.product !== 'object') return null
                const product = item.product
                const variant = item.variant && typeof item.variant === 'object' ? item.variant : null
                const image = product.gallery?.[0]?.image || product.meta?.image

                return (
                  <li key={`${product.id}-${i}`} className="flex gap-8 group">
                    <div className="relative h-32 w-24 bg-zinc-50 shrink-0 border border-zinc-100">
                      {image && typeof image === 'object' && image.url && (
                        <Image alt={product.title} className="object-contain p-4" fill src={image.url} />
                      )}
                    </div>

                    <div className="flex flex-col grow py-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold uppercase tracking-tight text-black">
                          {product.title}
                        </h4>
                        <DeleteItemButton item={item} />
                      </div>

                      {variant && (
                        <span className="text-[9px] font-bold text-zinc-400 uppercase mt-1">
                          {(variant as any).options?.map((o: any) => o?.label).join(' / ')}
                        </span>
                      )}

                      <div className="mt-auto flex items-end justify-between">
                        <Price amount={product.priceInUSD || 0} className="text-xs font-bold text-black" />
                        <div className="flex items-center border border-black">
                          <EditItemQuantityButton item={item} type="minus" />
                          <span className="w-8 text-center text-[10px] font-bold text-black border-x border-black">
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

            <div className="p-10 mt-8 space-y-10">
              <div className="h-[2px] bg-black w-full" />
              <div className="flex items-end justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest">Total Sum</span>
                <Price amount={cart.subtotal || 0} className="text-4xl font-bold tracking-tighter text-black" />
              </div>

              <button
                onClick={() => { setIsOpen(false); window.location.href = '/checkout' }}
                className="w-full h-16 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-colors"
              >
                Confirm and Checkout
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}