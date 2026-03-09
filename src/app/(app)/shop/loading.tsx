import { Grid } from '@/components/Grid'
import { DESIGN_SYSTEM } from '@/lib/constants'

export default function Loading() {
  const diamondClip = 'polygon(5% 0%, 95% 0%, 100% 5% , 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)'

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className={`h-20 w-64 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/10 animate-pulse mb-12`} />
      <Grid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="aspect-[4/5] bg-zinc-900 animate-pulse relative overflow-hidden"
              style={{ clipPath: diamondClip }}
            >
              <div className={`absolute inset-0 bg-gradient-to-t from-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/5 to-transparent`} />
            </div>
          ))}
      </Grid>
    </div>
  )
}