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
      "bg-card border rounded-lg px-4 py-2 md:px-6 md:py-4 flex flex-col sm:flex-row gap-12 sm:items-center sm:justify-between group transition-all duration-300",
      `hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] hover:shadow-[0_0_20px_${DESIGN_SYSTEM.COLORS.PRIMARY}33]`
    )}>
      <div className="flex flex-col gap-4">
        <h3 className={cn(
          "text-sm uppercase font-mono truncate max-w-32 sm:max-w-none transition-colors duration-300",
          DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL,
          `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/50 group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`
        )}>
          {`#${order.id}`}
        </h3>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-6">
          <p className="text-xl">
            <time dateTime={order.createdAt}>
              {formatDateTime({ date: order.createdAt, format: 'MMMM dd, yyyy' })}
            </time>
          </p>

          {order.status && <OrderStatus status={order.status} />}
        </div>

        <p className={cn("flex gap-2 text-xs transition-colors duration-300", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/80 group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}>
          <span>
            {order.items?.length} {itemsLabel}
          </span>
          {order.amount && (
            <>
              <span>•</span>
              <Price
                as="span"
                className={`transition-all duration-300 group-hover:drop-shadow-[0_0_8px_${DESIGN_SYSTEM.COLORS.PRIMARY}]`}
                amount={order.amount}
                currencyCode={order.currency ?? undefined}
              />
            </>
          )}
        </p>
      </div>

      <Button
        variant="outline"
        asChild
        className={cn(
          "self-start sm:self-auto transition-all duration-300",
          `hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}] hover:shadow-[0_0_10px_${DESIGN_SYSTEM.COLORS.PRIMARY}4d]`
        )}
      >
        <Link href={`/orders/${order.id}`}>View Order</Link>
      </Button>
    </div>
  )
}