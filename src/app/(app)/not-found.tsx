import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container py-28 flex flex-col items-center justify-center text-center">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black italic leading-none tracking-tighter text-zinc-900">
          404
        </h1>
        <div className={cn("absolute inset-0 flex items-center justify-center")}>
          <span className={cn("text-2xl font-black uppercase italic tracking-[0.5em]", `text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)}>
            Asset_Not_Found
          </span>
        </div>
      </div>
      <div className="max-w-md mb-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 leading-relaxed">
          The requested coordinate does not exist within the current sector.
          Synchronization failure: Resource might have been decommissioned or relocated.
        </p>
      </div>
      <Link
        href="/"
        className={cn(
          "relative group flex items-center justify-center px-12 h-14 bg-white text-black overflow-hidden transition-all active:scale-95",
        )}
        style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
      >
        <div className={cn("absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500", `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`)} />
        <span className={cn("relative z-10 text-[11px] font-black uppercase italic group-hover:text-white transition-colors", DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL)}>
          Return_To_Base
        </span>
      </Link>
    </div>
  )
}