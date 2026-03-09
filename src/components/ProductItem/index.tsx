import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Product, Variant } from '@/payload-types'
import Link from 'next/link'

type Props = {
  product: Product
  style?: 'compact' | 'default'
  variant?: Variant
  quantity?: number
  currencyCode?: string
}

export const ProductItem: React.FC<Props> = ({
  product,
  style = 'default',
  quantity,
  variant,
  currencyCode,
}) => {
  const { title } = product

  const metaImage =
    product.meta?.image && typeof product.meta?.image !== 'string' ? product.meta.image : undefined

  const firstGalleryImage =
    typeof product.gallery?.[0]?.image !== 'string' ? product.gallery?.[0]?.image : undefined

  let image = firstGalleryImage || metaImage

  const isVariant = Boolean(variant) && typeof variant === 'object'

  if (isVariant) {
    const imageVariant = product.gallery?.find((item) => {
      if (!item.variantOption) return false
      const variantOptionID =
        typeof item.variantOption === 'object' ? item.variantOption.id : item.variantOption

      const hasMatch = variant?.options?.some((option) => {
        if (typeof option === 'object') return option.id === variantOptionID
        else return option === variantOptionID
      })

      return hasMatch
    })

    if (imageVariant && typeof imageVariant.image !== 'string') {
      image = imageVariant.image
    }
  }

  const itemPrice = variant?.priceInUSD || product.priceInUSD
  const itemURL = `/products/${product.slug}${variant ? `?variant=${variant.id}` : ''}`

  return (
    <div className="flex items-center gap-4 group">
      <div className={`flex items-stretch justify-stretch h-20 w-20 p-2 rounded-lg border border-zinc-800 transition-all duration-300 group-hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] group-hover:shadow-[0_0_15px_${DESIGN_SYSTEM.COLORS.PRIMARY}33]`}>
        <div className="relative w-full h-full">
          {image && typeof image !== 'string' && (
            <Media className="" fill imgClassName="rounded-lg object-cover grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100" resource={image} />
          )}
        </div>
      </div>
      <div className="flex grow justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className={`font-medium text-lg transition-colors duration-300 group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`}>
            <Link href={itemURL}>{title}</Link>
          </p>
          {variant && (
            <p className={`text-sm font-mono tracking-widest transition-colors duration-300 text-zinc-500 group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`}>
              {variant.options
                ?.map((option) => {
                  if (typeof option === 'object') return option.label
                  return null
                })
                .join(', ')}
            </p>
          )}
          <div className="text-zinc-400">
            {'x'}
            {quantity}
          </div>
        </div>

        {itemPrice && quantity && (
          <div className="text-right">
            <p className="font-medium text-lg">Subtotal</p>
            <Price
              className={`font-mono text-sm transition-all duration-300 text-zinc-500 group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}] group-hover:drop-shadow-[0_0_8px_${DESIGN_SYSTEM.COLORS.PRIMARY}]`}
              amount={itemPrice * quantity}
              currencyCode={currencyCode}
            />
          </div>
        )}
      </div>
    </div>
  )
}