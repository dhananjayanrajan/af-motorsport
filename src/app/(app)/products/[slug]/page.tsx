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

  const gallery =
    product.gallery
      ?.filter((item) => typeof item.image === 'object')
      .map((item) => ({ ...item, image: item.image as Media })) || []

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-screen-2xl mx-auto h-20 flex items-center justify-between px-8 md:px-12">
          <Link
            href="/shop"
            className="group flex items-center gap-4 text-sm font-bold uppercase tracking-tight text-black transition-colors"
          >
            <ChevronLeftIcon
              size={20}
              className="transition-transform group-hover:-translate-x-2"
              strokeWidth={3}
            />
            <span>Back to Shop</span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-1">
              <div className="size-3 bg-primary" />
              <div className="size-3 bg-secondary" />
              <div className="size-3 bg-accent" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Product SKU
              </span>
              <span className="text-sm font-bold uppercase text-black">
                {product.slug}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-2xl mx-auto py-16 lg:py-24 px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          <div className="lg:col-span-7 space-y-12">
            <div className="border-4 border-black p-8 bg-zinc-50">
              <Gallery gallery={gallery} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Security', icon: ShieldCheck, val: 'Verified' },
                { label: 'Shipping', icon: Box, val: 'Express' },
                { label: 'Specs', icon: Cpu, val: 'Professional' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 border-2 border-black bg-white hover:bg-zinc-50 transition-colors group"
                >
                  <item.icon
                    size={28}
                    className="mb-6 text-black group-hover:text-primary transition-colors"
                    strokeWidth={3}
                  />
                  <span className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
                    {item.label}
                  </span>
                  <p className="text-base font-bold uppercase text-black">
                    {item.val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <header className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  In Stock
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter text-black leading-none">
                {product.title}
              </h1>
            </header>

            <div className="border-t-4 border-black pt-12">
              <ProductDescription product={product} />
            </div>

            <div className="pt-12 border-t-2 border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">
                Official Catalog Item
              </span>
              <div className="flex gap-1">
                <div className="size-2 bg-black" />
                <div className="size-2 bg-black opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {product.layout?.length ? (
        <section className="border-t-4 border-black bg-zinc-50">
          <RenderBlocks blocks={product.layout} />
        </section>
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