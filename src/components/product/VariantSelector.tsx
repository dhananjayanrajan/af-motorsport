'use client'

import { Product } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function VariantSelector({ product }: { product: Product }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const variants = product.variants?.docs
  const variantTypes = product.variantTypes

  if (!product.enableVariants || !variants?.length) return null

  return (
    <div className="flex flex-col gap-10">
      {variantTypes?.map((type) => {
        if (!type || typeof type !== 'object') return null
        const options = type.options?.docs
        if (!options?.length) return null

        return (
          <dl className="flex flex-col gap-4" key={type.id}>
            <dt className="flex items-center gap-3">
              <div className="size-2 bg-black" />
              <span className="text-xs font-bold text-black uppercase tracking-widest">
                Select {type.label}
              </span>
            </dt>
            <dd className="flex flex-wrap gap-3">
              {options?.map((option) => {
                if (!option || typeof option !== 'object') return null
                const optionSearchParams = new URLSearchParams(searchParams.toString())
                optionSearchParams.set(type.name, String(option.id))

                const optionUrl = createUrl(pathname, optionSearchParams)
                const isActive = searchParams.get(type.name) === String(option.id)

                return (
                  <button
                    key={option.id}
                    onClick={() => router.replace(optionUrl, { scroll: false })}
                    className={cn(
                      'h-14 px-8 text-xs font-bold uppercase tracking-widest transition-all border-2',
                      isActive
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-zinc-200 hover:border-black',
                    )}
                  >
                    {option.label}
                  </button>
                )
              })}
            </dd>
          </dl>
        )
      })}
    </div>
  )
}