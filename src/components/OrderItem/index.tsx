'use client'

import { OrderStatus } from '@/components/OrderStatus'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { DESIGN_SYSTEM } from '@/lib/constants'
import { Order } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { formatDateTime } from '@/utilities/formatDateTime'
import Link from 'next/link'
import React from 'react'

type Props = {
  order: Order
}

export const OrderItem: React.FC<Props> = ({ order }) => {
  const itemsLabel = order.items?.length === 1 ? 'Item' : 'Items'

  return (
    <div className={cn(
      "bg-white border border-zinc-200 p-6 md:p-8 flex flex-col md:flex-row gap-8 md:items-center md:justify-between group transition-all duration-200",
      `hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`
    )}>
      <div className="flex flex-col gap-4 grow">
        <div className="flex flex-wrap items-center gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 font-mono">
            {`#${order.id}`}
          </h3>
          {order.status && <OrderStatus status={order.status} />}
        </div>

        <div className="space-y-1">
          <p className="text-xs font-black text-zinc-900 uppercase tracking-tight italic">
            <time dateTime={order.createdAt}>
              {formatDateTime({ date: order.createdAt, format: 'MMMM dd, yyyy' })}
            </time>
          </p>

          <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            <span>
              {order.items?.length} {itemsLabel}
            </span>
            {order.amount && (
              <>
                <span className="text-zinc-300">/</span>
                <Price
                  as="span"
                  className="text-zinc-900 font-black"
                  amount={order.amount}
                  currencyCode={order.currency ?? undefined}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center pt-4 md:pt-0 border-t md:border-t-0 border-zinc-100">
        <Button
          variant="outline"
          asChild
          className={cn(
            "rounded-none border-zinc-200 bg-white text-[10px] font-black uppercase tracking-[0.3em] h-12 px-10 transition-all w-full md:w-auto",
            `hover:bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] hover:text-white`
          )}
        >
          <Link href={`/orders/${order.id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  )
}