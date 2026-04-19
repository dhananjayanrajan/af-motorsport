import { Grid } from '@/components/Grid'

export default function Loading() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black pb-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-4 bg-primary border-2 border-black animate-pulse" />
            <div className="h-4 w-24 bg-zinc-200 animate-pulse" />
          </div>
          <div className="h-10 w-64 bg-zinc-200 animate-pulse" />
        </div>
      </div>

      <Grid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-6 border-2 border-black p-4 bg-white">
              <div className="aspect-square bg-zinc-100 animate-pulse border-2 border-black" />
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-zinc-200 animate-pulse" />
                <div className="flex justify-between items-center pt-4 border-t-2 border-zinc-100">
                  <div className="h-4 w-16 bg-zinc-100 animate-pulse" />
                  <div className="size-6 bg-zinc-100 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
      </Grid>

      <div className="mt-12 pt-8 border-t-2 border-zinc-200 flex justify-between items-center">
        <div className="h-3 w-32 bg-zinc-100 animate-pulse" />
        <div className="flex gap-2">
          <div className="size-3 bg-zinc-200 animate-pulse" />
          <div className="size-3 bg-zinc-200 animate-pulse" />
          <div className="size-3 bg-zinc-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}