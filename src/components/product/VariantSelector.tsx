'use client'
import { Product } from '@/payload-types'
import { createUrl } from '@/utilities/createUrl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ClippedButton } from '../Custom/ui/ClippedButton'

export function VariantSelector({ product }: { product: Product }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const variants = product.variants?.docs
  const variantTypes = product.variantTypes
  const hasVariants = Boolean(product.enableVariants && variants?.length && variantTypes?.length)

  if (!hasVariants) return null

  return variantTypes?.map((type) => {
    if (!type || typeof type !== 'object') return null
    const options = type.options?.docs
    if (!options?.length) return null

    return (
      <dl className="flex flex-col gap-4" key={type.id}>
        <dt className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">
          {type.label}
        </dt>
        <dd className="flex flex-wrap gap-x-3 gap-y-4">
          {options?.map((option) => {
            if (!option || typeof option !== 'object') return null
            const optionSearchParams = new URLSearchParams(searchParams.toString())
            optionSearchParams.delete('variant')
            optionSearchParams.delete('image')
            optionSearchParams.set(type.name, String(option.id))

            const currentOptions = Array.from(optionSearchParams.values())
            let isAvailableForSale = true

            if (variants) {
              const matchingVariant = variants
                .filter((v) => typeof v === 'object')
                .find((v) => {
                  if (!v.options || !Array.isArray(v.options)) return false
                  return v.options.every((vo) => {
                    const id = typeof vo !== 'object' ? String(vo) : String(vo.id)
                    return currentOptions.includes(id)
                  })
                })

              if (matchingVariant) {
                optionSearchParams.set('variant', String(matchingVariant.id))
                isAvailableForSale = (matchingVariant.inventory ?? 0) > 0
              } else {
                isAvailableForSale = false
              }
            }

            const optionUrl = createUrl(pathname, optionSearchParams)
            const isActive = searchParams.get(type.name) === String(option.id)

            return (
              <ClippedButton
                key={option.id}
                label={option.label!}
                variant={isActive ? 'primary' : 'outline'}
                size="sm"
                onClick={() => router.replace(optionUrl, { scroll: false })}
                className={!isAvailableForSale ? 'opacity-30 pointer-events-none' : ''}
              />
            )
          })}
        </dd>
      </dl>
    )
  })
}