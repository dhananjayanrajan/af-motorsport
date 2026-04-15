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
import { ShoppingBag } from 'lucide-react'
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

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent
        className="flex flex-col bg-white border-l p-0 outline-none w-full sm:max-w-md z-[112]"
        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
      >
        <SheetHeader className="p-8 border-b bg-white relative overflow-hidden" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
          />
          <div className="space-y-1 relative z-10">
            <SheetTitle
              className="text-3xl font-black italic uppercase tracking-tighter text-black leading-none"
              style={{ textShadow: `0 0 15px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}` }}
            >
              Your Cart
            </SheetTitle>
            <SheetDescription className="text-[10px] uppercase font-black text-zinc-400 tracking-[0.2em]">
              Review Manifest / {totalQuantity || 0} Items
            </SheetDescription>
          </div>
        </SheetHeader>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="grow flex flex-col items-center justify-center p-12 text-center bg-zinc-50">
            <div className="relative mb-6">
              <ShoppingBag className="size-12 text-zinc-200" strokeWidth={1} />
              <div className="absolute inset-0 blur-2xl bg-primary/10 rounded-full" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Empty Inventory</p>
          </div>
        ) : (
          <div className="grow flex flex-col overflow-hidden bg-zinc-50/50">
            <ul className="grow overflow-auto py-6 px-6 space-y-3 no-scrollbar">
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
                    className="group relative bg-white border p-0 transition-all duration-300 hover:border-black skew-x-[-4deg] overflow-hidden"
                    style={{
                      borderColor: DESIGN_SYSTEM.COLORS.ZINC[200],
                    }}
                  >
                    <div className="flex gap-4 skew-x-[4deg]">
                      <div className="relative h-24 w-20 flex-shrink-0 bg-zinc-100 border-r" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                        {image?.url && (
                          <Image
                            alt={product.title}
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            fill
                            src={image.url}
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-between py-3 flex-1 pr-4">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-[11px] font-black uppercase italic text-black tracking-tight leading-tight">
                              {product.title}
                            </h4>
                            <div className="opacity-40 hover:opacity-100 transition-opacity">
                              <DeleteItemButton item={item} />
                            </div>
                          </div>
                          {variant && (
                            <p className="text-[8px] font-black uppercase text-zinc-400">
                              {(variant as any).options?.map((o: any) => o?.label || 'Default').join(' / ')}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <Price amount={price || 0} className="text-[13px] font-black text-black italic" />

                          <div
                            className="flex items-center border bg-zinc-50 group-hover:bg-white transition-colors"
                            style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                          >
                            <EditItemQuantityButton item={item} type="minus" />
                            <span className="w-8 text-center text-[10px] font-black text-black tabular-nums border-x border-zinc-100">
                              {item.quantity}
                            </span>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="p-8 bg-white border-t space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
              {typeof cart?.subtotal === 'number' && (
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Subtotal</span>
                    <span className="text-[9px] font-bold text-zinc-300 uppercase mt-1 italic">Taxes calculated at checkout</span>
                  </div>
                  <Price
                    amount={cart.subtotal}
                    className="text-3xl font-black italic tracking-tighter text-black"
                    style={{ textShadow: `0 0 20px ${DESIGN_SYSTEM.COLORS.PRIMARY.GLOW}` }}
                  />
                </div>
              )}

              <div className="relative group">
                <div
                  className="absolute inset-0 bg-black blur-xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
                />
                <ClippedButton
                  label="Initiate Checkout"
                  variant="primary"
                  size="lg"
                  className="w-full relative z-10"
                  onClick={() => {
                    setIsOpen(false)
                    window.location.href = '/checkout'
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}