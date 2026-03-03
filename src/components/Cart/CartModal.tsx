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
import { ChevronRight, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
    return cart.items.reduce((quantity, item) => (item.quantity || 0) + quantity, 0)
  }, [cart])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-zinc-950 border-l border-zinc-800 text-white w-full sm:max-w-md p-0">
        <SheetHeader className="p-8 border-b border-zinc-900 bg-black/50">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="h-4 w-4 text-red-600" />
            <SheetTitle className="text-xs font-black uppercase tracking-[0.5em] text-white">My Cart</SheetTitle>
          </div>
          <SheetDescription className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest leading-relaxed">
            Manage your selected items and finalize your order.
          </SheetDescription>
        </SheetHeader>

        {!cart || cart?.items?.length === 0 ? (
          <div className="grow flex flex-col items-center justify-center gap-6 p-8 grayscale opacity-20">
            <ShoppingCart className="h-12 w-12 stroke-[1px]" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Cart is empty</p>
          </div>
        ) : (
          <div className="grow flex flex-col overflow-hidden">
            <ul className="grow overflow-auto py-4 px-6 space-y-4">
              {cart?.items?.map((item, i) => {
                const product = item.product
                const variant = item.variant
                if (typeof product !== 'object' || !item || !product || !product.slug) return null

                const metaImage = product.meta?.image && typeof product.meta?.image === 'object' ? product.meta.image : undefined
                const firstGalleryImage = typeof product.gallery?.[0]?.image === 'object' ? product.gallery?.[0]?.image : undefined
                let image = firstGalleryImage || metaImage
                let price = product.priceInUSD
                const isVariant = Boolean(variant) && typeof variant === 'object'

                if (isVariant) {
                  price = (variant as any)?.priceInUSD
                  const imageVariant = product.gallery?.find((g) => {
                    const vID = typeof g.variantOption === 'object' ? g.variantOption.id : g.variantOption
                    return (variant as any)?.options?.some((o: any) => (typeof o === 'object' ? o.id === vID : o === vID))
                  })
                  if (imageVariant && typeof imageVariant.image === 'object') image = imageVariant.image
                }

                return (
                  <li key={i} className="group relative bg-zinc-900/30 border border-zinc-900 p-4 transition-all hover:bg-zinc-900/50">
                    <div className="absolute top-2 right-2 z-50">
                      <DeleteItemButton item={item} />
                    </div>
                    <div className="flex gap-4">
                      <div
                        className="relative h-20 w-20 flex-shrink-0 bg-black border border-zinc-800 overflow-hidden"
                        style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}
                      >
                        {image?.url && (
                          <Image alt={product.title} className="object-cover" fill src={image.url} />
                        )}
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-[11px] font-black uppercase tracking-wider text-white italic line-clamp-1">{product.title}</h4>
                          {isVariant && (
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                              Variant: {(variant as any).options?.map((o: any) => o.label).join(' | ')}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <Price amount={price || 0} className="text-xs font-mono font-bold text-red-600" />
                          <div className="flex items-center bg-black border border-zinc-800 h-7">
                            <EditItemQuantityButton item={item} type="minus" />
                            <span className="w-8 text-center text-[10px] font-mono border-x border-zinc-800">{item.quantity}</span>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="p-8 bg-black border-t border-zinc-900">
              {typeof cart?.subtotal === 'number' && (
                <div className="flex items-end justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Total Amount</span>
                    <span className="text-[10px] font-mono text-zinc-700">Order Summary</span>
                  </div>
                  <Price amount={cart?.subtotal} className="text-2xl font-black italic tracking-tighter text-white" />
                </div>
              )}

              <Link
                href="/checkout"
                className="relative group flex items-center justify-center w-full h-14 bg-white text-black overflow-hidden transition-transform active:scale-95"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] italic flex items-center gap-2">
                  Proceed To Checkout <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}