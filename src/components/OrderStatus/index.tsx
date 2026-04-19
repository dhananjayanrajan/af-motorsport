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
        'text-[10px] font-black uppercase tracking-widest px-5 py-2 border-2 transition-all duration-300 inline-block',
        className,
        {
          'bg-primary-500 border-black-pure text-black-pure': status === 'completed',
          'bg-secondary-500 border-black-pure text-black-pure': status === 'processing',
          'bg-white-pure border-black-pure text-black-pure/40': status !== 'processing' && status !== 'completed',
        },
      )}
    >
      {status}
    </div>
  )
}