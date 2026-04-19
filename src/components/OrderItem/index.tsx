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
  return (
    <div className="group bg-white-pure border-4 border-black-pure p-10 flex flex-col md:flex-row gap-10 md:items-center justify-between transition-all hover:bg-secondary-500/5">
      <div className="flex flex-col gap-8 grow">
        <div className="flex flex-wrap items-center gap-10">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black-pure/40 block">ORDER ID</span>
            <h3 className="text-sm font-black uppercase text-black-pure leading-none">
              {order.id}
            </h3>
          </div>
          <div className="h-10 w-1 bg-black-pure hidden md:block" />
          {order.status && (
            <div className="border-2 border-black-pure px-4 py-1.5 bg-white-pure">
              <OrderStatus status={order.status} className="text-[10px] font-black uppercase tracking-widest" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black-pure/30">DATE</span>
            <p className="text-xs font-black text-black-pure uppercase">
              <time dateTime={order.createdAt}>
                {formatDateTime({ date: order.createdAt, format: 'MMM dd, yyyy' })}
              </time>
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black-pure/30">COUNT</span>
            <p className="text-xs font-black text-black-pure uppercase">
              {order.items?.length} TOTAL
            </p>
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black-pure/30">TOTAL</span>
            <div className="flex items-center">
              {order.amount && (
                <Price
                  as="span"
                  className="text-lg font-black text-black-pure"
                  amount={order.amount}
                  currencyCode={order.currency ?? undefined}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <Button
          asChild
          className="group relative rounded-none bg-black-pure text-white-pure text-xs font-black uppercase tracking-widest h-20 px-12 overflow-hidden transition-all duration-300 w-full md:w-auto"
        >
          <Link href={`/orders/${order.id}`} className="flex items-center justify-center gap-4">
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-secondary-500 transition-transform duration-500 ease-in-out -z-10" />
            <span className="relative z-10 group-hover:text-black-pure transition-colors duration-500">
              VIEW DATA
            </span>
            <ChevronRight className="size-5 relative z-10 group-hover:text-black-pure group-hover:translate-x-2 transition-all duration-500" />
          </Link>
        </Button>
      </div>
    </div>
  )
}