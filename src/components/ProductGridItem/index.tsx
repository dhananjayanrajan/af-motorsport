'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { DESIGN_SYSTEM } from '@/lib/constants'
import type { Category, Media as MediaType, Product } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { motion } from 'framer-motion'
import { ArrowUpRight, Box } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const getBottomClipPath = (index: number) => {
  const variations = [
    'polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%)',
    'polygon(0% 0%, 100% 0%, 100% 100%, 20px 100%, 0% calc(100% - 20px))',
  ]
  return variations[index % variations.length]
}

export const ProductGridItem: React.FC<{ product: Product; index?: number }> = ({
  product,
  index = 0
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const image = (product.gallery?.[0]?.image as MediaType) ?? undefined
  const clip = getBottomClipPath(index)

  const primaryCategory = product.categories?.[0] as Category
  const stockCount = product.inventory ?? 0
  const hasVariants = product.enableVariants && (product.variants?.totalDocs || 0) > 0

  return (
    <Link
      href={`/products/${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative block h-full group"
    >
      <div
        className="relative p-[1px] transition-all duration-500 h-full"
        style={{
          clipPath: clip,
          backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200],
        }}
      >
        <div className="relative bg-white p-6 h-full flex flex-col" style={{ clipPath: clip }}>

          <div className="relative aspect-square overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
            <motion.div
              animate={{ opacity: isHovered ? 0.15 : 0 }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500], mixBlendMode: 'multiply' }}
            />

            {image && (
              <Media
                resource={image}
                className="h-full w-full p-10 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                imgClassName="h-full w-full object-contain"
              />
            )}

            <div className="absolute top-4 right-4 z-30">
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1 text-[9px] font-black italic border backdrop-blur-sm transition-colors",
                  stockCount > 0
                    ? "bg-white/90 border-zinc-200 text-black group-hover:border-black"
                    : "bg-red-600 border-red-600 text-white"
                )}
              >
                <Box size={10} style={{ color: isHovered && stockCount > 0 ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : 'inherit' }} />
                <span className="transition-colors group-hover:text-zinc-600">
                  {stockCount > 0 ? `QTY: ${stockCount}` : 'SOLD OUT'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-grow mt-6">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[9px] font-black uppercase italic transition-colors duration-200 group-hover:text-black"
                style={{
                  color: DESIGN_SYSTEM.COLORS.ZINC[400],
                  letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT
                }}
              >
                {primaryCategory?.name || 'GENERAL'}
              </span>
              <span
                className="text-[9px] font-bold font-mono transition-colors duration-200 group-hover:text-primary-500"
                style={{ color: DESIGN_SYSTEM.COLORS.ZINC[300] }}
              >
                #{product.id.toString().padStart(4, '0')}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <h3
                className="text-3xl font-black italic uppercase leading-[0.9] tracking-tighter transition-colors duration-200 group-hover:text-zinc-700"
                style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
              >
                {product.title}
              </h3>

              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <Price
                  amount={product.priceInUSD || 0}
                  className="inline-block text-[16px] font-black px-4 py-2 italic tracking-tighter transition-colors"
                  style={{
                    backgroundColor: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.BLACK.PURE,
                    color: isHovered ? DESIGN_SYSTEM.COLORS.BLACK.PURE : DESIGN_SYSTEM.COLORS.WHITE.PURE
                  }}
                />
              </div>
            </div>

            <div className="mt-auto pt-8 flex items-end justify-between border-t border-zinc-100">
              <div className="space-y-1">
                <span
                  className="text-[7px] font-black uppercase block transition-colors group-hover:text-black"
                  style={{
                    color: DESIGN_SYSTEM.COLORS.ZINC[300],
                    letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL
                  }}
                >
                  CONFIGURATION
                </span>
                <span
                  className="text-[10px] font-black uppercase italic block transition-colors"
                  style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[600] : DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                >
                  {hasVariants
                    ? `${product.variants?.totalDocs} OPTIONS AVAILABLE`
                    : 'STANDARD BUILD'}
                </span>
              </div>

              <div className={cn(
                "size-12 flex items-center justify-center border transition-all duration-300",
                isHovered ? "bg-black border-black" : "bg-transparent border-zinc-100"
              )}>
                <ArrowUpRight
                  size={24}
                  className="transition-colors"
                  style={{ color: isHovered ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}