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
        'text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 border transition-colors italic',
        className,
        {
          [`bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/10 border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`]: status === 'processing',
          [`bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] border-[${DESIGN_SYSTEM.COLORS.PRIMARY}] text-white`]: status === 'completed',
          'bg-zinc-100 border-zinc-200 text-zinc-500': status !== 'processing' && status !== 'completed'
        },
      )}
    >
      {status}
    </div>
  )
}