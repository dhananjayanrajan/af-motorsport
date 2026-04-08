import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import configPromise from '@payload-config'
import { Info, Package } from 'lucide-react'
import { getPayload } from 'payload'

export const metadata = {
  description: 'Industrial grade motorsport equipment and apparel.',
  title: 'Logistics / Shop',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: Props) {
  const { q: searchValue, sort, category } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
    },
    ...(sort ? { sort } : { sort: 'title' }),
    ...(searchValue || category
      ? {
        where: {
          and: [
            {
              _status: { equals: 'published' },
            },
            ...(searchValue ? [
              {
                or: [
                  { title: { like: searchValue } },
                  { description: { like: searchValue } },
                ],
              },
            ] : []),
            ...(category ? [
              {
                categories: { contains: category },
              },
            ] : []),
          ],
        },
      }
      : {}),
  })

  return (
    <div className="max-w-[1600px] mx-auto space-y-12">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-zinc-900 pb-12">
        <div className="space-y-6">

          <h1 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-[0.8]">
            EQUIPMENT<br />
            <span className="text-zinc-900">_CATALOG</span>
          </h1>

          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">ASSET_LOAD</span>
              <span className="text-xs font-bold text-white uppercase italic">{products.docs.length} UNITS_SYNCED</span>
            </div>
          </div>
        </div>

        {searchValue && (
          <div className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1 opacity-10">
              <Package size={40} strokeWidth={1} />
            </div>
            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest relative z-10">ACTIVE_QUERY_STRING</span>
            <div className="flex items-center gap-4 relative z-10">
              <div className="size-1.5 animate-pulse bg-primary" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY }} />
              <span className="text-xl font-black italic text-white uppercase tracking-tighter">
                &quot;{searchValue}&quot;
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        {products.docs.length > 0 ? (
          <Grid className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[1px] bg-zinc-900 border border-zinc-900">
            {products.docs.map((product) => (
              <div key={product.id} className="bg-black relative group overflow-hidden border-zinc-900 hover:z-20">
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 size-8 border-t border-r border-transparent group-hover:border-primary/30 transition-colors duration-500" style={{ '--primary-hover': DESIGN_SYSTEM.COLORS.PRIMARY } as any} />
                <div className="p-1">
                  <ProductGridItem product={product} />
                </div>
              </div>
            ))}
          </Grid>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center border border-zinc-900 bg-zinc-950/50 space-y-6">
            <div className="relative">
              <Package size={48} className="text-zinc-900" strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-2 bg-zinc-800 rotate-45 animate-ping" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">ZERO_ASSETS_DETECTED</h3>
              <p className="text-[9px] font-bold text-zinc-700 uppercase italic tracking-widest max-w-xs mx-auto">
                No hardware units match the current encryption parameters. Check system filters or broad query inputs.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="pt-12 flex justify-between items-center border-t border-zinc-900 opacity-50">
        <div className="flex items-center gap-4">
          <Info size={12} className="text-zinc-800" />
          <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">SYSTEM_VERSION: AF_SHOP_PRO_4.2.0</span>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="size-1 bg-zinc-900" />
          ))}
        </div>
      </div>
    </div>
  )
}