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
import { cn } from '@/utilities/cn'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ClippedButton } from '../Custom/ui/ClippedButton'

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

  const diamondClip = 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-black border-l border-zinc-900 text-white w-full sm:max-w-md p-0 outline-none">
        <SheetHeader className="p-8 border-b border-zinc-900 bg-zinc-950/50">
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("size-2", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_8px_${DESIGN_SYSTEM.COLORS.PRIMARY}80]`)} />
            <SheetTitle className="text-xs font-black uppercase tracking-[0.5em] text-white">Cart_System</SheetTitle>
          </div>
          <SheetDescription className="text-[10px] uppercase font-bold text-zinc-600 tracking-[0.2em] leading-relaxed">
            Asset_Allocation_Management
          </SheetDescription>
        </SheetHeader>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="grow flex flex-col items-center justify-center gap-4 p-8 opacity-20">
            <ShoppingCart className="h-8 w-8 stroke-[1px]" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Empty_Inventory</p>
          </div>
        ) : (
          <div className="grow flex flex-col overflow-hidden">
            <ul className="grow overflow-auto py-6 px-6 space-y-4">
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
                const isVariant = Boolean(variant)

                if (isVariant && variant) {
                  price = (variant as any).priceInUSD
                  const imageVariant = product.gallery?.find((g) => {
                    if (!g || !g.variantOption) return false
                    const vID = typeof g.variantOption === 'object' ? String(g.variantOption.id) : String(g.variantOption)

                    return (variant as any).options?.some((o: any) => {
                      if (!o) return false
                      const oID = typeof o === 'object' ? String(o.id) : String(o)
                      return oID === vID
                    })
                  })
                  if (imageVariant?.image && typeof imageVariant.image === 'object') {
                    image = imageVariant.image
                  }
                }

                return (
                  <li key={`${productId}-${i}`} className="group relative bg-zinc-950 border border-zinc-900 p-4 transition-colors hover:border-zinc-800">
                    <div className="absolute top-4 right-4 z-10">
                      <DeleteItemButton item={item} />
                    </div>

                    <div className="flex gap-6">
                      <div
                        className="relative h-20 w-20 flex-shrink-0 bg-zinc-900 overflow-hidden"
                        style={{ clipPath: diamondClip }}
                      >
                        {image?.url && (
                          <Image alt={product.title} className="object-cover" fill src={image.url} />
                        )}
                      </div>

                      <div className="flex flex-col justify-between py-1 flex-1 overflow-hidden">
                        <div>
                          <span className="text-[8px] font-mono text-zinc-600 block mb-1">ID_{productId.slice(-6).toUpperCase()}</span>
                          <h4 className="text-[11px] font-black uppercase tracking-wider text-white italic truncate pr-8">{product.title}</h4>
                          {isVariant && variant && (
                            <p className={cn("text-[9px] font-bold uppercase tracking-widest mt-1", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}>
                              Spec: {(variant as any).options?.map((o: any) => o?.label || 'N/A').join(' / ')}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <Price amount={price || 0} className="text-xs font-black text-white italic" />
                          <div className="flex items-center bg-black border border-zinc-900">
                            <EditItemQuantityButton item={item} type="minus" />
                            <span className="w-8 text-center text-[10px] font-mono text-zinc-400">{item.quantity}</span>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="p-8 bg-zinc-950 border-t border-zinc-900">
              {typeof cart?.subtotal === 'number' && (
                <div className="flex items-end justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">Total_Liability</span>
                    <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest mt-1">Settlement_Required</span>
                  </div>
                  <Price amount={cart.subtotal} className="text-3xl font-black italic tracking-tighter text-white" />
                </div>
              )}

              <ClippedButton
                label="Initialize_Checkout"
                variant="primary"
                size="full"
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