import type { Order } from '@/payload-types'
import type { Metadata } from 'next'

import { OrderStatus } from '@/components/OrderStatus'
import { Price } from '@/components/Price'
import { ProductItem } from '@/components/ProductItem'
import { AddressItem } from '@/components/addresses/AddressItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
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
    <div className="w-full space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {user && (
          <Link
            href="/orders"
            className="group inline-flex items-center gap-2 text-[11px] font-black uppercase italic text-zinc-400 hover:text-black transition-colors"
          >
            <ChevronLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Orders
          </Link>
        )}

        <div className="flex items-center gap-2 px-4 py-2 bg-black text-white self-start">
          <Hash className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
          <h1 className="text-[11px] font-black uppercase tracking-tighter italic">
            Order #{order.id}
          </h1>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 shadow-xl relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-1.5"
          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}
        />

        <div className="p-8 md:p-12 space-y-16">
          {/* Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-zinc-100 pb-12">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Date Placed</p>
              <p className="text-lg font-black italic uppercase text-black">
                {formatDateTime({ date: order.createdAt, format: 'MMMM dd, yyyy' })}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Amount</p>
              {order.amount && <Price className="text-2xl font-black italic text-black" amount={order.amount} />}
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</p>
              <div className="inline-block">
                {order.status ? (
                  <OrderStatus className="text-[11px] font-black uppercase italic" status={order.status} />
                ) : (
                  <span className="text-[11px] font-black uppercase italic text-zinc-400">Pending</span>
                )}
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-8">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Order Items</h2>
            <ul className="divide-y divide-zinc-100">
              {order.items?.map((item, index) => {
                if (!item.product || typeof item.product !== 'object') return null
                return (
                  <li key={item.id} className="py-8 first:pt-0 last:pb-0">
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

          {/* Shipping Section */}
          {order.shippingAddress && (
            <div className="pt-12 border-t border-zinc-100">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-8">Shipping Address</h2>
              <div className="bg-zinc-50 p-8 border border-zinc-100">
                {/* @ts-expect-error - address type mismatch */}
                <AddressItem address={order.shippingAddress} hideActions />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Order #${id}`,
    description: `Details for order ${id}`,
    openGraph: mergeOpenGraph({ title: `Order ${id}`, url: `/orders/${id}` }),
  }
}