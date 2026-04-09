import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { DESIGN_SYSTEM } from '@/lib/constants'
import type { Product } from '@/payload-types'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title } = product

  let price = priceInUSD
  const variants = product.variants?.docs
  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : undefined

  return (
    <Link className="relative inline-block h-full w-full group" href={`/products/${product.slug}`}>
      {image ? (
        <div
          className={clsx(
            'relative aspect-square border bg-black transition-all duration-300',
            'group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]'
          )}
          style={{
            borderColor: DESIGN_SYSTEM.COLORS.ZINC_800,
            clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP,
          }}
        >
          <Media
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
            resource={image}
          />
        </div>
      ) : null}

      <div className="font-mono flex justify-between items-center mt-4 transition-colors duration-300 text-zinc-500 group-hover:text-primary">
        <div className="text-sm font-medium uppercase tracking-wide">{title}</div>
        {typeof price === 'number' && (
          <div className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.7)]">
            <Price amount={price} />
          </div>
        )}
      </div>
    </Link>
  )
}