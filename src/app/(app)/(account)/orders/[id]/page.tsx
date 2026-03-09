import type { Order } from '@/payload-types'
import type { Metadata } from 'next'

import { OrderStatus } from '@/components/OrderStatus'
import { Price } from '@/components/Price'
import { ProductItem } from '@/components/ProductItem'
import { AddressItem } from '@/components/addresses/AddressItem'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
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
          {
            id: {
              equals: id,
            },
          },
          ...(user
            ? [
              {
                customer: {
                  equals: user.id,
                },
              },
            ]
            : []),
          ...(email
            ? [
              {
                customerEmail: {
                  equals: email,
                },
              },
            ]
            : []),
        ],
      },
      select: {
        amount: true,
        currency: true,
        items: true,
        customerEmail: true,
        customer: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        shippingAddress: true,
      },
    })

    const canAccessAsGuest =
      !user &&
      email &&
      orderResult &&
      orderResult.customerEmail &&
      orderResult.customerEmail === email
    const canAccessAsUser =
      user &&
      orderResult &&
      orderResult.customer &&
      (typeof orderResult.customer === 'object'
        ? orderResult.customer.id
        : orderResult.customer) === user.id

    if (orderResult && (canAccessAsGuest || canAccessAsUser)) {
      order = orderResult
    }
  } catch (error) {
    console.error(error)
  }

  if (!order) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="flex gap-8 justify-between items-center mb-12">
        {user ? (
          <Link
            href="/orders"
            style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }}
            className={cn("group flex items-center gap-2 text-[10px] font-black uppercase transition-colors brightness-50 hover:brightness-100", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}
          >
            <ChevronLeftIcon className="size-3 transition-transform group-hover:-translate-x-1" />
            Registry_Archive
          </Link>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <Hash className="size-3" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
          <h1 className="text-[10px] font-black uppercase tracking-widest text-white">
            Manifest_{order.id}
          </h1>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 flex flex-col gap-16 relative overflow-hidden" style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
        <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none bg-gradient-to-bl", `from-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-zinc-900 pb-12">
          <div className="space-y-2">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">Entry_Timestamp</p>
            <p className="text-sm font-bold uppercase italic text-white">
              <time dateTime={order.createdAt}>
                {formatDateTime({ date: order.createdAt, format: 'MMMM dd, yyyy' })}
              </time>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">Total_Allocation</p>
            {order.amount && <Price className="text-xl font-black italic text-white" amount={order.amount} />}
          </div>

          {order.status && (
            <div className="space-y-2">
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">Protocol_Status</p>
              <OrderStatus className="text-[10px] font-bold uppercase italic" status={order.status} />
            </div>
          )}
        </div>

        {order.items && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Hardware_List</h2>
              <div className="h-px flex-1 bg-zinc-900" />
            </div>
            <ul className="flex flex-col gap-8">
              {order.items?.map((item, index) => {
                if (typeof item.product === 'string') {
                  return null
                }

                if (!item.product || typeof item.product !== 'object') {
                  return <div key={index} className="text-[10px] font-bold uppercase text-zinc-700">Data_Corruption: Item_Missing</div>
                }

                const variant =
                  item.variant && typeof item.variant === 'object' ? item.variant : undefined

                return (
                  <li key={item.id} className="relative">
                    <div className="absolute -left-6 top-0 bottom-0 w-px bg-zinc-900 group-hover:bg-white transition-colors" />
                    <ProductItem
                      product={item.product}
                      quantity={item.quantity}
                      variant={variant}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {order.shippingAddress && (
          <div className="space-y-8 pt-8 border-t border-zinc-900">
            <div className="flex items-center gap-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Deployment_Coordinates</h2>
              <div className="h-px flex-1 bg-zinc-900" />
            </div>

            <div className="bg-black/40 p-6 border border-zinc-900/50">
              {/* @ts-expect-error - some kind of type hell */}
              <AddressItem address={order.shippingAddress} hideActions />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params

  return {
    description: `Order details for order ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
    title: `Order ${id}`,
  }
}