import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="nav"
      size="clear"
      className={cn(
        "navLink relative flex items-center gap-2 p-0 hover:cursor-pointer group",
        className
      )}
      {...rest}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-red-600 transition-colors">
        Cart
      </span>

      {quantity ? (
        <div className="flex items-center">
          <span className="text-zinc-700 mx-1 font-mono">[</span>
          <span className="text-red-600 font-mono font-bold animate-pulse">
            {String(quantity).padStart(2, '0')}
          </span>
          <span className="text-zinc-700 mx-1 font-mono">]</span>
        </div>
      ) : null}
    </Button>
  )
}