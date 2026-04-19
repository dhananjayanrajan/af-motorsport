'use client'

import { Grid } from '@/components/Grid'

export default function Loading() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black-pure pb-10 mb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-3 bg-white-200 border border-black-pure/10 animate-pulse" />
            <div className="h-2 w-20 bg-white-200 animate-pulse" />
          </div>
          <div className="h-8 w-48 bg-white-200 animate-pulse" />
        </div>
      </div>

      <Grid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="aspect-[4/5] border border-black-pure/10 bg-white-200 animate-pulse" />
          ))}
      </Grid>

      <div className="mt-10 pt-6 border-t border-black-pure/10 flex justify-between items-center">
        <div className="h-2 w-24 bg-white-200 animate-pulse" />
        <div className="flex gap-1">
          <div className="size-2 bg-white-200 animate-pulse" />
          <div className="size-2 bg-white-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}