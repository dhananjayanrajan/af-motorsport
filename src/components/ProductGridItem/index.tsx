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
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link className="relative inline-block h-full w-full group" href={`/products/${product.slug}`}>
      {image ? (
        <Media
          className={clsx(
            'relative aspect-square object-cover border rounded-2xl p-8 bg-black transition-all duration-300',
            `group-hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] group-hover:shadow-[0_0_20px_${DESIGN_SYSTEM.COLORS.PRIMARY}33]`
          )}
          height={80}
          imgClassName={clsx('h-full w-full object-cover rounded-2xl', {
            'transition duration-300 ease-in-out group-hover:scale-102': true,
          })}
          resource={image}
          width={80}
        />
      ) : null}

      <div className={clsx(
        "font-mono flex justify-between items-center mt-4 transition-colors duration-300",
        `text-zinc-500 group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`
      )}>
        <div>{title}</div>

        {typeof price === 'number' && (
          <div className={clsx(
            "transition-all duration-300",
            `group-hover:drop-shadow-[0_0_8px_${DESIGN_SYSTEM.COLORS.PRIMARY}]`
          )}>
            <Price amount={price} />
          </div>
        )}
      </div>
    </Link>
  )
}