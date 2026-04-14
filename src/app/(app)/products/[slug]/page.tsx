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
        <div className="container h-16 flex items-center justify-between px-6">
          <Link href="/shop" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-black">
            <div className="size-8 border border-zinc-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
              <ChevronLeftIcon size={14} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            Back_to_Inventory
          </Link>
          <div className="flex items-center gap-6">
            <div className="h-4 w-[1px] bg-zinc-200" />
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest tabular-nums">Ref_Data_ID: {product.slug?.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="container py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="relative border border-zinc-100 p-10 bg-zinc-50/50">
              <div className="absolute top-4 left-4 text-[9px] font-black text-zinc-300 uppercase italic tracking-widest">Visual_Matrix_Output</div>
              <Gallery gallery={gallery} />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-px bg-zinc-200 border border-zinc-200">
              {[
                { label: 'Authenticity', icon: ShieldCheck, val: 'Verified' },
                { label: 'Logistics', icon: Box, val: 'Express' },
                { label: 'Spec_Grade', icon: Cpu, val: 'Elite_Pro' }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white hover:bg-zinc-50 transition-colors group">
                  <item.icon size={20} className="text-zinc-300 mb-6 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2">{item.label}</p>
                  <p className="text-[11px] font-black text-black uppercase italic">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-12">
            <ProductDescription product={product} />
          </div>
        </div>
      </div>

      {product.layout?.length ? (
        <div className="border-t border-zinc-200 bg-zinc-50/30">
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