import { Grid } from '@/components/Grid'
import { DESIGN_SYSTEM } from '@/lib/constants'

export default function Loading() {
  const slabClip = 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="h-16 w-80 bg-zinc-100 animate-pulse mb-16 border-l-4" style={{ borderLeftColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }} />
      <Grid className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="space-y-6">
            <div
              className="aspect-[4/5] bg-zinc-50 animate-pulse border"
              style={{ clipPath: slabClip, borderColor: DESIGN_SYSTEM.COLORS.PRIMARY_MUTED }}
            />
            <div className="space-y-2">
              <div className="h-4 w-2/3 bg-zinc-100 animate-pulse" />
              <div className="h-0.5 w-8 bg-zinc-100" />
            </div>
          </div>
        ))}
      </Grid>
    </div>
  )
}