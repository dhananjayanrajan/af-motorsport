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

  return variantTypes?.map((type) => {
    if (!type || typeof type !== 'object') return null
    const options = type.options?.docs
    if (!options?.length) return null

    return (
      <dl className="flex flex-col gap-3" key={type.id}>
        <dt className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] italic">
          Select {type.label}
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
                  "h-12 px-6 text-[11px] font-black uppercase italic tracking-widest transition-all active:scale-[0.98]",
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-black border border-zinc-200 hover:border-black"
                )}
              >
                {option.label}
              </button>
            )
          })}
        </dd>
      </dl>
    )
  })
}