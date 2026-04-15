'use client'

import { OrderStatus } from '@/components/OrderStatus'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { Order } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  order: Order
}

export const OrderItem: React.FC<Props> = ({ order }) => {
  const itemsLabel = order.items?.length === 1 ? 'Item' : 'Items'

  return (
    <div className="group bg-white border border-zinc-200 p-8 flex flex-col md:flex-row gap-8 md:items-center justify-between transition-all hover:border-black hover:shadow-md">
      <div className="flex flex-col gap-6 grow">
        <div className="flex flex-wrap items-center gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Order ID</span>
            <h3 className="text-[12px] font-black uppercase text-black italic leading-none">
              {order.id}
            </h3>
          </div>
          <div className="h-8 w-px bg-zinc-100 hidden md:block" />
          {order.status && (
            <div className="pt-2 md:pt-0">
              <OrderStatus status={order.status} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-2">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Timestamp</span>
            <p className="text-[11px] font-bold text-black uppercase italic">
              <time dateTime={order.createdAt}>
                {formatDateTime({ date: order.createdAt, format: 'MMM dd, yyyy' })}
              </time>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Quantity</span>
            <p className="text-[11px] font-bold text-black uppercase italic">
              {order.items?.length} {itemsLabel}
            </p>
          </div>

          <div className="space-y-1 col-span-2 md:col-span-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Total Value</span>
            <div className="flex items-center">
              {order.amount && (
                <Price
                  as="span"
                  className="text-[13px] font-black text-black italic"
                  amount={order.amount}
                  currencyCode={order.currency ?? undefined}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center pt-6 md:pt-0 border-t md:border-t-0 border-zinc-100">
        <Button
          asChild
          variant="outline"
          className="rounded-none border-zinc-200 bg-white text-[11px] font-black uppercase italic h-14 px-10 transition-all w-full md:w-auto hover:bg-black hover:text-white hover:border-black flex items-center gap-3 active:scale-[0.98]"
        >
          <Link href={`/orders/${order.id}`}>
            View Details <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}