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
import { DESIGN_SYSTEM } from '@/lib/constants'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ClippedButton } from '../Clipped/ClippedButton'

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

  const slabClip = 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent
        className="flex flex-col bg-white border-l p-0 outline-none w-full sm:max-w-md z-[112]"
        style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
      >
        <SheetHeader className="p-8 border-b bg-white" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
          <div className="space-y-1">
            <SheetTitle className="text-3xl font-black italic uppercase tracking-tighter text-black leading-none">
              Shopping Cart
            </SheetTitle>
            <SheetDescription className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
              Review items and quantity before checkout
            </SheetDescription>
          </div>
        </SheetHeader>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="grow flex flex-col items-center justify-center p-12 text-center">
            <ShoppingCart className="size-10 text-zinc-200 mb-4" strokeWidth={1.5} />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Cart is empty</p>
          </div>
        ) : (
          <div className="grow flex flex-col overflow-hidden bg-zinc-50">
            <ul className="grow overflow-auto py-6 px-6 space-y-4 no-scrollbar">
              {cart.items.map((item, i) => {
                if (!item || !item.product || typeof item.product !== 'object') return null

                const product = item.product
                const variant = item.variant && typeof item.variant === 'object' ? item.variant : null
                const productId = String(product.id)
                if (!product.slug) return null

                const metaImage = product.meta?.image && typeof product.meta.image === 'object' ? product.meta.image : undefined
                const firstGalleryImage = product.gallery?.[0]?.image && typeof product.gallery[0].image === 'object' ? product.gallery[0].image : undefined
                let image = firstGalleryImage || metaImage
                let price = product.priceInUSD

                return (
                  <li
                    key={`${productId}-${i}`}
                    className="relative bg-white border p-1 shadow-sm transition-colors hover:border-zinc-300"
                    style={{
                      borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED,
                      clipPath: slabClip
                    }}
                  >
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 bg-zinc-100 border-r" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                        {image?.url && (
                          <Image
                            alt={product.title}
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                            fill
                            src={image.url}
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-between py-2 flex-1 pr-3">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-black uppercase italic text-black tracking-tight leading-none">
                              {product.title}
                            </h4>
                            <DeleteItemButton item={item} />
                          </div>
                          {variant && (
                            <p className="text-[9px] font-bold uppercase text-zinc-500 mt-1">
                              {(variant as any).options?.map((o: any) => o?.label || 'Default').join(' / ')}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <Price amount={price || 0} className="text-xs font-black text-black italic" />
                          <div className="flex items-center border bg-white" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
                            <EditItemQuantityButton item={item} type="minus" />
                            <span className="w-6 text-center text-[10px] font-bold text-black tabular-nums">{item.quantity}</span>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="p-8 bg-white border-t space-y-6" style={{ borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}>
              {typeof cart?.subtotal === 'number' && (
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Subtotal</span>
                    <span className="text-[8px] font-bold text-zinc-300 uppercase mt-1">Shipping calculated at next step</span>
                  </div>
                  <Price amount={cart.subtotal} className="text-2xl font-black italic tracking-tighter text-black" />
                </div>
              )}

              <ClippedButton
                label="Proceed to Checkout"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  setIsOpen(false)
                  window.location.href = '/checkout'
                }}
              />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}