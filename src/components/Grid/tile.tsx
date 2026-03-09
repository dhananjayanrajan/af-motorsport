import type { Media as MediaType } from '@/payload-types'

import { Label } from '@/components/Grid/Label'
import { Media } from '@/components/Media'
import { DESIGN_SYSTEM } from '@/lib/constants'
import clsx from 'clsx'
import React from 'react'

type Props = {
  active?: boolean
  isInteractive?: boolean
  label?: {
    amount: number
    position?: 'bottom' | 'center' | undefined
    title: string
  }
  media: MediaType
}

export const GridTileImage: React.FC<Props> = ({
  active,
  isInteractive = true,
  label,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border transition-all duration-300 bg-white dark:bg-black',
        {
          [`border-2 border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_20px_${DESIGN_SYSTEM.COLORS.PRIMARY}33]`]: active,
          [`border-neutral-200 dark:border-neutral-800 hover:border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/50`]: !active,
          relative: label,
        },
      )}
    >
      {props.media ? (
        <Media
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
          })}
          height={80}
          imgClassName="h-full w-full object-cover"
          resource={props.media}
          width={80}
        />
      ) : null}
      {label ? <Label amount={label.amount} position={label.position} title={label.title} /> : null}
    </div>
  )
}