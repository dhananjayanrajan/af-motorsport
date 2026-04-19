import type { Order } from '@/payload-types'
import type { Metadata } from 'next'

import { OrderStatus } from '@/components/OrderStatus'
import { Price } from '@/components/Price'
import { ProductItem } from '@/components/ProductItem'
import { AddressItem } from '@/components/addresses/AddressItem'
import { formatDateTime } from '@/utilities/formatDateTime'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { ChevronLeftIcon, Hash } from 'lucide-react'
import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ email?: string }>
}

export default async function Order({ params, searchParams }: PageProps) {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  const { id } = await params
  const { email = '' } = await searchParams

  let order: Order | null = null

  try {
    const {
      docs: [orderResult],
    } = await payload.find({
      collection: 'orders',
      user,
      overrideAccess: !Boolean(user),
      depth: 2,
      where: {
        and: [
          { id: { equals: id } },
          ...(user ? [{ customer: { equals: user.id } }] : []),
          ...(email ? [{ customerEmail: { equals: email } }] : []),
        ],
      },
    })

    if (orderResult) order = orderResult
  } catch (error) { }

  if (!order) notFound()

  return (
    <div className="w-full space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        {user && (
          <Link
            href="/orders"
            className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-black-pure transition-colors"
          >
            <ChevronLeftIcon className="size-5 transition-transform group-hover:-translate-x-2" />
            BACK TO ALL
          </Link>
        )}

        <div className="flex items-center gap-4 bg-black-pure px-8 py-4">
          <Hash className="size-4 text-primary-500" />
          <h1 className="text-sm font-black uppercase tracking-widest text-white-pure">
            ID: {order.id}
          </h1>
        </div>
      </div>

      <div className="bg-white-pure border-4 border-black-pure relative overflow-hidden">
        <div className="flex w-full h-3 border-b-4 border-black-pure">
          <div className="flex-1 bg-primary-500" />
          <div className="flex-1 bg-secondary-500" />
          <div className="flex-1 bg-tertiary-500" />
        </div>

        <div className="p-10 lg:p-16 space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b-4 border-black-pure pb-16">
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black-pure/40">DATE</p>
              <p className="text-2xl font-black uppercase tracking-tighter text-black-pure">
                {formatDateTime({ date: order.createdAt, format: 'MMMM dd, yyyy' })}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black-pure/40">TOTAL</p>
              {order.amount && (
                <div className="flex items-center">
                  <Price className="text-4xl font-black text-black-pure tracking-tighter" amount={order.amount} />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black-pure/40">STATUS</p>
              <div className="inline-block border-2 border-black-pure px-4 py-2 bg-secondary-500/10">
                {order.status ? (
                  <OrderStatus className="text-xs font-black uppercase tracking-widest" status={order.status} />
                ) : (
                  <span className="text-xs font-black uppercase tracking-widest text-black-pure/40">WAITING</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-6 w-2 bg-black-pure" />
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-black-pure">ITEMS</h2>
            </div>
            <ul className="divide-y-4 divide-black-pure">
              {order.items?.map((item) => {
                if (!item.product || typeof item.product !== 'object') return null
                return (
                  <li key={item.id} className="py-12 first:pt-0 last:pb-0">
                    <ProductItem
                      product={item.product}
                      quantity={item.quantity}
                      variant={item.variant && typeof item.variant === 'object' ? item.variant : undefined}
                    />
                  </li>
                )
              })}
            </ul>
          </div>

          {order.shippingAddress && (
            <div className="pt-16 border-t-4 border-black-pure">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-6 w-2 bg-tertiary-500" />
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-black-pure">LOCATION</h2>
              </div>
              <div className="bg-white-pure p-10 border-4 border-black-pure">
                {/* @ts-expect-error - address type mismatch */}
                <AddressItem address={order.shippingAddress} hideActions />
              </div>
            </div>
          )}
        </div>

        <div className="h-6 bg-black-pure w-full" />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `ORDER ${id}`,
    description: `Details for order ${id}`,
    openGraph: mergeOpenGraph({ title: `Order ${id}`, url: `/orders/${id}` }),
  }
}