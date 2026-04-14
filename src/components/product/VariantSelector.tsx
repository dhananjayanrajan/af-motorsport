'use client'
import { Product } from '@/payload-types'
import { createUrl } from '@/utilities/createUrl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ClippedButton } from '../Clipped/ClippedButton'

export function VariantSelector({ product }: { product: Product }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const variants = product.variants?.docs
  const variantTypes = product.variantTypes

  if (!product.enableVariants || !variants?.length) return null

  return variantTypes?.map((type) => {
    if (!type || typeof type !== 'object') return null
    const options = type.options?.docs
    if (!options?.length) return null

    return (
      <dl className="flex flex-col gap-4" key={type.id}>
        <dt className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          {type.label}
        </dt>
        <dd className="flex flex-wrap gap-3">
          {options?.map((option) => {
            if (!option || typeof option !== 'object') return null
            const optionSearchParams = new URLSearchParams(searchParams.toString())
            optionSearchParams.set(type.name, String(option.id))

            const optionUrl = createUrl(pathname, optionSearchParams)
            const isActive = searchParams.get(type.name) === String(option.id)

            return (
              <ClippedButton
                key={option.id}
                label={option.label!}
                variant={isActive ? 'primary' : 'outline'}
                size="sm"
                className="rounded-none h-10 px-6 font-bold uppercase tracking-wide text-xs"
                onClick={() => router.replace(optionUrl, { scroll: false })}
              />
            )
          })}
        </dd>
      </dl>
    )
  })
}