import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
    <div
      className="min-h-screen"
      style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE }}
    >
      <nav className="sticky top-0 z-50 bg-white border-b border-zinc-100">
        <div className="max-w-screen-2xl mx-auto h-20 flex items-center justify-between px-6 md:px-12">
          <Link
            href="/shop"
            className="flex items-center gap-4 text-[11px] font-black uppercase italic transition-all duration-300 group"
            style={{
              color: DESIGN_SYSTEM.COLORS.BLACK.PURE,
              letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT
            }}
          >
            <ChevronLeftIcon
              size={18}
              className="transition-transform group-hover:-translate-x-1"
              style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            />
            <span className="group-hover:text-zinc-500 transition-colors">
              BACK TO INVENTORY
            </span>
          </Link>

          <div className="flex flex-col items-end group cursor-default">
            <span
              className="text-[10px] font-black uppercase italic transition-colors group-hover:text-black"
              style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}
            >
              PRODUCT ID
            </span>
            <span
              className="text-[12px] font-black uppercase tabular-nums transition-colors group-hover:text-primary-500"
              style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
            >
              {product.slug?.toUpperCase()}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-2xl mx-auto py-12 lg:py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          <div className="lg:col-span-7 flex flex-col gap-12">
            <div
              className="relative p-12 lg:p-20 border border-zinc-100 bg-white transition-colors hover:border-zinc-300"
            >
              <Gallery gallery={gallery} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'AUTHENTICITY', icon: ShieldCheck, val: 'VERIFIED' },
                { label: 'LOGISTICS', icon: Box, val: 'EXPRESS' },
                { label: 'GRADE', icon: Cpu, val: 'PROFESSIONAL' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 border border-zinc-100 bg-white transition-all duration-300 hover:border-black group"
                >
                  <item.icon
                    size={22}
                    className="mb-6 transition-colors group-hover:scale-110"
                    style={{ color: i === 0 ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[300] }}
                  />
                  <span
                    className="block text-[9px] font-black uppercase mb-2 italic transition-colors group-hover:text-zinc-900"
                    style={{
                      color: DESIGN_SYSTEM.COLORS.ZINC[400],
                      letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_DEFAULT
                    }}
                  >
                    {item.label}
                  </span>
                  <p
                    className="text-sm font-black uppercase italic tracking-tight transition-colors group-hover:text-primary-600"
                    style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                  >
                    {item.val}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="space-y-12">
              <header className="space-y-4 group">
                <span
                  className="text-[11px] font-black uppercase italic transition-colors group-hover:text-black"
                  style={{
                    color: DESIGN_SYSTEM.COLORS.PRIMARY[500],
                    letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL
                  }}
                >
                  PRODUCT DETAILS
                </span>
                <h1
                  className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter transition-colors group-hover:text-zinc-700"
                  style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}
                >
                  {product.title}
                </h1>
              </header>

              <div className="h-px w-full bg-zinc-100 transition-colors hover:bg-zinc-300" />

              <div className="min-h-[200px]">
                <ProductDescription product={product} />
              </div>
            </div>
          </div>

        </div>
      </main>

      {product.layout?.length ? (
        <section className="border-t border-zinc-100 bg-white">
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