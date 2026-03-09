import { Price } from '@/components/Price'
import { DESIGN_SYSTEM } from '@/lib/constants'
import clsx from 'clsx'
import React from 'react'

type Props = {
  amount: number
  position?: 'bottom' | 'center'
  title: string
}

export const Label: React.FC<Props> = ({ amount, position = 'bottom', title }) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        '': position === 'center',
      })}
    >
      <div className="flex items-end justify-between text-sm grow font-semibold ">
        <h3 className={clsx(
          "mr-4 font-mono line-clamp-2 border p-2 px-3 leading-none tracking-tight rounded-full backdrop-blur-md transition-all duration-300",
          "bg-white/70 text-black dark:bg-black/70 dark:text-white",
          `dark:border-zinc-800 dark:group-hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/50`
        )}>
          {title}
        </h3>

        <Price
          amount={amount}
          className={clsx(
            "flex-none rounded-full p-2 text-white transition-all duration-300",
            `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_15px_${DESIGN_SYSTEM.COLORS.PRIMARY}66]`
          )}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  )
}