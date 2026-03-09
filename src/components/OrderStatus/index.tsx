import { DESIGN_SYSTEM } from '@/lib/constants'
import { OrderStatus as StatusOptions } from '@/payload-types'
import { cn } from '@/utilities/cn'

type Props = {
  status: StatusOptions
  className?: string
}

export const OrderStatus: React.FC<Props> = ({ status, className }) => {
  return (
    <div
      className={cn(
        'text-[10px] tracking-widest font-mono uppercase py-1 px-2 border rounded transition-all duration-300',
        className,
        {
          [`bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/5 border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/20 text-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_10px_${DESIGN_SYSTEM.COLORS.PRIMARY}11]`]: status === 'processing',
          [`bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] text-black border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_15px_${DESIGN_SYSTEM.COLORS.PRIMARY}66]`]: status === 'completed',
          'bg-zinc-900 border-zinc-800 text-zinc-500': status !== 'processing' && status !== 'completed'
        },
      )}
    >
      {status}
    </div>
  )
}