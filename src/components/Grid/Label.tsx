import { Price } from '@/components/Price'
import { cn } from '@/utilities/cn'
import React from 'react'

type Props = {
  amount: number
  position?: 'bottom' | 'center'
  title: string
}

export const Label: React.FC<Props> = ({ amount, position = 'bottom', title }) => {
  return (
    <div
      className={cn('absolute left-0 w-full p-0 flex flex-col', {
        'bottom-0': position === 'bottom',
        'top-1/2 -translate-y-1/2': position === 'center',
      })}
    >
      <div className="flex flex-col bg-white-50 border-t-2 border-black-pure w-full">
        <div className="flex h-12">
          <div className="flex-1 flex items-center px-4 bg-black-pure">
            <h3 className="text-[10px] font-mono font-black tracking-[0.3em] text-white-pure uppercase truncate">
              {title}
            </h3>
          </div>
          <div className="w-24 flex items-center justify-center bg-primary border-l-2 border-black-pure">
            <Price
              amount={amount}
              className="text-xs font-black text-black-pure"
            />
          </div>
        </div>
      </div>
    </div>
  )
}