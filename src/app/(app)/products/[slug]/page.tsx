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
    <div className="min-h-screen bg-white-pure">
      <nav className="sticky top-0 z-50 bg-white-pure border-b border-black-pure">
        <div className="max-w-screen-2xl mx-auto h-16 md:h-20 flex items-center justify-between px-6 md:px-10">
          <Link
            href="/shop"
            className="group flex items-center gap-3 text-xs font-mono font-black uppercase tracking-widest text-black-pure transition-colors"
          >
            <ChevronLeftIcon
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Shop</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono font-black uppercase text-black-pure opacity-40">
                Item Number
              </span>
              <span className="text-xs font-mono font-black uppercase text-black-pure">
                {product.slug}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-2xl mx-auto py-12 lg:py-20 px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          <div className="lg:col-span-7 space-y-10">
            <div className="border border-black-pure p-6 bg-white-50">
              <Gallery gallery={gallery} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Authenticity', icon: ShieldCheck, val: 'Guaranteed' },
                { label: 'Shipping', icon: Box, val: 'Express' },
                { label: 'Quality', icon: Cpu, val: 'Premium' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 border border-black-pure bg-white-pure hover:bg-primary transition-colors duration-200 group flex flex-col justify-center"
                >
                  <item.icon
                    size={20}
                    className="mb-4 text-black-pure"
                  />
                  <span className="block text-[10px] font-mono font-black uppercase text-black-pure opacity-40 mb-1">
                    {item.label}
                  </span>
                  <p className="text-xs font-mono font-black uppercase text-black-pure">
                    {item.val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <header className="space-y-4 mb-10">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-secondary" />
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure">
                  Availability: Active
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-mono font-black uppercase tracking-tighter text-black-pure leading-tight">
                {product.title}
              </h1>
            </header>

            <div className="border-t border-black-pure pt-10 flex-1">
              <ProductDescription product={product} />
            </div>

            <div className="mt-10 pt-6 border-t border-black-pure opacity-20 flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase text-black-pure">
                Catalog Reference {String(product.id).slice(-4)}
              </span>
              <div className="flex gap-1.5">
                <div className="size-1.5 bg-black-pure" />
                <div className="size-1.5 bg-black-pure" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {product.layout?.length ? (
        <section className="border-t border-black-pure bg-white-50">
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