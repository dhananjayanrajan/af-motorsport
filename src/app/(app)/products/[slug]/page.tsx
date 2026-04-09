import { RenderBlocks } from '@/blocks/RenderBlocks'
import { GridTileImage } from '@/components/Grid/tile'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import { DESIGN_SYSTEM } from '@/lib/constants'
import type { Media, Product } from '@/payload-types'
import configPromise from '@payload-config'
import { Box, ChevronLeftIcon, Cpu, ShieldCheck } from 'lucide-react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })
  if (!product) return notFound()

  const gallery = product.gallery?.filter((item) => typeof item.image === 'object') || []
  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined)

  return {
    title: `${product.title} // AF_EQUIPMENT`,
    description: product.meta?.description || '',
    openGraph: seoImage?.url
      ? { images: [{ url: seoImage.url, width: seoImage.width!, height: seoImage.height! }] }
      : null,
  }
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })
  if (!product) return notFound()

  const gallery =
    product.gallery
      ?.filter((item) => typeof item.image === 'object')
      .map((item) => ({ ...item, image: item.image as Media })) || []

  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some((v) => typeof v === 'object' && v.inventory! > 0)
    : (product.inventory ?? 0) > 0

  const productJsonLd = {
    name: product.title,
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: product.description,
    offers: {
      '@type': 'AggregateOffer',
      availability: hasStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: 'usd',
    },
  }

  const relatedProducts = product.relatedProducts?.filter((rp) => typeof rp === 'object') ?? []

  return (
    <React.Fragment>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        type="application/ld+json"
      />

      <div className="bg-black min-h-screen">
        {/* Top Bar */}
        <div className="border-b border-zinc-900 bg-zinc-950/50 sticky top-0 z-40 backdrop-blur-md">
          <div className="container h-16 flex items-center justify-between">
            <Link
              href="/shop"
              style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] transition-colors hover:brightness-125"
            >
              <ChevronLeftIcon className="size-4 transition-transform group-hover:-translate-x-1" />
              Return_to_Inventory
            </Link>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div
                  className="size-2"
                  style={{
                    backgroundColor: hasStock ? DESIGN_SYSTEM.COLORS.PRIMARY : '#dc2626',
                    boxShadow: hasStock ? `0 0 8px ${DESIGN_SYSTEM.COLORS.PRIMARY}` : 'none',
                  }}
                />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  {hasStock ? 'Unit_Available' : 'Out_of_Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <div className="sticky top-32">
                <Suspense fallback={<div className="aspect-square bg-zinc-900 animate-pulse" />}>
                  {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
                </Suspense>

                <div className="mt-12 grid grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
                  {[
                    { label: 'Authenticity', icon: ShieldCheck, status: 'Verified' },
                    { label: 'Dispatch', icon: Box, status: 'Priority' },
                    { label: 'Spec', icon: Cpu, status: 'Racing_Grade' },
                  ].map((item, i) => (
                    <div key={i} className="bg-black p-5 flex flex-col gap-3">
                      <item.icon className="size-5 text-zinc-600" />
                      <div>
                        <p className="text-xs font-black text-zinc-600 uppercase tracking-widest">
                          {item.label}
                        </p>
                        <p className="text-sm font-bold text-white uppercase italic">
                          {item.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-5">
              <div className="flex flex-col gap-8">
                <ProductDescription product={product} />
              </div>
            </div>
          </div>
        </div>

        {product.layout?.length ? (
          <div className="border-t border-zinc-900 bg-zinc-950/30">
            <RenderBlocks blocks={product.layout} />
          </div>
        ) : null}

        {relatedProducts.length ? (
          <div className="border-t border-zinc-900 bg-black py-20">
            <div className="container">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                  Related_Hardware
                </h2>
                <div className="h-px flex-1 bg-zinc-900" />
              </div>
              <RelatedProducts products={relatedProducts as Product[]} />
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  )
}

function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <li key={product.id} className="group">
          <Link
            className="block relative aspect-square overflow-hidden bg-zinc-900 transition-transform group-hover:-translate-y-2"
            href={`/products/${product.slug}`}
            style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
          >
            <GridTileImage
              label={{
                amount: product.priceInUSD!,
                title: product.title,
              }}
              media={product.meta?.image as Media}
            />
          </Link>
          <div className="mt-4">
            <div
              className="h-px w-0 group-hover:w-full transition-all duration-300 mb-2"
              style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }}
            />
            <p className="text-xs font-black text-zinc-500 uppercase tracking-widest truncate">
              {product.title}
            </p>
          </div>
        </li>
      ))}
    </ul>
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
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, ...(draft ? [] : [{ _status: { equals: 'published' } }])],
    },
    populate: { variants: { title: true, priceInUSD: true, inventory: true, options: true } },
  })
  return result.docs?.[0] || null
}