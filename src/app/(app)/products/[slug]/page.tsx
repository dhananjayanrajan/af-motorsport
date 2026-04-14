import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import type { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { Box, ChevronLeftIcon, Cpu, ShieldCheck } from 'lucide-react'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })
  if (!product) return notFound()

  const gallery = product.gallery
    ?.filter((item) => typeof item.image === 'object')
    .map((item) => ({ ...item, image: item.image as Media })) || []

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b bg-white border-zinc-200 sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto h-20 flex items-center justify-between px-4 md:px-8 lg:px-12">
          <Link href="/shop" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black">
            <ChevronLeftIcon size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Inventory
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest tabular-nums">ID: {product.slug?.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="relative bg-zinc-100 p-4 md:p-8 lg:p-12">
              <Gallery gallery={gallery} />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Authenticity', icon: ShieldCheck, val: 'Verified' },
                { label: 'Logistics', icon: Box, val: 'Express' },
                { label: 'Grade', icon: Cpu, val: 'Professional' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-50 border border-zinc-200 group">
                  <item.icon size={20} className="text-zinc-400 mb-4 transition-colors" />
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-black uppercase">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-10">
            <ProductDescription product={product} />
          </div>
        </div>
      </div>

      {product.layout?.length ? (
        <div className="border-t border-zinc-200">
          <RenderBlocks blocks={product.layout} />
        </div>
      ) : null}
    </div>
  )
}

const queryProductBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    depth: 3,
    draft,
    limit: 1,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, ...(draft ? [] : [{ _status: { equals: 'published' } }])],
    },
  })
  return result.docs?.[0] || null
}