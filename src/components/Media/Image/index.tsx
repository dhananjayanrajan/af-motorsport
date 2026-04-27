'use client'

import { cssVariables } from '@/cssVariables'
import { cn } from '@/utilities/cn'
import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React from 'react'
import type { Props as MediaProps } from '../types'

const { breakpoints } = cssVariables

export const Image: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    height: heightFromProps,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    width: widthFromProps,
  } = props

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined | null
  let height: number | undefined | null
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource

    width = widthFromProps ?? fullWidth
    height = heightFromProps ?? fullHeight
    alt = altFromResource

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

    if (url) {
      if (url.startsWith('http') || url.startsWith('data:')) {
        src = url
      } else if (serverUrl) {
        const base = serverUrl.replace(/\/$/, '')
        const path = url.startsWith('/') ? url : `/${url}`
        src = `${base}${path}`
      } else {
        src = url
      }
    }
  }

  if (!src || src === 'undefined') {
    return null
  }

  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
      .map(([, value]) => `(max-width: ${value}px) ${value}px`)
      .join(', ')

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height || heightFromProps : undefined}
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false)
        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps()
        }
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
      width={!fill ? width || widthFromProps : undefined}
    />
  )
}