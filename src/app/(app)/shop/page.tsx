import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import configPromise from '@payload-config'
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
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-12 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter">
            EQUIPMENT<span style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>_HUB</span>
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-widest">
            {products.docs.length} units identified in sector
          </p>
        </div>

        {searchValue && (
          <div className="flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-black text-zinc-500 uppercase">Query:</span>
            <span className="text-xs font-bold italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}>&quot;{searchValue}&quot;</span>
          </div>
        )}
      </div>

      {products.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
          {products.docs.map((product) => (
            <div key={product.id} className="bg-black p-4 group transition-colors hover:bg-zinc-950">
              <ProductGridItem product={product} />
            </div>
          ))}
        </Grid>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center border border-dashed border-zinc-800">
          <span className="text-zinc-600 font-mono text-sm uppercase tracking-[0.3em]">No_Assets_Found</span>
          <span className="text-[10px] text-zinc-700 mt-2 uppercase">Adjust system filters to broaden search</span>
        </div>
      )}
    </div>
  )
}