'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'

import type { Product } from '@/payload-types'

/* import { Card } from '../Card' */

export type Props = {
  posts: Product[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={cn('container px-4 md:px-8 mx-auto')}>
      <div className="relative">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-8 gap-x-4 lg:gap-y-12 lg:gap-x-8 xl:gap-x-10">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="col-span-4 group relative"
                >
                  <div className={cn(
                    "absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0",
                    `bg-gradient-to-br from-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/20 to-transparent`
                  )} />

                  <div className="relative z-10">
                    {/* <Card className="h-full" doc={result} relationTo="products" showCategories /> */}
                  </div>

                  <div className="absolute top-0 left-0 w-8 h-[1px] bg-zinc-800" />
                  <div className="absolute top-0 left-0 w-[1px] h-8 bg-zinc-800" />

                  <div className="mt-4 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                      Item_{index.toString().padStart(3, '0')}
                    </span>
                    <div className={`h-[1px] flex-grow mx-4 bg-zinc-900 group-hover:bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/30 transition-colors`} />
                    <span className={`text-[8px] font-black uppercase italic tracking-widest text-zinc-500 group-hover:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`}>
                      Detail_View
                    </span>
                  </div>
                </motion.div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}