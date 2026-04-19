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
    <div className="flex flex-col gap-8">
      {variantTypes?.map((type) => {
        if (!type || typeof type !== 'object') return null
        const options = type.options?.docs
        if (!options?.length) return null

        return (
          <dl className="flex flex-col gap-3" key={type.id}>
            <dt className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black text-black-pure opacity-30 uppercase tracking-widest">
                Parameter: {type.label}
              </span>
            </dt>
            <dd className="flex flex-wrap gap-2">
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
                      'h-12 px-6 text-[10px] font-mono font-black uppercase tracking-widest transition-all border',
                      isActive
                        ? 'bg-secondary text-white-pure border-black-pure translate-y-[-2px] shadow-[0_2px_0_0_#000]'
                        : 'bg-white-pure text-black-pure border-black-pure/10 hover:border-black-pure',
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