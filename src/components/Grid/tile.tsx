import { Label } from '@/components/Grid/Label'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/cn'
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
      className={cn(
        'group relative flex h-full w-full items-center justify-center overflow-hidden border-2 border-black-pure transition-all duration-300',
        active ? 'bg-primary' : 'bg-white-100'
      )}
    >
      {props.media ? (
        <Media
          className={cn('relative h-full w-full grayscale group-hover:grayscale-0', {
            'transition-transform duration-700 ease-out group-hover:scale-110': isInteractive,
          })}
          imgClassName="h-full w-full object-cover"
          resource={props.media}
        />
      ) : (
        <div className="size-full bg-white-300" />
      )}

      <div className={cn(
        "absolute inset-0 border-0 transition-all duration-300",
        active ? "border-[12px] border-primary/30" : "group-hover:border-2 border-black-pure"
      )} />

      {label && (
        <Label
          amount={label.amount}
          position={label.position}
          title={label.title}
        />
      )}
    </div>
  )
}